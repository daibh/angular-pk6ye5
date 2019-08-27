import { Component, OnInit, Input, Output } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {

  // input type as array
  @Input() resource: User[];

  constructor() { }

  ngOnInit() {
  }

  search = (text$: Observable<string>) => {
    console.log('search');
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.resource.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  }

}

export class User {
  name: string;
  address?: string;
  age?: number;
}