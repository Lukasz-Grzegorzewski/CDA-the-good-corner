import { gql } from "@apollo/client";

export const queryAds = gql`
  query Ads($where: AdsWhere!, $limit: String!, $page: String!) {
    items: ads(where: $where, limit: $limit, page: $page) {
      id
      title
      description
      owner
      price
      imgurl
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
    count: allAdsCount(where: $where)
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
      imgurl
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
