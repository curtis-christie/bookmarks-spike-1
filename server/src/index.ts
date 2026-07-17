import { env } from "./env.js";

console.log(`PORT is ${env.PORT}`);
console.log(`NODE_ENV is ${env.NODE_ENV}`);
console.log(`DATABASE_URL is set: ${env.DATABASE_URL.length > 0}`);
