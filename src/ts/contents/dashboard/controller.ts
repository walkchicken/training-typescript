import { ProductModel } from './model';
import { ProductView } from './view';
import { Product } from '../../interface/product';

interface HandleProductController {
  init: () => void;
  readProducts: (products: Product[]) => Promise<void>;
}

export class ProductController implements HandleProductController {
  productModel: ProductModel;
  productView: ProductView;

  constructor(productModel: ProductModel, productView: ProductView) {
    this.productModel = productModel;
    this.productView = productView;
  }

  init(): void {
    this.readProducts();
  }

  // Handle read all product from data
  async readProducts(): Promise<void> {
    const products: Product[] = await this.productModel.getAll<Product>();

    return this.productView.renderList({
      products,
    });
  }
}
