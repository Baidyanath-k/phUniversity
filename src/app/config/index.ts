import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  bcrypt_salt: process.env.bcrypt_salt_round,
  default_pass: process.env.DEFAULT_PASSWORD,
};
