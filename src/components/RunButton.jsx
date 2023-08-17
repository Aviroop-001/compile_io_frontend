import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import api from "../api";

const RunButton = ({ code, language, input, setoutput }) => {

  const [isLoading, setisLoading] = useState(false);

  const handleRunCode = async () => {
    console.log("Started compilation");
    setisLoading(true);
    try {
      const response = await api.post("/compile", {
        language,
        code,
        input
      });
      if (response.status === 500) {
        if (response.data && response.data.stderr) {
          setoutput(response.data.stderr);
        } else {
          setoutput("Unknown error occurred during execution.");
        }
      } else {
        setoutput(response.data.output);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.stderr) {
        setoutput(error.response.data.stderr);
      } else {
        setoutput("Unknown error occurred.");
      }
    } finally {
      setisLoading(false);
      console.log("Execution done!");
    }
  };

  return (
    <Button
      width='80%'
      colorScheme="teal"
      isLoading={isLoading}
      loadingText="Compiling..."
      onClick={() => handleRunCode()}
    >
      Run Code
    </Button>
  );
};

export default RunButton;
