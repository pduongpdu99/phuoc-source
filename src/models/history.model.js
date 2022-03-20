export class History {
    id = "";
    eventName = "";
    atUpdated = "";
    atCreated = "";

    toJson(data) {
        this.id = data._id;
        this.eventName = data.eventname;
        this.atUpdated = data.atupdated;
        this.atCreated = data.atcreated;
    }
}
