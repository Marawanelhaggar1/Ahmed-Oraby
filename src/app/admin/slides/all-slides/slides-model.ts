export class SlidesModel {
  id: number;
  title: string;
  titleAr: string;
  sub_titleAr: string;
  sub_title: string;
  descriptionAr: string;
  description: string;
  image: string;
  imageAr: string;

  constructor(center: SlidesModel) {
    {
      this.id = center.id || this.getRandomID();
      this.title = center.title || '';
      this.titleAr = center.titleAr || '';
      this.sub_title = center.sub_title || '';
      this.sub_titleAr = center.sub_titleAr || '';
      this.description = center.description || '';
      this.descriptionAr = center.descriptionAr || '';
      this.imageAr = center.imageAr || '';
      this.image = center.image || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
