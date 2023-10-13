import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TokenProvider } from "../context/tokenContext";

import SignUp from "./SignUp";
import Home from "./Home";
import SignIn from "./SignIn";
import Productinfos from "./ProductInfos";

function App() {
  return (
    <DivApp>
      <TokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/productinfos/:id" element={<Productinfos />} />
          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </DivApp>
  );
}
export default App;

// --------------------------------css

const DivApp = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  min-height: 100vh;
`;
