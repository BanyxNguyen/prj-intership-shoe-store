import {AccountGateway} from './gateways/accountGateways';
import {Login, Register} from '../models';

export class AccountService {
  private accountGateway: AccountGateway;

  constructor(accountGateway: AccountGateway) {
    this.accountGateway = accountGateway;
  }

  async login(loginForm: Login) {
    const token = await this.accountGateway.login(loginForm);
    return this.useSaveAndGetProfile(token);
  }

  async register(registerForm: Register) {
    const token = await this.accountGateway.register(registerForm);
    return this.useSaveAndGetProfile(token);
  }

  async getProfile() {
    return this.accountGateway.getProfile();
  }

  private async useSaveAndGetProfile(token: string) {
    await this.accountGateway.useAndSaveAccessToken(token);
    return this.getProfile();
  }
}
