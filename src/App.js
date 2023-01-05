import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Post from "./components/Post";
import GlobalStyle from "./styles/GlobalStyle";


export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
        <Route path="/main" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  );
}

