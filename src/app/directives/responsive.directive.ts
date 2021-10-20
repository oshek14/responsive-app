import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
} from 'rxjs/operators';

@Directive({
  selector: '[responsive]',
})
export class ResponsiveDirective implements OnInit {
  @Input() responsive;

  mobile = 960;
  tablet = 1280;

  constructor(public el: ElementRef) {}

  ngOnInit() {
    this.setStyles();

    fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.setStyles();
      });
  }

  setStyles() {
    const currentWidth = window.innerWidth;
    switch (this.responsive) {
      case 'sm':
        this.el.nativeElement.style.display =
          currentWidth <= this.mobile ? 'block' : 'none';
        break;
      case 'md':
        this.el.nativeElement.style.display =
          currentWidth > this.mobile && currentWidth <= this.tablet
            ? 'block'
            : 'none';
        break;
      case 'lg':
        this.el.nativeElement.style.display =
          currentWidth > this.tablet ? 'block' : 'none';
        break;
      default:
        break;
    }
  }
}
