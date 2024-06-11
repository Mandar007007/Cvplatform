import { useState } from 'react';
import { 
  Button, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Text, 
  Box, 
  Icon, 
  Input, 
  useDisclosure, 
  Textarea 
} from "@chakra-ui/react";
import { FaFileUpload } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { uploadPDF } from "../firebase.js";
import { TypeAnimation } from 'react-type-animation';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDescOpen, onOpen: onDescOpen, onClose: onDescClose } = useDisclosure();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState("");

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const removeFile = (fileName) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpload = () => {
    console.log('Files:', selectedFiles);
    console.log('Description:', description);
    setSelectedFiles([]);
    setDescription("");
    onClose();
  };

  const handleFileUpload = async () => {
    try {
      if(localStorage.getItem('user') == null)
        {
          toast.error("Please signin")
          return;
        }
      if(selectedFiles.length == 0 || description.length == 0) {
        toast.warn("Please select a file or add description")
        return;
      }
      let downloadurl = await uploadPDF(selectedFiles[0], JSON.parse(localStorage.getItem('user')).uid, description);
      if(downloadurl)
      {toast.success('Pdf Uploaded Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });}
      handleUpload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#0e1019] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-1/2">
        <img src="pro1inf.gif" className="w-[40vw]" alt="Office work GIF" />
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center space-y-4">
        <h1 className="text-white text-4xl font-extrabold">Evaluate A CV of</h1>
        <h1 className="text-white text-4xl font-extrabold">A Candidate With AI</h1>
        <TypeAnimation
          sequence={[
            'Upload Your Cvs',
            1000,
            'Analyze Your Cvs',
            1000,
            'Get Recommended',
            1000
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '2em', display: 'inline-block', color: 'white' ,marginBottom:"10px"}}
          repeat={Infinity}
        />
        <div className="flex space-x-4">
          <Button className="w-40" colorScheme="blue" onClick={onOpen}>Upload CV</Button>
          <Button className="w-40" colorScheme="green" onClick={onDescOpen}>Add Description</Button>
        </div>

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload CV</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold" mb="1rem">Kindly upload CV PDF file(s)</Text>
              <Box 
                border="2px" 
                borderColor="gray.300" 
                borderStyle="dotted" 
                borderRadius="md" 
                p={4} 
                textAlign="center" 
                position="relative"
              >
                <Icon as={FaFileUpload} boxSize={8} color="gray.500" />
                <Text mt={2} color="gray.500">Drag and drop your file(s) here or click to upload</Text>
                <Input 
                  type="file" 
                  accept=".pdf" 
                  multiple 
                  onChange={handleFileChange} 
                  position="absolute" 
                  top="0" 
                  left="0" 
                  width="100%" 
                  height="100%" 
                  opacity="0" 
                  cursor="pointer" 
                />
              </Box>
              {selectedFiles.length > 0 && (
                <Box mt={2}>
                  <Text color="gray.600">Selected files:</Text>
                  <ul>
                    {selectedFiles.map((file, index) => (
                      <li key={index} className="flex items-center">
                        <Text className="mr-2" color="gray.600">{file.name}</Text>
                        <Icon 
                          as={RxCrossCircled} 
                          onClick={() => removeFile(file.name)} 
                          cursor="pointer" 
                          color="red.500" 
                        />
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
              <Button variant="ghost" onClick={handleFileUpload}>Upload</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal blockScrollOnMount={false} isOpen={isDescOpen} onClose={onDescClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Description</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea 
                placeholder="Enter description here..." 
                value={description} 
                onChange={handleDescriptionChange} 
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onDescClose}>Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </div>
  );
};

export default Home;
