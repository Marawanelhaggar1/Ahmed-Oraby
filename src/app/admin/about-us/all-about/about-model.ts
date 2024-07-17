export class AboutModel {
  id: number;
  image: string;
  title: string;
  titleAr: string;
  paragraph: string;
  paragraphAr: string;
  mission: string;
  missionAr: string;
  values: string;
  valuesAr: string;
  vision: string;
  visionAr: string;
  videoLink: string;

  constructor(about: AboutModel) {
    this.id = about.id || this.getRandomID();
    this.image = about.image || '';
    this.title = about.title || '';
    this.titleAr = about.titleAr || '';
    this.paragraph = about.paragraph || '';
    this.paragraphAr = about.paragraphAr || '';
    this.mission = about.mission || '';
    this.missionAr = about.missionAr || '';
    this.values = about.values || '';
    this.valuesAr = about.valuesAr || '';
    this.vision = about.vision || '';
    this.visionAr = about.visionAr || '';
    this.videoLink = about.videoLink || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
