export class CheckingArray<T> {
  private _dataCheck: Set<T>;
  constructor(initData: T[] = []) {
    this._dataCheck = new Set<T>(initData);
  }

  hasItem(value: T) {
    return this._dataCheck.has(value);
  }

  add(value: T) {
    this._dataCheck.add(value);
  }

  delete(value: T) {
    this._dataCheck.delete(value);
  }

  clear() {
    this._dataCheck.clear();
  }

  addOrRemove(value: T, isCheck: boolean) {
    if (isCheck) {
      this.add(value);
    } else {
      this.delete(value);
    }
  }

  triggerItem(value: T) {
    const isCheck = this.hasItem(value);
    this.addOrRemove(value, !isCheck);
  }

  get getData() {
    return [...this._dataCheck];
  }
}
// export default CheckingArray;
