function upd() { 
    let msec = new Date().getTime();
    let sec = msec / 1000;
    let minute = sec / 60;
    let hour = minute / 60;
    let day = hour / 24;
    let month = day / 30;
    let year = day / 365.25;

    return [year, month, day, hour, minute, sec, msec]; 
}
