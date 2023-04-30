# Easy Compile

<img align="right" height="215" width="215" alt="" src="https://faxes.zone/i/vv8VD.png" />

*An easy JavaScript encryption/compiler tool created by [@FAXES](https://github.com/FAXES) & [@PlutoTheDev](https://github.com/braxtongpoll).*

At times file security in your live product is a must have to keep your assets secure in production. Over the past few months we have been looking to make this a possibility, this is when we found [Bytenode](https://www.npmjs.com/package/bytenode) on NPM.

EasyCompile uses Bytenode as its form to compile and secure your files through terminal or via website you can host!

### Uses

- Create commercial versions of your application without direct source code
- Create demo/trial versions of your application without direct source code
- Secure your commercial products for distribution

## Usage
To use your compiled script you need the [easy compile npm pakcage](https://www.npmjs.com/package/easycompile) and a file with this code format: 
```js
require("easycompile").changeExtension(".easycompile")
let run = require("./yourcompiledfile.easycompile")
run();
```
after all that run `node yourfilename.js`

---
### Notes
With EasyCompile along with near any Javascript compiler will never provide full security on your applications. However, this is a great gateway to further protect your application.

---

### Contributors

<a href="https://github.com/FAXES/easycompile/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=FAXES/easycompile" />
</a>
