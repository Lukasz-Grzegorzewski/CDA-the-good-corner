import { gql } from "@apollo/client";

export const queryTags = gql`
  query Tags {
    items: tags {
      id
      name
    }
  }
`;

export const queryTag_Id = gql`
  query Tag_Id($id: ObjectId!) {
    item: tag_Id(id: $categoryId) {
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
