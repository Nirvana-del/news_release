// 格式化日对象
export const getNowDate = () => {
    const date = new Date();
    const sign2 = ":";
    const year = date.getFullYear() // 年
    let month = date.getMonth() + 1; // 月
    let day = date.getDate(); // 日
    let hour = date.getHours(); // 时
    let minutes = date.getMinutes(); // 分
    let seconds = date.getSeconds() //秒
    let currMonth
    let currDay
    let currHour
    let currMinutes
    let currSeconds
    // const weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    // const week = weekArr[date.getDay()];
    // 给一位数的数据前面加 “0”
    if (month >= 1 && month <= 9) {
        currMonth = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        currDay = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
        currHour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
        currMinutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        currSeconds = "0" + seconds;
    }
    return year + "-" + currMonth + "-" + currDay + " " + currHour + sign2 + currMinutes + sign2 + currSeconds;
}
