"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import express from "express";
import {
  getAllBlogs,
  createBlog,
  deleteBlog,
  getBlogBySlug,
  updateBlog,
} from "../controllers/blog.controller";
import upload from "../middleware/upload.middleware";

const router = express.Router();

// Route'ları logla
router.use((req, res, next) => {
  console.log(`Blog Route: ${req.method} ${req.url}`);
  next();
});

// JSON ile blog oluştur
router.post("/json", createBlog);

// Form data ve resim ile blog oluştur
router.post("/", upload.single("image"), createBlog);

// Tüm blog yazılarını getir
router.get("/", getAllBlogs);

// Blog yazısını güncelle (ID ile)
router.put("/edit/:id", upload.single("image"), updateBlog);

// Blog yazısını sil (ID ile)
router.delete("/delete/:id", deleteBlog);

// Blog detayını getir (slug ile)
router.get("/:slug", getBlogBySlug);

export default router;
