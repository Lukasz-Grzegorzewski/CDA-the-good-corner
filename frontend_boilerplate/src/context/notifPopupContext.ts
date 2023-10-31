import { createContext, useContext } from "react";

export type NotifPopupType = {
  isSucces: boolean | null; isError: boolean | null
}

export type NotifPopupContextType = {
  notifPopup: NotifPopupType;
  setNotifPopup: (c: NotifPopupType) => void;
}

export const NotifPopupContext = createContext<NotifPopupContextType>({
  notifPopup: { isSucces: false, isError: false },
  setNotifPopup: (c: NotifPopupType): void => {},
});

export const NotifPopupProvider = NotifPopupContext.Provider;

export default function useNotifPopup() {
  return useContext(NotifPopupContext);
}
