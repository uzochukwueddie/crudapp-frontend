import { CrudService } from './../../services/crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  editForm: FormGroup;
  items: any;
  startDate: any;
  endDate: any;

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    // Initialization of form group
    this.initForm();
    this.setFormData(); // Load data into form for editing
  }

  initForm() {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      city: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required],
      color: ['', Validators.required],
    }, err => {
      this.errorHandler(err.error.message);
    });
  }

  setFormData() {
    // get id from route params
    // then use id to get data from db
    // by subscribing to the observable
    this.route.params
      .subscribe(params => {
        const id = params['id'];
        if (!id) {
          return;
        }
        this.crudService.getSingleItem(id)
          .subscribe(data => {
            this.items = data.result;
            this.editForm.patchValue(this.items);
            this.startDate = new Date(this.editForm.value.start_date);
            this.endDate = new Date(this.editForm.value.end_date);
          }, err => {
            this.errorHandler(err.error.message);
            if (!err.error.found) {
              return this.router.navigate(['']);
            }
          });
      });
  }

  // update item
  onSubmit() {
    if (this.items) {
      this.crudService.updateSingleItem(this.items._id, this.editForm.value)
        .subscribe(data => {
          this.snackBar.open(data.message, 'Success', {
            duration: 2000
          });
          this.router.navigate(['']);
        }, err => {
          this.errorHandler(err.error.message);
        });
    }
  }

  // Display message
  errorHandler(message) {
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }

}
