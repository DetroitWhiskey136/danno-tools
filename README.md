This is a base for tools i use on a regular basis ~ stuff is added as i need it.

# INSTALLATION
```
npm install danno-tools
```

# CLASSES
* Logger({ WTF: boolean, path: string }) // WTF: Write to file.
  * log(..content: string[])
  * info(..content: string[])
  * debug(..content: string[])
  * warn(..content: string[])
  * error(..content: string[])

# CODE EXAMPLES
```js
  const { Logger } = require('danno-tools');
  const logger = new Logger({ WTF: true, path: './logs' });
  logger.log('this is a test');
```
