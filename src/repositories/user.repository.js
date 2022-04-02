import FRONTEND from '/common/config/config.js';

const userAPIPath = `${FRONTEND.BACKEND_PATH}`;
export class UserRepository {
    /**
    * get all API
    * @returns list
    */
    static async getAll() {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}`;
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
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/${id}`;
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
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}`;
        return fetch(path, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(data => data.json())
    }

    /**
     * deleteById API
     * @param {string} id
     * @returns
     */
    static async deleteById(id = "") {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/${id}`;
        return fetch(path, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: null,
        }).then(data => data.json())
    }

    /**
     * updateById API
     * @param {body} body
     * @returns
     */
    static async updateById(body = {}) {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}`;
        return fetch(path, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(data => data.json())
    }

    /**
   * get users by room id
   * @param id
   * @return user list
   */
    static async getUsersByRoomId(id = "") {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/byRoom/${id}`;
        return fetch(path, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: null,
        }).then(data => data.json())
    }

    /**
     * get si so
     * @param {string} building
     * @param {string} status
     * @return si so theo gioi tinh
     */
    static async getSiSo(building, status) {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/siso/${building}/${status}`;
        return fetch(path, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: null,
        }).then(data => data.json())
    }

    /**
     * get room by sex
     * @param {number} sex
     */
    static async getRoomsBySex(sex = 0) {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/getRoomsBySex/${sex}`;
        return fetch(path, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: null,
        }).then(data => data.json())
    }

    /**
     * get rooms by name
     * @param {string} name
     * @returns
     */
    static async getRoomsByName(name) {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/getRoomsByName/${name}`;
        return fetch(path, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: null,
        }).then(data => data.json())
    }

    /**
     * get rooms by user number
     * @param {number} type
     * @returns
     */
    static async getRoomsByUserNumber(type) {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/getRoomsByUserNumber/${type}`;
        return fetch(path, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: null,
        }).then(data => data.json())
    }

    /**
     * switch all
     * @param {string} from
     * @param {string} to
     * @returns
     */
    static async switchAll(from, to) {
        const path = `${userAPIPath}/${FRONTEND.MODEL_PATH.USER}/switchAll/${from}/${to}`;
        return fetch(path, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: null,
        }).then(data => data.json())
    }
}
