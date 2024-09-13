import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  bcrypt_salt: process.env.bcrypt_salt_round,
  default_pass: process.env.DEFAULT_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
  CLOUDINARY_Cloud_Name: process.env.cloudinary_cloud_name,
  CLOUDINARY_Api_Key: process.env.cloudinary_api_key,
  CLOUDINARY_Api_Secret: process.env.cloudinary_api_secret
};
