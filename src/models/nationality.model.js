export class Nationality {
    id = "";
    name = "";
    atUpdated = "";
    atCreated = "";

    toJson(data) {
        this.id = data._id;
        this.name = data.name;
        this.atUpdated = data.atupdated;
        this.atCreated = data.atcreated;
    }
}
