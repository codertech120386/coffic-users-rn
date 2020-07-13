import gql from 'graphql-tag';

export const CHECKIN = gql`
  mutation Checkin($userToken: String!, $workspaceId: Int!) {
    checkin(userToken: $userToken, workspaceId: $workspaceId) {
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
