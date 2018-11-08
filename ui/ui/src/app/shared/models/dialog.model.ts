export class DialogModel {
  id: string;
  callingComponent: string;
  ref: any;
  idle?: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
