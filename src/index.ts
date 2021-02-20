import { has, optional, parse as parseWith, ParseGenerator, ParseYieldable } from 'parcook';

const whitespaceOptional = /^\s*/;

function* ParseInt() {
  const [stringValue]: [string] = yield /^\d+/;
  return parseInt(stringValue, 10);
}

const weekdayChoices = Object.freeze(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const);
type Weekday = (typeof weekdayChoices)[0 | 1 | 2 | 3 | 4 | 5 | 6];

function* WeekdayParser() {
  let repeats: boolean = yield has(/^every\b/);
  yield optional(/^next\b/);
  
  yield whitespaceOptional;
  
  const weekday: Weekday = yield weekdayChoices;
  repeats = repeats || (yield has(/^[s]\b/));
  
  return { weekday, repeats };
}

function* AnotherWeekdayParser() {
  yield whitespaceOptional;
  yield optional('and', 'or');
  yield whitespaceOptional;
  return yield WeekdayParser;
}

function* WeekdaysParser() {
  let repeats = false;
  
  const weekdays = new Set<Weekday>();
  
  let result: { weekday: Weekday, repeats: boolean };
  result = yield WeekdayParser;
  
  weekdays.add(result.weekday);
  repeats = repeats || result.repeats;
  
  while (result = yield optional(AnotherWeekdayParser)) {
    weekdays.add(result.weekday);
    repeats = repeats || result.repeats;
  }
  
  return { weekdays, repeats };
}

function* MinutesSuffixParser() {
  yield ':';
  const minutes = yield ParseInt;
  return minutes;
}

function* TimeOfDayParser() {
  let hours = yield ParseInt;
  const minutes = yield optional(MinutesSuffixParser);
  const amOrPm = yield optional('am', 'pm');
  if (amOrPm === 'pm' && hours <= 11) {
    hours += 12;
  }
  return { hours, minutes };
}

function* TimespanSuffixParser() {
  const started = yield optional('to', '-', '–', '—', 'until');
  if (started === undefined) return undefined;
  yield whitespaceOptional;
  return yield TimeOfDayParser;
}

function* TimespanParser() {
  yield ['from', 'at', ''];
  yield whitespaceOptional;
  const startTime = yield TimeOfDayParser;
  yield whitespaceOptional;
  const endTime = yield optional(TimespanSuffixParser);
  return { startTime, endTime };
}

export interface Result {
  weekdays: Set<Weekday>;
  repeats: undefined | 'weekly';
  startTime: { hours: number, minutes?: number };
  endTime: { hours: number, minutes?: number };
}

function* NaturalDateParser(): ParseGenerator<Result> {
  yield whitespaceOptional;
  const { weekdays, repeats } = yield WeekdaysParser;
  yield whitespaceOptional;
  
  yield whitespaceOptional;
  const timespan = yield optional(TimespanParser);    
  yield whitespaceOptional;

  return { repeats: repeats ? 'weekly' : undefined, weekdays, ...(timespan as any) };
}

export function parse(input: string): Result | null {
  input = input.toLowerCase();
  input = input.replace(/[,]/g, '');
  const parsedResult = parseWith(input, NaturalDateParser());
  return parsedResult.success ? parsedResult.result : null;
}
