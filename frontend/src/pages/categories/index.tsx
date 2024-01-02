import CardCategory from "../../components/CardCategory";
import { Layout } from "../../components/Layout";
import { CategoryType } from "../../types";

const categories = [
  {
    id: 1,
    name: "Bikes",
  },
  {
    id: 2,
    name: "Cars",
  },
];

function Categories() {
  return (
    <h1>toto</h1>
    // <Layout title="Update">
    //   <main className="main-content">
    //     {categories &&
    //       categories.map((category: CategoryType) => (
    //         <CardCategory
    //           key={category.id}
    //           name={category.name}
    //           id={category.id}
    //           adsCount={10}
    //         />
    //       ))}
    //   </main>
    // </Layout>
  );
}

export default Categories;
