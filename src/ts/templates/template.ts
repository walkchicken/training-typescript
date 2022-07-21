import { ValueCountDefault, ValueEmpty, ValuePercent } from '../constants/app-config';
import { Order } from '../interface/order';
import { Product } from '../interface/product';

export class Template {
  static renderCartOrder = (product: Product, order?: Order): string => {
    return `
          <div class="cart__return">
            <button class="btn btn-transparent btn-close btn-info border-circle" type="button" id="returnBtn">
              <img class="icons icon__return" src="../assets/icons/back.png" alt="recycle">
            </button>
          </div>
          <div class="content__form-cart">
          <div class="form__cart" data-id="${product.id || ValueEmpty}">
            <div class="form__cart-product">
              <img class="image" src="${product.image || ValueEmpty}" alt="image order">
              <div class="product__contents">
                <div class="product__intro">
                <h6 class="intro__title">${product.title || ValueEmpty}</h6>
                <p class="value">${product.content || ValueEmpty}</p>
                </div>
                <div class="product__content">
                  <label class="content__title">Size</label>
                  <p class="value">${product.size || ValueEmpty}</p>
                </div>

                <div class="product__content">
                  <label class="content__title">Sale</label>
                  <p class="value">${product.sale || ValueEmpty}%</p>
                </div>

                <div class="product__content">
                  <label class="content__title">Price</label>
                  <p class="value">${product.price || ValueEmpty}$</p>
                </div>

                <div class="product__content">
                  <label class="content__title">Final</label>
                  <p class="value">
                    ${
                      product.price - (product.price * product.sale) / ValuePercent || ValueEmpty
                    }$</p>
                </div>
              </div>
            </div>
            <form class="form__cart-order">
              <div class="count__item">
                <button class="btn btn-secondary btn-down" type="button" id="reduceBtn">
                  <img class="icons icon__down" src="../assets/icons/down.png" alt="menu">
                </button>
                <label class="count" id="countContent">${order?.count || ValueCountDefault}</label>
                <button class="btn btn-info btn-up" type="button" id="increaseBtn">
                  <img class="icons icon__up" src="../assets/icons/up.png" alt="menu">
                </button>
              </div>
              <div class="order__content">
                <div class="content__name">
                  <label class="content__title">Name</label>
                  <input class="input input-edit" id="nameInput" type="text" placeholder="Name" required value="${
                    order?.name || ValueEmpty
                  }">
                  <span class="validate" id="name"></span>
                </div>
                <div class="content__number">
                  <label class="content__title">Number</label>
                  <input class="input input-edit" id="numberInput" type="number" placeholder="Number" required value="${
                    order?.phone || ValueEmpty
                  }">
                  <span class="validate" id="number"></span>
                </div>
                <div class="content__address">
                  <label class="content__title">Address</label>
                  <input class="input input-edit" id="addressInput" type="text" placeholder="Address" required value="${
                    order?.address || ValueEmpty
                  }">
                  <span class="validate" id="address"></span>
                </div>
              </div>
              <div class="order__btn">
                <button class="btn btn-black btn-order" id="submitBtn" type="button">ORDER</button>
              </div>
            </form>
          </div>
        </div>
    `;
  };

