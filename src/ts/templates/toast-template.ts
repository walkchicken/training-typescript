export class ToastTemplate {
  static renderToastTemplate = (message?: string): string => {
    return `<div class="toast" id="toast">
              <p class="text">${message}</p>
            </div>`;
  };
}
