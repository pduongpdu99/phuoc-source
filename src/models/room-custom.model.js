export class RoomCustom {
    id = "";
    name = "";
    status = "";
    roomId = "";
    users = [];
    describe = "";
    createdAt = "";
    updatedAt = "";

    toJson(data) {
        this.id = data._id;
        this.name = data.name;
        this.status = data.status;
        this.users = data.users;
        this.describe = data.describe;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;

        return this;
    }
} 