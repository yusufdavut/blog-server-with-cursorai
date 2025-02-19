import { Schema, model } from "mongoose";

// Slug oluşturma fonksiyonu
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9ğüşıöç]/g, "-") // Türkçe karakterleri koru, diğerlerini tire ile değiştir
    .replace(/-+/g, "-") // Ardışık tireleri tek tireye dönüştür
    .replace(/^-|-$/g, ""); // Baş ve sondaki tireleri kaldır
};

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
      get: function (url: string) {
        if (url && url.startsWith("/uploads/")) {
          return `http://localhost:3000${url}`;
        }
        return url;
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// Kaydetmeden önce slug oluştur
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = createSlug(this.title);
  }
  next();
});

export const Blog = model("Blog", blogSchema);
