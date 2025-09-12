export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValueArray
  | JSONValueObject;
type JSONValueArray = JSONValue[];
type JSONValueObject = { [key: string]: JSONValue };

export interface Event {
  id: string;
  localTime: string;
  ip: string;
  data: Record<string, JSONValue>;
  createdAt: string;
}

export interface Action {
  id: string;
  name: string;
  events: Event[];
  createdAt: string;
  updatedAt: string;
}

export interface Source {
  id: string;
  title: string;
  description?: string;
  actions: Omit<Action, 'events'>[];
  createdAt: string;
  updatedAt: string;
}
