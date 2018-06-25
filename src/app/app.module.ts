import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
   MatDatepickerModule,
   MatNativeDateModule,
   MatSnackBarModule,
   MatIconModule,
   MatMenuModule,
} from '@angular/material';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CrudService } from './services/crud.service';
import { HttpClientModule } from '@angular/common/http';
import { CrudTableComponent } from './components/crud-table/crud-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { DateFormatPipe } from './date-format.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CrudTableComponent,
    EditItemComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
