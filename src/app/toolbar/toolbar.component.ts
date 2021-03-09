import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() className: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
