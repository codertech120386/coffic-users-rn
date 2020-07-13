import gql from 'graphql-tag';

export const USER_PROFESSIONAL_DETAILS = gql`
  query UserProfessionalDetails($userToken: String!) {
    userProfessionalDetails(userToken: $userToken) {
      id
      designation
      organization
      education
      industry
      description
      user {
        id
        profile_image_url
      }
    }
  }
`;

export const USER_PERSONAL_DETAILS_MINI = gql`
  query UserPersonalDetails($userToken: String!) {
    userPersonalDetails(userToken: $userToken) {
      id
      name
      email
      profile_image_url
    }
  }
`;

export const USER_PERSONAL_DETAILS = gql`
  query UserPersonalDetails($userToken: String!) {
    userPersonalDetails(userToken: $userToken) {
      id
      name
      phone
      email_verified_at
      reset_code
      token
      email
      gender
      profile_image_url
    }
  }
`;
