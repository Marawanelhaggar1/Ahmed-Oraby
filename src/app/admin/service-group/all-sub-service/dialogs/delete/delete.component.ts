import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SubServiceService } from '@core/service/sub-service.service';
import { SubService } from '../../sub-service';

// import { SubServiceService } from '@core/service/area.service';

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
    @Inject(MAT_DIALOG_DATA) public data: SubService,
    public _centerService: SubServiceService
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this._centerService.deleteCenters(this.data.id);
  }
}
