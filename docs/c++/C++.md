### 继承

final

override



### 派生类

派生类的构造函数与析构函数



### 多继承

多继承方式

多继承派生类的析构函数和构造函数

多继承的二义性问题

1.不同基类有同名成员函数

2.间接基类成员变量在派生类中有多份拷贝

虚继承



### 虚函数

虚函数与纯虚函数



### static

局部变量：静态局部变量在函数多次调用间保持其值。

类成员：静态成员属于类本身，而不是某个对象。

全局变量或函数：限制作用域，使其仅在定义的文件中可见。

当我们在全局作用域（函数外部）声明 static 变量或函数时，它会将这些标识符的链接属性从外部链接（external linkage）改变为内部链接（internal linkage）。这意味着这些变量或函数只能在定义它们的源文件中访问，其他源文件无法看到它们。这是一个很好的实现信息隐藏的方式。



### 构造函数

委托构造函数

STL 模板中 string的构造方式

cin string 的判断截止



### 函数重载

模板函数与重载函数的关系

在继承体系中的函数重载。



### 运算符重载

#### 1.重载为类的成员函数

#### 2.赋值运算符重载

#### 3.下标运算符重载





### extern "c"



### 强制类型转换

#### 1. static_cast&lt; type&gt;(expression)

#### 2.reinterpret_cast&lt; type&gt;(expression)

#### 3.const_cast&lt; type&gt;(exprission)

#### 4. dynamic_cast&lt; type&gt;(expression)



### 类型转换

#### 类型转换函数（类型转换运算符重载函数）

#### 转换构造函数



### 仿函数--重载（）运算符



### 类型兼容

1.使用公有派生类对象为基类对象赋值

2.使用公有派生类对象为基赋值

3.使用公有派生类对象的指针为基类指针赋值

4.如果函数的参数是基类对象、基类对象的引用、基类指针，则函数在调用时，可以使用公有派生类对象、公有派生类对象的地址作为实参







### 输出格式

#### 1.输出八进制、十进制、十六进制

#### 2.输出指定精度数据

#### 3.输出指定域宽、对齐方式、填充方式



### static

static const组合修饰











### 异常

throw

try

catch



### 包装器









函数调用跳转地址

stl默认初始值

回调函数

匿名函数

非静态成员属性

地址绑定

动态多态

嵌套类

类内函数作用域



noexcept

\#pragma message("#undefing marce max")



结构化绑定

mutable



## 基础

### 运算符

```c++
// 三目运算符返回变量可继续赋值
(a > b ? a : b) = 0;
```

### 引用

 引用就是给一个已经存在的变量起一个**别名**

它不是一个新的变量，不占用新的内存空间（或者说，它和原变量共享同一块内存空间）。对引用的任何操作，都等同于对它所引用的那个原始变量的操作。

#### 1.引用的分类

**左值引用（Lvalue Reference）**
 绑定到一个有名字、可寻址的对象。

```c++
int a = 5;
// 类型名 &引用名 = 目标变量名;
int &r = a;
```

**常量引用（const Reference）**

**可以绑定到临时对象和不同类型的对象**。

普通引用（非 const）只能绑定到类型完全匹配的、非 const 的左值上。

```c++
// int& ref1 = 10;          // 错误！10 是一个字面量（右值），不能被非const引用绑定
const int& ref2 = 10;    // 正确！绑定字面量，编译器会创建一个临时变量存储10，然后让ref2引用它

double d = 3.14;
// int& ref3 = d;          // 错误！类型不匹配
const int& ref4 = d;     // 正确！隐式转换后绑定，编译器会创建一个临时的int变量(值为3)，然后让ref4引用它
```

**右值引用（Rvalue Reference，C++11 引入）**
 用 `&&` 表示，可以绑定到右值（临时对象）。
 常见用途：**移动语义、完美转发**。

```
// 类型名 &&引用名 = 右值表达式;
int &&r = 10;   // 绑定到字面量
```

**std::move**：主动将左值变为右值

有时候，我们有一个左值，但我们确定不再需要它了，想把它当成右值来处理，以便触发移动语义。这时就需要 std::move。

**std::move 的本质：** 它不做任何移动操作，它只是一个**类型转换**。它将一个左值**强制转换**为一个右值引用，告诉编译器：“你可以把这个对象当成一个临时对象来处理了，可以偷它的资源了。”

**移动构造函数的实现：**

1. 不分配新内存。
2. 直接从源对象（右值）那里“窃取”其内部资源的指针。
3. 将源对象的指针设置为 nullptr，确保源对象在析构时不会释放掉我们已经“偷”来的资源（这被称为“置空”操作）。

#### 2. 引用的三大特性

1. **必须在声明时初始化**
2. **一旦初始化，就不能再改变引用的对象**
3. **不存在** **NULL** **引用**

#### 3. 为什么需要引用？（Why & How）

引用的主要应用场景是作为**函数的参数**和**返回值**。

##### 3.1 作为函数参数（主要用途）

这是引用最最重要、最最常见的用途。它有两种主要形式：

**a) 传递引用（Pass by Reference）：用于修改外部变量**

如果不使用引用，函数参数默认是**值传递（Pass by Value）**，即函数会创建一个参数的**副本**。在函数内部修改这个副本，不会影响到函数外部的原始变量。

**b) 传递 const 引用（Pass by const Reference）：用于提高效率和保证安全**

如果传递的参数是一个很大的对象（比如一个大的结构体或类实例），值传递会复制整个对象，开销很大。这时，我们可以用引用来避免复制，提高效率。

但如果函数本身不应该修改这个对象，为了安全，我们应该把它声明为 const 引用。

**const 引用是一个非常重要的编程习惯！** 在不打算修改参数的情况下，特别是对于非内置类型（如 string, vector, 自定义类等），**优先使用 const 引用传参**。

##### 3.2 作为函数返回值

函数也可以返回一个引用。这允许函数调用本身可以被赋值（成为一个左值）。

**返回引用的巨大陷阱：**
**绝对不能返回对局部变量的引用！**

因为局部变量在函数执行完毕后就会被销毁，其内存空间会被回收。返回对它的引用会导致一个**悬垂引用（Dangling Reference）**，后续对这个引用的使用会导致未定义行为（通常是程序崩溃或数据错乱）。

```c++
int& bad_function() {
    int local_var = 100;
    return local_var; // 极端危险！local_var 在函数结束后就没了
}

int main() {
    int& dangling_ref = bad_function();
    // 此时 dangling_ref 引用的内存可能已经被其它数据覆盖
    std::cout << dangling_ref << std::endl; // 结果是未知的，非常危险！
}
```

#### 比较

在大多数编译器（如 GCC、Clang、MSVC）中：

**引用本质上是通过“隐藏的指针”实现的**。

- 当你写 `int &r = a;`
   编译器内部会把 `r` 翻译为 `int* const r = &a;`
   （即一个 **不可更改指向的指针**）。
- 之后对 `r` 的使用，编译器会自动插入解引用操作。

| 特性         | 引用 (Reference)                          | 指针 (Pointer)                               |
| ------------ | ----------------------------------------- | -------------------------------------------- |
| **本质**     | 一个变量的**别名**                        | 一个存储了**内存地址**的变量                 |
| **空值**     | **不允许**为 NULL，必须引用一个存在的实体 | 可以为 nullptr，表示不指向任何东西           |
| **初始化**   | **必须**在声明时初始化                    | 可以在任何时候初始化                         |
| **可变性**   | 一旦初始化，**不能**再改变引用的对象      | **可以**改变指向，让它指向另一个对象         |
| **内存占用** | 本身不占独立内存（或看作与原变量共享）    | 占用独立内存空间（32位系统4字节，64位8字节） |
| **操作符**   | 像普通变量一样使用，**隐式解引用**        | 需要 * (解引用) 和 -> (成员访问) 操作符      |
| **类比**     | 对象的**昵称**                            | 对象的**家庭住址**                           |

**选择指南：**

- 当你需要一个变量的别名，并且保证它总是有效、不为空时，**优先使用引用**。特别是在函数参数和返回值中。
- 当你需要指向不同的对象，或者需要表示“不存在的对象”（nullptr）时，**必须使用指针**。例如，链表中的 next 节点。
- 在进行底层内存操作、与 C 库交互时，通常使用指针。







### 变量

#### 浮点型（Floating Point Types）

浮点型用于存储带有小数部分的数值。C++主要提供float（单精度）和double（双精度）两种浮点类型。

##### 科学计数法表示

浮点数可以用科学计数法表示，这对于表示非常大或非常小的数值特别有用。格式为：数字e指数 或 数字E指数。

```c++
double scientific1 = 1.23e4;    // 等于 12300.0
double scientific2 = 5.67E-3;   // 等于 0.00567
float small_num = 2.5e-10f;     // 非常小的数值
```

#### 字符串

C++提供两种主要的字符串处理方式，每种都有其特定的用途和优势。

##### C风格字符串（字符数组）

这是从C语言继承来的字符串处理方式，使用字符数组来存储字符串。

- **特点**：字符串以空字符\0结尾，数组大小在声明时就确定了。
- **注意**：数组大小必须足够容纳字符串内容加上结尾的空字符。

```c++
char str[10] = "abcdef";
// 这创建了一个能容纳10个字符的数组
// 实际存储: 'a', 'b', 'c', 'd', 'e', 'f', '\0', 未初始化, 未初始化, 未初始化
```

##### C++标准字符串类

现代C++推荐使用string类，它提供了更强大和安全的字符串操作功能。

- **优势**：会自动管理内存，支持动态调整大小，并提供丰富的成员函数用于字符串操作。

```c++
#include <string>  // 必须包含此头文件

std::string str = "abcdef";
```

##### 字符串追加操作

字符串追加是常见的操作，不同的字符串类型有不同的处理方式。

对于string类：

```c++
#include <string>

std::string str1 = "Hello";
std::string str2 = " World";
str1 += str2;           // 使用 += 运算符
str1.append("!");       // 使用 append() 方法
// 结果：str1 = "Hello World!"
```

### Bitset类型

bitset是C++标准库提供的一个模板类，用于处理固定大小的位序列。它特别适用于需要进行位操作的场景。

```c++
#include <bitset>

// 创建8位的位序列
std::bitset<8> bits("10110100");

// 创建16位的位序列，默认全为0
std::bitset<16> flags;
```

### 标准输入输出

浮点型默认输出6位有效数字

**精度控制**：如果需要控制输出精度，可以使用 &lt;iomanip&gt; 头文件中的 setprecision() 函数。

- setprecision(n): 设置输出流的精度为n位有效数字。
- fixed: 与setprecision(n)结合使用，表示固定显示小数点后n位。

#### 输出迭代器

### 文件

文件操作是通过一个强大的**流(Stream)**概念来实现的。你可以把流想象成一个数据流动的管道，一端连接着你的程序，另一端连接着文件

这个头文件里定义了三个核心的类：

1. ifstream：**Input File Stream**，用于从文件中读取数据。
2. ofstream：**Output File Stream**，用于向文件中写入数据。
3. fstream： **File Stream**，既可以读文件，也可以写文件。

#### 基础操作：写入文件

让我们从最简单的开始：创建一个文件并写入一些内容。我们将使用 ofstream。

##### 步骤：

1. **创建 ofstream 对象**：ofstream myFile;
2. **打开文件**：myFile.open("filename.txt"); 或者在创建对象时直接指定文件名：ofstream myFile("filename.txt");
3. **检查文件是否成功打开**：这是一个非常重要的好习惯！
4. **写入数据**：使用流插入运算符 <<，就像使用 cout 一样。
5. **关闭文件**：myFile.close();

#### 基础操作：读取文件

现在，让我们把刚才写入文件的内容再读出来。我们将使用 ifstream。

##### 步骤：

1. **创建 ifstream 对象**：ifstream myFile;
2. **打开文件**：myFile.open("filename.txt");
3. **检查文件是否成功打开**。
4. **读取数据**：
   - 使用流提取运算符 >>：像 cin 一样，它会按空格和换行符分割来读取单词。
   - 使用 std::getline()：读取一整行。
5. **关闭文件**：myFile.close();

**注意**：>> 和 getline 的区别非常重要，getline 通常更适合读取包含空格的文本行。

------



#### 进阶知识

##### 1. 文件打开模式 (Open Modes)

在打开文件时，你可以指定不同的模式，来控制文件的行为。模式可以组合使用（用 | 运算符）。

















| 模式             | 含义                                             | ofstream 默认 | ifstream 默认 |
| ---------------- | ------------------------------------------------ | ------------- | ------------- |
| std::ios::in     | **in**put，为读取而打开文件                      |               | in            |
| std::ios::out    | **out**put，为写入而打开文件（会清空原有内容）   | out           |               |
| std::ios::app    | **app**end，追加模式，在文件末尾写入，不清空     |               |               |
| std::ios::trunc  | **trunc**ate，如果文件存在，则清空其内容         | trunc         |               |
| std::ios::ate    | **at e**nd，打开文件后，立即将指针定位到文件末尾 |               |               |
| std::ios::binary | **binary**，以二进制模式打开文件                 |               |               |

##### 2. 二进制文件操作

上面的例子都是文本文件。如果你需要存储非文本数据（如图片、音频、或者一个类的对象），使用二进制模式会更高效且精确。

打开方式要指定为ios::binary

- **写入**：使用 file.write(memory_address, size)
- **读取**：使用 file.read(memory_address, size)

##### 3. RAII 和自动关闭

C++的 fstream 对象遵循 **RAII (Resource Acquisition Is Initialization)** 原则。这意味着当一个文件流对象（如 outFile 或 inFile）离开其作用域时（例如函数结束），它的析构函数会自动被调用，从而**自动关闭文件**。

所以，即使你忘记写 myFile.close()，在大多数情况下文件也会被安全关闭。但显式地调用 close() 是一个好习惯，它能让你更清楚地控制文件的生命周期。

### 函数

#### 一、函数修饰符与说明符

这些关键字用于改变函数的行为或向编译器提供额外信息。

##### **inline (内联)**

C++ 中的一种函数优化技术，旨在减少函数调用开销并解决链接问题。它具有双重作用：性能优化提示和链接器指令。

**普通函数调用的执行流程**

当程序执行普通函数调用时，需要完成以下步骤：

1. **保存执行状态** - 保存当前程序的执行上下文
2. **参数传递** - 将参数压入栈中
3. **地址跳转** - 跳转到函数所在的内存位置
4. **函数执行** - 执行函数体代码
5. **返回值处理** - 将返回值存储到指定位置
6. **状态恢复** - 恢复之前保存的程序状态
7. **返回跳转** - 跳转回原来的执行位置

**双重作用机制**

1. 性能优化提示

- **编译器建议**：`inline` 是对编译器的性能优化"建议"，而非强制命令
- **智能决策**：现代编译器具备足够智能，通常会基于函数复杂度、调用频率等因素自行决定是否进行内联
- **优先级**：编译器的内联决策优先于程序员的 `inline` 声明

2. 链接器指令（核心作用）

- **ODR 例外处理**：`inline` 为"单一定义规则"（One Definition Rule）提供例外，允许同一内联函数在多个翻译单元中有相同定义
- **多重定义合法化**：确保所有翻译单元中的内联函数定义完全相同时，链接器会选择其中一个定义
- **头文件友好**：使得函数实现可以直接放在头文件中（header-only 设计模式）

