import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BlogsModel } from '@core/models/blogs-model';
// import {  } from './center-model';
@Injectable({
  providedIn: 'root',
})
export class ServiceService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/doctors.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<BlogsModel[]> = new BehaviorSubject<BlogsModel[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: BlogsModel;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): BlogsModel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDoctorss(): void {
    this.subs.sink = this.httpClient
      .get<{ data: BlogsModel[] }>(
        'https://getmedist.com/public/api/blogs?lang=admin'
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

  addDoctors(doctors: BlogsModel): void {
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
  updateDoctors(centers: BlogsModel): void {
    this.dialogData = centers;

    this.httpClient
      .put('http://hws1.axonbi.com/public/api/feedback?lang=admin', centers)
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
