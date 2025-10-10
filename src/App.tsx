import { useState } from 'react';
import './App.css';

interface Slide {
  id: number;
  title: string;
  description: string;
  background: string;
  backgroundType: 'image' | 'video';
  moreInfo: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Premium Coffee Beans',
    description: 'Ethically sourced from the finest coffee regions around the world. Experience rich flavors and aromatic blends.',
    background: 'https://videos.pexels.com/video-files/3044191/3044191-uhd_2560_1440_25fps.mp4',
    backgroundType: 'video',
    moreInfo: 'Our coffee beans are carefully selected from sustainable farms across Colombia. Each bean is handpicked at peak ripeness, ensuring the highest quality and most complex flavor profiles. We work directly with local farmers to ensure fair wages and environmentally responsible practices.',
  },
  {
    id: 2,
    title: 'Colombian Heritage',
    description: 'Handpicked by skilled farmers in the lush mountains of Colombia. A tradition passed down through generations.',
    background: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=1920',
    backgroundType: 'image',
    moreInfo: 'Colombian coffee farming is a centuries-old tradition. Our partner families have been cultivating coffee for generations, perfecting their techniques and maintaining the highest standards. Each harvest represents not just a crop, but a cultural legacy.',
  },
  {
    id: 3,
    title: 'Mountain Grown',
    description: 'Cultivated at high altitudes where the perfect climate creates beans with exceptional flavor and aroma.',
    background: 'https://videos.pexels.com/video-files/2909186/2909186-uhd_2560_1440_25fps.mp4',
    backgroundType: 'video',
    moreInfo: 'High altitude cultivation between 1,200 and 1,800 meters provides the ideal conditions for premium coffee. The cooler temperatures slow the bean maturation process, allowing for more complex sugars and acids to develop, resulting in a superior cup.',
  },
  {
    id: 4,
    title: 'Farm to Cup',
    description: 'From the rolling hills of Colombian coffee plantations directly to your morning ritual. Pure and authentic.',
    background: 'https://images.pexels.com/photos/4503268/pexels-photo-4503268.jpeg?auto=compress&cs=tinysrgb&w=1920',
    backgroundType: 'image',
    moreInfo: 'We maintain complete transparency throughout our supply chain. From the moment beans are picked to when they reach your cup, we ensure quality control at every step. Our direct trade relationships eliminate middlemen, ensuring freshness and fair compensation for farmers.',
  },
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleMoreInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleOrder = () => {
    alert(`Order placed for: ${slides[currentSlide].title}`);
  };

  return (
    <div className="slider-container">
      <div className="slide">
        {slides[currentSlide].backgroundType === 'video' ? (
          <video
            key={slides[currentSlide].id}
            className="slide-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={slides[currentSlide].background} type="video/mp4" />
          </video>
        ) : (
          <div
            className="slide-image"
            style={{ backgroundImage: `url(${slides[currentSlide].background})` }}
          />
        )}
        <div className={`slide-content ${showInfo ? 'expanded' : ''}`}>
          <h1 className="slide-title">{slides[currentSlide].title}</h1>
          <p className="slide-description">{slides[currentSlide].description}</p>

          {showInfo && (
            <div className="more-info">
              <p>{slides[currentSlide].moreInfo}</p>
            </div>
          )}

          <div className="action-buttons">
            <button className="icon-button" onClick={handleMoreInfo} title="More Info">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <span>More Info</span>
            </button>

            <button className="icon-button order-button" onClick={handleOrder} title="Order">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span>Order Now</span>
            </button>
          </div>
        </div>

        <button className="nav-button prev" onClick={prevSlide}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <button className="nav-button next" onClick={nextSlide}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <div className="dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
