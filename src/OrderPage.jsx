import { useState } from 'react'
import axios from 'axios'
import './OrderPage.css'
import logo from '../images/iteration-1-images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'

const malzemeler = [
  { id: 'Pepperoni', label: 'Pepperoni' },
  { id: 'Sosis', label: 'Sosis' },
  { id: 'Kaşar', label: 'Kaşar' },
  { id: 'Sucuk', label: 'Sucuk' },
  { id: 'Mantar', label: 'Mantar' },
  { id: 'Biber', label: 'Biber' },
  { id: 'Soğan', label: 'Soğan' },
  { id: 'Mısır', label: 'Mısır' },
  { id: 'Jalapeno', label: 'Jalapeno' },
  { id: 'Domates', label: 'Domates' },
  { id: 'Zeytin', label: 'Zeytin' },
  { id: 'Tavuk', label: 'Tavuk' }
]

const pizzaBoyutlari = [
  { id: 'Küçük', label: 'Küçük' },
  { id: 'Orta', label: 'Orta' },
  { id: 'Büyük', label: 'Büyük' }
]

const hamurKalinliklari = [
  { id: 'İnce', label: 'İnce' },
  { id: 'Orta', label: 'Orta' },
  { id: 'Kalın', label: 'Kalın' }
]

export default function OrderPage() {
  const navigate = useNavigate()
  const [order, setOrder] = useState({
    kisisel: {
      isim: '',
      soyisim: '',
      telefon: '',
      adres: '',
    },
    pizza: {
      boyut: '',
      hamur: '',
      malzemeler: [],
    },
    siparis: {
      adet: 1,
      notlar: '',
      hizliTeslimat: false,
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({
    kisisel: {
      isim: '',
      soyisim: '',
      telefon: '',
      adres: '',
    },
    pizza: {
      boyut: '',
      hamur: '',
      malzemeler: '',
    }
  })

  const basePrice = 85.50
  const malzemeFiyat = 5.00
  const hizliTeslimatFiyat = 50.00
  const extraPrice = order.pizza.malzemeler.length * malzemeFiyat
  const total = (basePrice + extraPrice + (order.siparis.hizliTeslimat ? hizliTeslimatFiyat : 0)) * order.siparis.adet

  const isValid = 
    order.kisisel.isim.length >= 3 &&
    order.kisisel.soyisim.length >= 3 &&
    order.kisisel.adres.length >= 15 &&
    order.pizza.boyut && 
    order.pizza.hamur && 
    order.pizza.malzemeler.length >= 4 && 
    order.pizza.malzemeler.length <= 10

  const validateField = (field, value) => {
    switch (field) {
      case 'isim':
      case 'soyisim':
        return value.length < 3 ? 'En az 3 karakter olmalıdır' : ''
      case 'telefon':
        return !/^[0-9]{11}$/.test(value) ? 'Geçerli bir telefon numarası giriniz (11 haneli)' : ''
      case 'adres':
        return value.length < 15 ? 'Adres en az 15 karakter olmalıdır' : ''
      case 'boyut':
        return !value ? 'Lütfen bir boyut seçiniz' : ''
      case 'hamur':
        return !value ? 'Lütfen hamur kalınlığı seçiniz' : ''
      case 'malzemeler':
        return value.length < 4 ? 'En az 4 malzeme seçmelisiniz' : 
               value.length > 10 ? 'En fazla 10 malzeme seçebilirsiniz' : ''
      default:
        return ''
    }
  }

  const handleFieldChange = (section, field, value) => {
    setOrder({
      ...order,
      [section]: {
        ...order[section],
        [field]: value
      }
    })

    setErrors({
      ...errors,
      [section]: {
        ...errors[section],
        [field]: validateField(field, value)
      }
    })
  }

  const handleMalzemeChange = (malzemeId, checked) => {
    const yeniMalzemeler = checked
      ? [...order.pizza.malzemeler, malzemeId]
      : order.pizza.malzemeler.filter(t => t !== malzemeId)

    setOrder({
      ...order,
      pizza: {
        ...order.pizza,
        malzemeler: yeniMalzemeler
      }
    })

    setErrors({
      ...errors,
      pizza: {
        ...errors.pizza,
        malzemeler: validateField('malzemeler', yeniMalzemeler)
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Form gönderildiğinde tüm alanları kontrol et
    const newErrors = {
      kisisel: {
        isim: validateField('isim', order.kisisel.isim),
        soyisim: validateField('soyisim', order.kisisel.soyisim),
        telefon: validateField('telefon', order.kisisel.telefon),
        adres: validateField('adres', order.kisisel.adres),
      },
      pizza: {
        boyut: validateField('boyut', order.pizza.boyut),
        hamur: validateField('hamur', order.pizza.hamur),
        malzemeler: validateField('malzemeler', order.pizza.malzemeler),
      }
    }

    setErrors(newErrors)

    if (!isValid) return

    setIsSubmitting(true)
    
    axios.post('https://reqres.in/api/pizza', order)
      .then(response => {
        console.log('Sipariş Özeti:', response.data)
        navigate('/success', { state: { order } })
      })
      .catch(error => {
        console.error('Sipariş hatası:', error)
        navigate('/error')
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleDecrease = () => {
    setOrder({
      ...order,
      siparis: {
        ...order.siparis,
        adet: Math.max(1, order.siparis.adet - 1)
      }
    })
  }

  const handleIncrease = () => {
    setOrder({
      ...order,
      siparis: {
        ...order.siparis,
        adet: order.siparis.adet + 1
      }
    })
  }

  const handleNotesChange = (e) => {
    setOrder({
      ...order,
      siparis: {
        ...order.siparis,
        notlar: e.target.value
      }
    })
  }

  const handleHizliTeslimatChange = (e) => {
    setOrder({
      ...order,
      siparis: {
        ...order.siparis,
        hizliTeslimat: e.target.checked
      }
    })
  }

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="header-logo-container">
            <img src={logo} alt="Teknolojik Yemekler Logo" className="header-logo" />
          </div>
        </div>
      </header>
      <div className="banner">
        <div className="banner-content">
          <img src="/images/iteration-2-images/pictures/form-banner.png" alt="Pizza Banner" className="banner-image" />
          <div className="banner-info">
            <p className="banner-category">
              <Link to="/" className="banner-nav-link">Anasayfa</Link> - <strong className="banner-nav-current">Sipariş Oluştur</strong>
            </p>
            <h2 className="card-title">Position Absolute Acı Pizza</h2>
            <div className="price-row">
              <p className="banner-price">85.50₺</p>
              <div className="rating">
                <span>4.9</span>
                <span className="rating-count">(215)</span>
              </div>
            </div>
            <p className="card-subtitle">
              Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
            </p>
          </div>
        </div>
      </div>
      <main className="main-content">
        <div className="card-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-row">
              <div className="form-group">
                <label className="label">Boyut Seç <span className="required">*</span></label>
                <div className="radio-group">
                  {pizzaBoyutlari.map((boyut) => (
                    <div 
                      key={boyut.id} 
                      className="radio-item"
                      onClick={() => handleFieldChange('pizza', 'boyut', boyut.id)}
                    >
                      <input
                        type="radio"
                        id={boyut.id}
                        name="size"
                        value={boyut.id}
                        checked={order.pizza.boyut === boyut.id}
                        onChange={(e) => handleFieldChange('pizza', 'boyut', e.target.value)}
                      />
                      <label htmlFor={boyut.id}>{boyut.label}</label>
                    </div>
                  ))}
                </div>
                {errors.pizza.boyut && <span className="error-message">{errors.pizza.boyut}</span>}
              </div>
              <div className="form-group">
                <label className="label">Hamur Seç <span className="required">*</span></label>
                <select 
                  className="select"
                  value={order.pizza.hamur}
                  onChange={(e) => handleFieldChange('pizza', 'hamur', e.target.value)}
                >
                  <option value="" disabled>Hamur Kalınlığı</option>
                  {hamurKalinliklari.map((hamur) => (
                    <option key={hamur.id} value={hamur.id}>
                      {hamur.label}
                    </option>
                  ))}
                </select>
                {errors.pizza.hamur && <span className="error-message">{errors.pizza.hamur}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="label">Ek Malzemeler (4-10 seçim yapınız)</label>
              <div className="checkbox-grid">
                {malzemeler.map((malzeme) => (
                  <div key={malzeme.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={malzeme.id}
                      checked={order.pizza.malzemeler.includes(malzeme.id)}
                      onChange={(e) => handleMalzemeChange(malzeme.id, e.target.checked)}
                    />
                    <label htmlFor={malzeme.id}>{malzeme.label}</label>
                  </div>
                ))}
              </div>
              {errors.pizza.malzemeler && <span className="error-message">{errors.pizza.malzemeler}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="label">Ad</label>
                <input
                  id="firstName"
                  className="input"
                  value={order.kisisel.isim}
                  onChange={(e) => handleFieldChange('kisisel', 'isim', e.target.value)}
                  minLength={3}
                />
                {errors.kisisel.isim && <span className="error-message">{errors.kisisel.isim}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="label">Soyad</label>
                <input
                  id="lastName"
                  className="input"
                  value={order.kisisel.soyisim}
                  onChange={(e) => handleFieldChange('kisisel', 'soyisim', e.target.value)}
                  minLength={3}
                />
                {errors.kisisel.soyisim && <span className="error-message">{errors.kisisel.soyisim}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="label">Telefon Numarası</label>
              <input
                id="phone"
                type="tel"
                className="input"
                value={order.kisisel.telefon}
                onChange={(e) => handleFieldChange('kisisel', 'telefon', e.target.value)}
                placeholder="05XX XXX XX XX"
              />
              {errors.kisisel.telefon && <span className="error-message">{errors.kisisel.telefon}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address" className="label">Adres</label>
              <textarea
                id="address"
                className="textarea"
                value={order.kisisel.adres}
                onChange={(e) => handleFieldChange('kisisel', 'adres', e.target.value)}
                placeholder="Adresinizi giriniz"
                rows={3}
                minLength={15}
              />
              {errors.kisisel.adres && <span className="error-message">{errors.kisisel.adres}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="notes" className="label">Sipariş Notu</label>
              <textarea
                id="notes"
                className="textarea"
                value={order.siparis.notlar}
                onChange={handleNotesChange}
                placeholder="Siparişiniz eklemek istediğiniz bir not var mı?"
              />
            </div>

            <div className="form-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="hizliTeslimat"
                  checked={order.siparis.hizliTeslimat}
                  onChange={handleHizliTeslimatChange}
                />
                <label htmlFor="hizliTeslimat">Hızlı Teslimat (+50₺)</label>
              </div>
            </div>

            <div className="form-row">
              <div className="quantity-control">
                <button
                  type="button"
                  className="quantity-button"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <span className="quantity-display">{order.siparis.adet}</span>
                <button
                  type="button"
                  className="quantity-button"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
              <div className="order-summary">
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
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sipariş Gönderiliyor...' : 'SİPARİŞ VER'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

