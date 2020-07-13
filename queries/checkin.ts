import gql from 'graphql-tag';

export const GET_CHECKED_IN_DATES = gql`
  query GetCheckedInDates(
    $startDate: String!
    $limit: Int!
  ) {
    userCheckedinDates(
      startDate: $startDate,
      limit: $limit
    ) {
      checked_in_date
    }
  }
`;

export const GET_CHECKED_IN_HISTORY = gql`
  query GetCheckedInHistory(
    $startDate: String!
    $endDate: String!
    $limit: Int!
    $reverse: Boolean
  ) {
    userCheckinHistory(
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
