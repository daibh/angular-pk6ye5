import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Directive({
  selector: '[appAssociation]',
  exportAs: 'appAssociation',
  outputs: ['searchChange']
})
export class AssociationDirective implements OnInit, OnDestroy {

  @Input() appAssociation: (text: Observable<string>) => Observable<any[]>;
  @Output() searchChange: EventEmitter<any> = new EventEmitter<any>();

  private _subscription: Subscription;
  private _valueChanges: Observable<string>;
  private _resubscribeTypeahead: BehaviorSubject<any>;

  constructor() {
    this._resubscribeTypeahead = new BehaviorSubject(null);
  }

  ngOnInit() {}

  private _subscribeToUserInput(userInput$: Observable<any[]>): Subscription {
    return userInput$.subscribe((results) => {
      this.searchChange.emit(results);
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

  @HostListener('keyup', ['$event.target.value'])
  onchange(value) {
    const userInput$ = this._resubscribeTypeahead.pipe(switchMap(() => of(value).pipe(this.appAssociation)));
    this._subscription = this._subscribeToUserInput(userInput$);
  }

  ngOnDestroy() {
    this._unsubscribeFromUserInput();
  }

}