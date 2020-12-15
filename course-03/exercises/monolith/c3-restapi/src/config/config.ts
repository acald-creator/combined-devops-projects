const config = {
  dev: {
    username: process.env.POSTGRES_USERNAME || 'udagramacald',
    password: process.env.POSTGRES_PASSWORD || 'Password123456',
    database: process.env.POSTGRES_DB || 'udagramdev1',
    host:
        process.env.POSTGRES_HOST
        || 'udagramdev2.ci4aqbvaskx1.us-east-2.rds.amazonaws.com',
    dialect: 'postgres',
    aws_region: process.env.AWS_REGION || 'us-east-2',
    aws_profile: process.env.AWS_PROFILE,
    aws_media_bucket: process.env.AWS_BUCKET,
    aws_secret_name: process.env.AWS_SECRET_NAME,
  },
  prod: {
    username: '',
    password: '',
    database: '',
    host: '',
    dialect: 'postgres',
  },
  jwt: {
    secret: process.env.JWT_SECRET! || 'secret',
  },
};

export { config as default };