  static renderListProduct = (product?: Product): string => {
    return `
            <div class="content__form-product">
              <div class="form__product" data-id="${product?.id || ValueEmpty}">
                <img class="image" src="${product?.image || ValueEmpty}" alt="image order">
                <div class="form__product-contents">
                  <div class="product__intro">
                    <h6 class="intro__title">${product?.title || ValueEmpty}</h6>
                    <p class="value">${product?.content || ValueEmpty}</p>
                  </div>

                  <div class="product__contents">
                    <div class="product__content">
                      <label class="content__title">Size</label>
                      <p class="value">${product?.size || ValueEmpty}</p>
                    </div>

                    <div class="product__content">
                      <label class="content__title">Sale</label>
                      <p class="value">${product?.sale || ValueEmpty}%</p>
                    </div>

                    <div class="product__content">
                      <label class="content__title">Price</label>
                      <p class="value">${product?.price || ValueEmpty}$</p>
                    </div>

                    <div class="product__content">
                      <label class="content__title">Final</label>
                      <p class="value">${
                        product
                          ? product.price - (product.price * product.sale) / ValuePercent
                          : ValueEmpty
                      }$</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
  };

  static renderOrderCard = (order?: Order, product?: Product): string => {
    return `<div class="card" id="cardOrder" data-id="${order?.id || ValueEmpty}">
              <div class="card__order">
                <div class="order__intros">
                  <img class="image"
                    src="${product?.image || ValueEmpty}"
                    alt="image order">
                  <div class="intro">
                    <h6 class="intro__title">${product?.title || ValueEmpty}</h6>
                    <p class="value">${product?.content || ValueEmpty}</p>
                  </div>
                </div>

                <div class="order__contents">
                  <div class="content">
                    <label class="content__title">Size</label>
                    <p class="value">${product?.size || ValueEmpty}</p>
                  </div>

                  <div class="content">
                    <label class="content__title">Sale</label>
                    <p class="value">${product?.sale || ValueEmpty}%</p>
                  </div>

                  <div class="content">
                    <label class="content__title">Price</label>
                    <p class="value">${product?.price || ValueEmpty}$</p>
                  </div>

                  <div class="content">
                    <label class="content__title">Final</label>
                    <p class="value">${
                      product
                        ? product.price - (product.price * product.sale) / ValuePercent
                        : ValueEmpty
                    }$</p>
                  </div>

                  <div class="content">
                    <label class="content__title">Items</label>
                    <p class="value">${order?.count || ValueEmpty}</p>
                  </div>
                </div>
              </div>

              <div class="card__controls">
                <button class="btn btn-danger delete__order control" type="button" id="deleteOrderBtn" data-id="${
                  order?.id || ValueEmpty
                }">
                  <img class="icons icon__delete" src="../assets/icons/recycle.png" alt="recycle">
                </button>
              </div>
            </div>`;
  };

  static renderProductForm = (value?: Product): string => {
    return `
            <form class="product__form" id="productForm">
              <button class="btn btn-transparent btn-close" type="button" id="closeBtn">
                <img class="icons icon__menu" src="../assets/icons/close.png" alt="menu">
              </button>
              <div class="product__form-contents">
                <label class="content__title">Title</label>
                <input class="input input-edit" id="titleInput" type="text" placeholder="Title" required value="${
                  value?.title || ValueEmpty
                }">
                <span class="validate" id="title"></span>
                <label class="content__title">Image</label>
                <input class="input input-edit" id="imageInput" type="url" placeholder="Image" required value="${
                  value?.image || ValueEmpty
                }">
                <span class="validate" id="image"></span>
                <label class="content__title">Content</label>
                <input class="input input-edit" id="contentInput" type="text" placeholder="Content" required value="${
                  value?.content || ValueEmpty
                }">
                <span class="validate" id="content"></span>
                <label class="content__title">Size</label>
                <input class="input input-edit" id="sizeInput" type="text" placeholder="Size" required value="${
                  value?.size || ValueEmpty
                }">
                <span class="validate" id="size"></span>
                <label class="content__title">Sale</label>
                <input class="input input-edit" id="saleInput" type="number" placeholder="Sale" required value="${
                  value?.sale || ValueEmpty
                }">
                <span class="validate" id="sale"></span>
                <label class="content__title">Price</label>
                <input class="input input-edit" id="priceInput" type="number" placeholder="Price" required value="${
                  value?.price || ValueEmpty
                }">
                <span class="validate" id="price"></span>
                <button class="btn btn-black" id="submitBtn" type="button">${
                  value ? 'UPDATE' : 'CREATE'
                }</button>
              </div>
            </form>
          `;
  };

  static renderProductCardManager = (item?: Product): string => {
    return `<div class="card" id="cardProductManager" data-id="${item?.id || ValueEmpty}">
              <div class="card__product-manager">
                <div class="product__intros">
                  <img class="image"
                    src="${item?.image || ValueEmpty}"
                    alt="image product">
                  <div class="intro">
                    <h6 class="intro__title">${item?.title || ValueEmpty}</h6>
                    <p class="value">${item?.content || ValueEmpty}</p>
                  </div>
                </div>

                <div class="product__contents">
                  <div class="content">
                    <label class="content__title">Size</label>
                    <p class="value">${item?.size || ValueEmpty}</p>
                  </div>

                  <div class="content">
                    <label class="content__title">Sale</label>
                    <p class="value">${item?.sale || ValueEmpty}%</p>
                  </div>

                  <div class="content">
                    <label class="content__title">Price</label>
                    <p class="value">${item?.price || ValueEmpty}$</p>
                  </div>

                  <div class="content">
                    <label class="content__title">Final</label>
                    <p class="value">${
                      item ? item.price - (item.price * item.sale) / ValuePercent : ValueEmpty
                    }$</p>
                  </div>
                </div>
              </div>

              <div class="card__controls">
                <button class="btn btn-danger btn-delete control" type="button" id="deleteBtn" data-id="${
                  item?.id || ValueEmpty
                }">
                  <img class="icons icon__delete" src="../assets/icons/recycle.png" alt="recycle">
                </button>
                <button class="btn btn-warning btn-update control" type="button" id="updateBtn" data-id="${
                  item?.id || ValueEmpty
                }">
                  <img class="icons icon__update" src="../assets/icons/pen.png" alt="pen">
                </button>
              </div>
            </div>`;
  };

  static renderProductCard = (item?: Product): string => {
    return `<div class="card" data-id="${item?.id || ValueEmpty}">
              <div class="card__product">
                <div class="product__intros">
                  <img class="image"
                    src="${item?.image || ValueEmpty}"
                    alt="image product">
                  <div class="intro">
                    <h6 class="intro__title">${item?.title || ValueEmpty}</h6>
                    <p class="value">${item?.content || ValueEmpty}</p>
                  </div>
                </div>

                <div class="product__contents">
                  <div class="content">
                    <label class="content__title">Size</label>
                    <p class="value">${item?.size || ValueEmpty}</p>
                  </div>

                  <div class="content">
                    <label class="content__title">Sale</label>
                    <p class="value">${item?.sale || ValueEmpty}%</p>
                  </div>

                  <div class="content">
                    <label class="content__title">Price</label>
                    <p class="value">${item?.price || ValueEmpty}$</p>
                  </div>

                  <div class="content">
                    <label class="content__title">Final</label>
                    <p class="value">${
                      item ? item.price - (item.price * item.sale) / ValuePercent : ValueEmpty
                    }$</p>
                  </div>
                </div>
              </div>
            </div>`;
  };
}