**性能开销**：这个过程会产生明显开销，特别是对于小型且频繁调用的函数。

##### **constexpr (常量表达式)**

- **核心作用**：使函数能够在**编译期**求值。其结果可以像常量一样用于数组大小、模板参数等需要编译期常量的场合。
- **限制与演进**：
  - C++11：限制非常严格，函数体基本上只能包含一个 return 语句。
  - C++14/17：限制大幅放宽，允许在 constexpr 函数中使用局部变量、循环和分支结构，使其更像普通函数，只要传入的参数是常量表达式，就能在编译期求值。
- **双重身份**：如果传入的参数在运行时才能确定，constexpr 函数会像普通函数一样在运行时执行。

##### **noexcept (不抛异常)**

- **核心作用**：向编译器保证该函数不会抛出任何异常。
- **优化**：编译器可以基于此承诺进行优化，因为它不需要生成异常处理相关的栈展开（stack unwinding）代码。
- **对标准库的影响**：标准库容器（如 std::vector）在进行移动操作时，会检查移动构造函数是否为 noexcept。如果是，则安全地使用移动语义；如果不是，为了保证强异常安全，它会退回到拷贝语义，导致性能下降。
- **重要警告**：这是一个**契约**。如果一个 noexcept 函数真的抛出了异常，程序会直接调用 std::terminate 终止，而不是进行异常处理。因此，标记 noexcept 要谨慎且真实。

#### 二、函数属性

属性（[[...]]）为编译器提供附加信息，用于静态检查和代码优化，不影响程序逻辑。

**[[nodiscard]]**

- **用途**：用于修饰函数或类型，提示编译器在该函数返回值被忽略时发出警告。
- **场景**：用于那些返回错误码、状态或必须被处理的资源句柄的函数。

```c++
[[nodiscard]] bool check_status() {
    return false; // 模拟失败
}

void test() {
    check_status(); // 编译器会在此处发出警告：忽略了 [[nodiscard]] 函数的返回值
}
```



**[[maybe_unused]]**

- **用途**：用于抑制编译器对未使用变量、参数或实体的警告。
- **场景**：在跨平台或不同构建配置下，某些参数或变量可能不被使用。

```c++
void handle_event(int event_type, [[maybe_unused]] void* data) {
#ifdef _DEBUG
    // 在调试模式下使用 data
    log(data);
#endif
    // 在发布模式下 data 未被使用，但 [[maybe_unused]] 抑制了警告
}
```



**[[deprecated("reason")]]**

- **用途**：标记一个实体（函数、类等）已过时，当其他代码使用它时，编译器会发出警告。
- **场景**：API 迭代，提示用户迁移到新的接口。

```c++
[[deprecated("Use new_print() instead")]]
void old_print(const char* s) { /* ... */ }
```

#### 三、函数签名与调用

##### **函数重载 (Overloading)**

- **定义**：允许在**同一作用域**内声明多个同名函数，只要它们的**参数列表不同**即可。参数列表的不同体现在参数的**数量、类型或顺序**上。
- **注意**：函数的**返回值类型不能**作为重载的依据。默认参数可能导致与其他重载的冲突,如果引入了模板，可能与具体重载产生竞争

##### **函数默认参数 (Default Arguments)**

- **定义**：在函数**声明**时为参数提供一个默认值。如果在调用函数时未提供该参数的实参，则自动使用该默认值。
- **规则**：
  1. 默认参数必须从右向左设置。
  2. 一旦某个参数有了默认值，其右侧的所有参数都必须有默认值。

##### **函数占位参数 (Placeholder Arguments)**

- **定义**：在参数列表中只写出类型，而没有参数名。
- **用途**：
  1. **区分函数重载**：最典型的例子是重载类的 ++ 运算符。operator++() 是前置自增，operator++(int) 是后置自增，其中的 int 就是占位参数，用于区分签名。
  2. **兼容性**：为了与旧的 C 风格 API 或函数指针类型保持兼容。
  3. **明确意图**：表明该参数存在但在此函数中未被使用。

#### 四、Lambda 表达式 (匿名函数)

Lambda 是现代 C++ 中创建临时、局部函数对象的首选方式，常用于算法、回调和异步编程。

**基本语法**: [捕获列表]/(参数列表)specifiers -> 返回值类型 { 函数体 }

- **捕获列表 []**：定义 Lambda 如何从其所在的作用域“捕获”变量。

  - []：不捕获任何变量。性能最好，可转换为函数指针。
  - [=]：以**值捕获**方式捕获所有外部可见的局部变量（包括 this）。
  - [&]：以**引用捕获**方式捕获所有外部可见的局部变量。
  - [this]：以值捕获方式捕获 this 指针。
  - [a, &b]：显式捕获 a（值）和 b（引用）。
  - **生命周期警告**：使用引用捕获 [&] 或捕获 this 时，要确保 Lambda 的生命周期不超过被捕获变量的生命周期，否则会导致悬垂引用/指针。

- **参数列表 ()**：与普通函数的参数列表相同。

  - **泛型 Lambda** (C++14+)：可以使用 auto 作为参数类型，实现模板化的 Lambda。

    ```
    auto add = [](auto a, auto b) { return a + b; };
    ```

- **说明符 specifiers** (可选)：

  - **mutable**：允许在 Lambda 函数体内修改通过**值捕获**的变量。
  - **noexcept**：同上文，声明 Lambda 不抛出异常。

- **返回值类型 -> T** (可选)：

  - 大多数情况下，编译器可以自动推导返回值类型。
  - 当函数体有多个 return 语句且类型不同时，或需要明确指定返回类型时，需要显式声明。

- **函数体 {}**：Lambda 的执行代码。

## 类与对象

### 1. 拷贝构造函数 (Copy Constructor)

**定义：** 拷贝构造函数是一种特殊的构造函数，用于用一个已存在的对象来初始化一个新对象。

**作用：**

*   当用一个对象初始化另一个新对象时。
*   当对象作为函数参数按值传递时。
*   当对象作为函数返回值按值返回时。

**语法：** `ClassName(const ClassName& other);`

**默认行为：浅拷贝 (Shallow Copy)**
默认的拷贝构造函数会逐个成员地复制（按值复制），这意味着如果对象中包含指针，新旧对象的指针会指向同一块内存。这可能导致“双重释放”等问题。

**自定义行为：深拷贝 (Deep Copy)**
为了解决浅拷贝的问题，当类中包含指针或动态分配的内存时，通常需要自定义拷贝构造函数，实现深拷贝。深拷贝会为新对象重新分配内存，并复制内容而非地址。



### 2. 赋值运算符重载 (Assignment Operator Overload)

**定义：** 允许两个已存在的对象之间使用 `=` 进行内容复制。

**语法：** `ClassName& operator=(const ClassName& other);`

**作用：**

*   当一个对象赋值给另一个**已存在**的对象时。
*   通常与拷贝构造函数一同实现深拷贝逻辑（“大三法则”或C++11后的“大五法则”）。

**示例：**
```cpp
class MyClass {
public:
    int* data;
    MyClass(int d) {
        data = new int(d);
    }
    // 拷贝构造函数（深拷贝）
    MyClass(const MyClass& other) {
        data = new int(*other.data);
    }
    // 赋值运算符重载（深拷贝）
    MyClass& operator=(const MyClass& other) {
        if (this == &other) { // 防止自我赋值
            return *this;
        }
        delete data; // 释放原有内存
        data = new int(*other.data); // 分配新内存并复制内容
        return *this;
    }
    ~MyClass() {
        delete data;
    }
};

int main() {
    MyClass obj1(10);
    MyClass obj2(20);
    obj2 = obj1; // 调用赋值运算符重载
    // obj2 现在拥有 obj1 的内容，且两者数据在不同内存
    return 0;
}
```

### 3. 静态成员 (Static Members)

#### 静态变量 (Static Variables)

**定义：** 属于类本身而非类的任何特定对象。所有对象共享同一个静态变量的副本。

**特点：**

*   在程序启动时初始化，生命周期贯穿整个程序。
*   必须在类外进行定义和初始化。
*   可以通过类名直接访问 (`ClassName::staticVar`) 或通过对象访问。

**示例：**
```cpp
class MyClass {
public:
    static int count; // 静态变量声明
    MyClass() {
        count++;
    }
    ~MyClass() {
        count--;
    }
};

int MyClass::count = 0; // 静态变量定义和初始化

int main() {
    MyClass obj1;
    MyClass obj2;
    std::cout << MyClass::count << std::endl; // 输出 2
    return 0;
}
```

#### 静态函数 (Static Functions)

**定义：** 不依赖于任何特定的对象，可以直接通过类名调用。

**特点：**

*   不能访问类的非静态成员变量。
*   不能使用 `this` 指针。
*   主要用于访问类的静态成员变量或执行不依赖对象状态的操作。

**示例：**
```cpp
class MyClass {
public:
    static int count;
    MyClass() {
        count++;
    }
    static int getCount() { // 静态函数
        return count; // 只能访问静态成员
    }
};

int MyClass::count = 0;

int main() {
    MyClass obj1;
    MyClass obj2;
    std::cout << MyClass::getCount() << std::endl; // 输出 2
    return 0;
}
```

### 4. `this` 指针

**定义：** `this` 是一个指向当前对象的常量指针。

**作用：**

*   在成员函数内部，用于指向调用该成员函数的对象。
*   区分成员变量和同名的局部变量。
*   返回当前对象的引用（例如，在赋值运算符重载中）。
*   作为参数传递当前对象。

**示例：**
```cpp
class MyClass {
private:
    int value;
public:
    MyClass(int value) {
        this->value = value; // 使用 this 区分成员变量和参数
    }
    void printValue() {
        std::cout << "Value: " << this->value << std::endl;
    }
    MyClass& getSelf() {
        return *this; // 返回当前对象的引用
    }
};
```

### 5. 友元 (Friend)

**定义：** 友元函数或友元类可以访问类的 `private` 和 `protected` 成员。

**作用：**

*   打破封装性，提供对私有成员的特殊访问权限。
*   通常用于重载某些运算符（如 `<<` 用于输出流），或者在两个紧密相关的类之间共享数据。

#### 友元函数

**示例：**
```cpp
class MyClass {
private:
    int secret;
public:
    MyClass(int s) : secret(s) {}
    // 声明 friendFunction 是 MyClass 的友元函数
    friend void friendFunction(MyClass& obj);
};

void friendFunction(MyClass& obj) {
    std::cout << "Friend function can access secret: " << obj.secret << std::endl;
}

int main() {
    MyClass obj(123);
    friendFunction(obj); // 友元函数可以访问 private 成员
    return 0;
}
```

#### 友元类

**示例：**
```cpp
class OtherClass; // 前置声明

class MyClass {
private:
    int secret;
public:
    MyClass(int s) : secret(s) {}
    // 声明 OtherClass 是 MyClass 的友元类
    friend class OtherClass;
};

class OtherClass {
public:
    void accessMyClassSecret(MyClass& obj) {
        std::cout << "OtherClass can access MyClass's secret: " << obj.secret << std::endl;
    }
};

int main() {
    MyClass obj(456);
    OtherClass otherObj;
    otherObj.accessMyClassSecret(obj); // 友元类可以访问 private 成员
    return 0;
}
```

### 6. 组合 (Composition / Has-A 关系)

**定义：** 一个类包含另一个类的对象作为其成员。表示“拥有”或“包含”关系。

**特点：**

*   被包含对象的生命周期通常由包含对象管理。
*   是一种强关联关系。

**示例：**
```cpp
class Engine {
public:
    void start() { std::cout << "Engine started." << std::endl; }
};

class Car { // Car "has an" Engine
private:
    Engine engine; // Engine 对象是 Car 的成员
public:
    void drive() {
        engine.start();
        std::cout << "Car is driving." << std::endl;
    }
};

int main() {
    Car myCar;
    myCar.drive();
    return 0;
}
```
**图示：组合关系**

### 7. 继承 (Inheritance / Is-A 关系)

**定义：** 允许一个类（子类/派生类）从另一个类（基类/父类）继承属性和行为。表示“是”关系。

**语法：** `class DerivedClass : access-specifier BaseClass { ... };`

**三种继承方式：`public`、`protected`、`private`**

这些访问修饰符决定了基类成员在派生类中的可访问性。

| 基类成员访问权限 | `public` 继承 | `protected` 继承 | `private` 继承 |
| :--------------- | :------------ | :--------------- | :------------- |
| `public`         | `public`      | `protected`      | `private`      |
| `protected`      | `protected`   | `protected`      | `private`      |
| `private`        | 不可访问      | 不可访问         | 不可访问       |

*   **`public` 继承：** 基类的 `public` 成员在派生类中仍是 `public`；`protected` 成员仍是 `protected`。这是最常用的继承方式，体现“Is-A”关系。
    ```cpp
    class Base {
    public:
        int pub_mem;
    protected:
        int prot_mem;
    private:
        int priv_mem;
    };
    
    class Derived : public Base {
        // pub_mem 在 Derived 中是 public
        // prot_mem 在 Derived 中是 protected
        // priv_mem 在 Derived 中不可访问
    };
    ```

*   **`protected` 继承：** 基类的 `public` 和 `protected` 成员在派生类中都变为 `protected`。
    ```cpp
    class Derived : protected Base {
        // pub_mem 在 Derived 中是 protected
        // prot_mem 在 Derived 中是 protected
        // priv_mem 在 Derived 中不可访问
    };
    ```

*   **`private` 继承：** 基类的 `public` 和 `protected` 成员在派生类中都变为 `private`。这意味着这些成员在派生类的外部无法访问，即使它们在基类中是 `public` 的。
    ```cpp
    class Derived : private Base {
        // pub_mem 在 Derived 中是 private
        // prot_mem 在 Derived 中是 private
        // priv_mem 在 Derived 中不可访问
    };
    ```
    **图示：继承关系**

### 8. 多态 (Polymorphism)

多态意为“多种形态”，允许一个接口有多种实现。C++ 中的多态分为静态多态和动态多态。

#### 静态多态 (Static Polymorphism / 编译时多态)

在编译时确定调用哪个函数。主要通过函数重载和运算符重载实现。

*   **函数重载 (Function Overloading)：**
    在同一作用域内，函数名相同但参数列表（参数个数、类型或顺序）不同的函数。
    ```cpp
    class Printer {
    public:
        void print(int i) { std::cout << "Printing int: " << i << std::endl; }
        void print(double f) { std::cout << "Printing float: " << f << std::endl; }
        void print(const std::string& s) { std::cout << "Printing string: " << s << std::endl; }
    };
    
    int main() {
        Printer p;
        p.print(10);        // 调用 print(int)
        p.print(3.14);      // 调用 print(double)
        p.print("Hello");   // 调用 print(const std::string&)
        return 0;
    }
    ```

*   **运算符重载 (Operator Overloading)：**
    允许为用户自定义类型定义运算符的行为，使其能像内置类型一样使用运算符。
    ```cpp
    class Point {
    public:
        int x, y;
        Point(int px = 0, int py = 0) : x(px), y(py) {}
    
        // 重载 + 运算符
        Point operator+(const Point& other) {
            return Point(x + other.x, y + other.y);
        }
    };
    
    int main() {
        Point p1(10, 20);
        Point p2(30, 40);
        Point p3 = p1 + p2; // 调用重载的 + 运算符
        std::cout << "P3: (" << p3.x << ", " << p3.y << ")" << std::endl; // 输出 P3: (40, 60)
        return 0;
    }
    ```

