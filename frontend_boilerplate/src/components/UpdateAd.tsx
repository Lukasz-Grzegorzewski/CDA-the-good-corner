import updateAdStyles from "./UpdateAd.module.css";
import { useRouter } from "next/router";
import { AdType } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config";
import FormAd from "./FormAd";
import useNotifPopup from "@/context/notifPopupContext";

export default function UpdateAd() {

  const [ad, setAd] = useState<AdType>();
  const [isSuccesPostAd, setIsSuccesPostAd] = useState<boolean>(false);
  const [isErrorPost, setIsErrorPost] = useState<any>();
  const { notifPopup, setNotifPopup } = useNotifPopup();



  const router = useRouter();
    
  const params = Object.fromEntries(new URLSearchParams(location.search));
  const adId = params.id

  useEffect(() => {
    if(adId){
      fetchAd(adId)
    }
  }, [])

  async function fetchAd(id: string) {
    try {
      const result = await axios.get(API_URL + `/ads/${id}`)
      setAd(result.data)
    } catch (error) {
      console.error(error);
    }
  }
  
  
  async function updateAd(data: AdType, form: HTMLFormElement) {
    
    
    try {
      const result = await axios.patch(API_URL + `/ads/${adId}`, data);

      if (result.status === 204) {
        setIsSuccesPostAd(true);
        setNotifPopup({...notifPopup, isSucces: true})
        form.reset();
        setTimeout(() => {
          setIsSuccesPostAd(false);
          router.push(`/ads/${adId}`);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setNotifPopup({...notifPopup, isError: true})
      setIsErrorPost(true);
      setTimeout(() => {
        setIsErrorPost(false);
      }, 2000);
    }
  }

  return (
    <main className={`main-content ${updateAdStyles["new-ad"]}`}>
      <FormAd apiCall={updateAd} title={"Update Ad"} isSucces={isSuccesPostAd} ad={ad} type="update"/>
    </main>
  );
}
