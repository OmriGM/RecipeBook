import {Directive, HostBinding, HostListener, Input, ViewChild} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;
    @Input()  id: string;


  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {



      if (event.toElement.parentElement !== null && event.toElement.parentElement.id === this.id) {
        this.isOpen = !this.isOpen;
      }else if (this.isOpen) {
        this.isOpen = false;
      }
   }

  constructor() { }

}
