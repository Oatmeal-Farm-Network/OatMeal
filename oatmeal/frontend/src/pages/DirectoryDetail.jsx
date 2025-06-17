import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../config'; // We'll create this config file next
import { DIRECTORY_TYPE_TO_IMAGE, DIRECTORY_TYPE_TO_BUSINESS_TYPE } from './directoryMappings';
import photoNotAvailable from '../images/photo not available .jpg';

// Mapping from URL slug to the BusinessType expected by the backend
const DIRECTORY_TYPE_TO_BUSINESS_TYPE_ID = {
  'agricultural-associations': '1',
  'artisan-producers': '11',
  'business-resources': '28',
  'crafter-organizations': '15',
  'farmers-markets': '29',
  'farms-ranches': '8',
  'fiber-cooperatives': '25',
  'fiber-mills': '18',
  'fisheries': '22',
  'fishermen': '23',
  'food-cooperatives': '14',
  'food-hubs': '18',
  'grocery-stores': '26',
  'herb-and-tea-producer': '31', 
  'manufacturers': '16',
  'marinas': '21',
  'meat-wholesalers': '19',
  'real-estate-agents': '30',
  'restaurants': '9',
  'retailers': '24',
  'service-providers': '20',
  'transporter': '32',
  'universities': '27',
  'veterinarians': '17',
  'vineyards': '34',
  'wineries': '33',
  'others': '3' // Ensure 'Other' is a valid BusinessType in your backend or adjust as needed
};

