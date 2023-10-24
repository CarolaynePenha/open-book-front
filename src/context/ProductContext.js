import { createContext } from "react";
import { useState } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  let initialproduct = null;
  const infosProductString = localStorage.getItem("product");
  const infosProduct = JSON.parse(infosProductString);
  if (infosProduct) {
    initialproduct = infosProduct;
  }
  const [product, setProduct] = useState(initialproduct);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
