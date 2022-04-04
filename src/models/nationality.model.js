export class Nationality {
    id = "";
    name = "";
    updatedAt = "";
    createdAt = "";

    toJson(data) {
        this.id = data._id;
        this.name = data.name;
        this.updatedAt = data.updatedAt;
        this.createdAt = data.createdAt;
        return this;
    }
}
