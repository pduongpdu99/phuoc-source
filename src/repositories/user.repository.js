import FRONTEND from '/common/config/config.js';

const userAPIPath = `${FRONTEND.BACKEND_PATH}`;

const commonRequestOptions = {
    // mode: 'cors',
    // cache: 'no-cache',
    // credentials: 'same-origin',
    // redirect: 'follow',
    // referrerPolicy: 'no-referrer',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
};

export class UserRepository {
    /**
    * get all API
    * @returns list
    */
    static async getAll() {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}`;
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
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/${id}`;
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
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "POST",
            body: JSON.stringify(body),
        });

        return fetch(path, options).then(data => data.json());
    }

    /**
     * deleteById API
     * @param {string} id
     * @returns
     */
    static async deleteById(id = "") {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/${id}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "DELETE",
            body: null,
        });

        return fetch(path, options).then(data => data.json());
    }

    /**
     * update API
     * @param {body} body
     * @returns
     */
    static async update(body = {}) {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}`;        
        const options = Object.assign({}, commonRequestOptions, {
            method: "PUT",
            body: JSON.stringify(body),
        });

        return fetch(path, options);
    }

    /**
   * get users by room id
   * @param id
   * @return user list
   */
    static async getUsersByRoomId(id = "") {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/byRoom/${id}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "GET",
            body: null,
        });

        return fetch(path, options).then(data => data.json())
    }

    /**
     * get si so
     * @param {string} building
     * @param {string} status
     * @return si so theo gioi tinh
     */
    static async getSiSo(building, status) {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/siso/${building}/${status}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "GET",
            body: null,
        });

        return fetch(path, options).then(data => data.json());
    }

    /**
     * get room by sex
     * @param {number} sex
     */
    static async getRoomsBySex(sex = 0) {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/getRoomsBySex/${sex}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "GET",
            body: null,
        });

        return fetch(path, options).then(data => data.json());
    }

    /**
     * get rooms by name
     * @param {string} name
     * @returns
     */
    static async getRoomsByName(name) {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/getRoomsByName/${name}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "GET",
            body: null,
        });

        return fetch(path, options).then(data => data.json());
    }

    /**
     * get rooms by user number
     * @param {number} type
     * @returns
     */
    static async getRoomsByUserNumber(type) {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/getRoomsByUserNumber/${type}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "GET",
            body: null,
        });

        return fetch(path, options).then(data => data.json())
    }

    /**
     * switch all
     * @param {string} from
     * @param {string} to
     * @returns
     */
    static async switchAll(from, to) {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/switchAll/${from}/${to}`;
        const options = Object.assign({}, commonRequestOptions, {
            method: "GET",
            body: null,
        });

        return fetch(path, options).then(data => data.json())
    }
}
