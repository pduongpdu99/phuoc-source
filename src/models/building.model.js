export class Building {
    id = "";
    name = "";
    allowSex = 0;
    updatedAt = "";
    createdAt = "";

    toJson(data) {
        this.id = data._id;
        this.name = data.name;
        this.allowSex = data.allowSex;
        this.updatedAt = data.updatedAt;
        this.createdAt = data.createdAt;
    }
}
