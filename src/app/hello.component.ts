import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<div class="col-md-12 mb-3 mt-3"><h1>Hello {{name}}!</h1></div>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
}
