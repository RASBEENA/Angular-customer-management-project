
import { LoginComponent } from './login/login.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerAddEditComponent } from './customer-add-edit/customer-add-edit.component';
import { CustomerService } from './services/customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  loggedIn:boolean = false;
  title = 'customer-management-angular-project';
  displayedColumns: string[] = [
    'id',
    'fullName',
    'dob',
    'email',
    'address',
    'contact',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _customerService: CustomerService,
    private _coreService: CoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.getCustomerList();
  }

  login() {
    this.loggedIn = true;
    this.router.navigate(['/customer-list']);
  }




  openAddEditCustomerForm() {
    const dialogRef = this._dialog.open(CustomerAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCustomerList();
        }
      },
    });
  }

  getCustomerList() {
    this._customerService.getCustomerList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCustomer(id: number) {
    this._customerService.deleteCustomer(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Customer deleted!', 'done');
        this.getCustomerList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CustomerAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCustomerList();
        }
      },
    });
  }
}
