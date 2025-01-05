import { Link, useLocation } from 'react-router-dom'
import logo from '../images/iteration-1-images/logo.svg'
import Footer from './components/Footer'
import './SuccessPage.css'

export default function SuccessPage() {
  const location = useLocation()
  const order = location.state?.order || {
    kisisel: {
      isim: '',
      soyisim: '',
      telefon: '',
      adres: '',
    },
    pizza: {
      boyut: 'Büyük',
      hamur: 'Süper İnce',
      malzemeler: ['Pepperoni', 'Sosis', 'Mısır', 'Ananas', 'Jalepeno'],
    },
    siparis: {
      adet: 1,
      notlar: '',
    }
  }

  const basePrice = 85.50
  const malzemeFiyat = 5.00
  const hizliTeslimatFiyat = 50.00
  const extraPrice = order.pizza.malzemeler.length * malzemeFiyat
  const total = (basePrice + extraPrice + (order.siparis.hizliTeslimat ? hizliTeslimatFiyat : 0)) * order.siparis.adet

  return (
    <div className="success-page">
      <header className="header">
        <div className="header-content">
          <div className="header-logo-container">
            <img src={logo} alt="Teknolojik Yemekler Logo" className="header-logo" />
          </div>
        </div>
      </header>
      <main className="success-content">
        <p className="success-subtitle">lezzetin yolda</p>
        <h2 className="success-message">SİPARİŞ ALINDI</h2>
        <div className="order-details">
          <h3 className="order-title">Position Absolute Acı Pizza</h3>
          <div className="order-info">
            <div className="info-row">
              <span className="info-label">Ad Soyad:</span>
              <span className="info-value">{order.kisisel.isim} {order.kisisel.soyisim}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Telefon:</span>
              <span className="info-value">{order.kisisel.telefon}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Adres:</span>
              <span className="info-value">{order.kisisel.adres}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Boyut:</span>
              <span className="info-value">{order.pizza.boyut}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Hamur:</span>
              <span className="info-value">{order.pizza.hamur}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Ek Malzemeler:</span>
              <span className="info-value">{order.pizza.malzemeler.join(', ')}</span>
            </div>
            {order.siparis.notlar && (
              <div className="info-row">
                <span className="info-label">Sipariş Notu:</span>
                <span className="info-value">{order.siparis.notlar}</span>
              </div>
            )}
            {order.siparis.hizliTeslimat && (
              <div className="info-row">
                <span className="info-label">Teslimat:</span>
                <span className="info-value">Hızlı Teslimat</span>
              </div>
            )}
          </div>
          <div className="summary-section">
            <h4 className="summary-title">Sipariş Toplamı</h4>
            <div className="summary-row">
              <span>Pizza</span>
              <span>{basePrice.toFixed(2)}₺</span>
            </div>
            <div className="summary-row">
              <span>Ek Malzemeler ({order.pizza.malzemeler.length} adet)</span>
              <span>{extraPrice.toFixed(2)}₺</span>
            </div>
            {order.siparis.hizliTeslimat && (
              <div className="summary-row">
                <span>Hızlı Teslimat</span>
                <span>{hizliTeslimatFiyat.toFixed(2)}₺</span>
              </div>
            )}
            <div className="summary-row">
              <span>Adet</span>
              <span>x{order.siparis.adet}</span>
            </div>
            <div className="summary-row total">
              <span>Toplam</span>
              <span>{total.toFixed(2)}₺</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
