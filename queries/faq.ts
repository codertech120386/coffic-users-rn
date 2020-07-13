import gql from 'graphql-tag';

export const GET_USER_FAQs = gql`
  query GetUserFaqs {
    userFaqs {
      recommended_faqs {
        id
        question
        answer
        created_at
      }
      normal_faqs {
        id
        question
        answer
        created_at
      }
    }
  }
`;

export const GET_SPACE_FAQs = gql`
  query GetSpaceFaqs {
    spaceFaqs {
      recommended_faqs {
        id
        question
        answer
        created_at
      }
      normal_faqs {
        id
        question
        answer
        created_at
      }
    }
  }
`;
