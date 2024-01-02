import { RecentAds } from "@/components/RecentAds";
import { Layout } from "../../components/Layout";

import { useRouter } from "next/router";

function AdsByCategoryPage() {
  const router = useRouter();
  const categoryId = Number(router.query.id)

  return (
    <Layout title="Ads by category">
      <RecentAds categoryId={categoryId}/>
    </Layout>
  );
}

export default AdsByCategoryPage;
