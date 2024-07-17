import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SpecialtyModel } from '../../specialty-model';
import { SpecialtyService } from '@core/service/specialty.service';

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
    @Inject(MAT_DIALOG_DATA) public data: SpecialtyModel,
    public _centerService: SpecialtyService
  ) {
    console.log(data);
    this.getDoctorsBySpecialty(data.id);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getDoctorsBySpecialty(id: number) {
    return this._centerService.getBySpecialty(id).subscribe({
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
