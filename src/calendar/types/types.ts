export interface User {
  _id: string;
  name: string;
}

export interface IEvent {
  _id?: number;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: User;
}