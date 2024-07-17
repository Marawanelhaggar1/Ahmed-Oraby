export class Appointment {
  id: number;
  created_at!: Date;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    whatsApp: string;
  };
  center: {
    id: string;
    name: string;
  };

  constructor(appointment: Appointment) {
    {
      this.id = appointment.id || this.getRandomID();
      this.user = {
        id: appointment.user.id || '',
        first_name: appointment.user.first_name || '',
        last_name: appointment.user.last_name || '',
        email: appointment.user.email || '',
        mobile: appointment.user.mobile || '',
        whatsApp: appointment.user.whatsApp || '',
      };
      this.center = {
        id: appointment.center.id || '',
        name: appointment.center.name || '',
      };
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
