import gql from 'graphql-tag';

export const GET_CHECKED_IN_DATES = gql`
  query GetCheckedInDates(
    $userToken: String!
    $startDate: String!
    $endDate: String!
    $limit: Int!
    $reverse: Boolean
  ) {
    userCheckinHistory(
      userToken: $userToken
      startDate: $startDate
      endDate: $endDate
      limit: $limit
      reverse: $reverse
    ) {
      checked_in_date
    }
  }
`;

export const GET_CHECKED_IN_HISTORY = gql`
  query GetCheckedInDates(
    $userToken: String!
    $startDate: String!
    $endDate: String!
    $limit: Int!
    $reverse: Boolean
  ) {
    userCheckinHistory(
      userToken: $userToken
      startDate: $startDate
      endDate: $endDate
      limit: $limit
      reverse: $reverse
    ) {
      id
      checked_in_date
      created_at
      user {
        id
        email
      }
      workspace {
        id
        name
        images {
          id
          image_url
        }
      }
    }
  }
`;

export const CHECKIN = gql`
  query Checkin($id: ID!) {
    checkin(id: $id) {
      id
      checked_in_date
      created_at
      user {
        id
        email
      }
      workspace {
        id
        name
        images {
          id
          image_url
        }
      }
    }
  }
`;
