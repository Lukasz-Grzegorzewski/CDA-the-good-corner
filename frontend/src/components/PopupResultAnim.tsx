import useNotifPopup from "@/context/notifPopupContext";
import popupResultAnimStyles from "./PopupResultAnim.module.css"

type PopupResultAnimProps ={
  message: string;
  status: boolean
}

export default function PopupResultAnim({message, status}: PopupResultAnimProps) {

  const {notifPopup, setNotifPopup} = useNotifPopup()


  setTimeout(() => {
    setNotifPopup({isSucces: null, isError: null})
  }, 2500)
  return (
    <p className={`${popupResultAnimStyles.response} ${status ? popupResultAnimStyles.succes : popupResultAnimStyles.failure }`}>
    {message}
  </p>
  )
}
