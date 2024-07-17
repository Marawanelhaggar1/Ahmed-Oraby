import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
// import { DoctorsService } from '../../doctors.service';
import { CenterModel } from '../../center-model';
import { CenterService } from '@core/service/center.service';

export interface DialogData {
  id: number;
  name: string;
  department: string;
  mobile: string;
}

@Component({
  selector: 'app-delete:not(f)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  length?: number;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CenterModel,
    public _centerService: CenterService
  ) {
    console.log(data);
    this.getDoctorsByCenter(data.id);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getDoctorsByCenter(id: number) {
    return this._centerService.getByCenter(id).subscribe({
      next: (data) => {
        console.log(data.data.length);
        this.length = data.data.length;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  confirmDelete(): void {
    this._centerService.deleteCenters(this.data.id);
  }
}
