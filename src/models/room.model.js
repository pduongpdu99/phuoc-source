export class Room {
    roomId = "";
    name = "";
    status = "";
    atUpdated = "";
    atCreated = "";

    toJson(data) {
        this.roomId = data.roomid;
        this.name = data.name;
        this.status = data.status;
        this.atUpdated = data.atupdated;
        this.atCreated = data.atcreated;
    }
} 