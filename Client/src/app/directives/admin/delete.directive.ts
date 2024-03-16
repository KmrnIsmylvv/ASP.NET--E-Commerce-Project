import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    public dialog: MatDialog
  ) {
    const button = renderer.createElement('button');
    this.renderer.setAttribute(button, 'aria-label', 'Delete');
    this.renderer.addClass(button, 'mat-warn');
    this.renderer.addClass(button, 'mat-icon-button');
    button.innerText = 'Delete';

    renderer.appendChild(this.element.nativeElement, button);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() updateList: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.openDialog(async () => {
      const td: HTMLTableCellElement = this.element.nativeElement;

      await this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe({
        next: () => {
          $(td.parentElement).animate({
            opacity: 0,
            left: '+=50',
            height: 'toggle'
          }, () => {
            this.updateList.emit();
            this.alertifyService.message('Product is deleted successfully', {
              dismissOthers: true,
              messageType: AlertifyMessageType.Success,
              position: AlertifyPosition.TopRight
            });
          })
        },
        error: () => {
          this.alertifyService.message('Unexpected error happens!!!', {
            dismissOthers: true,
            messageType: AlertifyMessageType.Error,
            position: AlertifyPosition.TopRight
          })
        }
      })
    })
  }

  openDialog(afterClosed: () => void): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes)
        afterClosed();
    });
  }
}