#### 动态多态 (Dynamic Polymorphism / 运行时多态)

在运行时确定调用哪个函数。通过虚函数（`virtual` 关键字）和基类指针或引用实现。

**条件：**

1.  基类中必须有 `virtual` 关键字修饰的虚函数。
2.  派生类必须重写（override）基类的虚函数（函数签名必须一致）。
3.  必须通过基类的指针或引用来调用虚函数。

**原理：** 虚函数机制通过虚函数表 (vtable) 实现。每个含有虚函数的类都有一个 vtable，其中存储了该类中所有虚函数的地址。每个对象中含有一个指向其类 vtable 的虚指针 (vptr)。当通过基类指针或引用调用虚函数时，会根据 vptr 找到正确的函数地址并调用。

**示例：**
```cpp
class Animal {
public:
    virtual void speak() const { // 虚函数
        std::cout << "Animal speaks." << std::endl;
    }
    virtual ~Animal() = default; // 虚析构函数，重要！
};

class Dog : public Animal {
public:
    void speak() const override { // 重写虚函数
        std::cout << "Dog barks." << std::endl;
    }
};

class Cat : public Animal {
public:
    void speak() const override { // 重写虚函数
        std::cout << "Cat meows." << std::endl;
    }
};

int main() {
    Animal* myAnimal;

    Dog myDog;
    myAnimal = &myDog;
    myAnimal->speak(); // 输出 "Dog barks." (动态绑定)

    Cat myCat;
    myAnimal = &myCat;
    myAnimal->speak(); // 输出 "Cat meows." (动态绑定)

    // 直接创建基类对象
    Animal basicAnimal;
    myAnimal = &basicAnimal;
    myAnimal->speak(); // 输出 "Animal speaks."

    return 0;
}
```
**虚析构函数的重要性：**
当通过基类指针 `delete` 一个派生类对象时，如果基类的析构函数不是 `virtual`，则只会调用基类的析构函数，而派生类的析构函数不会被调用，这会导致派生类中动态分配的资源无法被正确释放，造成内存泄漏。因此，只要类中有虚函数，就应该将析构函数声明为 `virtual`。
**图示：动态多态**

### 9. `final` 和 `override` 关键字 (C++11)

这两个关键字旨在提高代码的清晰度、安全性和可维护性。

#### `override`

**作用：** 显式地标记派生类中的成员函数意图重写基类中的虚函数。

**好处：**

*   **编译时检查：** 如果标记为 `override` 的函数没有正确重写基类的虚函数（例如，函数签名不匹配、基类函数不是虚函数等），编译器会报错。这有助于避免因拼写错误或签名不匹配导致的问题。
*   **代码清晰：** 明确表明函数是重写基类的虚函数，提高代码可读性。

**示例：**
```cpp
class Base {
public:
    virtual void foo() { std::cout << "Base::foo" << std::endl; }
    virtual void bar() { std::cout << "Base::bar" << std::endl; }
};

class Derived : public Base {
public:
    void foo() override { // 正确重写，并显式标记
        std::cout << "Derived::foo" << std::endl;
    }

    // void baz() override; // 错误：基类没有 baz() 虚函数
    // void bar(int x) override; // 错误：签名不匹配
};
```

#### `final`

**作用：**

1.  **修饰类：** 阻止其他类继承该类。
2.  **修饰虚函数：** 阻止派生类进一步重写该虚函数。

**好处：**

*   **设计意图：** 明确表示一个类或虚函数的设计意图是不应该被扩展或修改的。
*   **性能优化：** 编译器可能对 `final` 虚函数的调用进行优化，因为它知道该函数不会再被重写。

**示例：**
```cpp
// 1. 修饰类：阻止继承
class FinalClass final {
    // ...
};
// class AnotherDerived : public FinalClass {}; // 编译错误：FinalClass 已被 final 修饰

class Base {
public:
    virtual void foo() { std::cout << "Base::foo" << std::endl; }
    virtual void bar() final { std::cout << "Base::bar (final)" << std::endl; } // 阻止进一步重写
};

class Derived : public Base {
public:
    void foo() override {
        std::cout << "Derived::foo" << std::endl;
    }
    // void bar() override; // 编译错误：试图重写 final 虚函数
};
```

### 10. 多继承 (Multiple Inheritance)

**定义：** 一个派生类可以从多个基类继承属性和行为。

**语法：** `class Derived : access-specifier Base1, access-specifier Base2 { ... };`

**特点：**

*   允许一个类组合来自不同来源的功能。
*   可能导致复杂的层次结构和一些设计问题（如二义性）。

**示例：**
```cpp
class Singer {
public:
    void sing() { std::cout << "Singer sings." << std::endl; }
};

class Dancer {
public:
    void dance() { std::cout << "Dancer dances." << std::endl; }
};

class Performer : public Singer, public Dancer { // 多继承
public:
    void perform() {
        sing();
        dance();
        std::cout << "Performer performs." << std::endl;
    }
};

int main() {
    Performer p;
    p.sing();
    p.dance();
    p.perform();
    return 0;
}
```

#### 多继承派生类的构造函数和析构函数

*   **构造顺序：** 基类的构造函数按它们在派生类头文件中声明的顺序（从左到右）调用，然后调用派生类自身的构造函数。
*   **析构顺序：** 析构函数的调用顺序与构造函数的调用顺序相反。先调用派生类的析构函数，然后按基类声明的反序调用基类的析构函数。

**示例：**
```cpp
class BaseA {
public:
    BaseA() { std::cout << "BaseA constructor" << std::endl; }
    ~BaseA() { std::cout << "BaseA destructor" << std::endl; }
};

class BaseB {
public:
    BaseB() { std::cout << "BaseB constructor" << std::endl; }
    ~BaseB() { std::cout << "BaseB destructor" << std::endl; }
};

class DerivedMulti : public BaseA, public BaseB {
public:
    DerivedMulti() { std::cout << "DerivedMulti constructor" << std::endl; }
    ~DerivedMulti() { std::cout << "DerivedMulti destructor" << std::endl; }
};

int main() {
    DerivedMulti dm;
    // 构造顺序：BaseA -> BaseB -> DerivedMulti
    // 析构顺序：DerivedMulti -> BaseB -> BaseA
    return 0;
}
```

#### 多继承的二义性问题 (Ambiguity)

多继承可能导致两种主要的二义性问题：

##### 1. 不同基类有同名成员函数 (Name Ambiguity)

当两个或多个基类拥有同名的成员函数或成员变量时，派生类对象直接访问这些成员时会发生二义性。

**示例：**
```cpp
class Base1 {
public:
    void print() { std::cout << "From Base1" << std::endl; }
};

class Base2 {
public:
    void print() { std::cout << "From Base2" << std::endl; }
};

class DerivedAmbiguous : public Base1, public Base2 {
public:
    void callPrints() {
        // print(); // 编译错误：二义性，不知道调用 Base1::print 还是 Base2::print
        Base1::print(); // 明确指定调用 Base1 的 print
        Base2::print(); // 明确指定调用 Base2 的 print
    }
};

int main() {
    DerivedAmbiguous da;
    da.callPrints();
    // da.print(); // 依然会报错，因为直接通过派生类对象调用时仍有二义性
    da.Base1::print(); // 可以通过作用域解析符直接调用
    return 0;
}
```
**解决方法：**
*   使用作用域解析符 `::` 明确指定要调用的基类成员。
*   在派生类中重写该同名函数，在重写函数中明确调用基类版本。

##### 2. 间接基类成员变量在派生类中有多份拷贝 (Diamond Problem / 菱形继承)

当一个类通过两条或更多路径继承自同一个间接基类时，该间接基类的成员会在派生类中有多份拷贝，从而导致访问二义性和资源浪费。这被称为“菱形继承问题”。

**示例：**
```cpp
class Animal { // 间接基类
public:
    Animal() : age(0) {}
    int age;
};

class Mammal : public Animal { // 继承 Animal
    // ...
};

class Bird : public Animal { // 继承 Animal
    // ...
};

class Bat : public Mammal, public Bird { // 派生类，通过 Mammal 和 Bird 两次继承 Animal
    // ...
};

int main() {
    Bat b;
    // b.age = 5; // 编译错误：二义性，不知道是 Mammal::age 还是 Bird::age
    b.Mammal::age = 5; // 明确指定
    b.Bird::age = 10;   // 明确指定
    std::cout << b.Mammal::age << std::endl; // 输出 5
    std::cout << b.Bird::age << std::endl;   // 输出 10
    // 实际上 Bat 对象中有两份 Animal::age 的拷贝
    return 0;
}
```
**图示：菱形继承问题**

#### 虚继承 (Virtual Inheritance)

**作用：** 解决菱形继承问题，确保间接基类在派生类中只有一份拷贝。

**语法：** 在继承列表中使用 `virtual` 关键字：`class Derived : virtual public Base { ... };`

**原理：** 当一个类虚继承自某个基类时，该基类被称为虚基类。无论通过多少条路径，只要虚基类被虚继承，它在最终的派生类对象中只会存在一个共享的子对象。

**示例：**
```cpp
class Animal { // 间接基类
public:
    Animal() : age(0) {}
    int age;
};

class Mammal : virtual public Animal { // 虚继承 Animal
    // ...
};

class Bird : virtual public Animal { // 虚继承 Animal
    // ...
};

class Bat : public Mammal, public Bird { // 派生类
    // ...
};

int main() {
    Bat b;
    b.age = 5; // 现在不再有二义性，因为只有一个 Animal::age 拷贝
    std::cout << b.age << std::endl; // 输出 5
    return 0;
}
```
**虚继承的构造函数调用：**
在虚继承中，虚基类的构造函数由最终的派生类（而不是它的直接基类）负责调用。如果中间的直接基类也尝试初始化虚基类，这些初始化会被忽略。

### 11. 虚函数与纯虚函数 (Virtual Functions and Pure Virtual Functions)

#### 虚函数 (Virtual Function)

**回顾：** 允许运行时多态，通过基类指针或引用调用派生类中的重写函数。

**语法：** `virtual returnType functionName(parameters) { ... }`

**特点：**

*   基类提供一个默认实现（即使是空的）。
*   派生类可以选择重写或不重写。

**示例 (同前述动态多态部分)：**
```cpp
class Animal {
public:
    virtual void speak() const {
        std::cout << "Animal speaks." << std::endl;
    }
};

class Dog : public Animal {
public:
    void speak() const override {
        std::cout << "Dog barks." << std::endl;
    }
};
```

#### 纯虚函数 (Pure Virtual Function)

**定义：** 没有实现的虚函数，用于声明接口。

**语法：** `virtual returnType functionName(parameters) = 0;`

**特点：**

*   一个类只要包含一个或多个纯虚函数，它就成为一个 **抽象类 (Abstract Class)**。
*   抽象类不能被实例化（不能创建对象）。
*   派生类必须实现（重写）其所有纯虚函数，否则它自身也成为抽象类。
*   通常用于定义接口规范，强制派生类提供特定的功能。

**示例：**
```cpp
class Shape { // 抽象类
public:
    // 纯虚函数：要求派生类必须实现 area()
    virtual double area() const = 0;
    // 虚析构函数：保证多态下正确释放资源
    virtual ~Shape() = default;
};

class Circle : public Shape {
private:
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { // 必须实现纯虚函数
        return 3.14159 * radius * radius;
    }
};

class Rectangle : public Shape {
private:
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double area() const override { // 必须实现纯虚函数
        return width * height;
    }
};

int main() {
    // Shape s; // 编译错误：不能实例化抽象类

    Shape* s1 = new Circle(5.0);
    Shape* s2 = new Rectangle(4.0, 6.0);

    std::cout << "Circle area: " << s1->area() << std::endl;     // 动态绑定到 Circle::area()
    std::cout << "Rectangle area: " << s2->area() << std::endl; // 动态绑定到 Rectangle::area()

    delete s1;
    delete s2;
    return 0;
}
```
**图示：虚函数与纯虚函数**

## 动态内存管理

### 内存分区

C++程序在运行时，内存大致被划分为以下几个区域：

- **程序运行前已划分：**
  - 代码区 (Code Area)
  - 全局区 (Global Area)
- **程序运行后划分：**
  - 栈区 (Stack Area)
  - 堆区 (Heap Area)

### 代码区 (Code Area)

存放函数体的二进制代码，程序的入口点信息和一些元数据，由操作系统进行管理。

- **内容**：存放 CPU 执行的机器指令。
- **特点**：
  - **共享 (Shared):** 对于频繁被执行的程序，在内存中只需要有一份代码即可。
  - **只读 (Read-only):** 防止程序意外地修改了它的指令。

### 全局区 (Global Area)

**已初始化数据段**存储那些在定义时就被赋予具体值的全局变量和静态变量

**未初始化数据段（BSS段）**则存储那些没有显式初始化或被初始化为零的全局和静态变量，操作系统在程序开始执行前会自动将整个BSS段清零

- 该区域内部也包含一个**常量区**，用于存放 const 修饰的**全局**常量和字符串常量。
- **生命周期**：在程序结束后由操作系统释放。

### 栈区 (Stack Area)

每当程序调用一个函数时，系统会为该函数创建一个新的**栈帧**（Stack Frame）。这个栈帧包含了函数运行所需的所有局部信息：参数值、局部变量、返回地址，以及一些用于恢复调用者状态的寄存器信息。

由编译器**自动分配和释放**。

- **内容**：存放函数的**参数值**和**局部变量**等。
- **特点**：栈上的内存分配和释放速度快，但空间有限。

> **注意：** 不要返回局部变量的地址。因为函数执行完毕后，栈上的内存会被立即释放，返回的地址将指向一块无效的内存（悬挂指针），对其操作会导致未定义行为。

### 堆区 (Heap Area)

由程序员**手动分配和释放**。

- **内存管理方式**：使用 new 关键字进行内存分配，使用 delete 关键字进行内存释放。
- **生命周期**：如果程序员不手动释放，程序结束时通常由操作系统回收。忘记释放可能导致**内存泄漏** (Memory Leak)。
- new 和 delete 必须配对使用，以确保内存被正确回收。
  - new 返回的是指向新分配内存的指针。
  - delete 接收一个指针，释放该指针指向的内存。

### new与delete

new 和 delete 是C++中用于管理**堆区 (Heap)** 内存的两个核心操作符。

#### 1. new 操作符

new 用于在堆上动态分配内存。它会计算所需类型的大小，在堆上找到一块合适的内存，并返回该内存块的地址（即指针）。

语法：new 数据类型(初始值);

```C++
// 基本类型的分配与初始化
int* single_int = new int(42);        // 分配并初始化为42
int* zero_int = new int();            // 分配并初始化为0（值初始化）
int* uninitialized = new int;         // 分配但不初始化（默认初始化）

// 对于内置类型，这三种方式的区别很重要
// uninitialized指向的内存可能包含任何垃圾值
```

语法：new 数据类型[数组长度];

