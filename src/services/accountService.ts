import { Account, InfoOrder, Login, Register } from '../models';
import { SlowFetch } from '../utilities';
import { AccountGateway } from './gateways/accountGateways';

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

  update(newProfileForm: Account) {
    return this.accountGateway.update(newProfileForm);
  }
  logout() {
    return this.accountGateway.logout();
  }

  getProfile() {
    return this.accountGateway.getProfile();
  }

  private async useSaveAndGetProfile(token: string) {
    await SlowFetch(this.accountGateway.useAndSaveAccessToken(token), 400);
    return this.getProfile();
  }

  // info order
  getInfoOrder() {
    return this.accountGateway.getInfoOrder();
  }

  saveInfoOrder(data: InfoOrder) {
    const str = JSON.stringify(data);
    return this.accountGateway.saveInfoOrder(str);
  }
}
