import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AboutModel } from '../../about-model';
import { AboutService } from '@core/service/about.service';
// import { DoctorsService } from '../../doctors.service';
// import { CenterModel } from '../../center-model';
// import { CenterService } from '@core/service/center.service';
// import { AboutModel } from '../../areas';
// import { ServiceService } from '../../service.service';
// import { AboutService } from '@core/service/area.service';

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
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AboutModel,
    public _centerService: AboutService
  ) {
    console.log(data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this._centerService.delete(this.data.id);
  }
}
