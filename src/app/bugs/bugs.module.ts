import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugsListComponent } from './bugs-list/bugs-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { UpdateComponent } from './bugs-list/update/update.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [BugsListComponent],

  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  exports: [
    BugsListComponent,
    MatSortModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
})
export class BugsModule { }
