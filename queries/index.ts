import { gql } from '@apollo/client'


export const ALL_LAUNCHES_QUERY = gql`
  query allLaunches($limit: Int!, $offset: Int!, $term: String!, $sort: String!) {
    launches(limit: $limit, offset: $offset, find: {mission_name: $term}, sort: $sort) {
      id
      mission_name
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      launch_site {
        site_name
      }
      mission_id
    }
  }
`



export const ALL_ROCKETS_QUERY = gql`
  query allRockets {
    rockets {
      mass {
        kg
      }
      name
    }
  }
`

export const ALL_PAYLOADS_QUERY = gql`
  query allPayloads {
    payloads {
      id
      payload_mass_kg
      customers
      nationality
    }
  }
`
