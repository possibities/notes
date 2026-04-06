## Web 开发三剑客

*   **HTML - 名词**：定义网页的**结构**和**内容**。
*   **CSS - 形容词**：描述网页的**外观**和**表现样式**。
*   **JavaScript - 动词**：实现网页的**行为**和**动态效果**，为网页添加互动性。

## JavaScript 历史与版本

*   **历史**：JavaScript 由 Brendan Eich 在 1995 年仅用 10 天创造出来。为了标准化，ECMAScript 标准诞生。ECMAScript 是标准，JavaScript 是实现。
*   **向后兼容 (Backwards Compatible)**：现代的 JavaScript 引擎可以执行旧版本的代码。**永远不会破坏网络 (Don't break the web!)**。
*   **不向前兼容 (Not Forwards Compatible)**：旧的浏览器无法执行新的语法。
*   **重要版本**：
    *   **ES5 (2009)**：被所有浏览器（包括旧版 IE）完全支持，是现代 JavaScript 的一个重要基础。
    *   **ES6/ES2015**：史上最大的一次更新，引入了 `let/const`、箭头函数、类等大量新特性。
    *   **ES2016 以后**：进入年度更新周期，每年发布少量新功能。
*   **开发与部署**：
    *   **开发时**：使用最新的浏览器（如 Chrome）即可。
    *   **上线时**：使用 **Babel** 进行转译（Transpile）和补丁填充（Polyfill），这类工具将现代 JS 代码**转译 (Transpile)** 成 ES5 语法，以确保在旧浏览器上的兼容性。

## JavaScript 基础

### 1. 数据类型 (Data Types)

JavaScript 是一种**动态类型 (Dynamic Typing)** 语言，变量可以重新赋值为不同类型的值。我们不需要手动指定变量的数据类型，类型是在运行时自动确定的。**重点：是“值”本身拥有类型，而不是“变量”**。

主要的数据类型有：

1. **Number**：数字，用于表示小数和整数。
2. **String**：字符串，由一或多个字符组成的序列，用于表示文本。
3. **Boolean**：布尔值，只有 `true` 或 `false` 两个值，常用于逻辑判断。
4. **Undefined**：未定义，当一个变量被声明但尚未赋值时，其值为 `undefined`。
5.  **Null**：空值，也表示“空”，但通常是开发者手动赋予的。
6.  **Symbol (ES2015)**：表示一个唯一且不可变的值。
7.  **BigInt (ES2020)**：用于表示比 `Number` 类型能表示的最大值还要大的整数。
    ```javascript
    // Boolean
    let javascriptIsFun = true;
    
    // Number
    let age = 30;
    
    // String
    let firstName = 'Jonas';
    
    // Undefined
    let year;  // undefined
    
    // Null
    let data = null;
    
    // 注意：typeof null 的结果是 'object'，这是一个历史悠久的 bug。
    console.log(typeof null); // "object"
    ```

### 2. 变量声明 (Variables)

在现代 JavaScript 中，我们主要使用 `let` 和 `const` 来声明变量。

*   `const` (Constant)：用于声明一个**常量**，其值在声明后**不能被重新赋值**。建议默认使用 `const`。
*   `let`：用于声明一个**变量**，其值**可以被重新赋值**。
*   `var`：是 ES6 之前的变量声明方式，存在一些问题（如作用域问题），现在已不推荐使用。

```javascript
let firstName = "Matilda";    // 可变变量，块级作用域
const birthYear = 1991;       // 常量，块级作用域
var job = 'programmer';       // 可变变量，函数作用域（不推荐）
```

**变量命名规范**

*   使用驼峰式命名法 (camelCase)，例如 `myFirstJob`。
*   变量名称可以包含字母、数字、下划线(`_`)和美元符号(`$`)。
*   不能以数字开头。
*   习惯上，永不改变的常量会使用全大写命名，例如 `const PI = 3.1415;`。

### 3. 简单运算符 (Operators)

*   **数学运算符**：`+`, `-`, `*`, `/`, `**` (次方)
*   **赋值运算符**：`=`, `+=`, `-=`, `++` (加一), `--` (减一)
*   **比较运算符**：`>`, `<`, `>=`, `<=`, `==` (等于), `===` (严格等于), `!=`, `!==`
*   **逻辑运算符**：`&&` (AND), `||` (OR), `!` (NOT)

**注意：**使用严格相等 `===` 和严格不等 `!==`，避免意外的类型转换。

`===` (严格相等)：**推荐使用**。它会比较两个值的**值**和**类型**是否都相等，不会进行类型强制转换。

```javascript
const age = '18';
if (age === 18) { /* false，因为类型不同 (string vs number) */ }
```

`==` (宽松相等)：**不推荐使用**。它在比较前会先进行**类型强制转换**，容易产生非预期的结果。

```javascript
if (age == 18) { /* true，因为 '18' 被转换为 18 */ }
```

### 4. 字符串与模板字面量

**传统字符串拼接**

```javascript
const jonas = "I'm " + firstName + ', a ' + (year - birthYear) + ' year old ' + job + '!';
```

**模板字面量（推荐）**使用反引号 `` ` `` 来创建字符串

```javascript
const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;

// 多行字符串
const multiLine = `String
multiple
lines`;
```

**优势：** 模板字面量提供更清晰的语法，支持表达式嵌入和多行字符串。



### 5. 类型转换与强制转换 (Type Conversion & Coercion)

**显式类型转换**

```javascript
const inputYear = '1991';
console.log(Number(inputYear));      // 1991 (数字)
console.log(String(23));             // "23" (字符串)
console.log(Number('Jonas'));        // NaN (Not a Number)
```

**隐式类型强制转换**

```javascript
console.log('I am ' + 23 + ' years old');  // "I am 23 years old"
console.log('23' - '10' - 3);              // 10 (字符串转数字)
console.log('23' / '2');                   // 11.5(数字转字符串)
```

**规律：** `+` 运算符倾向于字符串连接，其他运算符倾向于数值运算。

### 6. 真值与假值 (Truthy & Falsy Values)

在需要布尔值的上下文中（如 `if` 语句），JavaScript 会将值强制转换为布尔值。

*   **Falsy Values (假值)**：只有 5 个值在转换时会变成 `false`。
    1.  `0`
    2.  `''` (空字符串)
    3.  `undefined`
    4.  `null`
    5.  `NaN` (Not a Number)

*   **Truthy Values (真值)**：除了以上 5 个假值，其他所有值都是真值，包括任何非空字符串（如 `'Jonas'`）和任何对象（如 `{}`）。

### 7. 控制流语句和循环语句

#### 控制流

*   **if/else**
*   **switch语句**
*   **三元运算符 **：`if/else` 的简洁写法，也是一个**表达式**（会返回一个值）。

```javascript
// switch
switch (day) {
  case 'monday':
    console.log('Plan course structure');
    console.log('Go to coding meetup');
    break;
  case 'friday':
    console.log('Record videos');
    break;
  default:
    console.log('Not a valid day!');
}

// 三元运算符
// 可嵌入模板字面量
console.log(`I like to drink ${age >= 18 ? 'wine 🍷' : 'water 💧'}`);
```

#### 循环

`break`：立即**终止**整个循环。

`continue`：跳过当前这次迭代，直接进入**下一次**迭代。

* **for**（；；）：知道确切的迭代次数

* **while**：根据条件决定是否继续，次数不确定

* **do...while**

* **for...of** ：与传统的 `for` 循环相比，它专注于值本身而不是索引。

  ```javascript
  // 简单的值迭代
  for (const item of menu) console.log(item);
  
  // 同时获取索引和值 - 使用 entries() 方法
  for (const [i, el] of menu.entries()) {
    console.log(`${i + 1}: ${el}`);
  }
  
  console.log([...menu.entries()]); // 查看 entries() 的结构
  ```

- **for....in**：遍历键/属性名

### 8. 严格模式 (Strict Mode)

严格模式是 ES5 引入的一种模式，它能让代码在更严格的条件下运行，从而避免一些常见的错误并提高代码安全性。

*   **启用方式**：在脚本或函数的开头添加 `'use strict';`。
*   **作用**：
    *   将一些静默错误（比如禁止使用未声明的变量）转变为抛出错误。
    *   禁止使用某些保留字作为变量名（如 `interface`、`private`）
    *   提供更好的错误检测机制

### 9. 函数 (Functions)

函数是 JavaScript 的基本构建块之一，可以将代码组织成可重用的代码块。

**函数剖析 (Anatomy of a Function)**

*   **函数名 (Function Name)**：函数的名称。
*   **参数 (Parameters)**：定义函数时声明的变量，用于接收传入的输入值。
*   **实参 (Arguments)**：调用函数时传入的实际值。
*   **函数体 (Function Body)**：包含在 `{}` 中的代码块，定义了函数的功能。
*   **`return` 语句**：从函数中返回一个值，并终止函数的执行。
*   **调用 (Calling/Invoking)**：使用 `()` 来执行函数。

**定义函数的三种方式**

1.  **函数声明 (Function Declaration)**
    
    *   使用 `function` 关键字开头。
    *   可以在声明前调用（提升特性）
    ```javascript
    // 可以在声明前调用
    const age1 = calcAge1(1991);
    
    function calcAge1(birthYear) {
      return 2037 - birthYear;
    }
    ```
    
2.  **函数表达式 (Function Expression)**
    *   将一个匿名函数赋值给一个变量。函数本身是一个值。
    *   必须在声明和赋值之后才能调用。
    ```javascript
    const calcAge2 = function (birthYear) {
      return 2037 - birthYear;
    };
    
    const age2 = calcAge2(1991);
    ```
    
3.  **箭头函数 (Arrow Function) (ES6)**
    
    *   ES6 引入的更简洁的函数写法。
    *   特点：
        *   语法更简洁，适合简单的函数逻辑，单行函数可以省略花括号和 `return`
        *   没有`this` 关键字，会继承外部作用域的 `this`（后面会详细讲解）。
    ```javascript
    // 单行箭头函数（隐式返回）
    const calcAge3 = birthYear => 2037 - birthYear;
    
    // 多行箭头函数（需要显式 return）
    const yearsUntilRetirement = (birthYear, firstName) => {
      const age = 2037 - birthYear;
      const retirement = 65 - age;
      return `${firstName} retires in ${retirement} years`;
    };
    ```
4. **高级函数**

	满足以下至少一个条件：接收其他函数作为参数，或者返回新的函数。
	
	当函数接收其他函数作为参数时，被传入的函数通常被称为**回调函数**。

5. **历史遗留问题arguments**

	arguments对象是在每个普通函数（非箭头函数）内部自动创建的一个类数组对象。它包含了调用函数时传递的所有参数，无论函数定义时是否声明了这些参数。
	
	ES6引入的剩余参数语法是更现代的解决方案

### 10. 数组 (Arrays)

数组是按顺序存储一个值的数据结构。

**创建与访问**

```javascript
// 字面量方式（推荐）
const friends = ['Michael', 'Steven', 'Peter'];

// 访问元素（索引从0开始）
console.log(friends[0]); // 'Michael'

// 获取数组长度
console.log(friends.length); // 3

// 获取最后一个元素
console.log(friends[friends.length - 1]); // 'Peter'

// 修改元素
friends[2] = 'Jay';
console.log(friends); // ['Michael', 'Steven', 'Jay']
```

**常用数组方法**

```javascript
const friends = ['Michael', 'Steven', 'Peter'];

// 添加元素
friends.push('Jay');        // 在数组末尾添加一个或多个元素，返回新的长度。
friends.unshift('John');    // 在数组开头添加一个或多个元素，返回新的长度

// 删除元素
friends.pop();              // 删除数组末尾的元素，返回被删除的元素。
*   
friends.shift();            // 删除数组开头的元素，返回被删除的元素

// 查找元素
friends.indexOf('Steven');  // 返回指定元素的第一个索引，如果不存在则返回-1
friends.includes('Steven'); // 判断数组是否包含某个元素
```

### 11. 对象 (Objects)

一种用 **键值对（key-value）** 组织数据的引用类型，可以存多个属性和方法。

**属性名（key）** 字符串

**属性值（value）** 可以是任何类型（数字、字符串、数组、函数，甚至另一个对象）

#### 点表示法 vs. 方括号表示法

*   **点表示法 (`.`)**：属性名确定且符合标识符规则
    
    ```javascript
    console.log(jonas.lastName); // 'Schmedtmann'
    ```
*   **方括号表示法 (`[]`)**：属性名是变量或包含特殊字符，用于动态属性名。属性名以字符串形式传入。
    
    ```javascript
    console.log(jonas['lastName']); // 'Schmedtmann'
    
    const nameKey = 'Name';
    console.log(jonas['first' + nameKey]); // 'Jonas' (计算出的属性名)
    ```

#### 对象方法

对象中的属性值也可以是函数，这种函数我们称之为**方法 (Method)**。方法内部可以使用 `this` 关键字来访问该对象自身的其他属性。

```javascript
const jonas = {
  firstName: 'Jonas',
  birthYear: 1991,

  // 这是一个方法
  calcAge: function () {
    this.age = 2037 - this.birthYear; // 计算年龄并存为新属性
    return this.age;
  }
};

console.log(jonas.calcAge()); // 46
console.log(jonas.age); // 46 (属性已被创建)
```
#### 增强的对象字面量

ES6 对对象字面量语法进行了多项增强，让对象的创建更加简洁和灵活。

##### 属性值简写

当变量名与对象属性名相同时，可以使用简写语法。

```javascript
// ES6 之前的写法
const restaurant_old = {
  name: 'Classico Italiano',
  openingHours: openingHours, // 重复的变量名
};

// ES6 简写语法
const restaurant_new = {
  name: 'Classico Italiano',
  openingHours, // 自动使用变量名作为属性名
};
```

##### 方法定义简写

在对象中定义方法时，可以省略 `function` 关键字。

```javascript
// ES6 之前的方法定义
const restaurant_old = {
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

// ES6 简写语法
const restaurant_new = {
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};
```

##### 计算属性名

使用方括号 `[]` 可以在对象字面量中动态设置属性名。

```javascript
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: { // 计算得出的属性名 'thu'
    open: 12,
    close: 22,
  },
  [`day-${2 + 4}`]: { // 使用表达式，属性名为 'day-6'
    open: 0,
    close: 24,
  },
};
```

#### 迭代对象属性

```javascript
const openingHours = {
  thu: { open: 12, close: 22 },
  fri: { open: 11, close: 23 },
  sat: { open: 0, close: 24 },
};

// 获取属性名数组
const properties = Object.keys(openingHours);
console.log(properties); // 输出: ['thu', 'fri', 'sat']

// 获取属性值数组
const values = Object.values(openingHours);
console.log(values); // 输出: [{open: 12, close: 22}, ...]

// 获取键值对数组
const entries = Object.entries(openingHours);
console.log(entries); // 输出: [['thu', {open: 12, close: 22}], ...]
```

### 12.调试技巧与工具

调试是编程技能中极其重要的一部分。就像侦探需要线索来破案一样，程序员需要各种调试工具来找出代码中的问题。

**控制台调试方法**

```javascript
const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    value: 10, // 在实际应用中，这里可能来自用户输入
  };

  // 使用不同的控制台方法来查看数据
  console.table(measurement); // 以表格形式显示对象，更直观
  console.log(measurement.value); // 基本日志输出
  console.warn(measurement.value); // 警告级别的输出
  console.error(measurement.value); // 错误级别的输出

  const kelvin = measurement.value + 273;
  return kelvin;
};
```




## JavaScript 进阶



### 第一部分：理解 JavaScript 的本质

JavaScript 是一门复杂的编程语言，其核心特性包括：

*   **高级语言 (High-Level):** 抽象了计算机底层的内存管理等细节。
*   **原型继承**: 不同于传统的类继承，JavaScript 通过原型链实现对象间的关系
*   **多范式 (Multi-paradigm):** 支持过程式、面向对象、函数式等多种编程风格。
*   **即时编译**: 现代引擎采用 JIT 技术，在运行时将代码编译为机器码
*   **动态类型系统**: 变量类型在运行时确定，这带来了灵活性但也需要更多的类型检查意识
*   **单线程 (Single-threaded):** 主执行流程只有一个线程。
*   **垃圾回收 (Garbage-collected):** 自动管理内存，回收不再使用的对象。
*   **一等公民函数 (First-class functions):** 函数可以像变量一样被传递、返回和赋值。
*   **非阻塞事件循环并发模型 (Non-blocking event loop concurrency model):** 通过事件循环实现异步操作，避免了单线程的阻塞问题。

理解这些基础特性能帮助你：

- 预测代码的行为模式
- 避免常见的类型转换陷阱
- 更好地利用 JavaScript 的异步特性
- 编写更高效和可维护的代码

#### 理解一等函数的本质

**函数本质上就是值**，函数可以被存储、传递和操作。

更有趣的是，函数可以从其他函数中返回。这种能力让我们能够创建函数工厂：

```javascript
// greet 函数返回另一个函数
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey'); // greeterHey 现在是一个函数
greeterHey('Jonas'); // 输出 "Hey Jonas"


// 函数可以作为对象的属性

// 函数可以存储在数组中
```

由于函数本质上也是对象，它们拥有自己的方法，比如 `call`、`apply` 和 `bind`，这些方法为我们控制函数执行上下文提供了精确的工具。

---

### 第二部分：代码执行的内在机制

#### JavaScript 引擎的工作原理

引擎（比如 Chrome 的 V8）——只会执行纯 JavaScript 代码。

让我们深入了解代码从文本到执行的完整过程：

**代码处理流程**

1. **词法分析 (Tokenization)**: 将源代码分解成有意义的标记
2. **语法分析 (Parsing)**: 构建抽象语法树 (AST)
3. **编译优化**: V8 等引擎会进行多层优化编译
4. **执行**: 在调用栈中运行编译后的代码

**内存模型理解**

- **调用栈 (Call Stack)**: 存储执行上下文和原始值，遵循 LIFO 原则
- **堆内存 (Heap)**: 存储对象和复杂数据结构，通过引用访问
- **垃圾回收**: 自动清理不再被引用的对象，理解这点对性能优化很重要

#### **JavaScript 运行时环境 (Runtime)**

JS 引擎本身无法完成所有工作（如网络请求、定时器）。它需要一个**运行时环境**。

*   **浏览器环境：** `JS 引擎 + Web APIs (DOM, AJAX, setTimeout) + 事件循环 + 回调队列`
*   **Node.js 环境：** `JS 引擎 + C++ 绑定 & 线程池 + 事件循环 + 回调队列`

#### 事件循环

不停地检查任务队列（消息队列），一旦调用栈空了，就把任务队列里的任务推入调用栈执行。

JS 引擎执行调用栈里的同步代码。

当遇到异步任务（定时器、网络请求回调等），交给运行时环境处理。

运行时环境完成任务后，把对应的回调函数放到**任务队列**（Callback Queue）。

事件循环不停检查：

- 如果调用栈空了，
- 就把任务队列里的第一个回调放进调用栈执行。

继续执行调用栈代码，重复以上过程。

---

### 第三部分：执行上下文与变量管理

#### 执行上下文的深入理解

执行上下文是 JavaScript 中最重要的概念之一，它决定了代码的执行环境：

**执行上下文的组成**

- **变量环境 (Variable Environment)**: 存储 var 声明和函数声明
- **词法环境 (Lexical Environment)**: 存储 let、const 声明和参数
- **this 绑定**: 确定当前执行上下文中 this 的值
- **外部环境引用**: 建立作用域链的基础

**创建过程的两个阶段**

1. **创建阶段**: 建立变量环境，处理声明提升，确定 this 值
2. **执行阶段**: 逐行执行代码，为变量赋值

#### 作用域链与变量查找

**词法作用域的实用含义** 作用域在代码编写时就已确定，不会因调用位置而改变。这个规则让代码行为更可预测：

```javascript
// 词法作用域示例
function outer() {
    const outerVar = '外层变量';
    
    function inner() {
        console.log(outerVar); // 能访问外层变量
    }
    
    return inner;
}

const myFunc = outer();
myFunc(); // 输出: "外层变量"
// 即使在全局作用域调用，inner 仍能访问 outerVar
```

**变量查找机制** 引擎按以下顺序查找变量：

1. 当前执行上下文的词法环境
2. 外层词法环境（沿作用域链向上）
3. 全局词法环境
4. 如果仍未找到，抛出 ReferenceError

#### 变量声明与提升的实践理解

**提升的真实机制** 提升不是"移动代码"，而是在创建执行上下文时就处理了变量声明：

```javascript
// JavaScript引擎实际"看到"的代码结构：

// 1. 编译阶段：所有声明都被"提升"到作用域顶部
function addDecl(a, b) {    // 函数声明：完全提升（名称+函数体）
  return a + b;
}

const addExpr;    // 变量声明被提升（但赋值留在原处）
var addArrow;   // 变量声明被提升（但赋值留在原处）

// 2. 执行阶段：按原始顺序执行赋值和其他操作
console.log(addArrow);    // 输出: undefined（变量存在但还没赋值）
console.log(addExpr);	// ReferenceError: Cannot access before initialization，进入TDZ，不能访问

addExpr = function (a, b) {    // 现在才进行函数赋值
  return a + b;
};

