import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import TokenContext from "../context/TokenContext";
import OrderContext from "../context/OrderContext";
import Loading from "./Loading";
import { Form } from "./SignIn";
import Header from "./Header";
import { useForm } from "react-hook-form";

export default function Address() {
  const { token } = useContext(TokenContext);
  const { order, setOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  const { path } = useParams();

  const [buttonLoading, setButtonLoading] = useState("Confirmar pedido");
  const [buttonState, setButtonState] = useState(false);
  const [orderInfos, setOrderInfos] = useState({
    street: "",
    neighborhood: "",
    city: "",
    cep: "",
    state: "",
    cpf: "",
  });
  const stateArr = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const { street, neighborhood, city, cep, state, cpf } = orderInfos;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function saveData(event) {
    if (token) {
      setOrder(orderInfos);
      setButtonState(true);
      setButtonLoading(<Loading />);
      setOrderInfos("");
      navigate(`/payment/${path}`);
      window.scrollTo(0, 0);
    } else {
      alert("usuario não encontrado, faça login novamente");
      navigate("/signIn");
    }
  }
  function cpfMask(cpf) {
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }
  function cepMask(cep) {
    return cep
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d{3})/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  }

  return (
    <>
      <Header />
      <Conteiner>
        <Form onSubmit={handleSubmit(saveData)}>
          <input
            disabled={buttonState}
            type="text"
            required
            placeholder="Rua"
            maxlength="30"
            minLength="5"
            value={street}
            onChange={(e) =>
              setOrderInfos({ ...orderInfos, street: e.target.value })
            }
          />
          <input
            disabled={buttonState}
            type="text"
            required
            placeholder="Bairro"
            maxlength="30"
            minLength="5"
            value={neighborhood}
            onChange={(e) =>
              setOrderInfos({ ...orderInfos, neighborhood: e.target.value })
            }
          />
          <div className="city-state">
            <input
              disabled={buttonState}
              type="text"
              required
              placeholder="Cidade"
              maxlength="30"
              minLength="5"
              value={city}
              onChange={(e) =>
                setOrderInfos({ ...orderInfos, city: e.target.value })
              }
            />
            <select
              required
              value={orderInfos ? orderInfos.state : ""}
              onChange={(e) => {
                setOrderInfos({ ...orderInfos, state: e.target.value });
              }}
            >
              {stateArr.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
          <input
            disabled={buttonState}
            type="text"
            {...register("cep", {
              required: true,
              pattern: {
                value: /([0-9]{5}[-]?[0-9]{3})/,
                message: "CEP inválido.",
              },
            })}
            placeholder="CEP"
            value={cep}
            onChange={(e) =>
              setOrderInfos({ ...orderInfos, cep: cepMask(e.target.value) })
            }
          />
          {errors.cep && <p>{errors.cep.message}</p>}
          <input
            disabled={buttonState}
            type="text"
            {...register("cpf", {
              required: true,
              pattern: {
                value: /[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}/,
                message: "CPF inválido.",
              },
            })}
            placeholder="CPF"
            value={cpf}
            onChange={(e) =>
              setOrderInfos({ ...orderInfos, cpf: cpfMask(e.target.value) })
            }
          />
          {errors.cpf && <p>{errors.cpf.message}</p>}

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
  .city-state {
    display: flex;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      width: 80%;
      padding: 0px;
    }

    select {
      width: 15%;
      height: 50px;
      margin-top: 20px;
      border-width: 0px;
      option {
        border: none;
      }
    }
  }
  p {
    font-size: 20px;
    padding-top: 10px;
  }
`;
