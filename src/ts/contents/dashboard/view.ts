import { Template } from '../../templates/template';
import { ToastService } from '../../notifications/toast-service';
import { ValidateService } from '../../notifications/validate-service';
import { Toggle } from '../../templates/toggle';
import { renderMessage } from '../../helpers/render-message';
import { Dictionary } from '../../constants/dictionary';
import { Product } from '../../interface/product';

interface RenderList {
  products: Product[];
}

interface HandleProductView {
  renderList: (params: RenderList) => void;
}

export class ProductView implements HandleProductView {
  toggle = new Toggle();

  // render list card
  renderList({ products }: RenderList): void {
    const cardsElement = document.getElementById('productCard') as HTMLDivElement;

    products.forEach((product) => {
      cardsElement.innerHTML += Template.renderProductCard(product);
    });
  }
}
