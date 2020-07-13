import gql from 'graphql-tag';

export const GET_PLAN_DETAILS = gql`
  query GetPlanDetails($id: ID!) {
    plan(id: $id) {
      id
      title
      space_type
      sub_title
      duration
      cost
      location_type
      workspace {
        id
        name
      }
    }
  }
`;
