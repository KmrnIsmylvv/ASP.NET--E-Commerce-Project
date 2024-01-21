import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/CreateProduct';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, successCallBack?: any, errorCallBack?: any) {
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
}
