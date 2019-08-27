import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Directive({
  selector: '[autocomplete]',
  exportAs: 'autocomplete',
  outputs: ['searchChange']
})
export class AutocompleteDirective implements OnInit, OnDestroy {

  @Input() autocomplete: (text: Observable<string>) => Observable<any[]>;
  @Output() searchChange: EventEmitter<any> = new EventEmitter();

  private _subscription: Subscription;
  private _resubscribeTypeahead: BehaviorSubject<any>;

  behaviorSubject: BehaviorSubject<string>;

  constructor() {
    this._resubscribeTypeahead = new BehaviorSubject('');
  }

  ngOnInit() {
    const userInput$ = this._resubscribeTypeahead.pipe(switchMap(() => this._resubscribeTypeahead.asObservable().pipe(this.autocomplete)));
    this._subscription = this._subscribeToUserInput(userInput$);
  }

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
    this._resubscribeTypeahead.next(value);
  }

  ngOnDestroy() {
    this._unsubscribeFromUserInput();
  }

}