```C++
// 在堆区创建一个包含10个整型元素的数组
int* arr = new int[10];
// 使用new int[10]时，系统不仅要分配40个字节的连续内存（假设int为4字节），还要在某个地方记录数组的大小信息，以便delete[]操作符知道要释放多少内存。
```

------

#### 2. delete 操作符

调用delete时，操作符首先会检查指针是否为空指针（nullptr），如果是，则安全地什么都不做。

对于非空指针，delete会首先调用对象的析构函数（如果是类对象），然后将内存标记为可用，返回给堆管理器。

delete并不会立即清零内存内容，也不会修改指针变量本身的值。---释放后置空

 **禁止重复释放**：不能对同一块内存 delete 两次。这会导致程序崩溃。

语法：delete 指针变量;

```C++
int* p = new int(10);
// ... 使用 p 指向的内存 ...
delete p; // 释放 p 指向的单个int内存
```

语法：delete[] 指针变量;

**注意：** 释放数组内存时，必须使用 delete[]，否则可能只会释放数组的第一个元素的内存，导致内存泄漏。

```C++
int* arr = new int[10];
// ... 使用 arr 数组 ...
delete[] arr; // 释放整个数组的内存
```

------



**内存泄漏** (Memory Leak)：如果使用 new 分配了内存，但忘记了 delete，并且指向该内存的指针丢失了（例如，指针变量超出了作用域），那么这块内存就无法被释放，直到程序结束。这就是内存泄漏。长时间运行的程序中，内存泄漏会耗尽系统资源。



### 智能指针 (Smart Pointers)

智能指针是 C++11 引入的类模板，用于模拟指针行为，同时提供自动的内存管理功能。核心思想是 **RAII (Resource Acquisition Is Initialization)**，即在对象构造时获取资源，在对象析构时自动释放资源。

#### std::unique_ptr (独占指针)

std::unique_ptr 实现对所管理对象的**独占所有权**。

- **特点**：
  - 同一时间内，只有一个 unique_ptr 可以指向一个给定的对象。
  - 当 unique_ptr 被销毁（例如离开作用域）时，它所指向的对象也会被自动删除。
  - 所有权是唯一的，因此 unique_ptr **不可复制**，但**可以移动 (move)**。
- **适用场景**：当你需要一个指针，并明确它是这块内存的唯一管理者时。这是智能指针的**首选**。

```c++
#include <iostream>
#include <memory>

class Resource {
public:
    Resource(int id) : id_(id) {
        std::cout << "Resource " << id_ << " created\n";
    }
    
    ~Resource() {
        std::cout << "Resource " << id_ << " destroyed\n";
    }
    
    void use() {
        std::cout << "Using resource " << id_ << "\n";
    }
    
private:
    int id_;
};

void demonstrateUniquePtr() {
    std::cout << "=== unique_ptr 演示 ===\n";
    
    // 1. 创建unique_ptr的推荐方式
    auto ptr1 = std::make_unique<Resource>(1);
    ptr1->use();
    
    // 2. 移动语义：转移所有权
    auto ptr2 = std::move(ptr1);  // ptr1现在为空
    if (!ptr1) {
        std::cout << "ptr1 现在为空\n";
    }
    ptr2->use();
    
    // 3. 释放并获取原始指针
    Resource* raw = ptr2.release();  // ptr2不再管理资源
    std::cout << "手动使用原始指针: ";
    raw->use();
    delete raw;  // 必须手动删除
    
    // 4. 重置为新资源
    auto ptr3 = std::make_unique<Resource>(3);
    ptr3.reset(new Resource(4));  // 自动删除Resource(3), 管理Resource(4)
    
} // ptr3在此处自动销毁Resource(4)

int main() {
    demonstrateUniquePtr();
    std::cout << "程序结束\n";
    return 0;
}
```

#### std::shared_ptr (共享指针)

std::shared_ptr 实现对所管理对象的**共享所有权**。

- **特点**：
  - 多个 shared_ptr 可以指向同一个对象。
  - 内部维护一个**引用计数**。每当有一个新的 shared_ptr 指向该对象时，计数加一；每当一个 shared_ptr 被销毁时，计数减一。
  - 当引用计数变为 0 时，最后一个 shared_ptr 会自动删除所管理的对象。
- **适用场景**：当多个代码块需要共同拥有和管理同一块内存的生命周期时。

```c++
#include <iostream>
#include <memory>
#include <vector>

class SharedResource {
public:
    SharedResource(const std::string& name) : name_(name) {
        std::cout << "SharedResource '" << name_ << "' created\n";
    }
    
    ~SharedResource() {
        std::cout << "SharedResource '" << name_ << "' destroyed\n";
    }
    
    void display() const {
        std::cout << "Resource: " << name_ << "\n";
    }
    
private:
    std::string name_;
};

void printRefCount(const std::shared_ptr<SharedResource>& ptr, const std::string& label) {
    std::cout << label << " 引用计数: " << ptr.use_count() << "\n";
}

void demonstrateSharedPtr() {
    std::cout << "=== shared_ptr 演示 ===\n";
    
    // 1. 创建shared_ptr
    auto ptr1 = std::make_shared<SharedResource>("共享资源");
    printRefCount(ptr1, "ptr1创建后");
    
    {
        // 2. 复制shared_ptr，引用计数增加
        auto ptr2 = ptr1;  // 引用计数变为2
        printRefCount(ptr1, "ptr2复制后");
        
        // 3. 在容器中存储shared_ptr
        std::vector<std::shared_ptr<SharedResource>> resources;
        resources.push_back(ptr1);  // 引用计数变为3
        printRefCount(ptr1, "加入容器后");
        
        ptr1->display();
        ptr2->display();
        
    } // ptr2和容器在此处销毁，引用计数减为1
    
    printRefCount(ptr1, "作用域结束后");
    
    // 4. 重置shared_ptr
    ptr1.reset();  // 引用计数变为0，资源被销毁
    std::cout << "ptr1 reset后，资源应该已被销毁\n";
}

// 展示shared_ptr的工厂函数模式
std::shared_ptr<SharedResource> createResource(const std::string& name) {
    return std::make_shared<SharedResource>(name);
}

void demonstrateFactoryPattern() {
    std::cout << "\n=== 工厂模式演示 ===\n";
    
    auto resource = createResource("工厂创建的资源");
    std::cout << "从工厂获得资源，引用计数: " << resource.use_count() << "\n";
    
    // 多个客户端共享同一资源
    auto client1 = resource;
    auto client2 = resource;
    
    std::cout << "两个客户端共享后，引用计数: " << resource.use_count() << "\n";
}

int main() {
    demonstrateSharedPtr();
    demonstrateFactoryPattern();
    std::cout << "程序结束\n";
    return 0;
}
```

#### std::weak_ptr (弱指针)

std::weak_ptr 是一种**非拥有型**的智能指针，它指向由 shared_ptr 管理的对象，但**不增加引用计数**。

- **特点**：
  - 主要用于解决 shared_ptr 的**循环引用**问题。当两个或多个`shared_ptr`形成循环依赖时，它们的引用计数永远不会降到零，导致内存泄漏。
  - 不能直接访问对象，必须通过调用 lock() 方法获取一个临时的 shared_ptr。
  - 如果对象已被销毁，lock() 会返回一个空的 shared_ptr。
- **适用场景**：监视一个对象，但不想影响其生命周期，例如在缓存、观察者模式和防止循环引用时使用。

```c++
#include <iostream>
#include <memory>

// 问题场景：父子关系可能导致循环引用
class Child;

class Parent {
public:
    Parent(const std::string& name) : name_(name) {
        std::cout << "Parent " << name_ << " created\n";
    }
    
    ~Parent() {
        std::cout << "Parent " << name_ << " destroyed\n";
    }
    
    void addChild(std::shared_ptr<Child> child) {
        child_ = child;
    }
    
    void showChild();
    
    std::string getName() const { return name_; }
    
private:
    std::string name_;
    std::shared_ptr<Child> child_;  // 父节点拥有子节点
};

class Child {
public:
    Child(const std::string& name) : name_(name) {
        std::cout << "Child " << name_ << " created\n";
    }
    
    ~Child() {
        std::cout << "Child " << name_ << " destroyed\n";
    }
    
    // 使用weak_ptr避免循环引用
    void setParent(std::shared_ptr<Parent> parent) {
        parent_ = parent;  // weak_ptr不增加引用计数
    }
    
    void showParent() {
        // 使用lock()获取shared_ptr，如果对象已销毁则返回空指针
        if (auto parent = parent_.lock()) {
            std::cout << "Child " << name_ << " has parent: " << parent->getName() << "\n";
        } else {
            std::cout << "Child " << name_ << " parent已经销毁或不存在\n";
        }
    }
    
    std::string getName() const { return name_; }
    
private:
    std::string name_;
    std::weak_ptr<Parent> parent_;  // 弱引用，不拥有父节点
};

void Parent::showChild() {
    if (child_) {
        std::cout << "Parent " << name_ << " has child: " << child_->getName() << "\n";
    }
}

void demonstrateCircularReference() {
    std::cout << "=== 演示循环引用解决方案 ===\n";
    
    auto parent = std::make_shared<Parent>("张三");
    auto child = std::make_shared<Child>("小明");
    
    // 建立父子关系
    parent->addChild(child);
    child->setParent(parent);
    
    parent->showChild();
    child->showParent();
    
    std::cout << "Parent引用计数: " << parent.use_count() << "\n";
    std::cout << "Child引用计数: " << child.use_count() << "\n";
    
} // 当作用域结束时，对象能正确销毁，因为没有循环引用

void demonstrateWeakPtrLifetime() {
    std::cout << "\n=== 演示weak_ptr生命周期 ===\n";
    
    std::weak_ptr<Parent> weak_parent;
    
    {
        auto parent = std::make_shared<Parent>("临时父节点");
        weak_parent = parent;
        
        std::cout << "在作用域内，weak_ptr.expired(): " << weak_parent.expired() << "\n";
        
        if (auto locked = weak_parent.lock()) {
            std::cout << "成功获取shared_ptr: " << locked->getName() << "\n";
        }
        
    } // parent在此处销毁
    
    std::cout << "作用域外，weak_ptr.expired(): " << weak_parent.expired() << "\n";
    
    if (auto locked = weak_parent.lock()) {
        std::cout << "不应该执行到这里\n";
    } else {
        std::cout << "weak_ptr.lock()返回空指针，对象已销毁\n";
    }
}

// 展示观察者模式中的weak_ptr应用
class Observable {
public:
    Observable(const std::string& name) : name_(name) {}
    
    void addObserver(std::shared_ptr<class Observer> observer) {
        observers_.push_back(observer);  // 使用weak_ptr存储观察者
    }
    
    void notify(const std::string& event);
    
private:
    std::string name_;
    std::vector<std::weak_ptr<class Observer>> observers_;
};

class Observer {
public:
    Observer(const std::string& name) : name_(name) {}
    
    void onEvent(const std::string& source, const std::string& event) {
        std::cout << "Observer " << name_ << " 收到来自 " << source << " 的事件: " << event << "\n";
    }
    
    std::string getName() const { return name_; }
    
private:
    std::string name_;
};

void Observable::notify(const std::string& event) {
    // 清理已销毁的观察者
    observers_.erase(
        std::remove_if(observers_.begin(), observers_.end(),
            [](const std::weak_ptr<Observer>& wp) { return wp.expired(); }),
        observers_.end()
    );
    
    // 通知存活的观察者
    for (auto& weak_obs : observers_) {
        if (auto obs = weak_obs.lock()) {
            obs->onEvent(name_, event);
        }
    }
}

void demonstrateObserverPattern() {
    std::cout << "\n=== 观察者模式演示 ===\n";
    
    Observable subject("数据源");
    
    {
        auto observer1 = std::make_shared<Observer>("观察者1");
        auto observer2 = std::make_shared<Observer>("观察者2");
        
        subject.addObserver(observer1);
        subject.addObserver(observer2);
        
        subject.notify("初始事件");
        
    } // observer1和observer2在此处销毁
    
    std::cout << "观察者已销毁后：\n";
    subject.notify("后续事件");  // 不会通知任何观察者
}

int main() {
    demonstrateCircularReference();
    demonstrateWeakPtrLifetime();
    demonstrateObserverPattern();
    std::cout << "程序结束\n";
    return 0;
}
```

#### 自定义删除器

