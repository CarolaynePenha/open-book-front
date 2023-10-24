import { createContext } from "react";
import { useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  let initialOrder = null;

  const [order, setOrder] = useState(initialOrder);
  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
