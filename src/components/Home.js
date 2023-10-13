import axios from "axios";
import { useContext, useEffect, useState } from "react";

import TokenContext from "../context/tokenContext";
import Headerlogado from "./header/Header";
import Product from "./Product";
import LoadingRing from "./LoadingRing";
import styled from "styled-components";

export default function Home() {
  const { token } = useContext(TokenContext);
  const [productsList, setProductsList] = useState(null);
  const URL = process.env.REACT_APP_API_URL + "/products";
  console.log("URL: ", URL);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get(URL);
        console.log("data: ", data);
        setProductsList(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getProducts();
  }, []);
  console.log("productsList: ", productsList);

  return productsList == null ? (
    <LoadingRing />
  ) : (
    <Conteiner>
      <Headerlogado />
      {productsList.map((product, index) => {
        const { image, title, price, _id } = product;
        return (
          <Product
            key={index}
            image={image}
            title={title}
            price={price}
            id={_id}
          />
        );
      })}
    </Conteiner>
  );
}

//--------------------  css

const Conteiner = styled.div`
  width: 100%;
  height: 100vh;
`;
