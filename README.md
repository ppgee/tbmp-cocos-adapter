# tbmp-cocos-adapter
淘宝小程序cocos引擎适配器

# cocos 适配过程

## 适配前提

1. cocos 适配版本是 2.4.6
2. 淘宝客户端版本尽量最新，目前 9.9.x 版本的无解，10.x 可行

## 适配注意事项

cocos 使用的全局变量统一用 $global 代替

```js
// 全局变量 直接设为 $global，不需要设为 $global.window
var window = $global;
```

## 适配需要导入的文件

1. adapter.js<font style="color: red">（重要）</font>
2. physics-min.js
3. main.js
4. cocos2d-js-min.js
5. global-variables.js（暂时不需要）

## 打包后的代码需要更改的地方

### 改造 app.js

```js
// app.js
var window = $global;

var onShowCB;
var onHideCB;

App({
  onLaunch(options) {
    console.info("App onLaunched");
    // 小程序执行出错时
    my.onError(function (error) {
      console.error(["ERROR"], error);
    });
    my.onUnhandledRejection((res) => {
      console.error("[UnhandledRejection]", res.reason, res.promise);
    });
    my.onShow = function (cb) {
      onShowCB = cb;
    };
    my.onHide = function (cb) {
      onHideCB = cb;
    };

    $global.__cocosCallback = function (options) {
      require("./ccRequire");
      require("./adapter");
      $global.__globalAdapter.init();

      options.afterAdapterInit();

      $global.__globalAdapter.onShow = function (cb) {
        onShowCB = cb;
      };
      $global.__globalAdapter.onHide = function (cb) {
        onHideCB = cb;
      };

      require("./cocos2d-js-min");
      require("./physics-min.js");
      $global.__globalAdapter.adaptEngine();

      require("./src/settings");
      // Introduce Cocos Service here
      require("./main"); // TODO: move to common

      // Adjust devicePixelRatio
      $global.cc.view._maxPixelRatio = 4;

      // Release Image objects after uploaded gl texture
      $global.cc.macro.CLEANUP_IMAGE_CACHE = true;

      window.boot();
    };
  },
  onShow(options) {
    onShowCB && onShowCB();
  },
  onHide(options) {
    onHideCB && onHideCB();
  },
});
```

### 改造 game.js

```js
// game.js
var window = $global;

("use strict");

require("adapter-min.js");

$global.__globalAdapter.init();

require("cocos2d-js-min.js");

require("physics-min.js");

$global.__globalAdapter.adaptEngine();

require("./ccRequire");

require("./src/settings"); // Introduce Cocos Service here

require("./main"); // TODO: move to common
// Adjust devicePixelRatio

$global.cc.view._maxPixelRatio = 4; // Release Image objects after uploaded gl texture

$global.cc.macro.CLEANUP_IMAGE_CACHE = true;
window.boot();
```

### 改造 src/settings.js
```js
// src/settings.js
// 文件开头声明以下变量
var window = $global
```

### 改造 assets文件夹内部的js文件
需要检查文件夹内部的js文件是否用到全局变量的，如果有用到的话，按需声明全局变量，例如:
```js
// assets/start-scene/index.js

// 注入声明全局变量 start
var window = $global
var cc = $global.cc
// 注入声明全局变量 end

// 业务代码，这里不需要管
window.__require = function e(t, n, r) {}
```

