import React, { useState } from "react";
import { Box, Checkbox, Input, VStack, Textarea } from "@chakra-ui/react";

const InputComponent = ({ input, setinput, inputEnabled, setinputEnabled}) => {

  return (
    <Box p={4} width='80%'>
      <VStack align="start" spacing={4}>
        <Checkbox
          isChecked={inputEnabled}
          onChange={() => {
            setinputEnabled(!inputEnabled);
            setinput("");
          }}
        >
          Custom Input
        </Checkbox>
        {inputEnabled && (
          <Textarea
            placeholder="Enter input..."
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
          />
        )}
      </VStack>
    </Box>
  );
};

export default InputComponent;
