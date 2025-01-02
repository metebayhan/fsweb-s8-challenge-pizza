import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src="/images/iteration-2-images/footer/logo-footer.svg" alt="Teknolojik Yemekler Logo" className="footer-logo" />
          <div className="contact-info">
            <div className="contact-item">
              <img src="/images/iteration-2-images/footer/icons/icon-1.png" alt="Adres" />
              <span>341 Londonderry Road, İstanbul Türkiye</span>
            </div>
            <div className="contact-item">
              <img src="/images/iteration-2-images/footer/icons/icon-2.png" alt="Email" />
              <span>acilsiparis@teknolojiyemekler.com</span>
            </div>
            <div className="contact-item">
              <img src="/images/iteration-2-images/footer/icons/icon-3.png" alt="Telefon" />
              <span>+90 216 123 45 67</span>
            </div>
          </div>
        </div>

        <div className="footer-center">
          <h3>Hot Menu</h3>
          <ul className="menu-list">
            <li>Terminal Pizza</li>
            <li>5 Kişilik Hackathon Pizza</li>
            <li>useState Effect Tavuklu Pizza</li>
            <li>Beyaz Console Frosty</li>
            <li>Testler Geçti! Mutlu Burger</li>
            <li>Position Absolute Acı Burger</li>
          </ul>
        </div>

        <div className="footer-right">
          <h3>Instagram</h3>
          <div className="instagram-grid">
            <img src="/images/iteration-2-images/footer/insta/li-0.png" alt="Instagram" />
            <img src="/images/iteration-2-images/footer/insta/li-1.png" alt="Instagram" />
            <img src="/images/iteration-2-images/footer/insta/li-2.png" alt="Instagram" />
            <img src="/images/iteration-2-images/footer/insta/li-3.png" alt="Instagram" />
            <img src="/images/iteration-2-images/footer/insta/li-4.png" alt="Instagram" />
            <img src="/images/iteration-2-images/footer/insta/li-5.png" alt="Instagram" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Teknolojik Yemekler.</p>
        <a href="https://twitter.com">
          <img src="/images/iteration-2-images/footer/Vector.png" alt="Twitter" />
        </a>
      </div>
    </footer>
  )
}

export default Footer 