import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TokenContext from "../context/TokenContext";
import LogoPequena from "../assets/logoPequena.png";
import UserContext from "../context/UserContext";
import axios from "axios";

export default function Header({ changeHeader, setProductsList }) {
  const { token, setToken } = useContext(TokenContext);
  const [visibility, setVisibility] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [trolleyLength, setTrolleyLength] = useState(0);
  const [srcBar, setSrcBar] = useState("");
  const [inputState, setInputState] = useState(false);

  const navigate = useNavigate();

  function logOut() {
    setToken(null);
    setUser("");
    navigate("/");
  }

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
          setTrolleyLength(data.length);
        } catch (err) {
          console.log(err.response);
        }
      }
      getTrolley();
    } else {
      setToken(null);
      setUser("");
      navigate("/signIn");
    }
  }, [token, changeHeader]);

  async function search() {
    const URL = process.env.REACT_APP_API_URL + `/products/${srcBar}`;
    setInputState(true);
    try {
      const { data } = await axios.get(URL);
      setProductsList(data);
      setInputState(false);
    } catch (err) {
      console.log(err.response);
      setInputState(true);
    }
  }

  return token !== null ? (
    <DivHeader>
      <Menu visibility={visibility}>
        <h1> Sua conta</h1>
        <Link to={"/orders"} className="pedidos">
          <p>Pedidos</p>
        </Link>

        <p onClick={() => logOut()}> Sair da conta</p>
      </Menu>
      <div className="header-top">
        <div className="header-top-left">
          <ion-icon
            onClick={() => {
              navigate(-1);
            }}
            name="arrow-back-outline"
          ></ion-icon>
          <Link className="logo" to={"/"}>
            <img src={LogoPequena} alt="Logo" />
          </Link>
        </div>

        <button onClick={() => setVisibility(!visibility)}>
          <p>Olá,{user.name} </p> <p>Sua conta</p>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </button>
        <div>
          <Link to={"/trolley"} className="trolley">
            <p>{trolleyLength}</p>
            <ion-icon name="cart-outline"></ion-icon>
          </Link>
        </div>
      </div>
      <div className="header-middle">
        <input
          placeholder="Pesquisa"
          disabled={inputState}
          value={srcBar}
          onChange={(e) => setSrcBar(e.target.value)}
        />
        <ion-icon onClick={() => search()} name="search-outline"></ion-icon>
      </div>
      <div className="header-bottom">
        <button>Fantasia</button>
        <button>Biografia</button>
        <button>Romance</button>
        <button>Ficção científica</button>
        <button>Horror</button>
        <button>Thriller</button>
        <button>Tecnologia e Ciência</button>
        <button>Autoajuda</button>
      </div>
    </DivHeader>
  ) : (
    <DivHeader>
      <div className="header-top">
        <Link className="logo" to={"/"}>
          <img src={LogoPequena} alt="Logo" />
        </Link>
        <button>
          <Link to={"/signIn"} className="login">
            <p>Faça seu login</p>
            <ion-icon name="chevron-forward-outline"></ion-icon>
            <ion-icon name="person-outline"></ion-icon>
          </Link>
        </button>
        <ion-icon name="cart-outline"></ion-icon>
      </div>
      <div className="header-middle">
        <input
          placeholder="Pesquisa"
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="header-bottom">
        <button>Fantasia</button>
        <button>Biografia</button>
        <button>Romance</button>
        <button>Ficção científica</button>
        <button>Horror</button>
        <button>Thriller</button>
        <button>Tecnologia e Ciência</button>
        <button>Autoajuda</button>
      </div>
    </DivHeader>
  );
}

// ---------------------css

const DivHeader = styled.header`
  width: 100%;
  position: relative;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff6eb;
  .header-top {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0% 10%;
    .header-top-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 45%;
      ion-icon {
        font-size: 30px;
      }
      .logo {
        width: 70%;
        img {
          width: 100%;
        }
      }
    }
    .trolley {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      p {
        font-weight: 500;
        font-size: 20px;
        color: #e57e37;
      }
      ion-icon {
        font-size: 35px;
        color: black;
      }
    }

    button {
      background-color: transparent;
      width: fit-content;
      border: none;
      margin: 10px 0;
      .login {
        display: flex;
        align-items: center;
        text-decoration: none;
      }
      p {
        font-size: 14px;
        color: black;
      }
      ion-icon {
        font-size: 20px;
        color: black;
      }
    }
  }
  .header-middle {
    width: 90%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0% 10%;
    input {
      width: 70%;
      height: 50px;
      margin-bottom: 20px;
      font-size: 18px;
      border: solid 1px #4a423e;
    }
    ion-icon {
      width: 10%;
      height: 48px;
      margin-bottom: 20px;
      font-size: 18px;
      background-color: #ff8d3e;
      border: solid 1px #4a423e;
    }
  }
  .header-bottom {
    width: 90%;
    display: flex;
    justify-content: space-between;
    overflow-x: scroll;
    padding-bottom: 10px;
    button {
      margin-right: 5%;
      background-color: transparent;
      border: none;
      font-size: 16px;
      font-weight: 600;
      filter: drop-shadow(1px 6px 3px #ff8d3e);
    }
  }

  @media (min-width: 600px) {
    .header-top {
      .header-top-left {
        width: 30%;
        .logo {
          width: 70%;
          img {
            width: 100%;
          }
        }
      }
      button p {
        font-size: 17px;
      }
      .trolley {
        p {
          font-size: 25px;
          color: #e57e37;
        }
        ion-icon {
          font-size: 40px;
          color: black;
        }
      }
    }
  }
  @media (min-width: 1200px) {
    .header-top {
      .header-top-left {
        width: 20%;
        .logo {
          width: 70%;
          img {
            width: 100%;
          }
        }
      }
      button p {
        font-size: 20px;
      }
      .trolley {
        p {
          font-size: 25px;
          color: #e57e37;
        }
        ion-icon {
          font-size: 40px;
          color: black;
        }
      }
    }
    .header-middle {
      input {
        width: 70%;
        height: 65px;
        margin-bottom: 20px;
        font-size: 22px;
        border: solid 1px #4a423e;
      }
      ion-icon {
        width: 10%;
        height: 63px;
        margin-bottom: 20px;
        font-size: 18px;
        background-color: #ff8d3e;
        border: solid 1px #4a423e;
      }
    }
    .header-bottom {
      button {
        font-size: 20px;
      }
    }
  }
`;

const Menu = styled.menu`
  display: ${(props) => (props.visibility ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  background-color: #ffffff;
  right: 0;
  top: 30%;
  width: 60%;
  height: 50vh;
  z-index: 2;
  p {
    padding-left: 20px;
    padding-top: 15px;
  }
  .pedidos {
    color: black;
    text-decoration: none;
  }
  h1 {
    padding-left: 20px;
    padding-top: 30px;
    font-weight: 500;
  }

  @media (min-width: 600px) {
    font-size: 22px;
  }
`;
