export class Room {
    id = "";
    name = "";
    status = "";
    atUpdated = "";
    atCreated = "";

    toJson(data) {
        this.id = data._id;
        this.name = data.name;
        this.status = data.status;
        this.atUpdated = data.atupdated;
        this.atCreated = data.atcreated;
    }
} 