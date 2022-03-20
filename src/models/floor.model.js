export class Floor {
    id = "";
    floor = "";
    name = "";
    atUpdated = "";
    atCreated = "";

    toJson(data) {
        this.id = data._id;
        this.floor = data.floor;
        this.name = data.name;
        this.atUpdated = data.atupdated;
        this.atCreated = data.atcreated;
    }
}
