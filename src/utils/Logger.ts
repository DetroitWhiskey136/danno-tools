/* eslint-disable no-unused-vars */
import * as fs from 'fs';
import { Colors, colors, formating } from '../features/Colors';

interface Logger {
  path: string;
  WTF: boolean;
}

export interface LoggerOptions {
  /**
   * Sets the path of the log folder, if WTF = true this is needed
   */
  path: string;
  /**
   * WTRIE TO FILE?
   */
  WTF: boolean;
}

/**
 * The type definitions for Logger Types
 * @interface LoggerTypes
 */
interface LoggerTypes {
  LOG: string[];
  INFO: string[];
  DEBUG: string[];
  WARN: string[];
  ERROR: string[];
}

type ColorResolvable = colors | number | string;

/**
 * Gives functions for formating the content.
 */
const TerminalFormatter = {
  /**
   * Makes the string bold.
   * @param {string} text The content.
   * @returns {string}
   */
  bold (text: string): string {
    return `${formating.Bright}${text}${formating.Reset}`;
  },

  /**
   * Sets the color of the string.
   * @param {ColorResolvable} color The colors name in `Colors`, could also use a custom value.
   * @param {string} text The content.
   * @returns {string}
   */
  color (color: ColorResolvable, text: string): string {
    return `${color + text}${formating.Reset}`;
  },

  /**
   * Underlines the string.
   * @param {string} text The content.
   * @returns {string}
   */
  underlined (text: string): string {
    return `${formating.Underline}${formating.Reset}`;
  }
};

// eslint-disable-next-line no-redeclare
class Logger {
  constructor (options: LoggerOptions = { path: null, WTF: false }) {
    this.path = options.path;
    this.WTF = options.WTF || false;
  }

  /**
   * Concats 0 to the beginning of the number if value is less than 10.
   *
   * NOTE: -- This returns a string because of how numbers work, this is fine since the content in the logger is all string based.
   * @private
   * @static
   * @param {number} input The value to check and format.
   * @returns {string} The formated time, see NOTE!
   * @memberof Logger
   */
  private static formatTime (input: number): string {
    return input < 10 ? `0${input}` : `${input}`;
  }

  /**
   * Create a new timestamp array.
   * @private
   * @static
   * @returns {string[]} String Array
   * @memberof Logger
   */
  private static timestamp (): string[] {
    const date = new Date();
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formatedTime = `${this.formatTime(date.getHours())}:${this.formatTime(date.getMinutes())}:${this.formatTime(date.getSeconds())}`;
    const formatedDate = `${m[date.getMonth()]}-${this.formatTime(date.getDate())}-${date.getFullYear()}`;
    const fileDate = `${date.getMonth() + 1}-${this.formatTime(date.getDate())}-${date.getFullYear()}`;

    return [
      TerminalFormatter.color(Colors.Black.ForegroundLight, `${formatedDate} ${formatedTime}`),
      `${fileDate}`,
      `${formatedDate} ${formatedTime}`
    ];
  }

  /**
   * Writes to the end of the log file
   * @private
   * @static
   * @param {string[]} timestamp A timestamp.
   * @param {...any[]} content The content.
   * @returns {void}
   * @memberof Logger
   */
  private appendLogs (timestamp: string[], ...content: any[]): void {
    const filePath = `${this.path}/`;
    const file = `${filePath}${timestamp[1]}.log`;
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
    fs.appendFileSync(file, `${content}\n`);
  }

  /**
   * Creates a type for colors and stuff
   * @private
   * @static
   * @param {keyofLoggerTypes} loggerType The Logger Type.
   * @returns {Array<string>} String Array
   * @memberof Logger
   */
  private static type (loggerType: keyof LoggerTypes): string[] {
    const types: LoggerTypes = {
      DEBUG: [
        TerminalFormatter.bold(
          TerminalFormatter.color(
            Colors.Magenta.ForegroundLight, 'DEBUG'
          )
        ),
        'DEBUG'
      ],
      ERROR: [
        TerminalFormatter.bold(
          TerminalFormatter.color(
            Colors.Red.Foreground, 'ERROR'
          )
        ),
        'ERROR'
      ],
      INFO: [
        TerminalFormatter.bold(
          TerminalFormatter.color(
            Colors.Cyan.Foreground, 'INFO'
          )
        ),
        'INFO'
      ],
      LOG: [
        TerminalFormatter.bold(
          TerminalFormatter.color(
            Colors.Green.Foreground, 'LOG'
          )
        ),
        'LOG'
      ],
      WARN: [
        TerminalFormatter.bold(
          TerminalFormatter.color(
            Colors.Yellow.Foreground, 'WARN'
          )
        ),
        'WARN'
      ]
    };

    return types[loggerType];
  }

  /**
   * Sends a Log message
   * @static
   * @param {...any[]} content The content.
   * @returns {void}
   * @memberof Logger
   */
  public log (...content: any[]): void {
    const tm = Logger.timestamp();
    console.log(Logger.type('LOG')[0], tm[0], ...content);
    if (this.WTF && this.path) {
      this.appendLogs(tm, `${Logger.type('LOG')[1]} ${tm[2]} ${content.join(' ')}`);
    } else if (!this.path) {
      throw new Error('Path is not defined: at Logger({})');
    }
  }

  /**
   * Sends a Info message
   * @static
   * @param {...any[]} content The content.
   * @returns {void}
   * @memberof Logger
   */
  public info (...content: any[]): void {
    const tm = Logger.timestamp();
    console.log(Logger.type('INFO')[0], tm[0], ...content);
    if (this.WTF && this.path) {
      this.appendLogs(tm, `${Logger.type('INFO')[1]} ${tm[2]} ${content.join(' ')}`);
    } else if (!this.path) {
      throw new Error('Path is not defined at: new Logger({})');
    }
  }

  /**
   * Sends a Debug message
   * @static
   * @param {any[]} content The content.
   * @returns {void}
   * @memberof Logger
   */
  public debug (...content: any[]): void {
    const tm = Logger.timestamp();
    console.log(Logger.type('DEBUG')[0], tm[0], ...content);
    if (this.WTF && this.path) {
      this.appendLogs(tm, `${Logger.type('DEBUG')[1]} ${tm[2]} ${content.join(' ')}`);
    } else if (!this.path) {
      throw new Error('Path is not defined at: new Logger({})');
    }
  }

  /**
   * Sends a Warn message
   * @static
   * @param {any[]} content The content.
   * @returns {void}
   * @memberof Logger
   */
  public warn (...content: any[]): void {
    const tm = Logger.timestamp();
    console.log(Logger.type('WARN')[0], tm[0], ...content);
    if (this.WTF && this.path) {
      this.appendLogs(tm, `${Logger.type('WARN')[1]} ${tm[2]} ${content.join(' ')}`);
    } else if (!this.path) {
      throw new Error('Path is not defined at: new Logger({})');
    }
  }

  /**
   * Sends a Error message
   * @static
   * @param {any[]} content The content.
   * @returns {void}
   * @memberof Logger
   */
  public error (...content: any[]): void {
    const tm = Logger.timestamp();
    console.log(Logger.type('ERROR')[0], tm[0], ...content);
    if (this.WTF && this.path) {
      this.appendLogs(tm, `${Logger.type('ERROR')[1]} ${tm[2]} ${content.join(' ')}`);
    } else if (!this.path) {
      throw new Error('Path is not defined at: new Logger({})');
    }
  }
}

export default Logger;
