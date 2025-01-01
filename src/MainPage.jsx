import { Link } from 'react-router-dom'
import './MainPage.css'

function MainPage() {
  return (
    <div className="main-container">
      <div className="hero-section">
        <div className="hero-content">
          <img src="/images/iteration-1-images/logo.svg" alt="Teknolojik Yemekler Logo" className="hero-logo" />
          <h1 className="hero-title">KOD ACIKTIRIR<br />PİZZA, DOYURUR</h1>
          <Link to="/siparis" className="hero-button">
            ACIKTIM
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainPage
