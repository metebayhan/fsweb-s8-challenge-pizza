import { useState } from 'react'
import axios from 'axios'
import './OrderPage.css'
import logo from '../images/iteration-1-images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'

const malzemeler = [
  { id: 'pepperoni', label: 'Pepperoni' },
  { id: 'sosis', label: 'Sosis' },
  { id: 'kasar', label: 'Kaşar' },
  { id: 'sucuk', label: 'Sucuk' },
  { id: 'mantar', label: 'Mantar' },
  { id: 'biber', label: 'Biber' },
  { id: 'sogan', label: 'Soğan' },
  { id: 'misir', label: 'Mısır' },
  { id: 'jalapeno', label: 'Jalapeno' },
  { id: 'domates', label: 'Domates' },
  { id: 'zeytin', label: 'Zeytin' },
  { id: 'tavuk', label: 'Tavuk' }
]

export default function OrderPage() {
  const navigate = useNavigate()
  const [order, setOrder] = useState({
    kisisel: {
      isim: '',
      soyisim: '',
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
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const basePrice = 85.50
  const extraPrice = 25.00
  const total = (basePrice + extraPrice) * order.siparis.adet

  const isValid = 
    order.kisisel.isim.length >= 3 &&
    order.kisisel.soyisim.length >= 3 &&
    order.kisisel.adres.length > 0 &&
    order.pizza.boyut && 
    order.pizza.hamur && 
    order.pizza.malzemeler.length >= 4 && 
    order.pizza.malzemeler.length <= 10

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid) return

    setIsSubmitting(true)
    try {
      const response = await axios.post('https://reqres.in/api/pizza', order)
      console.log('Sipariş Özeti:', response.data)
    } catch (error) {
      console.error('Sipariş hatası:', error)
    }
    setIsSubmitting(false)
  }

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="header-logo-container">
            <img src={logo} alt="Teknolojik Yemekler Logo" className="header-logo" />
            <p className="header-subtitle">
              <Link to="/" className="header-link">Anasayfa</Link> - <strong>Sipariş</strong>
            </p>
          </div>
        </div>
      </header>
      <main className="main-content">
        <div className="card-content">
          <form onSubmit={handleSubmit} className="form">
            <div>
              <h2 className="card-title">Position Absolute Acı Pizza</h2>
              <p className="card-subtitle">
                Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
              </p>
              <p className="label">85.50₺</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="label">Boyut Seç</label>
                <div className="radio-group">
                  {['Küçük', 'Orta', 'Büyük'].map((size) => (
                    <div key={size} className="radio-item">
                      <input
                        type="radio"
                        id={size}
                        name="size"
                        value={size.toLowerCase()}
                        checked={order.pizza.boyut === size.toLowerCase()}
                        onChange={(e) => setOrder(prev => ({
                          ...prev,
                          pizza: {
                            ...prev.pizza,
                            boyut: e.target.value
                          }
                        }))}
                      />
                      <label htmlFor={size}>{size}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="label">Hamur Seç</label>
                <select 
                  className="select"
                  value={order.pizza.hamur}
                  onChange={(e) => setOrder(prev => ({
                    ...prev,
                    pizza: {
                      ...prev.pizza,
                      hamur: e.target.value
                    }
                  }))}
                >
                  <option value="">Hamur Kalınlığı</option>
                  <option value="ince">İnce</option>
                  <option value="orta">Orta</option>
                  <option value="kalin">Kalın</option>
                </select>
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
                      onChange={(e) => {
                        setOrder(prev => ({
                          ...prev,
                          pizza: {
                            ...prev.pizza,
                            malzemeler: e.target.checked
                              ? [...prev.pizza.malzemeler, malzeme.id]
                              : prev.pizza.malzemeler.filter(t => t !== malzeme.id)
                          }
                        }))
                      }}
                    />
                    <label htmlFor={malzeme.id}>{malzeme.label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="label">İsim</label>
                <input
                  id="firstName"
                  className="input"
                  value={order.kisisel.isim}
                  onChange={(e) => setOrder(prev => ({
                    ...prev,
                    kisisel: {
                      ...prev.kisisel,
                      isim: e.target.value
                    }
                  }))}
                  minLength={3}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="label">Soy İsim</label>
                <input
                  id="lastName"
                  className="input"
                  value={order.kisisel.soyisim}
                  onChange={(e) => setOrder(prev => ({
                    ...prev,
                    kisisel: {
                      ...prev.kisisel,
                      soyisim: e.target.value
                    }
                  }))}
                  minLength={3}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address" className="label">Adres</label>
              <textarea
                id="address"
                className="textarea"
                value={order.kisisel.adres}
                onChange={(e) => setOrder(prev => ({
                  ...prev,
                  kisisel: {
                    ...prev.kisisel,
                    adres: e.target.value
                  }
                }))}
                placeholder="Adresinizi giriniz"
                rows={3}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="notes" className="label">Sipariş Notu</label>
              <textarea
                id="notes"
                className="textarea"
                value={order.siparis.notlar}
                onChange={(e) => setOrder(prev => ({
                  ...prev,
                  siparis: {
                    ...prev.siparis,
                    notlar: e.target.value
                  }
                }))}
                placeholder="Siparişiniz eklemek istediğiniz bir not var mı?"
              />
            </div>

            <div className="form-row">
              <div className="quantity-control">
                <button
                  type="button"
                  className="quantity-button"
                  onClick={() => setOrder(prev => ({
                    ...prev,
                    siparis: {
                      ...prev.siparis,
                      adet: Math.max(1, prev.siparis.adet - 1)
                    }
                  }))}
                >
                  -
                </button>
                <span className="quantity-display">{order.siparis.adet}</span>
                <button
                  type="button"
                  className="quantity-button"
                  onClick={() => setOrder(prev => ({
                    ...prev,
                    siparis: {
                      ...prev.siparis,
                      adet: prev.siparis.adet + 1
                    }
                  }))}
                >
                  +
                </button>
              </div>
              <div className="order-summary">
                <div className="summary-row">
                  <span>Seçimler</span>
                  <span>{extraPrice.toFixed(2)}₺</span>
                </div>
                <div className="summary-row">
                  <span>Toplam</span>
                  <span>{total.toFixed(2)}₺</span>
                </div>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={!isValid || isSubmitting}
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

