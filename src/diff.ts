import * as R from 'ramda';

// const complementary = (lhs, rhs) =>
//   R.pipe(
//     R.keys,
//     R.difference(R.keys(lhs)),
//     R.map((k) => [k, undefined]),
//     Object.fromEntries,
//     R.merge(rhs)
//   )(rhs);

//predicates
const predAdded = ([prime, obj]) => (prime ? [0, 0] : [prime, obj]);
const predRemoved = ([prime, obj]) => (obj ? [0, 0] : [prime, obj]);
const predUpdated = ([prime, obj]) => (!obj || !prime ? [0, 0] : [prime, obj]);
const predDiff = ([prime, obj]) => [prime, obj];

const _diff = (predicate): ((a: [any, any]) => object) => {
  return function _rec([p, o]: [any, any]): object {
    if (R.equals(...predicate([p, o]))) return {};
    if (R.isEmpty(R.keys(p))) return o;
    const keys = R.union(R.keys(o), R.keys(p));
    return keys.reduce((acc, key) => {
      const result = _rec(predicate([p[key], o[key]]));
      if (R.isEmpty(result)) return acc;
      return { ...acc, [key]: result };
    }, {});
  };
};

export const addedDiff = (prime, obj): object => _diff(predAdded)([prime, obj]);
export const removedDiff = (prime, obj): object => _diff(predRemoved)([prime, obj]);
export const updatedDiff = (prime, obj): object => _diff(predUpdated)([prime, obj]);
export const diff = (prime, obj): object => _diff(predDiff)([prime, obj]);
