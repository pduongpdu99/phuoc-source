import FRONTEND from '/common/config/config.js';
import {
    CONSTANTS
} from '/common/utils/constant.js';

const nationalityAPIPath = `${FRONTEND.BACKEND_PATH}`;
const commonRequestOptions = CONSTANTS.REQUEST_OPTIONS;


export class NationalityRepository {
    /**
    * get all API
    * @returns list
    */
    static async getAll() {
        const path = `${nationalityAPIPath}/${FRONTEND.MODEL_PATH.NATIONALITY}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "GET",
            body: null,
        });

        return fetch(path, options).then(data => data.json());
    }

    /**
     * find by id API
     * @param {string} id 
     * @returns 
     */
    static async findById(id = "") {
        const path = `${nationalityAPIPath}/${FRONTEND.MODEL_PATH.NATIONALITY}/${id}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "GET",
            body: null,
        });

        return fetch(path, options).then(data => data.json());
    }

    /**
     * create API
     * @param {object} body 
     * @returns 
     */
    static async create(body = {}) {
        const path = `${nationalityAPIPath}/${FRONTEND.MODEL_PATH.NATIONALITY}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "POST",
            body: JSON.stringify(body),
        });

        return fetch(path, options).then(data => data.json())
    }

    /**
     * deleteById API
     * @param {string} id 
     * @returns 
     */
    static async deleteById(id = "") {
        const path = `${nationalityAPIPath}/${FRONTEND.MODEL_PATH.NATIONALITY}/${id}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "DELETE",
            body: null,
        });

        return fetch(path, options).then(data => data.json())
    }

    /**
     * update API
     * @param {body} body 
     * @returns 
     */
    static async update(body = {}) {
        const path = `${nationalityAPIPath}/${FRONTEND.MODEL_PATH.NATIONALITY}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "PUT",
            body: JSON.stringify(body),
        });

        return fetch(path, options).then(data => data);
    }
}
