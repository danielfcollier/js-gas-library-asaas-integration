function paymentsIntegrationTest() {
  const getCustomerId = () => {
    const { id } = CustomersIntegrationTest.create();
    return id;
  };
  const customerId = getCustomerId();

  const createResponse = PaymentsIntegrationTest.create(customerId);
  const { id } = createResponse;
  const readResponse = PaymentsIntegrationTest.read(id);
  const updateResponse = PaymentsIntegrationTest.update(id, customerId);
  const deleteResponse = PaymentsIntegrationTest.remove(id);

  console.log({ customerId, createResponse, readResponse, updateResponse, deleteResponse });
}

function getBoletoBarCodeTest() {
  const id = "PAYMENT_ID"; // WORKS ONLY WITH PRODUCTION ENVIRONMENT
  const config = {
    isProduction: true,
    apiKey: "TEST_API_KEY_PRODUCTION",
  };
  const boletoBarCode = PaymentGetBarCode(id, config);

  console.log({ boletoBarCode });
}

class PaymentsIntegrationTest {
  static getConfig() {
    return {
      isProduction: TEST_ENVIRONMENT === "PRODUCTION",
      apiKey: TEST_API_KEY,
    };
  }

  static getPayment() {
    return {
      dueDate: GasUtils.FormatDate(new Date(), 2),
      value: 100,
      description: "Service description here.",
    };
  }

  static create(customerId) {
    return PaymentCreate({ ...this.getPayment(), customer: customerId }, this.getConfig());
  }

  static read(id) {
    return PaymentRead(id, this.getConfig());
  }

  static update(id, customerId) {
    return PaymentUpdate(id, { ...this.getPayment(), value: 200, customer: customerId }, this.getConfig());
  }

  static remove(id) {
    return PaymentRemove(id, this.getConfig());
  }

  static getBoletoBarCode(id) {
    return PaymentGetBarCode(id, this.getConfig());
  }
}
