import chalk from 'chalk';

export type MessageType = 'log' | 'info' | 'warn' | 'error';

const argsToString = (args: any[]) => args.map(arg => arg.toString()).join(' ');

function createLabel(type: MessageType) {
  const label = ` ${type.toUpperCase()} `;
  switch (type) {
    case 'info':
      return chalk.white.bgBlue(label);
    case 'warn':
      return chalk.white.bgYellow(label);
    case 'error':
      return chalk.white.bgRed(label);
    case 'log':
      return label;
  }
}

function createMessage(type: MessageType, ...args: any[]) {
  const message = argsToString(args);
  switch (type) {
    case 'info':
      return chalk.blueBright(message);
    case 'warn':
      return chalk.yellowBright(message);
    case 'error':
      return chalk.redBright(message);
    case 'log':
      return message;
  }
}

const format = (label: string, message: string) => `${label} ${message}`;

export function output(type: MessageType, ...args: any[]) {
  // tslint:disable-next-line no-console
  console[type](format(createLabel(type), createMessage(type, args)));
}

export const log = (...args: any[]) => output('log', ...args);

export const info = (...args: any[]) => output('info', ...args);

export const warn = (...args: any[]) => output('warn', ...args);

export const error = (...args: any[]) => output('error', ...args);
