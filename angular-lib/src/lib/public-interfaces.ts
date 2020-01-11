export interface Response {
    error?: any;
}

export interface StoreResponse extends Response {
    key: string,
    value: any;
}

export interface Entity extends Response {
    id: string;
    code?: string;
    type?: string;
    link?: string;
}

export interface PageInfo extends Response {
    entities: Entity[];
}

export interface InitData extends Response {
    user: { firstName: string, lastName: string },
    lang: string,
    color: string
}

export interface BasicResponse extends Response {
    success: boolean;
}

export interface RestResponse extends Response {
    body: any
}

export interface RestErrorResponse extends Response {
    ok: boolean,
    status: any,
    statusText: string,
    message: string,
    error: any
}

export interface RefreshPageResponse extends BasicResponse { }
export interface WriteSettingsResponse extends BasicResponse { }
export interface ReadSettingsResponse extends BasicResponse { }
