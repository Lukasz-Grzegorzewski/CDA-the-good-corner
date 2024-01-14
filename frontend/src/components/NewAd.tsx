import newAdStyles from "./NewAd.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import FormAd from "./FormAd";

import { API_URL } from "@/config";
import { AdType } from "@/types";
import useNotifPopup from "@/context/notifPopupContext";


export default function NewAd() {
  const [isSuccesPostAd, setIsSuccesPostAd] = useState<boolean>(false);
  const [isErrorPost, setIsErrorPost] = useState<any>();
  const { notifPopup, setNotifPopup } = useNotifPopup();

  const router = useRouter();

  async function postAd(data: AdType, form: HTMLFormElement) {
    try {
      const result = await axios.post(API_URL + "/ads", data);
      if (result.statusText === "OK") {
        setIsSuccesPostAd(true);
        setNotifPopup({...notifPopup, isSucces: true})
        form.reset();
        setTimeout(() => {
          setIsSuccesPostAd(false);
          router.push(`/ads/${result.data.id}`);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setIsErrorPost(true);
      setNotifPopup({...notifPopup, isError: true})
      setTimeout(() => {
        setIsErrorPost(false);
      }, 1000);
    }
  }

  return (
    <main className={`main-content ${newAdStyles["new-ad"]}`}>
      <FormAd apiCall={postAd} title={"Create new ad"} isSucces={isSuccesPostAd} type="new"/>
    </main>
  );
}
