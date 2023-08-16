import React from "react";
import { Box, Heading, Textarea } from "@chakra-ui/react";

const OutputComponent = ({ output }) => {
  return (
    <Box p={4} width="80%">
      <Heading size="md">Output:</Heading>
      <Box mt={2} borderWidth="1px" borderRadius="md" p={2}>
        {output ? (
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {output}
          </pre>
        ) : (
          <p>No output yet.</p>
        )}
      </Box>
    </Box>
  );
};

export default OutputComponent;
