import gql from 'graphql-tag';

export const CREATE_ORDER = gql`
  mutation createOrder(
    $planId: Int!
    $numberOfSeats: Int!
    $gateway: String!
    $couponCode: String
    $startDate: String
    $endDate: String
  ) {
    createOrder(
      planId: $planId
      numberOfSeats: $numberOfSeats
      gateway: $gateway
      couponCode: $couponCode
      startDate: $startDate
      endDate: $endDate
    ) {
      order_id
      amount
      subscription_id
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
