import gql from 'graphql-tag';

export const UPDATE_USER_PROFESSIONAL_DETAILS = gql`
  mutation UpdateUserProfessionalDetails(
    $userToken: String!
    $designation: String
    $organization: String
    $industry: String
    $education: String
    $description: String
  ) {
    updateUserProfessionalDetails(
      userToken: $userToken
      designation: $designation
      organization: $organization
      industry: $industry
      education: $education
      description: $description
    ) {
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

export const UPDATE_USER_PERSONAL_DETAILS = gql`
  mutation UpdateUserPersonalDetails(
    $name: String!
    $gender: String
    $phone: String!
    $userToken: String!
  ) {
    updateUserPersonalDetails(
      userToken: $userToken
      name: $name
      gender: $gender
      phone: $phone
    ) {
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
