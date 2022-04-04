import { CONSTANTS } from "/common/utils/constant.js";

// FIXBUG 8: fix day by localtime
const localRefer = {
    en: (currentDate) => {
        let enRefers = CONSTANTS.LOCALE_TEMPLATE.EN;
        let date = currentDate.getDate();
        let stand = date == 1 ? "st" : date == 2 ? "nd" : date == 3 ? "rd" : "th";

        let month = currentDate.getMonth();
        let year = currentDate.getFullYear();

        return `${enRefers.MONTH[month]}, ${date}${stand} ${year} `;
    },
    vi: (currentDate) => {
        // let viRefers = LOCALE_TEMPLATE.VI;

        let date = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        return `Ngày ${date} /${month}/${year} `;
    },
}

/**
 * load date at locale
 * @param {String} locale 
 */
export function loadDateAtLocale(locale) {
    const dateDisplay = localRefer[locale](new Date());
    document.getElementById('today').innerHTML = dateDisplay;
}
