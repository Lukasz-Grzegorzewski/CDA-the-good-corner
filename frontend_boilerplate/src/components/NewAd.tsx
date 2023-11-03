import newAdStyles from "./NewAd.module.css";
import FormAd from "./FormAd";
import { AdType, CategoryType } from "@/types";

export type NewAdType = AdType & {
  language: string;
  timeZone: string;
  category: Partial<CategoryType>;
};

export default function NewAd() {
  return (
    <main className={`main-content ${newAdStyles["new-ad"]}`}>
      <FormAd title={"Create new ad"} type="new" />
    </main>
  );
}