```c++
#include <iostream>
#include <memory>
#include <fstream>
#include <cstdio>

// 1. 文件资源管理
void demonstrateFileDeleter() {
    std::cout << "=== 文件资源管理 ===\n";
    
    // 自定义删除器：关闭FILE*
    auto fileDeleter = [](FILE* f) {
        if (f) {
            std::cout << "关闭文件\n";
            fclose(f);
        }
    };
    
    // 使用unique_ptr管理FILE*
    std::unique_ptr<FILE, decltype(fileDeleter)> file(
        fopen("test.txt", "w"), 
        fileDeleter
    );
    
    if (file) {
        fprintf(file.get(), "Hello, RAII!\n");
        std::cout << "文件写入完成\n";
        // 文件会自动关闭，无需手动fclose
    }
}

// 2. 数组删除器
void demonstrateArrayDeleter() {
    std::cout << "\n=== 数组资源管理 ===\n";
    
    // C++14之前处理数组的方式
    std::unique_ptr<int[]> arr1(new int[5]{1, 2, 3, 4, 5});
    
    // 自定义数组删除器（演示用，实际中用上面的方式）
    auto arrayDeleter = [](int* p) {
        std::cout << "删除数组\n";
        delete[] p;
    };
    
    std::unique_ptr<int, decltype(arrayDeleter)> arr2(
        new int[3]{10, 20, 30}, 
        arrayDeleter
    );
    
    // 访问数组元素
    for (int i = 0; i < 5; ++i) {
        std::cout << "arr1[" << i << "] = " << arr1[i] << "\n";
    }
}

// 3. 资源池管理
class ConnectionPool {
public:
    struct Connection {
        int id;
        bool in_use = false;
        
        Connection(int id) : id(id) {
            std::cout << "Connection " << id << " created\n";
        }
        
        ~Connection() {
            std::cout << "Connection " << id << " destroyed\n";
        }
        
        void query(const std::string& sql) {
            std::cout << "Connection " << id << " executing: " << sql << "\n";
        }
    };
    
private:
    static ConnectionPool& instance() {
        static ConnectionPool pool;
        return pool;
    }
    
    std::vector<std::unique_ptr<Connection>> connections_;
    
public:
    static std::unique_ptr<Connection, std::function<void(Connection*)>> 
    getConnection() {
        auto& pool = instance();
        
        // 简化实现：总是创建新连接
        auto conn = std::make_unique<Connection>(pool.connections_.size() + 1);
        Connection* raw_ptr = conn.release();
        
        // 自定义删除器：归还到池中而不是删除
        auto returner = [](Connection* c) {
            std::cout << "Connection " << c->id << " returned to pool\n";
            // 在真实实现中，这里会将连接归还到池中
            // 为了演示，我们直接删除
            delete c;
        };
        
        return std::unique_ptr<Connection, std::function<void(Connection*)>>(
            raw_ptr, returner
        );
    }
};

void demonstrateConnectionPool() {
    std::cout << "\n=== 连接池管理 ===\n";
    
    {
        auto conn1 = ConnectionPool::getConnection();
        auto conn2 = ConnectionPool::getConnection();
        
        conn1->query("SELECT * FROM users");
        conn2->query("SELECT * FROM products");
        
        std::cout << "连接使用完毕，即将自动归还\n";
        
    } // 连接在此处自动归还到池中
    
    std::cout << "连接已归还\n";
}

// 4. 智能指针与C API集成
extern "C" {
    // 模拟C库API
    typedef struct {
        int id;
        char name[32];
    } CResource;
    
    CResource* c_create_resource(int id, const char* name) {
        CResource* res = (CResource*)malloc(sizeof(CResource));
        res->id = id;
        strncpy(res->name, name, 31);
        res->name[31] = '\0';
        printf("C资源 %d (%s) 已创建\n", res->id, res->name);
        return res;
    }
    
    void c_destroy_resource(CResource* res) {
        if (res) {
            printf("C资源 %d (%s) 已销毁\n", res->id, res->name);
            free(res);
        }
    }
    
    void c_use_resource(CResource* res) {
        if (res) {
            printf("使用C资源 %d (%s)\n", res->id, res->name);
        }
    }
}

void demonstrateCApiIntegration() {
    std::cout << "\n=== C API集成 ===\n";
    
    // 将C API包装为智能指针
    auto cDeleter = [](CResource* res) {
        c_destroy_resource(res);
    };
    
    std::unique_ptr<CResource, decltype(cDeleter)> resource(
        c_create_resource(1, "重要资源"),
        cDeleter
    );
    
    if (resource) {
        c_use_resource(resource.get());
        // 资源会自动清理
    }
}

// 5. 条件删除器
class ConditionalResource {
public:
    ConditionalResource(int id, bool should_log) 
        : id_(id), should_log_(should_log) {
        std::cout << "ConditionalResource " << id_ << " created\n";
    }
    
    ~ConditionalResource() {
        if (should_log_) {
            std::cout << "ConditionalResource " << id_ << " destroyed with logging\n";
        }
    }
    
    int getId() const { return id_; }
    
private:
    int id_;
    bool should_log_;
};

void demonstrateConditionalDeleter() {
    std::cout << "\n=== 条件删除器 ===\n";
    
    // 根据运行时条件决定删除行为
    bool verbose_mode = true;
    
    auto conditionalDeleter = [verbose_mode](ConditionalResource* res) {
        if (verbose_mode) {
            std::cout << "详细模式：准备删除资源 " << res->getId() << "\n";
        }
        delete res;
        if (verbose_mode) {
            std::cout << "详细模式：资源删除完成\n";
        }
    };
    
    std::unique_ptr<ConditionalResource, decltype(conditionalDeleter)> resource(
        new ConditionalResource(100, false),  // 对象本身不记录日志
        conditionalDeleter                     // 但删除器会记录
    );
    
    std::cout << "使用资源 " << resource->getId() << "\n";
}

int main() {
    demonstrateFileDeleter();
    demonstrateArrayDeleter();
    demonstrateConnectionPool();
    demonstrateCApiIntegration();
    demonstrateConditionalDeleter();
    
    std::cout << "\n程序结束\n";
    return 0;
}
```



`unique_ptr`几乎没有性能开销，因为它只是对原始指针的薄包装。编译器通常能够完全优化掉这层抽象。相比之下，`shared_ptr`需要维护引用计数，这涉及原子操作，在多线程环境中可能成为性能瓶颈。

内存对齐和缓存优化

### 内存对齐 (Memory Alignment)

内存对齐是指数据在内存中的存放地址需要是其自身大小的整数倍。

#### 为什么需要内存对齐？

- **性能**：CPU 访问内存不是逐字节读取的，而是以一个**字 (Word)**（通常是 4 或 8 字节）为单位进行块读取。如果数据是对齐的，CPU 只需一次内存访问即可读取。如果数据未对齐（跨越了两个字），CPU 可能需要两次内存访问并进行额外处理，严重影响性能。
- **硬件要求**：某些硬件平台（如一些 ARM 处理器）强制要求内存对齐，访问未对齐的数据会直接导致程序崩溃。

#### 编译器如何处理对齐？

编译器会自动在结构体或类成员之间插入**填充字节 (Padding)**，以保证每个成员都满足其对齐要求。

```c++
#include <iostream>
#include <iomanip>
#include <cstddef>
#include <type_traits>

// alignof(Type): 查询一个类型的对齐要求
// 模板函数用于分析任意类型的对齐信息
template<typename T>
void analyzeType(const char* typeName) {
    std::cout << std::setw(12) << typeName << " | "
        << std::setw(4) << sizeof(T) << " | "
        << std::setw(4) << alignof(T) << " | ";

    // 检查是否是标准布局类型
    if constexpr (std::is_standard_layout_v<T>) {
        std::cout << "标准布局";
    }
    else {
        std::cout << "非标准布局";
    }
    std::cout << std::endl;
}


// 演示继承对对齐的影响
struct BaseStruct {
    int base_member;
};

struct DerivedStruct : BaseStruct {
    char derived_member;
    double derived_double;
};

// 演示虚函数对对齐的影响
struct VirtualStruct {
    virtual void virtualFunc() {}
    char c;
    int i;
};

// 用于展示内存布局的辅助函数
template<typename T>
void showMemoryLayout(const T& obj, const char* structName) {
    std::cout << "\n=== " << structName << " 内存布局分析 ===" << std::endl;
    std::cout << "结构体大小: " << sizeof(T) << " 字节" << std::endl;
    std::cout << "结构体对齐: " << alignof(T) << " 字节" << std::endl;
    std::cout << "对象地址: " << &obj << std::endl;

    // 显示内存内容（以十六进制形式）
    const unsigned char* bytes = reinterpret_cast<const unsigned char*>(&obj);
    std::cout << "内存内容: ";
    for (size_t i = 0; i < sizeof(T); ++i) {
        if (i % 8 == 0 && i > 0) std::cout << " ";
        std::cout << std::hex << std::setw(2) << std::setfill('0')
            << static_cast<int>(bytes[i]) << " ";
    }
    std::cout << std::dec << std::endl;
}

int main() {
    std::cout << "=== C++ 内存对齐详细分析 ===" << std::endl;
    std::cout << std::setw(12) << "类型" << " | "
        << std::setw(4) << "大小" << " | "
        << std::setw(4) << "对齐" << " | " << "特性" << std::endl;
    std::cout << std::string(40, '-') << std::endl;

    analyzeType<DerivedStruct>("DerivedStruct");
    analyzeType<VirtualStruct>("VirtualStruct");


    return 0;
}
```

> **优化技巧**：在定义结构体时，将成员变量按其大小**从大到小**排列，可以最小化填充字节，节省内存。

#### 手动控制对齐

```c++
#include <iostream>
#include <iomanip>
#include <cstddef>
#include <memory>
#include <new>

// 1. 使用alignas指定对齐要求（C++11标准方法）
struct AlignasExample {
    alignas(16) char data[13];  // 强制16字节对齐，即使只需要1字节
    int value;
};

// 2. 使用alignas对齐到硬件缓存行大小（通常64字节）
struct alignas(64) CacheLineAligned {
    int counter;
    char padding[60];  // 手动填充到64字节
};

// 3. 自定义对齐的智能分配器
template<size_t Alignment>
class AlignedAllocator {
public:
    template<typename T>
    static T* allocate(size_t count) {
        size_t size = sizeof(T) * count;
        // 使用aligned_alloc确保分配的内存满足对齐要求
        void* ptr = std::aligned_alloc(Alignment, size);
        if (!ptr) {
            throw std::bad_alloc();
        }
        return static_cast<T*>(ptr);
    }
    
    template<typename T>
    static void deallocate(T* ptr) {
        std::free(ptr);
    }
};

// 4. 演示不同对齐策略对内存使用的影响
struct TestData {
    char c;
    int i;
    double d;
};

// 紧密打包版本
#pragma pack(push, 1)
struct PackedTestData {
    char c;
    int i;
    double d;
};
#pragma pack(pop)

// 缓存友好版本
struct alignas(64) CacheFriendlyData {
    // 将经常一起访问的数据放在同一缓存行中
    int frequently_accessed[8];  // 32字节
    char status;                 // 1字节
    char padding[31];            // 填充到64字节边界
    
    // 不常访问的大数据放在另一个缓存行
    double large_array[8];       // 64字节，会占用下一个缓存行
};

// 用于测量内存地址对齐的辅助函数
bool isAlignedTo(const void* ptr, size_t alignment) {
    return reinterpret_cast<uintptr_t>(ptr) % alignment == 0;
}

// 展示内存对齐影响的性能测试框架
class AlignmentPerformanceDemo {
private:
    static constexpr size_t ARRAY_SIZE = 1000;
    
public:
    // 演示未对齐访问的潜在问题
    static void demonstrateAlignmentImpact() {
        std::cout << "=== 对齐影响演示 ===" << std::endl;
        
        // 分配一块内存
        char* buffer = new char[sizeof(double) + 16];
        
        // 创建对齐和未对齐的double指针
        double* aligned_ptr = reinterpret_cast<double*>(
            (reinterpret_cast<uintptr_t>(buffer) + 7) & ~7  // 8字节对齐
        );
        double* unaligned_ptr = reinterpret_cast<double*>(
            reinterpret_cast<uintptr_t>(aligned_ptr) + 1    // 故意未对齐
        );
        
        std::cout << "缓冲区地址: " << static_cast<void*>(buffer) << std::endl;
        std::cout << "对齐指针: " << aligned_ptr 
                  << " (对齐: " << isAlignedTo(aligned_ptr, 8) << ")" << std::endl;
        std::cout << "未对齐指针: " << unaligned_ptr 
                  << " (对齐: " << isAlignedTo(unaligned_ptr, 8) << ")" << std::endl;
        
        // 注意：在某些架构上，访问未对齐的指针可能会导致性能下降或运行时错误
        // 这里我们只演示概念，实际使用中要避免这种情况
        
        delete[] buffer;
    }
    
    // 演示缓存行对齐的重要性
    static void demonstrateCacheLineAlignment() {
        std::cout << "\n=== 缓存行对齐演示 ===" << std::endl;
        
        // 创建缓存行对齐的数据
        CacheFriendlyData* cache_data = new(std::align_val_t{64}) CacheFriendlyData;
        
        std::cout << "CacheFriendlyData 地址: " << cache_data << std::endl;
        std::cout << "frequently_accessed 地址: " << cache_data->frequently_accessed << std::endl;
        std::cout << "large_array 地址: " << cache_data->large_array << std::endl;
        
        // 检查是否正确对齐到缓存行边界
        std::cout << "缓存行对齐 (64字节): " 
                  << isAlignedTo(cache_data, 64) << std::endl;
        
        // 计算不同部分之间的字节距离
        uintptr_t base = reinterpret_cast<uintptr_t>(cache_data);
        uintptr_t array_offset = reinterpret_cast<uintptr_t>(cache_data->large_array) - base;
        std::cout << "large_array 偏移: " << array_offset << " 字节" << std::endl;
        
        delete cache_data;
    }
};

int main() {
    std::cout << "=== C++ 内存对齐控制技术详解 ===" << std::endl;
    
    // 分析不同对齐策略的内存使用
    std::cout << "\n=== 内存使用对比 ===" << std::endl;
    std::cout << "TestData (默认对齐):      " << sizeof(TestData) << " 字节" << std::endl;
    std::cout << "PackedTestData (1字节对齐): " << sizeof(PackedTestData) << " 字节" << std::endl;
    std::cout << "AlignasExample (16字节对齐): " << sizeof(AlignasExample) << " 字节" << std::endl;
    std::cout << "CacheLineAligned (64字节):  " << sizeof(CacheLineAligned) << " 字节" << std::endl;
    std::cout << "CacheFriendlyData:          " << sizeof(CacheFriendlyData) << " 字节" << std::endl;
    
    // 验证alignas的效果
    AlignasExample alignas_obj;
    std::cout << "\n=== alignas 验证 ===" << std::endl;
    std::cout << "alignas_obj.data 地址: " << static_cast<void*>(alignas_obj.data) << std::endl;
    std::cout << "16字节对齐验证: " << isAlignedTo(alignas_obj.data, 16) << std::endl;
    
    // 演示自定义分配器
    std::cout << "\n=== 自定义对齐分配器 ===" << std::endl;
    try {
        int* aligned_array = AlignedAllocator<32>::allocate<int>(10);
        std::cout << "32字节对齐数组地址: " << aligned_array << std::endl;
        std::cout << "32字节对齐验证: " << isAlignedTo(aligned_array, 32) << std::endl;
        
        // 使用分配的内存
        for (int i = 0; i < 10; ++i) {
            aligned_array[i] = i * i;
        }
        
        std::cout << "数组内容: ";
        for (int i = 0; i < 10; ++i) {
            std::cout << aligned_array[i] << " ";
        }
        std::cout << std::endl;
        
        AlignedAllocator<32>::deallocate(aligned_array);
    } catch (const std::bad_alloc& e) {
        std::cout << "内存分配失败: " << e.what() << std::endl;
    }
    
    // 运行性能演示
    AlignmentPerformanceDemo::demonstrateAlignmentImpact();
    AlignmentPerformanceDemo::demonstrateCacheLineAlignment();
    
    std::cout << "\n=== 关键要点总结 ===" << std::endl;
    std::cout << "1. alignas 提供了标准化的对齐控制方式" << std::endl;
    std::cout << "2. 过度对齐会增加内存使用，需要权衡性能和空间" << std::endl;
    std::cout << "3. 缓存行对齐对于高性能应用非常重要" << std::endl;
    std::cout << "4. #pragma pack 可以减少内存使用，但可能影响性能" << std::endl;
    std::cout << "5. 自定义分配器提供了运行时对齐控制的灵活性" << std::endl;
    
    return 0;
}
```

## 模板

### 1. 模板的核心思想：泛型编程

模板是 C++ **泛型编程 (Generic Programming)** 的基石，实现了**编译期多态**。它允许编写**与类型无关**的代码，将处理逻辑从具体数据类型中解耦。

**核心机制**

- **模板实例化 (Instantiation)**：编译器在**编译时**根据使用的具体类型自动生成相应版本的代码，

  **按需实例化**：只有被实际使用的模板才会被实例化

  **成员函数按需实例化**：类模板的成员函数只在被调用时才实例化

- **零运行时开销**：所有多态解析在编译期完成，无运行时性能损失

- **类型安全**：编译期进行严格的类型检查

### 2. 模板的种类

当函数模板和普通函数都完全匹配时，**优先选择普通函数**，但前提是匹配程度相同

`func<>()`可强制调用模板

**类模板与函数模板区别的核心在于**：

1. 类模板没有自动类型推导机制（需要显式指定模板参数）
2. 类模板在处理友元函数时存在特殊的作用域和实例化规则

#### 2.1 函数模板 (Function Templates)

让函数能够处理任意类型的参数，只要这些类型支持函数体内的操作。

- **语法**: `template <typename T, ...> return_type function_name(args);`
- **`typename` 和 `class`**: 在模板参数列表中，`typename` 和 `class` 关键字等价，可以互换。

