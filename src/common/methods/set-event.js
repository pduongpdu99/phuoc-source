
/**
 * 
 * @param {string} elementIndex 
 * @param {function} method 
 */
export function setEventOnClick(elementIndex, method) {
    document.getElementById(elementIndex).onclick = method;
}

/**
 * 
 * @param {object} elementIndex 
 * @param {function} method 
 */
export function setEventOnClickIntoObject(objectIndex, method) {
    objectIndex.onclick = method;
}

/**
 * 
 * @param {string} elementIndex 
 * @param {function} method 
 */
export function setEventOnClickIntoClassname(elementClassnames, method) {
    let array = Array.from(document.getElementsByClassName(elementClassnames));

    array.forEach((element) => setEventOnClickIntoObject(element, method));
    document.getElementById(elementIndex).onclick = method;
}