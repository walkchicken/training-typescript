import { LoginInforStorageKey } from '../../constants/app-config';
import { redirectPage } from '../../constants/redirect';
import { Toggle } from '../../templates/toggle';

interface HandleSideBar {
  initSideBar: () => void;
}

export class SideBarView implements HandleSideBar {
  toggle = new Toggle();

  initSideBar(): void {
    const menuBtn = document.getElementById('menuBtn') as HTMLButtonElement;
    const categories = document.getElementById('categoriesList') as HTMLUListElement;

    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();

      this.toggle.toggleElement(categories, 'show');
    });

    const btnLogin = document.getElementById('loginBtn') as HTMLLIElement;
    const logoutBtn = document.getElementById('logoutBtn') as HTMLLIElement;

    if (btnLogin) {
      btnLogin.addEventListener('click', (e) => {
        e.preventDefault();

        window.location.replace(redirectPage.redirectLogin);
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();

        localStorage.removeItem(LoginInforStorageKey);
        window.location.replace(redirectPage.redirectDashboard);
      });
    }

    const contentsBtns = document.querySelectorAll('.change-content') as NodeListOf<HTMLLIElement>;
    const contents = document.querySelectorAll('.content') as NodeListOf<HTMLElement>;

    contentsBtns.forEach((arrayBtn, index) => {
      arrayBtn.addEventListener('click', () => {
        contents.forEach((contentAll) => contentAll.classList.remove('content-active'));

        contents[index].classList.add('content-active');
      });
    });
  }
}
