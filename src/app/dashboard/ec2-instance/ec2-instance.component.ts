// ec2-instance.component

import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ec2-instance',
  templateUrl: './ec2-instance.component.html',
  styleUrls: ['./ec2-instance.component.css']
})
export class Ec2InstanceComponent implements OnInit {
  @Input() currEcInstance: any;
  constructor(private clipboard: Clipboard,
              private snackBar: MatSnackBar) { }

  /**
   * Copies a specified value to the clipboard.
   * @param value - The Value to copy to the clipboard
   */
  copyClipboard(value: string): void {
    this.clipboard.copy(value);

    this.snackBar.open('Content copied to clipboard', 'Close', {
      duration: 3000
    });
  }

  ngOnInit(): void {
  }

}
