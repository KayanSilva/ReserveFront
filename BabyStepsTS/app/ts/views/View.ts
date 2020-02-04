class View {
  private _elemento: Element;

  constructor(seletor:string) {
    this._elemento = document.querySelector(seletor);
  }
}