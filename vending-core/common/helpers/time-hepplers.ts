import moment from 'moment';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = MINUTE * 60;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 12 * MONTH;

export const TIME_VALUE = {
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  MONTH,
  YEAR,
};

export class TimeHelper {
  static timeValue(): any {
    return TIME_VALUE;
  }

  static getToDay(): string {
    return moment().format('YYYY-MM-DD');
  }

  static getTimes(time: string | Date): number {
    return moment(time, 'YYYY-MM-DD h:mm:ss').valueOf();
  }

  static formatHours(time: any): string {
    return moment(time).format('LT');
  }

  static formatHHMM(time: any): string {
    return moment(time).format('HH:mm');
  }

  static formatYMD(time: any): string {
    return moment(time).format('YYYY-MM-DD');
  }

  static formatDMY(time: any, type?: string): string {
    return moment(time, type || undefined).format('DD/MM/YYYY');
  }

  static formatHMDMY(time: any): string {
    return moment(time).format('HH:mm DD/MM/YYYY');
  }

  static formatHMSDMY(time: any): string {
    return moment(time).format('HH:mm:ss DD/MM/YYYY');
  }

  static formatToDate(date: any): Date {
    date = moment(date, 'DD/MM/YYYY').valueOf();
    return moment(date).toDate();
  }

  // static formatListChatTime(time: any): string {
  //   if (
  //     moment(time).date() === moment().date() &&
  //     moment(time).month() === moment().month() &&
  //     moment(time).year() === moment().year()
  //   ) {
  //     return moment(time).format('HH:mm');
  //   } else if (moment(time).week() === moment().week()) {
  //     switch (moment(time).day()) {
  //       case 0:
  //         return ' Chủ nhật';
  //         break;
  //       case 1:
  //         return ' Thứ 2';
  //         break;
  //       case 2:
  //         return ' Thứ 3';
  //         break;
  //       case 3:
  //         return ' Thứ 4';
  //         break;
  //       case 4:
  //         return ' Thứ 5';
  //         break;
  //       case 5:
  //         return ' Thứ 6';
  //         break;
  //       case 6:
  //         return ' Thứ 7';
  //         break;
  //     }
  //   } else {
  //     return moment(time).format('DD/MM');
  //   }
  // }

  static formatTimeWithDayOfWeek(time: any): string {
    var dayOfWeek;
    switch (moment(time).day()) {
      case 0:
        dayOfWeek = 'Chủ nhật';
        break;
      case 1:
        dayOfWeek = 'Thứ hai';
        break;
      case 2:
        dayOfWeek = 'Thứ ba';
        break;
      case 3:
        dayOfWeek = 'Thứ tư';
        break;
      case 4:
        dayOfWeek = 'Thứ năm';
        break;
      case 5:
        dayOfWeek = 'Thứ sáu';
        break;
      case 6:
        dayOfWeek = 'Thứ bảy';
        break;
    }

    if (
      moment(time).date() === moment().date() &&
      moment(time).month() === moment().month() &&
      moment(time).year() === moment().year()
    ) {
      return moment(time).format('HH:mm A');
    } else {
      return moment(time).format('HH:mm A') + ' ' + dayOfWeek;
    }
  }
}
