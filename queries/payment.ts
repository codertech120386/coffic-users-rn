import gql from 'graphql-tag';

export const GET_SUBSCRIPTION = gql`
  query GetSubscription($id: Int!) {
    subscription(id: $id) {
      id
      start_date
      end_date
      status
      payment {
        id
        number_of_seats
        plan {
          id
          title
          space_type
          sub_title
          location_type
          workspace {
            id
            name
            images {
              id
              image_url
            }
            addresses {
              short_address
            }
          }
        }
      }
    }
  }
`;

export const USER_SUBSCRIPTIONS = gql`
  query UserSubscriptions($userToken: String!, $status: String!) {
    userSubscriptions(userToken: $userToken, status: $status) {
      id
      start_date
      end_date
      status
      payment {
        id
        number_of_seats
        plan {
          id
          title
          space_type
          sub_title
          location_type
          workspace {
            id
            name
            images {
              id
              image_url
            }
            addresses {
              short_address
            }
          }
        }
      }
    }
  }
`;

export const USER_PAYMENTS = gql`
  query UserPayments($userToken: String!) {
    userPayments(userToken: $userToken) {
      id
      created_at
      plan {
        id
        space_type
        title
        workspace {
          id
          name
          images {
            id
            image_url
          }
          addresses {
            short_address
          }
        }
      }
    }
  }
`;
