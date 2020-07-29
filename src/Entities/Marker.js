import { uuid } from "uuidv4";

export class marker {
  constructor(lat, lng) {
    this.id = uuid();
    this.lat = lat;
    this.lng = lng;
    this.title = 'new marker';
  }
}
