import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit, AfterViewInit, ViewChild, NgZone, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-ec2-instance-table',
  templateUrl: './ec2-instance-table.component.html',
  styleUrls: ['./ec2-instance-table.component.css']
})
export class Ec2InstanceTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() ecInstancesChunk: any;
  @Input() scrollEmit: any;
  @ViewChild('scroller') scroller: any;
  @Output() emitFetch = new EventEmitter();

  constructor(private ngZone: NgZone,
              private clipboard: Clipboard,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.scrollEmit !== undefined) {
      if (this.scroller) {
        this.scroller.scrollToOffset(0);
      }
    }
  }

  copyClipboard(value: string): void {
    this.clipboard.copy(value);

    this.snackBar.open('Content copied to clipboard', 'Close', {
      duration: 3000
    });
  }

  /**
   * After the view initializes, add listener to the scroller, that fetches data.
   */
  ngAfterViewInit(): void {
    if (this.scroller) {
      this.scroller.elementScrolled().pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => (y2 < y1 && y2 < 160)),
        throttleTime(500)
      ).subscribe(() => {
          this.ngZone.run(() => {
            this.emitFetch.emit();
          });
      });
    }
  }
}
