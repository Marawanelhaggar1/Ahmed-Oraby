import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
// import { SlidesModel } from './specialty-model';
import { SlidesModel } from './slides-model';
// import { SlidesModel } from './areas';
@Injectable({
  providedIn: 'root',
})
export class ServiceService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/doctors.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<SlidesModel[]> = new BehaviorSubject<
    SlidesModel[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: SlidesModel;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): SlidesModel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDoctorss(): void {
    this.subs.sink = this.httpClient
      .get<{ data: SlidesModel[] }>(
        'https://hws1.axonbi.com/public/api/slides?lang=admin'
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

  addDoctors(doctors: SlidesModel): void {
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
  updateDoctors(centers: SlidesModel): void {
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
