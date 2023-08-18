import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Select,
  VStack,
  Tooltip,
  useClipboard,
  Alert,
  AlertIcon,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon, AttachmentIcon, LinkIcon } from "@chakra-ui/icons";
import MonacoEditor from "react-monaco-editor";
import api from "../api";

const CodeEditor = ({ code, setcode, language, setlanguage}) => {

  //States
  const [showAlert, setShowAlert] = useState(false);
  const [sharedLink, setsharedLink] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Constants
  const toast = useToast();
  const { onCopy: onCopyShareLink } = useClipboard(sharedLink);
  const { onCopy: onCopyCode } = useClipboard(code);
  const { onCopy } = useClipboard(code);
  const languageSetupCode = {
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your C++ code here\n    return 0;\n}`,
    js: `// Your JavaScript code here\n`,
    py: `# Your Python code here\n`,
  };

  //Functions
  const handleLanguageChange = (selectedLanguage) => {
    setlanguage(selectedLanguage);
    setcode(languageSetupCode[selectedLanguage]);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setcode(fileContent);
      const fileExtension = selectedFile.name.split(".").pop();
      setlanguage(fileExtension);
    };
    reader.readAsText(selectedFile);
  };

  const handleCopyButtonClick = () => {
    onCopyCode();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleLinkShare = () =>{
    onCopyShareLink();
  }

  const shareCodeSnippet = async () => {
    toast({
      title: "Sharing...",
      position: "top-right",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    try {
      const response = await api.post("/share", { code });
      const uniqueId = response.data.uniqueId;
      const shareLink = `https://compile-io-frontend.vercel.app/shared/${uniqueId}`; 
      setsharedLink(shareLink);
       setIsModalOpen(true); 
    } catch (error) {
      console.error("Error sharing code snippet:", error);
      toast({
        title: "Error",
        position: "top-right",
        description: "Failed to share code snippet.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally{
      handleLinkShare();
      console.log("Link copied");
    }
  };

  useEffect(() => {
    setcode(languageSetupCode[language] || languageSetupCode["cpp"]);
  }, []);

  return (
    <Box p={4}>
      <VStack align="start" spacing={4}>
        <Flex justifyContent="space-evenly" alignItems="center">
          <Select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            width="fit-content"
          >
            <option value="cpp">C++</option>
            <option value="py">Python</option>
            <option value="js">JavaScript</option>
          </Select>
          <label>
            <input
              type="file"
              accept=".cpp, .js, .py"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Tooltip label="Import Code">
              <Box
                as={AttachmentIcon}
                cursor="pointer"
                fontSize="xl"
                color="teal.500"
                title="Import Code"
                ml="2rem"
              />
            </Tooltip>
          </label>
          <Tooltip label="Copy Code">
            <Box
              as={CopyIcon}
              cursor="pointer"
              fontSize="xl"
              color="teal.500"
              title="Copy Code"
              ml="2rem"
              onClick={handleCopyButtonClick}
            />
          </Tooltip>
          <Tooltip label="Create sharable link" aria-label="A tooltip">
            <Box
              as={LinkIcon}
              cursor="pointer"
              fontSize="xl"
              color="teal.500"
              title="Copy Code"
              ml="2rem"
              onClick={() => shareCodeSnippet()}
            />
          </Tooltip>
          {/* {sharedLink && (
            <Button onClick={() => handleLinkShare()} ml='1rem'>share link</Button>
          )} */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Shareable Link</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box>{sharedLink}</Box>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => handleLinkShare()} colorScheme="teal">
                  <CopyIcon />
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {showAlert && (
            <Alert
              status="success"
              position="absolute"
              top="10px"
              right="10px"
              variant="subtle"
              width="15rem"
              onClose={() => setShowAlert(false)}
            >
              <AlertIcon />
              Code copied to clipboard!
            </Alert>
          )}
        </Flex>

        <Box borderWidth="1px" borderRadius="md" overflow="hidden" width="100%">
          <MonacoEditor
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(newValue) => setcode(newValue)}
            width="100%"
            height="500px"
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default CodeEditor;
