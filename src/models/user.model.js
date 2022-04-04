export class User {
    id = "";
    role = 0;
    name = "";
    phoneNumber = "";
    address = "";
    nationality = "";
    iDCard = "";
    birth = "";
    sex = 0;
    roomId = "";
    avatar = "";
    updatedAt = "";
    createdAt = "";

    toJson(data) {
        this.id = data._id;
        this.role = data.role;
        this.name = data.name;
        this.phoneNumber = data.phoneNumber;
        this.address = data.address;
        this.nationality = data.nationality;
        this.iDCard = data.iDCard;
        this.birth = data.birth;
        this.sex = data.sex;
        this.email = data.email;
        this.avatar = data.avatar;
        this.roomId = data.roomId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        return this;
    }
}
