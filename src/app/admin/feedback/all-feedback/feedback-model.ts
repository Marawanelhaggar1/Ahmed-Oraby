export class FeedbackModel {
  id: number;
  image: string;

  constructor(pics: FeedbackModel) {
    this.id = pics.id || this.getRandomID();

    this.image = pics.image || '';
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
