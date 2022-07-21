import { RegisterController, RegisterModel, RegisterView } from '../auth/register';

const registerModel = new RegisterModel();
const registerView = new RegisterView();
const registerController = new RegisterController(registerModel, registerView);

registerController.init();
