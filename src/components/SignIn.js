import styled from "styled-components";
import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import TokenContext from "../context/tokenContext";
import Logo from "./../assets/logo.png";
import Loading from "./Loading";

export default function SignIn() {
  const [infosLogin, setinfosLogin] = useState({ email: "", password: "" });
  const [buttonState, setButtonState] = useState(false);
  const [buttonLoading, setButtonLoading] = useState("Entrar");
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function post(event) {
    event.preventDefault();
    setButtonState(true);
    setButtonLoading(<Loading />);
    const URL = process.env.REACT_APP_API_URL + "/sign-in";
    try {
      const response = await axios.post(URL, infosLogin);
      const { data } = response;
      console.log("token: ", response);
      setToken(data.token);

      localStorage.setItem("token", data.token);

      navigate("/wallet");
    } catch (err) {
      console.log(err.response);
      setButtonState(false);
      setButtonLoading("Entrar");
      alert("Usuário ou senha inválidos!");
    }
  }

  const { email, password } = infosLogin;
  return (
    <Conteiner>
      <img src={Logo} alt="Logo" />
      <Form onSubmit={post}>
        <input
          disabled={buttonState}
          required
          placeholder="e-mail"
          value={email}
          onChange={(e) =>
            setinfosLogin({ ...infosLogin, email: e.target.value })
          }
        />
        <input
          disabled={buttonState}
          type="password"
          required
          placeholder="senha"
          value={password}
          onChange={(e) =>
            setinfosLogin({ ...infosLogin, password: e.target.value })
          }
        />
        <button disabled={buttonState} type="submit" className="save-button">
          {buttonLoading}
        </button>
      </Form>
      <Link to={"/sign-up"}>
        <ButtonRegisterLogin disabled={buttonState}>
          <p>Não tem uma conta? Cadastre-se!</p>
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

export const ButtonRegisterLogin = styled.button`
  border: none;
  color: #ffffff;
  margin-top: 30px;
  background-color: transparent;
  p {
    font-size: 16px;
    filter: drop-shadow(1px 2px 1px #000000);
  }
`;

export const Form = styled.form`
  width: 80%;
  .save-button {
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
  input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    border: none;
    margin-top: 20px;
    background-color: #ffffff;
    font-size: 18px;
    text-align: center;
  }
`;
