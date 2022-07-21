import { OrderModel, OrderView, OrderController } from '../contents/order-management';

const orderModel = new OrderModel();
const orderView = new OrderView();
const orderController = new OrderController(orderModel, orderView);

orderController.init();
