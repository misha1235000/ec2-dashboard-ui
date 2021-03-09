import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    imports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
        MatSelectModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatSlideToggleModule,
    ],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
        MatSelectModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatSlideToggleModule,
    ]
  })

export class MaterialModule {}
