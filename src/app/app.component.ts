import { Component, OnInit } from '@angular/core';
import { Observable, map, timer, take, skip } from 'rxjs';
import { mergeWith, combineLatestWith, concatWith } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public output1 = [];
  public output2 = [];
  public output3 = [];
  public output4 = [];

  private timer$ = timer(500, 500).pipe(skip(1), take(5));

  // Input observables to be used as the base of translations
  public input1$: Observable<number> = this.timer$; // 1, 2, 3, 4, 5
  public input2$: Observable<number> = this.timer$.pipe(map((val) => val * 10)); //10, 20, 30, 40, 50

  // DONE - Modify output1$ to produce the output '10, 20, 30, 40, 50
  private translate1$: Observable<number> = this.input1$.pipe(
    map((val) => 10 * val)
  );

  // TODO - Modify translate2$ to produce the output '1, 2, 3, 4, 5, 10, 20, 30, 40, 50'
  private translate2$: Observable<number> = this.input1$.pipe(
    concatWith(this.input2$)
  );

  // TODO - Modify translate3$ to produce the output '1, 10, 2, 20, 3, 30, 4, 40, 5, 50'
  private translate3$: Observable<number> = this.input1$.pipe(
    mergeWith(this.input2$)
  );

  // TODO - Modify translate4$ to produce the output [1,10], [2,10], [2,20], [3,20], [3,30], [4,30], [4,40], [5,40], [5,50]
  private translate4$: Observable<[number, number]> = this.input1$.pipe(
    combineLatestWith(this.input2$)
  );

  public ngOnInit() {
    this.saveTranslateStreamsToUIDisplayedValues();
  }

  private saveTranslateStreamsToUIDisplayedValues() {
    if (this.translate1$) {
      this.translate1$.subscribe((val) => this.output1.push(val));
    }
    if (this.translate2$) {
      this.translate2$.subscribe((val) => this.output2.push(val));
    }
    if (this.translate3$) {
      this.translate3$.subscribe((val) => this.output3.push(val));
    }
    if (this.translate4$) {
      this.translate4$.subscribe((val) => this.output4.push(val));
    }
  }
}
