import { redirectPage } from '../../constants/redirect';
import { ToastService } from '../../notifications/toast-service';
import { ValidateService } from '../../notifications/validate-service';
import { Toggle } from '../../templates/toggle';
import { User } from '../../interface/user';
import { renderMessage } from '../../helpers/render-message';
import { Dictionary } from '../../constants/dictionary';
import { ValidationMessage } from '../../constants/validation-message';

interface HandleRegisterPage {
  initRegisterForm: (handleRegisterPage: (username: string, password: string) => void) => void;
  handleRegisterSuccess: (user: User) => void;
  handleRegisterError: (message: string) => void;
}
export class RegisterView implements HandleRegisterPage {
  toastService = new ToastService();
  validateService = new ValidateService();
  toggle = new Toggle();

  initRegisterForm(handleRegisterPage: { (username: string, password: string): void }): void {
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

    const submitRegister = document.getElementById('registerBtn') as HTMLButtonElement;

    submitRegister.addEventListener('click', (e) => {
      e.preventDefault();

      const valueName: string = (document.getElementById('username') as HTMLInputElement).value;
      const valuePass: string = (document.getElementById('password') as HTMLInputElement).value;
      const valueConfirmPass: string = (
        document.getElementById('confirmPassword') as HTMLInputElement
      ).value;

      const elementValidate: Dictionary<HTMLSpanElement> & { confirm: HTMLSpanElement } = {
        username: document.getElementById('validateUser') as HTMLSpanElement,
        password: document.getElementById('validatePass') as HTMLSpanElement,
        confirm: document.getElementById('validateConfirm') as HTMLSpanElement,
      };

      if (valueConfirmPass !== valuePass) {
        this.validateService.setValidationMsg(elementValidate.confirm, ValidationMessage.confirm);
      }

      const registerValidator = this.validateService.checkValidation(
        {
          username: ['require', 'username'],
          password: ['require', 'password'],
          confirmPass: ['require'],
        },
        { username: valueName, password: valuePass, confirm: valueConfirmPass }
      );

      if (registerValidator.isValid) {
        handleRegisterPage(valueName, valueConfirmPass);
      } else {
        renderMessage(registerValidator, elementValidate);
      }
    });
  }

  // Handle register success
  handleRegisterSuccess(): void {
    window.location.replace(redirectPage.redirectLogin);
  }

  // Handle register error
  handleRegisterError(message: string): void {
    this.toastService.show(message);
  }
}
