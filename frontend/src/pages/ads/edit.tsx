import { Layout } from "../../components/Layout";
import FormAd from "@/components/FormAd";

export default function Edit() {
  return (
    <Layout title="Update">
      <main className="main-content">
        <FormAd type="update" title={"Update Ad"} />
      </main>
    </Layout>
  );
}
