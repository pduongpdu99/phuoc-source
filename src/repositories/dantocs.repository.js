import FRONTEND from '/config/config.js';

const dantocAPIPath = `${FRONTEND.BACKEND_PATH}`;
class DantocRepository {
    /**
    * get all API
    * @returns list
    */
    static async getAll() {
        const path = `${dantocAPIPath}/${FRONTEND.MODEL_PATH.DANTOC}`;
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
        const path = `${dantocAPIPath}/${FRONTEND.MODEL_PATH.DANTOC}/${id}`;
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
        const path = `${dantocAPIPath}/${FRONTEND.MODEL_PATH.DANTOC}`;
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
        const path = `${dantocAPIPath}/${FRONTEND.MODEL_PATH.DANTOC}/${id}`;
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
        const path = `${dantocAPIPath}/${FRONTEND.MODEL_PATH.DANTOC}`;
        return fetch(path, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(data => data.json());
    }
}

export default DantocRepository;
