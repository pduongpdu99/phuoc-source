import FRONTEND from '/common/config/config.js';

const historyAPIPath = `${FRONTEND.BACKEND_PATH}`;
export class HistoryRepository {
    /**
    * get all API
    * @returns list
    */
    static async getAll() {
        const path = `${historyAPIPath}/${FRONTEND.MODEL_PATH.HISTORY}`;
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
        const path = `${historyAPIPath}/${FRONTEND.MODEL_PATH.HISTORY}/${id}`;
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
        const path = `${historyAPIPath}/${FRONTEND.MODEL_PATH.HISTORY}`;
        return fetch(path, {
            method: "POST",
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
        const path = `${historyAPIPath}/${FRONTEND.MODEL_PATH.HISTORY}/${id}`;
        return fetch(path, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: null,
        }).then(data => data.json());
    }

    /**
     * updateById API
     * @param {body} body 
     * @returns 
     */
    static async updateById(body = {}) {
        const path = `${historyAPIPath}/${FRONTEND.MODEL_PATH.HISTORY}`;
        return fetch(path, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(data => data.json());
    }
}
