import { parse } from "./index";

test("parse()", () => {
  test.each([
    ['Monday', { weekdays: new Set(['monday']) }],
    ['Wednesday', { weekdays: new Set(['wednesday']) }],
    [' Wednesday ', { weekdays: new Set(['wednesday']) }],
    ['Wednesday and Saturday', { weekdays: new Set(['wednesday', 'saturday']) }],
    ['Wednesday or Saturday', { weekdays: new Set(['wednesday', 'saturday']) }],
    ['Wednesday, Saturday', { weekdays: new Set(['wednesday', 'saturday']) }],
    ['Wednesday and, Saturday', { weekdays: new Set(['wednesday', 'saturday']) }],
    ['Every Wednesday', { repeats: 'weekly', weekdays: new Set(['wednesday']) }],
    [' Every Wednesday ', { repeats: 'weekly', weekdays: new Set(['wednesday']) }],
    ['Every Wednesday or Saturday', { repeats: 'weekly', weekdays: new Set(['wednesday', 'saturday']) }],
    ['Wednesdays', { repeats: 'weekly', weekdays: new Set(['wednesday']) }],
    [' Wednesdays ', { repeats: 'weekly', weekdays: new Set(['wednesday']) }],
    ['Wednesdays and Tuesdays', { repeats: 'weekly', weekdays: new Set(['wednesday', 'tuesday']) }],
    [' Wednesdays and Tuesdays ', { repeats: 'weekly', weekdays: new Set(['wednesday', 'tuesday']) }],
    ['Wednesdays and Tuesdays and Fridays and Wednesdays', { repeats: 'weekly', weekdays: new Set(['wednesday', 'tuesday', 'friday']) }],
    ['Wednesdays at 9', { repeats: 'weekly', weekdays: new Set(['wednesday']), startTime: { hours: 9 } }],
    [' Wednesdays at 9 ', { repeats: 'weekly', weekdays: new Set(['wednesday']), startTime: { hours: 9 } }],
    ['Wednesdays at 9:30', { repeats: 'weekly', weekdays: new Set(['wednesday']), startTime: { hours: 9, minutes: 30 } }],
    ['Wednesdays at 9:59', { repeats: 'weekly', weekdays: new Set(['wednesday']), startTime: { hours: 9, minutes: 59 } }],
    ['Wednesdays at 9:30am', { repeats: 'weekly', weekdays: new Set(['wednesday']), startTime: { hours: 9, minutes: 30 } }],
    ['Wednesdays at 9:30pm', { repeats: 'weekly', weekdays: new Set(['wednesday']), startTime: { hours: 21, minutes: 30 } }],
    ['Mondays at 11:30', { repeats: 'weekly', weekdays: new Set(['monday']), startTime: { hours: 11, minutes: 30 } }],
    ['Mondays at 9:30 to 10:30', { repeats: 'weekly', weekdays: new Set(['monday']), startTime: { hours: 9, minutes: 30 }, endTime: { hours: 10, minutes: 30 } }],
    ['Mondays and Thursdays at 9:30 to 10:30', { repeats: 'weekly', weekdays: new Set(['monday', 'thursday']), startTime: { hours: 9, minutes: 30 }, endTime: { hours: 10, minutes: 30 } }],
    ['Mondays at 9:30pm to 10:30pm', { repeats: 'weekly', weekdays: new Set(['monday']), startTime: { hours: 21, minutes: 30 }, endTime: { hours: 22, minutes: 30 } }],
  ])('%o', (input: string, output) => {
    expect(parse(input)).toEqual(output);
  });
})