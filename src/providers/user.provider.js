import { User } from "/models/index.js";
import { UserRepository } from "/repositories/index.js";

export class UserProvider {
    /**
     * get all API
     * @returns list
     */
    static async getAll() {
        return UserRepository.getAll().then(data => {
            return data.map(item => {
                let model = new User();
                model.toJson(item);
                return model;
            });
        });
    }

    /**
     * find by id API
     * @param {string} id
     * @returns
     */
    static async findById(id = "") {
        return UserRepository.findById(id).then(item => {
            let model = new User();
            model.toJson(item);
            return model;
        });
    }

    /**
     * create API
     * @param {object} body
     * @returns
     */
    static async create(body = {}) {
        return UserRepository.create(body);
    }

    /**
     * deleteById API
     * @param {string} id
     * @returns
     */
    static async deleteById(id = "") {
        return UserRepository.deleteById(id);
    }

    /**
     * update API
     * @param {body} body
     * @returns
     */
    static async update(body = {}) {
        return UserRepository.update(body);
    }

    /**
     * get users by room id
     * @param id
     * @return user list
     */
    static async getUsersByRoomId(id) {
        return UserRepository.getUsersByRoomId(id).then(data => {
            return data.map(item => {
                let model = new User();
                model.toJson(item);
                return model;
            });
        });
    }

    /**
     * get si so
     * @param {string} building
     * @param {string} status
     * @return si so theo gioi tinh
     */
    static async getSiSo(building, status) {
        return UserRepository.getSiSo(building, status);
    }

    /**
     * get room by sex
     * @param {number} sex
     * @return
     */
    static async getRoomsBySex(sex = 0) {
        return UserRepository.getRoomsBySex(sex);
    }

    /**
     * get rooms by name
     * @param {string} name
     * @returns
     */
    static async getRoomsByName(name) {
        return UserRepository.getRoomsByName(name);
    }

    /**
     * get rooms by user number
     * @param {number} type
     * @returns
     */
    static async getRoomsByUserNumber(type) {
        return UserRepository.getRoomsByUserNumber(type);
    }

    /**
     * switch all
     * @param {string} from
     * @param {string} to
     * @returns
     */
    static async switchAll(from, to) {
        return UserRepository.switchAll(from, to);
    }
}
