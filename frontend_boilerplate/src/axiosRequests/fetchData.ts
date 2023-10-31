import { API_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

export function useCustomFetch(url: string, data?: any) {
  const [APIData, setAPIData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [isSucces, setIsSucces] = useState<boolean>(false); 
  const [count, setCount] = useState<number>(1); 

  useEffect(() => {
    setTimeout(() => {
      callCustomFetch();
    }, 1000);
  }, [url]);

  async function callCustomFetch() {
    setIsLoading(true);
    setError(null);
    try {
      const result = await axios.get(API_URL + url, data);

      if(url.split("?")[0] === "/ads") {
        setAPIData(result.data.resultAds);
        setCount(result.data.count);
      }
      else setAPIData(result.data);

      setIsSucces(true);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        setIsSucces(false);
      }, 4000);
    }
  }
  return { APIData, isLoading, error, isSucces, callCustomFetch, count };
}