addArrow = (a, b) => a + b;    // 现在才进行箭头函数赋值
```

**暂时性死区 (TDZ) 的实际影响**

```javascript
// let/const 的 TDZ
// 防止意外地使用还没有被正确初始化的变量，从而避免许多潜在的编程错误。
console.log(myLet); // ReferenceError
let myLet = 10;
```

**最佳实践建议**

- 优先使用 const，需要重新赋值时使用 let
- 避免使用 var，除非需要函数作用域或兼容老代码
- 在作用域顶部声明变量，让意图更清晰

#### this 关键字的掌握

##### this 的动态绑定规则

this 的值由函数的调用方式决定，不是定义方式：

**四种绑定规则**

1. **默认绑定**: 独立函数调用，严格模式下为 undefined
2. **隐式绑定**: 通过对象调用，this 指向该对象
3. **显式绑定**: 使用 call、apply、bind 明确指定 this
4. **new 绑定**: 使用 new 关键字，this 指向新创建的对象

**箭头函数的特殊性** 箭头函数没有自己的 this，它会捕获定义时的词法 this：

```javascript
const obj = {
    name: 'MyObject',
    
    regularMethod() {
        console.log(this.name); // 'MyObject'
        
        const arrowFunc = () => {
            console.log(this.name); // 'MyObject' (继承自 regularMethod)
        };
        
        function regularFunc() {
            console.log(this.name); // undefined (严格模式)
        }
        
        arrowFunc();
        regularFunc();
    }
};
```

##### call、apply 与 bind

JavaScript 中的 `this` 关键字的指向取决于函数的调用方式，有时我们需要精确控制它的指向。考虑这个场景：

```javascript
const lufthansa = {
  airline: 'Lufthansa',
  book: function(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} flight ${flightNum}`);
  }
};

const book = lufthansa.book; // 将方法提取到变量中
// book(23, 'Sarah'); // 直接调用会出错，因为 this 不再指向 lufthansa
```

为了解决这个问题，JavaScript 提供了三个强大的方法：

**call 方法**立即调用函数，并明确指定 `this` 的指向：

```javascript
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: []
};

// 明确告诉 book 函数，this 应该指向 eurowings 对象
book.call(eurowings, 23, 'Sarah Williams');
```

**apply 方法**与 `call` 类似，但参数以数组形式传递：

```javascript
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);

// 现代 JavaScript 中，更常用 call 配合展开语法
book.call(swiss, ...flightData);
```

**bind 方法**最为特殊，它不立即调用函数，而是返回一个新函数，这个新函数的 `this` 被永久绑定：

```javascript
// 创建专门用于 eurowings 的预订函数
const bookEW = book.bind(eurowings);
bookEW(23, 'Steven Williams'); // 可以像普通函数一样调用

// bind 还支持部分应用（Partial Application）
const addVAT = addTax.bind(null, 0.23); // 预设税率为 23%
console.log(addVAT(100)); // 只需传入价格
```

### 第五部分：数据赋值与内存管理

#### 解构赋值

解构赋值是 ES6 引入的一项重要特性，它提供了一种优雅的方式来从数组或对象中提取值并赋给变量。这种语法不仅减少了代码量，还让数据提取变得更加直观和易读。

##### 数组解构

数组解构基于位置进行匹配，左侧变量的位置对应右侧数组中相同位置的元素。

```javascript
// 基础数组解构 - 按位置提取值到变量
const arr = [2, 3, 4];
const [x, y, z] = arr;
console.log(x, y, z); // 输出: 2 3 4

// 跳过不需要的元素 - 使用空位占位符
const [first, , third] = arr;
console.log(first, third); // 输出: 2 4

// 变量交换 - 无需临时变量的优雅写法
[x, y] = [y, x];
console.log(x, y); // 输出: 3 2

// 解构函数返回的多个值 - 处理多返回值函数

// 嵌套数组解构 - 处理多维数组结构
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k); // 输出: 2 5 6

// 设置默认值 - 防止 undefined 的安全机制
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); // 输出: 8 9 1 (第三个值使用了默认值)
```

##### 对象解构

对象解构基于属性名进行匹配。

```javascript
// 基础对象解构 - 变量名必须与属性名匹配
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// 变量重命名 - 为了代码可读性或避免命名冲突
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags); 

// 设置默认值 - 处理可选属性的安全做法
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// 声明变量再赋值 - 注意必须使用圆括号
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); // 圆括号防止 JavaScript 将 {} 解释为代码块
console.log(a, b); // 输出: 23 7

// 嵌套对象解构 - 深入提取嵌套属性
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c); // 输出: 11 23
```

#### 对象复制：浅拷贝 vs. 深拷贝

##### 原始值 vs 引用值的深层理解

**内存分配策略**

- **原始值**: 直接存储在栈中，复制时创建新的独立值
- **引用值**: 在堆中存储实际内容，栈中存储指向堆的地址

**实际编程影响**

```javascript
// 引用值的共享性
let obj1 = { count: 5 };
let obj2 = obj1;
obj1.count = 10;
console.log(obj2.count); // 10 (obj2 受到影响)
```

JavaScript中的对象是引用类型，这意味着变量存储的不是对象本身，而是指向内存中对象位置的引用。

```javascript
const original = { name: 'Jessica', age: 30 };
const reference = original; // 这只是复制了引用，不是对象内容

reference.age = 31;
console.log(original.age); // 输出: 31，原始对象也被修改了
```

**浅拷贝：表面层次的复制**

浅拷贝创建一个新对象，并将原始对象的所有属性复制到新对象中。

但是，如果属性值本身是引用类型（如对象、数组），则只复制其引用，而不是创建新的副本。

```javascript
const jessica = {
  firstName: 'Jessica',
  age: 30,
  family: ['Alice', 'Bob'], // 这是一个嵌套的引用类型
  address: {
    city: 'New York',
    country: 'USA'
  }
};

// 使用展开语法进行浅拷贝
const jessicaCopy = { ...jessica };

// 修改第一层属性 - 不会影响原对象
jessicaCopy.age = 31;
console.log(jessica.age); // 输出: 30，原对象未受影响

// 修改嵌套属性 - 会影响原对象
jessicaCopy.family.push('Mary');
jessicaCopy.address.city = 'Boston';

console.log(jessica.family); // 输出: ['Alice', 'Bob', 'Mary']
console.log(jessica.address.city); // 输出: 'Boston'
```

从这个例子中我们可以看到，浅拷贝的特点是：对于第一层的基本类型属性，修改副本不会影响原对象；但对于嵌套的引用类型属性，修改副本会同时影响原对象，因为它们共享相同的引用。

**浅拷贝的实现方法**

JavaScript提供了多种实现浅拷贝的方法，每种都有其适用场景：

```javascript
const original = { a: 1, b: [2, 3], c: { d: 4 } };

// 方法1：展开语法（最常用，语法简洁）
const copy1 = { ...original };

// 方法2：Object.assign（兼容性更好）
const copy2 = Object.assign({}, original);

// 方法3：Object.create + Object.getOwnPropertyDescriptors（保留属性描述符）
const copy3 = Object.create(
  Object.getPrototypeOf(original),
  Object.getOwnPropertyDescriptors(original)
);
```

**深拷贝：完全独立的复制**

深拷贝递归地复制对象的所有层级，确保新创建的对象与原始对象完全独立。修改深拷贝的结果不会对原始对象产生任何影响。

```javascript
const jessica = {
  firstName: 'Jessica',
  age: 30,
  family: ['Alice', 'Bob'],
  address: {
    city: 'New York',
    details: {
      zipCode: '10001',
      street: 'Main St'
    }
  }
};

// 使用 structuredClone 进行深拷贝
const jessicaClone = structuredClone(jessica);

// 修改任何层级的属性都不会影响原对象
jessicaClone.family.push('John');
jessicaClone.address.city = 'Los Angeles';
jessicaClone.address.details.zipCode = '90210';

console.log('Original family:', jessica.family); // ['Alice', 'Bob']
console.log('Clone family:', jessicaClone.family); // ['Alice', 'Bob', 'John']
console.log('Original city:', jessica.address.city); // 'New York'
console.log('Clone city:', jessicaClone.address.city); // 'Los Angeles'
```

**深拷贝的实现方法与局限性**

虽然`structuredClone`是现代浏览器中推荐的深拷贝方法，但了解其他方法和它们的局限性也很重要：

```javascript
// 方法1：structuredClone（推荐，现代浏览器支持）
const clone1 = structuredClone(original);

// 方法2：JSON 方法（简单但有局限性）
const clone2 = JSON.parse(JSON.stringify(original));
// 局限性：无法处理函数、undefined、Symbol、循环引用等

// 方法3：自定义递归函数（最灵活但需要处理复杂情况）
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}
```

**性能考量与最佳实践**

深拷贝虽然提供了完全的独立性，但也带来了性能开销。在大型对象或频繁操作的场景下，这种开销可能变得显著。因此，在实际开发中应该：

1. **优先考虑数据结构设计**：尽量避免过深的嵌套结构
2. **根据需求选择方法**：不需要完全独立时使用浅拷贝
3. **考虑使用不可变数据结构**：如Immutable.js等库
4. **缓存深拷贝结果**：避免重复的深拷贝操作

#### 垃圾回收

##### 主要的垃圾回收算法

1. 引用计数（Reference Counting）-（已废弃）
2. 标记-清除（Mark-and-Sweep）-（现代引擎的基础）

​	从根上可达的就不会被回收

##### 垃圾回收的意识

- 及时解除不需要的对象引用
- 注意闭包可能造成的内存泄漏
- 使用 WeakMap 和 WeakSet 来避免循环引用问题

### 5.函数

#### 部分应用

部分应用的本质：有一个需要多个参数的函数，但我们可以提前"固定"其中一些参数，创建一个新的函数，这个新函数只需要剩余的参数就能工作。

#### 柯里化

将一个接受多个参数的函数转换为一系列只接受单个参数的函数，每个函数都返回一个新的函数，直到所有参数都被收集完毕。

```javascript
// 简单版本的柯里化函数
function curry(fn) {
    // 获取原函数期望的参数数量
    const arity = fn.length;
    
    return function curried(...args) {
        // 如果传入的参数数量达到了原函数的要求
        if (args.length >= arity) {
            // 直接调用原函数
            return fn.apply(this, args);
        } else {
            // 否则返回一个新的函数，等待更多参数
            return function(...moreArgs) {
                // 递归调用curried，合并所有参数
                return curried.apply(this, args.concat(moreArgs));
            };
        }
    };
}

// 测试我们的curry函数
const multiply = function(a, b, c) {
    console.log(`计算：${a} × ${b} × ${c} = ${a * b * c}`);
    return a * b * c;
};

const multiplyCurried = curry(multiply);

// 多种使用方式都支持
console.log(multiplyCurried(2)(3)(4)); // 一次传一个参数
console.log(multiplyCurried(2, 3)(4)); // 可以一次传多个参数
console.log(multiplyCurried(2)(3, 4)); // 灵活的参数传递
console.log(multiplyCurried(2, 3, 4)); // 一次性传所有参数
```

无限参数函数

```javascript
// 创建一个可以无限接收参数的加法函数
function infiniteAdd(sum = 0) {
    function add(num) {
        if (arguments.length === 0) {
            // 如果没有参数，返回当前的和
            return sum;
        }
        // 如果有参数，返回新的add函数，累积和
        return infiniteAdd(sum + num);
    }
    
    // 重写toString方法，让我们能够获得最终结果
    add.toString = function() {
        return sum.toString();
    };
    
    add.valueOf = function() {
        return sum;
    };
    
    return add;
}

// 使用无限柯里化
const calc = infiniteAdd();
console.log(+calc(1)(2)(3)(4)(5)); // 15
console.log(calc(10)(20)(30) + ''); // "60"

// 或者创建一个带有初始值的计算器
const calculator = infiniteAdd(100);
console.log(+calculator(5)(10)(15)); // 130
```

#### 立即调用函数表达式

IIFE是一种JavaScript设计模式，它创建一个函数并立即执行它。这个函数在定义的同时就被调用，执行完毕后就从内存中消失。

通过用括号包裹整个函数，我们告诉JavaScript解析器："这不是函数声明，而是函数表达式"。函数表达式可以是匿名的，也可以立即执行。

```javascript
// 方式1：最常见的写法
(function() {
    console.log("方式1");
})();

// 方式2：括号在外层
(function() {
    console.log("方式2");
}());

// 方式3：使用箭头函数（ES6+）
(() => {
    console.log("箭头函数IIFE");
})();

// 方式4：使用其他运算符强制表达式
!function() {
    console.log("使用!运算符");
}();

+function() {
    console.log("使用+运算符");
}();
```

IIFE最重要的作用是创建一个独立的作用域。在没有块级作用域的ES5时代，这是创建私有变量的主要方法。避免临时变量污染作用域

#### 闭包：函数的记忆机制

**闭包就是函数 + 它被创建时的词法作用域**，即使这个函数在它原本的作用域之外被调用，它依然能访问那个作用域里的变量。

从技术角度讲，闭包使函数能够访问和操作其词法作用域中的变量，即使该作用域的执行上下文已经销毁。

```javascript
const createBankAccount = function(initialBalance) {
  let balance = initialBalance;  // 这是一个"私有"变量
  
  // 返回一个对象，包含操作账户的方法
  return {
    deposit: function(amount) {
      balance += amount;
      console.log(`Deposited ${amount}. New balance: ${balance}`);
    },
    
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        console.log(`Withdrew ${amount}. New balance: ${balance}`);
      } else {
        console.log('Insufficient funds');
      }
    },
    
    getBalance: function() {
      return balance;
    }
  };
};

const myAccount = createBankAccount(1000);
myAccount.deposit(500);   // "Deposited 500. New balance: 1500"
myAccount.withdraw(200);  // "Withdrew 200. New balance: 1300"
console.log(myAccount.getBalance());  // 1300
```

返回的内部函数在这个环境中被创建，因此形成了闭包。

闭包的另一个经典应用场景是事件处理：

```javascript
function setupColorChanger() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  let currentIndex = 0;
  
  const header = document.querySelector('h1');
  
  // 事件监听器的回调函数形成闭包
  document.addEventListener('click', function() {
    header.style.color = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;  // 循环使用颜色
  });
  
  // 即使 setupColorChanger 执行完毕，闭包仍然保持对 colors、currentIndex 和 header 的访问
}

setupColorChanger();
```

当点击事件发生时（可能在很久之后），外层的立即执行函数早已执行完毕，但回调函数通过闭包机制仍然能够访问和修改 `header` 变量。

#### 理解闭包的工作原理

闭包的工作机制可以从以下几个层面理解：

**词法作用域**：JavaScript 使用词法作用域，这意味着函数可以访问其定义时所在作用域的变量，而不是调用时的作用域。

**作用域链**：当函数被创建时，它会保持对其外层作用域的引用。即使外层函数执行完毕，这个引用仍然存在。

**垃圾回收**：由于闭包的存在，被引用的变量不会被垃圾回收器清理，它们会一直保存在内存中直到闭包本身被销毁。

#### 实际应用与最佳实践

一等函数、高阶函数和闭包共同构成了 JavaScript 函数式编程的基础。它们使得 JavaScript 具有了强大的表达能力：

- **模块化**：通过闭包可以创建私有变量和方法
- **函数组合**：高阶函数让我们能够组合小的函数来构建复杂的功能
- **延迟执行**：闭包允许我们创建在未来某个时刻执行的函数
- **配置和定制**：通过 `bind` 和闭包可以创建定制化的函数

### 6.运算符

#### 展开运算符

展开运算符 `...` 就像是一个"解包器"，它将可迭代对象（数组、字符串、对象）的所有元素展开成独立的元素。

可以想象成把一个装满物品的盒子打开，让里面的物品散开。

```javascript
const arr = [7, 8, 9];

// 创建新数组 - 合并现有数据
const newArr = [1, 2, ...arr];
console.log(newArr); // 输出: [1, 2, 7, 8, 9]

// 函数调用中展开数组 - 将数组元素作为独立参数传递
const ingredients = ['蘑菇', '芦笋', '奶酪'];
restaurant.orderPasta(...ingredients); // 等同于 orderPasta('蘑菇', '芦笋', '奶酪')

// 创建数组的浅拷贝 - 避免引用问题
const mainMenuCopy = [...restaurant.mainMenu];

// 合并多个数组 - 比 concat 更直观
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// 展开字符串 - 将字符串分解为字符数组
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters); // 输出: ['J', 'o', 'n', 'a', 's', ' ', 'S.']

// 展开对象 (ES2018) - 创建对象的修改副本
const newRestaurant = { 
  foundedIn: 1998, 
  ...restaurant, 
  founder: 'Giuseppe' 
};
```

#### 剩余参数模式

剩余模式就是"打包"，它将多个独立元素收集到一个数组中。

**关键区别在于位置：**

- **展开运算符**：出现在赋值号 `=` 的右侧或函数调用中，用于展开元素
- **剩余模式**：出现在赋值号 `=` 的左侧（解构时）或函数参数中，用于收集元素

```javascript
// 在解构中使用剩余模式
// 数组中的剩余模式 - 收集剩余元素
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 输出: 1 2 [3, 4, 5]

// 对象中的剩余模式 - 收集剩余属性
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // 输出: {thu: {…}, fri: {…}}

// 函数参数中的剩余参数 - 处理可变数量的参数
const add = function (...numbers) { // 将所有参数收集到 numbers 数组中
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3); // 输出: 5
add(5, 3, 7, 2); // 输出: 17
add(8, 2, 5, 3, 2, 1, 4); // 可以接受任意数量的参数
```

#### 短路求值的巧妙运用

逻辑运算符 `||` 和 `&&` 在 JavaScript 中具有短路特性。能返回任何数据类型的值。

##### OR 运算符的短路行为

OR 运算符 `||` 寻找第一个真值（truthy）。一旦找到真值，就立即返回该值，不再评估后续表达式；如果所有值都为假，则返回最后一个值。**这个特性常用于设置默认值**。

##### AND 运算符的短路行为

AND 运算符 `&&` 寻找第一个假值（falsy）。一旦遇到假值，立即返回该假值；如果所有值都为真，则返回最后一个值。**这个特性常用于条件执行。**

##### 空值合并运算符

空值合并运算符 `??` 是 ES2020 引入的新特性，它解决了 `||` 运算符将 `0` 和空字符串 `''` 视为假值的问题。

`??` 只在左侧操作数为 `null` 或 `undefined`（被称为 nullish 值）时，才返回右侧操作数。

```javascript
restaurant.numGuests = 0;

// 使用 OR 运算符的问题
const guests = restaurant.numGuests || 10;
console.log(guests); // 输出: 10 (0 被视为假值，不符合预期)

// 使用空值合并运算符的解决方案
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); // 输出: 0 (0 不是 nullish 值，所以保留原值)

// 更多示例
console.log(null ?? 'default'); // 输出: 'default'
console.log(undefined ?? 'default'); // 输出: 'default' 
console.log(0 ?? 'default'); // 输出: 0
console.log('' ?? 'default'); // 输出: ''
console.log(false ?? 'default'); // 输出: false
```

##### 逻辑赋值运算符的简洁语法

ES2021 引入的逻辑赋值运算符将逻辑运算符与赋值运算符结合，提供了更简洁的条件赋值语法。

```javascript
const rest1 = { name: 'Capri', numGuests: 0 };
const rest2 = { name: 'La Piazza', owner: 'Giovanni Rossi' };

// OR 赋值 (||=) - 只有当变量为假值时才赋值
// rest1.numGuests ||= 10; // 0 是假值，会被赋值为 10

// 空值赋值 (??=) - 只有当变量为 nullish 时才赋值
rest1.numGuests ??= 10; // 0 不是 nullish，保持不变
rest2.numGuests ??= 10; // undefined 是 nullish，赋值为 10

console.log(rest1); // 输出: {name: 'Capri', numGuests: 0}
console.log(rest2); // 输出: {name: 'La Piazza', owner: '...', numGuests: 10}

// AND 赋值 (&&=) - 只有当变量为真值时才赋值
rest1.owner &&= '<ANONYMOUS>'; // undefined 是假值，不赋值
rest2.owner &&= '<ANONYMOUS>'; // 'Giovanni Rossi' 是真值，赋值为 '<ANONYMOUS>'

console.log(rest1); // owner 属性依然不存在
console.log(rest2); // owner 变成 '<ANONYMOUS>'
```

#### 可选链运算符的安全访问

可选链运算符 `?.` 是 ES2020 的重要特性，它让我们能够安全地访问可能不存在的属性或方法，避免了"Cannot read property of undefined"这类常见错误。

如果` ?. `左侧的操作数是 null 或 undefined，整个表达式会立即返回 undefined，而不会产生错误。

```javascript
// 传统的安全访问方式 - 冗长且容易出错
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// 使用可选链的优雅方式
console.log(restaurant.openingHours?.mon?.open); // 多层安全访问

// 在方法(函数)调用中使用可选链
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');

// 在数组访问中使用可选链
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
console.log(users[0]?.name ?? 'User array empty'); // 输出: Jonas

// 处理空数组的情况
const emptyUsers = [];
console.log(emptyUsers[0]?.name ?? 'User array empty'); // 输出: User array empty
```

### 7.Set 唯一值的集合

#### 基础方法

Set 是一种只存储唯一值的集合数据结构，无论值的数据类型如何。它特别适用于需要去重或快速查找的场景。

| 方法 / 属性          | 作用                      | 说明                     |
| -------------------- | ------------------------- | ------------------------ |
| `new Set(iterable?)` | 创建一个 Set 集合         | 自动去除重复元素         |
| `.size`              | 返回 Set 中元素的个数     | 不是 `length`，是属性    |
| `.has(value)`        | 判断 Set 中是否存在某元素 | 返回 `true` 或 `false`   |
| `.add(value)`        | 向 Set 添加元素           | 重复元素添加无效         |
| `.delete(value)`     | 删除 Set 中指定元素       | 返回是否删除成功的布尔值 |
| `.clear()`           | 清空 Set                  | 移除所有元素             |
| 可迭代性             | 可用 `for...of` 循环遍历  | 遍历顺序是插入顺序       |

```javascript
// 创建 Set - 自动去除重复值
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet); // 输出: Set(3) {'Pasta', 'Pizza', 'Risotto'}

// Set 的主要方法和属性
console.log(ordersSet.size); // 3 (不是 length)
console.log(ordersSet.has('Pizza')); // true
console.log(ordersSet.has('Bread')); // false

ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread'); // 重复添加无效
ordersSet.delete('Risotto');
console.log(ordersSet);

// ordersSet.clear(); // 清空整个 Set

// Set 是可迭代的
for (const order of ordersSet) console.log(order);

// 实际应用：数组去重
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique); // 输出: ['Waiter', 'Chef', 'Manager']

// 计算字符串中不同字母的数量
console.log(new Set('jonas').size); // 输出: 4
```

#### 数学集合操作方法（ES2025新特性）

| 方法名                     | 语法                               | 返回值类型  | 功能描述               |
| ----------------------- | -------------------------------- | ------ | ------------------ |
| `intersection()`        | `setA.intersection(setB)`        | 新的 Set | 返回两个集合的交集（共同元素）    |
| `union()`               | `setA.union(setB)`               | 新的 Set | 返回两个集合的并集（所有不重复元素） |
| `difference()`          | `setA.difference(setB)`          | 新的 Set | 返回 A 中有但 B 中没有的元素  |
| `symmetricDifference()` | `setA.symmetricDifference(setB)` | 新的 Set | 返回两个集合各自独有的元素      |


#### 集合关系检查方法（ES2025新特性）

| 方法名                | 语法                          | 返回值类型   | 功能描述           |
| ------------------ | --------------------------- | ------- | -------------- |
| `isDisjointFrom()` | `setA.isDisjointFrom(setB)` | boolean | 检查两个集合是否没有共同元素 |
| `isSubsetOf()`     | `setA.isSubsetOf(setB)`     | boolean | 检查 A 是否是 B 的子集 |
| `isSupersetOf()`   | `setA.isSupersetOf(setB)`   | boolean | 检查 A 是否是 B 的超集 |


#### 传统方法 vs 新方法

```javascript
// 传统的交集实现
const intersection_old = new Set([...setA].filter(x => setB.has(x)));

// 新的交集方法
const intersection_new = setA.intersection(setB);

// 传统的并集实现
const union_old = new Set([...setA, ...setB]);

// 新的并集方法
const union_new = setA.union(setB);

// 传统的差集实现
const difference_old = new Set([...setA].filter(x => !setB.has(x)));

// 新的差集方法
const difference_new = setA.difference(setB);
```

**浏览器兼容性说明**

- **基础方法**（add、delete、has、clear等）：所有现代浏览器都支持
- **数学集合操作方法**：需要较新的JavaScript引擎支持，属于ES2025规范
- **兼容性检查**：使用前建议检查 `typeof Set.prototype.intersection === 'function'`

### 8.Map 强大的键值对映射

Map 是一种键值对的集合，与普通对象的最大区别是，Map 的键可以是任何数据类型，包括对象、函数甚至其他 Map。

| 方法 / 属性        | 作用                    | 说明                              |
| ------------------ | ----------------------- | --------------------------------- |
| `new Map()`        | 创建一个空的 Map        | 可传入二维数组初始化              |
| `.set(key, value)` | 添加或更新键值对        | 返回 Map 本身，支持链式调用       |
| `.get(key)`        | 获取指定键的值          | 如果没有该键，返回 `undefined`    |
| `.has(key)`        | 判断是否含有指定键      | 返回 `true` 或 `false`            |
| `.delete(key)`     | 删除指定键及其对应的值  | 返回 `true`（删除成功）或 `false` |
| `.size`            | 读取 Map 中键值对的数量 | 只读属性                          |

#### Map 的基础操作

```javascript
const rest = new Map();

// 使用 set() 方法添加键值对（返回 Map 本身，支持链式调用）
rest.set(1, 'F');

// 链式调用
rest
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

// 使用 get() 方法获取值
console.log(rest.get(1)); // F

// 其他常用方法
console.log(rest.has('categories')); // true
rest.delete(2);
console.log(rest.size); // 获取 Map 的大小

// 使用数组初始化 Map
const question = new Map([
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript']
]);
```

#### Map 的迭代和转换

| 方法 / 属性                    | 作用                   | 说明                            |
| ------------------------------ | ---------------------- | ------------------------------- |
| `.clear()`                     | 清空 Map 中所有键值对  | 不接受参数，清空后 size 为 0    |
| `.keys()`                      | 返回所有键的迭代器     | 可用于 `for...of` 遍历键        |
| `.values()`                    | 返回所有值的迭代器     | 可用于 `for...of` 遍历值        |
| `.entries()`                   | 返回所有键值对的迭代器 | 可用于 `for...of` 遍历键值对    |
| `.forEach(callback, thisArg?)` | 遍历 Map，执行回调函数 | 和数组的 forEach 类似，顺序遍历 |

```javascript
// Map 天然可迭代
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

// 对象到 Map 的转换
const hoursMap = new Map(Object.entries(openingHours));

// Map 到数组的转换
console.log([...question]); // 解构为数组数组
console.log([...question.keys()]); // 只获取键
console.log([...question.values()]); // 只获取值
```

### 9.字符串

#### 字符串访问和字符串长度

| 方法 / 属性         | 作用                   | 语法                         | 返回值类型                                                   |
| :------------------ | :--------------------- | ---------------------------- | ------------------------------------------------------------ |
| `[index]`           | 按位置获取字符         | `str[index]`                 | 字符串（单个字符）或 `undefined`                             |
| `.charAt(index)`    | 返回指定位置的字符     | `str.charAt(index)`          | 字符串（单个字符），如果 `index` 超出范围，返回空字符串 `""` |
| `.length`           | 获取字符串长度         | `str.length`                 | 数字（长度）                                                 |
| `.indexOf(sub)`     | 查找子串首次出现的位置 | `str.indexOf(substring)`     | 数字（索引，找不到返回 -1）                                  |
| `.lastIndexOf(sub)` | 查找子串最后出现的位置 | `str.lastIndexOf(substring)` | 数字（索引，找不到返回 -1）                                  |

#### 大小写转换和字符串清理

| 方法             | 作用                   | 语法                | 返回值类型 |
| ---------------- | ---------------------- | ------------------- | ---------- |
| `.trim()`        | 去除字符串首尾空白字符 | `str.trim()`        | 新字符串   |
| `.toLowerCase()` | 转成小写               | `str.toLowerCase()` | 新字符串   |
| `.toUpperCase()` | 转成大写               | `str.toUpperCase()` | 新字符串   |

```javascript
const airline1 = ' TAP Air Portugal ';

const airline = airline1.trim(); // 去除首尾空白字符
console.log(airline.toLowerCase()); // "tap air portugal"
console.log(airline.toUpperCase()); // "TAP AIR PORTUGAL"

// 应用
// 规范化姓名格式
const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); // "Jonas"

// 比较邮箱的标准化处理
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail); // "hello@jonas.io"
console.log(email === normalizedEmail); // true
```

#### 字符串替换操作

| 方法              | 作用                 | 语法                                    | 特点                                   | 返回值类型 |
| ----------------- | -------------------- | --------------------------------------- | -------------------------------------- | ---------- |
| `.replace()`      | 替换第一个匹配的子串 | `str.replace(searchValue, newValue)`    | 只替换第一个，大小写敏感（除非用正则） | 新字符串   |
| `.replaceAll()`   | 替换所有匹配的子串   | `str.replaceAll(searchValue, newValue)` | ES2021引入，替换所有匹配，大小写敏感   | 新字符串   |
| 正则 `.replace()` | 结合正则表达式替换   | `str.replace(/pattern/flags, newValue)` | 可加全局标志 `/g` 和忽略大小写 `/i`    | 新字符串   |

```javascript
const text = 'I like cats. Cats are cute.';

// replace() 只替换第一个匹配项，且大小写敏感
console.log(text.replace('Cats', 'Dogs'));
// "I like cats. Dogs are cute."

// replaceAll() 替换所有匹配项 (ES2021)
const repeatText = 'cat, cat, cat';
console.log(repeatText.replaceAll('cat', 'dog'));
// "dog, dog, dog"

// 正则表达式 
// /g (全局替换)：最常用、最强大的方式
// /i 表示不区分大小写
console.log(text.replace(/cat/gi, 'dog'));
// "I like dogs. Dogs are cute."
```

#### 字符串检查方法

这些方法返回布尔值，特别适用于条件判断。

| 方法            | 作用                   | 语法                        | 返回值类型       |
| --------------- | ---------------------- | --------------------------- | ---------------- |
| `.includes()`   | 字符串是否包含指定子串 | `str.includes(substring)`   | `true` / `false` |
| `.startsWith()` | 是否以指定子串开头     | `str.startsWith(substring)` | `true` / `false` |
| `.endsWith()`   | 是否以指定子串结尾     | `str.endsWith(substring)`   | `true` / `false` |

```javascript
const plane = 'Airbus A320neo';

console.log(plane.includes('A320')); // true
console.log(plane.includes('Boeing')); // false

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW ARibus family');
}
```

#### 字符串分割与连接

| 方法                  | 作用                                   | 语法                    | 返回值类型 |
| --------------------- | -------------------------------------- | ----------------------- | ---------- |
| `.split(sep, limit?)` | 根据分隔符拆分字符串，返回数组         | `str.split(separator)`  | 数组       |
| `.join(sep)`          | 把数组元素用分隔符连接成字符串         | `arr.join(separator)`   | 字符串     |
| `.slice(start, end?)` | 截取字符串片段（不包含 end，支持负数） | `str.slice(start, end)` | 字符串     |

```javascript
// split() 方法将字符串分割为数组
console.log('a+very+nice+string'.split('+')); // ['a', 'very', 'nice', 'string']
console.log('Jonas Schmedtmann'.split(' ')); // ['Jonas', 'Schmedtmann']

// 结合解构赋值和 join() 方法处理姓名
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName); // "Mr. Jonas SCHMEDTMANN"

// 字符串切片 - 注意不会修改原字符串
const airline = 'TAP Air Portugal';

console.log(airline.slice(4)); // "Air Portugal"
console.log(airline.slice(4, 7)); // "Air" (不包含结束位置)

console.log(airline.slice(0, airline.indexOf(' '))); // "TAP"
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // "Portugal"

// 从末尾开始切片
console.log(airline.slice(-2)); // "al"
console.log(airline.slice(1, -1)); // "AP Air Portuga"
```

#### 字符串填充和重复

| 方法                                  | 作用                                            | 语法                                    | 返回值类型       |
| ------------------------------------- | ----------------------------------------------- | --------------------------------------- | ---------------- |
| `.padStart(targetLength, padString?)` | 字符串头部填充字符，直到长度达到 `targetLength` | `str.padStart(targetLength, padString)` | 新字符串         |
| `.padEnd(targetLength, padString?)`   | 字符串尾部填充字符，直到长度达到 `targetLength` | `str.padEnd(targetLength, padString)`   | 新字符串         |
| `.repeat(n)`                          | 将字符串重复 `n` 次，返回一个新字符串。         | `str.repeat(count)`                     | 重复后的新字符串 |

```javascript
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));
// "+++++++++++++++Jonas+++++++++++++"

const str = 'ha';
console.log(str.repeat(3)); // "hahaha"
console.log(str.repeat(0)); // ""
```

### 10.数组

#### 方法分类体系的思维框架

理解数组方法的核心在于掌握两个关键维度：是否改变原数组以及返回值的类型。这种分类方式不仅能帮助您避免意外的副作用，更能让您在解决问题时快速定位到合适的方法。

| 返回类型     | 修改原数组（副作用型）                                       | 返回新值（纯函数型）                                         |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **数组**     | `.push()`, `.pop()`, `.unshift()`, `.shift()`, `.splice()`, `.reverse()`, `.sort()`, `.fill()` | `.map()`, `.filter()`, `.slice()`, `.concat()`, `.flat()`, `.flatMap()`, `.toSorted()`, `.toReversed()`, `.toSpliced()`, `.with()` |
| **单个元素** | —                                                            | `.find()`, `.findLast()`, `.at()`                            |
| **索引位置** | —                                                            | `.indexOf()`, `.findIndex()`, `.findLastIndex()`             |
| **布尔值**   | —                                                            | `.includes()`, `.some()`, `.every()`                         |
| **字符串**   | —                                                            | `.join()`                                                    |
| **聚合值**   | —                                                            | `.reduce()`, `.reduceRight()`                                |
| **无返回值** | `.forEach()`                                                 | —                                                            |

#### 函数式编程三大核心：map、filter、reduce

它们不仅能独立完成各种数据转换任务，更重要的是可以通过方法链组合成强大的数据处理管道。

##### `map()`：一对一的数据变换

`map(callback)`方法的核心思想是"映射变换"——将原数组中的每个元素通过一个转换函数映射成新的值，构成一个新数组。

这个过程就像数学中的函数映射，输入集合中的每个元素都有唯一对应的输出。

```javascript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// 场景1：数值转换 - 将欧元转换为美元
const movementsUSD = movements.map(amount => amount * eurToUsd);
// 结果: [220, 495, -440, 3300, -715, -143, 77, 1430]

// 场景2：数据格式化 - 生成描述性文本
const movementsDescriptions = movements.map((amount, index) => {
  const type = amount > 0 ? '存入' : '取出';
  return `交易${index + 1}: 您${type}了${Math.abs(amount)}元`;
});
// 结果: ["交易1: 您存入了200元", "交易2: 您存入了450元", ...]

// 场景3：对象属性提取
const accounts = [
  { owner: '张三', balance: 5000 },
  { owner: '李四', balance: 3200 }
];
const ownerNames = accounts.map(account => account.owner);
// 结果: ['张三', '李四']
```

理解要点：`map()`始终返回与原数组长度相同的新数组，每个位置的元素都是原元素经过转换函数处理的结果。

##### `filter()`：条件筛选的艺术

`filter(callback)`方法实现的是"条件过滤"——根据指定的条件函数，从原数组中筛选出符合条件的元素，组成一个新的数组。

这个过程类似于现实中的筛子，只让符合条件的元素通过。

```javascript
// 场景1：数值筛选 - 分离存款和取款
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
// 结果: [200, 450, 3000, 70, 1300] - 所有正数（存款）

// 场景2：复合条件筛选 - 找出大额存款
const largeDeposits = movements.filter(amount => amount > 1000);
// 结果: [3000, 1300] - 大于1000的交易

// 场景3：对象属性筛选
const accounts = [
  { owner: '张三', balance: 5000, type: 'premium' },
  { owner: '李四', balance: 1200, type: 'standard' },
  { owner: '王五', balance: 8000, type: 'premium' }
];
const premiumAccounts = accounts.filter(account => account.type === 'premium');
// 结果: 高级账户的数组
```

理解要点：`filter()`返回的新数组长度小于或等于原数组，包含所有使条件函数返回`true`的元素。

##### `reduce()`：数据聚合的强大工具

`reduce()`是最强大也最灵活的数组方法。它的核心概念是"累积计算"——通过一个累积器函数，将整个数组"归约"成单个值。这个值可以是数字、字符串、对象，甚至是另一个数组。

arr.reduce(callback(accumulator, currentValue, index, array), initialValue)

- accumulator (累计器): 累计回调的返回值。
- currentValue (当前值): 数组中正在处理的元素。
- initialValue (初始值): 作为第一次调用 callback 的第一个参数 accumulator 的值。**强烈建议总是提供初始值**

```javascript
// 场景1：数值求和 - 计算账户总余额
const totalBalance = movements.reduce((accumulator, currentAmount) => {
  return accumulator + currentAmount;
}, 0); // 初始值设为0
// 结果: 3840

// 场景2：寻找最大值 - 利用reduce的累积特性
const maxMovement = movements.reduce((maxSoFar, current) => {
  return current > maxSoFar ? current : maxSoFar;
}, movements[0]); // 初始值设为数组第一个元素
// 结果: 3000

// 场景3：构建复杂对象 - 统计存取款总额
const summary = movements.reduce((stats, amount) => {
  if (amount > 0) {
    stats.deposits += amount;
    stats.depositCount++;
  } else {
    stats.withdrawals += Math.abs(amount);
    stats.withdrawalCount++;
  }
  return stats; // 必须返回累积器对象
}, {
  deposits: 0,
  withdrawals: 0,
  depositCount: 0,
  withdrawalCount: 0
});
// 结果: {deposits: 4950, withdrawals: 1180, depositCount: 5, withdrawalCount: 3}

// 场景4：数组转对象 - 按条件分组
const groupedByType = movements.reduce((groups, amount) => {
  const key = amount > 0 ? 'income' : 'expense';
  if (!groups[key]) groups[key] = [];
  groups[key].push(amount);
  return groups;
}, {});
// 结果: {income: [200, 450, 3000, 70, 1300], expense: [-400, -650, -130]}
```

理解要点：`reduce()`的强大之处在于累积器可以是任意类型。每次迭代都会将当前元素与累积器结合，产生新的累积器值，最终返回最后的累积结果。

 **reduceRight(callback, initialValue)**

- **作用：** 从数组的 **右侧（末尾）开始**，依次用回调函数把元素“累计”成一个值。
- 类似 `reduce`，但遍历顺序相反。
- **参数**：
  - `callback(accumulator, currentValue, currentIndex, array)` — 回调函数，累积器和当前元素是主要参数
  - `initialValue` — 初始累积值（可选，但推荐提供）
- **返回值**：最终累积的单个值。

**应用场景**：需要从数组尾部开始累计或合并，比如字符串逆序拼接、后缀计算等。

#### 方法链：构建数据处理管道

三大核心方法的真正威力在于它们可以链式调用，形成优雅的数据处理管道。这种模式让复杂的数据处理逻辑变得清晰易读。

```javascript
const eurToUsd = 1.1;

// 示例：计算所有存款转换为美元后的总额
const totalDepositsUSD = movements
  .filter(amount => amount > 0)        // 步骤1：筛选出所有存款
  .map(amount => amount * eurToUsd)    // 步骤2：转换为美元
  .reduce((total, amount) => total + amount, 0); // 步骤3：求和
// 结果: 5445
```

#### 查找与测试方法：精确定位数据

##### 元素查找方法

| 方法                                    | 作用说明                                                    | 参数格式                          | 返回类型           |
| --------------------------------------- | ----------------------------------------------------------- | --------------------------------- | ------------------ |
| **find(callback)**                      | 从前往后找，返回第一个满足条件的元素                        | `callback(element, index, array)` | 元素或 `undefined` |
| **findIndex(callback)**                 | 从前往后找，返回第一个满足条件的元素索引，找不到返回 `-1`   | `callback(element, index, array)` | 数字               |
| **findLast(callback)** *(ES2023+)*      | 从后往前找，返回最后一个满足条件的元素                      | `callback(element, index, array)` | 元素或 `undefined` |
| **findLastIndex(callback)** *(ES2023+)* | 从后往前找，返回最后一个满足条件的元素索引，找不到返回 `-1` | `callback(element, index, array)` | 数字               |
| **indexOf(value)**                      | 从前往后找第一次出现该值的索引，找不到返回 `-1`（严格相等） | `value[, fromIndex]`              | 数字               |
| **lastIndexOf(value)**                  | 从后往前找第一次出现该值的索引，找不到返回 `-1`（严格相等） | `value[, fromIndex]`              | 数字               |
| **includes(value)**                     | 判断数组中是否包含指定值（严格相等）                        | `value[, fromIndex]`              | 布尔值             |
| **at(index)**                           | 返回指定索引的元素，支持负数索引（-1 表示最后一个）         | `index`（可负数）                 | 任意类型           |

```javascript
const accounts = [
  { id: 1, owner: '张三', balance: 5000 },
  { id: 2, owner: '李四', balance: 1200 },
  { id: 3, owner: '王五', balance: 8000 }
];

// find(callback): 返回第一个符合条件的元素，否则返回 undefined。
const richAccount = accounts.find(account => account.balance > 3000);
// 结果: { id: 1, owner: '张三', balance: 5000 }

// findIndex(callback): 返回第一个符合条件元素的索引，否则返回 -1
const richAccountIndex = accounts.findIndex(account => account.balance > 3000);
// 结果: 0

// findLast(callback): 返回最后一个符合条件的元素（ES2023+）
const lastRichAccount = accounts.findLast(account => account.balance > 3000);
// 结果: { id: 3, owner: '王五', balance: 8000 }

// indexOf(value): 查找指定值的索引（基于严格相等），如果不存在则返回 -1
const movements = [200, 450, -400, 200];
const firstOccurrence = movements.indexOf(200);
// 结果: 0（第一次出现的位置）

// at(index): 根据索引获取元素，支持负数索引
const lastElement = movements.at(-1);
// 结果: 200（相当于 movements[movements.length - 1]）
```

##### 条件测试方法

| 方法                | 作用说明                                                     | 参数格式                          | 返回类型 |
| ------------------- | ------------------------------------------------------------ | --------------------------------- | -------- |
| **includes(value)** | 判断数组中是否包含指定值（严格相等 `===`），`fromIndex` 默认 0，支持负数索引 | `value[, fromIndex]`              | 布尔值   |
| **some(callback)**  | 检查是否至少有一个元素满足条件，满足则返回 `true`            | `callback(element, index, array)` | 布尔值   |
| **every(callback)** | 检查是否所有元素都满足条件，全满足才返回 `true`              | `callback(element, index, array)` | 布尔值   |

这些方法用于测试数组是否满足特定条件，返回布尔值：

```javascript
// includes(value): 检查数组是否包含指定值
const hasSpecificAmount = movements.includes(-400);
// 结果: true

// some(callback): 检查是否至少有一个元素满足条件
const hasDeposits = movements.some(amount => amount > 0);
// 结果: true（存在正数）

// every(callback): 检查是否所有元素都满足条件
const allNumbers = movements.every(amount => typeof amount === 'number');
// 结果: true（所有元素都是数字）
```

#### 数组修改方法：就地操作的艺术

这些方法直接修改原数组，通常用于需要高性能或内存效率的场景。使用时需要特别注意副作用。

##### 添加和删除元素

| 方法                                          | 作用说明                                                     | 参数格式                                                     | 返回类型               |
| --------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------- |
| **splice(start, deleteCount, ...itemsToAdd)** | 从 `start` 开始，删除 `deleteCount` 个元素，再插入 `itemsToAdd`，原数组被修改 | `start`（起始索引，必填），`deleteCount`（删除个数，必填），`itemsToAdd`（要插入的元素，0个或多个） | 被删除的元素组成的数组 |

```javascript
// splice(): 最灵活的修改方法
// splice(start, deleteCount, ...itemsToAdd)
fruits.splice(1, 0, '桃子', '梨'); // 在索引1处插入，不删除
// fruits: ['苹果', '桃子', '梨', '香蕉']

fruits.splice(1, 2); // 从索引1开始删除2个元素
// fruits: ['苹果', '香蕉']
```

##### 排序和反转

| 方法                                          | 作用说明                                               | 参数格式                             | 返回类型               |
| --------------------------------------------- | ------------------------------------------------------ | ------------------------------------ | ---------------------- |
| **sort([compareFunction])**                   | 原地排序，默认按字符串排序，传入比较函数实现数字排序等 | 可选比较函数 `(a, b) => number`      | 排序后的数组（原数组） |
| **reverse()**                                 | 原地反转数组元素顺序                                   | 无参数                               | 反转后的数组（原数组） |
| **fill(value, start = 0, end = this.length)** | 原地用固定值填充指定区间元素                           | 填充值，起始索引，终止索引（不包含） | 填充后的数组（原数组） |

```javascript
let numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// sort(): 原地排序（默认按字符串排序）
numbers.sort(); // 按字符串排序，结果可能不是期望的
// 数字排序需要提供比较函数
numbers.sort((a, b) => a - b); // 升序: [1, 1, 2, 3, 4, 5, 6, 9]
numbers.sort((a, b) => b - a); // 降序: [9, 6, 5, 4, 3, 2, 1, 1]

// reverse(): 原地反转
numbers.reverse(); // 反转当前顺序
// [1, 1, 2, 3, 4, 5, 6, 9]

// fill(value, start, end): 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素
let array = new Array(5);
array.fill(0); // [0, 0, 0, 0, 0]
array.fill(1, 2, 4); // [0, 0, 1, 1, 0] 从索引2到4（不包含）填充1
```

#### 非修改性方法：纯函数的优雅

这些方法不会改变原数组，而是返回新的数组或值，符合函数式编程的原则。

##### 数组切片和合并

| 方法                                    | 作用说明                                    | 参数格式                     | 返回类型 |
| --------------------------------------- | ------------------------------------------- | ---------------------------- | -------- |
| **slice(start = 0, end = this.length)** | 返回原数组指定区间的浅拷贝，不改变原数组    | 起始索引，终止索引（不包含） | 新数组   |
| **concat(...arrays)**                   | 合并多个数组，返回新数组，不改变原数组      | 一个或多个数组               | 新数组   |
| **扩展运算符**                          | 通过展开操作符合并或复制数组，等同于 concat | `...array`                   | 新数组   |

```javascript
const original = [1, 2, 3, 4, 5];

// slice(start, end): 提取子数组,返回一个新的数组对象，它是原数组的一个浅拷贝
const subset = original.slice(1, 4); // [2, 3, 4]（不包含索引4）
const copy = original.slice();       // [1, 2, 3, 4, 5]（浅拷贝）

// concat(...arrays): 合并两个或多个数组。返回一个新数组。
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = arr1.concat(arr2, [5, 6]); // [1, 2, 3, 4, 5, 6]

// 扩展运算符的现代替代方案
const modernMerged = [...arr1, ...arr2, 5, 6]; // 相同结果
```

##### 数组扁平化

| 方法                  | 作用说明                                                     | 参数格式                          | 返回类型 |
| --------------------- | ------------------------------------------------------------ | --------------------------------- | -------- |
| **flat(depth = 1)**   | 扁平化嵌套数组，将子数组元素按指定深度连接到新数组中         | 数字（扁平化深度，默认1）         | 新数组   |
| **flatMap(callback)** | 先对数组执行映射操作，然后扁平化结果（深度1），性能优于分开调用 map 和 flat | `callback(element, index, array)` | 新数组   |

```javascript
// flat(depth): 扁平化嵌套数组，并将所有子数组元素连接到其中，直到指定的深度
const nested = [1, [2, 3], [4, [5, 6]]];
const flattened1 = nested.flat();    // [1, 2, 3, 4, [5, 6]]（默认深度1）
const flattened2 = nested.flat(2);   // [1, 2, 3, 4, 5, 6]（深度2）

// flatMap(callback): map（先） + flat（深度为1）的组合。性能比分开调用 map 和 flat 更好
const sentences = ['hello world', 'how are you'];
const words = sentences.flatMap(sentence => sentence.split(' '));
// 结果: ['hello', 'world', 'how', 'are', 'you']

// 相当于但更高效：
// const words = sentences.map(sentence => sentence.split(' ')).flat();
```

##### ES2022+的新增非修改方法

这些方法是对应修改方法的"安全"版本，在React等需要不可变性的环境中特别有用：

| 方法                                             | 作用说明                                    | 参数格式                        | 返回类型 |
| ------------------------------------------------ | ------------------------------------------- | ------------------------------- | -------- |
| **toSorted(compareFunction?)**                   | 返回排序后的新数组，原数组不变，类似 `sort` | 可选比较函数 `(a, b) => number` | 新数组   |
| **toReversed()**                                 | 返回反转后的新数组，原数组不变              | 无参数                          | 新数组   |
| **toSpliced(start, deleteCount, ...itemsToAdd)** | 返回删除和插入元素后的新数组，原数组不变    | 同 `splice` 参数                | 新数组   |
| **with(index, value)**                           | 返回指定索引元素替换后的新数组，原数组不变  | 索引，替换的新值                | 新数组   |

```javascript
const numbers = [3, 1, 4, 1, 5];

// 非修改性排序、反转、修改
const sorted = numbers.toSorted((a, b) => a - b);    // [1, 1, 3, 4, 5]
const reversed = numbers.toReversed();               // [5, 1, 4, 1, 3]
const modified = numbers.toSpliced(1, 2, 'new');    // [3, 'new', 1, 5]
const replaced = numbers.with(2, 'changed');        // [3, 1, 'changed', 1, 5]

// 原数组保持不变
console.log(numbers); // [3, 1, 4, 1, 5]
```

#### 实用工具方法

##### 遍历和转换

| 方法                                    | 作用说明                                         | 参数格式                                                     | 返回类型          |
| --------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ | ----------------- |
| **forEach(callback)**                   | 遍历数组，对每个元素执行副作用操作，不返回新数组 | `callback(element, index, array)`                            | 无（`undefined`） |
| **join(separator = ',')**               | 把数组元素用分隔符连接成字符串，默认逗号分隔     | 分隔符字符串（可选）                                         | 字符串            |


```javascript
// forEach(): 执行副作用操作
const movements = [200, -300, 450];
movements.forEach((amount, index) => {
  const type = amount > 0 ? '存入' : '取出';
  console.log(`交易${index + 1}: ${type} ${Math.abs(amount)}元`);
});
// 注意：forEach不返回值，主要用于产生副作用

// join(): 转换为字符串
const fruits = ['苹果', '香蕉', '橙子'];
const fruitString = fruits.join(', '); // "苹果, 香蕉, 橙子"
const path = ['home', 'user', 'documents'].join('/'); // "home/user/documents"
```

##### 数组创建

| 方法                                | 作用说明                                                   | 参数格式                                                     | 返回类型 |
| ----------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ | -------- |
| **Array.from(arrayLike, mapFunc?)** | 将类似数组或可迭代对象转换为新数组，支持对元素执行映射函数 | `arrayLike`（类似数组或可迭代对象），`mapFunc(element, index)`（可选） | 新数组   |
| **Array.isArray(value)**            | 判断传入值是否为数组                                       |                                                              | 布尔值   |

```javascript
// Array.from(arrayLike, mapFunc): 从一个类似数组或可迭代对象创建一个新的、浅拷贝的数组实例。它的第二个参数是一个映射函数，非常强大。
// 场景1：创建指定长度的数组
const zeros = Array.from({ length: 5 }, () => 0);
// [0, 0, 0, 0, 0]

const sequence = Array.from({ length: 5 }, (_, index) => index + 1);
// [1, 2, 3, 4, 5]

// 场景2：从DOM节点列表创建数组
const elements = Array.from(
  document.querySelectorAll('.item'),
  element => element.textContent
);

// 场景3：字符串转数组
const chars = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
```

#### 高级应用：数组分组（ES2024+）

最新的JavaScript标准引入了数组分组功能，让数据分类变得更加简单：

| 方法                                   | 参数格式                          | 返回类型     | 作用说明                                                     |
| -------------------------------------- | --------------------------------- | ------------ | ------------------------------------------------------------ |
| **Object.groupBy(objectArray, keyFn)** | 数组，分组函数 `(element) => key` | 对象（字典） | 根据分组函数的返回值，将数组元素分组，返回一个以分组键为属性的对象，属性值是对应元素数组 |

```javascript
const transactions = [
  { amount: 200, type: 'income', category: 'salary' },
  { amount: -50, type: 'expense', category: 'food' },
  { amount: 1000, type: 'income', category: 'bonus' },
  { amount: -30, type: 'expense', category: 'transport' },
  { amount: -100, type: 'expense', category: 'food' }
];

// 按类型分组
const byType = Object.groupBy(transactions, ({ type }) => type);
/*
结果: {
  income: [
    { amount: 200, type: 'income', category: 'salary' },
    { amount: 1000, type: 'income', category: 'bonus' }
  ],
  expense: [
    { amount: -50, type: 'expense', category: 'food' },
    { amount: -30, type: 'expense', category: 'transport' },
    { amount: -100, type: 'expense', category: 'food' }
  ]
}
*/

// 按金额大小分组
const bySize = Object.groupBy(transactions, ({ amount }) => {
  const absAmount = Math.abs(amount);
  if (absAmount >= 1000) return 'large';
  if (absAmount >= 100) return 'medium';
  return 'small';
});
```

#### 数据结构的选择

**访问性能：**

- 数组：通过索引访问 O(1)，搜索 O(n)
- 对象：属性访问 O(1)
- Set：存在性检查 O(1)，无索引访问
- Map：键访问 O(1)，有序迭代

**修改性能：**

- 数组：末尾添加/删除 O(1)，中间操作 O(n)
- 对象：属性增删 O(1)
- Set：添加/删除 O(1)
- Map：添加/删除 O(1)

**内存效率：**

- 对象：如果键都是字符串，内存效率最高
- Map：如果需要非字符串键，或频繁增删，内存使用更优
- Set：去重场景下内存最优
- 数组：连续存储，内存效率好，但允许重复值

##### 总结建议

**选择数组当：**

- 需要有序的数据列表
- 需要使用数组的丰富方法（map, filter, reduce 等）
- 数据主要用于遍历和变换操作

**选择 Set 当：**

- 需要确保值的唯一性
- 主要进行存在性检查
- 需要高效的去重操作

**选择对象当：**

- 需要描述一个实体的属性
- 键主要是字符串
- 需要与 JSON 交互
- 需要在数据结构中包含方法

**选择 Map 当：**

- 键不是字符串或需要多种类型的键
- 需要频繁地增删键值对
- 需要保持插入顺序
- 对迭代性能有要求

记住，现代 JavaScript 的强大之处在于这些数据结构可以灵活组合使用。例如，一个对象的属性值可以是数组，数组的元素可以是 Map，Map 的值可以是 Set 等等。关键是理解每种数据结构的特点，并根据具体的使用场景做出最佳选择。



### 11.数字与日期处理

与许多编程语言不同，JavaScript只有一种数字类型，所有数字都以64位浮点数格式存储。

#### 数字基础

##### 浮点数精度：为什么0.1 + 0.2不等于0.3

这个现象的根源在于计算机如何表示小数。计算机使用二进制系统，而许多十进制小数无法在二进制中精确表示，就像1/3在十进制中无法精确表示为0.333...一样。

```javascript
// 经典的浮点数精度问题
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// 实际开发中的解决方案
const isEqual = (a, b, precision = 1e-10) => Math.abs(a - b) < precision;
console.log(isEqual(0.1 + 0.2, 0.3)); // true

// 或者使用toFixed进行比较
console.log((0.1 + 0.2).toFixed(10) === (0.3).toFixed(10)); // true
```

理解这个概念对于处理金融应用至关重要。在处理货币时，通常建议将金额转换为最小单位（如分）进行计算，然后再转换回原单位显示。

##### 类型转换的艺术：从字符串到数字的多种途径

JavaScript提供了多种将字符串转换为数字的方法，每种方法都有其特定的用途和行为特点。

| 方法/运算符               | 作用说明                                                     | 返回值类型        |
| ------------------------- | ------------------------------------------------------------ | ----------------- |
| **`Number()`**            | 将值严格转换为数字，整个字符串必须是有效数字，否则转换失败   | `number` 或 `NaN` |
| **一元加号 `+`**          | 将值转换为数字的简洁写法，效果等同于 `Number()`              | `number` 或 `NaN` |
| **`Number.parseInt()`**   | 从字符串开头解析整数，遇到非数字字符停止；可指定进制（默认 10） | `number` 或 `NaN` |
| **`Number.parseFloat()`** | 从字符串开头解析浮点数，遇到非数字字符停止                   | `number` 或 `NaN` |

```javascript
// 最直接的转换方式
console.log(Number('23')); // 23 - 严格转换，整个字符串必须是有效数字
console.log(Number('23px')); // NaN - 遇到非数字字符就失败

// 一元加号运算符：简洁的转换方式
console.log(+'23'); // 23 - 等同于Number('23')，但更简洁
console.log(+'23.5'); // 23.5

// parseInt：从字符串开头解析整数
console.log(Number.parseInt('30px', 10)); // 30 - 解析到非数字字符为止
console.log(Number.parseInt('px30', 10)); // NaN - 必须以数字开头
console.log(Number.parseInt('1010', 2)); // 10 - 二进制转换

// parseFloat：解析浮点数
console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(Number.parseFloat('2.5.3')); // 2.5 - 遇到第二个点停止解析
```

##### 数字验证：确保数据的可靠性

在处理用户输入或外部数据时，验证数字的有效性是防止程序错误的重要步骤。

| 方法                     | 作用说明                                                     | 返回值类型 |
| ------------------------ | ------------------------------------------------------------ | ---------- |
| **`Number.isNaN()`**     | 判断值是否为 `NaN`（且类型为 `number`），是检查 `NaN` 的最可靠方法 | `boolean`  |
| **`Number.isFinite()`**  | 判断值是否为有限数字，排除 `Infinity`、`-Infinity` 和 `NaN`  | `boolean`  |
| **`Number.isInteger()`** | 判断值是否为整数（包括形如 `23.0` 的整数形式浮点数）         | `boolean`  |
| `Number.isSafeInteger(value)`                         | 判断是否为安全整数（在 `-(2^53-1)` \~ `2^53-1` 范围内） | `boolean` |
| `Number.MAX_SAFE_INTEGER` / `Number.MIN_SAFE_INTEGER` | 最大/最小安全整数                                | `number`  |
| `Number.POSITIVE_INFINITY` / `Number.NEGATIVE_INFINITY` | 正/负无穷大         | `number` |
| `Number.MAX_VALUE` / `Number.MIN_VALUE`                 | JS 能表示的最大/最小正数 | `number` |


```javascript
// 检查NaN：最可靠的方法
console.log(Number.isNaN(+'20X')); // true - 无效转换结果
console.log(Number.isNaN(20)); // false - 有效数字
console.log(Number.isNaN('20')); // false - 注意：字符串'20'不是NaN

// 检查有限数字：过滤掉无穷大和NaN
console.log(Number.isFinite(20)); // true - 有限数字
console.log(Number.isFinite('20')); // false - 字符串，即使内容是数字
console.log(Number.isFinite(Infinity)); // false - 无穷大
console.log(Number.isFinite(NaN)); // false - NaN

// 检查整数：区分整数和浮点数
console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true - 23.0在JavaScript中就是整数23
console.log(Number.isInteger(23.1)); // false
```

#### 数学运算与舍入：精确控制数字的表现

Math对象是JavaScript中进行数学运算的核心工具箱。理解各种舍入方法的差异，特别是它们在处理负数时的不同行为，对于构建可靠的应用至关重要。

##### 常用数学运算

**`Math.sqrt(x)`：** 计算输入值 `x` 的**平方根**。

- **行为准则**：若 `x < 0`，结果为 `NaN`（不可用数值），需在调用前进行参数校验。


**`Math.max(...values)`：** 返回一组数值中的**最大值**。

- **行为准则**：如果参数列表为空，返回 `-Infinity`；应保证至少传入一个数值，以避免语义歧义。

**`Math.min(...values)`：** 返回一组数值中的**最小值**。

- **行为准则**：如果参数列表为空，返回 `Infinity`；建议在调用前对数组或参数做非空检查。

**`Math.PI`：** 表示圆周率 π 的**常量**，值约为 `3.141592653589793`。

- **应用场景**：几何计算中，避免手动硬编码，确保一致性与精度。

  ```javascript
  jsCopyEditMath.max(3, 7, -2, 0); // 7
  Math.max(...array);    // 若 array=[5, 9, 1]，则结果为 9
  
  jsCopyEditMath.min(3, 7, -2, 0); // -2
  Math.min(...array);    // 若 array=[5, 9, 1]，则结果为 1
  
  jsCopyEditconst radius = 5;
  const area = Math.PI * Math.pow(radius, 2); // 圆面积 ≈ 78.54
  ```

##### 舍入方法的深度理解

不同的舍入方法在处理正数和负数时表现不同，理解这些差异能帮您避免逻辑错误。

| 方法               | 作用说明                                                     | 返回值类型 |
| ------------------ | ------------------------------------------------------------ | ---------- |
| **`Math.round()`** | 四舍五入到最近的整数；`0.5` 及以上向上舍入，负数的 `-0.5` 向零舍入 | `number`   |
| **`Math.ceil()`**  | 向上取整（朝正无穷方向）                                     | `number`   |
| **`Math.floor()`** | 向下取整（朝负无穷方向）                                     | `number`   |
| **`Math.trunc()`** | 去掉小数部分，始终向零方向截断                               | `number`   |

```javascript
const number = 23.7;
const negativeNumber = -23.7;

// Math.round()：四舍五入到最近的整数
console.log(Math.round(number)); // 24
console.log(Math.round(negativeNumber)); // -24
console.log(Math.round(23.5)); // 24 - 0.5向上舍入
console.log(Math.round(-23.5)); // -23 - 负数的0.5向零舍入

// Math.ceil()：向上取整（朝正无穷方向）
console.log(Math.ceil(number)); // 24
console.log(Math.ceil(negativeNumber)); // -23 - 注意：-23.7向上是-23

// Math.floor()：向下取整（朝负无穷方向）
console.log(Math.floor(number)); // 23
console.log(Math.floor(negativeNumber)); // -24 - 注意：-23.7向下是-24

// Math.trunc()：简单截断小数部分
console.log(Math.trunc(number)); // 23
console.log(Math.trunc(negativeNumber)); // -23 - 始终向零方向截断

// 实际应用：创建灵活的舍入函数
const roundTo = (number, decimalPlaces) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
};

console.log(roundTo(23.6789, 2)); // 23.68
console.log(roundTo(23.6789, 0)); // 24
```

##### 随机数生成：从基础到实用

随机数在游戏、模拟和测试中都有重要应用。理解如何生成不同范围和类型的随机数是一项实用技能。

| 方法/函数                   | 作用说明                                                    | 返回值类型 |
| --------------------------- | ----------------------------------------------------------- | ---------- |
| **`Math.random()`**         | 返回一个 `[0, 1)` 之间的随机浮点数                          | `number`   |
| **`randomInt(min, max)`**   | 返回 `min` 到 `max`（含边界）的随机整数                     | `number`   |
| **`randomFloat(min, max)`** | 返回 `min` 到 `max`（含 `min`，不含 `max`）之间的随机浮点数 | `number`   |

```javascript
// 基础随机数：0到1之间
console.log(Math.random()); // 0.123456789...

// 生成指定范围的随机整数
const randomInt = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomInt(1, 6)); // 模拟骰子：1-6

// 生成指定范围的随机浮点数
const randomFloat = (min, max) => 
  Math.random() * (max - min) + min;

console.log(randomFloat(1.5, 3.5)); // 1.5-3.5之间的浮点数

// 实际应用：生成随机颜色
const randomColor = () => {
  const r = randomInt(0, 255);
  const g = randomInt(0, 255);
  const b = randomInt(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
};
```

##### 精确的小数位控制

在显示货币或测量数据时，精确控制小数位数是必需的技能。

| 方法/函数                              | 作用说明                                                     | 返回值类型 |
| -------------------------------------- | ------------------------------------------------------------ | ---------- |
| **`Number.prototype.toFixed(digits)`** | 将数字格式化为固定小数位数的字符串，不足位补 0，多余位四舍五入 | `string`   |
| `Number.prototype.toPrecision(precision)` | 返回指定有效数字位数的字符串（可能使用科学计数法）              | `string` |
| `Number.EPSILON`                          | JS 能表示的最小差值（约 `2.22e-16`），常用来处理浮点数精度问题 | `number` |


```javascript
const price = 2.345;

// toFixed()：固定小数位数，返回字符串
console.log(price.toFixed(0)); // "2"
console.log(price.toFixed(2)); // "2.35" - 注意四舍五入
console.log(price.toFixed(4)); // "2.3450" - 不足位数用0填充

// 转换回数字：使用一元加号
console.log(+price.toFixed(2)); // 2.35

// 实际应用：货币格式化函数
const formatCurrency = (amount, currency = 'CNY', decimals = 2) => {
  const formatted = amount.toFixed(decimals);
  const symbols = { CNY: '¥', USD: '$', EUR: '€' };
  return `${symbols[currency] || currency}${formatted}`;
};

console.log(formatCurrency(123.456)); // ¥123.46
console.log(formatCurrency(123.456, 'USD')); // $123.46
```

#### BigInt：处理超大整数的解决方案

当普通数字无法满足精度要求时，BigInt提供了处理任意大整数的能力。这在加密、科学计算和处理大型数据集时特别重要。

```javascript
// JavaScript数字的安全边界
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(2 ** 53 - 1); // 9007199254740991 - 相同的值

// 超出安全范围的问题
console.log(9007199254740992); // 9007199254740992
console.log(9007199254740993); // 9007199254740992 - 精度丢失！

// BigInt的创建方式
const bigNum1 = 9007199254740993n; // 在数字后添加n
const bigNum2 = BigInt(9007199254740993); // 使用BigInt构造函数
const bigNum3 = BigInt('9007199254740993'); // 从字符串创建（推荐）

console.log(bigNum1); // 9007199254740993n
console.log(typeof bigNum1); // "bigint"

// BigInt的运算规则
const regularNum = 23;
// console.log(bigNum1 * regularNum); // TypeError: 不能混合运算
console.log(bigNum1 * BigInt(regularNum)); // 207165350120610139n

// BigInt的限制
// console.log(Math.sqrt(bigNum1)); // TypeError: Math方法不支持BigInt
// console.log(bigNum1.toFixed(2)); // TypeError: BigInt没有toFixed方法
```

#### 日期处理：时间的艺术

##### 日期创建的多种方式

不同的日期创建方式适用于不同的场景。

```javascript
// 当前时间
const now = new Date();
console.log(now); // 当前日期和时间

// 从字符串解析（ISO 8601格式最可靠）
const dateFromISO = new Date('2023-12-25T15:30:00.000Z');
console.log(dateFromISO); // UTC时间

// 从日期字符串解析（注意时区问题）
const dateFromString = new Date('December 25, 2023 15:30:00');
console.log(dateFromString); // 本地时间

// 指定日期组件（最精确的方式）
// 注意：月份是0索引的！0=一月，11=十二月
const specificDate = new Date(2023, 11, 25, 15, 30, 0); // 2023年12月25日
console.log(specificDate);

// 从时间戳创建
const dateFromTimestamp = new Date(1703518200000);
console.log(dateFromTimestamp);
```

##### 日期组件的获取与操作

理解各种获取日期组件的方法，特别是它们返回值的特性，对于正确处理日期至关重要。

```javascript
const date = new Date(2023, 11, 25, 15, 30, 45); // 2023年12月25日 15:30:45

// 年份：完整的四位数年份
console.log(date.getFullYear()); // 2023

// 月份：0索引（0=一月，11=十二月）
console.log(date.getMonth()); // 11 (十二月)
console.log(date.getMonth() + 1); // 12 (转换为人类可读的月份)

// 日期：月份中的第几天（1-31）
console.log(date.getDate()); // 25

// 星期：0索引（0=星期天，6=星期六）
console.log(date.getDay()); // 1 (星期一)

// 时间组件
console.log(date.getHours()); // 15
console.log(date.getMinutes()); // 30
console.log(date.getSeconds()); // 45

// 时间戳：自1970年1月1日以来的毫秒数
console.log(date.getTime()); // 1703518245000
```

##### 日期计算：时间差的艺术

日期计算是许多应用的核心功能，从计算年龄到显示相对时间，都需要精确的日期运算。

```javascript
// 计算两个日期之间的天数差
const calcDaysPassed = (date1, date2) => {
  // 转换为毫秒数进行计算
  const diffInMs = Math.abs(date2 - date1);
  // 转换为天数：毫秒 -> 秒 -> 分钟 -> 小时 -> 天
  return Math.round(diffInMs / (1000 * 60 * 60 * 24));
};

const today = new Date();
const christmas = new Date(2023, 11, 25);
console.log(calcDaysPassed(today, christmas)); // 距离圣诞节的天数

// 测试相对时间函数
const testDates = [
  new Date(), // 今天
  new Date(Date.now() - 24 * 60 * 60 * 1000), // 昨天
  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 一周前
  new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) // 一年前
];
```

#### 国际化：让应用适应全球用户

Intl API是JavaScript处理国际化的强大工具。它不仅能格式化数字和日期，还能处理复杂的本地化需求。

##### 数字和货币的国际化格式

不同地区对数字和货币的显示习惯差异很大，Intl.NumberFormat 构造函数创建一个对象，可以根据指定的 locale (语言环境) 和 options (选项) 格式化数字。

```javascript
const amount = 1234567.89;

// 不同地区的数字格式
console.log(new Intl.NumberFormat('zh-CN').format(amount)); // 1,234,567.89
console.log(new Intl.NumberFormat('de-DE').format(amount)); // 1.234.567,89
console.log(new Intl.NumberFormat('en-IN').format(amount)); // 12,34,567.89

// 货币格式化
const formatCurrency = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

console.log(formatCurrency(amount, 'zh-CN', 'CNY')); // ¥1,234,567.89
console.log(formatCurrency(amount, 'en-US', 'USD')); // $1,234,567.89
console.log(formatCurrency(amount, 'de-DE', 'EUR')); // 1.234.567,89 €

// 百分比格式化
const percentage = 0.85;
const formatPercentage = (value, locale) => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1, // 最少保留小数位数
    maximumFractionDigits: 2
  }).format(value);
};

console.log(formatPercentage(percentage, 'zh-CN')); // 85.0%
console.log(formatPercentage(percentage, 'de-DE')); // 85,0 %

// 实际应用：多语言金融应用的格式化函数
const createFormatter = (locale, currency) => {
  return {
    currency: (value) => formatCurrency(value, locale, currency),
    number: (value) => new Intl.NumberFormat(locale).format(value),
    percent: (value) => formatPercentage(value, locale)
  };
};

const cnFormatter = createFormatter('zh-CN', 'CNY');
const usFormatter = createFormatter('en-US', 'USD');

console.log(cnFormatter.currency(12345)); // ¥12,345.00
console.log(usFormatter.currency(12345)); // $12,345.00
```

##### 日期的国际化显示

日期格式在不同文化中的差异更加显著，Intl.DateTimeFormat提供了灵活的解决方案。

```javascript
const date = new Date(2023, 11, 25, 15, 30, 0);

// 不同地区的日期格式
console.log(new Intl.DateTimeFormat('zh-CN').format(date)); // 2023/12/25
console.log(new Intl.DateTimeFormat('en-US').format(date)); // 12/25/2023
console.log(new Intl.DateTimeFormat('de-DE').format(date)); // 25.12.2023

// 自定义格式选项
const options = {
  year: 'numeric',
  month: 'long', // 'numeric', 'short', 'long'
  day: 'numeric',
  weekday: 'long', // 'short', 'long'
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'short'
};

console.log(new Intl.DateTimeFormat('zh-CN', options).format(date));
// 2023年12月25日星期一 15:30 GMT+8

console.log(new Intl.DateTimeFormat('en-US', options).format(date));
// Monday, December 25, 2023 at 3:30 PM GMT+8

// 实际应用：多语言日期显示组件
const createDateFormatter = (locale) => {
  return {
    short: new Intl.DateTimeFormat(locale),
    medium: new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    long: new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }),
    time: new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric'
    })
  };
};

const cnDateFormatter = createDateFormatter('zh-CN');
const usDateFormatter = createDateFormatter('en-US');

console.log(cnDateFormatter.long.format(date)); // 2023年12月25日星期一
console.log(usDateFormatter.long.format(date)); // Monday, December 25, 2023
```

#### 定时器：异步操作的时间控制

定时器是JavaScript中实现延迟执行和周期性任务的核心机制。理解它们的工作原理和最佳实践对于构建响应式应用至关重要。

##### setTimeout：延迟执行的艺术

setTimeout不仅仅是简单的延迟，它还涉及到JavaScript的事件循环和异步执行机制。

```javascript
// setTimeout(callback, delay, [arg1, arg2, ...])
// 返回一个计时器 ID，可以使用 clearTimeout(id) 来取消它
// 基础用法：延迟执行
console.log('开始');
const timeoutId = setTimeout(() => {
  console.log('延迟执行的代码');
}, 2000);
console.log('结束'); // 会立即执行，不等待setTimeout

// 传递参数给回调函数
const greetUser = (name, age) => {
  console.log(`你好，${name}！您今年${age}岁。`);
};

setTimeout(greetUser, 1000, '张三', 25);

// 实际应用：模拟API请求延迟
const simulateAPICall = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('API调用完成');
      resolve({ success: true, data });
    }, delay);
  });
};

// 使用示例
simulateAPICall({ userId: 123 }, 2000).then(result => {
  console.log('收到响应:', result);
});
```

##### setInterval：周期性任务的管理

setInterval适合处理需要重复执行的任务，但需要小心管理以避免内存泄漏和性能问题。

```javascript
// setInterval(callback, delay, [arg1, arg2, ...])
// 返回一个计时器 ID，可以使用 clearInterval(id) 来停止它。

// 实际应用：倒计时器实现
const createCountdown = (duration, onTick, onComplete) => {
  let timeLeft = duration;
  
  // 立即执行一次
  onTick(timeLeft);
  
  const timer = setInterval(() => {
    timeLeft--;
    onTick(timeLeft);
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      onComplete();
    }
  }, 1000);
  
  // 返回控制对象
  return {
    stop: () => clearInterval(timer),
    getTimeLeft: () => timeLeft
  };
};

// 使用倒计时器
const countdown = createCountdown(
  10, // 10秒倒计时
  (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    console.log(`剩余时间: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  },
  () => {
    console.log('倒计时结束！');
  }
);

