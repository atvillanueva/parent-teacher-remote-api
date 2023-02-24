import dotenv from "dotenv";
import { cleanEnv, str, port, makeValidator } from "envalid";

dotenv.config();

const notEmpty = makeValidator((value) => {
  if (/^\s*$/.test(value)) {
    throw new Error("value is not defined");
  }
  return value;
});

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "production"] }),
  PORT: port({ default: 3000 }),
  DATABASE_URL: notEmpty(),
});

export default env;
