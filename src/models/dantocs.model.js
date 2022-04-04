export class Dantoc {
    id = "";
    name = "";
    nationality = "";
    updatedAt = "";
    createdAt = "";

    toJson(data) {
        this.id = data._id;
        this.name = data.name;
        this.nationality = data.nationality;
        this.updatedAt = data.updatedAt;
        this.createdAt = data.createdAt;
        return this;
    }
}