// 5秒后手动停止倒计时（演示控制功能）
setTimeout(() => {
  countdown.stop();
  console.log('倒计时被手动停止');
}, 5000);
```





















































### * 学习路径与进阶方向

**立即可以探索的主题**

1. **闭包与模块模式**: 理解如何创建私有变量和模块化代码
2. **原型链与继承**: 掌握 JavaScript 的面向对象编程方式
3. **异步编程基础**: Promise、async/await 的原理和使用

**中级进阶主题**

1. **事件循环机制**: 深入理解异步代码的执行顺序
2. **性能优化策略**: 基于引擎特性的代码优化技巧
3. **错误处理模式**: 构建健壮的错误处理机制

**高级应用领域**

1. **框架原理理解**: 理解 React、Vue 等框架的底层实现
2. **工具链开发**: 构建自己的开发工具和库
3. **Node.js 服务端开发**: 将 JavaScript 应用到服务器环境





























## DOM

### 第一章：基础理论框架

#### 1.1 DOM本质与架构认知

**DOM的核心定义**

- DOM（Document Object Model）是HTML文档在内存中的结构化表示
- 浏览器解析HTML后构建的树状数据结构
- 动态的、活跃的数据结构，修改即时反映到页面

**DOM与Web API的技术层次**

```
┌─────────────────────────┐
│    运行时环境（浏览器）    │
├─────────────────────────┤
│    Web API层             │
│  ├─ DOM API             │
│  ├─ 定时器API           │
│  └─ 网络请求API         │
├─────────────────────────┤
│  JavaScript核心         │
│  (ECMAScript)           │
└─────────────────────────┘
```

**关键认知**：DOM并非JavaScript内置功能，而是浏览器提供的Web API

- **接口作用**：允许 JavaScript 与浏览器交互，动态地改变网页内容和结构。
- **核心能力**：
  - **创建、修改、删除** HTML 元素。
  - **设置** 元素的样式、类名和属性。
  - **监听和响应** 用户事件（如点击、滚动、按键）。

#### 1.2 DOM树结构组成

- **文档节点**：整个文档的根节点
- **元素节点**：对应HTML标签（`<body>`、`<div>`等）
- **文本节点**：标签内的实际文本内容
- **属性节点**：元素的属性（`class`、`id`、`src`等）

#### 1.3DOM节点类型和继承链

DOM 中的所有对象都继承自一个基础类型。这种继承关系意味着子类型可以访问父类型的方法和属性。

- **继承链**: `EventTarget` -> `Node` -> `Element` -> `HTMLElement` -> 具体元素 (如 `HTMLButtonElement`, `HTMLDivElement`)。
- **关键点**:
  - **EventTarget**: 提供了 `addEventListener()` 和 `removeEventListener()` 方法。几乎所有 DOM 节点都是 EventTarget。
  - **Node**: 提供了如 `textContent`, `childNodes`, `cloneNode()` 等基本属性和方法。
  - **Element**: 继承自 Node，并增加了与元素相关的属性和方法，如 `.innerHTML`, `.classList`, `.querySelector()`, `.closest()`。
  - **HTMLElement**: 继承自 Element，提供了所有 HTML 元素共有的属性，如 `.style`。
  - **具体元素**: 继承自 HTMLElement，并拥有自己独特的属性（例如 `<a>` 元素的 `href`）。

### 第二章：元素样式与属性操作

#### 2.1 元素选择策略体系

**现代选择器方法**

```javascript
// 统一接口，推荐使用
document.querySelector('.message')      // 单个元素
document.querySelectorAll('.button')   // 元素集合

