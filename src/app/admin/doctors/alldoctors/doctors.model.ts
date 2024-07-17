import { formatDate } from '@angular/common';
export class Doctors {
  id: number;
  name: string;
  nameAr: string;
  fee: string;
  feeAr: string;
  date: string;
  waiting: string;
  titleAr: string;
  title: string;
  addressAr: string;
  address: string;
  image: string;
  view: string;
  appointment: string;
  featured: string;
  health_center!: { id: number; name: string }[];
  specialty!: { id: number; specialty: string };
  constructor(doctors: Doctors) {
    {
      this.id = doctors.id || this.getRandomID();
      this.image = doctors.image || 'assets/images/user/user1.jpg';
      this.name = doctors.name || '';
      this.nameAr = doctors.nameAr || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.title = doctors.title || '';
      this.titleAr = doctors.titleAr || '';
      this.address = doctors.address || '';
      this.addressAr = doctors.addressAr || '';
      this.waiting = doctors.waiting || '';
      this.feeAr = doctors.feeAr || '';
      this.fee = doctors.fee || '';
      this.view = doctors.view || '';
      this.appointment = doctors.appointment || '';
      this.featured = doctors.view || '';
      // this.addressAr = doctors.addressAr || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
