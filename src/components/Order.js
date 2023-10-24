import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import TokenContext from "../context/TokenContext";
import ProductContext from "../context/ProductContext";
import UserContext from "../context/UserContext";
import OrderContext from "../context/OrderContext";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Loading from "./Loading";
import { Form } from "./SignIn";
import Header from "./Header";

export default function Order() {
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const { product, setProduct } = useContext(ProductContext);
  const [visibility, setVisibility] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const { order } = useContext(OrderContext);
  const [changeHeader, setChangeHeader] = useState(false);
  const { path } = useParams();

  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState("Confirmar pedido");

  const { name, email } = user;
  const { street, neighborhood, city, cep, state, paymentMethod, cpf } = order;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    if (path === "trolley") {
      console.log("entrei");
      const URL = process.env.REACT_APP_API_URL + `/trolley`;

      async function getTrolley() {
        try {
          const { data } = await axios.get(URL, config);
          setProduct(data);
          console.log("product: ", product);
          const stringifyData = JSON.stringify(data);
          localStorage.setItem("product", stringifyData);
        } catch (err) {
          console.log(err.response);
        }
      }
      getTrolley();
    }
  }, []);

  let totalQuantity = 0;
  let totalPrice = 0;

  async function post(event) {
    event.preventDefault();

    if (token) {
      let body = {
        email,
        street,
        neighborhood,
        city,
        name,
        cep,
        state,
        cpf,
        paymentMethod,
        totalQuantity,
        totalPrice,
      };
      const products = product.map((item) => {
        return {
          image: item.image,
          title: item.title,
          price: item.price,
          seller: item.seller,
          quantity: item.quantity,
        };
      });

      console.log("products: ", products);
      body = { ...body, products: products };
      console.log("body: ", body);
      const URL = process.env.REACT_APP_API_URL + `/order`;
      setButtonState(true);
      setButtonLoading(<Loading />);
      try {
        await axios.post(URL, body, config);
        deleteItem();
        setVisibility(true);
        setButtonState(false);
        setButtonLoading("Confirmar compra");
        window.scrollTo(0, 0);
      } catch (err) {
        console.log(err.response);
        setButtonState(false);
        setButtonLoading("Confirmar compra");
      }
    } else {
      alert("usuario não encontrado, faça login novamente");
      navigate("/signIn");
    }
  }

  async function deleteItem() {
    const URL = process.env.REACT_APP_API_URL + `/trolley`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.delete(URL, config);
      setChangeHeader(!changeHeader);
    } catch (err) {
      console.log(err.response);
    }
  }
  return (
    <>
      <Header changeHeader={changeHeader} />
      <Conteiner>
        <Form className="form" onSubmit={post}>
          <span>Itens e envio</span>
          {product.map((item) => {
            if (!item.quantity) {
              item.quantity = 1;
            }
            totalQuantity += parseInt(item.quantity);
            totalPrice += item.total;
            return (
              <div className="item">
                <img src={item.image} />
                <div className="infos-order">
                  <p>{item.title} </p>
                  <p>
                    <span>Qtd: </span>
                    {item.quantity}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="infos-product">
            <div className="conditions">
              <small>
                Ao fazer seu pedido você está condordando com as condições de
                uso da Open Book.
              </small>
            </div>
            <span>Resumo do seu pedido</span>
            <div className="infos-order">
              <div>
                <p>Método de pagamento: </p>
                <p>Itens: </p>
                <p>Preço total: </p>
              </div>
              <div>
                <p>{paymentMethod}</p>
                <p>{totalQuantity}</p>
                <p>R$ {totalPrice}</p>
              </div>
            </div>
          </div>
          <button disabled={buttonState} type="submit" className="save-button">
            {buttonLoading}
          </button>
        </Form>
        <Section visibility={visibility}>
          <p>Pedido completo</p>
        </Section>
      </Conteiner>
    </>
  );
}

// -----------------------css

const Conteiner = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10%;
  .form {
    width: 90%;
    margin-bottom: 60px;
  }
  p {
    font-size: 18px;
    padding-top: 10px;
  }

  span {
    font-size: 18px;
    font-weight: 500;
    margin-top: 15px;
  }
  .infos-product {
    border: solid 2px #ff8d3e;
    margin: 30px 0px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #fff3eb;
    .infos-order {
      display: flex;
      justify-content: space-between;
    }
    .conditions {
      border-bottom: solid 2px #ff8d3e;
      height: fit-content;
      padding-bottom: 15px;
    }
  }
  .item {
    border: solid 2px #ff8d3e;
    width: 100%;
    display: flex;
    padding: 20px;
    margin-top: 10px;

    background-color: #fff3eb;

    .infos-order {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    img {
      width: 30%;
      margin-right: 10px;
    }
  }
`;
const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  display: ${(props) => (props.visibility ? "flex" : "none")};
  position: absolute;
  bottom: 0;
  z-index: 2;
  background-color: #bba79c;
  p {
    margin-top: 30vh;
  }
`;
