import { Link } from 'react-router-dom'
import logo from '/images/iteration-1-images/logo.svg'
import './SuccessPage.css'

function SuccessPage({ isError }) {
  return (
    <div className="success-container">
      <img src={logo} alt="Teknolojik Yemekler Logo" className="success-logo" />
      <div className="success-content">
        <h1 className="success-title">
          {isError ? 'UPS! BİR ŞEYLER YANLIŞ GİTTİ.' : 'TEBRİKLER!'}
        </h1>
        <h2 className="success-subtitle">
          {isError ? '' : 'SİPARİŞİNİZ ALINDI!'}
        </h2>
        <Link to="/" className="success-button">
          ANASAYFAYA DÖN
        </Link>
      </div>
    </div>
  )
}

export default SuccessPage
