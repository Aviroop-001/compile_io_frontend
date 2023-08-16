import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Divider,
} from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import InputComponent from "./components/InputComponent";
import OutputComponent from "./components/OutputComponent";
import RunButton from "./components/RunButton";

function App() {
  const [inputEnabled, setinputEnabled] = useState(false);
  const [input, setinput] = useState("");
  const [code, setcode] = useState("");
  const [language, setlanguage] = useState("cpp");
  const [output, setoutput] = useState("");

  const handleInputToggle = () => {
    setinputEnabled(!inputEnabled);
  };

  const inputHandler = (value) => {
    setinput(value);
  };
// 
  const handleRunCode = () => {
    // Implement logic to send code and input to the backend, and update output
  };

  return (
    <ChakraProvider>
      <Flex p={4}>
        <Box flex="4">
          <CodeEditor
            code={code}
            setcode={setcode}
            language={language}
            setlanguage={setlanguage}
          />
        </Box>

        <Flex direction="column" justify="space-evenly" flex='2'>
          <InputComponent
            input={input}
            setinput={setinput}
            inputEnabled={inputEnabled}
            setinputEnabled={setinputEnabled}
          />
          {/* <Divider my={4} /> */}
          <RunButton input={input} language={language} code={code} setoutput={setoutput}/>
          <OutputComponent output={output} />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
