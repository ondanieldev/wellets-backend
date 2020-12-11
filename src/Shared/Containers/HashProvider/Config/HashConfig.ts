interface IHashConfig {
  driver: 'bcrypt';
  bcrypt: {
    salt: number;
  };
}

export default {
  driver: 'bcrypt',
  bcrypt: {
    salt: 8,
  },
} as IHashConfig;
