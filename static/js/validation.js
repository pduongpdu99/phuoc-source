export const isNotEmpty = (str) => {
    return str.length > 0;
}

export const isEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const isNumberPhone = (str) => {
    return String(str)
        .toLowerCase()
        .match(
            /[+84|+856]\d{9}/
        );
}

export const isDate = (str) => {
    return String(str)
        .toLowerCase()
        .match(
            /^\d{4}\-\d{1,2}\-\d{1,2}$/
        );
}