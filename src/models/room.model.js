export class Room {
    id = "";
    name = "";
    status = "";
    roomId = "";
    createdAt = "";
    updatedAt = "";

    toJson(data) {
        this.id = data._id;
        this.name = data.name;
        this.describe = data.describe;
        this.status = data.status;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        return this;
    }
} 