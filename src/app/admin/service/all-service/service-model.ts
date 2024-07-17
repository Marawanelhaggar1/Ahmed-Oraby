export class ServiceModel {
  id: number;
  nameEn: string;
  name: string;
  nameAr: string;
  descriptionEn1: string;
  description: string;
  descriptionAr1: string;
  descriptionAr: string;
  descriptionEn2: string;
  description2: string;
  descriptionAr2: string;
  image: string;
  icon: string;
  featured: string;
  dental: string;
  icon_id: string;
  service_group!: {
    id: string;
    nameAr: string;
    name: string;
    services_id: string;
  }[];

  constructor(service: ServiceModel) {
    this.id = service.id || this.getRandomID();
    this.name = service.name || '';
    this.nameAr = service.nameAr || '';
    this.nameEn = service.nameEn || '';
    this.icon = service.icon || '';
    this.image = service.image || '';
    this.featured = service.featured || '';
    this.dental = service.dental || '';
    this.description = service.description || '';
    this.descriptionAr = service.descriptionAr || '';
    this.descriptionEn1 = service.descriptionEn1 || '';
    this.descriptionAr1 = service.descriptionAr1 || '';
    this.description2 = service.description2 || '';
    this.descriptionEn2 = service.descriptionEn2 || '';
    this.descriptionAr2 = service.descriptionAr2 || '';
    this.icon_id = service.icon_id || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
