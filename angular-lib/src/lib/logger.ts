import loglevel from 'loglevel';

const style = 'background: #fbf2d4; color: black; padding: 5px; font-weight: bolder';

function debug(name: string, ...args: any[]) {
    if (loglevel.getLevel() <= 1) {
        const header = `%c[${new Date().toLocaleString()}] [${name}]`;
        if (args.length > 0 && args[0] && typeof args[0] === "string") {
            const [first, ...rest] = args;
            loglevel.debug(`${header}%c ${first} `, style, '', ...rest);
        } else {
            loglevel.debug(header, style, ...args);
        }
    }
}

export function getLogger(name: string) {
    return {
        log: (...args: any[]) => {
            debug(name, ...args);
        }
    }
}
