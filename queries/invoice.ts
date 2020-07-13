import gql from 'graphql-tag';

export const GET_INVOICE = gql`
  query GetInvoice($userToken: String!, $paymentId: Int!) {
    invoice(userToken: $userToken, paymentId: $paymentId) {
      id
      gst_number
      company
      address
      created_at
      payment {
        id
        number_of_seats
        amount
        gst
        plan {
          id
          location_type
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
              id
              short_address
            }
          }
        }
        subscription {
          id
          start_date
          end_date
        }
        user {
          id
          name
        }
      }
    }
  }
`;
