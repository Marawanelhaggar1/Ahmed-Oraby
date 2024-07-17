import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { CareerModel } from './career-model';
// import { CareerModel } from './promotion-model';
@Injectable({
  providedIn: 'root',
})
export class ServiceService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/doctors.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<CareerModel[]> = new BehaviorSubject<
    CareerModel[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: CareerModel;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): CareerModel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDoctorss(): void {
    this.subs.sink = this.httpClient
      .get<{ data: CareerModel[] }>(
        'https://hws1.axonbi.com/public/api/career?lang=admin'
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          console.log('a');
          this.isTblLoading = false;
          this.dataChange.next(data.data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log('a');
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  addDoctors(doctors: CareerModel): void {
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
  updateDoctors(centers: CareerModel): void {
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
