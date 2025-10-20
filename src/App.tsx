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
    title: 'Salgar',
    description: 'Our family has been cultivating coffee in this mountain village for over 100 years. A legacy of dedication and tradition.',
    background: 'https://streamable.com/e/6n2rf2',
    backgroundType: 'video',
    moreInfo: 'In the village of Salgar, nestled in the Colombian mountains, our family has been growing coffee for over a century. For 100 years, five generations have tended these same hillsides, passing down the knowledge and passion for producing exceptional coffee. Every bean carries the weight of this heritage and the promise of continuing this tradition for generations to come.',
  },
  {
    id: 2,
    title: 'Jardín',
    description: 'For 100 years, our farm has been the heart of this village. Each harvest honors those who came before us.',
    background: 'https://streamable.com/e/j37tky',
    backgroundType: 'video',
    moreInfo: 'The village of Jardín has been our home for over 100 years. Our great-great-grandparents planted the first coffee trees on this land, and through wars, droughts, and changing times, we have remained. Each morning we walk the same paths they walked, caring for the land with the same devotion. This farm is not just our livelihood—it is our identity, our history, and our promise to the future.',
  },
  {
    id: 3,
    title: 'Andes',
    description: 'A century of coffee farming in the heart of the mountains. Our family\'s hands have touched every tree on this land.',
    background: 'https://streamable.com/e/6n2rf2',
    backgroundType: 'video',
    moreInfo: 'For 100 years, the village of Andes has witnessed our family\'s dedication to coffee. From my great-grandfather who planted the first seedlings to my children who now learn the harvest, we have kept this farm alive through determination and love. The soil here knows our family, and the coffee trees respond to our care with beans that reflect a century of accumulated wisdom and unwavering commitment.',
  },
  {
    id: 4,
    title: 'Pijao',
    description: 'Since 1925, our farm in this village has produced coffee with pride. A century of tradition in every cup.',
    background: 'https://images.pexels.com/photos/4503268/pexels-photo-4503268.jpeg?auto=compress&cs=tinysrgb&w=1920',
    backgroundType: 'image',
    moreInfo: 'The village of Pijao has been our family\'s home for over 100 years. In 1925, our ancestors cleared this land and planted their first coffee trees with hope and determination. Through every generation, we have honored their sacrifice by maintaining the highest standards and treating this land with respect. When you taste our coffee, you taste a century of Colombian heritage, family devotion, and the rich soil of Pijao.',
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
