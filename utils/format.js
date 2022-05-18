const thaiMonths = {
  short: [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
  ],
  full: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ],
}

export const formatDate = (
  isoStringDate,
  isShortMonth = true,
  isNationalYear = true
) => {
  let dateParse = new Date(isoStringDate)
  let year = isNationalYear
    ? dateParse.getFullYear()
    : dateParse.getFullYear() + 543
  let month =
    thaiMonths[isShortMonth ? 'short' : 'full'][dateParse.getMonth() - 1]
  let date = dateParse.getDate()
  return date + ' ' + month + ' ' + year
}