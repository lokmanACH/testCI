const assert = require("node:assert/strict");
const { createServer } = require("node:http");
//const { after, before, describe, it } = require("node:test");

const app = require("../app");

describe("GET /", () => {
  let server;
  let baseUrl;

  before(async () => {
    server = createServer(app);
    await new Promise((resolve) => {
      server.listen(0, "127.0.0.1", resolve);
    });

    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
  });

  after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });

  it("returns the welcome message", async () => {
    const response = await fetch(`${baseUrl}/`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, { message: "Hello from Express!" });
  });
});
