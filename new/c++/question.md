# Q

## windows 编译 v8

```shell
cl /IT:\code\v8\v8 /IT:\code\v8\v8\include ./demo.cc /Fe:_node.exe /EHsc /std:c++20 /Zc:__cplusplus /DV8_COMPRESS_POINTERS /DV8_ENABLE_SANDBOX /link /LIBPATH:"T:\code\v8\v8\out\x64-static-1214-2\obj" v8_monolith.lib winmm.lib advapi32.lib dbghelp.lib
```

## 1

```shell
T:\code\v8\v8\demo>cl /EHsc /IT:\code\v8\v8 /IT:\code\v8\v8\include ./demo.cc /std:c++20 /link/LIBPATH:"T:\code\v8\v8\out\x64-static-1214-1\obj" v8_monolith.lib
Microsoft (R) C/C++ Optimizing Compiler Version 19.42.34433 for x64
Copyright (C) Microsoft Corporation.  All rights reserved.

demo.cc
T:\code\v8\v8\include\v8config.h(13): fatal error C1189: #error:  "C++20 or later required."
```

### 问题

include\v8config.h 中定义了 __cplusplus 宏，但是这个宏的值是 199711L，表示 C++98/03，而不是 C++20。

### 解法

/Zc:__cplusplus 是 Microsoft Visual C++ (MSVC) 编译器的一个选项，它控制编译器如何设置 __cplusplus 宏的值。具体来说：

默认行为：在较旧版本的 MSVC 中，即使你指定了 /std:c++17 或 /std:c++20，编译器也不会将 __cplusplus 宏设置为反映实际使用的 C++ 标准版本的值。相反，它通常保持一个较低的值（例如 199711L），这表示 C++98/03。
启用 /Zc:__cplusplus：当你使用 /Zc:__cplusplus 选项时，编译器会正确地根据你指定的标准来设置 __cplusplus 宏的值。对于 C++17，它会被设置为 201703L；对于 C++20，它会被设置为 202002L 等等。

## 2

