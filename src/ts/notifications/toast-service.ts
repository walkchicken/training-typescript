import { ToastTemplate } from '../templates/toast-template';
export class ToastService {
  toastMessage: HTMLDivElement;
  constructor() {
    this.create();
    this.toastMessage = document.getElementById('toast') as HTMLDivElement;
  }
  create(): void {
    const bodyElement = document.getElementsByTagName('body')[0] as HTMLBodyElement;

    bodyElement.innerHTML += ToastTemplate.renderToastTemplate();
  }

  show(message: string): void {
    this.toastMessage.classList.add('toast-active');
    this.toastMessage.textContent = message;
    setInterval(() => {
      this.hide();
    }, 5000);
  }

  hide(): void {
    this.toastMessage.classList.remove('toast-active');
  }
}
