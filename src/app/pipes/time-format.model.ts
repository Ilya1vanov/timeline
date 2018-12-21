import { TimeConstants } from '../constants/time.constants';
import * as _ from 'lodash';

export class TimeFormatModel {

  static readonly getMilliseconds = (formattedTime: string): number => {
    return _.chain(formattedTime)
      .split(TimeConstants.DEFAULT_TIME_FORMAT_SEPARATOR)
      .reverse()
      .map(Number)
      .reduce(TimeFormatModel.getTimeUnitCount, 0)
      .value() * TimeConstants.MILLISECOND_IN_SECOND;
  };

  private static getTimeUnitCount = (result: number,
                                     currentTimeUnit: number,
                                     index: number): number => {
    const SUBUNITS_IN_UNIT = 60;
    return result + currentTimeUnit * (SUBUNITS_IN_UNIT ** index);
  };

  private static timeToString(time: number[]): string {
    return time
      .map(TimeConstants.forceTwoDigitsFormat)
      .join(TimeConstants.DEFAULT_TIME_FORMAT_SEPARATOR);
  }

  private _hours: number;
  private _minutes: number;
  private _seconds: number;

  constructor(readonly milliseconds: number) {
    this.splitTime();
  }

  getFormat(): string {
    return TimeFormatModel.timeToString(
      this._hours ? this.fullFormat : this.shortFormat,
    );
  }

  getFormatFull(): string {
    return TimeFormatModel.timeToString(this.fullFormat);
  }

  private get fullFormat(): number[] {
    return [this._hours, this._minutes, this._seconds];
  }

  private get shortFormat(): number[] {
    return [this._minutes, this._seconds];
  }

  private splitTime(): void {
    const totalSeconds = Math.floor(this.milliseconds / TimeConstants.MILLISECOND_IN_SECOND);
    const minutes = Math.floor(totalSeconds / TimeConstants.SECOND_IN_MINUTE);

    this._seconds = totalSeconds % TimeConstants.SECOND_IN_MINUTE;
    this._minutes = minutes % TimeConstants.MINUTES_IN_HOUR;
    this._hours = Math.floor(minutes / TimeConstants.MINUTES_IN_HOUR);
  }
}
