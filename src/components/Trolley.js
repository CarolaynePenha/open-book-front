import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import TokenContext from "../context/TokenContext";
import LoadingRing from "./LoadingRing";
import UserContext from "../context/UserContext";

export default function Trolley() {
  const [trolleyState, setTrolleyState] = useState(null);
  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { token, setToken } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);
  const [changeHeader, setChangeHeader] = useState(false);
  const navigate = useNavigate();
  const [deleteState, setDeleteState] = useState(false);
  let totalOrder = 0;

  useEffect(() => {
    if (token) {
      const URL = process.env.REACT_APP_API_URL + `/trolley`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      async function getTrolley() {
        try {
          const { data } = await axios.get(URL, config);
          setTrolleyState(data);
          setChangeHeader(!changeHeader);
          const stringifyData = JSON.stringify(data);
          localStorage.setItem("trolley", stringifyData);
        } catch (err) {
          console.log(err.response);
        }
      }

      getTrolley();
    } else {
      setToken("");
      setUser("");
      navigate("/signIn");
    }
  }, [deleteState]);

  async function deleteItem(id) {
    const URL = process.env.REACT_APP_API_URL + `/trolley/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.delete(URL, config);
      setDeleteState(!deleteState);
    } catch (err) {
      console.log(err.response);
    }
  }

  async function postTrolleyItem(id) {
    console.log("id: ", id);
    const URL = process.env.REACT_APP_API_URL + `/trolley/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      quantity: trolleyState.quantity,
    };
    try {
      console.log("trolleyState: ", trolleyState);
      await axios.post(URL, body, config);
      setDeleteState(!deleteState);
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err.response);
    }
  }

  return trolleyState === null ? (
    <LoadingRing />
  ) : trolleyState.length >= 1 ? (
    <>
      <Header changeHeader={changeHeader} />
      <Article>
        <div className="title">
          <h1>Carrinho de compras</h1>
        </div>

        {trolleyState.map((trolleyItem, index) => {
          console.log("trolleyItem: ", trolleyItem);
          const { image, title, seller, price, quantity, total, _id } =
            trolleyItem;
          totalOrder += total;
          return (
            <section key={index}>
              <img src={image} />
              <div className="infos">
                <p>{title}</p>
                <span>R$ {price} </span>
                <p>Vendido por: {seller}</p>
                <div className="quantity">
                  <label>Qtd:</label>
                  <select
                    required
                    value={quantity}
                    onChange={(e) => {
                      setTrolleyState({
                        ...trolleyState,
                        quantity: e.target.value,
                      });
                      postTrolleyItem(_id);
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
                  <button onClick={() => deleteItem(_id)}>Excluir</button>
                </div>
              </div>
            </section>
          );
        })}
        <div className="total">
          <p>
            <span>Total:</span> R$ {totalOrder}
          </p>
          <button
            onClick={() => {
              const path = "trolley";
              navigate(`/address/${path}`);
            }}
          >
            Fechar pedido
          </button>
        </div>
      </Article>
    </>
  ) : (
    <>
      <Header />
      <CarinhoVazio>
        <p>Seu carrinho esta vazio.</p>
      </CarinhoVazio>
    </>
  );
}

// --------------------------------- css
const Article = styled.article`
  width: 100%;
  height: fit-content;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 6% 0%;

  p {
    padding: 10px 0px;
  }

  h1 {
    font-size: 24px;
    font-weight: 500;
    padding-left: 20px;
  }
  .title {
    width: 100%;
    margin-bottom: 10px;
    border-bottom: solid 1px #95857c;
    display: flex;
    justify-content: flex-start;
    padding-bottom: 10%;
  }
  section {
    width: 100%;
    display: flex;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: solid 1px #95857c;
    img {
      width: 25%;
      margin: 0px 20px;
    }
    span {
      font-size: 18px;
      font-weight: 500;
    }
    .infos {
      display: flex;
      flex-direction: column;
    }
    .quantity {
      select {
        font-size: 16px;
        height: 30px;
        width: 40px;
        background-color: #eae4e1;
        border: solid 1px #ff8d3e;
      }
      button {
        width: 80px;
        height: 30px;
        margin-left: 10%;
        border: solid 1px #ff8d3e;
        border-radius: 30px;
        font-weight: 600;
        background-color: #eae4e1;
        font-size: 14px;
      }
    }
  }
  .total {
    span {
      font-weight: 500;
    }
    p {
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
  }
  @media (min-width: 600px) {
    .title {
      padding-bottom: 5%;
    }
    h1 {
      font-size: 28px;
    }
    section {
      img {
        width: 20%;
        margin-right: 10%;
      }
      p {
        font-size: 24px;
      }
      span {
        font-size: 25px;
      }
      label {
        font-size: 24px;
      }
      .quantity {
        padding-top: 10%;
        select {
          font-size: 20px;
          height: 40px;
          width: 50px;
        }
        button {
          width: 150px;
          height: 40px;
          font-size: 16px;
        }
      }
    }
    .total {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        font-size: 25px;
      }
      button {
        width: 250px;
        height: 70px;
        font-size: 24px;
      }
    }
  }
  @media (min-width: 1100px) {
    h1 {
      font-size: 32px;
    }
    section {
      img {
        width: 15%;
        margin-right: 10%;
      }
      p {
        font-size: 28px;
      }
      span {
        font-size: 28px;
      }
      label {
        font-size: 28px;
      }
      .quantity {
        select {
          font-size: 24px;
          height: 45px;
          width: 60px;
        }
        button {
          width: 150px;
          height: 50px;
          font-size: 18px;
        }
      }
    }
    .total {
      p {
        font-size: 28px;
      }
      button {
        width: 350px;
        height: 70px;
        font-size: 28px;
      }
    }
  }
`;
const CarinhoVazio = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 35vh;
  p {
    font-size: 22px;
  }
`;
