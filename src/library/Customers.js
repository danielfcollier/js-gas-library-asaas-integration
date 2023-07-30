const customersEndpoint = "api/v3/customers";

function buildCustomerRequest(customer) {
  /*
  const customer = {
    name: "fullname",
    email: "email",
    mobilePhone: "cellphone",
    cpfCnpj: "documentId",
    postalCode: "postalCode",
    foreignCustomer: false,
  };
  */

  return {
    addressNumber: "s/n",
    notificationDisabled: true,
    emailEnabledForProvider: false,
    smsEnabledForProvider: false,
    emailEnabledForCustomer: false,
    smsEnabledForCustomer: false,
    phoneCallEnabledForCustomer: false,
    foreignCustomer: false,
    ...customer,
  };
}

function CustomerCreate(customer, config) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);
  const request = buildCustomerRequest(customer);

  const response = FetchJson.Post(`${baseUrl}/${customersEndpoint}`, request, (options = { headers }));
  const { id, dateCreated, deleted, foreignCustomer } = response;

  return { id, dateCreated, deleted, foreignCustomer };
}

function CustomerRead(id, config, FetchJson) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);

  const response = FetchJson.Get(`${baseUrl}/${customersEndpoint}/${id}`, (options = { headers }));
  const { name, cpfCnpj, foreignCustomer, dateCreated, deleted, canEdit, cannotEditReason } = response;

  return { name, cpfCnpj, foreignCustomer, dateCreated, deleted, canEdit, cannotEditReason };
}

function CustomerUpdate(id, customer, config, FetchJson) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);
  const request = buildCustomerRequest(customer);

  const response = FetchJson.Post(`${baseUrl}/${customersEndpoint}/${id}`, request, (options = { headers }));

  return response;
}

function CustomerRemove(id, config, FetchJson) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);

  const response = FetchJson.Remove(`${baseUrl}/${customersEndpoint}/${id}`, (options = { headers }));
  const { deleted } = response;

  return { deleted };
}

function CustomerGetByDocumentId(documentId, config, FetchJson) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);

  const response = FetchJson.Get(`${baseUrl}/${customersEndpoint}?cpfCnpj=${documentId}`, (options = { headers }));

  return response;
}
