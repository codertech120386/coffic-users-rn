import gql from 'graphql-tag';

export const AMENITIES_WITH_ID_NAME = gql`
  {
    amenities {
      id
      name
    }
  }
`;
