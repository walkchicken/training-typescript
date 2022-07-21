import { redirectPage } from '../../constants/redirect';
import { ToastService } from '../../notifications/toast-service';
import { ValidateService } from '../../notifications/validate-service';
import { Toggle } from '../../templates/toggle';
import { ValidateError } from '../../interface/handle-error';
import { renderMessage } from '../../helpers/render-message';
import { Dictionary } from '../../constants/dictionary';
import { LoginInforStorageKey } from '../../constants/app-config';
import { User } from '../../interface/user';

interface HandleLoginView {
  initLoginForm: (handleLoginPage: (username: string, password: string) => void) => void;
  handleLoginError: () => void;
  handleLoginSuccess: (username: string) => void;
}

export class LoginView implements HandleLoginView {
  toastService = new ToastService();
  validateService = new ValidateService();
  toggle = new Toggle();

  handleLoginSuccess(username: string): void {
    localStorage.setItem(LoginInforStorageKey, username);
    window.location.replace(redirectPage.redirectHomepage);
  }

  handleLoginError(): void {
    this.toastService.show('Login fails!!');
  }

  initLoginForm(handleLoginPage: { (username: string, password: string): void }): void {
    const loginBtn = document.getElementById('login') as HTMLButtonElement;

    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();

      window.location.replace(redirectPage.redirectLogin);
    });

    const registerBtn = document.getElementById('register') as HTMLButtonElement;

    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();

      window.location.replace(redirectPage.redirectRegister);
    });

    const submitLogin = document.getElementById('loginBtn') as HTMLButtonElement;

    submitLogin.addEventListener('click', (e) => {
      e.preventDefault();

      const valueName: string = (document.getElementById('username') as HTMLInputElement).value;
      const valuePass: string = (document.getElementById('password') as HTMLInputElement).value;

      const elementValidate: Dictionary<HTMLSpanElement> = {
        username: document.getElementById('validateUser') as HTMLSpanElement,
        password: document.getElementById('validatePass') as HTMLSpanElement,
      };

      const loginValidator = this.validateService.checkValidation(
        { password: ['require', 'password'], username: ['require', 'username'] },
        { password: valuePass, username: valueName }
      );

      if (loginValidator.isValid) {
        handleLoginPage(valueName, valuePass);
      } else {
        renderMessage(loginValidator, elementValidate);
      }
    });
  }
}
