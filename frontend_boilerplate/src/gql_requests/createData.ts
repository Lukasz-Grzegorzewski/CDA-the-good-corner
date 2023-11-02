import { AdType } from "@/types";

export type AdCreateType = Omit<AdType, "id">

export async function useCreateCustom(data: AdCreateType) {
  console.log(`try create : ${JSON.stringify(data)}`)
}
