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
    atUpdated = "";
    atCreated = "";

    toJson(data) {
        this.id = data.id;
        this.role = data.role;
        this.name = data.name;
        this.phoneNumber = data.phonenumber;
        this.address = data.address;
        this.nationality = data.nationality;
        this.iDCard = data.idcard;
        this.birth = data.birth;
        this.sex = data.sex;
        this.roomId = data.roomid;
        this.atUpdated = data.atupdated;
        this.atCreated = data.atcreated;
    }
}
