# Blog API

Bu proje, blog yazılarını yönetmek için geliştirilmiş bir REST API'dir. Express.js ve TypeScript kullanılarak geliştirilmiştir.
NOT: Test amaçlı CursorAI ile yazılmıştır.

## Özellikler

- Blog yazılarını listeleme
- Blog yazısı detaylarını görüntüleme
- Yeni blog yazısı ekleme
- Blog yazısı güncelleme
- Blog yazısı silme
- Resim yükleme desteği

## Teknolojiler

- Node.js
- Express.js
- TypeScript
- MongoDB
- Multer (dosya yükleme)

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/yusufdavut/blog-server-with-cursorai.git
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun ve gerekli değişkenleri ekleyin:
```
MONGODB_URI=your_mongodb_uri
PORT=3000
```

4. Projeyi başlatın:
```bash
npm run dev
```

## API Endpointleri

- `GET /api/blogs` - Tüm blog yazılarını listeler
- `GET /api/blogs/:slug` - Belirli bir blog yazısının detaylarını getirir
- `POST /api/blogs` - Yeni blog yazısı ekler
- `PUT /api/blogs/:id` - Blog yazısını günceller
- `DELETE /api/blogs/:id` - Blog yazısını siler

## Lisans

MIT
