import FRONTEND from '/config/config.js';

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
        }).then(data => data.json()).then(data => data);
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
        }).then(data => data.json()).then(data => data);
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
        });
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
        });
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
        });
    }
}