// 特定用途方法
document.getElementById('score--1')     // ID选择，性能略优
```

**选择器类型完整清单**

- 类选择器：`.className`
- ID选择器：`#elementId`
- 标签选择器：`tagName`
- 属性选择器：`[attribute="value"]`
- 复合选择器：`div.container .item`



#### 2.2 元素创建与配置

**创建元素**

创建的元素存在于内存中

尚未成为可见DOM树的一部分

```javascript
const element = document.createElement('tagName');
```

**文本内容处理**

- **`innerHTML`** - 用于HTML内容
- **`textContent`** - 用于纯文本
- 或通过创建和追加子元素

```javascript
// 纯文本操作（安全，推荐）
element.textContent = '新内容';

// HTML内容操作（慎用，XSS风险）
element.innerHTML = '<strong>新内容</strong>';

// 表单元素特殊处理
inputElement.value = '输入值';
```

安全性原则：优先使用`textContent`，避免XSS攻击风险

**元素插入**

作为子元素插入

- **`append()`** - 添加为最后一个子元素
- **`prepend()`** - 添加为第一个子元素

相对位置插入

- **`before()`** - 在元素前插入
- **`after()`** - 在元素后插入

**元素移除**

**完整示例**

```javascript
// 1. 选择容器元素
const header = document.querySelector('.header');

// 2. 创建新元素
const message = document.createElement('div');

// 3. 配置元素
message.classList.add('cookie-message');
message.innerHTML = '我们使用cookie来改善功能。<button class="btn btn--close">知道了!</button>';

// 4. 插入DOM
header.prepend(message);

// 5. 添加交互逻辑
document.querySelector('.btn--close').addEventListener('click', function() {
    message.remove(); // 6. 移除元素
});
```



