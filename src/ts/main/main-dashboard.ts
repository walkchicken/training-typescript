import { ProductModel, ProductView, ProductController } from '../contents/dashboard';

const productModel = new ProductModel();
const productView = new ProductView();
const productController = new ProductController(productModel, productView);

productController.init();
