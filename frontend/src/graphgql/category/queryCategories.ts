import { gql } from "@apollo/client";

export const queryCategories = gql`
  query Categories {
    items: categories {
      id
      name
    }
  }
`;

export const queryCategory_Id = gql`
  query Category_Id($id: ObjectId!) {
    item: category_Id(id: $categoryId) {
      id
      name
      ads {
        id
        title
        description
      }
    }
  }
`;
