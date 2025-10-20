import { useState } from 'react';
import './App.css';

interface Slide {
  id: number;
  title: string;
  description: string;
  background: string;
  backgroundType: 'image' | 'video';
  moreInfo: string;
  images: string[];
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Salgar',
    description: 'Our family has been cultivating coffee in this mountain village for over 100 years. A legacy of dedication and tradition.',
    background: 'https://endosi.com/coffee_1.mp4',
    backgroundType: 'video',
    moreInfo: 'In the village of Salgar, nestled in the Colombian mountains, our family has been growing coffee for over a century. For 100 years, five generations have tended these same hillsides, passing down the knowledge and passion for producing exceptional coffee. Every bean carries the weight of this heritage and the promise of continuing this tradition for generations to come.',
    images: ['https://endosi.com/c1.jpg', 'https://endosi.com/c2.jpg', 'https://endosi.com/c3.jpg'],
  },
  {
    id: 2,
    title: 'Jardín',
    description: 'For 100 years, our farm has been the heart of this village. Each harvest honors those who came before us.',
    background: 'https://endosi.com/coffee_2.mp4',
    backgroundType: 'video',
    moreInfo: 'The village of Jardín has been our home for over 100 years. Our great-great-grandparents planted the first coffee trees on this land, and through wars, droughts, and changing times, we have remained. Each morning we walk the same paths they walked, caring for the land with the same devotion. This farm is not just our livelihood—it is our identity, our history, and our promise to the future.',
    images: ['https://endosi.com/c4.jpg', 'https://endosi.com/c5.jpg', 'https://endosi.com/c6.jpg'],
  },
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [cups, setCups] = useState(0);
  const [bags, setBags] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

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
    setShowOrderModal(true);
    setCups(0);
    setBags(0);
  };

  const handleFinalizeOrder = () => {
    if (cups === 0 && bags === 0) {
      alert('Please add at least one item to your order');
      return;
    }
    setShowOrderModal(false);
    setShowCheckout(true);
  };

  const handlePayment = () => {
    setShowCheckout(false);
    setShowThanks(true);
  };

  const cupPrice = 4.5;
  const bagPrice = 28.0;
  const totalPrice = cups * cupPrice + bags * bagPrice;

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
              <div className="image-gallery">
                {slides[currentSlide].images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Coffee ${idx + 1}`}
                    className="thumbnail"
                    onClick={() => setLightboxImage(img)}
                  />
                ))}
              </div>
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

      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <img src={lightboxImage} alt="Full size" className="lightbox-image" />
        </div>
      )}

      {showOrderModal && (
        <div className="lightbox" onClick={() => setShowOrderModal(false)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setShowOrderModal(false)}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <h2>Order {slides[currentSlide].title} Coffee</h2>

            <div className="order-item">
              <div className="order-item-info">
                <h3>Cups</h3>
                <p className="order-item-description">Single serving cup</p>
                <p className="order-item-price">${cupPrice.toFixed(2)} each</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => setCups(Math.max(0, cups - 1))}>-</button>
                <span>{cups}</span>
                <button onClick={() => setCups(cups + 1)}>+</button>
              </div>
            </div>

            <div className="order-item">
              <div className="order-item-info">
                <h3>Bags (1kg)</h3>
                <p className="order-item-description">Premium whole beans</p>
                <p className="order-item-price">${bagPrice.toFixed(2)} each</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => setBags(Math.max(0, bags - 1))}>-</button>
                <span>{bags}</span>
                <button onClick={() => setBags(bags + 1)}>+</button>
              </div>
            </div>

            <div className="order-total">
              <span>Total:</span>
              <span className="total-price">${totalPrice.toFixed(2)}</span>
            </div>

            <button className="finalize-button" onClick={handleFinalizeOrder}>
              Finalize Order
            </button>
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="lightbox">
          <div className="order-modal checkout-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Checkout</h2>

            <div className="checkout-summary">
              <h3>Order Summary</h3>
              {cups > 0 && <p>Cups: {cups} × ${cupPrice.toFixed(2)} = ${(cups * cupPrice).toFixed(2)}</p>}
              {bags > 0 && <p>Bags (1kg): {bags} × ${bagPrice.toFixed(2)} = ${(bags * bagPrice).toFixed(2)}</p>}
              <div className="checkout-total">
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
              </div>
            </div>

            <div className="fake-stripe">
              <h3>Payment Details</h3>
              <div className="stripe-notice">Demo Mode - Test Payment</div>

              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="4242 4242 4242 4242" disabled />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry</label>
                  <input type="text" placeholder="MM/YY" disabled />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input type="text" placeholder="123" disabled />
                </div>
              </div>

              <button className="pay-button" onClick={handlePayment}>
                Pay ${totalPrice.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {showThanks && (
        <div className="lightbox" onClick={() => setShowThanks(false)}>
          <div className="order-modal thanks-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setShowThanks(false)}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="thanks-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h2>Thank You!</h2>
            <p>Your order has been placed successfully.</p>
            <p className="thanks-detail">You will receive a confirmation email shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
