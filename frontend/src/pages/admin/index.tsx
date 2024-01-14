import Admin from "@/components/admin/Admin";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import { Layout } from "@/components/Layout";

export default function AdminPage() {
  return (
    <Layout title="Adminitration">
      <LayoutAdmin>
        <Admin />
      </LayoutAdmin>
    </Layout>
  );
}
