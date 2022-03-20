import { Room } from '/models/index.js';
import { RoomRepository } from '/repositories/index.js';

export class RoomProvider {
    /**
     * get all API
     * @returns list
     */
    static async getAll() {
        return RoomRepository.getAll().then(data => data.map(item => {
            let model = new Room();
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
        return RoomRepository.findById(id).then(item => {
            let model = new Room();
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
        return RoomRepository.create(body);
    }

    /**
     * deleteById API
     * @param {string} id 
     * @returns 
     */
    static async deleteById(id = "") {
        return RoomRepository.deleteById(id);
    }

    /**
     * updateById API
     * @param {body} body 
     * @returns 
     */
    static async updateById(body = {}) {
        return RoomRepository.updateById(body);
    }
}