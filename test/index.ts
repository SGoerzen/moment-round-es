import * as moment from "moment";
import "../src/index.ts"
import {RoundKey} from "../src";

describe('Moment Extension (moment-round)', () => {
  const assert = (date: string, format: string, r: (m: moment.Moment) => moment.Moment, expected: string) => {
    expect(r(moment(date, format)).format(format)).toBe(expected);
  };

  describe('#round()', function() {
    const assertSynonym = (date: string, precision: number, format: string, expected: string, synonyms: RoundKey[]) => {
      synonyms.forEach(key => assert(date, format, r => r.round(precision, key), expected));
    };

    test("should return a moment rounded to given millisecond", () => {
      const syns: RoundKey[] = ['milliseconds', 'mm', 'Milliseconds'];
      assertSynonym('2015-05-05 15:37:23.123', 100, 'YYYY-MM-DD HH:mm:ss.SSS', '2015-05-05 15:37:23.100', syns);
      assertSynonym('2015-05-05 15:37:23.173', 100, 'YYYY-MM-DD HH:mm:ss.SSS', '2015-05-05 15:37:23.200', syns);
    });

    test("should return a moment rounded to given second", () => {
      const syns: RoundKey[] = ['seconds', 's', 'Seconds'];
      assertSynonym('2015-05-05 15:37:23', 5, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:37:25', syns);
      assertSynonym('2015-05-05 15:37:08', 18, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:37:00', syns);
    });

    test("should return a moment rounded to given minute", () => {
      const syns: RoundKey[] = ['minutes', 'm', 'Minutes'];
      assertSynonym('2015-05-05 15:37:23', 5, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:35:00', syns);
      assertSynonym('2015-05-05 15:37:23', 18, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:36:00', syns);
    });

    test("should return a moment rounded to given hour", () => {
      const syns: RoundKey[] = ['hours', 'h', 'Hours', 'H'];
      assertSynonym('2015-05-05 15:37:23', 5, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:00:00', syns);
      assertSynonym('2015-05-05 15:37:23', 8, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 16:00:00', syns);
    });
  });

  describe('#ceil()', function() {
    const assertSynonym = (date: string, precision: number, format: string, expected: string, synonyms: RoundKey[]) => {
      synonyms.forEach(key => assert(date, format, r => r.ceil(precision, key), expected));
    };

    test("should return a moment rounded up to given millisecond", () => {
      const syns: RoundKey[] = ['milliseconds', 'mm', 'Milliseconds'];
      assertSynonym('2015-05-05 15:37:23.123', 100, 'YYYY-MM-DD HH:mm:ss.SSS', '2015-05-05 15:37:23.200', syns);
    });

    test("should return a moment rounded up to given second", () => {
      const syns: RoundKey[] = ['seconds', 's', 'Seconds'];
      assertSynonym('2015-05-05 15:37:23', 5, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:37:25', syns);
      assertSynonym('2015-05-05 15:37:08', 18, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:37:18', syns);
    });

    test("should return a moment rounded up to given minute", () => {
      const syns: RoundKey[] = ['minutes', 'm', 'Minutes'];
      assertSynonym('2015-05-05 15:37:23', 5, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:40:00', syns);
      assertSynonym('2015-05-05 15:37:23', 18, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:54:00', syns);
    });

    test("should return a moment rounded up to given hour", () => {
      const syns: RoundKey[] = ['hours', 'h', 'Hours', 'H'];
      assertSynonym('2015-05-05 15:37:23', 5, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 20:00:00', syns);
    });
  });

  describe('#floor()', function() {
    const assertSynonym = (date: string, precision: number, format: string, expected: string, synonyms: RoundKey[]) => {
      synonyms.forEach(key => assert(date, format, r => r.floor(precision, key), expected));
    };

    test("should return a moment rounded down to given millisecond", () => {
      const syns: RoundKey[] = ['milliseconds', 'mm', 'Milliseconds'];
      assertSynonym('2015-05-05 15:37:23.123', 100, 'YYYY-MM-DD HH:mm:ss.SSS', '2015-05-05 15:37:23.100', syns);
    });

    test("should return a moment rounded down to given second", () => {
      const syns: RoundKey[] = ['seconds', 's', 'Seconds'];
      assertSynonym('2015-05-05 15:37:23', 5, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:37:20', syns);
      assertSynonym('2015-05-05 15:37:08', 18, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:37:00', syns);
    });

    test("should return a moment rounded down to given minute", () => {
      const syns: RoundKey[] = ['minutes', 'm', 'Minutes'];
      assertSynonym('2015-05-05 15:37:23', 5, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:35:00', syns);
      assertSynonym('2015-05-05 15:37:23', 18, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:36:00', syns);
    });

    test("should return a moment rounded down to given hour", () => {
      const syns: RoundKey[] = ['hours', 'h', 'Hours', 'H'];
      assertSynonym('2015-05-05 15:37:23', 5, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 15:00:00', syns);
      assertSynonym('2015-05-05 15:37:23', 8, 'YYYY-MM-DD HH:mm:ss', '2015-05-05 08:00:00', syns);
    });
  });

});
