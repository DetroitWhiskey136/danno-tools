export class Strings {
  /**
   * converts a string to a Proper Case format, good for titles.
   * @example ```js
   *    Strings.toProperCase('hello, world!');
   *    // returns 'Hello, World!'.
   * ```
   * @static
   * @param {string} str The string to convert.
   * @returns {string} The converted string.
   * @memberof Strings
   */
  static toProperCase (str: string): string {
    return (String(str ? str.toLowerCase() : this)).replace(/(^|[\s\xA0])[^\s\xA0]/g, (s: string) => s.toUpperCase());
  }

  /**
   * Creates a random string with a length of the provided value.
   * @example ```js
   *    Strings.createID(5);
   *    // returns 'AK3mw'
   * ```
   * @static
   * @param {number} length how long the string should be.
   * @returns {string} The string value.
   * @memberof Strings
   */
  static createID (length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