#### 2.3 样式操作的层次化方法

##### 一、内联样式操作---适用于动态、程序化的外观更改

**概念特征**

- **访问方式**：通过`style`属性
- **特异性**：高特异性，覆盖大多数CSS规则
- **适用场景**：动态样式变更，需要优先级的情况
- **局限性**：只能设置值，读取复杂

**操作方法**

设置样式

```javascript
// 直接设置内联样式
element.style.backgroundColor = '#37383d';
element.style.width = '120%';
element.style.fontSize = '16px';
```

读取样式限制

- `element.style`只返回内联样式
- 无法获取CSS文件中定义的样式
- 需要使用`getComputedStyle()`获取实际渲染样式

计算样式读取

```javascript
const computedStyle = getComputedStyle(element);
console.log(computedStyle.color);    // 实际渲染颜色
console.log(computedStyle.height);   // 计算出的高度
console.log(computedStyle.display);  // 当前显示模式
```

CSS自定义属性操作

```javascript
// 全局主题变量控制
document.documentElement.style.setProperty('--color-primary', 'orangered');
document.documentElement.style.setProperty('--font-size-base', '14px');
```

------

##### 二、HTML属性管理---用于存储和访问元数据信息

**属性分类体系**

标准属性

- **特征**：W3C规范定义的属性（`alt`, `src`, `href`等）
- **访问**：可直接作为对象属性操作
- **类型转换**：自动处理数据类型

非标准属性

- **特征**：自定义或非规范属性
- **访问**：必须使用`getAttribute()`/`setAttribute()`
- **类型**：始终返回字符串类型

**操作实现**

标准属性操作

```javascript
const logo = document.querySelector('.nav__logo');

// 读取标准属性
console.log(logo.alt);          // 直接属性访问
console.log(logo.src);          // 获取完整URL
console.log(logo.className);    // 类名字符串

// 设置标准属性
logo.alt = '美丽的极简主义标志';
logo.src = '/images/new-logo.png';
```

非标准属性操作

```javascript
// 读取非标准属性
console.log(logo.getAttribute('designer'));
console.log(logo.getAttribute('company'));

// 设置非标准属性
logo.setAttribute('company', 'Bankist');
logo.setAttribute('version', '2.1');

// 移除属性
logo.removeAttribute('designer');
```

数据属性（Dataset）

```javascript
// HTML: <img data-version-number="3.0" data-last-modified="2023-01-15">

// 读取数据属性（自动驼峰转换）
console.log(logo.dataset.versionNumber);   // "3.0"
console.log(logo.dataset.lastModified);    // "2023-01-15"

// 设置数据属性
logo.dataset.userId = '12345';
logo.dataset.apiEndpoint = '/api/v1/users';
```

------

##### 三、CSS类控制系统---提供最强大和灵活的样式系统集成方式

**ClassList API优势**

- **安全性**：防止意外覆写现有类
- **灵活性**：支持多类操作
- **自动处理**：边缘情况和重复类处理
- **返回值**：布尔值反馈操作结果

**核心方法**

基础操作

```javascript
const element = document.querySelector('.target');

// 添加类（支持多个）
element.classList.add('active');
element.classList.add('highlight', 'animated', 'fadeIn');

// 移除类
element.classList.remove('inactive');
element.classList.remove('old-style', 'deprecated');

// 切换类（智能添加/移除）
element.classList.toggle('visible');        // 不存在时添加，存在时移除
element.classList.toggle('active', true);   // 强制添加
element.classList.toggle('hidden', false);  // 强制移除

// 检查类存在性
if (element.classList.contains('active')) {
    console.log('元素处于活动状态');
}
```

高级操作

```javascript
// 替换类
element.classList.replace('old-theme', 'new-theme');

// 遍历所有类
element.classList.forEach(className => {
    console.log(`类名: ${className}`);
});

// 类列表长度
console.log(`总共有 ${element.classList.length} 个类`);
```

##### 错误处理与边界情况

```javascript
// 安全的样式读取
function getElementStyle(element, property) {
    try {
        const computed = getComputedStyle(element);
        return computed.getPropertyValue(property);
    } catch (error) {
        console.warn(`无法获取样式属性 ${property}:`, error);
        return null;
    }
}

// 安全的属性操作
function safeSetAttribute(element, name, value) {
    if (element && typeof name === 'string') {
        element.setAttribute(name, String(value));
        return true;
    }
    return false;
}
```

兼容性注意事项

- `classList`在IE10+支持
- `dataset`需要IE11+
- `getComputedStyle()`广泛支持但返回值格式可能不同

### 第三章：事件驱动编程模型

#### 3.1 事件系统工作机制

**事件生命周期**

1. 事件触发（用户操作）
2. 事件对象创建（浏览器构建）
3. 事件传播（捕获→目标→冒泡）
4. 事件处理（执行处理函数）

#### 3.2 事件传播三阶段模型

##### 1. 捕获阶段（Capturing Phase）

- **路径**：从文档根节点向下穿越DOM树至目标元素
- **触发条件**：`addEventListener`的`capture`选项设置为`true`
- **执行顺序**：从最外层祖先元素到目标元素的父元素

```javascript
// 捕获阶段事件监听
document.querySelector('.container').addEventListener('click', function(e) {
    console.log('捕获阶段：容器被点击');
}, { capture: true });
```

##### 2. 目标阶段（Target Phase）

- **触发时机**：事件到达实际触发它的元素时
- **监听器执行**：直接附加到目标元素的事件监听器触发
- **阶段特征**：`e.eventPhase === Event.AT_TARGET`

##### 3. 冒泡阶段（Bubbling Phase）

- **路径**：从目标元素向上冒泡回到文档根节点
- **默认行为**：大多数事件处理在此阶段发生
- **监听器条件**：`capture: false`（默认值）的监听器触发

```javascript
// 完整的事件传播演示
function logEventPhase(e) {
    const phases = {
        1: '捕获阶段',
        2: '目标阶段', 
        3: '冒泡阶段'
    };
    console.log(`${phases[e.eventPhase]}: ${e.currentTarget.className}`);
}

// 在不同元素上添加监听器观察传播过程
document.addEventListener('click', logEventPhase, true);  // 捕获
document.querySelector('.parent').addEventListener('click', logEventPhase);
document.querySelector('.child').addEventListener('click', logEventPhase);
```

#### 3.3 事件委托模式

事件委托是一种利用事件冒泡的强大模式。它将事件监听器添加到父元素上，而不是为每个子元素都添加一个监听器。

核心优势

- **性能优化**：减少内存占用，特别适用于大量子元素场景
- **动态适应**：自动处理后续动态添加的元素
- **维护简化**：集中管理事件处理逻辑

实现策略

```javascript
// 高效的事件委托实现
document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();
    
    // 精确的目标元素识别
    if (e.target.classList.contains('nav__link')) {
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// 更复杂的委托场景处理
document.querySelector('.data-table').addEventListener('click', function(e) {
    // 使用closest()方法向上查找匹配的祖先
    const row = e.target.closest('tr');
    const deleteBtn = e.target.closest('.delete-btn');
    const editBtn = e.target.closest('.edit-btn');
    
    if (deleteBtn && row) {
        handleDelete(row.dataset.id);
    } else if (editBtn && row) {
        handleEdit(row.dataset.id);
    }
});
```

#### 3.4 事件处理器设计模式

##### 事件对象深度解析

###### 关键属性

```javascript
function eventHandler(e) {
    console.log('目标元素:', e.target);           // 实际触发事件的元素
    console.log('当前元素:', e.currentTarget);    // 绑定事件监听器的元素
    console.log('事件类型:', e.type);            // 'click', 'keydown'等
    console.log('事件阶段:', e.eventPhase);      // 1,2,3 对应三个传播阶段
    console.log('时间戳:', e.timeStamp);         // 事件发生的时间戳
}
```

###### 行为控制方法

```javascript
function controlEventBehavior(e) {
    // 阻止默认行为
    e.preventDefault();    // 阻止链接跳转、表单提交等
    
    // 阻止事件传播
    e.stopPropagation();   // 阻止事件继续冒泡或捕获
    
    // 立即停止传播
    e.stopImmediatePropagation(); // 同时阻止当前元素上的其他监听器
}

// 条件性阻止默认行为
document.querySelector('form').addEventListener('submit', function(e) {
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    if (!email || !email.includes('@')) {
        e.preventDefault();
        showError('请输入有效的邮箱地址');
    }
});
```

##### 事件类型分类体系

###### 鼠标事件

```javascript
const mouseEvents = {
    'click': '单击事件',
    'dblclick': '双击事件',
    'mousedown': '鼠标按下',
    'mouseup': '鼠标释放',
    'mouseover': '鼠标进入（冒泡）',
    'mouseout': '鼠标离开（冒泡）',
    'mouseenter': '鼠标进入（不冒泡）',
    'mouseleave': '鼠标离开（不冒泡）',
    'mousemove': '鼠标移动'
};
```

###### 键盘事件

```javascript
document.addEventListener('keydown', function(e) {
    console.log('按键代码:', e.code);        // 'KeyA', 'Space'
    console.log('按键值:', e.key);          // 'a', ' '
    console.log('修饰键状态:', {
        ctrl: e.ctrlKey,
        shift: e.shiftKey,
        alt: e.altKey,
        meta: e.metaKey
    });
});
```

##### 高级事件处理模式

###### 事件节流与防抖

```javascript
// 防抖：延迟执行，重复触发时重新计时
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// 节流：限制执行频率
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 应用场景
const debouncedSearch = debounce(performSearch, 300);
const throttledScroll = throttle(updateScrollPosition, 16);

document.querySelector('#search').addEventListener('input', debouncedSearch);
window.addEventListener('scroll', throttledScroll);
```

###### 自定义事件

```javascript
// 创建和分发自定义事件
function createCustomEvent(name, data) {
    return new CustomEvent(name, {
        detail: data,
        bubbles: true,
        cancelable: true
    });
}

// 触发自定义事件
const userLoginEvent = createCustomEvent('userLogin', {
    userId: '12345',
    timestamp: Date.now()
});
document.dispatchEvent(userLoginEvent);

// 监听自定义事件
document.addEventListener('userLogin', function(e) {
    console.log('用户登录:', e.detail);
    updateUI(e.detail.userId);
});
```

##### 错误处理与调试策略

###### 事件监听器管理

```javascript
class EventManager {
    constructor() {
        this.listeners = new Map();
    }
    
    addListener(element, event, handler, options = {}) {
        const key = `${element}:${event}`;
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        
        const wrappedHandler = (e) => {
            try {
                handler(e);
            } catch (error) {
                console.error(`事件处理错误 ${event}:`, error);
            }
        };
        
        element.addEventListener(event, wrappedHandler, options);
        this.listeners.get(key).push({ handler, wrappedHandler, options });
    }
    
    removeAllListeners() {
        this.listeners.forEach((handlers, key) => {
            const [element, event] = key.split(':');
            handlers.forEach(({ wrappedHandler, options }) => {
                element.removeEventListener(event, wrappedHandler, options);
            });
        });
        this.listeners.clear();
    }
}
```

###### 调试工具

```javascript
// 事件传播可视化调试器
function debugEventPropagation(selector) {
    document.querySelectorAll(selector).forEach(element => {
        ['capture', 'bubble'].forEach(phase => {
            const capture = phase === 'capture';
            element.addEventListener('click', function(e) {
                console.log(`${phase}阶段 - 元素: ${element.tagName}.${element.className}`);
            }, capture);
        });
    });
}

// 使用示例
debugEventPropagation('*'); // 调试所有元素的事件传播
```

### DOM遍历和导航

#### 向下遍历：访问子元素

当你需要从父元素开始查找其内部的特定元素时，向下遍历技术就派上了用场。这里有两个重要的属性需要区分：

`children` 属性返回一个实时的 HTMLCollection，包含所有直接子元素。这个集合会自动更新，当DOM结构发生变化时，集合内容也会相应改变。更重要的是，它只包含元素节点，过滤掉了文本节点和注释节点。

相比之下，`childNodes` 属性返回所有类型的子节点，包括文本节点、注释节点和元素节点。在实际开发中，文本节点（比如元素间的空白）通常会干扰我们的逻辑，所以 `children` 往往是更好的选择。

```javascript
const header = document.querySelector('.header');

// 获取所有直接子元素（推荐方式）
console.log(header.children); // HTMLCollection of element children only

// 获取所有子节点（包括文本节点）
console.log(header.childNodes); // NodeList including text nodes
```

对于快速访问第一个或最后一个子元素，`firstElementChild` 和 `lastElementChild` 提供了优雅的解决方案。这些属性自动跳过可能存在的文本节点，直接返回你需要的元素：

```javascript
// 访问边界子元素
const firstChild = header.firstElementChild; // 第一个元素子节点
const lastChild = header.lastElementChild;   // 最后一个元素子节点

// 这比数组访问更可靠
// header.children[0] 可能会因为空白文本节点而出现意外结果
```

#### 向上遍历：查找祖先元素

向上遍历在事件处理和动态内容操作中特别有用。`parentElement` 属性让你能够访问直接的父元素，但真正强大的是 `closest()` 方法。

`closest()` 方法从当前元素开始，沿着DOM树向上搜索，直到找到第一个匹配给定CSS选择器的祖先元素。如果没有找到匹配的元素，它返回 `null`。这个方法在事件委托和组件化开发中极其有用：

```javascript
const button = document.querySelector('.btn');

// 直接父元素访问
const directParent = button.parentElement;

// 查找特定类型的祖先元素
const containingSection = button.closest('.section');  // 找到最近的 .section 祖先
const containingForm = button.closest('form');         // 找到最近的表单祖先
const containingModal = button.closest('[data-modal]'); // 找到最近的模态框祖先
```

这种方法比手动循环遍历父元素要简洁得多，而且更加语义化。它让你的代码表达出真实的意图：找到承载特定功能的容器元素。

#### 横向遍历：导航兄弟元素

在构建导航菜单、标签组件或轮播图时，你经常需要在同级元素间移动。`previousElementSibling` 和 `nextElementSibling` 属性为此提供了直接的解决方案：

```javascript
const currentTab = document.querySelector('.tab--active');

// 获取相邻的标签页
const previousTab = currentTab.previousElementSibling;
const nextTab = currentTab.nextElementSibling;

// 安全地检查兄弟元素是否存在
if (nextTab) {
    // 激活下一个标签页
    currentTab.classList.remove('tab--active');
    nextTab.classList.add('tab--active');
}
```

注意这些属性同样会跳过文本节点，只返回元素节点。这确保了你获得的是真正的功能性兄弟元素，而不是无关的空白文本。

### 高级技术：Intersection Observer API

这是一个现代浏览器 API，可以异步地观察目标元素与其祖先元素或顶级文档视窗（viewport）的交叉状态的变化。它非常高效，避免了在 scroll 事件中进行大量计算。你不需要持续检查元素位置，而是定义阈值并仅在可见性越过这些边界时接收回调。

配置选项：

- root: 参照物元素，默认为视窗。
- threshold: 一个 0-1 之间的数字或数组，表示目标元素可见度达到多少时触发 callback。0 表示刚进入或离开视窗，1 表示完全可见。
- rootMargin: 扩展或收缩 root 的边界，类似于 CSS margin。

```javascript
// 基本观察器设置
const observer = new IntersectionObserver(callbackFunction, {
    root: null, // 相对于视口观察
    threshold: 0.1, // 当10%可见时触发
    rootMargin: '0px 0px -100px 0px' // 将底部边界收缩100px
});
```

##### 实际应用：粘性导航

粘性导航演示了Intersection Observer如何替换低效的滚动事件处理程序。你不需要持续检查滚动位置，而是观察标题元素何时离开视口并相应地切换导航可见性。

```javascript
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
    const [entry] = entries; // 解构第一个条目
    
    if (!entry.isIntersecting) {
        nav.classList.add('sticky'); // 标题不在视图中，显示粘性导航
    } else {
        nav.classList.remove('sticky'); // 标题可见，隐藏粘性导航
    }
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px` // 考虑导航高度
});

