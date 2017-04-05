import { Network } from 'core/network';

export class AuthApi {

  static login({ email, password, passcode }) {
    return Network.post('login', { email, password, passcode });
  }

}
