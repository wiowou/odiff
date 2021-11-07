import * as R from 'ramda';

const isUndefined = (x: any) => x === undefined && typeof x == 'undefined';
const isObject = (o: any) => o != null && typeof o === 'object';
const hasKeys = R.pipe(R.keys, R.isEmpty, R.not);
const propVal = R.curry((key: string, x: any) => R.view(R.lensProp(key), x));

const EQUAL = {};
//predicates
const added = (primus: any, _: any): boolean =>
  hasKeys(primus) || isUndefined(primus) || R.isEmpty(primus);

const deleted = (primus: any, sec: any): boolean => {
  if (isObject(primus) && isObject(sec) && !hasKeys(primus) && !hasKeys(sec))
    return false;
  return isObject(primus) && (isObject(sec) || isUndefined(sec));
};

const updated = (primus: any, sec: any): boolean =>
  !isUndefined(primus) && (!isUndefined(sec) || !isObject(sec));

const all = (_: any, __: any) => true;

export const diffWith = R.curry(
  (predicate: (a: any, b: any) => boolean, primus: any, sec: any) => {
    function _diff([p, s]: [any, any]) {
      if (!predicate(p, s) || R.equals(p, s)) return EQUAL;
      if (!isObject(p) || isUndefined(s)) return s;
      const keys = R.union(R.keys(s), R.keys(p));
      if (!keys.length) return s;
      return keys.reduce((acc: object, key: string) => {
        const result = _diff([propVal(key, p), propVal(key, s)]);
        return result === EQUAL ? acc : { ...acc, [key]: result };
      }, {});
    }
    return _diff([primus, sec]);
  }
);

export const addedDiff = diffWith(added);
export const deletedDiff = diffWith(deleted);
export const updatedDiff = diffWith(updated);
export const diff = diffWith(all);
