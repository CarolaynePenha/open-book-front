import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Product({ image, title, price, id }) {
  console.log("id: ", id);
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
  .img {
    width: 40%;
    height: 96%;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c8b8af;
    img {
      width: 80%;
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
      margin-top: 20px;
    }
    span {
      font-size: 20px;
      margin-top: 20px;
    }
  }
`;
