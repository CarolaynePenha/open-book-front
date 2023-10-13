import axios from "axios";
import { useEffect, useState } from "react";
import LoadingRing from "./LoadingRing";
import { useParams } from "react-router-dom";

export default function Productinfos() {
  const { id } = useParams();

  const [product, setproduct] = useState(null);
  useEffect(() => {
    const URL = process.env.REACT_APP_API_URL + `/products/${id}`;
    async function getProduct() {
      try {
        const { data } = await axios.get(URL);
        setproduct(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getProduct();
  }, []);

  function returnInfos() {
    if (product) {
      const { image, title, description, price, seller, category } = product;
      return (
        <section>
          <p>{title}</p>
          <img src={image} alt="book" />
          <div className="infos">
            <span>R${price}</span>
            <p>{category}</p> <p>{seller}</p>
            <button>add ao carrinho</button>
            <button>Comprar agora</button>
            <p>{description}</p>
          </div>
        </section>
      );
    } else {
      return <LoadingRing />;
    }
  }

  return returnInfos();
}
