const formatConfig = function (dateObj: Date)
{
  return {
    "M+": dateObj.getMonth() + 1,                 // 月份 
    "d+": dateObj.getDate(),                    // 日 
    "h+": dateObj.getHours(),                   // 小时 
    "m+": dateObj.getMinutes(),                 // 分 
    "s+": dateObj.getSeconds(),                 // 秒 
    "q+": Math.floor((dateObj.getMonth() + 3) / 3), // 季度 
    "S": dateObj.getMilliseconds()             // 毫秒 
  }
};

export const format = function (fmt: string, dateNumber: string, locale: string)
{

  const dateTimer = formatUnixTime(dateNumber.toString());
  const dateObj = new Date(dateTimer);
  // 如果是英文
  if (locale === 'en')
  {
    const monthArray = new Array
      ("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    const month = dateObj.getUTCMonth();
    let day = dateObj.getUTCDate().toString();
    if (day.length === 1)
    {
      day = "0" + day;
    }
    let hour = dateObj.getUTCHours().toString();
    if (hour.length === 1)
    {
      hour = '0' + hour;
    }
    let minute = dateObj.getUTCMinutes().toString();
    if (minute.length === 1)
    {
      minute = '0' + minute;
    }
    let second = dateObj.getUTCSeconds().toString();
    if (second.length === 1)
    {
      second = '0' + second;
    }
    return day + " " + monthArray[month] + " " + dateObj.getUTCFullYear() + " " + hour + ":" + minute + ":" + second + " GMT";
  }

  const o = formatConfig(dateObj);
  if (/(y+)/.test(fmt))
  {
    fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (const k in o)
  {
    if (new RegExp("(" + k + ")").test(fmt))
    {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

export const formatUnixTime = (dateNumber: string | number) =>
{
  return dateNumber.toString().length === 10 ? parseInt(dateNumber.toString(), 10) * 1000 : parseInt(dateNumber.toString(), 10);
}
// 计算时间差值
export const computeTime = function (time: number, locale: string)
{
  // const nowTime = new Date().getTime();
  // console.log(nowTime)
  // const dateTimer = formatUnixTime(time.toString());
  // const endTime = new Date(dateTimer).getTime();
  // console.log('-----'+endTime)
  // const leftTime = nowTime - endTime;
  // console.log("*******"+leftTime)
  // let d = 0;
  // let h = 0;
  // let m = 0;
  // let s = 0;
  // if (leftTime >= 0)
  // {
  //   d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
  //   h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
  //   m = Math.floor(leftTime / 1000 / 60 % 60);
  //   s = Math.floor(leftTime / 1000 % 60);
  // } else
  // {
  //   d = 0;
  //   h = 0;
  //   m = 0;
  //   s = 0;
  // }
  // console.log('-0-0----------'+d+h+m+s)
  // return ''+d+h+m+s
  // const date1 = '2015/05/01 00:00:00';  // 开始时间
  const nowTime = new Date().getTime();    // 当前时间
  const dateTimer = formatUnixTime(time.toString());
  const endTime = new Date(dateTimer).getTime(); // 结束时间
  const differ = nowTime - endTime;   // 时间差的毫秒数    

  // 计算出相差天数
  const days = Math.floor(differ / (24 * 3600 * 1000))
  if (days > 0)
  {
    if (locale === 'en'){
      return days + 'days ago'
    }
    return days + '天前'
  }
  // 计算出小时数
  const leave1 = differ % (24 * 3600 * 1000)    // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));
  if (hours > 0)
  {
    if (locale === 'en'){
      return hours + 'hours ago'
    }
    return hours + '小时前'
  }
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000)        // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));
  if (minutes > 0)
  {
    if (locale === 'en'){
      return minutes + 'minutes ago'
    }
    return minutes + '分钟前'
  }
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000)      // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000)
  if (seconds > 0)
  {
    if (locale === 'en'){
      return seconds + 'seconds ago'
    }
    return seconds + '秒前'
  }
  return ''
  // console.log(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒");

  // return " 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
}