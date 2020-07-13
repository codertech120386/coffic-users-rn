import gql from 'graphql-tag';

export const V1_WORKSPACE_DETAILS_FROM_ID = gql`
  query v1WorkspaceFromId($id: ID!, $token: String, $platform: String) {
    v1Workspace(id: $id, token: $token, platform: $platform) {
      id
      name
      description
      location_id
      amenities {
        id
        name
        icon_url
        created_at
        updated_at
      }
      banners {
        id
        title
        sub_title
        created_at
        updated_at
      }
      images {
        id
        image_url
        created_at
        updated_at
      }
      plans {
        id
        title
        space_type
        sub_title
        duration
        cost
        location_type
        created_at
        updated_at
      }
      weekly_schedules {
        id
        day
        opens_at
        closes_at
        created_at
        updated_at
      }
      addresses {
        id
        address
        short_address
      }
      availedFreePlanIds
      isSubscribed
    }
  }
`;
