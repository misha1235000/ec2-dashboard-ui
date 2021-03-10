// dashboard.component

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';
import { Iec2Instance } from './ec2-instance/iec2-instance';

export enum SortType {
  NAME = 0,
  VALUE = 1
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport | undefined;

  sortTypes = [{ name: 'Name', value: SortType.NAME },
               { name: 'Type', value: SortType.VALUE }];

  CHUNK_SIZE = 60;
  ecInstancesOriginal: Iec2Instance[] | undefined;
  ecInstances: Iec2Instance[] | undefined;
  ecInstancesChunk: Iec2Instance[] | undefined;
  ecFiltered: Iec2Instance[] | undefined;
  isFilter: boolean | undefined;
  highToLow: boolean | undefined;
  selectedSort: number | undefined;
  scrollEmit: boolean | undefined;
  internalError: boolean | undefined;
  virtual = false;

  constructor(private dashboardService: DashboardService,
              private ngZone: NgZone) {}

  /**
   * When the component initializes.
   */
  async ngOnInit(): Promise<void> {
    this.ecInstancesChunk = [];
    try {
      this.ecInstancesOriginal = await this.dashboardService.getInstances().toPromise();
      this.ecInstances = [...this.ecInstancesOriginal];
      if (this.ecInstances) {
        this.ecInstancesChunk = this.ecInstancesChunk.concat(this.ecInstances.splice(0, this.CHUNK_SIZE));
      }
    } catch (err) {
      this.internalError = true;
    }
  }

  /**
   * After the view initializes, add listener to the scroller, that fetches data.
   */
  ngAfterViewInit(): void {
    this._setScroller();
  }

  /**
   * Gets the next amount of data from the original variable.
   */
  async fetchMore(): Promise<void> {
    if (this.ecInstancesChunk && this.ecInstances && this.ecInstances.length > 0) {
         this.ecInstancesChunk = this.ecInstancesChunk.concat(this.ecInstances.splice(0, this.CHUNK_SIZE));
    }
  }

  /**
   * Changes select option, and toggles sort.
   * @param event - The selection event.
   */
  changeSelection(event: any): void {
    this.scrollEmit = !this.scrollEmit;
    this.selectedSort = event.value;
    this.highToLow = true;

    this.sortExecute();
  }

  /**
   * Changes the sort order, and executes the sort
   */
  toggleSort(): void {
    this.scrollEmit = !this.scrollEmit;
    this.highToLow = !this.highToLow;

    this.sortExecute();
  }

  /**
   * Toggles the sort.
   */
  sortExecute(): void {
    if (this.highToLow === undefined) {
      this.highToLow = true;
    }

    if (this.ecInstancesOriginal) {
      this.ecInstances = [...this.ecInstancesOriginal];
    }

    if (this.ecInstances) {

      switch (this.selectedSort) {
        case SortType.NAME:
          this.ecInstances.sort(this._dynamicSort(`${this.highToLow ? '-' : ''}name`));
          break;
        case SortType.VALUE:
          this.ecInstances.sort((a, b) => !this.highToLow ? a.type.size - b.type.size : b.type.size - a.type.size);
          break;
      }

      this.ecInstancesChunk = [];
      this.ecInstancesChunk = this.ecInstancesChunk.concat(this.ecInstances.splice(0, this.CHUNK_SIZE));
    }

    if (this.scroller) {
      this.scroller.scrollToOffset(0);
    }
  }

  /**
   * Filters the ec2 instances according to the given value.
   * @param value - The value to filter with
   */
  filter(value: string): void {
    this.scrollEmit = !this.scrollEmit;
    if (value.length > 0) {
      if (this.scroller) {
        this.scroller.scrollToOffset(0);
      }

      this.isFilter = true;
      this.ecInstances = [...this.ecInstancesOriginal as Iec2Instance[]];

      const filterValue = this._normalizeValue(value);
      const filtered =
        this.ecInstances?.filter(
        (option) =>
          (
            this._normalizeValue(option.name).includes(filterValue) ||
            this._normalizeValue(option.privateIp).includes(filterValue) ||
            this._normalizeValue(option.publicIp).includes(filterValue)
          )
        );

      this.ecInstances = [...filtered as Iec2Instance[]];
      this.ecInstancesChunk = [...this.ecInstances.splice(0, this.CHUNK_SIZE)];
      } else {
        this.isFilter = false;
        this.ecInstances = [...this.ecInstancesOriginal as Iec2Instance[]];
        this.ecInstancesChunk = [ ...this.ecInstances.splice(0, this.CHUNK_SIZE) ];
    }
  }

  /**
   * Changes the view of the instances. (Table - Grid)
   */
  changeView(): void {
    this.virtual = !this.virtual;
    this._setScroller();

    if (this.ecInstancesOriginal) {
      this.ecInstancesChunk = [];
      this.ecInstances = [...this.ecInstancesOriginal];
      if (this.ecInstances) {
        this.ecInstancesChunk = this.ecInstancesChunk.concat(this.ecInstances.splice(0, this.CHUNK_SIZE));
      }
    }
  }

  /**
   * Dynamic sort for any given key of an object array.
   * @param property - Sort by this key.
   */
  private _dynamicSort(property: string): any {
    let sortOrder = 1;

    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }

    return (a: any, b: any) => {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
  }

  /**
   * Normalizes the value so it'll be without any spaces.
   * @param value - The value to normalize.
   * @returns - string of the normalized value.
   */
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  /**
   * Sets the scroller listener.
   */
  private _setScroller(): void {
    setTimeout(() => {
      if (this.scroller) {
        this.scroller.elementScrolled().pipe(
          map(() => this.scroller && this.scroller.measureScrollOffset('bottom')),
          pairwise(),
          filter(([y1, y2]) => ((y1 && y2) && (y2 < y1 && y2 < 160)) as boolean),
          throttleTime(500)
        ).subscribe(() => {
            this.ngZone.run(() => {
              this.fetchMore();
            });
        });
      }
    }, 500);
  }
}
