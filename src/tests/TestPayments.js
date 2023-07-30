function paymentsIntegrationTest() {
  const getCustomerId = () => {
    const { id } = CustomersIntegrationTest.create(deps);
    return id;
  };
  const customerId = getCustomerId();

  const createResponse = PaymentsIntegrationTest.create(customerId, deps);
  const { id } = createResponse;
  const readResponse = PaymentsIntegrationTest.read(id, deps);
  const updateResponse = PaymentsIntegrationTest.update(id, customerId, deps);
  const deleteResponse = PaymentsIntegrationTest.remove(id, deps);

  console.log({
    customerId,
    createResponse,
    readResponse,
    updateResponse,
    deleteResponse,
  });
}

function getBoletoBarCodeTest() {
  const id = "PAYMENT_ID"; // WORKS ONLY WITH PRODUCTION ENVIRONMENT
  const config = {
    isProduction: true,
    apiKey: "TEST_API_KEY_PRODUCTION",
  };
  const boletoBarCode = PaymentGetBarCode(id, config, deps);

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

  static create(customerId, deps) {
    return PaymentCreate({ ...this.getPayment(), customer: customerId }, this.getConfig(), deps);
  }

  static read(id, deps) {
    return PaymentRead(id, this.getConfig(), deps);
  }

  static update(id, customerId, deps) {
    return PaymentUpdate(id, { ...this.getPayment(), value: 200, customer: customerId }, this.getConfig(), deps);
  }

  static remove(id, deps) {
    return PaymentRemove(id, this.getConfig(), deps);
  }

  static getBoletoBarCode(id, deps) {
    return PaymentGetBarCode(id, this.getConfig(), deps);
  }
}
