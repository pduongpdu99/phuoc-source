import { Dantoc } from "/models/index.js";
import { DantocRepository } from "/repositories/index.js";

export class DantocProvider {
    /**
     * get all API
     * @returns list
     */
    static async getAll() {
        return DantocRepository.getAll().then(data => data.map(item => {
            let model = new Dantoc();
            model.toJson(item);
            return model;
        }));
    }

    /**
     * find by id API
     * @param {string} id 
     * @returns 
     */
    static async findById(id = "") {
        return DantocRepository.findById(id).then(item => {
            let model = new Dantoc();
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
        return DantocRepository.create(body);
    }

    /**
     * deleteById API
     * @param {string} id 
     * @returns 
     */
    static async deleteById(id = "") {
        return DantocRepository.deleteById(id);
    }

    /**
     * updateById API
     * @param {body} body 
     * @returns 
     */
    static async updateById(body = {}) {
        return DantocRepository.updateById(body);
    }
}
