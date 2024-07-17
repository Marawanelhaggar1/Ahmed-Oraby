export class SpecialtyModel {
  id: number;
  specialtyEn: string;
  specialty: string;
  specialtyAr: string;
  icon: string;
  image: string;
  view: string;
  image_id: string;

  constructor(center: SpecialtyModel) {
    {
      this.id = center.id || this.getRandomID();
      this.specialtyEn = center.specialtyEn || '';
      this.specialtyAr = center.specialtyAr || '';
      this.specialty = center.specialty || '';
      this.icon = center.icon || '';
      this.view = center.view || '';
      this.image = center.image || '';
      this.image_id = center.image_id || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
