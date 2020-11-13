import { CloudAppMessages } from './messages/messages';

export namespace CloudAppRest {

    export enum HttpMethod {
        GET = 'GET',
        PUT = 'PUT',
        POST = 'POST',
        PATCH = 'PATCH',
        DELETE = 'DELETE'
    }

    export enum AllowedHeader {
        ACCEPT = 'Accept',
        CONTENT_TYPE = 'Content-Type'
    }

    export interface Request {
        url: string;
        method?: HttpMethod;
        headers?: { [header in AllowedHeader]?: string };
        queryParams?: { [param: string]: any };
        requestBody?: any;
    }

    const { getMessageBus, MessageNames } = CloudAppMessages;

    export function call(request: Request, messageBus: CloudAppMessages.MessageBus = getMessageBus()): Promise<any> {
        return messageBus.communicate({ name: MessageNames.CALL_REST_API, payload: request });
    }

}