```shell

T:\code\v8\v8\demo>cl /IT:\code\v8\v8 /IT:\code\v8\v8\include ./demo.cc /Fe:_node.exe /EHsc /MT /std:c++20 /Zc:__cplusplus /link/LIBPATH:"T:\code\v8\v8\out\x64-static-1214-2\obj" v8_monolith.lib
Microsoft (R) C/C++ Optimizing Compiler Version 19.42.34433 for x64
Copyright (C) Microsoft Corporation.  All rights reserved.

demo.cc
Microsoft (R) Incremental Linker Version 14.42.34433.0
Copyright (C) Microsoft Corporation.  All rights reserved.

/out:_node.exe
/LIBPATH:T:\code\v8\v8\out\x64-static-1214-2\obj
v8_monolith.lib
demo.obj
   Creating library _node.lib and object _node.exp
v8_monolith.lib(platform-win32.obj) : error LNK2019: unresolved external symbol __imp_timeGetTime referenced in function "public: void __cdecl v8::base::Win32Time::SetToCurrentTime(void)" (?SetToCurrentTime@Win32Time@base@v8@@QEAAXXZ)
v8_monolith.lib(time.obj) : error LNK2001: unresolved external symbol __imp_timeGetTime
v8_monolith.lib(etw-jit-win.obj) : error LNK2019: unresolved external symbol __imp_EventRegister referenced in function "void __cdecl v8::internal::ETWJITInterface::Register(void)" (?Register@ETWJITInterface@internal@v8@@YAXXZ)
v8_monolith.lib(etw-jit-win.obj) : error LNK2019: unresolved external symbol __imp_EventSetInformation referenced in function "void __cdecl v8::internal::ETWJITInterface::Register(void)" (?Register@ETWJITInterface@internal@v8@@YAXXZ)
v8_monolith.lib(etw-jit-win.obj) : error LNK2019: unresolved external symbol __imp_EventUnregister referenced in function "void __cdecl v8::internal::ETWJITInterface::Unregister(void)" (?Unregister@ETWJITInterface@internal@v8@@YAXXZ)
v8_monolith.lib(etw-jit-win.obj) : error LNK2019: unresolved external symbol __imp_EventWriteTransfer referenced in function "void __cdecl v8::internal::ETWJITInterface::EventHandler(struct v8::JitCodeEvent const *)" (?EventHandler@ETWJITInterface@internal@v8@@YAXPEBUJitCodeEvent@3@@Z)
v8_monolith.lib(stack_trace_win.obj) : error LNK2019: unresolved external symbol __imp_SymSetOptions referenced in function "bool __cdecl v8::base::debug::`anonymous namespace'::InitializeSymbols(void)" (?InitializeSymbols@?A0x219267C7@debug@base@v8@@YA_NXZ)
v8_monolith.lib(stack_trace_win.obj) : error LNK2019: unresolved external symbol __imp_SymInitialize referenced in function "bool __cdecl v8::base::debug::`anonymous namespace'::InitializeSymbols(void)" (?InitializeSymbols@?A0x219267C7@debug@base@v8@@YA_NXZ)
v8_monolith.lib(stack_trace_win.obj) : error LNK2019: unresolved external symbol __imp_SymGetSearchPathW referenced in function "bool __cdecl v8::base::debug::`anonymous namespace'::InitializeSymbols(void)" (?InitializeSymbols@?A0x219267C7@debug@base@v8@@YA_NXZ)
v8_monolith.lib(stack_trace_win.obj) : error LNK2019: unresolved external symbol __imp_SymSetSearchPathW referenced in function "bool __cdecl v8::base::debug::`anonymous namespace'::InitializeSymbols(void)" (?InitializeSymbols@?A0x219267C7@debug@base@v8@@YA_NXZ)
v8_monolith.lib(stack_trace_win.obj) : error LNK2019: unresolved external symbol __imp_SymGetModuleBase64 referenced in function "private: void __cdecl v8::base::debug::StackTrace::InitTrace(struct _CONTEXT const *)" (?InitTrace@StackTrace@debug@base@v8@@AEAAXPEBU_CONTEXT@@@Z)
v8_monolith.lib(stack_trace_win.obj) : error LNK2019: unresolved external symbol __imp_SymFunctionTableAccess64 referenced in function "private: void __cdecl v8::base::debug::StackTrace::InitTrace(struct _CONTEXT const *)" (?InitTrace@StackTrace@debug@base@v8@@AEAAXPEBU_CONTEXT@@@Z)
v8_monolith.lib(stack_trace_win.obj) : error LNK2019: unresolved external symbol __imp_StackWalk64 referenced in function "private: void __cdecl v8::base::debug::StackTrace::InitTrace(struct _CONTEXT const *)" (?InitTrace@StackTrace@debug@base@v8@@AEAAXPEBU_CONTEXT@@@Z)
v8_monolith.lib(stack_trace_win.obj) : error LNK2019: unresolved external symbol __imp_SymFromAddr referenced in function "public: void __cdecl v8::base::debug::StackTrace::OutputToStream(class std::basic_ostream<char,struct std::char_traits<char> > *)const " (?OutputToStream@StackTrace@debug@base@v8@@QEBAXPEAV?$basic_ostream@DU?$char_traits@D@std@@@std@@@Z)
v8_monolith.lib(stack_trace_win.obj) : error LNK2019: unresolved external symbol __imp_SymGetLineFromAddr64 referenced in function "public: void __cdecl v8::base::debug::StackTrace::OutputToStream(class std::basic_ostream<char,struct std::char_traits<char> > *)const " (?OutputToStream@StackTrace@debug@base@v8@@QEBAXPEAV?$basic_ostream@DU?$char_traits@D@std@@@std@@@Z)
v8_monolith.lib(stack_trace_win.obj) : error LNK2001: unresolved external symbol SymGetModuleBase64
v8_monolith.lib(stack_trace_win.obj) : error LNK2001: unresolved external symbol SymFunctionTableAccess64
_node.exe : fatal error LNK1120: 16 unresolved externals
```

### 问题


## 3

```shell
T:\code\v8\v8\demo>_node.exe


#
# Fatal error in , line 0
# Embedder-vs-V8 build configuration mismatch. On embedder side pointer compression is DISABLED while on V8 side it's ENABLED.
#
#
#
#FailureMessage Object: 00000033D9B8F560
==== C stack trace ===============================

        CrashForExceptionInNonABICompliantCodeRange [0x00007FF7130E7DFB+1140555]
        (No symbol) [0x00007FF712E4FA17]
        (No symbol) [0x00007FF712E6EA37]
        (No symbol) [0x00007FF712E47B73]
        CrashForExceptionInNonABICompliantCodeRange [0x00007FF713DB54A3+14564851]
        CrashForExceptionInNonABICompliantCodeRange [0x00007FF713DB27DE+14553390]
        CrashForExceptionInNonABICompliantCodeRange [0x00007FF713DBAA6C+14586812]
        BaseThreadInitThunk [0x00007FF8258A259D+29]
        RtlUserThreadStart [0x00007FF82696AF38+40]
