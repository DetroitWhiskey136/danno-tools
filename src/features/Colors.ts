// eslint-disable-next-line no-octal-escape

interface colorTypes {
  Foreground: string;
  Background: string;
  ForegroundLight?: string;
  BackgroundLight?: string;
}

interface colors {
  Black: colorTypes;
  Red: colorTypes;
  Green: colorTypes;
  Yellow: colorTypes;
  Blue: colorTypes;
  Magenta: colorTypes;
  Cyan: colorTypes;
  White: colorTypes;
}

const formatting = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Italic: '\x1b[3m',
  Underline: '\x1b[4m',
  /**
   * Not known to work, should be removed but wheres the fun in that.
   */
  Slowblink: '\x1b[5m',
  /**
   * Not known to work, should be removed but wheres the fun in that.
   */
  Fastblink: '\x1b[6m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  /**
   * Not known to work, should be removed but wheres the fun in that.
   */
  Crossout: '\x1b[9m'
};

const Colors: colors = {
  Black: {
    Foreground: '\x1b[30m',
    Background: '\x1b[40m'
  },
  Red: {
    Foreground: '\x1b[31m',
    Background: '\x1b[41m',
    ForegroundLight: '\x1b[91m',
    BackgroundLight: '\x1b[101m'
  },

  Green: {
    Foreground: '\x1b[32m',
    Background: '\x1b[42m',
    ForegroundLight: '\x1b[92m',
    BackgroundLight: '\x1b[102m'
  },
  Yellow: {
    Foreground: '\x1b[33m',
    Background: '\x1b[43m',
    ForegroundLight: '\x1b[93m',
    BackgroundLight: '\x1b[103m'
  },
  Blue: {
    Foreground: '\x1b[34m',
    Background: '\x1b[44m',
    ForegroundLight: '\x1b[94m',
    BackgroundLight: '\x1b[104m'
  },
  Magenta: {
    Foreground: '\x1b[35m',
    Background: '\x1b[45m',
    ForegroundLight: '\x1b[95m',
    BackgroundLight: '\x1b[105m'
  },
  Cyan: {
    Foreground: '\x1b[36m',
    Background: '\x1b[46m',
    ForegroundLight: '\x1b[96m',
    BackgroundLight: '\x1b[106m'
  },
  White: {
    Foreground: '\x1b[37m',
    Background: '\x1b[47m',
    ForegroundLight: '\x1b[97m',
    BackgroundLight: '\x1b[107m'
  }
};

export {
  Colors,
  colors,
  colorTypes,
  formatting
};
