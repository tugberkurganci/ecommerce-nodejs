# E-Ticaret Platformu Backend Sistemi

Bu proje, bir e-ticaret platformunda kullanıcı yönetimi ve sipariş yönetimi için backend sistemi sağlar. Proje, Node.js ve Express.js kullanılarak geliştirilmiştir ve SQLite veritabanı kullanmaktadır. Frontend geliştirmesi yapılmamıştır; yalnızca sunucu tarafı mantığı içerir.

## Özellikler

### Kullanıcı Yönetimi
- **Yeni Kullanıcı Kaydı Oluşturma:** 
  - HTTP POST isteği ile kullanıcı adı, soyadı, e-posta adresi ve şifresi ile yeni kullanıcı kaydı oluşturulabilir.
  - Kullanıcı kaydedilir ve başlangıç bakiyesi 100 olarak ayarlanır.
  
- **Giriş Yapma:**
  - HTTP POST isteği ile e-posta adresi ve şifre ile giriş yapılabilir.
  - Kimlik bilgileri doğru ise JWT (JSON Web Token) üretilir ve döndürülür.

### Sipariş Yönetimi
- **Yeni Sipariş Oluşturma:**
  - HTTP POST isteği ile sipariş detayları (servis adı, miktar vb.) belirtilerek yeni sipariş oluşturulabilir.
  - Siparişin toplam fiyatı hesaplanır ve kullanıcının bakiyesi yeterli ise sipariş veritabanına kaydedilir. Yetersiz bakiye durumunda hata döndürülür.
  
- **Mevcut Siparişleri Listeleme:**
  - HTTP GET isteği ile mevcut siparişler JSON formatında listelenir.

### Servis Bilgileri
- **Servis Tablosunu Görüntüleme:**
  - HTTP GET isteği ile servis tablosundaki bilgiler JSON formatında döndürülür.
  - Servisler aşağıdaki dummy verilerle sağlanmaktadır:
    ```json
    {
        "services": [
            {
                "id": 1,
                "name": "Standard Shipping",
                "description": "Basic shipping service with average delivery time.",
                "price": 5.00
            },
            {
                "id": 2,
                "name": "Express Shipping",
                "description": "Faster delivery service with premium charges.",
                "price": 15.00
            },
            {
                "id": 3,
                "name": "Gift Wrapping",
                "description": "Special gift wrapping service for special occasions.",
                "price": 2.50
            },
            {
                "id": 4,
                "name": "Installation Service",
                "description": "Professional installation service for electronic devices.",
                "price": 30.00
            }
        ]
    }
    ```

### Güvenlik ve Doğrulama
- **Token Doğrulama:**
  - Her istek JWT token ile doğrulanır ve kullanıcı yetkilendirilir.

## Veritabanı ve ORM
- **Veritabanı:** SQLite
- **ORM:** Sequelize kullanılarak veritabanı işlemleri gerçekleştirilmiştir.

## Testler
- Temel testler eklenmiştir; örneğin, kullanıcı kaydı ve giriş işlemleri için testler yapılmıştır.

