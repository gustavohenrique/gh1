export function convertDate (date) {
    let newDate = new Date(date);
    let yyyy = newDate.getFullYear().toString();
    let mm = (newDate.getMonth()+1).toString(); // getMonth() is zero-based
    let dd  = newDate.getUTCDate().toString();
    let month = mm;
    if (mm.length === 1) {
        month = '0' + mm
    }
    let day = dd
    if (dd.length === 1) {
        day = '0' + dd
    }
    return yyyy + '-' + month + '-' + day
}