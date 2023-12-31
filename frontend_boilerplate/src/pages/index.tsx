import styles from "@/styles/Home.module.css";
import { Layout } from "@/components/Layout";
import { RecentAds } from "@/components/RecentAds";

export default function Home() {
  return (
    <Layout title="Home">
      <RecentAds />
    </Layout>
  );
}