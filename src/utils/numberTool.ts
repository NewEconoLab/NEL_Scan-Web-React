// 将数字转化为 1,234,567等形式
export function toThousands(num: string) {
    let result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
  }

/**
 * 保留小数点后几位
 * @param str 数字
 * @param num 小数点后几位
 */
export function saveDecimal(str:string,decimal:number){
    const value = str.split('.');
    if(value.length>1){
        return value[0]+'.'+value[1].substring(0,decimal)
    }
    else{
        return str
    }
}