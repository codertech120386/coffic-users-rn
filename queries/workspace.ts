import gql from 'graphql-tag';

export const WORKSPACES = gql`
  {
    workspaces {
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
        sub_title
        duration
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
    }
  }
`;

export const WORKSPACE_DETAILS_FROM_ID = gql`
  query WorkspaceFromId($id: ID!) {
    workspace(id: $id) {
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
    }
  }
`;

export const GET_WORKSPACE_TODAYS_SCHEDULE = gql`
  query GetWorkspaceTodaysSchedule($workspace_id: ID!, $date: String!) {
    getSchedule(workspace_id: $workspace_id, date: $date) {
      opens_at
      closes_at
    }
  }
`;

export const GET_WORKSPACE_WEEKLY_SCHEDULE = gql`
  query WeeklyScheduleOfWorkspaceFromId($id: ID!) {
    workspace(id: $id) {
      id
      weekly_schedules {
        id
        day
        opens_at
        closes_at
        created_at
        updated_at
      }
    }
  }
`;

export const GET_WORKSPACE_AMENITIES = gql`
  query WorkspaceAmenitiesWorkspaceFromId($id: ID!) {
    workspace(id: $id) {
      id
      amenities {
        id
        name
        icon_url
      }
    }
  }
`;

export const RECENTLY_SEARCH_WORKSPACES = gql`
  query RecentlySearchedWorkspaces($userToken: String!) {
    recentlySearchedWorkspaces(userToken: $userToken) {
      id
      updated_at
      workspace {
        id
        name
        images {
          id
          image_url
        }
        addresses {
          short_address
        }
      }
    }
  }
`;