```cpp
// 定义一个可以比较任意类型的 max 函数
template <typename T>
T max(T a, T b) {
    return a > b ? a : b;
}

// 编译器在编译时，会根据调用情况生成具体的函数实例：
// 自动类型推导
int i = max(10, 20);          // 实例化 T = int 的版本
double d = max(3.14, 2.71);   // 实例化 T = double 的版本
std::string s = max("hello", "world"); // 实例化 T = const char* 的版本 (注意：这里比较的是指针地址)
                                       // 若要比较字符串内容，需要特化或使用 std::string
```

#### 2.2 类模板 (Class Templates)

让类的数据成员、成员函数可以支持任意类型，常用于实现容器（如 `std::vector`）和智能指针等。

- **语法**: `template <typename T, ...> class ClassName { ... };`

```cpp
template <typename T1, typename T2>
class Pair {
private:
    T1 first;
    T2 second;

public:
    Pair(T1 f, T2 s) : first(f), second(s) {}
    
    // 成员函数模板
    // 为了实现类型转换
    template <typename U1, typename U2>
    Pair(const Pair<U1, U2>& other) 
        : first(other.getFirst()), second(other.getSecond()) {}
    
    T1 getFirst() const { return first; }
    T2 getSecond() const { return second; }
    
    void print() const {
        std::cout << "(" << first << ", " << second << ")" << std::endl;
    }
};

// 使用时必须显式指定模板参数
Pair<int, std::string> p1(1, "apple");
Pair<double, int> p2(3.14, 100);
Pair<int, double> p3(p2);
```

**关于继承**

当子类继承的父类是一个类模板时，必须为父类的模板参数提供具体的类型。

编译器需要知道`T`的具体类型才能计算对象大小

不知道类型就无法确定内存布局

想灵活指定出父类中T的类型，子类也需变为类模板

模板类继承具体类

**关于编译**

类模板中成员函数创建时机是在调用阶段，导致分文件编写时链接不到

**友元**

全局函数类内实现-直接在类内声明友元即可

 全局函数类外实现-需要提前让编译器知道全局函数的存在  

建议全局函数做类内实现，用法简单，而且编译器可以直接识别

```c++
#include <iostream>
#include <string>
using namespace std;

// =============================================================================
// 方式一：类内实现友元函数（推荐）
// =============================================================================
template<class T>
class PersonInside {
private:
    string name;
    T age;
    
public:
    PersonInside(string n, T a) : name(n), age(a) {}
    
    // 友元函数直接在类内实现
    // 编译器会为每个实例化的类型生成对应的普通函数
    friend void printPersonInside(PersonInside<T>& p) {
        cout << "类内实现 - 姓名: " << p.name << ", 年龄: " << p.age << endl;
    }
};

// =============================================================================
// 方式二：类外实现友元函数（复杂但灵活）
// =============================================================================

// 第一步：提前声明类模板（前向声明）
template<class T> class PersonOutside;

// 第二步：声明友元函数模板
template<class T>
void printPersonOutside(PersonOutside<T>& p);

// 第三步：定义类模板
template<class T>
class PersonOutside {
private:
    string name;
    T age;
    
public:
    PersonOutside(string n, T a) : name(n), age(a) {}
    
    // 注意这里的<>，表示这是函数模板的特化
    friend void printPersonOutside<>(PersonOutside<T>& p);
};

// 第四步：实现友元函数模板
template<class T>
void printPersonOutside(PersonOutside<T>& p) {
    cout << "类外实现 - 姓名: " << p.name << ", 年龄: " << p.age << endl;
}

// =============================================================================
// 错误示范：不正确的类外实现
// =============================================================================
template<class T>
class PersonWrong {
private:
    string name;
    T age;
    
public:
    PersonWrong(string n, T a) : name(n), age(a) {}
    
    // 错误：没有<>，编译器会认为这是普通函数而不是函数模板
    // friend void printPersonWrong(PersonWrong<T>& p);
};

// 这个函数无法访问私有成员，因为它不是真正的友元
// template<class T>
// void printPersonWrong(PersonWrong<T>& p) {
//     cout << p.name << p.age << endl; // 编译错误！
// }

// =============================================================================
// 测试代码
// =============================================================================
int main() {
    cout << "=== 类模板友元函数实现方式对比 ===" << endl;
    
    // 测试类内实现
    PersonInside<int> p1("张三", 25);
    PersonInside<double> p2("李四", 30.5);
    
    cout << "\n方式一：类内实现" << endl;
    printPersonInside(p1);  // 调用为int特化的友元函数
    printPersonInside(p2);  // 调用为double特化的友元函数
    
    // 测试类外实现
    PersonOutside<int> p3("王五", 28);
    PersonOutside<float> p4("赵六", 35.8f);
    
    cout << "\n方式二：类外实现" << endl;
    printPersonOutside(p3);  // 调用函数模板的int特化
    printPersonOutside(p4);  // 调用函数模板的float特化
    
    cout << "\n=== 编译器处理机制说明 ===" << endl;
    cout << "1. 类内实现：每个类实例都有自己的友元函数副本" << endl;
    cout << "2. 类外实现：所有实例共享同一个函数模板的不同特化" << endl;
    
    return 0;
}

/*
关键理解点：

1. 模板实例化时机：
   - 类内实现：类实例化时同时生成友元函数
   - 类外实现：需要显式实例化或调用时才生成函数

2. 符号解析顺序：
   - 类内实现：编译器在类定义时就能确定函数的存在
   - 类外实现：需要通过多阶段查找来确定函数模板的匹配

3. 内存布局影响：
   - 类内实现：可能产生多个相同功能的函数副本
   - 类外实现：更好的代码复用，但编译复杂度增加

建议选择：
- 简单情况：使用类内实现，代码清晰易懂
- 复杂模板系统：使用类外实现，提供更好的控制和复用性
*/
```



#### 2.3 别名模板 (Alias Templates) (C++11)

使用 `using` 关键字为复杂的模板类型创建更简洁的别名，比 `typedef` 更加强大和灵活。

```cpp
// 传统 typedef 方式（C++11之前）
template <typename T>
struct StringMapTraits {
    typedef std::map<std::string, T> type;
};
using IntMap = StringMapTraits<int>::type;

// 现代别名模板（C++11+）
template <typename T>
using StringMap = std::map<std::string, T>;

StringMap<int> intMap;        // 清晰简洁
StringMap<double> doubleMap;

// 更复杂的例子
template <typename T>
using SharedPtr = std::shared_ptr<T>;

template <typename T, typename Deleter = std::default_delete<T>>
using UniquePtr = std::unique_ptr<T, Deleter>;
```

### 3. 模板特化 (Specialization)

通用模板（Primary Template）能处理大多数情况，但某些特定类型需要**完全不同**的实现逻辑。这时就需要模板特化。

#### 3.1 全特化 (Full Specialization)

为某个**具体类型**提供一个完全独立的、定制化的实现版本。

```cpp
// 通用模板
template <typename T>
struct Hasher {
    size_t operator()(const T& key) {
        // ... 通用的哈希算法
        return std::hash<T>()(key);
    }
};

// 针对 const char* 类型的全特化版本
template <>
struct Hasher<const char*> {
    size_t operator()(const char* key) {
        // ... 为 C 风格字符串定制的哈希算法
        std::cout << "Using specialized hasher for const char*." << std::endl;
        size_t hash = 0;
        while (*key) {
            hash = hash * 31 + (*key++);
        }
        return hash;
    }
};

Hasher<int> intHasher;
Hasher<const char*> cstrHasher;

intHasher(123);
cstrHasher("hello"); // 会调用特化版本
```

#### 3.2 偏特化 (Partial Specialization)

⚠️ 注意：**函数模板不允许偏特化**，但可以通过函数重载达到类似效果。**偏特化是类模板的专属特性**。

偏特化不是针对一个具体类型，而是针对**一类**符合特定模式的类型（如所有指针类型、所有 `std::vector` 类型等）提供特殊实现。

```cpp
// 通用类模板
template <typename T>
class SmartPointer {
    // ... 通用实现
public:
    SmartPointer() { std::cout << "General SmartPointer" << std::endl; }
};

// 针对所有指针类型 T* 的偏特化版本
template <typename T>
class SmartPointer<T*> {
    // ... 针对指针的特殊管理逻辑
public:
    SmartPointer() { std::cout << "Partial specialization for T*" << std::endl; }
};

// 针对所有指向 const T 的指针类型的偏特化
template <typename T>
class SmartPointer<const T*> {
public:
    SmartPointer() { std::cout << "Partial specialization for const T*" << std::endl; }
};


SmartPointer<int> p1;         // 使用通用模板
SmartPointer<int*> p2;        // 匹配 T* 偏特化
SmartPointer<const char*> p3; // 匹配 const T* 偏特化 (更具体)
```

**特化优先级**：编译器会选择最匹配的特化版本，更具体的特化优先于较一般的特化。

### 4. 非类型模板参数 (Non-Type Template Parameters)

模板参数不仅可以是 `typename` 或 `class`，还可以是**编译期常量**，如整型、指针、引用、枚举等。

这使得我们可以将一些数值（如数组大小）作为类型的一部分，实现**策略模式 (Policy-based Design)** 和编译期计算。`std::array<T, N>` 就是最典型的例子。

```cpp
// T 是类型参数，Size 是非类型参数
template <typename T, size_t Size>
class StaticArray {
private:
    T data[Size]; // Size 必须在编译期确定

public:
    size_t getSize() const { return Size; }
    T& operator[](size_t index) { return data[index]; }
};

StaticArray<int, 10> arr1;      // 一个包含 10 个 int 的数组
StaticArray<double, 5> arr2;    // 一个包含 5 个 double 的数组

// arr1 和 arr2 是完全不同的类型！
// StaticArray<int, 10> 和 StaticArray<int, 20> 也是不同类型。

// 模板模板参数
```

#### 支持的非类型参数

```C++
// 整型参数
template <int N>
struct IntParam { static constexpr int value = N; };

// 枚举参数
enum class Color { Red, Green, Blue };
template <Color C>
struct ColorParam { static constexpr Color color = C; };

// 指针参数（指向具有外部链接的对象）
extern int global_var;
template <int* Ptr>
struct PtrParam { static int* ptr; };

// 引用参数
template <int& Ref>
struct RefParam { static int& ref; };

// 使用示例
IntParam<42> ip;
ColorParam<Color::Red> cp;
PtrParam<&global_var> pp;
```

#### `auto` 模板参数 (C++17)

C++17 简化了非类型模板参数的语法，可以直接使用 `auto`，编译器会自动推导其类型。

```cpp
template <auto Value>
void printValue() {
    std::cout << "Value: " << Value << std::endl;
}

printValue<42>();      // Value 被推导为 int
printValue<'A'>();     // Value 被推导为 char

template <auto Value>
constexpr auto getValue() {
    return Value;
}

template <auto... Values>
constexpr auto sum() {
    return (Values + ...);
}

// 使用示例
constexpr auto a = getValue<42>();      // int
constexpr auto b = getValue<3.14>();    // double (C++20+)
constexpr auto c = getValue<'A'>();     // char
constexpr auto total = sum<1, 2, 3, 4, 5>(); // 15
```

### 5. 现代 C++ 对模板的增强

#### 5.1 可变参数模板 (Variadic Templates) (C++11)

让函数或类可以接受**任意数量**的模板参数。这是实现 `std::tuple`、`std::function` 和完美转发等功能的关键。

```cpp
// 使用 C++17 的折叠表达式 (Fold Expression) 简化求和
template <typename... Args>
auto sum(Args... args) {
    return (args + ...); // (... + args) 也可以
}

int total = sum(1, 2, 3, 4, 5); // total = 15

// 参数包大小
template <typename... Args>
constexpr size_t count_args(Args&&...) {
    return sizeof...(Args);
}

// 类型萃取
template <typename... Args>
using first_type = std::tuple_element_t<0, std::tuple<Args...>>;

// 完美转发构造器
template <typename... Args>
class Wrapper {
    std::tuple<Args...> data;
public:
    template <typename... UArgs>
    Wrapper(UArgs&&... args) : data(std::forward<UArgs>(args)...) {}
};
```

#### 5.2 概念 (Concepts) (C++20)

**约束模板参数**，使其必须满足某些预定义的条件（例如，必须是整数、必须支持 `<` 操作符等）。

- **优点**：
    1.  **极大地改善编译错误信息**：错误信息会直接告诉你“类型不满足某概念”，而不是一长串看不懂的底层错误。
    2.  **增强代码可读性和意图**：代码即文档，约束本身就说明了模板需要什么样的类型。

```cpp
// 定义一个概念，要求类型 T 必须是整数
template <typename T>
concept Integral = std::is_integral_v<T>;

// 使用概念约束模板参数
template <Integral T>
T add(T a, T b) {
    return a + b;
}

int result = add(5, 10);     // OK, int 满足 Integral
// double d = add(3.14, 2.71); // 编译错误！double 不满足 Integral 概念
                               // 错误信息会非常清晰
```

#### 5.3 函数元编程

**模板元编程 (Template Metaprogramming, TMP)** 是一种在**编译时**进行计算和代码生成的编程技术。它利用C++模板系统的图灵完备性，让编译器在编译期执行复杂的逻辑运算。

- **元程序**：操作程序的程序（程序生成程序）
- **编译期计算**：在编译时而非运行时进行的计算
- **类型操作**：将类型作为"数据"进行处理
- **零运行时开销**：所有计算在编译期完成，运行时无额外开销

```c++
// 传统编程：运行时计算阶乘
int factorial_runtime(int n) {
    return n <= 1 ? 1 : n * factorial_runtime(n - 1);
}

// 元编程：编译时计算阶乘
template<int N>
struct factorial_compile_time {
    static constexpr int value = N * factorial_compile_time<N-1>::value;
};

template<>
struct factorial_compile_time<0> {
    static constexpr int value = 1;
};

// 使用对比
int main() {
    // 运行时计算：每次调用都要计算
    int result1 = factorial_runtime(5);  // 运行时开销
    
    // 编译时计算：结果直接嵌入到二进制代码中
    constexpr int result2 = factorial_compile_time<5>::value;  // 编译时已知结果是120
    
    return 0;
}
```



### 传统编程 vs 元编程对比

### 6. 编译与链接

- **编译期生成**：模板本身不是代码，而是生成代码的“图纸”。只有当模板被具体类型**实例化**时，编译器才会生成对应的函数或类。如果一个模板从未被使用，它就不会生成任何代码。

- **定义需放在头文件**：通常情况下，模板的**声明和定义**都必须放在头文件 (`.h` 或 `.hpp`) 中。
    - **原因**：编译器在实例化模板时，需要看到模板的**完整定义**，而不仅仅是声明。如果定义放在 `.cpp` 文件中，其他编译单元（其他 `.cpp` 文件）在编译时无法找到模板定义，最终会导致**链接错误 (Linker Error)**，如 "unresolved external symbol"。
    - **例外**：可以使用显式实例化 (`extern template` 和 `template class MyClass<int>;`) 将定义放在 `.cpp` 文件中，但这是一种不常见的、用于控制编译时间的进阶用法。

---

### 总结

