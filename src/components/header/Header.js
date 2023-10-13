import styled from "styled-components";
import { useState } from "react";

import LogoPequena from "../../assets/logoPequena.png";

export default function Headerlogado() {
  const { search, setSearch } = useState();
  return (
    <DivHeader>
      <div className="header-top">
        <img src={LogoPequena} alt="Logo" />
        <button>
          <p>Faça seu login</p>
          <ion-icon className="arrow" name="chevron-forward-outline"></ion-icon>
          <ion-icon className="person" name="person-outline"></ion-icon>
        </button>
        <ion-icon name="cart-outline"></ion-icon>
      </div>
      <div className="header-middle">
        <input
          placeholder="Pesquisa"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
    img {
      width: 35%;
    }
    button {
      background-color: transparent;
      border: none;
      display: flex;
      p {
        font-size: 14px;
      }
      ion-icon {
        font-size: 20px;
      }
    }
    ion-icon {
      font-size: 30px;
    }
  }
  .header-middle {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0% 10%;
    input {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .header-bottom {
    width: 90%;
    display: flex;
    justify-content: space-between;
    overflow-x: scroll;
    padding-bottom: 10px;
    button {
      margin-right: 15px;
      background-color: transparent;
      border: none;
      font-size: 16px;
      font-weight: 600;
      filter: drop-shadow(1px 6px 3px #ff8d3e);
    }
  }
`;
