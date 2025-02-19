import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.routes";
import path from "path";

dotenv.config();

const app = express();

// Statik dosya sunucusu
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// CORS ayarları
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// Request body parsing middleware'leri
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/blog-app")
  .then(() => {
    console.log("MongoDB'ye başarıyla bağlandı");
    console.log("Bağlantı URI:", process.env.MONGODB_URI);
  })
  .catch((error) => {
    console.error("MongoDB bağlantı hatası:");
    console.error("Hata:", error);
    console.error("Bağlantı URI:", process.env.MONGODB_URI);
    process.exit(1);
  });

// Routes
app.use("/api/blogs", blogRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "Sayfa bulunamadı",
    path: req.path,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});

export default app;
