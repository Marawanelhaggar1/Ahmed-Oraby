export class ScheduleModel {
  id: number;
  doctor_id: string;
  date: string;
  dateAr: string;
  start_time: string;
  start_timeAr: string;
  end_time: string;
  end_timeAr: string;
  doctor!: {
    id: string;
    name: string;
    image: string;
  };

  constructor(schedule: ScheduleModel) {
    this.id = schedule.id || this.getRandomID();
    this.doctor_id = schedule.doctor_id || '';
    this.date = schedule.date || '';
    this.dateAr = schedule.dateAr || '';
    this.start_time = schedule.start_time || '';
    this.start_timeAr = schedule.start_timeAr || '';
    this.end_time = schedule.end_time || '';
    this.end_timeAr = schedule.end_timeAr || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
