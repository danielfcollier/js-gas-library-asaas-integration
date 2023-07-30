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

function PaymentCreate(payment, config, deps) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);
  const request = buildPaymentRequest(payment);

  const response = deps.fetchApp.Post(`${baseUrl}/${paymentsEndpoint}`, request, (options = { headers }));
  const { id, status, pixQrCodeId } = response;

  return { id, status, pixQrCodeId };
}

function PaymentRead(id, config, deps) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);

  const response = deps.fetchApp.Get(`${baseUrl}/${paymentsEndpoint}/${id}`, (options = { headers }));
  const { value, netValue, clientPaymentDate, paymentDate, deleted, status, externalReference, invoiceNumber } = response;

  return { value, netValue, clientPaymentDate, paymentDate, deleted, status, externalReference, invoiceNumber };
}

function PaymentUpdate(id, payment, config, deps) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);
  const request = buildPaymentRequest(payment);

  const response = deps.fetchApp.Post(`${baseUrl}/${paymentsEndpoint}/${id}`, request, (options = { headers }));
  const { value, description, status } = response;

  return { value, description, status };
}

function PaymentRemove(id, config, deps) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);

  const response = deps.fetchApp.Remove(`${baseUrl}/${paymentsEndpoint}/${id}`, (options = { headers }));
  const { deleted } = response;

  return { deleted };
}

function PaymentGetBarCode(id, config, deps) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);
  const response = fetchApp.Get(`${baseUrl}/${paymentsEndpoint}/${id}/identificationField`, (options = { headers }));
  const { identificationField } = response;

  return identificationField;
}

function PaymentGetPixCode(id, config, deps) {
  const baseUrl = getBaseUrl(config);
  const headers = getHeaders(config);
  const response = deps.fetchApp.Get(`${baseUrl}/${paymentsEndpoint}/${id}/pixQrCode`, (options = { headers }));

  return response;
}
