export class SettingWebModel {
  id: number;
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  phoneAr: string;
  address: string;
  addressAr: string;
  whatsApp: string;
  whatsAppLink: string;
  youtube: string;
  snapchat: string;
  location: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  logo: string;
  favicon: string;
  footerLogo: string;
  background1: string;
  background2: string;

  constructor(center: SettingWebModel) {
    {
      this.id = center.id || this.getRandomID();
      this.name = center.name || '';
      this.nameAr = center.nameAr || '';
      this.phone = center.phone || '';
      this.phoneAr = center.phoneAr || '';
      this.email = center.email || '';
      this.address = center.address || '';
      this.addressAr = center.addressAr || '';
      this.whatsApp = center.whatsApp || '';
      this.whatsAppLink = center.whatsAppLink || '';
      this.location = center.location || '';
      this.youtube = center.youtube || '';
      this.snapchat = center.snapchat || '';
      this.facebook = center.facebook || '';
      this.linkedin = center.linkedin || '';
      this.instagram = center.instagram || '';
      this.logo = center.logo || '';
      this.favicon = center.favicon || '';
      this.footerLogo = center.footerLogo || '';
      this.background1 = center.background1 || '';
      this.background2 = center.background2 || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
