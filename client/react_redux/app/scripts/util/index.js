export function convertToDate (str) {
    let newDate = new Date(str);
    let yyyy = newDate.getFullYear().toString();
    let mm = (newDate.getMonth()+1).toString(); // getMonth() is zero-based
    let dd  = newDate.getUTCDate().toString();
    let month = mm;
    if (mm.length === 1) {
        month = '0' + mm;
    }
    let day = dd;
    if (dd.length === 1) {
        day = '0' + dd;
    }
    return yyyy + '-' + month + '-' + day;
}

export function getEndpoints (window) {
    let config = {
        SHORT_URL: 'http://gh1.co/',
        BASE_API_URL: 'https://gh1.herokuapp.com'
    };

    if (window && window.ENV === 'dev') {
        config = window 
    }

    return {
        SHORT_URL: config.SHORT_URL,
        BASE_API_URL: config.BASE_API_URL,
        SITES: config.BASE_API_URL + '/sites',
        USERS: config.BASE_API_URL + '/users'
    };
}
