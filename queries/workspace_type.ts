import gql from 'graphql-tag';

export const TYPES = gql`
  {
    types {
      id
      name
    }
  }
`;

export const TYPE = gql`
  query Type(
    $id: Int!
    $search: String
    $offset: Int
    $take: Int
    $filters: FilterUserInput
  ) {
    type(
      id: $id
      search: $search
      offset: $offset
      take: $take
      filters: $filters
    ) {
      count
      type {
        id
        name
      }
      workspaces {
        id
        name
        description
        per_day
        opens_at
        closes_at
        image_urls
        address
        short_address
      }
    }
  }
`;
