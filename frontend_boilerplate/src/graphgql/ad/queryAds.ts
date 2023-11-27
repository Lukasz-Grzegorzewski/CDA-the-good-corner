import { gql } from "@apollo/client";

export const queryAds = gql`
  query Ads {
    items: ads {
      id
      title
      description
      owner
      price
      imgUrl
      location
      createdAt
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const queryAd_Id = gql`
  query Ad_Id($id: ID!) {
    item: ad_Id(id: $id) {
      id
      title
      description
      owner
      price
      imgUrl
      location
      createdAt
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const ads_Filter_ByProductName = gql`
  query Ads_Filter_ByProductName($query: String!) {
    items: ads_Filter_ByProductName(query: $query) {
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
