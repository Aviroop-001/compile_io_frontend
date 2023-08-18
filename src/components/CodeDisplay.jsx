import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Code,
  Container,
  Heading,
  useToast,
  useClipboard,
  Alert,
  AlertIcon,
  Button,
  CircularProgress,
  Flex,
  Center,
} from "@chakra-ui/react";
import api from "../api"; // Your API utility

const CodeDisplay = () => {
  const { uniqueId } = useParams();
  const [code, setCode] = useState("");
  const toast = useToast();
  const { onCopy } = useClipboard(code);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setloading] = useState(false);

  //Functions
  const handleCopyButtonClick = () => {
    onCopy();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchSharedCode = async () => {
        setloading(true);
      try {
        const response = await api.get(`/share/${uniqueId}`);
        setCode(response.data.code);
      } catch (error) {
        console.error("Error fetching shared code:", error);
        toast({
            position: 'top-right',
          title: "Error",
          description: "Failed to fetch shared code.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally{
        setloading(false);
      }
    };

    fetchSharedCode();
  }, [uniqueId, toast]);

  return (
    <Container maxW="container.md" py={8}>
      <Heading
        textAlign="center"
        fontWeight="light"
        textShadow="2px 2px 2px gray"
        mb='1rem'
      >
        compile.io
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" padding="1rem">
        <Heading size="md" mb={4}>
          Shared Code
        </Heading>
        <Button colorScheme="teal" onClick={() => handleCopyButtonClick()}>
          Copy
        </Button>
      </Flex>
      <Box borderWidth="1px" borderRadius="md" p={4} backgroundColor="gray.900">
        <Code
          colorScheme="teal"
          width="100%"
          whiteSpace="pre-wrap"
          padding="2rem 1rem"
          fontSize="medium"
          variant="outline"
        >
          {!loading ? (
            code
          ) : (
            <Center>
              <CircularProgress
                isIndeterminate
                color="teal.300"
                thickness="3px"
                size="5rem"
              />
            </Center>
          )}
        </Code>
      </Box>
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
    </Container>
  );
};

export default CodeDisplay;
