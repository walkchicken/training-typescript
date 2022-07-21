import { ProductNotFound } from '../../constants/app-config';
import { Dictionary } from '../../constants/dictionary';
import { renderMessage } from '../../helpers/render-message';
import { Order } from '../../interface/order';
import { Product } from '../../interface/product';
import { ToastService } from '../../notifications/toast-service';
import { FormValidation, ValidateService } from '../../notifications/validate-service';
import { Template } from '../../templates/template';
import { Toggle } from '../../templates/toggle';

interface OrderManagementCallbacks {
  handleDelete: (orderID: number) => void;
  handleCreate: (order: Order, product: Product) => void;
}

export class OrderView {
  toastService = new ToastService();
  validateService = new ValidateService();
  toggle = new Toggle();

  // Handle delete errors
  handleDeleteError(message: string): void {
    this.toastService.show(message);
  }

  // Handle delete success
  handleDeleteSuccess(orderID: number): void {
    const card = document.querySelector(`[data-id="${orderID}"]`) as HTMLDivElement;

    card.outerHTML = '';
  }

  // Handle create product success
  handleCreateSuccess(
    order: Order,
    product: Product,
    handleDelete: (orderID: number) => void
  ): void {
    const orderCards = document.getElementById('orderCards') as HTMLDivElement;

    orderCards.innerHTML += Template.renderOrderCard(order, product);
    this.addEventDeleteOrder(handleDelete);
  }

  // Handle create product error
  handleCreateError(message: string): void {
    this.toastService.show(message);
  }

  // Render list order
  renderOrdersCards(
    orders: Order[],
    products: Product[],
    { handleDelete, handleCreate }: OrderManagementCallbacks
  ): void {
    const orderCards = document.getElementById('orderCards') as HTMLDivElement;

    // Render order cards about product
    orders.forEach((order) => {
      const product = products.find((item: Product) => item.id === order.productId) as Product;
      orderCards.innerHTML += Template.renderOrderCard(order, product);
    });

    const contentOrder = document.getElementById('contentOrder') as HTMLDivElement;

    // Render all product
    products.forEach((product) => {
      contentOrder.innerHTML += Template.renderListProduct(product);
    });

    this.addEventNewOrderBtn(products, handleCreate);
    this.addEventDeleteOrder(handleDelete);
  }

  // Add event to delete order button
  addEventDeleteOrder(handleDelete: (orderID: number) => void): void {
    const deleteBtnList: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.delete__order');

    deleteBtnList.forEach((deleteBtn) => {
      deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const id: number = Number(deleteBtn.dataset.id);

        handleDelete(id);
      });
    });
  }

  // Add event to new order button
  addEventNewOrderBtn(
    products: Product[],
    handleCreate: (order: Order, product: Product) => void
  ): void {
    const orderForm = document.getElementById('orderForm') as HTMLDivElement;
    const orderBtn = document.getElementById('newOrderBtn') as HTMLButtonElement;

    orderBtn.addEventListener('click', (e) => {
      e.preventDefault();

      this.toggle.toggleElement(orderForm, 'show');

      const btnClose = document.getElementById('closeBtn') as HTMLButtonElement;

      btnClose.addEventListener('click', (e) => {
        e.preventDefault();

        orderForm.classList.remove('show');
      });

      this.addEventProductCard(products, handleCreate);
    });
  }

  // Add event to product card
  addEventProductCard(
    products: Product[],
    handleCreate: (order: Order, product: Product) => void
  ): void {
    const listProductCard: NodeListOf<HTMLDivElement> = document.querySelectorAll('.form__product');

    listProductCard.forEach((productCard) => {
      productCard.addEventListener('click', (e) => {
        e.preventDefault();

        const contentOrder = document.getElementById('contentOrder') as HTMLDivElement;
        const formOrder = document.getElementById('formOrder') as HTMLDivElement;

        this.toggle.toggleElement(contentOrder, 'hide');
        this.toggle.toggleElement(formOrder, 'show');

        const id: number = Number(productCard.dataset.id);
        const product = products.find((item: Product) => item.id === id) as Product;
        formOrder.innerHTML = Template.renderCartOrder(product);

        const returnFormOrder = document.getElementById('returnBtn') as HTMLButtonElement;

        returnFormOrder.addEventListener('click', (e) => {
          e.preventDefault();

          this.toggle.toggleElement(formOrder, 'show');
          this.toggle.toggleElement(contentOrder, 'hide');
        });

        const reduceBtn = document.getElementById('reduceBtn') as HTMLButtonElement;
        const increaseBtn = document.getElementById('increaseBtn') as HTMLButtonElement;
        const countContent = document.getElementById('countContent') as HTMLLabelElement;

        reduceBtn.addEventListener('click', (e) => {
          e.preventDefault();

          let countValue = Number(countContent.textContent);

          if (countValue > 1) {
            countValue = countValue - 1;
          }

          countContent.textContent = countValue.toString();
        });

        increaseBtn.addEventListener('click', (e) => {
          e.preventDefault();

          let countValue = Number(countContent.textContent);

          countValue = countValue + 1;
          countContent.textContent = countValue.toString();
        });

        this.handleValidatorCreateOrder(handleCreate, product);
      });
    });
  }

  // Validate order form
  getValidationOrderForm(valueOrder: Order): FormValidation {
    const validation: Dictionary<string[]> = {
      name: ['require'],
      phone: ['require'],
      address: ['require'],
    };

    const orderValidator: FormValidation = this.validateService.validateOrder(
      validation,
      valueOrder
    );

    return orderValidator;
  }

  // Get value input order form
  getValueOrderForm(productID: number): Order {
    const valueOrder: Order = {
      count: Number((document.getElementById('countContent') as HTMLLabelElement).textContent),
      name: (document.getElementById('nameInput') as HTMLInputElement).value,
      phone: (document.getElementById('numberInput') as HTMLInputElement).value,
      address: (document.getElementById('addressInput') as HTMLInputElement).value,
      productId: productID,
    };

    return valueOrder;
  }

  // Get element validate
  getElementValidate(): Dictionary<HTMLSpanElement> {
    const elementValidate: Dictionary<HTMLSpanElement> = {
      name: document.getElementById('name') as HTMLSpanElement,
      phone: document.getElementById('number') as HTMLSpanElement,
      address: document.getElementById('address') as HTMLSpanElement,
    };

    return elementValidate;
  }

  // Handle validator and create order
  handleValidatorCreateOrder(
    handleCreate: (order: Order, product: Product) => void,
    product: Product
  ): void {
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
    const orderForm = document.getElementById('orderForm') as HTMLDivElement;

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (product.id) {
        const elementValidate = this.getElementValidate();
        const valueOrder = this.getValueOrderForm(product.id);
        const orderValidator = this.getValidationOrderForm(valueOrder);

        if (orderValidator.isValid) {
          handleCreate(valueOrder, product);
          orderForm.classList.remove('show');
        } else {
          renderMessage(orderValidator, elementValidate);
        }
      } else {
        this.toastService.show(ProductNotFound);
      }
    });
  }
}
