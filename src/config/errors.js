const AsaasIntegrationError = { name: "AsaasIntegrationError" };

const ERRORS = {
  CUSTOMER: {
    CREATE: (customer) => {
      const message = `Could not create customer! ${customer?.name} - ${customer?.documentId}`;
      return new Error(message, AsaasIntegrationError);
    },
    UPDATE: (customer) => {
      const message = `Could not update customer! ${customer?.name} - ${customer?.documentId}`;
      return new Error(message, AsaasIntegrationError);
    },
    DELETE: (customer) => {
      const message = `Could not delete customer! ${customer?.name} - ${customer?.documentId}`;
      return new Error(message, AsaasIntegrationError);
    },
  },
  PAYMENT: {
    CREATE: (payment) => {
      const message = `Could not create payment! ${payment?.id} - ${payment?.description}`;
      return new Error(message, AsaasIntegrationError);
    },
    UPDATE: (payment) => {
      const message = `Could not update payment! ${payment?.id} - ${payment?.description}`;
      return new Error(message, AsaasIntegrationError);
    },
    DELETE: (payment) => {
      const message = `Could not delete payment! ${payment?.id} - ${payment?.description}`;
      return new Error(message, AsaasIntegrationError);
    },
  },
  INSTALLMENT: {
    CREATE: (payment) => {
      const message = `Could not create installment! Payment: ${payment?.id} - ${payment?.description}`;
      return new Error(message, AsaasIntegrationError);
    },
    UPDATE: (payment) => {
      const message = `Could not update installment! Payment: ${payment?.id} - ${payment?.description}`;
      return new Error(message, AsaasIntegrationError);
    },
    DELETE: (payment) => {
      const message = `Could not delete installment! Payment: ${payment?.id} - ${payment?.description}`;
      return new Error(message, AsaasIntegrationError);
    },
  },
  RECEIPT: {
    CREATE: (payment) => {
      const message = `Could not create receipt! Payment: ${payment?.id} - ${payment?.description}`;
      return new Error(message, AsaasIntegrationError);
    },
    UPDATE: (payment) => {
      const message = `Could not update receipt! Payment: ${payment?.id} - ${payment?.description}`;
      return new Error(message, AsaasIntegrationError);
    },
    DELETE: (payment) => {
      const message = `Could not delete receipt! Payment: ${payment?.id} - ${payment?.description}`;
      return new Error(message, AsaasIntegrationError);
    },
  },
};