headerObserver.observe(header);
```

`rootMargin`调整确保粘性导航在标题在其后面消失时准确出现，创建无缝的视觉连续性。这种技术比监听滚动事件并手动计算位置要高效得多。

##### 实际应用：渐进式区块显示

区块显示通过在用户滚动页面时显示内容来创建引人入胜的滚动动画。观察器在区块变得部分可见时触发，创建渐进式披露的感觉。

```javascript
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target); // 显示后停止观察
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15 // 当15%可见时触发
});

// 初始化隐藏区块并开始观察
allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});
```

显示每个区块后的`unobserve()`调用对性能至关重要，一旦区块被显示，就不需要继续观察它。

##### 实际应用：图片懒加载

图片懒加载通过推迟图片下载直到需要时显著改善初始页面加载性能。这种技术对图片密集的页面或带宽有限的移动用户特别有价值。

HTML结构在`src`属性中使用低分辨率占位符图片，同时将高分辨率URL存储在`data-src`属性中：

```javascript
<img src="img/digital-lazy.jpg" data-src="img/digital.jpg" class="lazy-img" alt="计算机">
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    
    // 用高质量图片替换src
    entry.target.src = entry.target.dataset.src;
    
    // 只有在新图片加载后才移除模糊滤镜
    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img');
    });
    
    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px' // 在进入视口前200px开始加载
});

imgTargets.forEach(img => imgObserver.observe(img));
```

`load`事件监听器确保模糊滤镜在高质量图片完成加载之前不会被移除，防止用户看到加载过程。正的`rootMargin`在图片变得可见之前开始加载它们，减少感知的加载时间。

### 第四章：架构设计模式

#### 4.1 代码组织与重构原则

**DRY原则实现**

```javascript
// 重构前：重复代码
document.querySelector('.message').textContent = '消息1';
document.querySelector('.message').textContent = '消息2';

// 重构后：函数封装
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
displayMessage('消息1');
displayMessage('消息2');
```

#### 4.2 状态管理策略

**状态初始化模式**

```javascript
const init = function () {
  // 状态重置
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  
  // UI同步更新
  // ... DOM更新代码
};
```

**状态同步原则**：程序状态与界面状态必须保持一致性

#### 4.3 动态内容生成技术

**模板字符串应用**

```javascript
// 动态文件名生成
diceEl.src = `dice-${dice}.png`;

// 动态选择器构建
document.getElementById(`current--${activePlayer}`).textContent = currentScore;
```

#### 4.4. 构建复杂UI组件

##### 标签页界面组件

标签页界面演示了几个高级DOM概念协同工作：事件委托、用于状态管理的数据属性，以及基于类的样式过渡。

关键洞察是使用数据属性在标签按钮和其对应内容面板之间创建关系。每个标签按钮都有一个`data-tab`属性，与内容面板的类名或ID中的数字匹配。

```javascript
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
    // 使用closest()处理子元素上的点击
    const clicked = e.target.closest('.operations__tab');
    
    // 守卫条件：忽略标签外的点击
    if (!clicked) return;
    
    // 从所有标签和内容中移除active类
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    tabsContent.forEach(content => content.classList.remove('operations__content--active'));
    
    // 激活被点击的标签
    clicked.classList.add('operations__tab--active');
    
    // 使用数据属性激活对应内容
    const activeTab = clicked.dataset.tab;
    document.querySelector(`.operations__content--${activeTab}`)
        .classList.add('operations__content--active');
});
```

这种方法是可扩展的，添加新标签只需要HTML更改，不需要JavaScript修改。事件委托模式确保无论标签数量如何都能获得高效性能。

这种模式的美妙之处在于它的简洁性和可维护性。通过使用数据属性来建立关系，你创建了一个声明性系统，新的标签可以简单地通过在HTML中添加适当的属性来工作。

##### 高级滑块/轮播组件

复杂的滑块组件演示了状态管理、键盘可访问性和多种导航方法。核心原理涉及使用CSS变换水平定位所有幻灯片，然后更改这些变换以将不同的幻灯片带入视图。

```javascript
const slider = function() {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');
    
    let curSlide = 0;
    const maxSlide = slides.length - 1;
    
    // 核心函数：相对于当前幻灯片定位所有幻灯片
    const goToSlide = function(slide) {
        slides.forEach((s, index) => {
            s.style.transform = `translateX(${100 * (index - slide)}%)`;
        });
    };
    
    // 导航函数
    const nextSlide = function() {
        if (curSlide === maxSlide) {
            curSlide = 0; // 循环到开始
        } else {
            curSlide++;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };
    
    const prevSlide = function() {
        if (curSlide === 0) {
            curSlide = maxSlide; // 循环到结束
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };
    
    // 创建导航点
    const createDots = function() {
        slides.forEach((_, index) => {
            dotContainer.insertAdjacentHTML('beforeend', 
                `<button class="dots__dot" data-slide="${index}"></button>`);
        });
    };
    
    const activateDot = function(slide) {
        document.querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };
    
    // 事件监听器
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);
    
    // 键盘导航
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // 使用事件委托的点导航
    dotContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dots__dot')) {
            const slide = e.target.dataset.slide;
            goToSlide(slide);
            activateDot(slide);
            curSlide = Number(slide);
        }
    });
    
    // 初始化滑块
    const init = function() {
        goToSlide(0);
        createDots();
        activateDot(0);
    };
    
    init();
};

// 初始化滑块
slider();
```

这个组件将其所有功能封装在一个函数中，防止全局变量污染，同时提供完整的滑块功能，包括鼠标、键盘和点导航。

这种组件架构模式展示了如何创建可重用的UI元素。

### 第五章：实战应用模式

#### 5.1 用户交互设计模式

**状态切换实现**

```javascript
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // 二元状态切换
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
```

#### 5.2 防御性编程实践

**输入验证与错误处理**

```javascript
if (!guess) {
  displayMessage('⛔️ No number!');
  return;
}

// 游戏状态控制
if (playing) {
  // 执行游戏逻辑
}
```

#### 5.3 用户体验优化

**即时反馈机制**

- 输入验证：检查有效性
- 视觉反馈：状态变化可视化
- 状态提示：清晰的用户引导

#### 5.4. 页面生命周期和脚本加载优化

理解页面生命周期事件和脚本加载策略对于最佳性能和用户体验至关重要。这些概念决定了你的代码何时执行以及它如何影响页面加载速度。

##### DOM生命周期事件

浏览器在处理HTML文档时触发特定事件，理解它们的时机帮助你在最佳时刻执行代码。

`DOMContentLoaded`在HTML文档完全加载和解析后触发，但在样式表、图片和其他外部资源完成加载之前。这通常是运行JavaScript的最佳时机，因为DOM已准备好进行操作，但你不会不必要地等待图片或其他资产。

```javascript
document.addEventListener('DOMContentLoaded', function(e) {
    console.log('DOM完全构建', e);
    // 初始化应用程序的完美时机
});
```

- **`load`**: 当整个页面及所有依赖资源（如样式表、图像）都已完成加载时触发。
- **`beforeunload`**: 当用户即将离开页面时（如关闭标签页）触发，可用于提示用户有未保存的更改。

##### 脚本加载策略 (`async` vs `defer`)


在 `<head>` 中加载脚本时，`async` 和 `defer` 属性可以优化性能：

- **`<script src="..."></script>` (无属性)**:
  - **阻塞** HTML 解析。浏览器必须先下载并执行脚本，然后才能继续解析页面的其余部分。

- **`<script async src="..."></script>`**:
  - **异步**下载脚本，不阻塞 HTML 解析。
  - 下载完成后**立即执行**，此时可能会阻塞 HTML 解析。
  - **不保证执行顺序**。适合用于独立的第三方脚本，如谷歌分析。

- **`<script defer src="..."></script>`**:
  - **异步**下载脚本，不阻塞 HTML 解析。
  - 在 HTML 解析**完成后**、`DOMContentLoaded` 事件触发**之前**执行。
  - **保证执行顺序**（按照它们在 HTML 中出现的顺序）。
  - **这是现代 Web 应用的最佳选择**，既不阻塞页面渲染，又能保证脚本的执行时机和顺序。

## oop
### 什么是面向对象编程 (OOP)?

面向对象编程是一种基于**对象**概念的编程范式，它将数据和操作数据的方法组织在一起。

**核心思想**: 使用对象来模拟现实世界或抽象概念（用户、待办事项、UI组件等），每个对象都包含相关的数据（属性）和行为（方法）。

**基本特征**:

- **自包含性**: 对象是独立的代码单元，封装了相关的数据和行为
- **模块化**: 对象作为应用程序的构建块，通过明确定义的接口相互交互
- **可维护性**: 良好的OOP设计使代码更易于理解、修改和扩展
- **公共接口 (Public Interface/API)**: 对象之间的交互通过一个公共接口（API）进行，即对象外部的代码可以访问和使用的方法。

### JavaScript OOP vs 经典OOP

#### 经典OOP (基于类)

- **类**: 定义对象结构和行为的蓝图或模板
- **实例**: 根据类创建的具体对象
- **行为复制**: 方法从类复制到每个实例

-   **对象链接**: 对象会链接到一个**原型对象 (prototype object)**。

#### OOP 的四大支柱

1. **封装 (Encapsulation)**: 将属性和方法保持在类的**内部**，使其不能从外部直接访问。可以暴露一些方法作为公共接口（API）。现代 JavaScript 通过**私有字段 (private fields)**（使用 `#` 前缀）来实现。

2. **抽象 (Abstraction)**: 隐藏复杂的实现细节，只向外暴露必要的功能。

3. **继承 (Inheritance)**: 创建基于现有类的新类，实现代码重用和层次结构。

   **最佳实践**: 优先使用组合而非继承。继承应该表示"is-a"关系，而不仅仅是为了代码重用。

4. **多态 (Polymorphism)**: 同一接口的不同实现，允许对象以不同方式响应相同的方法调用。用一个通用接口处理不同类型的对象。

### 在 JavaScript 中实现 OOP 的三种方式

#### 1. 构造函数 (Constructor Functions) - 传统方式

通过 `new` 关键字调用一个函数来创建实例。这是 JavaScript 中传统的 OOP 实现方式。

```javascript
// 构造函数 - 首字母大写是约定
function Person(firstName, birthYear) {
  // 实例属性
  this.firstName = firstName;
  this.birthYear = birthYear;
  
  // ❌ 错误做法：在构造函数中定义方法
  // this.calcAge = function() {
  //   return 2024 - this.birthYear;
  // };
  // 这样每个实例都会创建一个新的函数，浪费内存
}

// ✅ 正确做法：将方法添加到原型上
Person.prototype.calcAge = function() {
  return 2024 - this.birthYear;
};

// 静态方法 - 直接添加到构造函数上
Person.species = function() {
  return 'Homo Sapiens';
};

// ❌ 忘记使用new关键字
const person1 = Person('Alice', 1995); // person1是undefined
console.log(window.firstName); // 'Alice' - 污染了全局对象

// ✅ 使用new关键字创建示例
const person2 = new Person('Alice', 1995);
```

**`new`操作符的完整工作流程**:

1. 创建一个新的空对象 `{}`
2. 将构造函数的`this`绑定到这个新对象
3. 新对象的`__proto__`链接到构造函数的`prototype`
4. 执行构造函数代码
5. 如果构造函数没有显式返回对象，则返回新创建的对象

##### 原型 (Prototypes)

为了让所有实例共享方法（而不是每个实例都创建一份副本），我们将方法添加到构造函数的 `prototype` 属性上。

```javascript
// 所有 Person 的实例都会通过原型链继承这个方法
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge(); // 47
```

`jonas` 对象本身没有 `calcAge` 方法，它通过原型链（`__proto__`）在 `Person.prototype` 上找到了该方法并执行。

#### 2. ES6 类 (ES6 Classes) \- 现代推荐方式

ES6 引入了 `class` 语法，它只是构造函数和原型继承的**“语法糖”**，让代码看起来更像传统的 OOP 语言，但底层工作原理完全相同。

```javascript
class Person {
  constructor(fullName, birthYear) {
    // 公共字段 - 所有实例共享的属性
    species = 'Homo Sapiens';  
      
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // 实例方法会自动添加到 .prototype 属性上
  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

class Student extends Person {
  // 公共字段 (类似实例属性，但无需在构造函数中定义)
  university = 'University of Lisbon';
  // 私有字段 (#)
  #studyHours = 0;
  #course; // 私有字段必须先声明

  constructor(fullName, birthYear, startYear, course) {
    // 必须首先调用父类的构造函数
    super(fullName, birthYear);
    // 实例属性
    this.startYear = startYear;
    this.#course = course;
  }

  // 公共方法，类方法间不需要逗号
  introduce() {
    console.log(`I study ${this.#course} at ${this.university}`);
  }

  // 私有方法 (#)
  #makeCoffee() {
    return 'Here is a coffee for you ☕';
  }
  
  // Getter 和 Setter
  get testScore() { return this._testScore; }
  set testScore(score) { this._testScore = score < 20 ? score : 0; }

  // 静态方法 (只能通过类本身调用)
  static printCurriculum() {
    console.log('There are 10 subjects');
  }
}

const jonas = new Student('Jonas', 2020, 2037, 'Medicine');
jonas.introduce(); // "I study Medicine at University of Lisbon"
// jonas.#makeCoffee(); // 语法错误：外部无法访问私有方法
Student.printCurriculum(); // "There are 10 subjects"
```

**ES6类的重要特性**:

- **严格模式**: 类体自动运行在严格模式下
- **不可提升**: 类声明不会被提升，必须先声明后使用
- **constructor是必需的**: 即使为空也要显式定义



#### 3. `Object.create()`\- 最直接的原型设置

`Object.create()` 方法创建一个新对象，并使用一个现有的对象作为新创建对象的原型。这是最直接地设置原型链接的方式。

```javascript
// 定义原型对象
const PersonProto = {
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
  
  calcAge() {
    return 2024 - this.birthYear;
  }
};

// 创建对象并设置原型
const steven = Object.create(PersonProto);
steven.init('Steven', 2002);

// 或者在创建时直接传入属性
const sarah = Object.create(PersonProto, {
  name: {
    value: 'Sarah',
    writable: true,
    enumerable: true,
    configurable: true
  },
  birthYear: {
    value: 1998,
    writable: true,
    enumerable: true,
    configurable: true
  }
});
```
**Object.create()的优势**:

- 最直接地控制原型链
- 可以创建没有原型的对象 `Object.create(null)`
- 精确控制属性描述符

---

### 继承的深入理解

#### 使用构造函数实现继承

这需要手动关联父类和子类，过程较为繁琐。

```javascript
// 父类构造函数
function Person(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
}

Person.prototype.calcAge = function() {
  return 2024 - this.birthYear;
};

//+ 子类构造函数
function Student(firstName, birthYear, course) {
  // 调用父类构造函数 - 设置继承的属性
  Person.call(this, firstName, birthYear);
  this.course = course;
}

// ❌ 错误的原型链接方式
// Student.prototype = Person.prototype; // 这会让两个类共享同一个原型对象

// ✅ 正确的原型链接 - 创建新对象作为Student的原型
Student.prototype = Object.create(Person.prototype);

// 修复constructor指向
Student.prototype.constructor = Student;

// 添加子类特有的方法
Student.prototype.introduce = function() {
  return `我是${this.firstName}，我学习${this.course}`;
};

// 重写父类方法 (多态)
Student.prototype.calcAge = function() {
  return `我${2024 - this.birthYear}岁了，作为学生感觉更成熟`;
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike.introduce());
console.log(mike.calcAge()); // 调用重写后的版本
```

**原型链查找过程详解**: 当调用 `mike.calcAge()` 时：

1. 在 `mike` 对象本身查找 → 没找到
2. 在 `Student.prototype` 查找 → 找到了重写的版本！
3. 如果没找到，会继续到 `Person.prototype` 查找
4. 最终到 `Object.prototype` 查找

**关键步骤**:

1.  **在子类构造函数中调用父类构造函数**：使用 `Person.call(this, ...)` 来设置父类定义的实例属性（如 `firstName`, `birthYear`）。
2.  **链接原型**: 这是实现继承的核心。使用 `Object.create()` 将子类的原型链接到父类的原型。

    ```javascript
    // 正确的做法 (GOOD 👍)
    Student.prototype = Object.create(Person.prototype);
    ```

    这会创建一个新对象，其 `__proto__` 指向 `Person.prototype`，然后将这个新对象赋给 `Student.prototype`。这样就在原型链中建立了正确的链接。

    **错误的做法 (BAD 👎)**: `Student.prototype = Person.prototype;`
    这会让子类和父类的 `prototype` 指向同一个对象。修改子类的原型会同时影响父类，破坏了继承的独立性。

3.  **修复构造函数指针**: `Object.create()` 之后，`Student.prototype.constructor` 会指向 `Person`。我们需要手动将其指回 `Student`。
    
    ```javascript
    Student.prototype.constructor = Student;
    ```

#### ES6类继承 - 推荐方式

`extends` 和 `super()` 关键字让继承变得非常简单和直观，自动处理了所有复杂的原型链接和构造函数调用。

```javascript
class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  
  calcAge() {
    return 2024 - this.birthYear;
  }
  
  greet() {
    return `Hey ${this.fullName}`;
  }
}

class Student extends Person {
  university = 'MIT'; // 公共字段
  #studyHours = 0;    // 私有字段
  #course;           // 私有字段声明
  
  constructor(fullName, birthYear, course) {
    // super()必须是第一行 - 调用父类构造函数
    super(fullName, birthYear);
    this.#course = course;
  }
  
  introduce() {
    return `${this.greet()}, I study ${this.#course}`;
  }
  
  study(hours) {
    this.#studyHours += hours;
  }
  
  // 重写父类方法
  calcAge() {
    return `${super.calcAge()}岁，作为学生的感觉`;
  }
  
  // 静态方法
  static compareGrades(student1, student2) {
    // 静态方法中无法访问实例属性
    return Math.random() > 0.5 ? student1 : student2;
  }
}

const martha = new Student('Martha Jones', 2012, 'Medicine');
console.log(martha.introduce());
console.log(martha.calcAge()); // 使用super调用父类方法
```

### 开发中的常见问题和最佳实践

#### 1. this绑定问题

```javascript
class Button {
  constructor(element) {
    this.element = element;
    this.clickCount = 0;
    
    // ❌ 错误：this绑定会丢失
    // element.addEventListener('click', this.handleClick);
    
    // ✅ 方案1：使用箭头函数
    element.addEventListener('click', () => this.handleClick());
    
    // ✅ 方案2：使用bind
    // element.addEventListener('click', this.handleClick.bind(this));
  }
  
  // ✅ 方案3：使用箭头函数定义方法（推荐）
  handleClick = () => {
    this.clickCount++;
    console.log(`Clicked ${this.clickCount} times`);
  }
}
```

#### 2. 原型污染防护

```javascript
// ❌ 危险：修改内置对象原型
Array.prototype.last = function() {
  return this[this.length - 1];
};

// ✅ 安全：使用工具函数或继承
function getLastElement(array) {
  return array[array.length - 1];
}

class ExtendedArray extends Array {
  last() {
    return this[this.length - 1];
  }
}
```

#### 3. 内存泄漏防护

```javascript
class Component {
  constructor() {
    this.timers = [];
    this.listeners = [];
  }
  
  addTimer(callback, delay) {
    const timer = setTimeout(callback, delay);
    this.timers.push(timer);
    return timer;
  }
  
  addEventListener(element, event, handler) {
    element.addEventListener(event, handler);
    this.listeners.push({ element, event, handler });
  }
  
  // 重要：清理资源
  destroy() {
    // 清理定时器
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.length = 0;
    
    // 移除事件监听器
    this.listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.listeners.length = 0;
  }
}
```

#### 4. 类型检查和验证

```javascript
class User {
  constructor(name, email, age) {
    // 参数验证
    if (typeof name !== 'string' || name.trim() === '') {
      throw new TypeError('Name must be a non-empty string');
    }
    if (!this.#isValidEmail(email)) {
      throw new TypeError('Invalid email format');
    }
    if (typeof age !== 'number' || age < 0 || age > 150) {
      throw new TypeError('Age must be a number between 0 and 150');
    }
    
    this.name = name;
    this.email = email;
    this.age = age;
  }
  
  #isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // 类型守卫方法
  static isUser(obj) {
    return obj instanceof User || 
           (obj && typeof obj.name === 'string' && 
            typeof obj.email === 'string' && 
            typeof obj.age === 'number');
  }
}
```

#### 5. 工厂模式和单例模式

```javascript
// 工厂模式 - 创建不同类型的对象
class ShapeFactory {
  static createShape(type, ...args) {
    switch (type.toLowerCase()) {
      case 'circle':
        return new Circle(...args);
      case 'rectangle':
        return new Rectangle(...args);
      case 'triangle':
        return new Triangle(...args);
      default:
        throw new Error(`Unknown shape type: ${type}`);
    }
  }
}

// 单例模式 - 确保只有一个实例
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    
    this.connected = false;
    DatabaseConnection.instance = this;
    return this;
  }
  
  connect() {
    if (!this.connected) {
      console.log('Connecting to database...');
      this.connected = true;
    }
  }
  
  static getInstance() {
    return new DatabaseConnection();
  }
}
```

### 性能优化建议

#### 1. 原型方法 vs 实例方法

```javascript
class PerformanceExample {
  constructor(data) {
    this.data = data;
    
    // ❌ 避免：每个实例都创建新函数
    // this.process = function() {
    //   return this.data.map(x => x * 2);
    // };
  }
  
  // ✅ 推荐：所有实例共享同一个方法
  process() {
    return this.data.map(x => x * 2);
  }
}
```

#### 2. 懒加载和缓存

```javascript
class ExpensiveCalculation {
  constructor(data) {
    this.data = data;
    this._cache = new Map();
  }
  
  // 懒加载 + 缓存
  get expensiveResult() {
    if (!this._expensiveResult) {
      console.log('Calculating expensive result...');
      this._expensiveResult = this.data.reduce((sum, x) => sum + x * x, 0);
    }
    return this._expensiveResult;
  }
  
  // 带参数的缓存方法
  calculate(param) {
    if (this._cache.has(param)) {
      return this._cache.get(param);
    }
    
    const result = /* 复杂计算 */ param * 2;
    this._cache.set(param, result);
    return result;
  }
}
```



## JavaScript 异步编程

### 1. 基础：同步 vs. 异步 (Synchronous vs. Asynchronous)

#### 同步 (Synchronous)

同步代码是**阻塞 (Blocking)** 的。代码严格按照从上到下的顺序逐行执行，每一行都必须等待前一行执行完毕。

-   **特点**:
    -   逐行执行，顺序固定。
    -   前一行代码会**阻塞**后一行代码的执行。
    -   长时间运行的操作（如网络请求、复杂的计算）会冻结整个页面，用户无法进行任何交互。

**示例:** `alert` 会阻塞后续代码，直到用户点击确认。

```javascript
const p = document.querySelector('.p');
p.textContent = '我的名字是乔纳斯!';
alert('文本已设置!'); // 这行代码会阻塞后面的一切
p.style.color = 'red'; // 必须等待 alert 结束后才执行
```

#### 异步 (Asynchronous)

异步代码是**非阻塞 (Non-blocking)** 的。当遇到一个异步操作（如 `setTimeout`、`fetch` 请求），它会被交给“后台”（浏览器 Web API）处理，主线程会立即继续执行后续代码，无需等待。当异步任务完成后，其对应的回调函数才会被执行。

-   **特点**:
    -   非阻塞，主线程畅通无阻。
    -   通过回调函数、Promises 等方式处理未来的结果。
    -   适用于所有耗时操作，是流畅用户体验的基石。

**示例:** `setTimeout` 不会阻塞后续代码。

```javascript
const p = document.querySelector('.p');
// 1. setTimeout 被交给 Web API，主线程继续往下走
setTimeout(function () {
  // 3. 5秒后，这个回调函数被放入回调队列，等待被事件循环执行
  p.textContent = '我的名字是乔纳斯!';
}, 5000);

