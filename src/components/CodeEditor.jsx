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
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  DownloadIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";
import MonacoEditor from "react-monaco-editor";

const CodeEditor = ({ code, setcode, language, setlanguage}) => {

  //States
  const [showAlert, setShowAlert] = useState(false);

  //Constants
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
    onCopy();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
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
            <Tooltip title="Import Code">
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
          <Tooltip title="Import Code">
            <Box
              as={DownloadIcon}
              cursor="pointer"
              fontSize="xl"
              color="teal.500"
              title="Copy Code"
              ml="2rem"
              onClick={handleCopyButtonClick}
            />
          </Tooltip>
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
