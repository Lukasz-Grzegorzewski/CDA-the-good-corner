import { gql } from "@apollo/client";

export const mutationCreateAd = gql`
  mutation CreateAd($data: AdCreateInput!) {
    item: createAd(data: $data) {
      id
    }
  }
`;

export const mutationUpdateAd = gql`
  mutation UpdateAd($data: AdUpdateInput!, $id: ID!) {
    item: updateAd(data: $data, id: $id) {
      id
      title
      description
      owner
      price
      imgurl
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
