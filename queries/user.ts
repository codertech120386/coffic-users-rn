import gql from 'graphql-tag';

export const USER_PROFESSIONAL_DETAILS = gql`
  query UserProfessionalDetails {
    userProfessionalDetails {
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
  query UserPersonalDetails {
    userPersonalDetails {
      id
      name
      email
      profile_image_url
    }
  }
`;

export const USER_PERSONAL_DETAILS = gql`
  query UserPersonalDetails {
    userPersonalDetails {
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
