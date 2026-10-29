type ConfigProps = {
  localhost?: boolean;
};

// test environment
const local = ["localhost", "127.0.0.1"].includes(window.location.hostname);
const test = local;

const out: ConfigProps = {};

// test settings
if (test) {
  out.localhost = true;

  console.log("env: test");
}

export const config = { ...out };
