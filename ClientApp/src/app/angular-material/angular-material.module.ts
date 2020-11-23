import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------------------------------------------------------------------------
    Import all the Material dependencies here. Don't forget to Export them. 
------------------------------------------------------------------------------*/

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class AngularMaterialModule { }
