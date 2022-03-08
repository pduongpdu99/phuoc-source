export class History {
    historyId = "";
    eventName = "";
    atUpdated = "";
    atCreated = "";

    toJson(data) {
        this.historyId = data.historyid;
        this.eventName = data.eventname;
        this.atUpdated = data.atupdated;
        this.atCreated = data.atcreated;
    }
}
