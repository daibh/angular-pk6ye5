import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[typeahead]',
  exportAs: 'typeahead',
  outputs: ['searchChange']
})
export class TypeaheadDirective implements OnInit, OnDestroy {

  @Input() typeahead: (text: Observable<string>) => Observable<any[]>;
  @Output() searchChange: EventEmitter<any> = new EventEmitter();

  private _subscription: Subscription;
  private _valueChanges: Observable<string>;
  private _resubscribeTypeahead: BehaviorSubject<any>;

  constructor(
    _elementRef: ElementRef<HTMLInputElement>
  ) {
    this._valueChanges = fromEvent<Event>(_elementRef.nativeElement, 'input').pipe(map($event => ($event.target as HTMLInputElement).value));
    this._resubscribeTypeahead = new BehaviorSubject(null);
  }

  ngOnInit() {
    const userInput$ = this._resubscribeTypeahead.pipe(switchMap(() => this._valueChanges.pipe(this.typeahead)));
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

  ngOnDestroy() {
    this._unsubscribeFromUserInput();
  }

}