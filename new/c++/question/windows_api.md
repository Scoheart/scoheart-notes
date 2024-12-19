
缺失windows api 

- winmm.lib：用于 timeGetTime。
- Advapi32.lib：用于 ETW（事件跟踪）相关的函数，如 EventRegister, EventSetInformation, EventUnregister, 和 EventWriteTransfer。
- Dbghelp.lib：用于符号处理函数，如 SymSetOptions, SymInitialize, SymGetSearchPathW, SymSetSearchPathW, SymGetModuleBase64, SymFunctionTableAccess64, StackWalk64, SymFromAddr, 和 SymGetLineFromAddr64。

编译命令
```shell
cl /IT:\code\v8\v8 /IT:\code\v8\v8\include demo/node/_node.cc /Fe:demo/node/_node.exe /EHsc /std:c++20 /Zc:__cplusplus /link /LIBPATH:"T:\code\v8\v8\test-out\static-demo2\obj" v8_monolith.lib winmm.lib advapi32.lib dbghelp.lib
```


```shell

T:\code\v8\v8>cl /IT:\code\v8\v8 /IT:\code\v8\v8\include demo/node/_node.cc /Fe:demo/node/_node.exe /EHsc /std:c++20 /Zc:__cplusplus /link /LIBPATH:"T:\code\v8\v8\test-out\static-demo2\obj" v8_monolith.lib
Microsoft (R) C/C++ Optimizing Compiler Version 19.42.34433 for x64
Copyright (C) Microsoft Corporation.  All rights reserved.

_node.cc
Microsoft (R) Incremental Linker Version 14.42.34433.0
Copyright (C) Microsoft Corporation.  All rights reserved.

/out:demo/node/_node.exe
/LIBPATH:T:\code\v8\v8\test-out\static-demo2\obj
v8_monolith.lib
_node.obj
   Creating library demo\node\_node.lib and object demo\node\_node.exp
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
demo\node\_node.exe : fatal error LNK1120: 16 unresolved externals



```
