export interface Recipe {
  _id: string;
  name: string;
  desc: string;
  img: string;
  date: Date;
  ingredients: string;
  tips: string;
  cuisine?: string;
  prepareTime?: Number;
  author?: string;
}
