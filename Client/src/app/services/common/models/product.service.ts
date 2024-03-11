import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/CreateProduct';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { ListProduct } from 'src/app/contracts/ListProduct';
import { lastValueFrom } from 'rxjs';
import { ListProductCounted } from 'src/app/contracts/ListProductCounted';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product)
      .pipe(
        tap(result => {
          successCallBack();
        }), catchError((errorResponse: HttpErrorResponse) => {
          const error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
          let message: string = '';

          error.forEach(obj => {
            obj.value.forEach(value => {
              message += `- ${value}<br>`;
            });
          });

          errorCallBack(message);
          throw errorResponse;
        })
      )
      .subscribe();
  }

  async getList(pageIndex: number = 0, pageSize: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<ListProductCounted> {
    const promiseData: Promise<ListProductCounted> = this.httpClientService.get<ListProductCounted>({
      controller: 'products',
      queryString: `pageIndex=${pageIndex}&pageSize=${pageSize}`
    }).toPromise();

    promiseData.then(p => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));

    return await promiseData;
  }
}
