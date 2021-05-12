import bcrypt from 'bcryptjs';

import IHashProvider from '../Models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async encrypt(payload: string): Promise<string> {
    const hash = bcrypt.hashSync(payload, 8);

    return hash;
  }

  public async compare(payload: string, hash: string): Promise<boolean> {
    const match = bcrypt.compareSync(payload, hash);

    return match;
  }
}

export default BCryptHashProvider;
