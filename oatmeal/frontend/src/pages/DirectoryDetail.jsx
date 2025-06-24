import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../config'; // We'll create this config file next
import { DIRECTORY_TYPE_TO_IMAGE, DIRECTORY_TYPE_TO_BUSINESS_TYPE } from './directoryMappings';
import photoNotAvailable from '../images/photo not available .jpg';

// Complete list of world countries - with countries that have data listed first
const ALL_COUNTRIES = [
    // Countries with actual data (listed first for easy access)
    'Australia', 'Canada', 'Ethiopia', 'India', 'Pakistan', 'Philippines', 'Saudi Arabia', 'United Kingdom', 'USA',
    // All other world countries
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Congo (DRC)',
    'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
    'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
    'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hungary', 'Iceland', 'Indonesia', 'Iran', 'Iraq',
    'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait',
    'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru',
    'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman',
    'Palau', 'Palestine State', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Poland', 'Portugal',
    'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
    'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
    'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
    'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela',
    'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

// States/Provinces mapping for major countries - comprehensive list
const STATES_BY_COUNTRY = {
    'USA': [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
        'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ],
    'Canada': [
        'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'
    ],
    'Australia': [
        'Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia'
    ],
    'India': [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ],
    'Brazil': [
        'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão',
        'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte',
        'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
    ],
    'Germany': [
        'Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia',
        'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'
    ],
    'United Kingdom': [
        'England', 'Scotland', 'Wales', 'Northern Ireland'
    ],
    'Mexico': [
        'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato',
        'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
        'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
    ],
    'China': [
        'Anhui', 'Beijing', 'Chongqing', 'Fujian', 'Gansu', 'Guangdong', 'Guangxi', 'Guizhou', 'Hainan', 'Hebei',
        'Heilongjiang', 'Henan', 'Hubei', 'Hunan', 'Inner Mongolia', 'Jiangsu', 'Jiangxi', 'Jilin', 'Liaoning', 'Ningxia',
        'Qinghai', 'Shaanxi', 'Shandong', 'Shanghai', 'Shanxi', 'Sichuan', 'Tianjin', 'Tibet', 'Xinjiang', 'Yunnan', 'Zhejiang'
    ],
    'France': [
        'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Brittany', 'Centre-Val de Loire', 'Corsica', 'Grand Est', 'Hauts-de-France', 'Île-de-France', 'Normandy', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Côte d\'Azur'
    ],
    'Italy': [
        'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardy', 'Marche', 'Molise', 'Piedmont', 'Puglia', 'Sardinia', 'Sicily', 'Trentino-Alto Adige', 'Tuscany', 'Umbria', 'Valle d\'Aosta', 'Veneto'
    ],
    'Spain': [
        'Andalusia', 'Aragon', 'Asturias', 'Balearic Islands', 'Basque Country', 'Canary Islands', 'Cantabria', 'Castile-La Mancha', 'Castile and León', 'Catalonia', 'Extremadura', 'Galicia', 'La Rioja', 'Madrid', 'Murcia', 'Navarre', 'Valencia'
    ],
    'Japan': [
        'Aichi', 'Akita', 'Aomori', 'Chiba', 'Ehime', 'Fukui', 'Fukuoka', 'Fukushima', 'Gifu', 'Gunma', 'Hiroshima', 'Hokkaido', 'Hyogo', 'Ibaraki', 'Ishikawa', 'Iwate', 'Kagawa', 'Kagoshima', 'Kanagawa', 'Kochi', 'Kumamoto', 'Kyoto', 'Mie', 'Miyagi', 'Miyazaki', 'Nagano', 'Nagasaki', 'Nara', 'Niigata', 'Oita', 'Okayama', 'Okinawa', 'Osaka', 'Saga', 'Saitama', 'Shiga', 'Shimane', 'Shizuoka', 'Tochigi', 'Tokushima', 'Tokyo', 'Tottori', 'Toyama', 'Wakayama', 'Yamagata', 'Yamaguchi', 'Yamanashi'
    ],
    'Russia': [
        'Adygea', 'Altai Krai', 'Altai Republic', 'Amur Oblast', 'Arkhangelsk Oblast', 'Astrakhan Oblast', 'Bashkortostan', 'Belgorod Oblast', 'Bryansk Oblast', 'Buryatia', 'Chechen Republic', 'Chelyabinsk Oblast', 'Chukotka', 'Chuvashia', 'Dagestan', 'Ingushetia', 'Irkutsk Oblast', 'Ivanovo Oblast', 'Kabardino-Balkaria', 'Kaliningrad Oblast', 'Kalmykia', 'Kaluga Oblast', 'Kamchatka Krai', 'Karachay-Cherkessia', 'Karelia', 'Kemerovo Oblast', 'Khabarovsk Krai', 'Khakassia', 'Khanty-Mansi', 'Kirov Oblast', 'Komi', 'Kostroma Oblast', 'Krasnodar Krai', 'Krasnoyarsk Krai', 'Kurgan Oblast', 'Kursk Oblast', 'Leningrad Oblast', 'Lipetsk Oblast', 'Magadan Oblast', 'Mari El', 'Mordovia', 'Moscow', 'Moscow Oblast', 'Murmansk Oblast', 'Nenets', 'Nizhny Novgorod Oblast', 'North Ossetia-Alania', 'Novgorod Oblast', 'Novosibirsk Oblast', 'Omsk Oblast', 'Orenburg Oblast', 'Oryol Oblast', 'Penza Oblast', 'Perm Krai', 'Primorsky Krai', 'Pskov Oblast', 'Rostov Oblast', 'Ryazan Oblast', 'Saint Petersburg', 'Sakha Republic', 'Sakhalin Oblast', 'Samara Oblast', 'Saratov Oblast', 'Smolensk Oblast', 'Stavropol Krai', 'Sverdlovsk Oblast', 'Tambov Oblast', 'Tatarstan', 'Tomsk Oblast', 'Tula Oblast', 'Tuva', 'Tver Oblast', 'Tyumen Oblast', 'Udmurtia', 'Ulyanovsk Oblast', 'Vladimir Oblast', 'Volgograd Oblast', 'Vologda Oblast', 'Voronezh Oblast', 'Yamalo-Nenets', 'Yaroslavl Oblast', 'Zabaykalsky Krai'
    ]
};

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
    
    const [countries, setCountries] = useState(ALL_COUNTRIES);
    const [states, setStates] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(backState?.selectedCountry || '');
    const [selectedState, setSelectedState] = useState(backState?.selectedState || '');
    const [nameFilter, setNameFilter] = useState(backState?.nameFilter || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [detectedCountry, setDetectedCountry] = useState(''); // Track detected user country
    
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

    // Detect user's country and set as default
    useEffect(() => {
        const detectUserCountry = async () => {
            // Only detect if not coming from back navigation
            if (!backState?.selectedCountry) {
                try {
                    // Use a free IP geolocation service
                    const response = await fetch('https://ipapi.co/json/');
                    if (response.ok) {
                const data = await response.json();
                        let detectedCountryName = '';
                        
                        // Map common country codes/names to our list format
                        switch (data.country_code) {
                            case 'US':
                                detectedCountryName = 'USA';
                                break;
                            case 'CA':
                                detectedCountryName = 'Canada';
                                break;
                            case 'GB':
                                detectedCountryName = 'United Kingdom';
                                break;
                            case 'AU':
                                detectedCountryName = 'Australia';
                                break;
                            case 'IN':
                                detectedCountryName = 'India';
                                break;
                            case 'PK':
                                detectedCountryName = 'Pakistan';
                                break;
                            case 'PH':
                                detectedCountryName = 'Philippines';
                                break;
                            case 'SA':
                                detectedCountryName = 'Saudi Arabia';
                                break;
                            case 'ET':
                                detectedCountryName = 'Ethiopia';
                                break;
                            case 'DE':
                                detectedCountryName = 'Germany';
                                break;
                            case 'FR':
                                detectedCountryName = 'France';
                                break;
                            case 'BR':
                                detectedCountryName = 'Brazil';
                                break;
                            case 'MX':
                                detectedCountryName = 'Mexico';
                                break;
                            case 'CN':
                                detectedCountryName = 'China';
                                break;
                            case 'JP':
                                detectedCountryName = 'Japan';
                                break;
                            case 'RU':
                                detectedCountryName = 'Russia';
                                break;
                            case 'IT':
                                detectedCountryName = 'Italy';
                                break;
                            case 'ES':
                                detectedCountryName = 'Spain';
                                break;
                            case 'NL':
                                detectedCountryName = 'Netherlands';
                                break;
                            case 'BE':
                                detectedCountryName = 'Belgium';
                                break;
                            case 'CH':
                                detectedCountryName = 'Switzerland';
                                break;
                            case 'AT':
                                detectedCountryName = 'Austria';
                                break;
                            case 'SE':
                                detectedCountryName = 'Sweden';
                                break;
                            case 'NO':
                                detectedCountryName = 'Norway';
                                break;
                            case 'DK':
                                detectedCountryName = 'Denmark';
                                break;
                            case 'FI':
                                detectedCountryName = 'Finland';
                                break;
                            case 'IE':
                                detectedCountryName = 'Ireland';
                                break;
                            case 'NZ':
                                detectedCountryName = 'New Zealand';
                                break;
                            case 'ZA':
                                detectedCountryName = 'South Africa';
                                break;
                            case 'KR':
                                detectedCountryName = 'South Korea';
                                break;
                            case 'SG':
                                detectedCountryName = 'Singapore';
                                break;
                            case 'TH':
                                detectedCountryName = 'Thailand';
                                break;
                            case 'VN':
                                detectedCountryName = 'Vietnam';
                                break;
                            case 'MY':
                                detectedCountryName = 'Malaysia';
                                break;
                            case 'ID':
                                detectedCountryName = 'Indonesia';
                                break;
                            case 'EG':
                                detectedCountryName = 'Egypt';
                                break;
                            case 'NG':
                                detectedCountryName = 'Nigeria';
                                break;
                            case 'KE':
                                detectedCountryName = 'Kenya';
                                break;
                            case 'MA':
                                detectedCountryName = 'Morocco';
                                break;
                            case 'TN':
                                detectedCountryName = 'Tunisia';
                                break;
                            case 'DZ':
                                detectedCountryName = 'Algeria';
                                break;
                            case 'AR':
                                detectedCountryName = 'Argentina';
                                break;
                            case 'CL':
                                detectedCountryName = 'Chile';
                                break;
                            case 'CO':
                                detectedCountryName = 'Colombia';
                                break;
                            case 'PE':
                                detectedCountryName = 'Peru';
                                break;
                            case 'VE':
                                detectedCountryName = 'Venezuela';
                                break;
                            case 'UY':
                                detectedCountryName = 'Uruguay';
                                break;
                            case 'PY':
                                detectedCountryName = 'Paraguay';
                                break;
                            case 'BO':
                                detectedCountryName = 'Bolivia';
                                break;
                            case 'EC':
                                detectedCountryName = 'Ecuador';
                                break;
                            case 'TR':
                                detectedCountryName = 'Turkey';
                                break;
                            case 'IL':
                                detectedCountryName = 'Israel';
                                break;
                            case 'AE':
                                detectedCountryName = 'United Arab Emirates';
                                break;
                            case 'QA':
                                detectedCountryName = 'Qatar';
                                break;
                            case 'KW':
                                detectedCountryName = 'Kuwait';
                                break;
                            case 'BH':
                                detectedCountryName = 'Bahrain';
                                break;
                            case 'OM':
                                detectedCountryName = 'Oman';
                                break;
                            case 'JO':
                                detectedCountryName = 'Jordan';
                                break;
                            case 'LB':
                                detectedCountryName = 'Lebanon';
                                break;
                            case 'PL':
                                detectedCountryName = 'Poland';
                                break;
                            case 'CZ':
                                detectedCountryName = 'Czech Republic';
                                break;
                            case 'SK':
                                detectedCountryName = 'Slovakia';
                                break;
                            case 'HU':
                                detectedCountryName = 'Hungary';
                                break;
                            case 'RO':
                                detectedCountryName = 'Romania';
                                break;
                            case 'BG':
                                detectedCountryName = 'Bulgaria';
                                break;
                            case 'HR':
                                detectedCountryName = 'Croatia';
                                break;
                            case 'SI':
                                detectedCountryName = 'Slovenia';
                                break;
                            case 'RS':
                                detectedCountryName = 'Serbia';
                                break;
                            case 'BA':
                                detectedCountryName = 'Bosnia and Herzegovina';
                                break;
                            case 'MK':
                                detectedCountryName = 'North Macedonia';
                                break;
                            case 'AL':
                                detectedCountryName = 'Albania';
                                break;
                            case 'ME':
                                detectedCountryName = 'Montenegro';
                                break;
                            case 'XK':
                            case 'KS':
                                detectedCountryName = 'Kosovo';
                                break;
                            case 'GR':
                                detectedCountryName = 'Greece';
                                break;
                            case 'CY':
                                detectedCountryName = 'Cyprus';
                                break;
                            case 'MT':
                                detectedCountryName = 'Malta';
                                break;
                            default:
                                // Try to match by country name
                                detectedCountryName = ALL_COUNTRIES.find(country => 
                                    country.toLowerCase() === data.country_name?.toLowerCase()
                                ) || '';
                                break;
                        }
                        
                        if (detectedCountryName && ALL_COUNTRIES.includes(detectedCountryName)) {
                            setDetectedCountry(detectedCountryName);
                            // Auto-select the country if no manual selection has been made
                            if (!selectedCountry) {
                                setSelectedCountry(detectedCountryName);
                            }
                        }
                    }
                } catch (error) {
                    console.log('Could not detect user location:', error);
                    // Silently fail - user can still select country manually
                }
            }
        };

        detectUserCountry();
    }, [backState?.selectedCountry]);

    const businessType = DIRECTORY_TYPE_TO_BUSINESS_TYPE_ID[directoryType] || directoryType;
    const pageTitle = directoryType.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Fetch states when a country is selected
    useEffect(() => {
        if (!selectedCountry) {
            setStates([]);
            setSelectedState('');
            setBusinesses([]); // Clear businesses if country is deselected
            return;
        }

        // Check if we have static state data for this country
        if (STATES_BY_COUNTRY[selectedCountry]) {
            setStates(STATES_BY_COUNTRY[selectedCountry]);
            return;
        }

        // Fall back to API for countries not in our static data
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
                setStates([]); // Set empty array on error
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

        let url = `${API_ENDPOINTS.BUSINESSES}?country=${encodeURIComponent(selectedCountry)}&BusinessTypeID=${encodeURIComponent(businessType)}`;
        if (selectedState) {
        url += `&state=${encodeURIComponent(selectedState)}`;
        }

        try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch businesses: ${response.statusText}`);
        const data = await response.json();
        setBusinesses(data || []);
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
                            placeholder="Enter name"
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
                                                {business.ShowAddress === '1' && (business.Address || business.City || business.ZipCode) && (
                                                    <div className="business-full-location">
                                                        {[business.Address, business.City, business.State, business.ZipCode, business.Country].filter(Boolean).join(', ')}
                                                    </div>
                                                )}
                                                
                                                {business.Website && (
                                                    <a 
                                                        href={business.Website.startsWith('http') ? business.Website : `https://${business.Website}`} 
                                                        className="business-website" 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                    >
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