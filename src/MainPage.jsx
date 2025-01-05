import { Link } from 'react-router-dom'
import Footer from './components/Footer'
import './MainPage.css'

function MainPage() {
  return (
    <div className="main-container">
      <div className="hero-section">
        <div className="hero-content">
          <img src="/images/iteration-1-images/logo.svg" alt="Teknolojik Yemekler Logo" className="hero-logo" />
          <p className="hero-subtitle">Fırsatları Kaçırma</p>
          <h1 className="hero-title">KOD ACIKTIRIR<br />PİZZA, DOYURUR</h1>
          <Link to="/siparis" className="hero-button">
            ACIKTIM
          </Link>
        </div>
      </div>

      <div className="category-menu">
        <div className="category-item">
          <img src="/images/iteration-2-images/icons/1.svg" alt="YENİ! Kore" />
          <span>YENİ! Kore</span>
        </div>
        <div className="category-item">
          <img src="/images/iteration-2-images/icons/2.svg" alt="Pizza" />
          <span>Pizza</span>
        </div>
        <div className="category-item">
          <img src="/images/iteration-2-images/icons/3.svg" alt="Burger" />
          <span>Burger</span>
        </div>
        <div className="category-item">
          <img src="/images/iteration-2-images/icons/4.svg" alt="Kızartmalar" />
          <span>Kızartmalar</span>
        </div>
        <div className="category-item">
          <img src="/images/iteration-2-images/icons/5.svg" alt="Fast Food" />
          <span>Fast Food</span>
        </div>
        <div className="category-item">
          <img src="/images/iteration-2-images/icons/6.svg" alt="Gazlı İçecek" />
          <span>Gazlı İçecek</span>
        </div>
      </div>

      <div className="special-menus-container">
        <div className="special-menus">
          <div className="special-menu red">
            <div className="special-content">
              <h2>Özel Lezzetus</h2>
              <p>Position: Absolute Acı Pizza</p>
              <Link to="/siparis" className="special-button">SİPARİŞ VER</Link>
            </div>
          </div>
          
          <div className="special-menu-right">
            <div className="special-menu dark">
              <div className="special-content">
                <h2>Hackathlon<br />Burger Menü</h2>
                <Link to="/siparis" className="special-button">SİPARİŞ VER</Link>
              </div>
            </div>

            <div className="delivery-section">
              <div className="special-content">
                <h2>Çoooook hızlı<br />npm gibi kurye</h2>
                <Link to="/siparis" className="special-button">SİPARİŞ VER</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="popular-section">
        <h2 className="section-title">en çok paketlenen menüler</h2>
        <h3 className="section-subtitle">Acıktıran Kodlara Doyuran Lezzetler</h3>
        
        <div className="menu-categories">
          <div className="menu-category">
            <img src="/images/iteration-2-images/icons/1.svg" alt="Ramen" />
            <span>Ramen</span>
          </div>
          <div className="menu-category active">
            <img src="/images/iteration-2-images/icons/2.svg" alt="Pizza" />
            <span>Pizza</span>
          </div>
          <div className="menu-category">
            <img src="/images/iteration-2-images/icons/3.svg" alt="Burger" />
            <span>Burger</span>
          </div>
          <div className="menu-category">
            <img src="/images/iteration-2-images/icons/4.svg" alt="French fries" />
            <span>French fries</span>
          </div>
          <div className="menu-category">
            <img src="/images/iteration-2-images/icons/5.svg" alt="Fast food" />
            <span>Fast food</span>
          </div>
          <div className="menu-category">
            <img src="/images/iteration-2-images/icons/6.svg" alt="Soft drinks" />
            <span>Soft drinks</span>
          </div>
        </div>

        <div className="menu-grid">
          <Link to="/siparis" className="menu-item">
            <img src="/images/iteration-2-images/pictures/food-1.png" alt="Terminal Pizza" />
            <div className="menu-details">
              <h3>Terminal Pizza</h3>
              <div className="menu-info">
                <div className="rating">
                  <span className="rating-score">4.9</span>
                  <span className="rating-count">(200)</span>
                </div>
                <div className="price">60₺</div>
              </div>
            </div>
          </Link>

          <Link to="/siparis" className="menu-item">
            <img src="/images/iteration-2-images/pictures/food-2.png" alt="Position Absolute Acı Pizza" />
            <div className="menu-details">
              <h3>Position Absolute Acı Pizza</h3>
              <div className="menu-info">
                <div className="rating">
                  <span className="rating-score">4.9</span>
                  <span className="rating-count">(200)</span>
                </div>
                <div className="price">60₺</div>
              </div>
            </div>
          </Link>

          <Link to="/siparis" className="menu-item">
            <img src="/images/iteration-2-images/pictures/food-3.png" alt="useEffect Tavuklu Burger" />
            <div className="menu-details">
              <h3>useEffect Tavuklu Burger</h3>
              <div className="menu-info">
                <div className="rating">
                  <span className="rating-score">4.9</span>
                  <span className="rating-count">(200)</span>
                </div>
                <div className="price">60₺</div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default MainPage
