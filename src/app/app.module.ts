import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AssociationComponent } from './association/association.component';
import { AssociationDirective } from './association/association.directive';
import { TypeaheadDirective } from './association/typeahead.directive';
import { AutocompleteDirective } from './association/autocomplete.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, AssociationComponent, AssociationDirective, TypeaheadDirective, AutocompleteDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
