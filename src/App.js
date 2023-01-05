import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from "react"

// Components
import SignUp from './Components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;