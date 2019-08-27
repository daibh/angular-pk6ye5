import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {

  // input type as array
  @Input() resource: User[];
  resultSearch: User[];
  message?: string;

  constructor() { }

  ngOnInit() {
    console.log('this.resource', this.resource);
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        console.log('search', term);
        return term.length < 1 ? this.resource
          : this.resource.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      })
    );
  }

  onSearchChange = results => {
    console.log('onSearchChange', results);
    this.resultSearch = results;
    const count = results ? results.length : 0;
    this.message = count === 0 ? 'No results available' : `${count} result${count === 1 ? '' : 's'} available`;
  }

}

export class User {
  name: string;
  address?: string;
  age?: number;
}