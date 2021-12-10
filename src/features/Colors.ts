/* eslint-disable no-unused-vars */
export namespace Colors {
  export enum Foreground {
    Grey = '\u001b[90m',
    Gray = '\u001b[90m',
    Red = '\u001b[31m',
    LightRed = '\u001b[91m',
    Green = '\u001b[32m',
    LightGreen = '\u001b[92m',
    Yellow = '\u001b[33m',
    LightYellow = '\u001b[93m',
    Blue = '\u001b[34m',
    LightBlue = '\u001b[94m',
    Magenta = '\u001b[35m',
    LightMagenta = '\u001b[95m',
    Cyan = '\u001b[36m',
    LightCyan = '\u001b[96m',
    White = '\u001b[37m', // this might be wrong
    LightWhite = '\u001b[97m',
    Black = '\u001b[30m',
  }

  export enum Background {
    Grey = '\u001b[100m',
    Gray = '\u001b[100m',
    Red = '\u001b[41m',
    LightRed = '\u001b[101m',
    Green = '\u001b[42m',
    LightGreen = '\u001b[102m',
    Yellow = '\u001b[43m',
    LightYellow = '\u001b[103m',
    Blue = '\u001b[44m',
    LightBlue = '\u001b[104m',
    Magenta = '\u001b[45m',
    LightMagenta = '\u001b[105m',
    Cyan = '\u001b[46m',
    LightCyan = '\u001b[106m',
    White = '\u001b[m47',
    LightWhite = '\u001b[107m',
    Black = '\u001b[40m',
  }

  export enum Formatters {
    Reset = '\u001b[0m',
    Bold = '\u001b[1m',
    Dim = '\u001b[2m',
    Italic = '\u001b[3m',
    Underline = '\u001b[4m',
    Blink = '\u001b[5m',
    Inverse = '\u001b[7m',
    Hidden = '\u001b[8m',
    Strikethrough = '\u001b[9m',
    DoubleUnderline = '\u001b[21m',
  }
}
