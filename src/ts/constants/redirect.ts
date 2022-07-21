interface Path {
  API_REDIRECT?: string;
  PATH_DASHBOARD?: string;
  PATH_LOGIN?: string;
  PATH_REGISTER?: string;
  PATH_HOMEPAGE?: string;
}

const path: Path = {
  API_REDIRECT: 'http://localhost:1234',
  PATH_DASHBOARD: 'dashboard.html',
  PATH_LOGIN: 'login.html',
  PATH_REGISTER: 'register.html',
  PATH_HOMEPAGE: 'homepage.html',
};

export const redirectPage = {
  redirectLogin: `${path.API_REDIRECT}/${path.PATH_LOGIN}`,
  redirectRegister: `${path.API_REDIRECT}/${path.PATH_REGISTER}`,
  redirectDashboard: `${path.API_REDIRECT}/${path.PATH_DASHBOARD}`,
  redirectHomepage: `${path.API_REDIRECT}/${path.PATH_HOMEPAGE}`,
};
