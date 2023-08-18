import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import CodeDisplay from "./components/CodeDisplay";
import Main from "./components/Main";

function App() {

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/shared/:uniqueId" element={<CodeDisplay />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
