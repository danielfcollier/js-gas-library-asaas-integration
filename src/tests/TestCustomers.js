function customersIntegrationTest() {
  const { id } = CustomersIntegrationTest.create(deps);
  const customer = CustomersIntegrationTest.read(id, deps);
  const updatedCustomer = CustomersIntegrationTest.update(id, deps);
  const { deleted } = CustomersIntegrationTest.remove(id, deps);

  console.log({ id, customer, updatedCustomer, deleted });
}

function customerGetByDocumentIdTest() {
  const response = CustomersIntegrationTest.getByDocumentId("00321278127", deps);
  console.log(response);
}

class CustomersIntegrationTest {
  static getConfig() {
    return {
      isProduction: TEST_ENVIRONMENT === "PRODUCTION",
      apiKey: TEST_API_KEY,
    };
  }

  static getCustomer() {
    return {
      name: "Daniel",
      email: "daniel@gmail.com",
      mobilePhone: "48999887766",
      cpfCnpj: "99496438210",
      postalCode: "88037615",
      foreignCustomer: true,
    };
  }

  static create(deps) {
    return CustomerCreate(this.getCustomer(), this.getConfig(), deps);
  }

  static read(id, deps) {
    return CustomerRead(id, this.getConfig(), deps);
  }

  static update(id, deps) {
    return CustomerUpdate(id, this.getCustomer(), this.getConfig(), deps);
  }

  static remove(id, deps) {
    return CustomerRemove(id, this.getConfig(), deps);
  }

  static getByDocumentId(documentId, deps) {
    return CustomerGetByDocumentId(documentId, this.getConfig(), deps);
  }
}
