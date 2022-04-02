import FRONTEND from '/common/config/config.js';

const nationalityAPIPath = `${FRONTEND.BACKEND_PATH}`;
export class NationalityRepository {
    /**
    * get all API
    * @returns list
    */
    static async getAll() {
        const path = `${nationalityAPIPath}/${FRONTEND.MODEL_PATH.NATIONALITY}`;
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
        const path = `${nationalityAPIPath}/${FRONTEND.MODEL_PATH.NATIONALITY}/${id}`;
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
        const path = `${nationalityAPIPath}/${FRONTEND.MODEL_PATH.NATIONALITY}`;
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
        const path = `${nationalityAPIPath}/${FRONTEND.MODEL_PATH.NATIONALITY}/${id}`;
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
        const path = `${nationalityAPIPath}/${FRONTEND.MODEL_PATH.NATIONALITY}`;
        return fetch(path, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(data => data.json());
    }
}
