export class SubService {
  id: number;
  name: string;
  nameEn: string;
  nameAr: string;
  services_id: string;

  constructor(center: SubService) {
    {
      this.id = center.id || this.getRandomID();
      this.name = center.name || '';
      this.nameEn = center.nameEn || '';
      this.nameAr = center.nameAr || '';
      this.services_id = center.services_id || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
