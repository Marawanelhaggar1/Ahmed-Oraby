import { Role } from '@core/models/role';

export class UserModel {
  id: number;
  image: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  role!: Role;
  mobile: string;
  whatsApp: string;
  constructor(user: UserModel) {
    this.id = user.id || this.getRandomID();
    this.image = user.image || '';
    this.email = user.email || '';
    this.first_name = user.first_name || '';
    this.last_name = user.last_name || '';
    this.gender = user.gender || '';
    this.date_of_birth = user.date_of_birth || '';
    this.mobile = user.mobile || '';
    this.whatsApp = user.whatsApp || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
