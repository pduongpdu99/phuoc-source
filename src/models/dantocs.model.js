export class Dantoc {
    id = "";
    name = "";
    nationality = "";
    atUpdated = "";
    atCreated = "";

    toJson(data) {
        this.id = data._id;
        this.name = data.name;
        this.nationality = data.nationality;
        this.atUpdated = data.atupdated;
        this.atCreated = data.atcreated;
    }
}