| 特性                | 描述                                         | 关键点                                              |
| :------------------ | :------------------------------------------- | :-------------------------------------------------- |
| **基本模板**        | 函数和类可以处理多种数据类型。               | `template <typename T>`                             |
| **全特化**          | 为特定类型提供完全定制的实现。               | `template <>`                                       |
| **偏特化**          | 为一类类型（如指针）提供定制实现。           | **仅限类模板**，`template <typename T> class C<T*>` |
| **非类型参数**      | 使用编译期常量（如大小）作为模板参数。       | `template <typename T, size_t N>`                   |
| **可变参数模板**    | 接受任意数量的模板参数。                     | `template <typename... Args>`                       |
| **概念 (Concepts)** | 约束模板参数，提高代码健壮性和错误信息质量。 | `concept`, `requires`                               |
| **编译模型**        | 编译时实例化，定义通常放在头文件中。         | 避免链接错误                                        |





**转发引用 (Forwarding Reference)**、**完美转发 (Perfect Forwarding)** 和 **引用折叠 (Reference Collapsing)**。

理解它们的关键在于明白它们的**目的**和**关系**：

*   **最终目标 (The Goal):** 实现 **完美转发 (Perfect Forwarding)**，即编写一个函数模板，它能接收任意类型的参数（左值、右值、const 等），并将其“原封不动”地转发给另一个函数，不改变其原始的左值/右值属性。
*   **语法工具 (The Tool):** 为了实现这个目标，C++11 引入了一种特殊的引用类型，叫做 **转发引用 (Forwarding Reference)**。
*   **底层规则 (The Rule):** 转发引用之所以能工作，依赖于 C++ 的一条底层编译规则，即 **引用折叠 (Reference Collapsing)**。

让我们按照 **底层规则 -> 语法工具 -> 最终目标** 的顺序来梳理。

---

### 1. 引用折叠 (Reference Collapsing) - 底层规则

这是最基础的规则，它规定了“引用的引用”在编译时如何被解释。在C++中，你不能直接声明一个引用的引用（例如 `int& & x;` 会编译失败），但它在模板类型推导等特定场景中会间接出现。

引用折叠的规则非常简单，可以用一句话概括：

**只要有左值引用（`&`）参与，结果就是左值引用。只有当所有参与的都是右值引用（`&&`）时，结果才是右值引用。**

具体规则如下：

```
T&  &   → T&   // 左值引用 + 左值引用 = 左值引用
T&  &&  → T&   // 左值引用 + 右值引用 = 左值引用  
T&& &   → T&   // 右值引用 + 左值引用 = 左值引用
T&& &&  → T&&  // 右值引用 + 右值引用 = 右值引用
```
**核心记忆点：** 左值引用（`&`）具有“传染性”或“粘性”，一旦出现，最终结果就是左值引用。

---

### 2. 转发引用 (Forwarding Reference) - 语法工具

转发引用（在 C++17 标准前的常用叫法是“万能引用 Universal Reference”）是一种特殊的引用，它既可以绑定到左值，也可以绑定到右值。

它的语法形式**必须同时满足以下两个条件**：

1.  **形式必须是 `T&&`**，其中 `T` 是一个模板参数。
2.  **`T` 的类型必须是在函数调用时被推导出来的**。

**正确的转发引用示例：**

```cpp
template<typename T>
void f(T&& param); // T 在调用 f 时被推导，形式为 T&&，这是转发引用

auto&& var = some_expr; // var 是转发引用（auto 也会发生类型推导）
```

**错误的示例（它们只是普通的右值引用）：**

```cpp
void g(int&& param); // int 是具体类型，不是模板推导，这是右值引用

template<typename T>
struct MyClass {
    void method(T&& param); // T 是类的模板参数，在 method 调用时 T 的类型已确定，
                            // 没有发生推导，所以这是右值引用
};

template<typename T>
void h(const T&& param); // 带有 const 修饰，不是转发引用
```

#### 转发引用如何与引用折叠配合工作？

这正是它的魔力所在。当一个实参传递给转发引用时，模板类型 `T` 的推导规则如下：

*   **如果传入的是一个左值 (Lvalue)**，类型为 `X`：
    *   `T` 会被推导为 `X&` (左值引用类型)。
    *   函数参数类型 `T&&` 就变成了 `(X&) &&`。
    *   根据引用折叠规则， `(X&) &&` 折叠为 `X&`。
    *   因此，函数参数最终变成了**一个左值引用**。

*   **如果传入的是一个右值 (Rvalue)**，类型为 `X`：
    *   `T` 会被推导为 `X` (原始类型，非引用)。
    *   函数参数类型 `T&&` 就变成了 `X&&`。
    *   因此，函数参数最终变成了**一个右值引用**。

**示例：**

```cpp
template<typename T>
void func(T&& param) {
    // ...
}

int x = 10;
func(x);      // 传入左值 x (int)
              // T 被推导为 int&
              // param 的类型是 (int&) && -> 折叠为 int&

func(20);     // 传入右值 20 (int)
              // T 被推导为 int
              // param 的类型是 int&&
```

通过这个机制，转发引用成功地在**类型 `T` 中编码了传入参数的原始值类别信息**（左值还是右值）。

---

### 3. 完美转发 (Perfect Forwarding) - 最终目标

现在我们有了可以接收任何值类别的转发引用，但还有一个问题：

**无论 `param` 是左值引用还是右值引用，`param` 本身在函数体内都是一个有名字的变量，所以它是一个左值！**

如果你直接将 `param` 传递给另一个函数，你将永远传递的是一个左值，这就失去了我们保留原始值类别的意义。

```cpp
void other_func(int& t) { std::cout << "Lvalue ref" << std::endl; }
void other_func(int&& t) { std::cout << "Rvalue ref" << std::endl; }

template<typename T>
void forwarder(T&& param) {
    // 错误的做法：param 是一个左值，永远调用左值版本
    other_func(param); 
}

int main() {
    forwarder(10); // 期望调用 Rvalue 版本，但实际调用了 Lvalue 版本！
}
```

为了解决这个问题，我们需要 `std::forward`。

`std::forward` 的作用是：**根据模板参数 `T` 的类型，将一个参数（通常是左值）有条件地转换为右值。**

它的工作原理如下：

*   `std::forward<T>(param)` 本质上是一个 `static_cast`。
*   如果 `T` 是一个左值引用类型（例如 `int&`，意味着原始参数是左值），`std::forward` 会将 `param` 转换为 `T& &&` -> `T&`，结果仍然是左值。
*   如果 `T` 是一个非引用类型（例如 `int`，意味着原始参数是右值），`std::forward` 会将 `param` 转换为 `T&&`，结果是一个右值。

**正确的完美转发实现：**

```cpp
#include <iostream>
#include <utility> // For std::forward

void other_func(int& t) { std::cout << "other_func(int&)" << std::endl; }
void other_func(int&& t) { std::cout << "other_func(int&&)" << std::endl; }

template<typename T>
void forwarder(T&& param) {
    std::cout << "Forwarding: ";
    // 使用 std::forward 恢复 param 原始的值类别
    other_func(std::forward<T>(param));
}

int main() {
    int x = 42;

    forwarder(x);       // 传入左值 x
                        // T 推导为 int&
                        // std::forward<int&>(param) 返回一个左值
                        // 输出: Forwarding: other_func(int&)

    forwarder(100);     // 传入右值 100
                        // T 推导为 int
                        // std::forward<int>(param) 返回一个右值
                        // 输出: Forwarding: other_func(int&&)
    
    const int y = 50;
    forwarder(y);       // 完美转发也能保持 const 属性
}
```

### 总结

三者的关系可以这样概括：

1.  **引用折叠** 是 C++ 语言的一条底层规则，它定义了引用的引用如何合并，是实现完美转发的理论基础。
2.  **转发引用 (`T&&`)** 是一种特殊的模板参数语法，它利用**引用折叠**规则，使得一个函数参数能够同时接收左值和右值，并在模板类型 `T` 中“记录”下传入参数的原始值类别（左值则 `T` 为 `X&`，右值则 `T` 为 `X`）。
3.  **完美转发 (`std::forward<T>`)** 是一个标准库函数，它读取在**转发引用**中编码的类型信息 `T`，并将函数体内的左值参数**恢复**成其原始的值类别（左值或右值），从而实现将参数无损地、完美地转发给下一个函数。

简单来说，这个流程就是：
**`参数` -> `转发引用(T&&)` (编码值类别信息到`T`) -> `std::forward<T>` (解码`T`中的信息，恢复值类别) -> `转发给目标函数`**。

## STL

## 通用数据结构

**std::tuple**:

- 定义在 &lt;tuple&gt; 头文件中，是 C++11 引入的一个模板类。

- 它是一个**异构的、固定大小的值集合**。简单来说，它可以将不同类型的值捆绑在一起，成为一个单一的对象。你可以把它看作是 std::pair 的泛化版本，std::pair 只能存储两个元素，而 std::tuple 可以存储任意多个。

- **核心作用**:

  1. **从函数返回多个值**: 这是 std::tuple 最经典和最常见的用途。当一个函数需要返回不止一个结果时，可以将这些结果打包成一个 std::tuple 返回。
  2. **临时聚合数据**: 在不希望或不需要为一小组相关数据专门定义一个 struct 时，可以使用 std::tuple 来临时聚合它们。

```
特性 	    	make_tuple 			forward_as_tuple
存储方式 		值（拷贝/移动）		引用
生命周期 		独立所有权			依赖原对象
类型推导 	退化类型（decay）			保持引用类型
典型用途 		长期存储				临时转发
性能 			可能有拷贝开销				零拷贝
安全性 			安全					易悬空引用
```

### 结构化绑定

C++17

用一个声明来解包一个 struct、pair 或 tuple 的成员/元素，并直接赋给新声明的变量

## 语言特性

### 关键字

#### noexcept

作为函数说明符，它向编译器保证该函数不会抛出任何异常。这可以让编译器进行更多的优化（例如，移动构造函数如果是 noexcept 的，std::vector 在扩容时会优先使用它）。
使用时机

constexpr

- 核心目标是**将计算从运行时提前到编译时**。
- 它可以用于修饰**变量**和**函数**：
  1. **constexpr 变量**:
     - 
     - 该变量的值必须在编译时就能确定。
     - 它本身就是一个编译期常量，可以用于需要编译期常量的地方，例如数组的大小、模板的非类型参数、枚举成员的初始值等。
     - constexpr 变量是隐式的 const。
  2. **constexpr 函数**:
     - 这是 constexpr 最强大的地方。它定义了一个“如果可能，就在编译期执行”的函数。
     - **双重身份**:
       - 如果调用它时，所有参数都是编译期常量，那么编译器**可以**在编译期间直接计算出结果，并将函数调用替换为这个结果。
       - 如果调用它时，有任何一个参数不是编译期常量，那么它就表现得像一个普通的函数，在运行时执行。
     - 这允许我们编写一份代码，既能用于编译期元编程，也能用于正常的运行时逻辑。

**mutable**:

- 它是一个存储类说明符，只能用于类的非静态、非 const 成员变量。
- **核心作用**: 允许一个成员变量在一个 const 成员函数内部被修改。换句话说，它为 const 正确性提供了一个“例外出口”。
- **“逻辑 const” vs “位 const”**:
  - **位 const (Bitwise Constness)**: 这是编译器的默认行为。如果一个对象是 const 的，那么它的所有成员变量（内存中的每一个 bit）都不能被改变。
  - **逻辑 const (Logical Constness)**: 这是程序员的意图。一个 const 对象从外部观察者的角度来看，其**逻辑状态**不应该改变。但是，为了实现某些功能（如缓存、延迟加载或同步），一些内部的、对外部不可见的成员变量可能需要被修改。mutable 就是用来实现逻辑 const 的工具。

**主要使用场景**:

1. **线程同步（Mutexes）**: 这是最常见、最重要的现代 C++ 用法。一个 const 成员函数如果需要访问共享数据，它必须给一个互斥体（mutex）加锁。加锁这个行为会修改互斥体对象本身的状态，因此该互斥体成员必须被声明为 mutable，这样才能在 const 函数中调用 lock()。
2. **缓存 (Caching)**: 一个 const 成员函数可能会执行一个昂贵的计算。为了提高性能，它可以将第一次计算的结果缓存起来。这个缓存的成员变量就需要被声明为 mutable，以便在后续的 const 调用中被写入。
3. **访问计数或其他统计**: 记录一个 const 方法被调用了多少次。



**explicit**:

- 这是一个函数说明符，主要用于类的**构造函数**和**类型转换运算符**。
- **核心作用**: **禁止隐式类型转换 (Implicit Conversion)** 和**禁止拷贝初始化 (Copy-Initialization)**。
- **1. 用于构造函数 (尤其是单参数构造函数)**:
  - **默认行为**: 如果一个类有一个接受单个参数的构造函数（或者其他参数都有默认值），编译器会允许使用这个构造函数进行隐式类型转换。
  - **explicit 的效果**: 当构造函数被标记为 explicit 后，它就不能再用于隐式转换或拷贝初始化，只能用于**直接初始化 (Direct-Initialization)**。

## 并发编程

std::atomic&lt;bool&gt;

原子类型提供了**无锁的线程安全性**，这意味着：

1. **操作的不可分割性**：读取或写入操作要么完全完成，要么完全不执行，不会出现"半完成"状态
2. **内存可见性保证**：一个线程对原子变量的修改，其他线程最终都能观察到
3. **避免数据竞争**：多个线程同时访问不会导致未定义行为

`store()` 原子地设置取消状态

load（）原子性地读取 `atomic_var` 的当前值

内存序

**memory_order_seq_cst (顺序一致性)**:

- **最强的内存序**，也是所有原子操作的默认选项。
- 它保证了所有线程看到的**所有**原子操作的顺序是完全一致的，就好像所有操作都在一个全局的、单一的时间线上发生。
- 虽然最符合直觉，但通常也是性能开销最大的，因为它限制了编译器和 CPU 的优化能力（例如，在某些架构上需要插入重量级的内存屏障/fence）。

**Acquire-Release 语义**:

- 一种比顺序一致性更宽松、性能更好的内存模型，用于在**两个**线程之间精确地同步数据。它通常成对出现。
- **memory_order_release** (释放)：用于**写入**操作。它像一个屏障，确保在它**之前**的所有内存读写操作（无论是原子的还是非原子的）都已经完成，并且对其他线程可见，之后才会执行当前的原子写入。可以理解为“我把所有要共享的数据都准备好了，现在发布（release）出去”。
- **memory_order_acquire** (获取)：用于**读取**操作。它也像一个屏障，确保在它**之后**的所有内存读写操作，必须在当前原子读取完成之后才能执行。可以理解为“我收到了发布的信号，现在可以安全地读取（acquire）它之前准备好的数据了”。

**std::promise**:

- 定义在 &lt;future&gt; 头文件中。

- 它提供了一种在线程间**异步传递结果**的机制。你可以把它看作是一个**一次性写入的容器**，一个线程（生产者）向 std::promise 中“承诺”会放入一个值，而另一个线程（消费者）可以通过一个与之关联的 std::future 对象来获取这个值。

- **核心模型（Promise-Future）**:

  1. **生产者线程**创建一个 std::promise 对象。
  2. 通过 promise.get_future() 获取一个 std::future 对象。
  3. 将这个 std::future 对象传递给**消费者线程**。
  4. 生产者线程执行计算，当结果准备好后，通过 promise.set_value(result) 来“履行承诺”。如果发生错误，可以通过 promise.set_exception(e) 来传递异常。
  5. 消费者线程在需要结果时，调用 future.get()。这个调用会**阻塞**，直到生产者履行承诺（设置了值或异常）。一旦值被设置，get() 就会返回该值。

  `std::promise`：负责 **生产结果**（把值/异常放进去）。

  `std::future`：负责 **消费结果**（等待、获取值或异常）。

