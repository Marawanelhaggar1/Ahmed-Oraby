export class CareerModel {
  id: number;
  name: string;
  email: string;
  job: string;
  phone: string;
  cv: string;

  constructor(career: CareerModel) {
    this.id = career.id || this.getRandomID();
    this.name = career.name || '';
    this.email = career.email || '';
    this.phone = career.phone || '';
    this.job = career.job || '';
    this.cv = career.cv || '';
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
