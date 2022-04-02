import FRONTEND from '/common/config/config.js';

const roomAPIPath = `${FRONTEND.BACKEND_PATH}`;
export class RoomRepository {
    /**
     * get all API
     * @returns list
     */
    static async getAll() {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}`;
        return fetch(path, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: null,
        }).then(data => data.json());
    }

    /**
     * find by id API
     * @param {string} id 
     * @returns 
     */
    static async findById(id = "") {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}/${id}`;
        return fetch(path, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: null,
        }).then(data => data.json());
    }

    /**
     * create API
     * @param {object} body 
     * @returns 
     */
    static async create(body = {}) {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}`;
        return fetch(path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(data => data.json());
    }

    /**
     * deleteById API
     * @param {string} id 
     * @returns 
     */
    static async deleteById(id = "") {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}/${id}`;
        return fetch(path, {
            method: "DELETE",
            body: null,
        }).then(data => data.json());
    }

    /**
     * updateById API
     * @param {body} body 
     * @returns 
     */
    static async updateById(body = {}) {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}`;
        return fetch(path, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(data => data.json());
    }

    /**
     * getRoomBy API
     * @param {number} sex 
     * @param {number} buildings 
     * @returns 
     */
    static async getRoomBy(sex, buildings) {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}/roomBy/${sex}/${buildings}`;
        return fetch(path, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: null,
        }).then(data => data.json());
    }
}
