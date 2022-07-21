import { RegisterModel } from './model';
import { RegisterView } from './view';
import { User } from '../../interface/user';

interface HandleRegisterController {
  init: () => void;
  handleSetUserPass: (username: string, password: string) => Promise<void>;
}

export class RegisterController implements HandleRegisterController {
  registerModel: RegisterModel;
  registerView: RegisterView;

  constructor(registerModel: RegisterModel, registerView: RegisterView) {
    this.registerModel = registerModel;
    this.registerView = registerView;
  }

  init(): void {
    this.registerView.initRegisterForm((username: string, password: string) => {
      this.handleSetUserPass(username, password);
    });
  }

  // handle create user
  async handleSetUserPass(username: string, password: string): Promise<void> {
    const result = await this.registerModel.create<User>({ username: username, pass: password });

    if (result.status === 400) {
      return this.registerView.handleRegisterError(`Error: ${result.message}`);
    }

    return this.registerView.handleRegisterSuccess();
  }
}
