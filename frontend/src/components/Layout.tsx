import Head from "next/head";
import { Header } from "./Header";
import { TotalPriceProvider } from "../context/totalPriceContext";
import { useState } from "react";
import { NotifPopupType, NotifPopupProvider } from "../context/notifPopupContext";
import PopupResultAnim from "./PopupResultAnim";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export function Layout(props: LayoutProps): React.ReactNode {
  const [totalPrice, setTotalPrice] = useState(0);
  const [notifPopup, setNotifPopup] = useState<NotifPopupType>({
    isSucces: null,
    isError: null,
  });

  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TotalPriceProvider value={{ totalPrice, setTotalPrice }}>
        <NotifPopupProvider value={{ notifPopup , setNotifPopup }}>
          <Header totalPrice={totalPrice} />
          {props.children}
          {notifPopup.isSucces && <PopupResultAnim message={"Succes"} status={true} />}
          {notifPopup.isError && <PopupResultAnim message={"Failure"} status={false} />}
        </NotifPopupProvider>
      </TotalPriceProvider>
    </>
  );
}