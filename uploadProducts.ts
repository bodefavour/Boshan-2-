import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

// 🔐 Initialize Firebase Admin
initializeApp({
  credential: cert("./boshan-store-firebase-adminsdk-fbsvc-f3eaea98ba.json"),
});

const db = getFirestore();

async function uploadProducts() {
  try {
    const rawData = fs.readFileSync("./src/data/products.json", "utf8");
    const products = JSON.parse(rawData);

    if (!Array.isArray(products)) throw new Error("JSON is not an array");

    const collectionRef = db.collection("products");

    for (const product of products) {
      if (!product.id || !product.name) {
        console.warn("⚠️ Skipping product with missing ID or name:", product);
        continue;
      }

      const docRef = collectionRef.doc(product.id.toString());

      const validatedProduct = {
        id: product.id,
        name: product.name,
        category: product.category?.toLowerCase().replace(/\s+/g, "-") || "uncategorized",
        price: product.price || 0,
        oldPrice: product.oldPrice || null,
        image: product.image || "",
        isNew: product.isNew || false,
        features: Array.isArray(product.features) ? product.features : [],
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        size: product.size || "",
        description: product.description || "",
        images: Array.isArray(product.images) ? product.images : [],
      };

      await docRef.set(validatedProduct);
      console.log(`✅ Uploaded: ${product.name}`);
    }

    console.log("🎉 All products uploaded successfully.");
  } catch (err) {
    console.error("❌ Error uploading products:", err);
  }
}

uploadProducts();