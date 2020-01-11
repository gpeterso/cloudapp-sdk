import { IEventHandler } from 'ste-events';

export interface CustomEventTarget extends Window {
    attachEvent?(event: string, listener: EventListener): boolean;
    detachEvent?(event: string, listener: EventListener): void;
}

export interface CustomMessageEvent extends MessageEvent { readonly data: Message; }

export interface MessagePayload { data: any; }

export interface MessageEventHandler<T> extends IEventHandler<T, MessagePayload> { }

export interface Message {
    id?: string;
    name: string;
    payload?: any;
    inReplyTo?: string;
    ts?: number;
}
