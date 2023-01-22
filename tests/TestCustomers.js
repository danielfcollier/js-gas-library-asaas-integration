function customersIntegrationTest() {
  const { id } = CustomersIntegrationTest.create();
  const customer = CustomersIntegrationTest.read(id);
  const updatedCustomer = CustomersIntegrationTest.update(id);
  const { deleted } = CustomersIntegrationTest.remove(id);

  console.log({ id, customer, updatedCustomer, deleted });
}

function customerGetByDocumentIdTest() {
  const response = CustomersIntegrationTest.getByDocumentId("00321278127");
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

  static create() {
    return CustomerCreate(this.getCustomer(), this.getConfig());
  }

  static read(id) {
    return CustomerRead(id, this.getConfig());
  }

  static update(id) {
    return CustomerUpdate(id, this.getCustomer(), this.getConfig());
  }

  static remove(id) {
    return CustomerRemove(id, this.getConfig());
  }

  static getByDocumentId(documentId) {
    return CustomerGetByDocumentId(documentId, this.getConfig());
  }
}
