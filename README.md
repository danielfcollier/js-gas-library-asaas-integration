# [Library for Google Apps Script] Asaas Payment Integration

Integrate with a handful Payment API to manage payments workflows. This library allows to CRUD on the customers endpoint and then use the payments and installments endpoints to manage payments requests.

TBD:

- Installments
- Refunds
- Money Received
- Service Logger
- ERRORS

## Using the Library

There are two ways to import the library to your project:

- Set in your script project dashboard
- Add the configuration into your `appsscript.json`

1. Script Id:

```
1LFQVmSJVu-3QhsZIKo-cp_i39uRDxrFkZ63fUwpMdQeyVR0ulCs4ZJfF
```

2. Add the latest version: for example, `6`
3. Use the identifier `AsaasIntegration`

These actions will update your `appsscript.json`.

Or, you can update it directly adding to the `dependencies` object:

```json
"dependencies": {
    "libraries": [
      {
        "userSymbol": "AsaasIntegration",
        "version": "6",
        "libraryId": "1LFQVmSJVu-3QhsZIKo-cp_i39uRDxrFkZ63fUwpMdQeyVR0ulCs4ZJfF"
      }
    ]
}
```

> The script runs in the timezone `Etc/GMT`.

## Asaas

### Configuring the API Key

For each API call pass the configuration parameters:

```javascript
const config = {
  isProduction: true, // or false for SANDBOX
  apiKey: ASAAS_API_KEY,
};
```

### Endpoints

#### Customers

Methods:

- `CustomerCreate(customer, config)`
- `CustomerRead(id, config)`
- `CustomerUpdate(id, customer, config)`
- `CustomerRemove(id, config)`

The `id` is the returned by the `CustomerCreate` method.

The customer object is given by:

```javascript
const customer = {
  name: "fullname",
  email: "email",
  mobilePhone: "cellphone",
  cpfCnpj: "documentId",
  postalCode: "postalCode",
  addressNumber: "s/n",
  notificationDisabled: true,
  emailEnabledForProvider: false,
  smsEnabledForProvider: false,
  emailEnabledForCustomer: false,
  smsEnabledForCustomer: false,
  phoneCallEnabledForCustomer: false,
  foreignCustomer: false,
};
```

where the following parameters are set as default values:

```javascript
{
  addressNumber: "s/n",
  notificationDisabled: true,
  emailEnabledForProvider: false,
  smsEnabledForProvider: false,
  emailEnabledForCustomer: false,
  smsEnabledForCustomer: false,
  phoneCallEnabledForCustomer: false,
  foreignCustomer: false,
}
```

#### Payments

Methods:

- `PaymentCreate(payment, config)`
- `PaymentRead(id, config)`
- `PaymentUpdate(id, payment, config)`
- `PaymentRemove(id, config)`

The `id` is the returned by the `PaymentCreate` method.

Utilities:

- `PaymentGetBarCode(id, config)`
- `PaymentGetPixCode(id, config)`

The payment object is given by:

```javascript
const payment = {
  customer: "customerId",
  dueDate: "2023-01-01",
  value: 300,
  description: "Put a description here.",
  billingType: "UNDEFINED",
  postalService: false,
};
```

where the following parameters are set as default values:

```javascript
{
  billingType: "UNDEFINED",
  postalService: false,
}
```

#### Installments

TBD.

### Logging

TBD.
