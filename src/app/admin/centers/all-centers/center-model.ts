export class CenterModel {
  id: number;
  name: string;
  nameAr: string;
  addressAr: string;
  address: string;
  descriptionAr: string;
  description1: string;
  description1Ar: string;
  description: string;
  description2: string;
  description2Ar: string;
  phone: string;
  whatsApp: string;
  image: string;
  scan: string;
  lab: string;
  view: string;
  areas!: { id: string; name: string }[];

  constructor(center: CenterModel) {
    {
      this.id = center.id || this.getRandomID();
      this.image = center.image || 'assets/images/user/user1.jpg';
      this.name = center.name || '';
      this.nameAr = center.nameAr || '';
      this.description1 = center.description1 || '';
      this.description1Ar = center.description1Ar || '';
      this.description = center.description || '';
      this.descriptionAr = center.descriptionAr || '';
      this.address = center.address || '';
      this.addressAr = center.addressAr || '';
      this.lab = center.lab || '';
      this.view = center.view || '';
      this.scan = center.scan || '';
      this.whatsApp = center.whatsApp || '';
      this.phone = center.phone || '';
      this.description2 = center.description2 || '';
      this.description2Ar = center.description2Ar || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
