import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../config'; // We'll create this config file next

// Mapping from URL slug to the BusinessType expected by the backend
const DIRECTORY_TYPE_TO_BUSINESS_TYPE = {
  'agricultural-associations': 'Agricultural Association',
  'artisan-producers': 'Artisan Food Producer',
  'business-resources': 'Business Resources',
  'crafter-organizations': 'Crafters Organization',
  'farmers-markets': 'Farmers Market',
  'farms-ranches': 'Farm / Ranch',
  'fiber-cooperatives': 'Fiber Cooperative',
  'fiber-mills': 'Fiber Mill',
  'fisheries': 'Fisheries',
  'fishermen': 'Fishermen',
  'food-cooperatives': 'Food Cooperative',
  'food-hubs': 'Food Hub',
  'grocery-stores': 'Grocery',
  'manufacturers': 'Manufacturer',
  'marinas': 'Marina',
  'meat-wholesalers': 'Meat Wholesaler',
  'real-estate-agents': 'Real Estate Agent',
  'restaurants': 'Restaurant',
  'retailers': 'Retailer',
  'service-providers': 'Service Provider',
  'universities': 'University',
  'veterinarians': 'Veterinarian',
  'vineyards': 'Vineyard',
  'wineries': 'Winery',
  'others': 'Other' // Ensure 'Other' is a valid BusinessType in your backend or adjust as needed
};

const DirectoryDetail = () => {
    const { directoryType } = useParams();
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const businessType = DIRECTORY_TYPE_TO_BUSINESS_TYPE[directoryType] || directoryType;
    const businessType = '8';
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
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch businesses: ${response.statusText} (status: ${response.status})`);
                const data = await response.json();
                setBusinesses(data || []);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
            setLoading(false);
        };
        fetchBusinesses();
    }, [selectedCountry, selectedState, businessType]);

    // Inline styles for simplicity
    const pageStyle = { maxWidth: '900px', margin: '20px auto', padding: '20px', fontFamily: 'Arial, sans-serif' };
    const filterStyle = { marginBottom: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '5px' };
    //const selectStyle = { marginRight: '10px', padding: '8px', borderRadius: '4px' };
    const listStyle = { listStyleType: 'none', padding: 0 };
    const listItemStyle = { borderBottom: '1px solid #eee', padding: '10px 0' };
    const filterBarStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap'
    };

    const selectStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minWidth: '150px'
    };

    const searchBtnStyle = {
    padding: '10px 15px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
    };

    const cardGridStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
    };

    const cardStyle = {
    background: '#fff',
    borderRadius: '10px',
    padding: '15px 20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
    };

    const avatarStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: '#eee',
    borderRadius: '50%'
    };

    const detailBtnStyle = {
    backgroundColor: '#e0e7ff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontWeight: 'bold'
    };

    return (
    <div style={pageStyle}>
        <h2>{pageTitle}</h2>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {loading && <p>Loading...</p>}

        {/* FILTER BAR */}
        <div style={filterBarStyle}>
            <select style={selectStyle} value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(''); }}>
            <option value="">Select Country</option>
            {countries.map(country => (
                <option key={country} value={country}>{country}</option>
            ))}
            </select>

            {states.length > 0 && (
            <select style={selectStyle} value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                <option value="">Select State</option>
                {states.map(state => (
                <option key={state} value={state}>{state}</option>
                ))}
            </select>
            )}

            <button style={searchBtnStyle}>Search</button>
        </div>

        {/* RESULT SECTION */}
        <h3>Businesses</h3>
        <div style={cardGridStyle}>
            {businesses.length > 0 ? (
            businesses.map((biz, index) => (
                <div key={index} style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={avatarStyle}></div>
                    <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{biz.BusinessName}</div>
                    <div style={{ fontSize: '14px', color: '#555' }}>
                        {biz.Address}, {biz.City}, {biz.State}, {biz.ZipCode}
                    </div>
                    {biz.Phone && <div style={{ fontSize: '14px', marginTop: '5px' }}>📞 {biz.Phone}</div>}
                    </div>
                </div>
                <button style={detailBtnStyle}>Detail</button>
                </div>
            ))
            ) : (
            !loading && <p>No businesses found for the selected filters.</p>
            )}
        </div>
    </div>
    );
};

export default DirectoryDetail; 