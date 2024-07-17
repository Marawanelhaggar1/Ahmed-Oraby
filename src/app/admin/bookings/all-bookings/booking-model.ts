import { Time } from '@angular/common';

export class BookingModel {
  id: number;
  patient_name: string;
  phone: string;
  date: string;
  time: Time;
  location: string;
  email: string;
  description: string;
  updated_at: Date;
  doctor!: {
    id: string;
    name: string;
    image: string;
  };
  payment: string;
  health_center!: {
    id: string;

    nameEn: string;
    nameAr: string;
    image: string;
  };
  status: string;
  user_id: string;
  constructor(booking: BookingModel) {
    this.id = booking.id;
    this.patient_name = booking.patient_name;
    this.phone = booking.phone;
    this.date = booking.date;
    this.time = booking.time;
    this.location = booking.location;
    this.email = booking.email;
    this.description = booking.description;
    this.payment = booking.payment;
    this.updated_at = booking.updated_at;
    this.status = booking.status;
    this.user_id = booking.user_id;
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
