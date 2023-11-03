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
  query Category_Id($categoryIdId: ObjectId!) {
    item: category_Id(id: $categoryIdId) {
      id
      name
    }
  }
`;
