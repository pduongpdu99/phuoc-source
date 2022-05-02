import { Nationality } from "/models/index.js";
import { NationalityRepository } from "/repositories/index.js";

export class NationalityProvider {
    /**
     * get all API
     * @returns list
     */
    static async getAll() {
        return NationalityRepository.getAll().then(data => {
            return data.map(item => {
                let model = new Nationality();
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
        return NationalityRepository.findById(id).then(item => {
            let model = new Nationality();
            model.toJson(item);
            return model;
        });
    }

    /**
     * create API
     * @param {object} body 
     * @returns 
     */
    static async create(body) {
        return NationalityRepository.create(body);
    }

    /**
     * deleteById API
     * @param {string} id 
     * @returns 
     */
    static async deleteById(id = "") {
        return NationalityRepository.deleteById(id);
    }

    /**
     * update API
     * @param {body} body 
     * @returns 
     */
    static async update(body) {
        return NationalityRepository.update(body);
    }
}