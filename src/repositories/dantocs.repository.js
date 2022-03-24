import FRONTEND from '/config/config.js';

const dantocAPIPath = `${FRONTEND.BACKEND_PATH}`;
export class DantocRepository {
    /**
    * get all API
    * @returns list
    */
    static async getAll() {
        const path = `${dantocAPIPath}/${FRONTEND.MODEL_PATH.DANTOCS}`;
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
        const path = `${dantocAPIPath}/${FRONTEND.MODEL_PATH.DANTOCS}/${id}`;
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
        const path = `${dantocAPIPath}/${FRONTEND.MODEL_PATH.DANTOCS}`;
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
        const path = `${dantocAPIPath}/${FRONTEND.MODEL_PATH.DANTOCS}/${id}`;
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
        const path = `${dantocAPIPath}/${FRONTEND.MODEL_PATH.DANTOCS}`;
        return fetch(path, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(data => data.json());
    }
}

