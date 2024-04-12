export interface EventResponse {
  ok: boolean,
  event: SingleEventData;
}

export interface EventsResponse {
  ok: boolean;
  events: EventData[];
}

interface SingleEventData {
  id: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: string;
}

export interface EventData {
  id: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: UserEventOwner;
}

interface UserEventOwner {
  _id: string;
  name: string;
}