**互斥体与锁 (Mutexes & Locks)**

- **std::shared_mutex** (C++17):
  - 它是一种**读写互斥体**。与一次只允许一个线程进入临界区的 std::mutex 不同，std::shared_mutex 提供了两种级别的访问：
    1. **共享模式 (Shared Mode)**: 多个线程可以**同时**获取共享锁。这通常用于**只读**操作。
    2. **独占模式 (Exclusive Mode)**: 只有一个线程可以获取独占锁。这通常用于**写入**操作。
  - **规则**:
    - 如果一个线程持有独占锁，那么其他任何线程（无论是读还是写）都必须等待。
    - 如果一个或多个线程持有共享锁，那么其他希望获取共享锁的线程可以立即进入，但希望获取独占锁的线程必须等待。
  - **核心优势**: 在“读多写少”的场景下，它能极大地提高并发性能，因为多个读操作不会相互阻塞。
- **std::unique_lock**:
  - 一个通用的、灵活的互斥体**包装器 (Wrapper)**，它使用 **RAII** (Resource Acquisition Is Initialization) 范式来管理锁的生命周期（构造时加锁，析构时解锁）。
  - 它比 std::lock_guard 更强大，提供了更多功能：
    - 可以延迟加锁 (std::defer_lock)。
    - 可以手动调用 lock() 和 unlock()。
    - 可以转移锁的所有权（它是可移动的 MoveConstructible）。
    - 是与 std::condition_variable 一起使用的**唯一**标准锁类型。
  - 当与 std::shared_mutex 一起使用时，std::unique_lock 用于获取**独占锁 (Exclusive Lock)**。
- **std::shared_lock** (C++14):
  - 一个专门的互斥体包装器，同样遵循 RAII。
  - 它的**唯一目的**就是与 std::shared_mutex (或类似的读写互斥体) 配合，用于获取**共享锁 (Shared Lock)**。

**关系总结**:

- std::shared_mutex 是**被保护的资源**（门）。
- std::unique_lock 是获取**独占访问权限**的钥匙（用于写操作）。
- std::shared_lock 是获取**共享访问权限**的钥匙（用于读操作）。

### RAII（资源获取即初始化）

`std::unique_lock` 和 `std::shared_lock` 都是 **RAII 类型**。

- 它们的构造函数里会自动 `lock()`。
- 它们的析构函数里会自动 `unlock()`。

所以在函数结尾，或者作用域退出时，锁对象会销毁 → 自动释放锁

**std::lock_guard**:

- 定义在 &lt;mutex&gt; 头文件中。
- 它是最简单、最轻量级的互斥体**包装器 (Wrapper)**，严格遵循 **RAII** (Resource Acquisition Is Initialization) 范式。
- **工作原理**:
  1. **构造时**: 当 std::lock_guard 对象被创建时，它会在其构造函数中立即调用传入的互斥体（mutex）的 lock() 方法，从而获取锁。
  2. **析构时**: 当 std::lock_guard 对象离开其作用域（scope）时，它的析构函数会自动被调用，并在析构函数中调用互斥体的 unlock() 方法，从而释放锁。
- **核心优势（解决的问题）**: 它提供了**异常安全**的锁管理。如果在使用裸 lock() 和 unlock() 调用之间发生了异常，unlock() 调用可能会被跳过，导致互斥体被永久锁定（死锁）。std::lock_guard 通过 RAII 机制保证了无论函数是正常返回还是因异常退出，锁都一定会被释放。
- **与 std::unique_lock 的对比**:
  - **简单性**: lock_guard 更简单，开销更低。它只有一个功能：在作用域内持有锁。
  - **功能**: lock_guard **不支持**手动解锁、延迟加锁或所有权转移。它一旦创建就锁定，直到销毁才解锁。
  - **适用性**: 它**不能**与 std::condition_variable 一起使用，因为条件变量要求能够临时解锁互斥体。

**使用原则**:
**当你只需要在某个作用域内简单地、独占地锁定一个互斥体时，std::lock_guard 是你的首选。** 只有在你需要 std::unique_lock 提供的额外灵活性时（如配合条件变量），才使用 std::unique_lock。



fetch_sub



**Timed Waiting (带超时的等待)**

- 
- **wait_for**:
  - 
  - 这是一个成员函数，存在于多个并发类中，如 std::condition_variable、std::future 和 std::shared_future。
  - **核心作用**: **阻塞当前线程，等待某个事件发生，但等待时间不超过指定的时长**。这可以防止线程被无限期地阻塞，从而提高系统的健壮性和响应性。
  - 它接受一个 std::chrono::duration 类型的参数来指定最大等待时间。
- **在 std::condition_variable 中的使用**:
  - 
  - cv.wait_for(lock, timeout_duration, predicate)
  - 它会原子地释放锁 lock，然后阻塞线程。线程会等待，直到以下任一情况发生：
    1. 
    2. 另一个线程调用 notify_one() 或 notify_all() **并且** predicate（一个返回布尔值的可调用对象）为 true。
    3. 等待时间超过了 timeout_duration。
  - **返回值**: 如果是因为 predicate 变为 true 而返回，则函数返回 true；如果是因为超时而返回，则返回 false。这允许你区分等待成功和等待超时两种情况。
- **在 std::future 中的使用**:
  - 
  - future.wait_for(timeout_duration)
  - 它会等待与 future 关联的异步操作完成，但最长不超过 timeout_duration。
  - **返回值**: 返回一个 std::future_status 枚举值：
    - 
    - std::future_status::ready: 异步操作已完成，可以调用 get() 立即获得结果。
    - std::future_status::timeout: 在指定时间内，异步操作仍未完成。
    - std::future_status::deferred: 任务是被 std::async 以延迟策略创建的，并且尚未开始执行。

**为什么要使用 wait_for?**

- 
- **防止死锁/无限等待**: 如果一个线程无限期地等待一个永远不会发生的事件，程序就会挂起。wait_for 提供了一个退出机制。
- **提高响应性**: UI 线程或主循环线程可以使用 wait_for 来检查后台任务是否完成，而不会完全阻塞自己，可以继续处理其他事件。
- **实现轮询逻辑**: 可以在循环中使用 wait_for 来定期检查某个条件是否满足。 

## 函数式编程

std::function

- 定义在 &lt;functional&gt; 头文件中，是一个通用的、多态的函数包装器。
- 它的实例可以存储、复制和调用任何**可调用对象 (Callable Object)**

std::function 的主要优势在于**类型擦除 (Type Erasure)**。不同的 Lambda 表达式有不同的、匿名的类型，你无法直接将它们存入同一个容器。std::function&lt;void(int)&gt; 可以将所有“接受一个 int 且无返回值”的可调用对象统一成同一种类型，从而可以方便地存储和管理。

**主要使用场景**:

1. **回调函数**: 创建需要回调的系统，用户可以注册任何符合签名的可调用对象。
2. **存储异构可调用对象**: 将不同类型的可调用对象（如多个不同的 lambda）存入同一个容器（例如 std::vector<std::function&lt;...&gt;>）。
3. **策略模式**: 在运行时动态地改变对象的行为。

**std::apply**:

- 定义在 &lt;tuple&gt; 头文件中，是 C++17 引入的一个函数模板。
- 它的作用是：**调用一个可调用对象，并将一个元组（tuple-like object）的元素作为参数列表展开传递给它**。
- **解决的问题**: 在 C++17 之前，如果你有一个函数 void foo(int, double, std::string); 和一个元组 std::tuple&lt;int, double, std::string&gt; args;，你无法直接调用 foo(args)。你需要手动编写复杂的模板元编程代码（通常使用 std::index_sequence）来解包元组。std::apply 将这个过程封装成了一个简单的函数调用。
- **"Tuple-like" 对象**: 它不仅适用于 std::tuple，还适用于 std::pair 和 std::array。

**核心用法**:
std::apply(callable, tuple_object);

**主要使用场景**:

1. 
2. **泛型编程**: 在泛型代码中，当你把一组参数存储在一个元组里，然后需要用这些参数去调用某个函数时，std::apply 是最直接的工具。
3. **工厂模式**: 创建一个对象时，如果构造函数的参数事先被收集在一个元组中，可以用 std::apply 来调用构造函数。
4. **调用成员函数**: std::apply 内部使用 std::invoke 的规则，所以它也可以用来调用成员函数。此时，元组的第一个元素需要是对象实例（或指针/引用）。

## 时间工具

**std::chrono::steady_clock::time_point**:

- **std::chrono**: 用于处理时间的命名空间。
- **steady_clock (稳定时钟)**: 这是一种**单调时钟 (monotonic clock)**。它的特点是时间只会向前流逝，永远不会回拨。即使系统管理员手动修改了系统时间（例如，对时），steady_clock 的计数值也不会受到影响。因此，它最适合用于**测量时间间隔（duration）**，例如计算一段代码的执行耗时。
- **time_point (时间点)**: 表示 steady_clock 时间线上的一个具体时刻。你可以把它理解为一个时间戳。

## 错误处理

**std::exception**:

- 定义在 &lt;exception&gt; 头文件中。
- 它是 C++ 标准库中所有标准异常类的**基类**。例如，std::bad_alloc（内存分配失败时抛出）、std::runtime_error（运行时错误）、std::logic_error（逻辑错误）等都直接或间接继承自 std::exception。
- **核心作用**: 它为 C++ 的异常处理机制提供了一个统一的、多态的根。通过 catch (const std::exception& e)，你可以捕获所有继承自 std::exception 的标准库异常以及遵循良好实践的用户自定义异常。这使得编写通用的错误处理代码成为可能。
- **关键成员函数**: virtual const char* what() const noexcept;
  - 
  - 这个虚函数返回一个 C 风格的字符串（const char*），用于描述异常的具体信息。
  - 派生类应该重写 (override) what() 方法来提供更有意义的错误消息。
  - 它被标记为 noexcept，意味着 what() 方法本身保证不会抛出新的异常。

**使用方式**: 通常在 try-catch 语句块中使用。

**最佳实践**:

1. **按引用捕获 (Catch by Reference)**: 总是使用 catch (const std::exception& e) 来捕获异常，这可以避免对象切片（slicing）和不必要的拷贝。
2. **自定义异常继承**: 当你创建自己的异常类时，应该公有继承自 std::exception 或其派生类（如 std::runtime_error），并重写 what() 方法。这使得你的异常可以融入标准的异常处理体系中。



**std::invalid_argument**:

- 
- 定义在 &lt;stdexcept&gt; 头文件中。
- 它是一个标准的异常类，继承自 std::logic_error，而 std::logic_error 又继承自 std::exception。
- **继承链**: std::exception -> std::logic_error -> std::invalid_argument
- **抛出时机**: 当一个函数的**参数类型正确，但其值不合法或不在预期范围内**时，通常会抛出此异常。
- **错误类型**: 作为一个“逻辑错误”（logic_error），它通常表示那些在理论上可以在调用函数**之前**通过检查代码逻辑来避免的错误。
- **常见用途**: 很多标准库函数在遇到无效输入时会抛出它。例如，当尝试将一个非数字字符串转换为整数时。

## *

#### **1. 类型特征与元编程 (Type Traits & Metaprogramming)**

这个类别包含了在编译时查询、修改和生成类型的工具。它们是 C++ 泛型编程和模板元编程的基石。

- 

- **offsetof**: 计算结构体成员的字节偏移量。

- **alignof**: 查询类型的对齐要求。

- **std::is_standard_layout_v&lt;T&gt;**: 检查类型是否为标准布局。

- **std::invoke_result_t&lt;F, Args...&gt;**:

  - 
  - 定义在 &lt;type_traits&gt; 头文件中，是 C++17 引入的类型特征。
  - 它的作用是：在**编译期**推断出“以 Args... 为参数，调用可调用对象 F 会得到的**返回类型**”。
  - 它遵循 std::invoke 的调用规则，这意味着它可以正确处理各种可调用对象，包括：
    - 
    - 普通函数和 Lambda 表达式。
    - 函数对象（Functors）。
    - 指向成员函数的指针（需要一个对象实例作为第一个参数）。
    - 指向成员变量的指针。
  - _t 后缀是 typename std::invoke_result&lt;...&gt;::type 的别名，使用起来更方便。

  **核心用途**:
  在泛型代码中，当你需要知道一个模板化的函数调用会返回什么类型时，这个工具至关重要。例如，用来定义一个包装函数的返回类型，或者用于 SFINAE 和 requires 子句中进行类型约束。

------



### **2. 类型推导 (Type Deduction)**

这些关键字用于让编译器自动推断变量或表达式的类型。

- 
- **auto**: 让编译器根据变量的初始化表达式来自动推导出变量的类型。这是 C++11 引入的特性，可以简化代码，尤其是在处理复杂类型（如迭代器、lambda 表达式）时。
- **decltype**: 根据一个已有的表达式来推导其类型，但并不会实际计算该表达式的值。它常用于泛型编程，根据函数参数的类型来确定返回类型。

------



### **3. 现代 C++ 语言特性 (Modern C++ Language Features)**

这些是 C++ 新标准引入的语法糖或核心功能。

- 
- **auto [x, y] = q.front();**: 这是 C++17 引入的**结构化绑定（Structured Binding）**。它允许你用一个声明来解包一个 struct、pair 或 tuple 的成员/元素，并直接赋给新声明的变量（x 和 y）。
- **noexcept**: 一个 C++11 引入的关键字和运算符。作为函数说明符，它向编译器保证该函数不会抛出任何异常。这可以让编译器进行更多的优化（例如，移动构造函数如果是 noexcept 的，std::vector 在扩容时会优先使用它）。

------



### **4. 并发编程 (Concurrency / Multithreading)**

这些用于编写多线程程序。

- 
- **#include &lt;condition_variable&gt;**: 包含 C++ 标准库中的条件变量。std::condition_variable 是一种同步原语，允许一个或多个线程等待某个条件成立，直到另一个线程发出通知。它通常与 std::mutex 配合使用。

------



### **5. 随机数生成 (Random Number Generation)**

C++11 引入的一套全面的随机数生成工具，位于 &lt;random&gt; 头文件中。

- 
- **random_device rd;**: 一个非确定性的随机数生成器。它通常从操作系统或硬件获取真正的熵（entropy），用于生成高质量的随机数种子。
- **mt19937 gen(rd());**: 创建一个梅森旋转算法（Mersenne Twister）的伪随机数生成引擎 gen，并使用来自 random_device 的随机值 rd() 作为种子。这是生成高质量伪随机数的推荐做法。

------



### **6. 输入/输出流操作 (I/O Stream Manipulation)**

这些用于格式化标准输入输出流。

- 
- **std::setw**: 一个定义在 &lt;iomanip&gt; 头文件中的流操纵符（Stream Manipulator）。它用于设置下一次输出操作的字段宽度（set width），常用于对齐输出内容。

 

### 杂

**返回类型推导** - `std::invoke_result_t`

**尾置返回类型** - `-> std::future<...>` 语法

## 待

