import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private productService: ProductService,
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
  @Output() updateList: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.openDialog(async () => {
      const td: HTMLTableCellElement = this.element.nativeElement;

      await this.productService.delete(this.id);

      $(td.parentElement).animate({
        opacity: 0,
        left: '+=50',
        height: 'toggle'
      }, () => this.updateList.emit())
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
