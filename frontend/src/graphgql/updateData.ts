import { AdType } from "../types";


export function useUpdateCustom(data: Partial<AdType>) {
  console.log(`try update : ${JSON.stringify(data)}`);
}
