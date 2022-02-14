////TYPE Checkers
export function hasOwnProperty<X extends {}, Y extends PropertyKey>
(obj: X, prop: Y): obj is X & Record<Y, any> {
  return obj && obj.hasOwnProperty(prop)
}

export function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Inferred type is T[K]
}

export function getObjectKeys<T extends {}>(obj: T) {
  return Object.keys(obj) as Array<keyof T>
}
