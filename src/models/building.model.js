export class Building {
    id = "";
    name = "";
    allowSex = 0;
    atUpdated = "";
    atCreated = "";

    toJson(data) {
        this.id = data._id;
        this.name = data.name;
        this.allowSex = data.allowSex;
        this.atUpdated = data.atupdated;
        this.atCreated = data.atcreated;
    }
}
