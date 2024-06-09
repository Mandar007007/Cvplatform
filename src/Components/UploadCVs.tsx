import { useState } from 'react';
import { auth,uploadPDF } from '../firebase'; // Assuming you have a reference to Firebase Firestore

export default function UploadCV() {
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);

    const handleUpload = async () => {
        try {
            // if(files.length == 0 || description.length == 0)
            // {
            //     throw new Error("Enter details");
            // }
            const user = auth.currentUser; 
            if (user) {
                const userId = user.uid; 
                files.map(async (file) => {
                    console.log(await uploadPDF(file, userId,description))
                })
                
            } else {
                console.error('No user logged in');
            }
        } catch (error) {
            console.error('Error during upload:', error);
        }
    };
    

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files); // Convert FileList to array
        setFiles(selectedFiles);
    };
    

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Upload Your CV
            </h1>
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                id="txtArea"
                rows="5"
                cols="50"
                placeholder="Enter the job description"
                className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mb-4"
            />
            <button
                className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleUpload}
                style={{ background: '#06b6d4' }}
            >
                Submit
            </button>
            <button
                className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                style={{ background: '#06b6d4' }}
            >
                Analyze
            </button>
        </div>
    );
}
