import mongoose from "mongoose";
import dotenv from "dotenv";
import { Blog } from "../models/blog.model";

dotenv.config();

// Slug oluşturma fonksiyonu
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9ğüşıöç]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const dummyBlogs = [
  {
    title: "TypeScript ile Modern Web Geliştirme",
    description:
      "TypeScript kullanarak modern web uygulamaları geliştirmenin temel prensipleri ve best practice'leri hakkında detaylı bir rehber.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Yazılım Geliştirme",
    author: "Ahmet Yılmaz",
    slug: "typescript-ile-modern-web-gelistirme",
  },
  {
    title: "MongoDB Atlas Kullanım Rehberi",
    description:
      "MongoDB Atlas'ın kurulumu, yapılandırması ve verimli kullanımı hakkında kapsamlı bir rehber. Örnek projelerle pratik uygulamalar.",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    category: "Veritabanı",
    author: "Ayşe Demir",
    slug: "mongodb-atlas-kullanim-rehberi",
  },
  {
    title: "Node.js ve Express ile REST API Geliştirme",
    description:
      "Node.js ve Express.js kullanarak modern, güvenli ve ölçeklenebilir REST API'ler geliştirme sürecinin detaylı anlatımı.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    category: "Backend Geliştirme",
    author: "Mehmet Kaya",
    slug: "nodejs-ve-express-ile-rest-api-gelistirme",
  },
  {
    title: "Git ve GitHub Kullanım Kılavuzu",
    description:
      "Versiyon kontrolü ve işbirlikli geliştirme için Git ve GitHub'ın etkili kullanımı. Temel kavramlardan ileri seviye tekniklere.",
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb",
    category: "Versiyon Kontrolü",
    author: "Zeynep Şahin",
    slug: "git-ve-github-kullanim-kilavuzu",
  },
];

const seedDatabase = async () => {
  try {
    // Veritabanı bağlantısı
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Veritabanına bağlanıldı");

    // Koleksiyonu temizle
    await Blog.deleteMany({});
    console.log("Blog koleksiyonu temizlendi");

    // Örnek verileri ekle
    await Blog.insertMany(dummyBlogs);
    console.log("Örnek blog yazıları eklendi");

    console.log("Veritabanı başarıyla dolduruldu!");
    process.exit(0);
  } catch (error) {
    console.error("Hata:", error);
    process.exit(1);
  }
};

seedDatabase();
