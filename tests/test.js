const src = require("./.bundle/main.js");

const assert = require('node:assert');
const { mock, test } = require('node:test');

const id = '1';
const config = {apiKey: '1'};
const customer = {
  name: "fullname",
  email: "email",
  mobilePhone: "cellphone",
  cpfCnpj: "documentId",
  postalCode: "postalCode",
  foreignCustomer: false,
};
const FetchJson = {
  Post(url, request, options) {
    return {
      url, request, options
    }
  }
}

test('synchronous passing test', (t) => {
  // This test passes because it does not throw an exception.
  //assert.strictEqual(1, src.getHeaders(config));
  t.mock.method(FetchJson, "Post");
  const response = src.CustomerUpdate(id, customer, config, FetchJson);
  assert.strictEqual(1, response);
});
