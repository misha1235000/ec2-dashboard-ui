import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  @Input() givenHeight: string | undefined;
  @Input() icon: string | undefined;
  @Input() description: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
