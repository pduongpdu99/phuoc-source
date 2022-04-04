const loadingType = "spinner";

/**
 * call the loading
 * @param {object} jqueryObject 
 */
export function loadingCall(jqueryObject) {
    jqueryObject.loadingModal({ text: 'Loading...' });
    jqueryObject.loadingModal('animation', loadingType);
}

/**
 * destroy the loading
 * @param {object} jqueryObject 
 */
export function loadingDestroy(jqueryObject) {
    jqueryObject.loadingModal("destroy");
}