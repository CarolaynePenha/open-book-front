import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TokenProvider } from "../context/TokenContext";
import { UserProvider } from "../context/UserContext";
import { ProductProvider } from "../context/ProductContext";
import { OrderProvider } from "../context/OrderContext";

import SignUp from "./SignUp";
import Home from "./Home";
import SignIn from "./SignIn";
import Productinfos from "./ProductInfos";
import Orders from "./Orders";
import Order from "./Order";
import Address from "./Address";
import Payment from "./Payment";
import Trolley from "./Trolley";

function App() {
  return (
    <DivApp>
      <TokenProvider>
        <UserProvider>
          <ProductProvider>
            <OrderProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signUp" element={<SignUp />} />
                  <Route path="/signIn" element={<SignIn />} />
                  <Route path="/productinfos/:id" element={<Productinfos />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/address/:path" element={<Address />} />
                  <Route path="/payment/:path" element={<Payment />} />
                  <Route path="/order/:path" element={<Order />} />
                  <Route path="/trolley" element={<Trolley />} />
                </Routes>
              </BrowserRouter>
            </OrderProvider>
          </ProductProvider>
        </UserProvider>
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
