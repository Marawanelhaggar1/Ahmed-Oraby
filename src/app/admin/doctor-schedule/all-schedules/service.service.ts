import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ScheduleModel } from './schedule-model';
@Injectable({
  providedIn: 'root',
})
export class ServiceService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/doctors.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<ScheduleModel[]> = new BehaviorSubject<
    ScheduleModel[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: ScheduleModel;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): ScheduleModel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDoctorss(): void {
    this.subs.sink = this.httpClient
      .get<{ data: ScheduleModel[] }>(
        'https://hws1.axonbi.com/public/api/doctor/schedule?lang=admin'
      )
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  addDoctors(doctors: ScheduleModel): void {
    this.dialogData = doctors;

    // this.httpClient.post(this.API_URL, doctors)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = doctors;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateDoctors(centers: ScheduleModel): void {
    this.dialogData = centers;

    this.httpClient
      .put('http://hws1.axonbi.com/public/api/area', centers)
      .subscribe({
        next: (data) => {
          this.dialogData = centers;
          console.log(data);
        },
        error: (error: HttpErrorResponse) => {
          // error code here
          console.error(error);
        },
      });
  }
}
