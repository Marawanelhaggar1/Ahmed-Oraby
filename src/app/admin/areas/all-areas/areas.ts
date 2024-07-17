export class AreasModel {
  id: number;
  nameEn: string;
  nameAr: string;
  view: string;

  constructor(center: AreasModel) {
    {
      this.id = center.id || this.getRandomID();
      this.nameEn = center.nameEn || '';
      this.nameAr = center.nameAr || '';
      this.view = center.view || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