```

### 4
https://groups.google.com/g/v8-users/c/NT1_kNtE-hE

v8 在windows 上编译的时候设置配置为

```gn
is_component_build=true
use_custom_libcxx=false
```

会报错

原因是因为：v8 在windows 中启动 MSVC 编译的时候，MSVC 编译器不支持在 TLS + DLL

### 5
```shell
../..\src/wasm/wasm-code-manager.h(765,28): error: 'atomic_load<v8::base::OwnedVector<const unsigned char>>' is deprecated: warning STL4029: std::atomic_*() overloads for shared_ptr are deprecated in C++20. The shared_ptr specialization of std::atomic provides superior functionality. You can define _SILENCE_CXX20_OLD_SHARED_PTR_ATOMIC_SUPPORT_DEPRECATION_WARNING or _SILENCE_ALL_CXX20_DEPRECATION_WARNINGS to suppress this warning. [-Werror,-Wdeprecated-declarations]
  765 |     auto wire_bytes = std::atomic_load(&wire_bytes_);
      |                            ^
C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.42.34433\include\memory(3914,1): note: 'atomic_load<v8::base::OwnedVector<const unsigned char>>' has been explicitly marked deprecated here
 3914 | _CXX20_DEPRECATE_OLD_SHARED_PTR_ATOMIC_SUPPORT _NODISCARD shared_ptr<_Ty> atomic_load(
      | ^
C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.42.34433\include\yvals_core.h(1322,7): note: expanded from macro '_CXX20_DEPRECATE_OLD_SHARED_PTR_ATOMIC_SUPPORT'
 1322 |     [[deprecated("warning STL4029: "                                                                \
      |       ^
```
从构建日志来看，这是一个与 C++20 标准库相关的废弃特性警告被当作错误处理的问题。让我详细分析：
核心错误信息
错误的具体原因
在 C++20 中，std::atomic_load 对于 shared_ptr 的旧式原子支持已被废弃
这个废弃警告来自 MSVC 的标准库实现（在 yvals_core.h 中定义）
由于编译选项中的 /WX（将警告视为错误），这个废弃警告被升级为错误
编译环境配置
问题的技术细节
V8 代码使用了旧式的 std::atomic_load 函数来处理 shared_ptr
C++20 引入了新的原子共享指针操作方式
MSVC 的标准库通过 _CXX20_DEPRECATE_OLD_SHARED_PTR_ATOMIC_SUPPORT 宏标记了这个废弃特性

### 6

```shell
# Set build arguments here. See `gn help buildargs`.
is_component_build=true
is_clang=false
use_custom_libcxx=false
use_custom_libcxx_for_host=false
treat_warnings_as_errors=false

```

```shell
T:\code\v8\v8\src/base/contextual.h(72): error C2492: 'v8::base::ContextualVariable<Derived,VarType>::top_': data with thread storage duration may not have dll interface
T:\code\v8\v8\src/base/contextual.h(72): note: the template instantiation context (the oldest one first) is
T:\code\v8\v8\src/base/contextual.h(27): note: while compiling class template 'v8::base::ContextualVariable'
T:\code\v8\v8\src/base/contextual.h(121): error C2492: 'v8::base::ContextualVariableWithDefault<Derived,VarType,default_args...>::default_value_': data with thread storage duration may not have dll interface
```

这个错误信息表明在 v8::base::ContextualVariable 类中，使用了线程存储持续期（thread storage duration）的数据成员，并且该数据成员被声明为具有 DLL 接口。具体来说，错误发生在 top_ 成员变量上。

错误详情
T:\code\v8\v8\src\base\contextual.h(72): error C2492: 'v8::base::ContextualVariable<v8::internal::torque::CurrentSourceFile,v8::internal::torque::SourceId>::top_': data with thread storage duration may not have dll interface
C2492: 数据具有线程存储持续期（thread storage duration），不能有 DLL 接口。
thread storage duration: 使用 __declspec(thread) 或 thread_local 关键字声明的变量。
dll interface: 被 __declspec(dllexport) 或 __declspec(dllimport) 修饰的变量。
原因分析
在 v8::base::ContextualVariable 类中，top_ 成员变量可能被声明为 thread_local，并且同时被标记为 __declspec(dllexport) 或 __declspec(dllimport)。这种组合是不允许的，因为线程本地存储（TLS）的数据不能通过 DLL 接口共享。