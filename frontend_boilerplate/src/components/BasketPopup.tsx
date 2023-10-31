import basketPopupStyles from "./BasketPopup.module.css";

type BasketPopupProps = {
  isBasket: boolean;
  totalPrice: number;
};

function BasketPopup(props: BasketPopupProps) {
  return <div className={`${basketPopupStyles["basket-popup"]} ${props.isBasket ? basketPopupStyles["on"] : basketPopupStyles["off"]}`}>{props.totalPrice} €</div>;
}

export default BasketPopup;
