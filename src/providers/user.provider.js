import { User } from "../models/index.js";
import { UserRepository } from "/repositories/index.js";

class UserProvider {
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
     * updateById API
     * @param {body} body 
     * @returns 
     */
    static async updateById(body = {}) {
        return UserRepository.updateById(body);
    }
}

export default UserProvider;