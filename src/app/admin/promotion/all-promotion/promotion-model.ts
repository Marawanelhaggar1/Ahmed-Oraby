export class PromotionModel {
  id: number;
  image1: string;
  image2: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;

  constructor(promotion: PromotionModel) {
    this.id = promotion.id || this.getRandomID();
    this.title = promotion.title || '';
    this.titleAr = promotion.titleAr || '';
    this.description = promotion.description || '';
    this.descriptionAr = promotion.descriptionAr || '';
    this.image1 = promotion.image1 || '';
    this.image2 = promotion.image2 || '';
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
