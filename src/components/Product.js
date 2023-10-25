import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Product({ image, title, price, id }) {
  const navigate = useNavigate();
  function navigateToProduct() {
    navigate(`/productinfos/${id}`);
  }
  return (
    <Section onClick={() => navigateToProduct()}>
      <div className="img">
        {" "}
        <img src={image} alt="book" />
      </div>

      <div className="infos">
        <p>{title}</p>
        <span>R${price}</span>
      </div>
    </Section>
  );
}

//  ---------------css

const Section = styled.section`
  display: flex;
  width: 100%;
  min-height: fit-content;
  height: 31%;
  background-color: #c8b8af;
  margin: 10px 0px;
  .img {
    width: 40%;
    height: 96%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 75%;
      height: auto;
    }
  }
  .infos {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-left: 10px;
    p {
      font-size: 20px;
      font-weight: 500;
      padding-top: 10px;
    }
    span {
      font-size: 20px;
      margin-top: 5px;
    }
  }

  @media (min-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 350px;
    margin-bottom: 15px;

    .img {
      width: 98%;
      height: fit-content;
      padding-right: 10px;
      padding-bottom: 15px;
      img {
        max-height: 220px;
      }
    }
    .img:hover {
      border: solid 2px #ff8d3e;
    }
    .infos {
      p {
        max-height: 80px;
        overflow-y: hidden;
        padding-top: 0px;
        font-size: 22px;
      }
      span {
        padding-bottom: 5px;
        font-size: 22px;
      }
    }
  }
  @media (min-width: 1200px) {
    width: 15%;
    height: 450px;

    .img {
      width: 98%;
      height: fit-content;
      padding-right: 10px;
      img {
        max-height: 350px;
      }
    }
  }
`;
