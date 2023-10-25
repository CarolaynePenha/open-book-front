import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import LoadingRing from "./LoadingRing";
import styled from "styled-components";
import Header from "./Header";
import TokenContext from "../context/TokenContext";
import UserContext from "../context/UserContext";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { token, setToken } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const URL = process.env.REACT_APP_API_URL + `/order`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      async function getOrders() {
        try {
          const { data } = await axios.get(URL, config);
          setOrders(data);
          console.log("data: ", data);
        } catch (err) {
          console.log(err.response);
        }
      }
      getOrders();
    } else {
      setToken("");
      setUser("");
      navigate("/signIn");
    }
  }, [token]);

  return orders == null ? (
    <LoadingRing />
  ) : (
    <>
      <Header />
      <Article>
        <h1>Seus pedidos.</h1>
        {orders.map((order) => {
          const { name, totalPrice, date, image, title, id } = order;
          return (
            <section>
              <div className="order-top">
                <p>
                  <span>Pedido realizado dia:</span> {date}
                </p>
                <p>
                  <span>Total:</span> R${totalPrice}
                </p>
                <p>
                  <span>Enviado para:</span> {name}
                </p>
              </div>

              {order.products.map((product) => {
                return (
                  <div className="order-bottom">
                    <img src={product.image} />
                    <p>{product.title} </p>
                  </div>
                );
              })}
            </section>
          );
        })}
      </Article>
    </>
  );
}

// -----------------------css
const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 22px;
    font-weight: 500;
    margin: 20px 0px;
    padding-top: 20px;
  }
  img {
    width: 30%;
  }
  p {
    font-size: 18px;
    padding-top: 10px;
  }
  span {
    font-weight: 500;
    padding-right: 5px;
  }
  section {
    margin: 10px 0px;
    width: 90%;
    .order-top {
      border: solid 0.5px #ff8d3e;
      background-color: #ffe8d8;
      padding: 10px;
    }
    .order-bottom {
      border: solid 0.5px #ff8d3e;
      background-color: #fff3eb;
      padding: 10px;
      display: flex;
      p {
        margin-left: 10%;
      }
    }
  }
  @media (min-width: 600px) {
    h1 {
      font-size: 26px;
    }
    img {
      width: 25%;
    }
    p {
      font-size: 22px;
    }
  }
  @media (min-width: 600px) {
    h1 {
      font-size: 26px;
    }
    img {
      width: 25%;
    }
    p {
      font-size: 22px;
    }
  }
  @media (min-width: 1200px) {
    h1 {
      font-size: 30px;
    }
    img {
      width: 15%;
    }
    p {
      font-size: 26px;
    }
  }
`;
