import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as fs from "fs";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load and parse products.json file
let products: any[] = [];
try {
  const data = fs.readFileSync("./src/data/products.json", "utf-8");
  products = JSON.parse(data);
} catch (error) {
  console.error("Error reading JSON file:", error);
}

async function uploadProducts() {
  try {
    for (const product of products) {
      await addDoc(collection(db, "products"), product);
      console.log(`Uploaded: ${product.name}`);
    }
    console.log("All products uploaded successfully!");
  } catch (error) {
    console.error("Error uploading products:", error);
  }
}

uploadProducts();