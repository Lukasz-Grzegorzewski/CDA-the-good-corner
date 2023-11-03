import AdsByCategory from "@/components/AdsByCategory";
import { Layout } from "@/components/Layout";

import { useRouter } from "next/router";

function AdsByCategoryPage() {
  const router = useRouter();
  const id = Number(router.query.id)
  console.log(router.query);

  return (
    <Layout title="Ads by category">
      <AdsByCategory id={id}/>
    </Layout>
  );
}

export default AdsByCategoryPage;
