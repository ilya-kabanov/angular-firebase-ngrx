export interface User {
  uid: string;
}

export function toUser<T extends User>(data: T): User {
  return {
    uid: data.uid,
  };
}
