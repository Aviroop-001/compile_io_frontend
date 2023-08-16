import React, { useState } from "react";
import { Box, Button, Select, VStack } from "@chakra-ui/react";
import MonacoEditor from "react-monaco-editor";

const CodeEditor = ({ code, setcode, language, setlanguage}) => {

  return (
    <Box p={4}>
      <VStack align="start" spacing={4}>
        <Select
          value={language}
          onChange={(e) => setlanguage(e.target.value)}
          width="fit-content"
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="js">JavaScript</option>
        </Select>

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
