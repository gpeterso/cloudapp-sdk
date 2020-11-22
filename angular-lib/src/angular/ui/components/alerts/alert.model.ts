export class Alert {
  id: string;
  /** Alert type */
  type: AlertType;
  /** Alert message */
  message: string;
  /** Override alert auto close */
  autoClose: boolean;
  /**  Keep alert after route changes; default false */
  keepAfterRouteChange: boolean;
  fade: boolean;
  /** Milliseconds to delay before autoClose; default 3000  */
  delay: number;

  constructor(init?:Partial<Alert>) {
    let defaults: Partial<Alert> = {
      autoClose: init.autoClose || ([AlertType.Info, AlertType.Success].includes(init.type)),
      delay: 3000,
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