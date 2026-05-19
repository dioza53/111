import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase only if config is provided (not placeholder)
const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

export const app = isConfigured ? initializeApp(firebaseConfig) : null;
export const storage = isConfigured ? getStorage(app!) : null;

export const uploadImageToStorage = async (base64Image: string): Promise<string> => {
  if (!storage) {
    console.warn("Firebase is not configured. Returning local base64 string instead of uploading.");
    return base64Image; // Fallback for demo purposes
  }

  try {
    // Create a unique filename
    const filename = `custom_images/lumibrace_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
    const storageRef = ref(storage, filename);
    
    // Upload the base64 string
    const snapshot = await uploadString(storageRef, base64Image, 'data_url');
    
    // Get the public download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase Storage:", error);
    throw error;
  }
};
