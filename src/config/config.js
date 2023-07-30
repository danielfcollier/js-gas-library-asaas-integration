const urlProduction = "https://www.asaas.com";
const urlSandbox = "https://sandbox.asaas.com";

const TEST_ENVIRONMENT = "SANDBOX"; // PRODUCTION
const TEST_API_KEY =
  "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwMDU1Mzk6OiRhYWNoXzE4ZjUyYzE1LTM1MGYtNDhmMi04NmNkLTNlZjBjMmZjYTNlMw==";

function getBaseUrl(config) {
  return config.isProduction ? urlProduction : urlSandbox;
}

function getHeaders(config) {
  const headers = {
    access_token: config.apiKey,
    "content-type": "application/json",
  };

  return headers;
}
