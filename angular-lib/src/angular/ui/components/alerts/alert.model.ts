export class Alert {
  id: string;
  type: AlertType;
  message: string;
  autoClose: boolean;
  keepAfterRouteChange: boolean;
  fade: boolean;

  constructor(init?:Partial<Alert>) {
    let defaults: Partial<Alert> = {
      autoClose: init.autoClose || ([AlertType.Info, AlertType.Success].includes(init.type))
    }
    Object.assign(this, defaults, init);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}