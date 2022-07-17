import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';
import { MatDialog } from '@angular/material/dialog';
import { AddCarDialogComponent } from '../dialogs/add-car/add-car.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements AfterViewInit {

  displayedColumns: string[] = ['Id', 'Brand', 'Model', 'Navigation'];
  dataSource = new MatTableDataSource<Car>();

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(private carService: CarService, public dialog: MatDialog) {
    this.getCars();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getCars() {
    this.carService.getCars().subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  createCar(car: Car) {
    this.carService.createCar(car).subscribe((data: any) => {
      this.getCars();
    });
  }

  openAddCarDialog(): void {

    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '30%',
      data: new Car(),
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.createCar(result);
      console.log('The dialog was closed', result);
      //this.car = result;
    });
  }
}

function DialogOverviewExampleDialog(DialogOverviewExampleDialog: any, arg1: { width: string; data: { name: any; animal: any; }; }) {
  throw new Error('Function not implemented.');
}
