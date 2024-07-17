import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BookingModel } from './booking-model';
@Injectable({
  providedIn: 'root',
})
export class ServiceService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/BookingModel.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<BookingModel[]> = new BehaviorSubject<
    BookingModel[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: BookingModel;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): BookingModel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDoctorss(): void {
    this.subs.sink = this.httpClient
      .get<{ data: BookingModel[] }>(
        'https://hws1.axonbi.com/public/api/booking/onlineConsultation?lang=admin'
      )
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          console.log(data);
          this.dataChange.next(data.data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  addBookingModel(BookingModel: BookingModel): void {
    this.dialogData = BookingModel;

    // this.httpClient.post(this.API_URL, BookingModel)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = BookingModel;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateBookingModel(BookingModel: BookingModel): void {
    this.dialogData = BookingModel;

    // this.httpClient.put(this.API_URL + BookingModel.id, BookingModel)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = BookingModel;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteBookingModel(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}
