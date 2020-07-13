import gql from 'graphql-tag';

export const CHECK_COUPON_CODE = gql`
  query CheckCouponCode($code: String!) {
    checkCouponCode(code: $code) {
      id
      code
      description
      discount_amount
      quantity
      image
      expires_at
      created_at
    }
  }
`;

export const ALL_COUPON_CODES = gql`
  query AllCouponCodes {
    couponCodes {
      id
      code
      description
      discount_amount
      quantity
      image
      expires_at
      created_at
    }
  }
`;
