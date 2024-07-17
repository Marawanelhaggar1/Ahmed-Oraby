export class DentalServices {
  id: number;
  image: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;

  constructor(service: DentalServices) {
    this.id = service.id || this.getRandomID();
    this.title = service.title || '';
    this.titleAr = service.titleAr || '';
    this.description = service.description || '';
    this.descriptionAr = service.descriptionAr || '';
    this.image = service.image || '';
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
