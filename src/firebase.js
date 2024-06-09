// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5kPWH47fqkrVijOg4-_X91J_QfAv3yIs",
  authDomain: "cvplatform-5bd6b.firebaseapp.com",
  projectId: "cvplatform-5bd6b",
  storageBucket: "cvplatform-5bd6b.appspot.com",
  messagingSenderId: "68699023155",
  appId: "1:68699023155:web:aa7b5e9e2adc7b4c5f0046",
  measurementId: "G-FSG139BQ03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function uploadPDF(file, userId, description) {
    // Create a storage reference with a unique filename
    const storageRef = ref(storage, `pdfs/${userId}/${file.name}`);
    
    // Upload file to the storage reference
    await uploadBytes(storageRef, file);
    
    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);
    
    // Create a document reference in the 'pdfMetadata' collection
  

    const data = {
        userId,
        fileName: file.name,
        description,
        downloadURL
    }

    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }
    // Set the document data
    const res = await fetch("https://cvplatform-5bd6b-default-rtdb.firebaseio.com/Userdata.json",options );
    console.log(res)

    console.log('File uploaded successfully:', downloadURL);
    return downloadURL; 
}

export default app;
