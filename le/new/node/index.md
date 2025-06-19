Start()
  └─> StartInternal()
       ├─> InitializeNodeWithArgsInternal()
       │    ├─> RegisterBuiltinBindings()
       │    ├─> V8::SetFlagsFromString()
       │    └─> HandleEnvOptions()
       │
       ├─> per_process::v8_platform.Initialize()
       ├─> V8::Initialize()
       └─> NodeMainInstance::Run()
            └─> 开始执行 JavaScript 代码