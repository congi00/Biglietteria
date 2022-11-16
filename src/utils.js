export const minutesFormat = (minutes) => {
    if (minutes < 9) return minutes + "0";
    else return minutes;
};

export const getDateFormat = (date) => {
    return date.getDate() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear()
}

export const getTimeFormat = (date) => {
    return date.getHours() + ":" + minutesFormat(date.getMinutes())
}

export const getStartArriveH = (dateS,dateA) => {
    return dateS.getHours()+":"+minutesFormat(dateS.getMinutes()) + " - " + dateA.getHours()+":"+minutesFormat(dateA.getMinutes())
}

export const getPriceFormat = (price) => {
    return (parseFloat(price) / 100).toFixed(2).replace(".", ",")
}
