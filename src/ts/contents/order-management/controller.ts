import { Response } from '../../interface/handle-error';
import { Order } from '../../interface/order';
import { Product } from '../../interface/product';
import { OrderModel } from './model';
import { OrderView } from './view';

interface HandleOrderController {
  init: () => void;
  readOrders: (orders: Order[]) => Promise<void>;
  // handleDelete: (orderID: number) => Promise<void>;
}

export class OrderController implements HandleOrderController {
  orderModel: OrderModel;
  orderView: OrderView;
  constructor(orderModel: OrderModel, orderView: OrderView) {
    this.orderModel = orderModel;
    this.orderView = orderView;
  }

  init(): void {
    this.readOrders();
  }

  // Handle read all orders and products from data
  async readOrders(): Promise<void> {
    const orders: Order[] = await this.orderModel.getAll<Order>();
    const products: Product[] = await this.orderModel.getAllProduct<Product>();

    return this.orderView.renderOrdersCards(orders, products, {
      handleDelete: (orderID: number) => {
        this.handleDelete(orderID);
      },
      handleCreate: (order: Order, product: Product) => {
        this.handleCreate(order, product);
      },
    });
  }

  // Handle create product
  async handleCreate(order: Order, product: Product): Promise<void> {
    const result: Response<Order> = await this.orderModel.create<Order>(order);

    if (!result.data || result.status === 400) {
      return this.orderView.handleCreateError(`Error: ${result.message}`);
    }

    const dataOrder: Order = result.data;

    return this.orderView.handleCreateSuccess(dataOrder, product, (orderID: number) => {
      this.handleDelete(orderID);
    });
  }

  // Handle delete order
  async handleDelete(orderID: number): Promise<void> {
    const result: Response<void> = await this.orderModel.delete<void>(orderID);

    if (!result.data || result.status === 400) {
      return this.orderView.handleDeleteError(`Error: ${result.message}`);
    }

    return this.orderView.handleDeleteSuccess(orderID);
  }
}
