import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV;
const PRODUCTION = 'production';

if (nodeEnv !== 'development' && nodeEnv !== PRODUCTION && nodeEnv !== 'test') {
  throw new Error(`Invalid NODE_ENV: ${nodeEnv}`);
}

dotenv.config({
  // path: `.env.${nodeEnv}`,
  path: '.env.development',
  debug: nodeEnv !== PRODUCTION ? true : false,
});

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }

  return value;
}

const env = {
  MONGODB_URI: requireEnv('MONGODB_URI'),
  ENV: nodeEnv,
};

export default env;
