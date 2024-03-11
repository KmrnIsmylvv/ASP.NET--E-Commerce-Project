import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListProduct } from 'src/app/contracts/ListProduct';
import { ListProductCounted } from 'src/app/contracts/ListProductCounted';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  constructor(private productService: ProductService, private spinner: NgxSpinnerService, private alertifyService: AlertifyService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate'];
  dataSource: MatTableDataSource<ListProduct> = null;

  async getProductList(): Promise<void> {
    this.spinner.show();

    const productList: ListProductCounted = await this.productService.getList(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.spinner.hide(),
      errorMessage =>
        this.alertifyService.message(errorMessage, {
          dismissOthers: true,
          messageType: AlertifyMessageType.Error,
          position: AlertifyPosition.TopRight
        })
    )

    this.dataSource = new MatTableDataSource<ListProduct>(productList.products);
    this.paginator.length = productList.totalCount;
  }

  pageChanged() {
    this.getProductList();
  }

  async ngOnInit(): Promise<void> {
    this.getProductList();
  }
}