// 2. 主线程立即执行这行代码，将文本颜色变为红色
p.style.color = 'red';
```

> **核心观念**: 回调函数本身**不等于**异步。例如 `[1, 2, 3].map(callback)` 是同步的。只有特定的异步函数（如 `setTimeout`, `addEventListener`, `fetch`）才会使用回调函数来实现异步行为。

#### 1. 核心概念: `Promise` (一杯“承诺”的咖啡)

当你点一杯拿铁时，你不可能立刻就拿到它。咖啡师需要时间来制作。这个过程就是一个**异步操作**。

咖啡店不会让你傻站在柜台前干等（这会**阻塞**你做任何其他事），而是会给你一个小的、会震动的**电子取餐蜂鸣器**。

这个蜂鸣器，就是一个 **`Promise`**。

这个蜂鸣器对象本身，代表了咖啡店给你的一个**承诺**：
*   他们**承诺**最终会给你一个结果（要么是你的咖啡，要么是一个坏消息）。
*   这个蜂鸣器有它自己的内部状态，你看不见，但它只可能是以下三种情况之一：
    1.  **`pending` (进行中)**: 你刚拿到蜂鸣器。咖啡正在制作中。这是每个 `Promise` 的初始状态。
    2.  **`fulfilled` (已成功/已兑现)**: 蜂鸣器震动并亮灯了！你的咖啡好了。异步操作成功完成，你得到了一个结果（咖啡）。
    3.  **`rejected` (已失败/已拒绝)**: 经理走过来告诉你，咖啡机坏了。操作失败，你得到了一个失败的原因（错误）。

**Promise 的状态是永久的。** 一旦它从 `pending` 变为 `fulfilled` 或 `rejected`，就再也无法改变。

##### 如何使用 `Promise` (如何使用蜂鸣器)

你拿着蜂-鸣器回到座位上。现在你需要计划好当它响了之后该做什么。这就是 `.then()` 和 `.catch()` 方法的用武之地。

*   **.then(onFulfilled)**: 你为**成功**的情况制定计划。
    > “如果蜂鸣器响了 (`fulfilled`)，**然后 (then)** 我就去柜台拿咖啡喝。”

*   **.catch(onRejected)**: 你为**失败**的情况制定备用计划。
    > “如果出了什么问题 (`rejected`)，我需要**捕获 (catch)** 这个意外，然后可能去改点一杯茶。”
    
*   .finally(): 无论 Promise 最终是成功还是失败，都会执行的回调函数。它就像：“不管我今天有没有吃到想吃的东西，我最后**终究**都要回家。”

**代码示例：** `fetch` 是一个完美的现实世界例子，因为它执行网络请求并立即返回一个 `Promise`。

```javascript
console.log('正在点咖啡 (发起网络请求)...');

// fetch() 立即返回一个 Promise (蜂鸣器)
const coffeePromise = fetch('https://api.coffeeshop.com/latte');

// 我们来规划如何处理这个 Promise
coffeePromise
  .then(response => {
    // 蜂鸣器响了！我们从服务器得到了一个 "响应 (response)"。
    // 这还不是最终的咖啡，只是一个杯子。我们需要“喝”它。
    // response.json() 是另一个异步操作，它也返回一个 Promise。
    console.log('收到了响应！正在解析咖啡...');
    return response.json(); 
  })
  .then(actualCoffee => {
    // 这个 .then() 处理的是 response.json() 返回的 Promise。
    // 现在我们拿到了最终的数据！
    console.log('成功！正在享用我的:', actualCoffee);
  })
  .catch(error => {
    // 经理告诉我们，在链条的任何一步出了问题。
    console.error('噢，出错了:', error);
  });

console.log('我没有被阻塞！在等咖啡的时候，我还能看会儿书。');
```

---

#### 2. 错误机制: `throw` (对咖啡不满意，提出投诉)

让我们把比喻再深化一下。有时候，`fetch` 操作本身是成功的（服务器响应了），但服务器告诉你出了问题（例如，返回了一个 "404 Not Found" 错误）。

在这种情况下，蜂鸣器依然会响，因为你**确实**从柜台得到了一个响应。你走到柜台，他们递给你一个空杯子。从 `fetch` 的角度看，这技术上是一个 `fulfilled` 的 Promise。

但这不是你想要的！你需要**手动地表明这是一个错误**。这就是 `throw` 的作用。

`throw new Error(...)` 就像是你看着空杯子，**把它扔回柜台**，并大喊：“这不是我点的东西！”

**关键点：** 当你在 `.then()` 代码块中 `throw` 一个错误时，你会立即中断“成功路径”，并将整个 Promise 链的状态转为 `rejected`。这个拒绝状态会被下一个可用的 `.catch()` 代码块捕获。

**代码示例：** 这正是我们之前讨论的那个健壮的 `getJSON` 函数内部的逻辑。

```javascript
fetch('https://api.coffeeshop.com/non-existent-drink') // 这个 URL 会返回 404 错误
  .then(response => {
    // 服务器响应了，所以 fetch 的 Promise 是 FULFILLED 状态。
    // 但响应本身表明了这是一个错误。
    if (!response.ok) { // 对于像 404, 500 这样的状态，response.ok 是 false
      // 我们手动创建并“抛出”一个错误。
      // 这会立即将 Promise 链变为 rejected 状态。
      throw new Error(`这不对劲！服务器说: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // 链条的这一部分会因为 throw 而被跳过。
    console.log('这里永远不会被打印。');
  })
  .catch(error => {
    // 我们“抛出”的错误在这里被捕获了！
    console.error('我的投诉被听到了:', error.message);
    // 预期输出: "我的投诉被听到了: 这不对劲！服务器说: 404"
  });
```

---

#### 3. 现代语法: `async` 和 `await` (有耐心的顾客)

虽然 `.then()` 链式调用能用，但有时会变得难以阅读。`async/await` 是建立在 Promise 之上的现代“语法糖”，它让你能用**看起来像同步代码**的方式来编写异步代码。

想象一下，你是一位非常有耐心的顾客。你不要蜂鸣器，你更愿意直接站在柜台前等。

##### `async`
`async` 是一个放在函数声明前的关键字。它做两件事：

1.  它告诉 JavaScript：“这个函数将包含异步操作。”
2.  它确保这个函数**总是返回一个 Promise**。如果你 `return` 一个值，函数会把它包装在 `Promise.resolve(value)` 中。如果你 `throw` 一个错误，它会把它包装在 `Promise.reject(error)` 中。

##### `await`
`await` 是那个神奇的关键字。它**只能在 `async` 函数内部使用**。

*   当你把 `await` 放在一个 Promise 前面时，它会**暂停 `async` 函数的执行**，直到那个 Promise 被敲定（settled）。
*   如果 Promise 是 `fulfilled`，`await` 会“解包”这个 Promise，直接把结果值给你。
*   如果 Promise 是 `rejected`，`await` 会**抛出那个错误**，然后你就可以用标准的 `try...catch` 代码块来捕获它。

**比喻：**
1.  `async function order()`: 你决定开始这个“耐心等待”的过程。
2.  `const response = await fetch(...)`: 你告诉咖啡师：“第一步我会在这里**等待 (await)**”。你暂停了。咖啡师把杯子 (`response`) 递给你。
3.  `const coffee = await response.json()`: 你说：“好的，现在我会**等待 (await)** 你把它装满。”你再次暂停。咖啡师把做好的咖啡递给你。

**代码示例：**

```javascript
// 我们将函数声明为 async
const getMyCoffee = async function() {
  // 我们使用 try...catch 来处理错误，就像在同步代码中一样！
  try {
    console.log('正在点一杯需要耐心等待的咖啡...');
    
    // 1. 在这里暂停，直到 fetch 完成 resolve 或 reject
    const response = await fetch('https://api.coffeeshop.com/cappuccino');

    // 这和之前的错误检查完全一样！如果在这里 throw，catch 块会捕获它。
    if (!response.ok) {
      throw new Error(`服务器错误！状态: ${response.status}`);
    }

    // 2. 在这里暂停，直到 .json() 完成 resolve
    const actualCoffee = await response.json();

    console.log('成功！耐心地享用我的:', actualCoffee);
    return actualCoffee; // 这将成为 getMyCoffee 返回的 Promise 的成功值
  
  } catch (error) {
    // 如果任何一个 await 的 Promise 被 reject，或者我们手动 throw 了一个错误，
    // 它都会在这里被捕获。
    console.error('在我耐心等待期间出错了:', error.message);
    throw error; // 可以选择性地再次抛出错误，以便调用者也知道出错了
  }
};

// 要使用一个 async 函数，你就像对待其他返回 Promise 的函数一样处理它。
getMyCoffee()
  .then(result => console.log('从 async 函数得到的最终结果:', result))
  .catch(err => console.error('这个 async 函数最终失败了。'));
```

#### 总结

| 概念           | 是什么                                    | 比喻                         | 工作原理                                        |
| :------------- | :---------------------------------------- | :--------------------------- | :---------------------------------------------- |
| **`Promise`**  | 一个代表异步操作最终结果的对象。          | 电子取餐蜂鸣器。             | 有3种状态: `pending`, `fulfilled`, `rejected`。 |
| **`.then()`**  | 处理 `fulfilled` 状态的 Promise 的方法。  | 蜂鸣器响了之后的计划。       | 用成功值执行一个回调函数。                      |
| **`.catch()`** | 处理 `rejected` 状态的 Promise 的方法。   | 出了意外之后的备用计划。     | 用错误原因执行一个回调函数。                    |
| **`throw`**    | 一个手动创建并发出错误信号的关键字。      | 看到空杯子后提出投诉。       | 将 Promise 链的状态转为 `rejected`。            |
| **`async`**    | 一个声明函数处理异步逻辑的关键字。        | 决定成为一个“有耐心的顾客”。 | 使函数总是返回一个 Promise。                    |
| **`await`**    | 一个暂停执行并等待 Promise 结果的关键字。 | “我就在这里等。”             | 解包 Promise 的结果或抛出它的错误。             |

`Promise` 是底层的基本构建块。`async/await` 是使用它们的一种更现代、更易读的方式。理解这两者是精通现代 JavaScript 的关键。

`fetch()` 是一个全局函数（在浏览器和 Node.js 等环境中都可用），它能让你轻松地发起 HTTP 请求来获取资源。它被设计为 `XMLHttpRequest` (XHR) 的现代替代品，主要优点是**基于 Promise**，这使得处理异步操作变得更加优雅和强大。

- **throw**: 像一个信号弹，用于在代码中主动发出错误信号并中断执行。
- **try**: 圈定一块“危险区域”，告诉 JavaScript “请留意这里面的代码可能会出问题”。
- **catch**: 建立一个“处理站”，专门接收和处理 try 区域里发出的错误信号。
- **finally**: 建立一个“清理站”，无论是否发生错误，都确保执行收尾工作。

---

#### 核心概念：一次最简单的请求

想象一下，你还是在快餐店点餐。`fetch(url)` 这个动作本身，就相当于你**走到柜台说：“我要点餐”**。

这个动作会立即返回一个 `Promise`（承诺，也就是那个蜂鸣器）。你并不能马上拿到食物，但你拿到了一个“未来会给你结果”的承诺。

一次最基本的 `GET` 请求（只获取数据）分为两步：

1.  **发起请求，获取响应（Response）对象**：服务器响应后，`fetch` 的 `Promise` 会兑现（`resolve`），并给你一个 `Response` 对象。这个对象包含了响应的所有元信息（如状态码、头信息），但**不包含实际的数据**。
2.  **从响应中提取数据**：你需要调用 `Response` 对象上的方法（如 `.json()`、`.text()` 等）来真正读取响应体中的数据。这个提取过程也是异步的，所以它也返回一个 `Promise`。

```javascript
// 第 1 步：发起请求
fetch('https://jsonplaceholder.typicode.com/todos/1')
  // 第 2 步：当服务器响应后，这个 .then 会执行
  .then(response => {
    // response 是一个 Response 对象
    console.log('拿到了响应对象，但还不是数据:', response);

    // 第 3 步：从响应中提取 JSON 数据。这一步也返回一个 Promise
    return response.json(); 
  })
  // 第 4 步：当 JSON 数据完全解析后，这个 .then 会执行
  .then(data => {
    // data 才是我们最终想要的 JavaScript 对象
    console.log('成功获取并解析了数据:', data);
  })
  // 兜底：如果在整个过程中的任何一步（网络、解析等）出错，就会被捕获
  .catch(error => {
    console.error('请求过程中出错了:', error);
  });
```

---

#### `fetch` 的关键：`Response` 对象

当你从 `fetch` 的第一个 `.then` 中拿到 `response` 时，它有很多有用的属性和方法：

*   `response.ok`: 一个布尔值。如果 HTTP 状态码在 200-299 之间，则为 `true`，否则为 `false`。**这是检查请求是否业务成功的最佳方式**。
*   `response.status`: 数字，HTTP 状态码（如 `200`, `404`, `500`）。
*   `response.statusText`: 字符串，状态码的文本描述（如 `"OK"`, `"Not Found"`）。
*   `response.headers`: 一个 `Headers` 对象，可以用来查询响应头信息。
*   `response.url`: 请求的最终 URL（如果发生了重定向，这里会是重定向后的地址）。

**读取响应体的方法（这些方法都返回 Promise）：**

*   `response.json()`: 尝试将响应体解析为 JSON 对象。
*   `response.text()`: 将响应体作为纯文本字符串。
*   `response.blob()`: 将响应体处理为二进制大对象（Blob），常用于处理图片、文件等。
*   `response.formData()`: 将响应体处理为 `FormData` 对象。
*   `response.arrayBuffer()`: 将响应体处理为 `ArrayBuffer`，用于处理更底层的二进制数据。

**重要提示**：一个响应体只能被读取一次。调用了 `response.json()` 之后，就不能再调用 `response.text()` 了，否则会报错。

---

#### 错误处理：`fetch` 的一个“陷阱”

初学者最容易犯的错误就在这里。

`fetch()` 返回的 `Promise` **只会在网络层面失败时才会 `reject`**（例如，DNS 解析失败、用户设备断网）。

如果服务器返回了 HTTP 错误状态码（如 `404 Not Found` 或 `500 Internal Server Error`），`fetch` 的 `Promise` **并不会 `reject`**，它仍然会 `resolve`！因为从网络角度看，服务器确实成功地“响应”了你的请求。

因此，**正确的错误处理方式**是在第一个 `.then` 中检查 `response.ok`：

```javascript
fetch('https://jsonplaceholder.typicode.com/todos/不存在的ID')
  .then(response => {
    // 检查响应状态是否 OK
    if (!response.ok) {
      // 如果不 OK，手动抛出一个错误，这个错误会被下面的 .catch 捕获
      throw new Error(`HTTP 错误！状态码: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    // 统一处理网络错误和我们手动抛出的 HTTP 错误
    console.error('捕获到错误:', error.message); 
    // 输出: 捕获到错误: HTTP 错误！状态码: 404
  });
```
这正是你一开始提供的 `getJSON` 辅助函数所做的事情，它优雅地封装了这个逻辑。

---

#### 发起 POST 请求（及其他类型请求）

`fetch` 函数可以接受第二个可选参数：一个 `options` 配置对象，用来定制你的请求。

```javascript
const newTodo = {
  userId: 1,
  title: '学习 fetch POST 请求',
  completed: false,
};

fetch('https://jsonplaceholder.typicode.com/posts', {
  // 1. 指定请求方法
  method: 'POST',

  // 2. 设置请求头，告诉服务器我们发送的是 JSON 数据
  headers: {
    'Content-Type': 'application/json',
  },

  // 3. 设置请求体（body），必须是字符串。所以要将 JS 对象序列化
  body: JSON.stringify(newTodo), 
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP 错误! 状态: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('服务器返回的新数据:', data);
    // 服务器通常会返回创建好的资源，包括一个 id
  })
  .catch(error => {
    console.error('POST 请求失败:', error);
  });
```

其他 `options` 配置项还包括 `mode` (处理跨域)、`credentials` (是否发送 cookie)、`cache` (缓存策略) 等。

---

#### 结合 `async/await` 使用 `fetch`

使用 `async/await` 可以让 `fetch` 代码看起来像同步代码一样直观，是目前最推荐的写法。

```javascript
const fetchData = async () => {
  try {
    // 等待 fetch 完成并返回 Response 对象
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`HTTP 错误! 状态: ${response.status}`);
    }

    // 等待 JSON 数据解析完成
    const data = await response.json();

    console.log('使用 async/await 获取的数据:', data);
  } catch (error) {
    // try...catch 可以捕获整个过程中的所有错误
    console.error('在 async 函数中捕获到错误:', error);
  }
};

fetchData();
```

#### 总结：`fetch` vs `XMLHttpRequest` (XHR)

| 特性         | `fetch`                                                      | `XMLHttpRequest` (XHR)                                       |
| :----------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **异步处理** | **基于 Promise**，支持 `.then/.catch` 和 `async/await`，逻辑清晰。 | 基于事件和回调函数 (`onreadystatechange`, `onload`, `onerror`)，容易导致回调地狱。 |
| **API 设计** | 接口更简洁、统一。`Request` 和 `Response` 对象设计更合理。   | API 较为复杂和分散 (`open`, `send`, `setRequestHeader`)。    |
| **错误处理** | 只在网络失败时 `reject`，需要手动检查 HTTP 状态码。          | 通过 `onerror` 和检查 `status` 属性来处理。                  |
| **功能**     | 更强大、更灵活，是未来的标准。                               | 功能相对老旧，但浏览器兼容性极好（支持 IE）。                |

总而言之，`fetch` 是现代 Web 开发中进行网络请求的首选工具，它功能强大、语法优雅，尤其是与 `async/await` 结合使用时，能极大地提升开发体验和代码可读性。

 AJAX、API 和数据格式

### 2. 核心引擎：并发模型与事件循环 (Concurrency Model & Event Loop)

JavaScript 本身是单线程的，即调用栈在任何时刻只能执行一个任务。它通过浏览器提供的**运行时环境**实现了非阻塞的异步行为。

运行时环境包括：

-   **JS 引擎**: 负责执行 JS 代码。
    -   **调用栈 (Call Stack)**: 代码执行的地方，后进先出。
    -   **堆 (Heap)**: 存储对象等非结构化数据的地方。
-   **Web APIs**: 浏览器提供的 API，如 `DOM`, `setTimeout`, `fetch`。异步任务在这里运行。
-   **回调队列 (Callback Queue / Macrotask Queue)**: 存放已完成的**宏任务**的回调函数（如 `setTimeout`、`click` 事件）。
-   **微任务队列 (Microtask Queue)**: 专门存放已完成的**微任务**的回调（主要是 Promise 的 `.then`, `.catch`, `.finally`）。**它的优先级高于回调队列**。
-   **事件循环 (Event Loop)**: 整个异步机制的调度中心。它像一个不知疲倦的经理，持续监控调用栈。当**调用栈为空**时，它会：
    1.  从**宏任务队列 (Macrotask Queue)** 中取出一个**最老**的宏任务并执行。
    2.  执行该宏任务后，检查**微任务队列 (Microtask Queue)**，并**循环执行所有**微任务，直到微任务队列被清空。如果在执行微任务的过程中又添加了新的微任务，这些新任务也会在本轮次被执行。
    3.  （可选）浏览器进行 UI 渲染（重绘/重排）。这一步并非每次 tick 都会发生，浏览器会自行决定最佳的渲染时机。
    4.  回到第 1 步，开始下一个事件循环周期。

**示例：**

```javascript
console.log('测试开始'); // 1. 同步，立即执行

setTimeout(() => console.log('0秒定时器 (宏任务)'), 0); // 3. 放入 Web API，然后其回调进入宏任务队列

Promise.resolve('Promise 1 已解决 (微任务)').then(res => console.log(res)); // 4. 其回调立即进入微任务队列

console.log('测试结束'); // 2. 同步，立即执行
```

**控制台输出顺序:**

1.  `测试开始`
2.  `测试结束`
3.  `Promise 1 已解决 (微任务)` (微任务队列优先)
4.  `0秒定时器 (宏任务)` (在所有微任务清空后执行)

Promise 的 `.then()` / `.catch()` / `.finally()` 回调属于微任务。

如果在微任务中又返回一个新的 Promise，那么它的回调会被放到**当前微任务队列的末尾**。

Node.js 中还有 `process.nextTick()`，它的优先级比微任务还高。

### 3. 异步编程的进化

#### Level 1: 回调地狱 (Callback Hell)

早期的异步严重依赖回调函数。当多个异步操作相互依赖时，就会产生层层嵌套，形成“回调地狱”，代码难以阅读、维护和进行错误处理。

```javascript
// 示例：获取国家及其邻国信息 (使用旧的 XMLHttpRequest)
request1 = new XMLHttpRequest();
request1.addEventListener('load', function() {
    // ...处理国家数据...
    const neighbour = ...;

    request2 = new XMLHttpRequest(); // 嵌套第二个请求
    request2.addEventListener('load', function() {
        // ...处理邻国数据...
    });
    request2.send();
});
request1.send();
```

#### Level 2: Promise — 现代异步的基石

Promise 是一个**对象**，代表一个异步操作的**最终结果**。
**比喻：** Promise 就像你在快餐店点餐后拿到的**电子取餐蜂鸣器**。

-   **Promise 的生命周期**:
    1.  **Pending (进行中)**: 你拿着蜂鸣器正在等待。
    2.  **Settled (已敲定)**: 蜂鸣器有了动静，状态不可再改变。
        -   **Fulfilled (已成功)**: 蜂鸣器震动，通知你取餐。
        -   **Rejected (已失败)**: 经理过来告诉你卖光了。

-   **消费 Promise**: 我们使用 `.then()` 处理成功，`.catch()` 捕获失败。这种链式调用完美解决了回调地狱。

**使用 `fetch` API（它返回一个 Promise）:**

fetch 返回的 Promise 有一个重要的“陷阱”：**它只会在网络层面失败（如断网、DNS 错误）时才会 reject。** 对于服务器返回的 HTTP 错误状态码（如 404 Not Found、500 Server Error），它仍然会 resolve！

**正确处理方式：** 必须手动检查 response.ok 属性。

```javascript
// getJSON 是我们之前讨论的、一个健壮的辅助函数
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    // fetch 的 Promise 即使在 404 时也会 resolve，所以我们必须手动检查
    if (!response.ok) {
      // 在 .then 中 throw 一个错误，会立即中止链条并触发 .catch
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json(); // .json() 也返回一个 Promise
  });
};

