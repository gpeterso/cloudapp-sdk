import { Message } from './interfaces';
import { getLogger } from './../logger';

const style = 'padding: 5px 10px; white-space: pre; font-family: monospace, sans-serif; font-weight: bold;';
const styles = {
    in: `${style} background: green; color: white`,
    out: `${style} background: blue; color: white`,
    error: `${style} background: #2f4f4f;`,
    print: `${style} background: #eee;`
}

const MessageLogger = getLogger('MessageLogger');

export function logIncoming(msg: Message) {
    const data = `[${msg.name}] [${msg.id}${(msg.inReplyTo ? ` \u2192 ${msg.inReplyTo}` : '')}]`;
    MessageLogger.log(`%c \u{1f87b} %c ${data} `, styles.in, styles.print, msg);
}

export function logOutgoing(msg: Message) {
    const data = `[${msg.name}] [${msg.id}]`;
    MessageLogger.log(`%c \u{1f879} %c ${data} `, styles.out, styles.print, msg);
}

export function logTimeout(msg: Message) {
    const data = `[${msg.name}] [${msg.id}]`;
    MessageLogger.log(`%c \u274c %c ${data} `, styles.error, styles.print, msg);
}

export function debug(...args: any[]) {
    MessageLogger.log(...args);
}
