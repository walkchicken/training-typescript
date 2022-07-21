import { User } from '../../interface/user';
import { LoginModel } from './model';
import { LoginView } from './view';
import { ProductView } from '../../contents/product-management/view';

interface HandleLoginController {
  init: () => void;
  handleGetUserPass: (username: string, password: string) => void;
  handleCheckUser: (username: string, password: string) => Promise<void>;
}
export class LoginController implements HandleLoginController {
  loginModel: LoginModel;
  loginView: LoginView;
  constructor(loginModel: LoginModel, loginView: LoginView) {
    this.loginModel = loginModel;
    this.loginView = loginView;
  }

  init(): void {
    this.loginView.initLoginForm((username: string, password: string) => {
      this.handleGetUserPass(username, password);
    });
  }

  handleGetUserPass(username: string, password: string): void {
    this.handleCheckUser(username, password);
  }

  async handleCheckUser(username: string, password: string): Promise<void> {
    const userArray: User[] = await this.loginModel.checkLogin<User[]>(username, password);
    const user = userArray ? userArray[0] : null;

    if (user) {
      this.loginView.handleLoginSuccess(user?.username);
    } else {
      this.loginView.handleLoginError();
    }
  }
}
