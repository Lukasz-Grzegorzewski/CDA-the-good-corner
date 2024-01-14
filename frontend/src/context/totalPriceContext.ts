import { createContext, useContext } from "react";

export const TotalPriceContext = createContext({
  totalPrice: 0,
  setTotalPrice: (c:number): void => {},
});

export const TotalPriceProvider = TotalPriceContext.Provider

export default function useTotalPrice() {
  return useContext(TotalPriceContext)
}
