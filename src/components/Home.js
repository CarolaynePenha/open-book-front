import axios from "axios";
import { useEffect, useState } from "react";

import Header from "./Header";
import Product from "./Product";
import LoadingRing from "./LoadingRing";
import styled from "styled-components";

export default function Home() {
  const [productsList, setProductsList] = useState(null);
  const URL = process.env.REACT_APP_API_URL + "/products";
  const titleArr = [];

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get(URL);
        setProductsList(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getProducts();
  }, []);

  return productsList == null ? (
    <LoadingRing />
  ) : (
    <>
      <Header setProductsList={setProductsList} />
      <Conteiner>
        {productsList.map((product, index) => {
          const { image, title, price, _id } = product;
          titleArr.push(title);
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
    </>
  );
}

//--------------------  css

const Conteiner = styled.div`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  padding: 10% 0%;

  @media (min-width: 600px) {
    min-height: fit-content;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    align-items: center;
  }
  @media (min-width: 1200px) {
    justify-content: space-evenly;
  }
`;
