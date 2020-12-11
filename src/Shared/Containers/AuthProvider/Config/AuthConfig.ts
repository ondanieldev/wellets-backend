interface IAuthConfig {
  driver: 'jwt';
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export default {
  driver: process.env.AUTH_DRIVER,
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
    expiresIn: '1d',
  },
} as IAuthConfig;
