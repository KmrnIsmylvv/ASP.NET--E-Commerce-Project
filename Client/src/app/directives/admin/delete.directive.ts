import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private productService: ProductService
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
    const td: HTMLTableCellElement = this.element.nativeElement;

    this.productService.delete(this.id);

    $(td.parentElement).fadeOut(500, () => this.updateList.emit());
  }
}
