import { ProductModel } from './model';
import { ProductView } from './view';
import { Product } from '../../interface/product';
import { redirectPage } from '../../constants/redirect';
import { LoginInforStorageKey } from '../../constants/app-config';

interface ProductTemplateCallbacks {
  init: () => void;
  readProducts: (products: Product[]) => Promise<void>;
  handleDelete: (productID: number) => Promise<void>;
  handleCreate: (product: Product) => Promise<void>;
  handleUpdate: (product: Product, productID?: number) => Promise<void>;
}

export class ProductController implements ProductTemplateCallbacks {
  productModel: ProductModel;
  productView: ProductView;
  constructor(productModel: ProductModel, productView: ProductView) {
    this.productModel = productModel;
    this.productView = productView;
  }

  init(): void {
    this.readProducts();
  }

  // Handle update product
  async handleUpdate(product: Product): Promise<void> {
    if (product.id) {
      const result = await this.productModel.update<Product>(product.id, product);

      if (!result.data || result.status === 400) {
        return this.productView.handleCreateError(`Error: ${result.message}`);
      }

      const dataProduct = result.data;

      return this.productView.handleUpdateSuccess(
        dataProduct,
        (product: Product) => {
          this.handleUpdate(product);
        },
        (productID: number) => {
          this.handleDelete(productID);
        }
      );
    } else {
      return this.productView.handleUpdateError('Not find product!!!');
    }
  }

  // Handle create product
  async handleCreate(product: Product): Promise<void> {
    const result = await this.productModel.create<Product>(product);

    if (!result.data || result.status === 400) {
      return this.productView.handleCreateError(`Error: ${result.message}`);
    }

    const dataProduct = result.data;

    return this.productView.handleCreateSuccess(
      dataProduct,
      (product: Product) => {
        this.handleUpdate(product);
      },
      (productID: number) => {
        this.handleDelete(productID);
      }
    );
  }

  // Handle delete product
  async handleDelete(productID: number): Promise<void> {
    const result = await this.productModel.delete<void>(productID);

    if (!result.data || result.status === 400) {
      return this.productView.handleDeleteError(`Error: ${result.message}`);
    }

    return this.productView.handleDeleteSuccess(productID);
  }

  // Handle read all product from data
  async readProducts(): Promise<void> {
    const products: Product[] = await this.productModel.getAll<Product>();

    return this.productView.renderList(products, {
      handleDelete: (productID: number) => {
        this.handleDelete(productID);
      },
      handleCreate: (product: Product) => {
        this.handleCreate(product);
      },
      handleUpdate: (product: Product) => {
        this.handleUpdate(product);
      },
    });
  }
}
