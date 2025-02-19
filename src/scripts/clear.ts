import mongoose from "mongoose";
import dotenv from "dotenv";
import { Blog } from "../models/blog.model";

dotenv.config();

const clearDatabase = async () => {
  try {
    // Veritabanı bağlantısı
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Veritabanına bağlanıldı");

    // Tüm blog verilerini sil
    await Blog.deleteMany({});
    console.log("Tüm blog verileri silindi");

    console.log("İşlem tamamlandı!");
    process.exit(0);
  } catch (error) {
    console.error("Hata:", error);
    process.exit(1);
  }
};

clearDatabase();
