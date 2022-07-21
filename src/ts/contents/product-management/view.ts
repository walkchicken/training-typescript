import { Product } from '../../interface/product';
import { Template } from '../../templates/template';
import { ToastService } from '../../notifications/toast-service';
import { FormValidation, ValidateService } from '../../notifications/validate-service';
import { Toggle } from '../../templates/toggle';
import { renderMessage } from '../../helpers/render-message';
import { Dictionary } from '../../constants/dictionary';
import { redirectPage } from '../../constants/redirect';
import { LoginInforStorageKey } from '../../constants/app-config';

interface ProductManagementCallbacks {
  handleDelete: (productID: number) => void;
  handleCreate: (product: Product) => void;
  handleUpdate: (product: Product) => void;
}

interface ProductTemplateCallbacks {
  renderList: (products: Product[], params: ProductManagementCallbacks) => void;
  handleDeleteError: (message: string) => void;
  handleDeleteSuccess: (productID: number) => void;
  handleUpdateError: (message: string) => void;
  handleUpdateSuccess: (
    product: Product,
    handleUpdate: (product: Product) => void,
    handleDelete: (productID: number) => void
  ) => void;
  handleCreateError: (message: string) => void;
  handleCreateSuccess: (
    product: Product,
    handleUpdate: (product: Product) => void,
    handleDelete: (productID: number) => void
  ) => void;
}

export class ProductView implements ProductTemplateCallbacks {
  toastService = new ToastService();
  validateService = new ValidateService();
  toggle = new Toggle();

  // Handle update product error
  handleUpdateError(message: string): void {
    this.toastService.show(message);
  }

  // Handle update product success
  handleUpdateSuccess(
    product: Product,
    handleUpdate: (product: Product) => void,
    handleDelete: (productID: number) => void
  ): void {
    const cards = document.getElementById('productsCards') as HTMLDivElement;
    const card = cards.querySelector(`[data-id="${product.id}"]`) as HTMLDivElement;

    card.outerHTML = Template.renderProductCardManager(product);

    const updateBtnList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#updateBtn');
    const deleteBtnList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#deleteBtn');

    updateBtnList.forEach((updateBtn) => {
      this.addEventUpdateBtn(updateBtn, product, handleUpdate);
    });

    deleteBtnList.forEach((deleteBtn) => {
      this.addEventDeleteBtn(deleteBtn, handleDelete);
    });
  }

  // Handle create product error
  handleCreateError(message: string): void {
    this.toastService.show(message);
  }

  // Handle create product success
  handleCreateSuccess(
    product: Product,
    handleUpdate: (product: Product) => void,
    handleDelete: (productID: number) => void
  ): void {
    const cards = document.getElementById('productsCards') as HTMLDivElement;

    cards.innerHTML += Template.renderProductCardManager(product);

    const updateBtnList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#updateBtn');
    const deleteBtnList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#btnDelete');

    updateBtnList.forEach((updateBtn) => {
      this.addEventUpdateBtn(updateBtn, product, handleUpdate);
    });

    deleteBtnList.forEach((deleteBtn) => {
      this.addEventDeleteBtn(deleteBtn, handleDelete);
    });
  }

  // Handle delete errors
  handleDeleteError(message: string): void {
    this.toastService.show(message);
  }

  // Handle delete success
  handleDeleteSuccess(productID: number) {
    const card = document.querySelector(`[data-id="${productID}"]`) as HTMLDivElement;

    card.outerHTML = '';
  }

  // Query element input, span validate and return value and element
  getValidationProductForm(valueInput: Product): FormValidation {
    const validationInput: Dictionary<string[]> = {
      title: ['require'],
      image: ['require', 'url'],
      content: ['require'],
      size: ['require', 'size'],
      sale: ['require', 'sale'],
      price: ['require'],
    };

    const productValidator: FormValidation = this.validateService.validateProduct(
      validationInput,
      valueInput
    );

    return productValidator;
  }

