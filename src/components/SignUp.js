import styled from "styled-components";
import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import TokenContext from "../context/TokenContext";
import Logo from "./../assets/logo.png";
import Loading from "./Loading";
import { ButtonRegisterLogin } from "./SignIn";
import { Form } from "./SignIn";

export default function SignUp() {
  const [infoSignUp, setInfoSignUp] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  });
  const [buttonState, setButtonState] = useState(false);
  const [buttonLoading, setButtonLoading] = useState("Entrar");
  const { setToken } = useContext(TokenContext);
  const [messagedisplay, setMessageDisplay] = useState("none");

  const navigate = useNavigate();

  async function post(event) {
    event.preventDefault();
    setButtonState(true);
    setButtonLoading(<Loading />);
    const URL = process.env.REACT_APP_API_URL + "/signUp";
    try {
      const response = await axios.post(URL, infoSignUp);
      const { data } = response;

      setToken(data.token);

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (err) {
      console.log(err.response);
      setButtonState(false);
      setButtonLoading("Entrar");
      alert("Usuário ou senha inválidos!");
    }
  }
  function mostrarMensagem() {
    setMessageDisplay("block");
  }
  function esconderMensagem() {
    setMessageDisplay("none");
  }

  const { email, password, name, repeatPassword } = infoSignUp;
  return (
    <Conteiner>
      <img src={Logo} alt="Logo" />
      <Form onSubmit={post}>
        <input
          disabled={buttonState}
          type="text"
          required
          placeholder="nome"
          value={name}
          onChange={(e) =>
            setInfoSignUp({ ...infoSignUp, name: e.target.value })
          }
        />
        <input
          disabled={buttonState}
          type="email"
          required
          placeholder="e-mail"
          value={email}
          onChange={(e) =>
            setInfoSignUp({ ...infoSignUp, email: e.target.value })
          }
        />
        <input
          className="passwordInput"
          disabled={buttonState}
          type="password"
          required
          placeholder="senha"
          onMouseEnter={mostrarMensagem}
          onMouseLeave={esconderMensagem}
          value={password}
          onChange={(e) =>
            setInfoSignUp({ ...infoSignUp, password: e.target.value })
          }
        />
        <DivMessage messagedisplay={messagedisplay}>
          A senha deve ter no mínimo 8 caracteres, ao menos uma letra maiúscula,
          uma minuscula, um número e um caractere especial(@$!%*?&)"
        </DivMessage>
        <input
          disabled={buttonState}
          type="password"
          required
          placeholder="repita a senha"
          value={repeatPassword}
          onChange={(e) =>
            setInfoSignUp({ ...infoSignUp, repeatPassword: e.target.value })
          }
        />
        <button disabled={buttonState} type="submit" className="save-button">
          {buttonLoading}
        </button>
      </Form>
      <Link to={"/"}>
        <ButtonRegisterLogin disabled={buttonState}>
          Já tem uma conta? Faça login!
        </ButtonRegisterLogin>
      </Link>
    </Conteiner>
  );
}
const Conteiner = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 20px;
  }
  img {
    width: 300px;
  }
`;

const DivMessage = styled.div`
  display: ${(props) => props.messagedisplay};
`;
