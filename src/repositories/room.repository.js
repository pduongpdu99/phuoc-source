import FRONTEND from '/common/config/config.js';
import {
    CONSTANTS
} from '/common/utils/constant.js';

const roomAPIPath = `${FRONTEND.BACKEND_PATH}`;
const commonRequestOptions = CONSTANTS.REQUEST_OPTIONS;

export class RoomRepository {
    /**
     * get all API
     * @returns list
     */
    static async getAll() {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "GET",
            body: null,
        });

        return fetch(path, options).then(data => (
            data.headers.get('content-type')?.includes('json') ?
                data.json() :
                data.text()));;
    }

    /**
     * find by id API
     * @param {string} id 
     * @returns 
     */
    static async findById(id = "") {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}/${id}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "GET",
            body: null,
        });

        return fetch(path, options).then(data => (
            data.headers.get('content-type')?.includes('json') ?
                data.json() :
                data.text()));;
    }

    /**
     * create API
     * @param {object} body 
     * @returns 
     */
    static async create(body) {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "POST",
            body: JSON.stringify(body),
        });

        return fetch(path, options).then(data => (
            data.headers.get('content-type')?.includes('json') ?
                data.json() :
                data.text()));
    }

    /**
     * deleteById API
     * @param {string} id 
     * @returns 
     */
    static async deleteById(id = "") {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}/${id}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "DELETE",
            body: null,
        });

        return fetch(path, options).then(data => (
            data.headers.get('content-type')?.includes('json') ?
                data.json() :
                data.text()));
    }

    /**
     * update API
     * @param {body} body 
     * @returns 
     */
    static async update(body) {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "PUT",
            body: JSON.stringify(body),
        });

        return fetch(path, options).then(data => data);
    }

    /**
     * getRoomBy API
     * @param {number} sex 
     * @param {number} buildings 
     * @returns 
     */
    static async getRoomBy(buildings, sex) {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}/roomBy/${buildings}/${sex}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "GET",
            body: null,
        });

        return fetch(path, options).then(data => {
            return (
                data.headers.get('content-type')?.includes('json') ?
                    data.json() :
                    data.text());
        });;
    }
}
