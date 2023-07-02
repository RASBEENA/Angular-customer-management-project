
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.scss'],
})
export class CustomerAddEditComponent implements OnInit {
  customerForm: FormGroup;
  
  constructor(
    private _fb: FormBuilder,
    private _customerService: CustomerService,
    private _dialogRef: MatDialogRef<CustomerAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.customerForm = this._fb.group({
      'id':'',
      fullName: ['', Validators.required],
    'dob':'',
    email: ['', [Validators.required, Validators.email]],
    'address': '',
    contact: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    
    });
  }

  ngOnInit(): void {
    this.customerForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.customerForm.valid) {
      if (this.data) {
        this._customerService
          .updateCustomer(this.data.id, this.customerForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Customer detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._customerService.addCustomer(this.customerForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Customer added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
