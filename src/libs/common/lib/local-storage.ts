import type { StorageInterface } from "@/libs/types";

export class LocalStorage implements StorageInterface {
  namespace;
  constructor(namespace: string = "default", clear: boolean = false) {
    this.namespace = namespace;
    this.init(clear);
  }

  /**
   * init store if it not exists
   *
   * @memberof Storage
   */
  init(clear: boolean) {
    if (clear || !localStorage.getItem(this.namespace)) {
      localStorage.setItem(this.namespace, JSON.stringify({}));
    }
  }

  /**
   * get item from storage
   *
   * @param {string} [name] if empty - return full store
   * @returns
   * @memberof Storage
   */
  getItem(name?: string) {
    const val = localStorage.getItem(this.namespace);
    if (!val) {
      return {};
    }
    let data;
    try {
      data = JSON.parse(val);
    } catch (error: unknown) {
      console.log("error", error);
      data = {};
      localStorage.setItem(this.namespace, JSON.stringify(data));
    }
    if (!name) {
      return data;
    }
    return data[name] ? data[name] : undefined;
  }

  /**
   * set item to storage
   *
   * @param {*} name
   * @param {*} val
   * @memberof Storage
   */
  setItem(name: string, val: string | number | object) {
    const data = this.getItem();
    data[name] = val;
    localStorage.setItem(this.namespace, JSON.stringify(data));
  }

  clear() {
    localStorage.setItem(this.namespace, JSON.stringify({}));
  }
}

export const getLocalStorage = (name: string, clear: boolean = false) => {
  return new LocalStorage(name, clear);
};