const DirectoryDetail = () => {
    const { directoryType } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Check if we have filter state from navigation back from profile
    const backState = location.state;
    
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(backState?.selectedCountry || '');
    const [selectedState, setSelectedState] = useState(backState?.selectedState || '');
    const [nameFilter, setNameFilter] = useState(backState?.nameFilter || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Clear navigation state after restoring filters
    useEffect(() => {
        if (backState) {
            // Clear the state to prevent it from persisting
            window.history.replaceState({}, document.title);
        }
    }, [backState]);

    const businessType = DIRECTORY_TYPE_TO_BUSINESS_TYPE_ID[directoryType] || directoryType;
    //const businessType = '1';
    const pageTitle = directoryType.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Fetch countries
    useEffect(() => {
        const fetchCountries = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_ENDPOINTS.COUNTRIES}?BusinessType=${encodeURIComponent(businessType)}`);
                if (!response.ok) throw new Error(`Failed to fetch countries: ${response.statusText} (status: ${response.status})`);
                const data = await response.json();
                setCountries(data || []);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
            setLoading(false);
        };
        if (businessType) fetchCountries();
    }, [businessType]);

    // Fetch states when a country is selected
    useEffect(() => {
        if (!selectedCountry) {
            setStates([]);
            setSelectedState('');
            setBusinesses([]); // Clear businesses if country is deselected
            return;
        }
        const fetchStates = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_ENDPOINTS.STATES}?country=${encodeURIComponent(selectedCountry)}&BusinessType=${encodeURIComponent(businessType)}`);
                if (!response.ok) throw new Error(`Failed to fetch states: ${response.statusText} (status: ${response.status})`);
                const data = await response.json();
                setStates(data || []);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
            setLoading(false);
        };
        fetchStates();
    }, [selectedCountry, businessType]);

    // Fetch businesses when country and state (or just country if state not applicable) are selected
    useEffect(() => {
        if (!selectedCountry) {
            setBusinesses([]);
            return;
        }
        const fetchBusinesses = async () => {
            setLoading(true);
            setError(null);

            let url = `${API_ENDPOINTS.BUSINESSES}?country=${encodeURIComponent(selectedCountry)}&BusinessType=${encodeURIComponent(businessType)}`;
            if (selectedState) {
                url += `&state=${encodeURIComponent(selectedState)}`;
            }

            try {
                const baseResponse = await fetch(url);
                if (!baseResponse.ok) throw new Error(`Failed to fetch businesses: ${baseResponse.statusText}`);
                const baseBusinesses = await baseResponse.json();

                if (!baseBusinesses || baseBusinesses.length === 0) {
                setBusinesses([]);
                setLoading(false);
                return;
                }

                const cleanedNames = baseBusinesses
                .map(b => b.BusinessName?.trim())
                .filter(name => name && name !== '');

                const detailsMap = {};
                const enrichmentMap = {};

                //Fetch both APIs in parallel
                const [detailsResponse, enrichmentResponse] = await Promise.all([
                fetch(API_ENDPOINTS.BUSINESS_DETAILS, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ businessNames: cleanedNames }),
                }),
                fetch(API_ENDPOINTS.BUSINESS_ENRICHMENT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ businessNames: cleanedNames }),
                })
                ]);

                // Parse and build maps
                if (detailsResponse.ok) {
                const detailsData = await detailsResponse.json();
                detailsData.forEach(item => {
                    detailsMap[item.BusinessName] = item;
                });
                }

                if (enrichmentResponse.ok) {
                    console.log('Enrichment response:', enrichmentResponse);
                    const enrichmentData = await enrichmentResponse.json();
                    enrichmentData.forEach(entry => {
                        enrichmentMap[entry.BusinessName] = {
                            Heading: entry.Heading,
                            Description: entry.Description,
                            Description2: entry.Description2,
                            Website: entry.Website
                        };
                    });
                }

                // Merge everything
                const combinedBusinesses = baseBusinesses.map(b => ({
                ...b,
                ...detailsMap[b.BusinessName],
                ...enrichmentMap[b.BusinessName]
                }));

                setBusinesses(combinedBusinesses);
            } catch (err) {
                console.error("Fetch failed:", err);
                setError(err.message);
            }

            setLoading(false);
        };



        fetchBusinesses();
    }, [selectedCountry, selectedState, businessType]);

    const handleCountrySearch = () => {
        // Trigger search when country search button is clicked
        if (selectedCountry) {
            // The useEffect will handle the actual fetching
        }
    };

    const handleStateSearch = () => {
        // Trigger search when state search button is clicked
        if (selectedCountry) {
            // The useEffect will handle the actual fetching
        }
    };

    const handleNameSearch = () => {
        // Filter businesses by name
        console.log('Searching by name:', nameFilter);
    };

    const handleProfileClick = (business) => {
        navigate('/profile', { 
            state: { 
                business, 
                directoryType,
                selectedCountry,
                selectedState,
                nameFilter
            } 
        });
    };

    const filteredBusinesses = businesses
        .filter(business => 
            business.BusinessName && 
            business.BusinessName.trim() !== '' &&
            business.BusinessName.toLowerCase().includes(nameFilter.toLowerCase())
        );

    // Pagination calculations
    const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBusinesses = filteredBusinesses.slice(startIndex, endIndex);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCountry, selectedState, nameFilter]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top of listings when page changes
        document.querySelector('.listings-panel')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show pages around current page
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);
            
            // Adjust if we're near the beginning or end
            if (currentPage <= 3) {
                endPage = Math.min(totalPages, 5);
            }
            if (currentPage >= totalPages - 2) {
                startPage = Math.max(1, totalPages - 4);
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }
        
        return pages;
    };

    return (
        <div>
            {/* Header */}
            <header className="header">
                <div className="logo-container">
                    <img src={DIRECTORY_TYPE_TO_IMAGE[directoryType] || photoNotAvailable} className="logo-image" />
                    <span className="logo-text">{DIRECTORY_TYPE_TO_BUSINESS_TYPE[directoryType] || 'Business'}</span>
                </div>
            </header>

            {/* Main Content */}
            <div className="content-wrapper">
                {/* Search Panel */}
                <div className="search-panel">
                    <h2 className="search-title">Search</h2>
                    
                    <div className="search-group">
                        <label className="search-label">Country</label>
                        <select 
                            className="search-select" 
                            value={selectedCountry} 
                            onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(''); }}
                        >
                            <option value="">Select Country</option>
                            {countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        <button className="search-button" onClick={handleCountrySearch}>Search</button>
                    </div>

                    <div className="search-group">
                        <label className="search-label">State/Province</label>
                        <select 
                            className="search-select" 
                            value={selectedState} 
                            onChange={(e) => setSelectedState(e.target.value)}
                            disabled={states.length === 0}
                        >
                            <option value="">Any</option>
                            {states.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                        <button className="search-button" onClick={handleStateSearch}>Search</button>
                    </div>

                    <div className="search-group">
                        <label className="search-label">Name</label>
                        <input 
                            type="text" 
                            className="search-input" 
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            placeholder="Enter business name"
                        />
                        <button className="search-button" onClick={handleNameSearch}>Search</button>
                    </div>
                </div>

                {/* Listings Panel */}
                <div className="listings-panel">
                    {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                    {loading && <p>Loading...</p>}
                    
                    {/* Results Summary */}
                    {filteredBusinesses.length > 0 && !loading && (
                        <div className="results-summary">
                            <p>Showing {startIndex + 1}-{Math.min(endIndex, filteredBusinesses.length)} of {filteredBusinesses.length}</p>
                        </div>
                    )}
                    
                    {/* Top Pagination Controls */}
                    {currentBusinesses.length > 0 && totalPages > 1 && (
                        <div className="pagination-container pagination-top">
                            <div className="pagination-controls">
                                <button 
                                    className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                
                                <div className="pagination-numbers">
                                    {getPageNumbers().map(pageNum => (
                                        <button
                                            key={pageNum}
                                            className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                                            onClick={() => handlePageChange(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    ))}
                                </div>
                                
                                <button 
                                    className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                            
                            <div className="pagination-info">
                                Page {currentPage} of {totalPages}
                            </div>
                        </div>
                    )}
                    
                    {currentBusinesses.length > 0 ? (
                        <>
                            {currentBusinesses.map((business, index) => (
                                <div key={startIndex + index} className="business-card">
                                    <div className="business-header">
                                        {business.BusinessName}
                                    </div>
                                    <div className="business-content">
                                        <div className="business-card-layout">
                                            {/* Profile Image Section */}
                                            <div className="business-image-section">
                                                {business.ProfileImage ? (
                                                    <img
                                                        src={business.ProfileImage}
                                                        alt={`${business.BusinessName} Profile`}
                                                        className="business-profile-image"
                                                        onError={e => { e.target.onerror = null; e.target.src = photoNotAvailable; }}
                                                    />
                                                ) : (
                                                    <img src={photoNotAvailable} alt="Photo Not Available" className="business-profile-image" />
                                                )}
                                            </div>
                                            
                                            {/* Business Info Section */}
                                            <div className="business-info-section">
                                                <div className="business-location">
                                                    {[business.State, business.Country].filter(Boolean).join(', ')}
                                                </div>
                                                
                                                {/* Detailed Location Information */}
                                                {(business.Address || business.City || business.ZipCode) && (
                                                    <div className="business-full-location">
                                                        {[business.Address, business.City, business.State, business.ZipCode, business.Country].filter(Boolean).join(', ')}
                                                    </div>
                                                )}
                                                
                                                {business.Website && (
                                                    <a href={business.Website} className="business-website" target="_blank" rel="noopener noreferrer">
                                                        {business.Website}
                                                    </a>
                                                )}
                                                
                                                <a href="#" className="business-contact">Contact</a>
                                                
                                                {/* Only show social icons section if at least one social media link exists */}
                                                {((business.Facebook && business.Facebook.trim()) || 
                                                  (business.Pinterest && business.Pinterest.trim())) && (
                                                    <div className="social-icons" style={{ marginBottom: '15px' }}>
                                                        {business.Facebook && business.Facebook.trim() && (
                                                            <a 
                                                                href={business.Facebook.startsWith('http') ? business.Facebook : `https://facebook.com/${business.Facebook}`} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                className="social-icon facebook-icon"
                                                            >
                                                                f
                                                            </a>
                                                        )}
                                                        
                                                        {business.Pinterest && business.Pinterest.trim() && (
                                                            <a 
                                                                href={business.Pinterest.startsWith('http') ? business.Pinterest : `https://pinterest.com/${business.Pinterest}`} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                className="social-icon pinterest-icon"
                                                            >
                                                                P
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                                
                                                <button 
                                                    className="profile-button" 
                                                    onClick={() => handleProfileClick(business)}
                                                >
                                                    Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        !loading && selectedCountry && <p>No businesses found for the selected filters.</p>
                    )}
                    
                    {!selectedCountry && !loading && (
                        <p>Please select a country to view businesses.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DirectoryDetail; 