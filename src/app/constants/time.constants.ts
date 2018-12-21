export class TimeConstants {
  static readonly MILLISECOND_IN_SECOND = 1000;
  static readonly SECOND_IN_MINUTE = 60;
  static readonly MINUTES_IN_HOUR = 60;
  static readonly HOURS_IN_DAY = 24;

  static readonly HOUR_MILLISECONDS =
    TimeConstants.MINUTES_IN_HOUR *
    TimeConstants.SECOND_IN_MINUTE *
    TimeConstants.MILLISECOND_IN_SECOND;

  static readonly DAY_MILLISECONDS = TimeConstants.HOURS_IN_DAY * TimeConstants.HOUR_MILLISECONDS;

  static readonly DEFAULT_DATE_FORMAT_SEPARATOR = '-';
  static readonly DEFAULT_TIME_FORMAT_SEPARATOR = ':';

  static forceTwoDigitsFormat = (value: number): string => {
    const TWO_DIGITS_FORMAT_STRING_LENGTH = 2;
    return (value.toString().length < TWO_DIGITS_FORMAT_STRING_LENGTH) ? `0${value}` : `${value}`;
  };
}
