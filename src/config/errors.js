const AsaasIntegrationError = { name: "AsaasIntegrationError" };

const ERRORS = {
  CUSTOMER: {
    CREATE: (customer) =>
      new Error(`Could not create customer! ${customer?.name} - ${customer?.documentId}`, AsaasIntegrationError),
    UPDATE: (customer) =>
      new Error(`Could not update customer! ${customer?.name} - ${customer?.documentId}`, AsaasIntegrationError),
    DELETE: (customer) =>
      new Error(`Could not delete customer! ${customer?.name} - ${customer?.documentId}`, AsaasIntegrationError),
  },
  PAYMENT: {
    CREATE: (payment) => new Error(`Could not create payment! ${payment?.id} - ${payment?.description}`, AsaasIntegrationError),
    UPDATE: (payment) => new Error(`Could not update payment! ${payment?.id} - ${payment?.description}`, AsaasIntegrationError),
    DELETE: (payment) => new Error(`Could not delete payment! ${payment?.id} - ${payment?.description}`, AsaasIntegrationError),
  },
  INSTALLMENT: {
    CREATE: (payment) =>
      new Error(`Could not create installment! Payment: ${payment?.id} - ${payment?.description}`, AsaasIntegrationError),
    UPDATE: (payment) =>
      new Error(`Could not update installment! Payment: ${payment?.id} - ${payment?.description}`, AsaasIntegrationError),
    DELETE: (payment) =>
      new Error(`Could not delete installment! Payment: ${payment?.id} - ${payment?.description}`, AsaasIntegrationError),
  },
  RECEIPT: {
    CREATE: (payment) =>
      new Error(`Could not create receipt! Payment: ${payment?.id} - ${payment?.description}`, AsaasIntegrationError),
    UPDATE: (payment) =>
      new Error(`Could not update receipt! Payment: ${payment?.id} - ${payment?.description}`, AsaasIntegrationError),
    DELETE: (payment) =>
      new Error(`Could not delete receipt! Payment: ${payment?.id} - ${payment?.description}`, AsaasIntegrationError),
  },
};
