import gql from 'graphql-tag';

export const SIGNUP = gql`
  mutation Signup(
    $email: String!
    $name: String!
    $phone: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, phone: $phone, password: $password) {
      id
      name
      email
      phone
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      phone
      token
      email_verified_at
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
      error
      success
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($password: String!, $code: String!) {
    changePassword(password: $password, code: $code) {
      id
      name
      email
      phone
      token
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($code: String!) {
    verifyEmail(code: $code) {
      id
      name
      email
      phone
      token
    }
  }
`;
