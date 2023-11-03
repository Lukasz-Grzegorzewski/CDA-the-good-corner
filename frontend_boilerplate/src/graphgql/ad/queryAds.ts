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
  query Ad_Id($adIdId: ObjectId!) {
    ad_Id(id: $adIdId) {
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
    }
  }
`;
