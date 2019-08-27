import { Component } from '@angular/core';
import { User } from './association/association.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  users: User[] = [{
    name: 'Nguyen Van A',
    address: 'Ha Noi',
    age: 20
  }, {
    name: 'Bui Van C',
    address: 'Hai Phong',
    age: 25
  },{
    name: 'Pham Thi C',
    address: 'Ho Chi Minh',
    age: 30
  }];
}
