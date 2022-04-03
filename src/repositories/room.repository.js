import FRONTEND from '/common/config/config.js';

const roomAPIPath = `${FRONTEND.BACKEND_PATH}`;

const commonRequestOptions = {
    // mode: 'cors',
    // cache: 'no-cache',
    // credentials: 'same-origin',
    // redirect: 'follow',
    // referrerPolicy: 'no-referrer',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
};

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

        return fetch(path, options).then(data => data.json());
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

        return fetch(path, options).then(data => data.json());
    }

    /**
     * create API
     * @param {object} body 
     * @returns 
     */
    static async create(body = {}) {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}`;
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
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}/${id}`;
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
    static async getRoomBy(sex, buildings) {
        const path = `${roomAPIPath}/${FRONTEND.MODEL_PATH.ROOM}/roomBy/${sex}/${buildings}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "GET",
            body: null,
        });

        return fetch(path, options).then(data => data.json());
    }
}
