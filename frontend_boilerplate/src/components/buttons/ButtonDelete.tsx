import { callCustomDelete } from "@/axiosRequests/deleteData";
import React from "react";
import { API_URL } from "@/config";
import { useRouter } from "next/router";
import useNotifPopup from "@/context/notifPopupContext";

type ButtonDeletePropsType = {
  url: string;
  id?: string | number;
  redirect?: boolean;
  reFetch?: Function;
  redirectUrl?: string;
};

function ButtonDelete({
  url,
  id,
  redirect,
  reFetch,
  redirectUrl,
}: ButtonDeletePropsType) {
  const { notifPopup, setNotifPopup } = useNotifPopup();
  const router = useRouter();

  async function deleteHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    _url: string,
    _id?: string | number
  ) {
    event.preventDefault();

    if (_url) {
      const url = `${API_URL}${_url}${_id ? "/" + _id : ""}`;
      
      const response = await callCustomDelete(url);
      
      if (response.isSucces) {
        console.log("yes");
        
        
        setNotifPopup({ ...notifPopup, isSucces: true });
        setTimeout(() => {
          if (redirect && redirectUrl) {
            router.push(redirectUrl);
          } else if (redirect) {
            router.back();
          }
        }, 1300);

        if (reFetch) {
          setNotifPopup({ ...notifPopup, isSucces: true });
          reFetch();
        }
      } else {
        setNotifPopup({ ...notifPopup, isError: true });
        console.log(response.errorMessage);
      }
    }
  }

  return (
    <button
      className={`button button-danger button-delete`}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        deleteHandler(e, url, id)
      }
    >
      X
    </button>
  );
}

export default ButtonDelete;
