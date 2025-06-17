import agriAssociaLogo from '../images/agri_associa.png';
import artisianImg from '../images/artisian.jpg';
import brImg from '../images/br.jpg';
import crafOrgImg from '../images/craf_org.jpg';
import farmersMarketImg from '../images/farmers_market.jpg';
import farmsRanchesImg from '../images/farms_ranches.jpg';
import fiberImg from '../images/fiber.jpg'; // Assuming fiber.jpg is the correct name for Fiber Cooperatives
import fiberMillsImg from '../images/fiber_mills.jpg';
import fisheriesImg from '../images/fisheries.jpeg';
import fishermenImg from '../images/fishermen.jpeg';
import foodCopImg from '../images/food_cop.jpg';
import foodHubImg from '../images/food_hub.jpg';
import groceryStoreImg from '../images/grocery_store.jpeg';
import manfacImg from '../images/manfac.jpeg'; // Assuming manfac.jpeg is for Manufacturers
import marinasImg from '../images/marinas.jpeg';
import meatImg from '../images/meat.jpg'; // Assuming meat.jpg is for Meat Wholesalers
import realEstateImg from '../images/real_estate.webp';
import restaurantsImg from '../images/restaurants.jpg';
import retailersImg from '../images/retailers.png';
import serviceProvidersImg from '../images/service_providers.webp';
import universitiesImg from '../images/universities.jpeg';
import vetImg from '../images/vet.webp';
import vineyardsImg from '../images/vineyards.jpeg';
import wineriesImg from '../images/wineries.png';
import othersImg from '../images/others.jpg';
import photoNotAvailable from '../images/photo not available .jpg';

export const DIRECTORY_TYPE_TO_BUSINESS_TYPE = {
    'agricultural-associations': 'Agricultural Association',
    'artisan-producers': 'Artisan Producer',
    'business-resources': 'Business Resource',      
    'crafter-organizations': 'Crafter Organization',
    'farmers-markets': 'Farmers Market',
    'farms-ranches': 'Farm/Ranch',
    'fiber-cooperatives': 'Fiber Cooperative',
    'fiber-mills': 'Fiber Mill',
    'fisheries': 'Fisheries',
    'fishermen': 'Fishermen',   
    'food-cooperatives': 'Food Cooperative',
    'food-hubs': 'Food Hub',
    'grocery-stores': 'Grocery Store',
    'herb-and-tea-producer': 'Herb and Tea Producer',
    'manufacturers': 'Manufacturer',
    'marinas': 'Marina',
    'meat-wholesalers': 'Meat Wholesaler',
    'real-estate-agents': 'Real Estate Agent',
    'restaurants': 'Restaurant',
    'retailers': 'Retailer',
    'service-providers': 'Service Provider',
    'transporter': 'Transporter',
    'universities': 'University',
    'veterinarians': 'Veterinarian',
    'vineyards': 'Vineyard',
    'wineries': 'Winery',
    'others': 'Other'
};

export const DIRECTORY_TYPE_TO_IMAGE = {
  'agricultural-associations': agriAssociaLogo,
    'artisan-producers': artisianImg,  
    'business-resources': brImg,
    'crafter-organizations': crafOrgImg,
    'farmers-markets': farmersMarketImg,
    'farms-ranches': farmsRanchesImg,           
    'fiber-cooperatives': fiberImg,
    'fiber-mills': fiberMillsImg,
    'fisheries': fisheriesImg,
    'fishermen': fishermenImg,
    'food-cooperatives': foodCopImg,
    'food-hubs': foodHubImg,
    'grocery-stores': groceryStoreImg,
    'manufacturers': manfacImg,
    'marinas': marinasImg,
    'meat-wholesalers': meatImg,
    'real-estate-agents': realEstateImg,
    'restaurants': restaurantsImg,      
    'retailers': retailersImg,
    'service-providers': serviceProvidersImg,
    'universities': universitiesImg,
    'veterinarians': vetImg,
    'vineyards': vineyardsImg,
    'wineries': wineriesImg,
    'others': othersImg
};