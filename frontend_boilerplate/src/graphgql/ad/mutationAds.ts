import { gql } from "@apollo/client";

export const mutationCreateAd = gql`
  mutation CreateAd($data: AdCreateInput!) {
    item: createAd(data: $data) {
      id
      title
      description
      owner
      price
      imgUrl
      location
      category {
        id
        name
      }
      tags {
        id
        name
      }
      createdAt
    }
  }
`;