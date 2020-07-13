import gql from 'graphql-tag';

export const REQUEST_INVOICE_PDF = gql`
  mutation RequestInvoicePDF(
    $paymentId: Int!
    $company: String
    $gstNumber: String
    $address: String
  ) {
    requestInvoicePDF(
      paymentId: $paymentId
      company: $company
      gstNumber: $gstNumber
      address: $address
    ) {
      id
    }
  }
`;
