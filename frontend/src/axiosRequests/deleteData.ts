import axios from "axios";

type ResponseObject = {
  errorMessage: any;
  isSucces: boolean;
};

export async function callCustomDelete(url: string, data?: any) {
  const response: ResponseObject = { errorMessage: null, isSucces: false };

  try {
    const result = await axios.delete(url, data);

    if (result.statusText === "OK") {
      response.isSucces = true;
    }
  } catch (error) {
    response.errorMessage = error;
  } finally {
    setTimeout(() => {
      response.isSucces = false;
      response.errorMessage = null;
    }, 4000);
  }
  return response ;
}
