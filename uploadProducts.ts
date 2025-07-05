import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert("./boshan-store-firebase-adminsdk-fbsvc-f3eaea98ba.json"), // Update if needed
});

const db = getFirestore();

async function uploadProducts() {
  try {
    const productsData = JSON.parse(fs.readFileSync("./src/data/products.json", "utf8"));

    if (!Array.isArray(productsData)) {
      throw new Error("Products data is not an array");
    }

    const collectionRef = db.collection("products");

    for (const product of productsData) {
      // Validate essential fields
      if (!product.id || !product.name || !product.price || !product.category) {
        console.warn(`Skipping product due to missing fields: ${JSON.stringify(product)}`);
        continue;
      }

      const validatedProduct = {
        id: product.id.toString(),
        name: product.name,
        category: product.category?.toLowerCase().replace(/\s+/g, "-") || "uncategorized",
        price: Number(product.price),
        oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
        image: product.image || "",
        isNew: Boolean(product.isNew),
        features: Array.isArray(product.features) ? product.features : [],
        rating: Number(product.rating) || 0,
        size: product.size || "",
        reviews: Number(product.reviews) || 0,
        description: product.description || "",
        images: Array.isArray(product.images) ? product.images : [],
      };

      const docRef = collectionRef.doc(validatedProduct.id);
      await docRef.set(validatedProduct);
      console.log(`✅ Uploaded: ${validatedProduct.name}`);
    }

    console.log("\n🎉 All products uploaded successfully.");
  } catch (error) {
    console.error("❌ Error uploading products:", error);
  }
}

uploadProducts();