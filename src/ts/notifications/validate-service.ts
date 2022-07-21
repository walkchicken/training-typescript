import { ValidateError } from '../interface/handle-error';
import { Toggle } from '../templates/toggle';
import { Pattern } from '../constants/pattern';
import { ValidationMessage } from '../constants/validation-message';
import { Dictionary } from '../constants/dictionary';
import { Order } from '../interface/order';
import { Product } from '../interface/product';

export interface FormValidation {
  isValid: boolean;
  messages: Dictionary<string>;
}

export class ValidateService {
  toggle = new Toggle();
  setValidationMsg(element: HTMLElement, message: string): void {
    if (message) {
      element.classList.add('validate-active');
    }

    element.textContent = message;
  }

  validate(
    fields: string[],
    data: Dictionary<string | number>,
    dataValidator: FormValidation,
    field: string
  ): FormValidation {
    fields.forEach((key) => {
      const value = data[field as keyof Dictionary<string | number>];

      switch (key) {
        case 'require':
          dataValidator.messages[field] = value ? '' : ValidationMessage[key];
          dataValidator.isValid = !!value;
          break;
        case 'username':
          if (value && !Pattern.username.test(value.toString())) {
            dataValidator.messages[field] = ValidationMessage[key];
            dataValidator.isValid = false;
          }
          break;
        case 'password':
          if (value && !Pattern.password.test(value.toString())) {
            dataValidator.messages[field] = ValidationMessage[key];
            dataValidator.isValid = false;
          }
          break;
        case 'url':
          if (value && !Pattern.url.test(value.toString())) {
            dataValidator.messages[field] = ValidationMessage[key];
            dataValidator.isValid = false;
          }
          break;
        case 'size':
          if (value && !Pattern.size.test(value.toString())) {
            dataValidator.messages[field] = ValidationMessage[key];
            dataValidator.isValid = false;
          }
          break;
        case 'sale':
          if (value > 50 || value < 0) {
            dataValidator.messages[field] = ValidationMessage[key];
            dataValidator.isValid = false;
          }
          break;
        default:
          break;
      }
    });

    return dataValidator;
  }

  checkValidation(
    fields: Dictionary<string[]>,
    value: Dictionary<string | number>
  ): FormValidation {
    const dataValidator: FormValidation = {
      isValid: true,
      messages: {},
    };

    Object.keys(fields).forEach((key) => {
      this.validate(fields[key as keyof Dictionary<string[]>], value, dataValidator, key);
    });

    return dataValidator;
  }

  // Get order form validation
  validateOrder(config: Dictionary<string[]>, order: Order): FormValidation {
    let validator: FormValidation = {
      isValid: true,
      messages: {},
    };

    Object.keys(config).forEach((fieldConfig: string) => {
      const configValidate: string[] = config[fieldConfig as keyof Dictionary<string[]>];

      configValidate.forEach((validateField) => {
        const value = order[fieldConfig as keyof Order];

        if (validateField === 'require') {
          validator.messages[fieldConfig] = value ? '' : ValidationMessage[validateField];
          validator.isValid = !!value;
        }
      });
    });

    return validator;
  }

  // Get product form validation
  validateProduct(config: Dictionary<string[]>, product: Product): FormValidation {
    let validator: FormValidation = {
      isValid: true,
      messages: {},
    };

    Object.keys(config).forEach((fieldConfig: string) => {
      const configValidate: string[] = config[fieldConfig as keyof Dictionary<string[]>];

      configValidate.forEach((validateField) => {
        const value = product[fieldConfig as keyof Product];

        switch (validateField) {
          case 'require':
            validator.messages[fieldConfig] = value ? '' : ValidationMessage[validateField];
            validator.isValid = !!value;
            break;
          case 'url':
            if (value && !Pattern.url.test(value.toString())) {
              validator.messages[fieldConfig] = ValidationMessage[validateField];
              validator.isValid = false;
            }
            break;
          case 'size':
            if (value && !Pattern.size.test(value.toString())) {
              validator.messages[fieldConfig] = ValidationMessage[validateField];
              validator.isValid = false;
            }
            break;
          case 'sale':
            if (Number(value) > 50 || Number(value) < 0) {
              validator.messages[fieldConfig] = ValidationMessage[validateField];
              validator.isValid = false;
            }
            break;
          default:
            break;
        }
      });
    });

    return validator;
  }
}