getJSON(`https://restcountries.com/v2/name/portugal`)
  .then(data => {
    renderCountry(data[0]);
    const neighbour = data[0].borders[0];
    if (!neighbour) throw new Error('No neighbour found!'); // 再次 throw
    // 返回一个新的 Promise，形成优雅的链式调用
    return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`);
  })
  .then(data => renderCountry(data, 'neighbour'))
  .catch(err => { // 统一处理链中任何地方抛出的错误
    console.error(`出错了: ${err.message} 💥`);
  })
  .finally(() => { // 无论成功或失败都会执行
    console.log('请求流程结束。');
  });
```

#### **Promise 链的错误冒泡机制**

- 在 `.then()` 里 `throw` 或返回一个 rejected Promise，都会让错误冒泡到最近的 `.catch()`。
- `.catch()` 之后还可以继续 `.then()`，链会继续执行。

#### Level 3: Async/Await — 异步的终极形态

`Async/Await` 是 Promise 的**语法糖**，让我们能用一种更像同步代码的方式来编写异步代码，极大提高了可读性。

-   `async` 关键字: 用在函数前，表示这是一个异步函数。它总是隐式地返回一个 Promise。
-   `await` 关键字: **只能在 `async` 函数内部使用**。它会暂停函数的执行，等待其后的 Promise 被解决，然后“解包”并返回 Promise 的成功值。
-   **错误处理**: 使用经典的 `try...catch` 语句，非常直观。

**比喻：** `async/await` 就像你点餐后，选择**在柜台前耐心等待**，而不是拿着蜂鸣器回座位。店员会直接把做好的餐品递给你。

- `await` 会把后续代码放入微任务队列，因此会在本轮宏任务结束后再执行。
- 如果忘记 `await`，可能会导致错误没有被捕获：

**使用 Async/Await 重写:**

```javascript
const whereAmI = async function () {
  try {
    // await 暂停执行，直到 Promise 解决，然后返回结果
    const res = await getJSON(`https://restcountries.com/v2/name/portugal`);
    renderCountry(res[0]);

    const neighbour = res[0].borders[0];
    if (!neighbour) throw new Error('No neighbour found!');

    const res2 = await getJSON(`https://restcountries.com/v2/alpha/${neighbour}`);
    renderCountry(res2);
    
    // async 函数的 return 值会成为其返回的 Promise 的成功值
    return `You are in Portugal`; 
  } catch (err) {
    // 如果任何一个 await 的 Promise 被 reject (或手动 throw)，
    // 控制权会立即跳转到 catch 块。
    console.error(`出错了: ${err.message} 💥`);
    throw err; // 重新抛出错误，让调用者也能捕获
  }
};

// 调用 async 函数
(async () => {
    console.log('1: 开始获取位置');
    try {
        const location = await whereAmI();
        console.log(`2: ${location}`);
    } catch(err) {
        console.error(`2: 获取位置失败: ${err.message}`);
    }
    console.log('3: 获取位置结束');
})();
```

### 4. Promise 组合器：并发处理

当需要同时处理多个异步操作时，Promise 组合器非常有用。

-   **`Promise.all`**: **“一荣俱荣，一损俱损”**。并行执行多个 Promise。所有成功才算成功，返回所有结果的数组；一个失败就算失败，立即返回失败原因。
-   **`Promise.race`**: **“赛跑”**。返回第一个“落定”（无论成功或失败）的 Promise 的结果。常用于实现请求超时。
-   **`Promise.allSettled` (ES2020)**: **“全都要”**。等待所有 Promise 都落定（无论成功或失败），然后返回一个包含每个 Promise 最终状态和结果/原因的对象数组。成功的Promise用 `status: 'fulfilled'` 和 `value` 属性来描述，而失败的Promise用 `status: 'rejected'` 和 `reason` 属性来描述。
-   **`Promise.any` (ES2021)**: **“只要一个成功就行”**。返回第一个**成功**的 Promise 的结果。只有当所有 Promise 都失败时，它才会失败。

---

**最终总结**: 异步编程是现代 Web 开发的基石。JavaScript 通过**事件循环**实现了单线程下的并发，并通过从**回调**到 **Promises**，再到 **`async/await`** 的演进，提供了越来越优雅和强大的工具来处理异步操作，使得代码更易读、更易维护。



## 现代 JavaScript 开发核心概念笔记

本文档整理了现代 JavaScript 开发中的模块化、构建流程以及相关工具的核心概念。

#### 1. 为什么使用模块 (Why Modules?)

模块化是现代软件工程的基石。它允许我们将复杂的应用程序分解成小的、独立的、可重用的代码块。



**使用模块的主要优势：**

*   **构建软件 (Compose software):** 模块是微小的构建单元，我们可以将它们组合起来，构建出复杂的应用程序。
*   **隔离组件 (Isolate components):** 模块可以被独立开发和测试，无需关心整个代码库的复杂性。
*   **抽象代码 (Abstract code):** 我们可以在模块中实现底层或复杂的逻辑，然后只导出简单的接口供其他模块使用。
*   **组织化代码 (Organized code):** 模块化自然地引导我们写出结构更清晰、更易于维护的代码。
*   **代码复用 (Reuse code):** 模块可以轻松地在不同项目中复用。

**模块如何工作：导入 (Import) 与导出 (Export)**

一个模块可以通过 `export` 关键字暴露其公共 API（变量、函数、类等），其他模块则通过 `import` 关键字来使用这些功能。

```javascript
// shoppingCart.js

// 这是一个私有变量，外部无法访问
const cart = []; 
const shippingCost = 10;

// 使用 export 导出函数，供其他模块使用 (公共 API)
export const addToCart = function(product, quantity) {
  cart.push({product, quantity});
  console.log(`${quantity} ${product} was added to cart.`);
};

// 导出变量
export const totalPrice = 237;
```

#### 2. ES6 模块 vs. 普通脚本 (Script)

ES6 模块在行为上与传统的 `<script>` 标签加载的 JavaScript 文件有显著区别。

| 特性 (Feature)  | ES6 模块 (`<script type="module">`) | 普通脚本 (`<script>`)    |
| :-------------- | :---------------------------------- | :----------------------- |
| **顶层变量**    | 模块内作用域 (Scoped to module)     | 全局作用域 (Global)      |
| **默认模式**    | 严格模式 (Strict mode)              | 常规模式 ("Sloppy" mode) |
| **顶层 `this`** | `undefined`                         | `window` 对象            |
| **导入和导出**  | ✅ 支持 (`import`/`export`)          | ❌ 不支持                 |
| **文件下载**    | 异步 (Asynchronous)                 | 同步 (Synchronous)       |

**关键要点：**

*   **语法限制：** `import` 和 `export` 语句必须在模块的顶层使用，不能在函数或条件块内部使用。
*   **提升 (Hoisting)：** `import` 语句会被“提升”到模块的顶部，意味着它们会在任何代码执行之前被处理。

#### 3. ES6 模块的导入与执行过程

浏览器加载 ES6 模块是一个多阶段的异步过程。

**加载流程分解：**

1.  **解析 (Parsing):** 浏览器首先解析入口文件（如 `index.js`），识别出所有的 `import` 语句，确定其依赖的模块。
2.  **异步下载 (Asynchronous Downloading):** 浏览器异步地、并行地下载所有被依赖的模块（如 `math.js`, `dom.js`）。
3.  **链接 (Linking):** 一旦模块下载完毕，解析器会将其导出的内容与导入它的模块进行“链接”。
4.  **执行 (Execution):** 浏览器会先执行所有依赖的模块，最后才执行入口文件。

**核心特性：**

*   **实时连接 (Live Connection)，而非值拷贝：** 这是 ES6 模块最重要的特性之一。导入的是模块导出的值的**实时引用**。如果原始模块中的值发生变化，所有导入该值的模块都会立即看到这个变化。
*   **静态导入 (Static Imports)：** 由于导入在代码执行前就已经确定，这使得打包工具可以进行**摇树优化 (Tree Shaking)** 或 **死码消除 (Dead Code Elimination)**，即在最终打包的文件中移除未被使用的代码。
*   **模块加载顺序**：先执行被导入模块的顶层代码，再执行当前模块。
*   **导入是引用**：对导出的对象/数组的修改会实时反映到所有导入的地方（live binding），不像 CommonJS 那样是值的拷贝。
*   顶层 `await` 会暂停模块的执行，直到 `Promise` 完成。

#### 4. 现代 JavaScript 构建流程 (Build Process)

在现代 Web 开发中，我们编写的代码（开发阶段）和最终在浏览器中运行的代码（生产环境）之间存在一个重要的**构建过程**。



**流程概览：**

1.  **开发阶段 (Development):**
    *   我们编写分离的**模块 (Modules)**。
    *   通过 **NPM (Node Package Manager)** 来管理和引入**第三方包 (3rd-Party Packages)**，如 React, Leaflet 等。

2.  **构建过程 (Build Process):**
    *   **打包 (Bundling):** 使用 **Webpack** 或 **Parcel** 等打包工具，将我们所有的模块和第三方包依赖“打包”成一个或少数几个 JavaScript 文件。这个过程会解析所有 `import` 语句，并创建一个依赖图。
    *   **转译/Polyfilling (Transpiling/Polyfilling):** 使用 **Babel** 等工具，将现代的 JavaScript 语法（ES6+）转换为向后兼容的 ES5 代码，并添加 Polyfill 来模拟新版 JavaScript 中不存在的旧环境功能。这确保了代码能在大多数浏览器上运行。

3.  **生产环境 (Production):**
    *   最终产出的是一个优化后的 **JavaScript 包 (Bundle)**，这个文件被部署到服务器，并由用户的浏览器下载执行。

**关键工具：**

*   **NPM (Node Package Manager):** 它既是一个包含海量开源包的**软件仓库**，也是一个管理项目依赖和开发工具的**命令行工具**。
*   **Node.js:** 它是 JavaScript 的一个运行时环境，使得 JavaScript 可以在服务器端运行。几乎所有的现代前端构建工具（如 Webpack, Babel, Parcel）都依赖于 Node.js 环境。



### 编写简洁与可维护代码的最佳实践

#### 可读性代码 (Readable Code)

*   **为他人而写:** 编写的代码要保证团队中其他人能够轻松理解。
*   **为未来的自己而写:** 编写的代码要保证一年后的自己也能看懂。
*   **避免炫技:** 避免使用过于“聪明”或过度复杂的解决方案，简单直白通常是最好的。
*   **描述性变量名:** 使用能清晰描述其 **包含内容** 的变量名。
*   **描述性函数名:** 使用能清晰描述其 **功能** 的函数名。

#### 通用原则 (General)

*   **遵循 DRY 原则:** 不要重复自己 (Don't Repeat Yourself)，通过重构来消除重复代码。
*   **避免污染全局命名空间:** 优先使用封装，将代码包裹在模块或函数作用域内。
*   **不要使用 `var`:** 优先使用 `let` 和 `const`。
*   **使用严格相等:** 使用严格类型检查 (`===` 和 `!==`) 避免类型转换带来的意外行为。

#### 函数 (Functions)

*   **单一职责:** 一个函数通常应该只做一件事。
*   **限制参数数量:** 函数的参数最好不要超过 3 个。
*   **使用默认参数:** 尽可能为函数的参数设置默认值。
*   **返回类型一致:** 函数返回的数据类型应该与其接收的类型或其功能预期保持一致。
*   **巧用箭头函数:** 当箭头函数能让代码更简洁、更易读时，应该使用它。

#### 面向对象编程 (OOP)

*   **使用 ES6 Class:** 优先使用 ES6 的 `class` 语法来定义类。
*   **封装数据:** 封装类的数据，不要在类的外部直接修改其状态。
*   **实现方法链式调用:** 在方法中返回 `this` 来支持链式调用，提升代码流畅性。
*   **方法中慎用箭头函数:** 不要在类的方法中使用箭头函数，因为箭头函数没有自己的 `this` 绑定，会导致 `this` 指向错误。

#### 避免代码嵌套 (Avoid Nested Code)

*   **使用卫语句 (Guard Clauses):** 通过提前返回 (early return) 来减少 `if/else` 的嵌套层级。
*   **使用三元或逻辑运算符:** 对于简单的条件判断，使用三元运算符或逻辑运算符来替代 `if` 语句。
*   **使用多个 `if` 替代 `if/else-if`:** 在适当的场景下，使用多个独立的 `if` 语句可以使逻辑更扁平化。
*   **使用数组方法替代循环:** 避免手写 `for` 循环，优先使用 `map()`, `filter()`, `reduce()` 等声明式的数组方法。
*   **避免基于回调的异步 API:** 优先使用 Promise 或 `async/await` 来处理异步操作，避免“回调地狱”。



### 编程范式：命令式 vs. 声明式 (Imperative vs. Declarative)

这是两种根本不同的代码编写范式，它们描述了我们与计算机沟通的不同方式。

| 特性 (Feature) | 命令式编程 (Imperative)                        | 声明式编程 (Declarative)                               |
| :------------- | :--------------------------------------------- | :----------------------------------------------------- |
| **核心思想**   | 关注 **“如何做” (HOW)**                        | 关注 **“做什么” (WHAT)**                               |
| **代码风格**   | 详细描述计算机需要执行的每一步指令来达成结果。 | 只描述我们期望达成的结果，而将具体的实现步骤抽象出去。 |
| **比喻**       | 一份详细的蛋糕制作食谱，包含所有步骤。         | 一份对蛋糕成品的描述（比如外观、口味）。               |

**代码示例：**

*   **命令式 (Imperative):** 我们明确地创建新数组、使用循环、通过索引访问和赋值。
    
    ```javascript
    const arr = [2, 4, 6, 8];
    const doubled = [];
    for (let i = 0; i < arr.length; i++) {
      doubled[i] = arr[i] * 2;
    }
    ```
    
*   **声明式 (Declarative):** 我们只声明想要“将数组中的每个元素乘以 2”，`map` 方法为我们处理了循环、创建新数组等所有细节。
    ```javascript
    const arr = [2, 4, 6, 8];
    const doubled = arr.map(n => n * 2);
    ```

**函数式编程就是一种声明式的编程范式。**

### 函数式编程 (Functional Programming)

函数式编程是一种 **声明式** 的编程范式。它的核心思想是通过组合一系列 **纯函数** 来构建软件，同时避免产生 **副作用** 和 **修改数据**。

*   **副作用 (Side Effect):** 指函数在执行过程中，对函数外部状态产生的任何修改。例如：修改外部变量、在控制台打印日志 (`console.log`)、写入 DOM 等。
*   **纯函数 (Pure Function):** 指没有副作用的函数。它具有两个关键特征：
    1.  给定相同的输入，永远返回相同的输出。
    2.  不依赖任何外部变量或状态。
*   **不可变性 (Immutability):** 指数据一旦创建，就不能被修改。当需要变更数据时，我们不会直接修改原始数据，而是创建一个新的副本进行操作，然后返回这个新副本。

> 知名例子：**React**、**Redux** 等库深受函数式编程思想的影响。

#### 函数式编程技巧与声明式语法

**主要技巧 (Techniques):**

*   尽量避免数据的直接修改（践行不可变性）。
*   使用不产生副作用的内置方法进行数据转换，例如 `.map()`, `.filter()`, `.reduce()`。
*   尽量让函数保持纯净，避免产生副作用（虽然在实际应用中无法完全避免）。

**推荐语法 (Declarative Syntax):**

*   使用数组和对象的 **解构赋值 (Destructuring)**。
*   使用 **展开运算符 (`...`)** 来创建数组或对象的副本。
*   使用 **三元运算符** 来简化条件表达式。
*   使用 **模板字符串** 来构建字符串。

### 现代 Web 应用架构设计

#### 一、软件架构的核心目标

软件如同建筑，需要一个良好的结构，也就是我们组织代码的方式。一个“完美”的架构，是在以下三个核心目标之间找到的最佳平衡点：

1.  **结构 (Structure):**
    这是代码的组织方式。我们可以选择：
    *   **自行创建架构：** 适用于简单或特定需求的项目。
    *   **使用成熟的架构模式：** 如 MVC, MVP, Flux 等，这些模式提供了经过验证的解决方案。
    *   **使用框架：** 如 React, Angular, Vue, Svelte 等，它们本身就提供或推崇某种架构。

2.  **可维护性 (Maintainability):**
    项目永远不会真正“完成”。一个好的架构必须保证我们能够轻松地在未来对代码进行修改、修复和维护。

3.  **可扩展性 (Expandability):**
    随着业务的发展，我们需要能够方便地为应用添加新功能，而不会破坏现有代码。

#### 二、应用架构的组件拆分

一个良好的架构始于**关注点分离 (Separation of Concerns)**。我们可以将一个复杂的应用程序拆分为以下几个逻辑组件：

| 组件                          | 描述                         |
| :---------------------------- | :--------------------------- |
| **业务逻辑 (Business Logic)** | *   解决实际业务问题的代码。 |
*   直接关系到业务做什么以及需要什么。
*   例如：发送消息、存储交易、计算税费等。 |
| **状态 (State)** | *   存储关于应用的所有数据。
*   应该是应用的 **“唯一数据源” (Single Source of Truth)**。
*   UI 界面应与状态保持同步。
*   存在专门的状态管理库，如 Redux (`Rx`), MobX (`Mx`) 等。 |
| **HTTP 库 (HTTP Library)** | *   负责发起和接收 AJAX 请求（与后端API通信）。
*   理论上可选，但在实际应用中几乎总是必需的。 |
| **应用逻辑 (Application Logic / Router)** | *   只关心应用自身实现的代码，与业务逻辑分离。
*   处理页面导航和 UI 事件。 |
| **表现层逻辑 (Presentation Logic / UI Layer)** | *   关心应用可见部分的代码。
*   其核心作用是展示应用的状态。 |

**核心关系：** 最重要的关系是：**表现层 (UI) 必须与应用状态 (State) 保持同步**。当状态改变时，UI 应该自动更新以反映这些变化。

#### 三、架构模式示例：MVC (Model-View-Controller)

MVC 是一种经典的软件架构模式，它将上述组件组织起来，实现关注点分离。



*   **模型 (Model):**
    *   **职责:** 负责应用的 **业务逻辑**、**状态管理** 和 **数据交互** (HTTP 请求)。
    *   它包含了应用的核心功能和数据，但不关心如何展示。

*   **视图 (View):**
    *   **职责:** 负责 **表现层逻辑 (UI)**。
    *   它将模型中的数据显示给用户，并将用户的操作通知给控制器。视图本身不包含任何业务逻辑。

*   **控制器 (Controller):**
    *   **职责:** 作为 **模型和视图之间的桥梁** (应用逻辑)。
    *   它接收用户的输入（来自视图的事件），然后调用模型来处理数据，并最终更新视图以反映数据的变化。

**MVC 数据流（示例）：**
0.  用户与 **视图 (View)** 发生交互（如点击按钮）。
1.  **视图 (View)** 将用户操作通知给 **控制器 (Controller)**。
2.  **控制器 (Controller)** 调用 **模型 (Model)** 来更新数据或执行业务逻辑。
3.  **模型 (Model)** 可能需要通过 HTTP 与外部 **Web** 服务进行数据交互。
4.  数据更新后，**模型 (Model)** 通知 **控制器 (Controller)**，控制器再更新 **视图 (View)**。
5.  **视图 (View)** 向用户展示更新后的结果。



#### 四、模块导入

导入一个模块会导致该模块被执行，即使它没有导出任何内容。模块的执行和模块的导出是两个不同的概念。

有一些合理的场景会创建没有export的模块。最常见的是用于副作用（side effects）的模块





## *

### range

`Range` 是一个表示文档中一段**连续区域**的对象。

`Range` 提供很多方法来操作文档片段，这里列几个常用的：

- **`setStart(node, offset)`**
   设置范围的起始位置（在某个节点和偏移量上）。
- **`setEnd(node, offset)`**
   设置范围的结束位置。
- **`selectNode(node)`**
   选中整个节点。
- **`deleteContents()`**
   删除范围内的内容。
- **`extractContents()`**
   把范围内的内容提取出来（返回 `DocumentFragment`）。
- **`cloneContents()`**
   克隆范围内的内容（不会删除）。
- **`createContextualFragment(htmlString)`** ✅
   根据范围所在的上下文，把一段 HTML 字符串解析成 **`DocumentFragment`**。

#### 为什么用 Range？

因为 **`innerHTML`** 或 **`insertAdjacentHTML`** 只能操作字符串，而 `Range` 可以：

- 精确选择 DOM 中的部分内容（比如选中一个 `<p>` 的前半句）。
- 提供更强的 **文档片段操作能力**。
- 在虚拟渲染或局部更新时，更安全高效（比如你的 `update` 里用的）。

### DocumentFragment

`DocumentFragment` 是一个 **轻量级的文档节点容器**。

- 它**不是文档树的真实部分**，只存在于内存里。
- 你可以往里面放 DOM 节点、元素、文本……
- 插入 `DocumentFragment` 到真实 DOM 时，**它自己不会被插进去**，而是把它里面的子节点“一股脑”搬到目标位置。
- **不可见**：它本身不会渲染出来。
- **高效**：对 fragment 的操作不会触发页面重绘和回流，因为它还不在 DOM 里。
- **传送门效果**：当你 append 一个 `DocumentFragment`，其实是把它的所有子节点“倒”到目标元素里。

常用于 批量插入节点（性能优化）解析 HTML 字符串



### 存储机制和安全模型

#### 2. 安全模型的深层含义

**防御的攻击类型：**

- 跨站脚本攻击(XSS)的数据窃取
- 恶意网站伪装成可信站点
- 广告商跨站追踪用户数据

**局限性：** 同源策略无法防御同域内的XSS攻击，这就是为什么输入验证和内容安全策略(CSP)同样重要。

#### 3. 实际开发中的影响

**跨子域名共享需求：** 企业网站经常需要在子域名间共享数据，解决方案包括：

- 使用`document.domain`降域
- PostMessage API跨域通信
- 服务端Session共享

**第三方集成挑战：** 支付网关、社交登录等第三方服务无法直接访问主站localStorage，需要设计替代方案。

#### 4. 现代Web开发的演进

**Storage类型对比：**

javascript

```javascript
localStorage     // 持久化，同源隔离，5-10MB限制
sessionStorage   // 会话级别，标签页隔离
IndexedDB        // 大容量，异步API，结构化数据
WebSQL          // 已废弃
```

**隐私增强：** 现代浏览器正在实施更严格的存储隔离，如Firefox的First-Party Isolation和Chrome的Storage Partitioning。

### JSON

`JSON.stringify()`：JS 对象 → JSON 字符串

`JSON.parse()`：JSON 字符串 → JS 对象



### DOM

element.insertAdjacentHTML(position, text);
element → 你要操作的 DOM 元素（比如 this._parentElement）。

position → 一个字符串，决定插入的位置。必须是以下四个值之一：

"beforebegin" → 元素本身前面。

"afterbegin" → 元素内部，最前面。

"beforeend" → 元素内部，最后面。

"afterend" → 元素本身后面。

text → 要插入的 HTML 字符串。

返回值：

没有返回值，直接修改 DOM。



### 其他函数

#### 1.`Fraction` 类的功能

#### 2..bind(this)

#### **3. `Element.isEqualNode()`**

- **原型**：

```
Node.isEqualNode(otherNode)
```

- **参数**：
  - `otherNode`：要比较的节点。
- **返回值**：
  - `true` / `false`：是否在**结构、属性、内容**上完全相等。

------

#### **4. `Element.setAttribute()`**

- **原型**：

```
Element.setAttribute(name, value)
```

- **参数**：
  - `name`：属性名
  - `value`：属性值
- **作用**：给元素设置一个属性，如果已存在则更新。

#### 5.处理表单数据

const dataArr = [...new FormData(this)];

#### 6.更新浏览器URL

window.history.pushState(stateObj, title, url);

**`stateObj`**

- 一个 JS 对象，和这个新历史记录条目绑定。
- 将来用 `window.onpopstate` 监听回退/前进时，可以拿到它。

**`title`**

- 目前大多数浏览器会忽略它（可以传 `''`）。

**`url`**

- 你想在地址栏显示的新 URL（必须是同源 URL）。
- 不会导致页面刷新。
