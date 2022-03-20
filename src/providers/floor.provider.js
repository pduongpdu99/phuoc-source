import { Floor } from "/models/index.js";
import { FloorRepository } from "/repositories/index.js";

class FloorProvider {
    /**
     * get all API
     * @returns list
     */
    static async getAll() {
        return FloorRepository.getAll().then(data => {
            return data.map(item => {
                let model = new Floor();
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
        return FloorRepository.findById(id).then(item => {
            let model = new Floor();
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
        return FloorRepository.create(body);
    }

    /**
     * deleteById API
     * @param {string} id 
     * @returns 
     */
    static async deleteById(id = "") {
        return FloorRepository.deleteById(id);
    }

    /**
     * updateById API
     * @param {body} body 
     * @returns 
     */
    static async updateById(body = {}) {
        return FloorRepository.updateById(body);
    }
}

export default FloorProvider;
