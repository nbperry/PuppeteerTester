/* External Imports */

import chalk from 'chalk';

export type MessageType = 'log' | 'info' | 'warn' | 'error';

const argsToString = (args: any[]) => args.map(arg => arg.toString()).join(' ');
/**
 * Creates the label for an ouput message with the appropiate label color
 *
 * @param {MessageType} type
 * @returns
 */
function createLabel(type: MessageType) {
  const label = ` ${type.toUpperCase()} `;
  switch (type) {
    case 'info':
      return chalk.bold.underline.white.bgBlue(label);
    case 'warn':
      return chalk.bold.underline.white.bgYellow(label);
    case 'error':
      return chalk.bold.underline.white.bgRed(label);
    case 'log':
      return label;
  }
}
/**
 * Creates the text for an output message with the appropiate label color
 *
 * @param {MessageType} type
 * @param {...any[]} args  arguments to be output via the output message
 * @returns
 */
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

/**
 * Formats the output message
 *
 * @param {string} label
 * @param {string} message
 */
const format = (label: string, message: string) => `${label}: ${message}`;

/**
 * Outputs the appropriate message type
 *
 * @param {MessageType} type
 * @param {...any[]} args
 */
function output(type: MessageType, ...args: any[]) {
  // tslint:disable-next-line no-console
  console[type](format(createLabel(type), createMessage(type, args)));
}

// TODO: Should this only be outputed to console when the library is being used when a debug flag is enabled?

/**
 * Log should be used for internal library debuging statements
 *
 * @param args
 */
export const log = (...args: any[]) => output('log', ...args);

/**
 * Info should be used for providing information to the library end user
 *
 * @param args
 */
export const info = (...args: any[]) => output('info', ...args);

/**
 * Warn should be used for warning the library user of potential issues
 *
 * @param args
 */
export const warn = (...args: any[]) => output('warn', ...args);

/**
 *
 * Error should be used for providing information to the library user of errors that have occured
 *
 * @param args
 */
export const error = (...args: any[]) => output('error', ...args);
