import { Request, Response } from "express";
import { Blog } from "../models/blog.model";
import fs from "fs";
import path from "path";

// Slug oluşturma fonksiyonu
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9ğüşıöç]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

// Tüm blog yazılarını getir
export const getAllBlogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Blog yazıları getirilemedi" });
  }
};

// Yeni blog yazısı oluştur
export const createBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Gelen veri:", {
      body: req.body,
      file: req.file,
      headers: req.headers,
    });

    const { title, description, category, author } = req.body;

    // Zorunlu alanları kontrol et
    if (!title || !description || !category || !author) {
      console.log("Eksik alanlar:", {
        title: !!title,
        description: !!description,
        category: !!category,
        author: !!author,
      });

      res.status(400).json({
        error: "Eksik alanlar var",
        required: "title, description, category, author",
        received: { title, description, category, author },
      });
      return;
    }

    // Blog verisini hazırla
    const blogData = {
      title,
      description,
      category,
      author,
      slug: createSlug(title),
      imageUrl: req.file
        ? `/uploads/${req.file.filename}`
        : "https://picsum.photos/800/400",
    };

    console.log("Kaydedilecek veri:", blogData);

    // Blog'u oluştur
    const blog = await Blog.create(blogData);
    console.log("Blog kaydedildi:", blog);

    res.status(201).json(blog);
  } catch (error) {
    console.error("Blog oluşturma hatası:", error);
    res.status(400).json({
      error: "Blog oluşturulamadı",
      details: error instanceof Error ? error.message : "Bilinmeyen hata",
    });
  }
};

// Blog yazısını sil
export const deleteBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blogId = req.params.id;

    // Blog'u bul
    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.status(404).json({ error: "Blog yazısı bulunamadı" });
      return;
    }

    // Eğer blog'a ait bir resim varsa ve uploads klasöründeyse sil
    if (blog.imageUrl && blog.imageUrl.includes("/uploads/")) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        blog.imageUrl.split("/uploads/")[1]
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Blog resmi silindi:", imagePath);
      }
    }

    // Blog'u veritabanından sil
    await Blog.findByIdAndDelete(blogId);

    res.json({ message: "Blog yazısı başarıyla silindi" });
  } catch (error) {
    console.error("Blog silme hatası:", error);
    res.status(500).json({
      error: "Blog yazısı silinemedi",
      details: error instanceof Error ? error.message : "Bilinmeyen hata",
    });
  }
};

// Blog detayını getir
export const getBlogBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const slug = req.params.slug;

    // Blog'u slug ile bul
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      res.status(404).json({ error: "Blog yazısı bulunamadı" });
      return;
    }

    res.json(blog);
  } catch (error) {
    console.error("Blog detay hatası:", error);
    res.status(500).json({
      error: "Blog detayı getirilemedi",
      details: error instanceof Error ? error.message : "Bilinmeyen hata",
    });
  }
};

// Blog yazısını güncelle
export const updateBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, category, author } = req.body;

    // Blog'u bul
    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({ error: "Blog yazısı bulunamadı" });
      return;
    }

    // Eğer yeni bir resim yüklendiyse
    if (req.file) {
      // Eski resmi sil (eğer uploads klasöründeyse)
      if (blog.imageUrl && blog.imageUrl.includes("/uploads/")) {
        const oldImagePath = path.join(
          process.cwd(),
          "public",
          blog.imageUrl.split("/uploads/")[1]
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log("Eski blog resmi silindi:", oldImagePath);
        }
      }
    }

    // Blog verisini güncelle
    const updateData = {
      title: title || blog.title,
      description: description || blog.description,
      category: category || blog.category,
      author: author || blog.author,
      slug: title ? createSlug(title) : blog.slug,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : blog.imageUrl,
    };

    // Blog'u güncelle
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Güncellenmiş veriyi döndür
    );

    res.json(updatedBlog);
  } catch (error) {
    console.error("Blog güncelleme hatası:", error);
    res.status(500).json({
      error: "Blog yazısı güncellenemedi",
      details: error instanceof Error ? error.message : "Bilinmeyen hata",
    });
  }
};
