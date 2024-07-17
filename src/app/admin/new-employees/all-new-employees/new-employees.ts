export class NewEmployees {
  id: number;
  image: string;
  title: string;
  titleAr: string;
  name: string;
  nameAr: string;

  constructor(employee: NewEmployees) {
    this.id = employee.id || this.getRandomID();
    this.title = employee.title || '';
    this.titleAr = employee.titleAr || '';
    this.name = employee.name || '';
    this.nameAr = employee.nameAr || '';
    this.image = employee.image || '';
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
