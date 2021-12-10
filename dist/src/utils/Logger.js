'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Logger = void 0;
/* eslint-disable no-unused-vars */
const fs = require('fs');
const Colors_1 = require('../features/Colors');
/**
 * Gives functions for formatting the content.
 */
const TerminalFormatter = {
  /**
     * Makes the string bold.
     * @param {string} text The content.
     * @returns {string}
     */
  bold (text) {
    return `${Colors_1.Colors.Formatters.Bold}${text}${Colors_1.Colors.Formatters.Reset}`;
  },
  /**
     * Sets the color of the string.
     * @param {ColorResolvable} color The colors name in `Colors`, could also use a custom value.
     * @param {string} text The content.
     * @returns {string}
     */
  color (color, text) {
    return `${color + text}${Colors_1.Colors.Formatters.Reset}`;
  },
  /**
     * Underlines the string.
     * @param {string} text The content.
     * @returns {string}
     */
  underlined (text) {
    return `${Colors_1.Colors.Formatters.Underline}${text}${Colors_1.Colors.Formatters.Reset}`;
  }
};
/**
 * @class Logger
 */
class Logger {
  constructor (options) {
    this.path = options.path ?? `${process.cwd()}/logs`;
    this.WTF = options.WTF ?? false;
  }

  /**
     * Concatenates 0 to the beginning of the number if value is less than 10.
     *
     * NOTE: -- This returns a string because of how numbers work, this is fine since the content in the logger is all string based.
     * @private
     * @static
     * @param {number} input The value to check and format.
     * @returns {string} The formatted time, see NOTE!
     * @memberof Logger
     */
  static formatTime (input) {
    return input < 10 ? `0${input}` : `${input}`;
  }

  /**
     * Create a new timestamp array.
     * @private
     * @static
     * @returns {string[]} String Array
     * @memberof Logger
     */
  static timestamp () {
    const date = new Date();
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedTime = `${this.formatTime(date.getHours())}:${this.formatTime(date.getMinutes())}:${this.formatTime(date.getSeconds())}`;
    const formattedDate = `${m[date.getMonth()]}-${this.formatTime(date.getDate())}-${date.getFullYear()}`;
    const fileDate = `${date.getMonth() + 1}-${this.formatTime(date.getDate())}-${date.getFullYear()}`;
    return [
      TerminalFormatter.color(Colors_1.Colors.Foreground.Grey, `${formattedDate} ${formattedTime}`),
            `${fileDate}`,
            `${formattedDate} ${formattedTime}`
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
  appendLogs (timestamp, ...content) {
    const filePath = `${this.path}/`;
    const file = `${filePath}${timestamp[1]}.log`;
    if (!fs.existsSync(filePath)) { fs.mkdirSync(filePath, { recursive: true }); }
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
  static type (loggerType) {
    const types = {
      DEBUG: [
        TerminalFormatter.bold(TerminalFormatter.color(Colors_1.Colors.Foreground.LightMagenta, 'DEBUG')),
        'DEBUG'
      ],
      ERROR: [
        TerminalFormatter.bold(TerminalFormatter.color(Colors_1.Colors.Foreground.Red, 'ERROR')),
        'ERROR'
      ],
      INFO: [
        TerminalFormatter.bold(TerminalFormatter.color(Colors_1.Colors.Foreground.Cyan, 'INFO')),
        'INFO'
      ],
      LOG: [
        TerminalFormatter.bold(TerminalFormatter.color(Colors_1.Colors.Foreground.Green, 'LOG')),
        'LOG'
      ],
      WARN: [
        TerminalFormatter.bold(TerminalFormatter.color(Colors_1.Colors.Foreground.Yellow, 'WARN')),
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
  log (...content) {
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
  info (...content) {
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
  debug (...content) {
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
  warn (...content) {
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
  error (...content) {
    const tm = Logger.timestamp();
    console.log(Logger.type('ERROR')[0], tm[0], ...content);
    if (this.WTF && this.path) {
      this.appendLogs(tm, `${Logger.type('ERROR')[1]} ${tm[2]} ${content.join(' ')}`);
    } else if (!this.path) {
      throw new Error('Path is not defined at: new Logger({})');
    }
  }
}
exports.Logger = Logger;
