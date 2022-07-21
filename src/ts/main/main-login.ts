import { LoginModel, LoginView, LoginController } from '../auth/login';

const loginModel = new LoginModel();
const loginView = new LoginView();
const loginController = new LoginController(loginModel, loginView);

loginController.init();
