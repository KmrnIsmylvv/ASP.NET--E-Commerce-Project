import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/CreateProduct';
import { HttpClientService, RequestParameters } from 'src/app/services/common/http-client.service';
import { ListProductComponent } from './list-product/list-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  @ViewChild(ListProductComponent) listComponent: ListProductComponent;

  ngOnInit(): void {
    this.showSpinner();
  }

  createdProductEventListener() {
    this.listComponent.getProductList();
  }

}
