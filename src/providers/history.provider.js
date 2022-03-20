import { History } from "../models/index.js";
import { HistoryRepository } from "../repositories/index.js";

export class HistoryProvider {
    /**
     * get all API
     * @returns list
     */
    static async getAll() {
        return HistoryRepository.getAll().then(data => {
            return data.map(item => {
                let model = new History();
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
        return HistoryRepository.findById(id).then(item => {
            let model = new History();
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
        return HistoryRepository.create(body);
    }

    /**
     * deleteById API
     * @param {string} id 
     * @returns 
     */
    static async deleteById(id = "") {
        return HistoryRepository.deleteById(id);
    }

    /**
     * updateById API
     * @param {body} body 
     * @returns 
     */
    static async updateById(body = {}) {
        return HistoryRepository.updateById(body);
    }
}