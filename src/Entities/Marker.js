import { uuid } from "uuidv4";

export class marker {
  constructor(lat, lng) {
    this.id = uuid();
    this.lat = lat;
    this.lng = lng;
  }
  title = "new marker";
  content = `# Tmolus dixerat

  ## Desine Lynceus angustum vidi ipsa
  
  Lorem markdownum hebeti fieri, bella **alas fit** volandi posito unam Rhoetus
  novas oculos. Aeternum est [tenuere](http://coepta.io/), in *exul* modumque
  eundo: volat Dianae in **dominae**.`;
}
