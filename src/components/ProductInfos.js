import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LoadingRing from "./LoadingRing";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import ProductContext from "../context/ProductContext";
import TokenContext from "../context/TokenContext";

export default function Productinfos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, setProduct } = useContext(ProductContext);

  const { token } = useContext(TokenContext);
  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [changeHeader, setChangeHeader] = useState(false);

  useEffect(() => {
    const URL = process.env.REACT_APP_API_URL + `/products/${id}`;

    async function getProduct() {
      try {
        const { data } = await axios.get(URL);
        setProduct([{ ...data, quantity: 1 }]);
        const stringifyData = JSON.stringify([data]);
        localStorage.setItem("product", stringifyData);
      } catch (err) {
        console.log(err.response);
      }
    }
    getProduct();
  }, []);

  function addressNavigate(link) {
    if (token) {
      if (link === "address") {
        console.log("productInfo", product);
        navigate("/address/buy");
        window.scrollTo(0, 0);
      }
      if (link === "trolley") {
        console.log("productInfo", product);

        const URL = process.env.REACT_APP_API_URL + `/trolley/${id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const body = {
          quantity: product[0].quantity,
        };
        async function postTrolleyItem() {
          console.log("body: ", body);

          try {
            await axios.post(URL, body, config);
            setChangeHeader(!changeHeader);
            window.scrollTo(0, 0);
          } catch (err) {
            console.log(err.response);
          }
        }
        postTrolleyItem();
      }
    } else {
      navigate("/signIn");
    }
  }

  function returnInfos() {
    if (product[0]) {
      const { image, title, description, price, seller, category } = product[0];
      return (
        <>
          <Header changeHeader={changeHeader} />
          <Section>
            <p>{title}</p>
            <img src={image} alt="book" />
            <div className="price">
              <p>Capa comun</p>
              <span>R${price}</span>
            </div>
            <div className="infos">
              <p className="category">Categoria: {category}</p>
              <p className="seller">Vendedor: {seller}</p>{" "}
              <div className="ordered-quantity">
                <label for="quantity">Quantidade:</label>
                <select
                  required
                  value={product[0] ? product[0].quantity || 1 : 0}
                  onChange={(e) => {
                    setProduct([{ ...product[0], quantity: e.target.value }]);
                  }}
                >
                  {quantityOptions.map((value) => {
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button
                onClick={() => addressNavigate("trolley")}
                className="trolley"
              >
                {" "}
                Adicionar ao carrinho
              </button>
              <button onClick={() => addressNavigate("address")}>
                Comprar agora
              </button>
              <p>{description}</p>
            </div>
          </Section>
        </>
      );
    } else {
      return <LoadingRing />;
    }
  }

  return returnInfos();
}

// -------------- css
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-family: "Young Serif", serif;
    width: 90%;
    font-size: 26px;
    margin: 5% 0%;
  }
  img {
    width: 60%;
    margin-bottom: 30px;
  }
  .price {
    width: 90%;
    display: flex;
    flex-direction: column;
    border: solid 2px #ff8d3e;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(180deg, #fff3eb, #ffd1b1, #ffaf77);
    span {
      font-size: 26px;
      padding-bottom: 20px;
    }
    p {
      width: fit-content;
      font-family: "Roboto", sans-serif;
      font-size: 24px;
      font-weight: 500;
      margin-top: 20px;
      margin-bottom: 10px;
    }
  }
  .infos {
    width: 90%;
    p {
      font-family: "Roboto", sans-serif;
      font-size: 20px;
    }
    button {
      width: 100%;
      height: 60px;
      border-radius: 5px;
      margin-top: 20px;
      border: none;
      background-color: #ff8d3e;
      color: #ffffff;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .trolley {
      background-color: #54433a;
      color: #ffffff;
    }
  }
  .ordered-quantity {
    display: flex;
    height: fit-content;
    align-items: center;
    label {
      font-size: 20px;
      margin-right: 10px;
    }
    select {
      width: 50px;
      height: 40px;
      background-color: #fff3eb;
      border: none;
      font-size: 20px;
    }
  }
`;
