import React from 'react';
import { Link } from 'react-router-dom';

// Import images from the new location
import agriAssociaImg from '../images/agri_associa.png';
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

const directoryCategories = [
    { title: "Agricultural Associations", slug: "agricultural-associations", desc: "Farmers unite for shared resources", imgSrc: agriAssociaImg },
    { title: "Artisan Producers", slug: "artisan-producers", desc: "Crafting unique goods", imgSrc: artisianImg },
    { title: "Business Resources", slug: "business-resources", desc: "Tools for growth", imgSrc: brImg },
    { title: "Crafter Organizations", slug: "crafter-organizations", desc: "Network and learn", imgSrc: crafOrgImg },
    { title: "Farmers Markets", slug: "farmers-markets", desc: "Fresh local produce", imgSrc: farmersMarketImg },
    { title: "Farms/Ranches", slug: "farms-ranches", desc: "Cultivate and raise", imgSrc: farmsRanchesImg },
    { title: "Fiber Cooperatives", slug: "fiber-cooperatives", desc: "Sustainable textiles", imgSrc: fiberImg },
    { title: "Fiber Mills", slug: "fiber-mills", desc: "Process natural fibers", imgSrc: fiberMillsImg },
    { title: "Fisheries", slug: "fisheries", desc: "Manage aquatic resources", imgSrc: fisheriesImg },
    { title: "Fishermen", slug: "fishermen", desc: "Harvest marine life", imgSrc: fishermenImg },
    { title: "Food Cooperatives", slug: "food-cooperatives", desc: "Community-owned groceries", imgSrc: foodCopImg },
    { title: "Food Hubs", slug: "food-hubs", desc: "Connect producers & consumers", imgSrc: foodHubImg },
    { title: "Grocery Stores", slug: "grocery-stores", desc: "Shop fresh and local", imgSrc: groceryStoreImg },
    { title: "Manufacturers", slug: "manufacturers", desc: "Produce quality goods", imgSrc: manfacImg },
    { title: "Marinas", slug: "marinas", desc: "Docking and water access", imgSrc: marinasImg },
    { title: "Meat Wholesalers", slug: "meat-wholesalers", desc: "Supply fresh meats", imgSrc: meatImg },
    { title: "Real Estate Agents", slug: "real-estate-agents", desc: "Find your property", imgSrc: realEstateImg },
    { title: "Restaurants", slug: "restaurants", desc: "Enjoy local dining", imgSrc: restaurantsImg },
    { title: "Retailers", slug: "retailers", desc: "Diverse product shopping", imgSrc: retailersImg },
    { title: "Service Providers", slug: "service-providers", desc: "Expertise and support", imgSrc: serviceProvidersImg },
    { title: "Universities", slug: "universities", desc: "Education and research", imgSrc: universitiesImg },
    { title: "Veterinarians", slug: "veterinarians", desc: "Animal health care", imgSrc: vetImg },
    { title: "Vineyards", slug: "vineyards", desc: "Cultivate fine grapes", imgSrc: vineyardsImg },
    { title: "Wineries", slug: "wineries", desc: "Craft quality wines", imgSrc: wineriesImg },
    { title: "Others", slug: "others", desc: "Diverse resources", imgSrc: othersImg }
  ];

const DirectoryList = () => {
    const pageStyle = {
        maxWidth: 'None',
        width: '100%',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        overflowX: 'hidden'
    };
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginTop: '20px',
        marginLeft: 'auto',  
        marginRight: 'auto',
        maxWidth: '1000px'   
   };

    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    };
    const imgStyle = {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '4px',
        marginBottom: '10px'
    };
    const buttonStyle = {
        display: 'inline-block',
        marginTop: '10px',
        padding: '8px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px'
    };

    return (
        <div style={pageStyle}>
            <h1>Welcome to OatMeal</h1>
            <div style={gridStyle}>
                {directoryCategories.map((dir) => (
                    <div key={dir.slug} style={cardStyle}>
                        <div>
                            <img src={dir.imgSrc} alt={dir.title} style={imgStyle} />
                            <h3>{dir.title}</h3>
                        </div>
                        <Link to={`/directory/${dir.slug}`} style={buttonStyle}>
                            Explore
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DirectoryList; 