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
export const isObject = (o: any) => o != null && typeof o === 'object';
const hasKeys = R.pipe(R.keys, R.isEmpty, R.not);
const propVal = R.curry((key: string, x: any) => R.view(R.lensProp(key), x));
//predicates
export const SKIP = [0, 0];
const added = ([primus, sec]) =>
  hasKeys(primus) || isUndefined(primus) || R.isEmpty(primus)
    ? [primus, sec]
    : SKIP;
const deleted = ([primus, sec]) =>
  hasKeys(sec) || (isUndefined(sec) && isObject(primus)) || R.isEmpty(sec)
    ? [primus, sec]
    : SKIP;
const updated = ([primus, sec]) =>
  R.equals(added([primus, sec]), [primus, sec]) ||
  R.equals(deleted([primus, sec]), [primus, sec])
    ? SKIP
    : [primus, sec];
const all = ([primus, sec]) => [primus, sec];

export const diffWith = R.curry(
  (predicate: (a: [any, any]) => [any, any], primus: any, sec: any) => {
    function _diff([p, s]: [any, any]) {
      if (R.equals(...predicate([p, s]))) return {};
      if ((!hasKeys(p) && !hasKeys(s)) || isUndefined(s)) return s;
      const keys = R.union(R.keys(s), R.keys(p));
      return keys.reduce((acc: object, key: string) => {
        const result = _diff([propVal(key, p), propVal(key, s)]);
        return R.isEmpty(result) && !R.isEmpty(propVal(key, s))
          ? acc
          : { ...acc, [key]: result };
      }, {});
    }
    return _diff([primus, sec]);
  }
);

export const addedDiff = diffWith(added);
export const deletedDiff = diffWith(deleted);
export const updatedDiff = diffWith(updated);
export const diff = diffWith(all);
