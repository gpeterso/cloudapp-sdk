import { CloudAppMessages } from '../messages/messages';

export namespace CloudAppIncomingEvents {

    const { getMessageBus, MessageNames } = CloudAppMessages;

    export function onPageLoad(handler: CloudAppMessages.MessageEventHandler, messageBus: CloudAppMessages.MessageBus = getMessageBus()): void {
        messageBus.subscribe(MessageNames.PAGE_LOAD, handler);
    }

    export function offPageLoad(handler: CloudAppMessages.MessageEventHandler, messageBus: CloudAppMessages.MessageBus = getMessageBus()): void {
        messageBus.unsubscribe(MessageNames.PAGE_LOAD, handler);
    }

    export function onEntitySelect(handler: CloudAppMessages.MessageEventHandler, messageBus: CloudAppMessages.MessageBus = getMessageBus()): void {
        messageBus.subscribe(MessageNames.ENTITY_SELECT, handler);
    }
    
    export function offEntitySelect(handler: CloudAppMessages.MessageEventHandler, messageBus: CloudAppMessages.MessageBus = getMessageBus()): void {
        messageBus.unsubscribe(MessageNames.ENTITY_SELECT, handler);
    }

}

