import React, { useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import CodeEditor from "./CodeEditor";
import InputComponent from "./InputComponent";
import OutputComponent from "./OutputComponent";
import RunButton from "./RunButton";

function Main() {
  //States
  const [inputEnabled, setinputEnabled] = useState(false);
  const [input, setinput] = useState("");
  const [code, setcode] = useState("");
  const [language, setlanguage] = useState("cpp");
  const [output, setoutput] = useState("");

  return (
          <Box>
            <Heading
              textAlign="center"
              fontWeight="light"
              textShadow="2px 2px 2px gray"
            >
              compile.io
            </Heading>
            <Flex p={4}>
              <Box flex="4">
                <CodeEditor
                  code={code}
                  setcode={setcode}
                  language={language}
                  setlanguage={setlanguage}
                />
              </Box>

              <Flex direction="column" justify="space-evenly" flex="2">
                <InputComponent
                  input={input}
                  setinput={setinput}
                  inputEnabled={inputEnabled}
                  setinputEnabled={setinputEnabled}
                />
                {/* <Divider my={4} /> */}
                <RunButton
                  input={input}
                  language={language}
                  code={code}
                  setoutput={setoutput}
                />
                <OutputComponent output={output} />
              </Flex>
            </Flex>
          </Box>
  );
}

export default Main;

