import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config';
import agriAssociaLogo from '../images/agri_associa.png';
import agricultureAssociationLogo from '../images/Agriculture Association.jpeg';
import photoNotAvailable from '../images/photo not available .jpg';
import { DIRECTORY_TYPE_TO_IMAGE, DIRECTORY_TYPE_TO_BUSINESS_TYPE } from './directoryMappings';
import { FaFacebookF, FaPinterestP, FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaGlobe } from 'react-icons/fa6';


const BusinessProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialBusiness = location.state?.business;
    const directoryType = location.state?.directoryType;
    const selectedCountry = location.state?.selectedCountry;
    const selectedState = location.state?.selectedState;
    const nameFilter = location.state?.nameFilter;
    const [business, setBusiness] = useState(initialBusiness);

   useEffect(() => {
    setBusiness(initialBusiness);
    }, [initialBusiness]);




    // Contact form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        comments: ''
    });

    // Math question state
    const [mathQuestion, setMathQuestion] = useState({ num1: 0, num2: 0, answer: '' });
    const [userMathAnswer, setUserMathAnswer] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Generate random math question
    const generateMathQuestion = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setMathQuestion({ num1, num2, answer: num1 + num2 });
        setUserMathAnswer('');
    };

    // Initialize math question on component mount
    useEffect(() => {
        generateMathQuestion();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate math answer
        if (parseInt(userMathAnswer) !== mathQuestion.answer) {
            alert('Please answer the math question correctly.');
            return;
        }

        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email) {
            alert('Please fill in all required fields.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Process form submission (you can add API call here)
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            comments: ''
        });
        setUserMathAnswer('');
        generateMathQuestion();
        setFormSubmitted(true);
    };

    if (!business) {
        return (
            <div>
                <header className="header">
                    <div className="logo-container">
                        <img src={DIRECTORY_TYPE_TO_IMAGE[directoryType] || photoNotAvailable} className="logo-image" />
                        <span className="logo-text">{DIRECTORY_TYPE_TO_BUSINESS_TYPE[directoryType] || 'Business'}</span>
                    </div>
                </header>
                <div className="profile-page-container">
                    <p>No business information available.</p>
                    <button 
                        onClick={() => navigate(`/directory/${directoryType || 'agricultural-associations'}`, {
                            state: {
                                selectedCountry,
                                selectedState,
                                nameFilter
                            }
                        })} 
                        className="back-button"
                    >
                        ← Back to Listings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <header className="header">
                <div className="logo-container">
                    <img src={DIRECTORY_TYPE_TO_IMAGE[directoryType] || photoNotAvailable} className="logo-image" />
                    <span className="logo-text">{DIRECTORY_TYPE_TO_BUSINESS_TYPE[directoryType] || 'Business'}</span>
                </div>
            </header>

            {/* Profile Page Content */}
            <div className="profile-page-container">
                <div className="profile-page-header">
                    <button 
                        onClick={() => navigate(`/directory/${directoryType || 'agricultural-associations'}`, {
                            state: {
                                selectedCountry,
                                selectedState,
                                nameFilter
                            }
                        })} 
                        className="back-button"
                    >
                        ← Back to Listings
                    </button>
                    <h1 className="profile-business-name">{business.BusinessName}</h1>
                </div>

                <div className="profile-page-content-with-form">
                    {/* Left Side - Business Information */}
                    <div className="profile-left-section">
                        {/* Profile Image and Contact Section */}
                        <div className="profile-top-section">
                            <div className="profile-image-section">
                                {business.ProfileImage ? (
                                    <img src={business.ProfileImage} alt={`${business.BusinessName} Profile`} className="profile-image-large" />
                                ) : (
                                    <img src={photoNotAvailable} alt="Photo Not Available" className="profile-image-large" />
                                )}
                                <div className="profile-section" style={{ marginTop: '20px', textAlign: 'left' }}>
                                        <h2>Contact Information</h2>
                                        <div className="contact-info">
                                            {business.Phone && (
                                                <div className="contact-item">
                                                    <strong>Phone:</strong>
                                                    <a href={`tel:${business.Phone}`} className="contact-link">{business.Phone}</a>
                                                </div>
                                            )}
                                            <div className="contact-item">
                                                <strong>Business Name:</strong>
                                                <span className="contact-link">{business.BusinessName}</span>
                                            </div>
                                            {business.Address && (
                                                <div className="contact-item">
                                                    <strong>Address:</strong>
                                                    <span className="contact-link">{business.Address}</span>
                                                </div>
                                            )}
                                            {business.City && (
                                                <div className="contact-item">
                                                    <strong>City:</strong>
                                                    <span className="contact-link">{business.City}</span>
                                    </div>
                                )}
                                            {business.State && (
                                                <div className="contact-item">
                                                    <strong>State:</strong>
                                                    <span className="contact-link">{business.State}</span>
                                                </div>
                                            )}
                                            {business.ZipCode && (
                                                <div className="contact-item">
                                                    <strong>Zip Code:</strong>
                                                    <span className="contact-link">{business.ZipCode}</span>
                                                </div>
                                            )}
                                            {business.Country && (
                                                <div className="contact-item">
                                                    <strong>Country:</strong>
                                                    <span className="contact-link">{business.Country}</span>
                                                </div>
                                            )}
                                            {business.Website && (
                                                <div className="contact-item">
                                                    <strong>Website:</strong>
                                                <a 
                                                        href={business.Website.startsWith('http') ? business.Website : `https://${business.Website}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                        className="contact-link"
                                                >
                                                        {business.Website}
                                                </a>
                                                </div>
                                            )}
                                        </div>
                                </div>
                            </div>
                            {/* Description Blog on the right side of the profile image */}
                            {business.Description && (
                                <div style={{ marginLeft: '30px', flex: 1, textAlign: 'left', background: 'none', boxShadow: 'none', padding: 0 }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>{business.BusinessName}</div>
                                    {business.Heading && (
                                        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>{business.Heading}</div>
                                    )}
                                    <div style={{ fontSize: '15px', color: '#222', whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                                        {business.Description}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="profile-main-info">
                            {/* Only show the entire social media section if at least one social link exists */}
                            {((business.Facebook && business.Facebook.trim()) || 
                              (business.Pinterest && business.Pinterest.trim()) || 
                              (business.Twitter && business.Twitter.trim()) || 
                              (business.Instagram && business.Instagram.trim()) || 
                              (business.LinkedIn && business.LinkedIn.trim()) || 
                              (business.YouTube && business.YouTube.trim()) || 
                              (business.Website && business.Website.trim())) && (
                                <div className="profile-section" style={{ marginTop: '20px', textAlign: 'left' }}>
                                    <h2>Connect With Us</h2>
                                    <div className="social-section" style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                                        {business.Facebook && business.Facebook.trim() && (
                                            <a href={business.Facebook.startsWith('http') ? business.Facebook : `https://facebook.com/${business.Facebook}`} target="_blank" rel="noopener noreferrer" className="social-icon-large facebook-icon" title="Facebook"><FaFacebookF /></a>
                                        )}
                                        {business.Pinterest && business.Pinterest.trim() && (
                                            <a href={business.Pinterest.startsWith('http') ? business.Pinterest : `https://pinterest.com/${business.Pinterest}`} target="_blank" rel="noopener noreferrer" className="social-icon-large pinterest-icon" title="Pinterest"><FaPinterestP /></a>
                                        )}
                                        {business.Twitter && business.Twitter.trim() && (
                                            <a href={business.Twitter.startsWith('http') ? business.Twitter : `https://twitter.com/${business.Twitter}`} target="_blank" rel="noopener noreferrer" className="social-icon-large twitter-icon" title="X"><FaXTwitter /></a>
                                        )}
                                        {business.Instagram && business.Instagram.trim() && (
                                            <a href={business.Instagram.startsWith('http') ? business.Instagram : `https://instagram.com/${business.Instagram}`} target="_blank" rel="noopener noreferrer" className="social-icon-large instagram-icon" title="Instagram"><FaInstagram /></a>
                                        )}
                                        {business.LinkedIn && business.LinkedIn.trim() && (
                                            <a href={business.LinkedIn.startsWith('http') ? business.LinkedIn : `https://linkedin.com/in/${business.LinkedIn}`} target="_blank" rel="noopener noreferrer" className="social-icon-large linkedin-icon" title="LinkedIn"><FaLinkedinIn /></a>
                                        )}
                                        {business.YouTube && business.YouTube.trim() && (
                                            <a href={business.YouTube.startsWith('http') ? business.YouTube : `https://youtube.com/${business.YouTube}`} target="_blank" rel="noopener noreferrer" className="social-icon-large youtube-icon" title="YouTube"><FaYoutube /></a>
                                        )}
                                        {business.Website && business.Website.trim() && (
                                            <a 
                                                href={business.Website.startsWith('http') ? business.Website : `https://${business.Website}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="social-icon-large" 
                                                title="Website"
                                            >
                                                <FaGlobe />
                                            </a>
                                        )}
                            </div>
                                </div>
                               )}
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="contact-form-section">
                        <div className="contact-form-header">
                            <h2>Contact</h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone <span className="optional">(Optional)</span></label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="comments">Comments / Questions <span className="optional">(Optional)</span></label>
                                <textarea
                                    id="comments"
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleInputChange}
                                    rows="5"
                                    className="form-textarea"
                                ></textarea>
                            </div>

                            <div className="form-group math-question">
                                <label>Math Question</label>
                                <p>Please answer the simple question below so we know that you are a human.</p>
                                <div className="math-question-container">
                                    <span className="math-expression">
                                        {mathQuestion.num1} + {mathQuestion.num2} =
                                    </span>
                                    <input
                                        type="number"
                                        value={userMathAnswer}
                                        onChange={(e) => setUserMathAnswer(e.target.value)}
                                        required
                                        className="math-input"
                                        placeholder="?"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessProfile; 