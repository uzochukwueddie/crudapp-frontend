import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import _ from 'lodash';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css']
})
export class CrudTableComponent implements OnInit {
  dataSource = [];
  iconVariable: string;
  order = false;
  pages: number;
  dir = 1;
  dateForm: FormGroup;
  reset = false;

  constructor(
    private crudService: CrudService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
   }

  ngOnInit() {
    this.initForm(); // Initialize form group
    this.iconVariable = 'arrow_drop_up';
    // Subscribe to the getData method that returns
    // data from the db
    this.crudService.getData('id', 1)
      .subscribe(data => {
        this.pages = 1;
        this.dataSource = data.result;
      }, err => {
        this.errorHandler(err.error.message);
      });
  }

  // This method is called when the load
  // button is clicked to load the data
  // from json file into db
  readData() {
    this.crudService.readData()
      .subscribe(data => {
        const mergedData = data.oldData.concat(data.result);
        this.dataSource = _.sortBy(mergedData, 'id');
        this.snackBar.open(data.message, 'Success', {
          duration: 2000
        });
      }, err => {
        this.errorHandler(err.error.message);
      });
  }

  initForm() {
    this.dateForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    }, err => {
      this.errorHandler(err.error.message);
    });
  }

  // For filtering data
  onSubmit() {
    this.crudService.filterData(this.dateForm.value)
      .subscribe(data => {
        this.dataSource = data.result;
        this.dateForm.reset();
        this.reset = true;
      }, err => {
        this.errorHandler(err.error.message);
      });
  }

  // Reset page when filter
  // is concluded
  resetPage() {
    this.crudService.getData('id', 1)
      .subscribe(data => {
        this.pages = 1;
        this.dataSource = data.result;
        this.reset = false;
      }, err => {
        this.errorHandler(err.error.message);
      });
  }

  editItemComponent(id) {
    this.router.navigate(['/item', id]);
  }

  // Delete item
  deleteItem(id) {
    this.crudService.deleteSingleItem(id)
      .subscribe(data => {
        const index = _.findIndex(this.dataSource, ['_id', id]);
        this.dataSource.splice(index, 1);
        this.snackBar.open('Item deleted', 'Success', {
          duration: 2000
        });
      }, err => {
        this.errorHandler(err.error.message);
      });
  }

  // Sort table using column heads
  sortDataArray(value?) {
    this.dir = -this.dir;
    if (this.dir === -1) {
      this.iconVariable = 'arrow_drop_down';
    }
    if (this.dir === 1) {
      this.iconVariable = 'arrow_drop_up';
    }
    this.crudService.getData(value, this.dir)
      .subscribe(data => {
        this.dataSource = data.result;
      }, err => {
        this.errorHandler(err.error.message);
      });
  }

  // used to display message
  errorHandler(message) {
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }

}
