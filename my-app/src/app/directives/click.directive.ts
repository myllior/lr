import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appClick]'
})
export class ClickDirective {
  @Input('appClick') title: string
  constructor() { }
  @HostListener('click', ['$event.target'])
  onClick(btn) {
    alert(this.title)
  }
}
