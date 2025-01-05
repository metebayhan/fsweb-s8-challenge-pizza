describe('Teknolojik Yemekler - Entegrasyon Testleri', () => {
  it('Logo tüm sayfalarda doğru görüntülenmeli', () => {
    // Ana sayfa logo kontrolü
    cy.visit('/')
    cy.get('.header-logo').should('be.visible')
    cy.get('.header-logo').should('have.attr', 'src').should('include', 'logo.svg')

    // Sipariş sayfası logo kontrolü
    cy.visit('/siparis')
    cy.get('.header-logo').should('be.visible')
    cy.get('.header-logo').should('have.attr', 'src').should('include', 'logo.svg')
  })

  it('Ana sayfadan sipariş sayfasına geçiş senaryoları çalışmalı', () => {
    cy.visit('/')
    
    // ACIKTIM butonu ile geçiş
    cy.get('.hero-button').click()
    cy.url().should('include', '/siparis')
    cy.go('back')

    // Menü kartı ile geçiş
    cy.get('.menu-item').first().click()
    cy.url().should('include', '/siparis')
    cy.go('back')

    // Özel menü ile geçiş
    cy.get('.special-menu.red').click()
    cy.url().should('include', '/siparis')
  })

  it('Sipariş formu başarılı senaryo testi', () => {
    cy.visit('/siparis')

    // Form doldurma
    cy.get('input[value="Büyük"]').check()
    cy.get('select').select('İnce')
    
    // Malzeme seçimi
    cy.get('.checkbox-grid input[type="checkbox"]').then($checkboxes => {
      cy.wrap($checkboxes).first().check()
      cy.wrap($checkboxes).eq(1).check()
      cy.wrap($checkboxes).eq(2).check()
      cy.wrap($checkboxes).eq(3).check()
    })

    // Kişisel bilgiler
    cy.get('#firstName').type('Test')
    cy.get('#lastName').type('Kullanıcı')
    cy.get('#phone').type('05551234567')
    cy.get('#address').type('Test Mahallesi, Test Sokak No:1 İstanbul')
    
    // Hızlı teslimat
    cy.get('#hizliTeslimat').check()

    // Sipariş gönderme
    cy.get('.submit-button').click()
    cy.url().should('include', '/success')
  })

  it('Sipariş özeti fiyat hesaplaması doğru yapılmalı', () => {
    cy.visit('/siparis')

    // Temel seçimler
    cy.get('input[value="Büyük"]').check()
    cy.get('select').select('İnce')
    
    // 4 malzeme seçimi (her biri 5₺)
    cy.get('.checkbox-grid input[type="checkbox"]').then($checkboxes => {
      for(let i = 0; i < 4; i++) {
        cy.wrap($checkboxes).eq(i).check()
      }
    })

    // Hızlı teslimat (50₺)
    cy.get('#hizliTeslimat').check()

    // Fiyat kontrolü
    // Base: 85.50₺ + Malzeme: (4 * 5₺) + Hızlı Teslimat: 50₺ = 155.50₺
    cy.get('.summary-row.total').should('contain', '155.50')

    // Adet artırma
    cy.get('.quantity-button').last().click()
    cy.get('.summary-row.total').should('contain', '311.00')
  })

  it('Success sayfası sipariş detayları doğru görüntülenmeli', () => {
    cy.visit('/siparis')

    const testData = {
      isim: 'Test',
      soyisim: 'Kullanıcı',
      telefon: '05551234567',
      adres: 'Test Mahallesi, Test Sokak No:1 İstanbul'
    }

    // Form doldurma
    cy.get('input[value="Büyük"]').check()
    cy.get('select').select('İnce')
    cy.get('.checkbox-grid input[type="checkbox"]').first().check()
    cy.get('.checkbox-grid input[type="checkbox"]').eq(1).check()
    cy.get('.checkbox-grid input[type="checkbox"]').eq(2).check()
    cy.get('.checkbox-grid input[type="checkbox"]').eq(3).check()
    cy.get('#firstName').type(testData.isim)
    cy.get('#lastName').type(testData.soyisim)
    cy.get('#phone').type(testData.telefon)
    cy.get('#address').type(testData.adres)
    cy.get('#hizliTeslimat').check()

    cy.get('.submit-button').click()

    // Success sayfası kontrolleri
    cy.get('.success-message').should('contain', 'SİPARİŞ ALINDI')
    cy.get('.info-value').should('contain', testData.isim)
    cy.get('.info-value').should('contain', testData.soyisim)
    cy.get('.info-value').should('contain', testData.telefon)
    cy.get('.info-value').should('contain', testData.adres)
    cy.get('.info-value').should('contain', 'Hızlı Teslimat')
  })

  it('Form validasyonları doğru çalışmalı', () => {
    cy.visit('/siparis')

    // Boş form gönderimi
    cy.get('.submit-button').click()
    cy.url().should('include', '/siparis')

    // Eksik malzeme kontrolü
    cy.get('input[value="Büyük"]').check()
    cy.get('select').select('İnce')
    cy.get('.checkbox-grid input[type="checkbox"]').first().check()
    cy.get('.error-message').should('contain', 'En az 4 malzeme')

    // Kısa isim kontrolü
    cy.get('#firstName').type('Te')
    cy.get('.error-message').should('contain', 'En az 3 karakter')

    // Geçersiz telefon kontrolü
    cy.get('#phone').type('123')
    cy.get('.error-message').should('contain', 'Geçerli bir telefon')
  })

  it('Responsive tasarım tüm sayfalarda çalışmalı', () => {
    // Ana sayfa responsive kontrolleri
    cy.visit('/')
    cy.viewport('iphone-6')
    cy.get('.hero-title').should('be.visible')
    cy.get('.special-menus').should('be.visible')
    
    // Sipariş sayfası responsive kontrolleri
    cy.visit('/siparis')
    cy.viewport('iphone-6')
    cy.get('.banner-content').should('be.visible')
    cy.get('.form').should('be.visible')
    
    // Success sayfası responsive kontrolleri
    cy.visit('/siparis')
    cy.get('input[value="Büyük"]').check()
    cy.get('select').select('İnce')
    cy.get('.checkbox-grid input[type="checkbox"]').then($checkboxes => {
      for(let i = 0; i < 4; i++) {
        cy.wrap($checkboxes).eq(i).check()
      }
    })
    cy.get('#firstName').type('Test')
    cy.get('#lastName').type('Kullanıcı')
    cy.get('#phone').type('05551234567')
    cy.get('#address').type('Test Mahallesi, Test Sokak No:1 İstanbul')
    cy.get('.submit-button').click()
    
    cy.viewport('iphone-6')
    cy.get('.success-content').should('be.visible')
    cy.get('.order-details').should('be.visible')
  })

  it('Footer tüm sayfalarda doğru görüntülenmeli', () => {
    // Ana sayfa footer kontrolü
    cy.visit('/')
    cy.get('.footer').should('be.visible')
    cy.get('.footer-address').should('exist')
    cy.get('.footer-menu').should('exist')
    cy.get('.footer-instagram').should('exist')

    // Sipariş sayfası footer kontrolü
    cy.visit('/siparis')
    cy.get('.footer').should('be.visible')
    cy.get('.footer-address').should('exist')
    cy.get('.footer-menu').should('exist')
    cy.get('.footer-instagram').should('exist')

    // Success sayfası footer kontrolü
    cy.visit('/siparis')
    cy.get('input[value="Büyük"]').check()
    cy.get('select').select('İnce')
    cy.get('.checkbox-grid input[type="checkbox"]').then($checkboxes => {
      for(let i = 0; i < 4; i++) {
        cy.wrap($checkboxes).eq(i).check()
      }
    })
    cy.get('#firstName').type('Test')
    cy.get('#lastName').type('Kullanıcı')
    cy.get('#phone').type('05551234567')
    cy.get('#address').type('Test Mahallesi, Test Sokak No:1 İstanbul')
    cy.get('.submit-button').click()

    cy.get('.footer').should('be.visible')
    cy.get('.footer-address').should('exist')
    cy.get('.footer-menu').should('exist')
    cy.get('.footer-instagram').should('exist')
  })
}) 