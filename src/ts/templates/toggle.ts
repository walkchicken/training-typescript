export class Toggle {
  toggleElement(element: HTMLElement, className: string) {
    let classListElement = element.classList;

    classListElement.toggle(className);
  }
}
