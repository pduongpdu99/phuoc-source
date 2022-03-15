export class History {
    id = "";
    eventName = "";
    atUpdated = "";
    atCreated = "";

    toJson(data) {
        this.id = data.id;
        this.eventName = data.eventname;
        this.atUpdated = data.atupdated;
        this.atCreated = data.atcreated;
    }
}
