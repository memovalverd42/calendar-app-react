export interface User {
  id: string;
  name: string;
}

export interface IEvent {
  id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: User;
}