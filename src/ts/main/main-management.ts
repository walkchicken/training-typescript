import { ProductModel, ProductView, ProductController } from '../contents/product-management';

const productModel = new ProductModel();
const productView = new ProductView();
const productController = new ProductController(productModel, productView);

productController.init();
