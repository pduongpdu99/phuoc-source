import { Building } from "/models/index.js";
import { BuildingRepository } from "/repositories/index.js";

export class BuildingProvider {
    /**
     * get all API
     * @returns list
     */
    static async getAll() {
        return BuildingRepository.getAll().then(data => data.map(item => {
            let model = new Building();
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
        return BuildingRepository.findById(id).then(item => {
            let model = new Building();
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
        return BuildingRepository.create(body);
    }

    /**
     * deleteById API
     * @param {string} id 
     * @returns 
     */
    static async deleteById(id = "") {
        return BuildingRepository.deleteById(id);
    }

    /**
     * update API
     * @param {body} body 
     * @returns 
     */
    static async update(body = {}) {
        return BuildingRepository.update(body);
    }
}
