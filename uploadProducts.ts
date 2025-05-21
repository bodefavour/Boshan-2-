import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

// Firebase Admin SDK initialization
initializeApp({
  credential: cert("./boshan-store-firebase-adminsdk-fbsvc-f3eaea98ba.json"), // Update the path
});

const db = getFirestore();

// Function to upload products to Firestore
async function uploadProducts() {
  try {
    // Read and parse the products.json file
    const productsData = JSON.parse(fs.readFileSync("./src/data/products.json", "utf8"));

    // Ensure products is an array
    if (!Array.isArray(productsData)) {
      throw new Error("Products data is not an array");
    }

    const collectionRef = db.collection("products");

    // Loop through each product and upload to Firestore
    for (const product of productsData) {
      const docRef = collectionRef.doc(product.id.toString()); // Use id as document ID

      // Validate product fields
      const validatedProduct = {
        id: product.id,
        name: product.name,
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