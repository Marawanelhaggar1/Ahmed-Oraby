export class Blogs {
  id: number;
  name: string;
  nameAr: string;
  title: string;
  titleAr: string;
  body: string;
  bodyAr: string;
  isFeatured: string;
  image: string;

  constructor(center: Blogs) {
    {
      this.id = center.id || this.getRandomID();
      this.name = center.name || '';
      this.nameAr = center.nameAr || '';
      this.title = center.title || '';
      this.titleAr = center.titleAr || '';
      this.body = center.body || '';
      this.bodyAr = center.bodyAr || '';
      this.image = center.image || '';
      this.isFeatured = center.isFeatured || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
