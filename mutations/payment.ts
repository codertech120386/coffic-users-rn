import gql from 'graphql-tag';

export const CREATE_ORDER = gql`
  mutation createOrder(
    $userToken: String!
    $planId: Int!
    $numberOfSeats: Int!
    $gateway: String!
    $couponCode: String
  ) {
    createOrder(
      userToken: $userToken
      planId: $planId
      numberOfSeats: $numberOfSeats
      gateway: $gateway
      couponCode: $couponCode
    ) {
      order_id
      amount
      user {
        id
        name
        email
        phone
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder(
    $userToken: String!
    $planId: Int!
    $numberOfSeats: Int!
    $gateway: String!
    $orderId: String!
    $paymentId: String!
    $signature: String!
    $startDate: String!
    $couponCode: String
  ) {
    updateOrder(
      userToken: $userToken
      planId: $planId
      numberOfSeats: $numberOfSeats
      gateway: $gateway
      orderId: $orderId
      paymentId: $paymentId
      signature: $signature
      startDate: $startDate
      couponCode: $couponCode
    ) {
      status
      workspace {
        id
      }
      plan {
        id
      }
      subscription_id
    }
  }
`;
