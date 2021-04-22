import { Pet } from "./pet";

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  photoURL: string;
  petName: string;
  constructor() {
    this.id = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.photoURL = "";
    this.petName = "";
  }
}