  getValueProductForm(productID?: number): Product {
    const valueInput: Product = {
      title: (document.getElementById('titleInput') as HTMLInputElement).value,
      image: (document.getElementById('imageInput') as HTMLInputElement).value,
      content: (document.getElementById('contentInput') as HTMLInputElement).value,
      size: (document.getElementById('sizeInput') as HTMLInputElement).value,
      sale: Number((document.getElementById('saleInput') as HTMLInputElement).value),
      price: Number((document.getElementById('priceInput') as HTMLInputElement).value),
      id: productID,
    };

    return valueInput;
  }

  getElementValidate(): Dictionary<HTMLSpanElement> {
    const elementValidate: Dictionary<HTMLSpanElement> = {
      title: document.getElementById('title') as HTMLSpanElement,
      image: document.getElementById('image') as HTMLSpanElement,
      content: document.getElementById('content') as HTMLSpanElement,
      size: document.getElementById('size') as HTMLSpanElement,
      sale: document.getElementById('sale') as HTMLSpanElement,
      price: document.getElementById('price') as HTMLSpanElement,
    };

    return elementValidate;
  }

  handleValidatorForm(
    submitBtn: HTMLButtonElement,
    handleCreateOrUpdate: (product: Product) => void,
    productID?: number
  ) {
    const productForm = document.querySelector('.product__form') as HTMLFormElement;

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const elementValidate = this.getElementValidate();
      const valueProduct = this.getValueProductForm(productID);
      const productValidator = this.getValidationProductForm(valueProduct);

      if (productValidator.isValid) {
        handleCreateOrUpdate(valueProduct);
        productForm.remove();
      } else {
        renderMessage(productValidator, elementValidate);
      }
    });
  }

  // render list card
  renderList(
    products: Product[],
    { handleDelete, handleCreate, handleUpdate }: ProductManagementCallbacks
  ): void {
    const userLogin = localStorage.getItem(LoginInforStorageKey);

    if (userLogin) {
      const cards = document.getElementById('productsCards') as HTMLDivElement;

      products.forEach((product) => {
        cards.innerHTML += Template.renderProductCardManager(product);
      });

      const createBtn = document.getElementById('createBtn') as HTMLButtonElement;
      const deleteBtnList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#deleteBtn');
      const updateBtnList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#updateBtn');

      updateBtnList.forEach((updateBtn) => {
        const id: number = Number(updateBtn.dataset.id);
        const product = products.find((item: Product) => item.id === id) as Product;

        this.addEventUpdateBtn(updateBtn, product, handleUpdate);
      });

      createBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const containProductForm = document.getElementById('productsForm') as HTMLDivElement;

        containProductForm.innerHTML = Template.renderProductForm();

        const closeBtn = containProductForm.querySelector('#closeBtn') as HTMLButtonElement;
        const productForm = containProductForm.querySelector('.product__form') as HTMLFormElement;
        const submitBtn = containProductForm.querySelector('#submitBtn') as HTMLButtonElement;

        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();

          productForm.remove();
        });

        this.handleValidatorForm(submitBtn, handleCreate);
      });

      deleteBtnList.forEach((deleteBtn) => {
        this.addEventDeleteBtn(deleteBtn, handleDelete);
      });
    } else {
      window.location.replace(redirectPage.redirectDashboard);
    }
  }
  // Add event to delete button
  addEventDeleteBtn(deleteBtn: HTMLButtonElement, handleDelete: (productID: number) => void): void {
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const id: number = Number(deleteBtn.dataset.id);

      handleDelete(id);
    });
  }

  // Add event to update button
  addEventUpdateBtn(
    updateBtn: HTMLButtonElement,
    product: Product,
    handleUpdate: (product: Product) => void
  ): void {
    const containProductForm = document.getElementById('productsForm') as HTMLDivElement;

    updateBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const id: number = Number(updateBtn.dataset.id);
      if (product.id === id) {
        containProductForm.innerHTML = Template.renderProductForm(product);
      }

      const closeBtn = containProductForm.querySelector('#closeBtn') as HTMLButtonElement;
      const productForm = containProductForm.querySelector('.product__form') as HTMLFormElement;
      const submitBtn = containProductForm.querySelector('#submitBtn') as HTMLButtonElement;

      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();

        productForm.remove();
      });

      this.handleValidatorForm(submitBtn, handleUpdate, id);
    });
  }
}
