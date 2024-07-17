import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AreasModel } from './areas';
// import {  } from './center-model';
@Injectable({
  providedIn: 'root',
})
export class ServiceService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/doctors.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<AreasModel[]> = new BehaviorSubject<AreasModel[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: AreasModel;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AreasModel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDoctorss(): void {
    this.subs.sink = this.httpClient
      .get<{ data: AreasModel[] }>(
        'https://hws1.axonbi.com/public/api/area/admin?lang=admin'
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

  addDoctors(doctors: AreasModel): void {
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
  updateDoctors(centers: AreasModel): void {
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
