import newAdStyles from "./NewAd.module.css";
import FormAd from "./FormAd";

export default function NewAd() {
  return (
    <main className={`main-content ${newAdStyles["new-ad"]}`}>
      <FormAd title={"Create new ad"} type="new"/>
    </main>
  );
}
