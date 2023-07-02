
import { Component, Input, Output, EventEmitter, OnInit,ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent{

  
  @Input() displayedColumns: string[] | any;
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() paginator!: MatPaginator;
  @Output() deleteCustomer = new EventEmitter<number>();
  @Output() openEditForm = new EventEmitter<any>();
  @Input() set sort(sort: MatSort) {
    this.dataSource.sort = sort;
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteCustomer(id: number) {
    this.deleteCustomer.emit(id);
  }

  onOpenEditForm(data: any) {
    this.openEditForm.emit(data);
  }
}

