import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

// Firebase Admin SDK initialization
initializeApp({
  credential: cert("./boshan-store-firebase-adminsdk-fbsvc-f3eaea98ba.json"), // Update this path if necessary
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
      const docRef = collectionRef.doc(product.id.toString());

      // Ensure category is valid
      const validatedProduct = {
        id: product.id,
        name: product.name,
        category: product.category?.toLowerCase().replace(/\s+/g, "-") || "uncategorized",
        price: product.price,
        oldPrice: product.oldPrice || null,
        image: product.image,
        isNew: product.isNew,
        features: Array.isArray(product.features) ? product.features : [],
        rating: product.rating,
        reviews: product.reviews,
        description: product.description || "",
        images: Array.isArray(product.images) ? product.images : [],
      };

      await docRef.set(validatedProduct);
      console.log(`Uploaded: ${product.name}`);
    }

    console.log("All products uploaded successfully.");
  } catch (error) {
    console.error("Error uploading products:", error);
  }
}

uploadProducts();