import { Dictionary } from '../constants/dictionary';
import { FormValidation, ValidateService } from '../notifications/validate-service';

export function renderMessage(
  formValidation: FormValidation,
  elementValidate: Dictionary<HTMLSpanElement>
): void {
  const validateService = new ValidateService();

  Object.keys(formValidation.messages).forEach((key) => {
    const message: string = formValidation.messages[key];
    const validation = elementValidate[key as keyof Dictionary<HTMLSpanElement>];

    if (message) {
      validateService.setValidationMsg(validation, message);
    } else {
      validation.textContent = '';
    }
  });
}
