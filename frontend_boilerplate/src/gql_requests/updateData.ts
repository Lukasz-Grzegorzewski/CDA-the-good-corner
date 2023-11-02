
import { AdType } from "@/types";

export type AdUpdateType = Partial<AdType>

export function useUpdateCustom(data: AdUpdateType) {
  console.log(`try update : ${JSON.stringify(data)}`);
}
