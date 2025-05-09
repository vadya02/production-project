import { User } from "entity/User";

export interface Comment {
  id: number;
  user: User;
  text: string;
}