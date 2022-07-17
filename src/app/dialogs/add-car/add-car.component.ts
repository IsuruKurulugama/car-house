import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Car } from "src/app/models/car.model";

@Component({
    selector: 'add-car-dialog',
    templateUrl: 'add-car.component.html',
    styleUrls: ['./add-cars.component.css']
})
export class AddCarDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<AddCarDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Car,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}