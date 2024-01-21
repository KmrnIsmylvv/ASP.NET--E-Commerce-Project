import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/CreateProduct';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, spinner: NgxSpinnerService,
    private alertify: AlertifyService) {
    super(spinner)
  }

  ngOnInit(): void {
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner();

    const createProduct: CreateProduct = new CreateProduct();
    createProduct.name = name.value;
    createProduct.stock = parseInt(stock.value);
    createProduct.price = parseFloat(price.value);

    this.productService.create(createProduct, () => {
      this.hideSpinner();
      this.alertify.message("Product added successfully", {
        dismissOthers: true,
        messageType: AlertifyMessageType.Success,
        position: AlertifyPosition.BottomRight
      })
    }, errorMessage => {
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: AlertifyMessageType.Error,
        position: AlertifyPosition.TopRight
      });
    });
  }
}
