import {AccountGateway} from '../gateways/accountGateways';
import {LoginCredentials} from '../models';

export class AccountService {
  private accountGateway: AccountGateway;

  constructor(accountGateway: AccountGateway) {
    this.accountGateway = accountGateway;
  }

  async login(loginForm: LoginCredentials) {
    // checkValidates(loginForm, settingValidateLogin);
    const {token} = await this.accountGateway.login(loginForm);
    await this.accountGateway.useAndSaveAccessToken(token);
    return this.accountGateway.getLoginUser();
  }
}
