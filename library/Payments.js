const paymentsEndpoint = "/api/v3/payments";

function buildPaymentRequest(payment) {
  /*
  const payment = {
    customer: "customerId",
    dueDate: "2023-01-01",
    value: 300,
    description: "Put a description here.",
  };
  */

  return {
    billingType: "UNDEFINED",
    postalService: false,
    ...payment,
  };
}

function PaymentCreate(payment, config) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);
  const request = buildPaymentRequest(payment);

  const response = FetchJson.Post(`${baseUrl}/${paymentsEndpoint}`, request, (options = { headers }));
  const { id, status } = response;

  return { id, status };
}

function PaymentRead(id, config) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);

  const response = FetchJson.Get(`${baseUrl}/${paymentsEndpoint}/${id}`, (options = { headers }));
  const { value, netValue, clientPaymentDate, paymentDate, deleted, status } = response;

  return { value, netValue, clientPaymentDate, paymentDate, deleted, status };
}

function PaymentUpdate(id, payment, config) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);
  const request = buildPaymentRequest(payment);

  const response = FetchJson.Post(`${baseUrl}/${paymentsEndpoint}/${id}`, request, (options = { headers }));
  const { value, description, status } = response;

  return { value, description, status };
}

function PaymentRemove(id, config) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);

  const response = FetchJson.Remove(`${baseUrl}/${paymentsEndpoint}/${id}`, (options = { headers }));
  const { deleted } = response;

  return { deleted };
}

function PaymentGetBarCode(id, config) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);
  const response = FetchJson.Get(`${baseUrl}/${paymentsEndpoint}/${id}/identificationField`, (options = { headers }));
  const { identificationField } = response;

  return identificationField;
}

function PaymentGetPixCode(id, config) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);
  const response = FetchJson.Get(`${baseUrl}/${paymentsEndpoint}/${id}/pixQrCode`, (options = { headers }));

  return response;
}
