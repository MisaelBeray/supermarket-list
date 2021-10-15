export default function truncate(num: number, fixed: number ){
    const re = new RegExp("^-?\\d+(?:\.\\d{0," + (fixed || -1) + "})?");
    return num.toString().match(re)[0];
  }