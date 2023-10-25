import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TokenContext from "../context/TokenContext";
import OrderContext from "../context/OrderContext";
import styled from "styled-components";
import Loading from "./Loading";

import Header from "./Header";

export default function Payment() {
  const { token } = useContext(TokenContext);
  const { order, setOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  const { path } = useParams();

  const [buttonLoading, setButtonLoading] = useState("Confirmar pedido");
  const [buttonState, setButtonState] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  function saveData(event) {
    event.preventDefault();
    if (token) {
      if (paymentMethod.length > 0) {
        setButtonState(true);
        setButtonLoading(<Loading />);
        setOrder({ ...order, paymentMethod: paymentMethod });

        navigate(`/order/${path}`);
        window.scrollTo(0, 0);
      }
    } else {
      alert("usuario não encontrado, faça login novamente");
      navigate("/signIn");
    }
  }
  return (
    <>
      <Header />
      <Conteiner>
        <form className="form" onSubmit={saveData}>
          <div className="payment-options">
            <input
              disabled={buttonState}
              type="radio"
              value="Cartão de crédito"
              onClick={() => {
                setPaymentMethod("Cartão de crédito");
              }}
            />
            <label>Cartão de crédito</label>
          </div>
          <div className="payment-options">
            <input
              disabled={buttonState}
              type="radio"
              value="Pix"
              onClick={() => {
                setPaymentMethod("Pix");
              }}
            />
            <label>Pix</label>
          </div>
          <div className="payment-options">
            <input
              disabled={buttonState}
              type="radio"
              value="Boleto"
              onClick={() => {
                setPaymentMethod("Boleto");
              }}
            />
            <label>Boleto</label>
          </div>
          <button disabled={buttonState} type="submit" className="save-button">
            <p>{buttonLoading}</p>
          </button>
        </form>
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
  input {
    width: 25px;
    height: 25px;
    margin: 0px;
    margin-right: 10px;
  }
  label {
    font-size: 20px;
  }
  .form {
    width: 70%;
    button {
      width: 100%;
      height: 50px;
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
  .payment-options {
    height: 80px;
    display: flex;
    align-items: center;
    background-color: #fff3eb;
    padding: 10%;
    border: solid 1px #ff9851;
  }
  @media (min-width: 600px) {
    label {
      font-size: 22px;
    }
    .form {
      button {
        height: 70px;
      }
    }
  }
  @media (min-width: 1200px) {
    label {
      font-size: 26px;
    }
    input {
      width: 35px;
      height: 35px;
    }
    .form {
      button {
        height: 85px;
        font-size: 26px;
      }
    }
  }
`;
