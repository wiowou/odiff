import * as R from 'ramda';

// const complementary = (lhs, rhs) =>
//   R.pipe(
//     R.keys,
//     R.difference(R.keys(lhs)),
//     R.map((k) => [k, undefined]),
//     Object.fromEntries,
//     R.merge(rhs)
//   )(rhs);
const isUndefined = (x: any) => x === undefined && typeof x == 'undefined';
const hasKeys = R.pipe(R.keys, R.isEmpty, R.not);
const getKey = R.curry((key: string, x: any) => R.view(R.lensProp(key), x));
//predicates
export const SKIP = [0, 0];
const addedOnly = ([primus, sec]) => (primus ? SKIP : [primus, sec]);
const removedOnly = ([primus, sec]) => (sec ? SKIP : [primus, sec]);
const updatedOnly = ([primus, sec]) => (!sec || !primus ? SKIP : [primus, sec]);
const all = ([primus, sec]) => [primus, sec];

export const diffWith = R.curry(
  (predicate: (a: [any, any]) => [any, any], primus: any, sec: any) => {
    function _diff([p, s]: [any, any]) {
      if (R.equals(...predicate([p, s]))) return {};
      if ((!hasKeys(p) && !hasKeys(s)) || isUndefined(s)) return s;
      const keys = R.union(R.keys(s), R.keys(p));
      return keys.reduce((acc: object, key: string) => {
        const result = _diff([getKey(key, p), getKey(key, s)]);
        return R.isEmpty(result) ? acc : { ...acc, [key]: result };
      }, {});
    }
    return _diff([primus, sec]);
  }
);

export const addedDiff = diffWith(addedOnly);
export const removedDiff = diffWith(removedOnly);
export const updatedDiff = diffWith(updatedOnly);
export const diff = diffWith(all);
