import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[appAssociation]'
})
export class AssociationDirective {

  @Input('appAssociation') appAssociation: (text: Observable<string>) => Observable<any[]>;

  private _subscription: Subscription;
  private _valueChanges: Observable<string>;
  private _resubscribeTypeahead: BehaviorSubject<any>;

  constructor(
    private _elementRef: ElementRef<HTMLInputElement>
  ) {
    this._valueChanges = fromEvent<Event>(_elementRef.nativeElement, 'input')
      .pipe(map($event => ($event.target as HTMLInputElement).value));
    this._resubscribeTypeahead = new BehaviorSubject(null);
  }

  ngOnInit() {
    console.log('appAssociation', this.appAssociation);
    const inputValues$ = this._valueChanges.pipe(tap(value => {
      console.log('inputValues');
    }));
    const results$ = inputValues$.pipe(this.appAssociation);
    const processedResults$ = results$.pipe(tap(() => {
      console.log('processedResults');
    }));
    const userInput$ = this._resubscribeTypeahead.pipe(switchMap(() => processedResults$));
    this._subscription = this._subscribeToUserInput(userInput$);
  }

  private _subscribeToUserInput(userInput$: Observable<any[]>): Subscription {
    return userInput$.subscribe((results) => {
      if (!results || results.length === 0) {

      } else {

      }

      // live announcer
      const count = results ? results.length : 0;
      console.log('...', count === 0 ? 'No results available' : `${count} result${count === 1 ? '' : 's'} available`);
    });
  }

  private _unsubscribeFromUserInput() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    this._subscription = null;
  }

  // @HostListener('keyup', ['$event.target.value'])
  // onchange(value) {
  //   console.log(value);
  //   // this.appAssociation.next(value);
  // }

}