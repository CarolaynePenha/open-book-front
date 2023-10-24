import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TokenContext from "../context/TokenContext";
import OrderContext from "../context/OrderContext";
import styled from "styled-components";
import Loading from "./Loading";
import { Form } from "./SignIn";
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
        <Form onSubmit={saveData}>
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
            {buttonLoading}
          </button>
        </Form>
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

  p {
    font-size: 20px;
    padding-top: 10px;
  }
  .payment-options {
    display: flex;
    align-items: center;
    background-color: #fff3eb;
    padding: 10%;
    border: solid 1px #ff9851;
  }
`;
