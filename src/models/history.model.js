export class History {
    id = "";
    eventName = "";
    updatedAt = "";
    createdAt = "";

    toJson(data) {
        this.id = data._id;
        this.eventName = data.eventname;
        this.updatedAt = data.updatedAt;
        this.createdAt = data.createdAt;
        return this;
    }
}
