# LLMs (beta)

本文档旨在为大模型辅助编程提供标准化的项目信息，使其能够更准确、高效的理解用户指令，并严格按照用户需求生成或修改代码。

## 推理规范

1. [意图识别] 当接收到用户指令时，你需要先思考用户的意图；
2. [任务拆解] 你需要根据用户的意图拆解子任务，然后根据子任务的要求去生成或修改代码；
3. [路径规划] 当存在多个子任务时，你需要规划任务的执行顺序，确保每个子任务都能正确执行；
4. [严格模式] 你需要严格按照用户需求生成或修改代码，不得修改任何非代码文件。

## 目录树
```
<projectRoot>
├── .github                # GitHub 配置文件
├── backend                        # 后端项目的目录
│   ├── README.md                  # 说明文档
│   ├── README_zh.md               # 说明文档（中文）
│   ├── LICENSE                    # 许可文件
│   ├── .dockerignore              # Docker 忽略文件
│   ├── .gitignore                 # Git 忽略文件
│   ├── .gitattributes             # Git 属性文件
│   ├── go.mod                     # Go Module 依赖管理文件
│   ├── go.sum                     # Go Module 依赖管理文件
│   ├── Makefile                   # 提供了一些开发或调试相关的操作命令
│   ├── api                        # 接口定义，包括请求和响应的结构体
│   │   └── v1                     # v1版本
│   ├── cmd                        # 应用的入口点，根据不同的命令执行不同的操作 
│   │   ├── migration              # 用于执行数据库迁移操作
│   │   │   ├── main.go            # 应用程序入口
│   │   │   └── wire               # 依赖注入配置
│   │   │       ├── wire.go        # 依赖注入配置文件
│   │   │       └── wire_gen.go    # 该文件是由 Wire 工具自动生成的，请勿手动修改
│   │   ├── server                 # 用于启动后端服务器
│   │   │   ├── main.go            # 应用程序入口
│   │   │   └── wire               # 依赖注入配置
│   │   │       ├── wire.go        # 依赖注入配置文件
│   │   │       └── wire_gen.go    # 该文件是由 Wire 工具自动生成的，请勿手动修改
│   │   └── task                   # 用于执行后台任务
│   │       ├── main.go            # 应用程序入口
│   │       └── wire               # 依赖注入配置
│   │           ├── wire.go        # 依赖注入配置文件
│   │           └── wire_gen.go    # 该文件是由 Wire 工具自动生成的，请勿手动修改
│   ├── config                     # 应用配置文件，根据不同的环境提供不同的配置
│   │   ├── local.yml              # 本地环境，用于开发、测试
│   │   ├── gray.yml               # 灰度环境，用于上线前的测试
│   │   └── prod.yml               # 生产环境，用于生产
│   ├── deploy                     # 构建和部署相关的配置文件
│   │   ├── build                  # 构建
│   │   │   └── Dockerfile         # 镜像构建文件
│   │   └── docker-compose         # 部署
│   │       └── docker-compose.yml # 镜像部署文件
│   ├── docs                       # 接口文档，使用 Swagger 生成
│   │   ├── docs.go                # 该文件是由 Swag 工具自动生成的，请勿手动修改
│   │   ├── swagger.json           # 生成 Swagger 文档的 JSON 配置文件
│   │   └── swagger.yaml           # 生成 Swagger 文档的 YAML 配置文件
│   ├── internal                   # 应用的核心模块，包含了各种业务逻辑的实现
│   │   ├── handler                # 处理 HTTP 请求的实现，负责接收请求并调用相应的服务进行处理
│   │   │   ├── handler.go         # Handler 类
│   │   │   └── user.go            # User Handler
│   │   ├── job                    # 包含了异步事件的实现
│   │   │   ├── job.go             # Job 类
│   │   │   └── user.go            # User 异步事件
│   │   ├── middleware             # 包含了中间件的实现，用于处理请求的预处理和后处理
│   │   │   ├── cors.go            # 处理跨域请求
│   │   │   ├── jwt.go             # 处理 JWT 认证
│   │   │   ├── log.go             # 处理日志记录
│   │   │   └── sign.go            # 处理签名验证
│   │   ├── model                  # 包含了数据模型的定义
│   │   │   └── user.go            # User 数据库表
│   │   ├── repository             # 包含了数据访问层的实现，负责与数据库进行交互
│   │   │   ├── repository.go      # Repository 类
│   │   │   └── user.go            # User DAO层
│   │   ├── server                 # 包含了服务端的实现，用于接收请求并处理
│   │   │   ├── http.go            # 处理 HTTP 请求
│   │   │   ├── job.go             # 处理后台任务
│   │   │   ├── migration.go       # 处理数据库迁移
│   │   │   └── task.go            # 处理后台任务
│   │   ├── service                # 包含了业务逻辑的实现，负责处理具体的业务操作
│   │   │   ├── service.go         # Service 类
│   │   │   └── user.go            # User 业务逻辑类
│   │   └── task                   # 包含了定时任务的实现
│   │       ├── task.go            # Task 类
│   │       └── user.go            # User 定时任务
│   ├── pkg                        # 包含了一些通用的功能和工具
│   │   ├── app                    # 包含了应用程序的配置和初始化
│   │   │   └── app.go
│   │   ├── config                 # 包含了应用程序的配置文件
│   │   │   └── config.go
│   │   ├── jwt                    # 包含了 JWT 认证的实现
│   │   │   └── jwt.go             # JWT Token 生成和解析
│   │   ├── log                    # 包含了日志记录的实现
│   │   │   └── log.go
│   │   ├── server                 # 包含了服务器的实现
│   │   │   ├── grpc               # 包含了 gRPC 服务器的实现
│   │   │   │   └── grpc.go
│   │   │   ├── http               # 包含了 HTTP 服务器的实现
│   │   │   │   └── http.go
│   │   │   └── server.go
│   │   ├── sid                    # 包含了 SID 生成器的实现
│   │   │   ├── convert.go
│   │   │   └── sid.go
│   │   └── zapgorm2               # 包含了 ZapGorm2 的实现
│   │       └── zapgorm2.go
│   ├── scripts                    # 包含了一些脚本文件，用于项目的构建、测试和部署等操作
│   │   └── README.md
│   ├── storage                    # 该模块用于存储文件或其他静态资源。
│   │   └── nunu-test.db           # 测试数据库文件
│   ├── test                       # 该模块包含了各个模块的单元测试，按照模块划分子目录
│   │   ├── mocks                  # 模拟数据
│   │   │   ├── repository         # 模拟数据库 DAO 层
│   │   │   │   ├── repository.go
│   │   │   │   └── user.go        # 模拟 User DAO 层
│   │   │   └── service            # 模拟业务逻辑
│   │   │       └── user.go
│   │   └── server                 # 服务测试
│   │       ├── handler            # 测试 Handler
│   │       │   ├── main_test.go
│   │       │   └── user_test.go
│   │       ├── repository         # 测试 Repository
│   │       │   └── user_test.go
│   │       └── service            # 测试 Service
│   │           └── user_test.go
│   └── web
│       └── index.html
├── frontend                           # 前端项目的目录
│   ├── README.md                      # 说明文档
│   ├── mock                           # 模拟数据，用于模拟后端接口的返回数据，便于前端开发和测试
│   │   └── userAPI.ts                 # 这是一个代码样例
│   ├── package.json                   # 依赖管理文件，通常不需要手动修改
│   ├── pnpm-lock.yaml                 # 依赖锁定文件，通常不需要手动修改
│   ├── src                            # 源代码目录
│   │   ├── access.ts                  # 权限
│   │   ├── app.ts                     # 运行时配置
│   │   ├── assets                     # 静态资源
│   │   ├── components                 # 全局组件
│   │   │   └── Guide                  # 这是一个示例组件
│   │   │       ├── Guide.less         # 样式
│   │   │       ├── Guide.tsx          # 组件
│   │   │       └── index.ts
│   │   ├── constants                  # 常量
│   │   │   └── index.ts               # 全局常量
│   │   ├── models                     # 模型
│   │   │   └── global.ts              # 全局共享数据
│   │   ├── pages                      # 页面目录
│   │   │   ├── Access                 # 访问控制
│   │   │   │   └── index.tsx
│   │   │   ├── Home                   # 默认主页
│   │   │   │   ├── index.less
│   │   │   │   └── index.tsx
│   │   │   └── Table                  # 表格页面
│   │   │       ├── components         # 表格页面的构成组件，如创建、更新的表单等，这是一个代码样例
│   │   │       │   ├── CreateForm.tsx # 创建表单
│   │   │       │   └── UpdateForm.tsx # 更新表单
│   │   │       └── index.tsx          # 表格页
│   │   ├── services                   # 服务目录，用于封装网络请求等，均由 OpenAPI 生成，请勿手动修改
│   │   │   └── demo                   # 示例
│   │   │       ├── UserController.ts  # User Controller，用于处理用户的增删改查等操作，这是一个代码样例
│   │   │       ├── index.ts           # 服务入口
│   │   │       └── typings.d.ts       # 类型定义文件
│   │   └── utils                      # 工具
│   │       └── format.ts              # 格式化工具
│   ├── tsconfig.json                  # TypeScript 配置文件
│   └── typings.d.ts                   # 类型定义文件
├── .gitignore             # Git忽略文件
├── openhrm.code-workspace # VSCode工作区文件
├── LLMs.zh-CN.md          # 本文档
├── LICENSE                # 许可协议
└── README.md              # 项目简介
```

## 技术栈

- 前端
  - [Ant Design Pro](https://pro.ant.design/zh-CN/docs/overview) 基于 Ant Design 和 UmiJS 封装的一整套企业级中后台前端/设计解决方案
    - [UmiJS](https://umijs.org/docs/guides/getting-started) 可扩展的企业级前端应用框架

- 后端
  - [Go](https://go.dev) 作为后端编程语言
  - [Nunu](https://github.com/go-nunu/nunu/blob/main/README_zh.md) 应用脚手架来生成后端工程
    - [Gin](https://github.com/gin-gonic/gin) Web 框架
    - [Gorm](https://github.com/go-gorm/gorm) ORM 框架
    - [Wire](https://github.com/google/wire) 依赖注入
    - [Viper](https://github.com/spf13/viper) 配置管理
    - [Zap](https://github.com/uber-go/zap) 日志
    - [Golang-jwt](https://github.com/golang-jwt/jwt) JWT
    - [Go-redis](https://github.com/go-redis/redis) Redis
    - [Testify](https://github.com/stretchr/testify) 测试
    - [Sonyflake](https://github.com/sony/sonyflake) 分布式 ID
    - [Gocron](https://github.com/go-co-op/gocron) 定时任务
    - [Go-sqlmock](https://github.com/DATA-DOG/go-sqlmock) SQL Mock
    - [Gomock](https://github.com/golang/mock) Mock
    - [Swaggo](https://github.com/swaggo/swag) Swagger
    - [Pitaya](https://github.com/topfreegames/pitaya) RPC
    - [Casbin](https://github.com/casbin/casbin) RBAC

- 构建
  - GitHub Actions
  - Docker

- 部署
  - Docker Compose
  - Kubernetes

## 设计规范

当用户要求生成前端页面或组件，同时又不提供设计参考时，你应当遵循以下设计规范：

基于「自然」、「确定性」、「意义感」、「生长性」四大设计价值观，通过模块化解决方案，降低冗余的生产成本，让设计专注于更好的用户体验。

- 自然

  - 感知自然：认知心理学所述，约 80% 外界信息通过视觉通道获取。界面设计中最重要的视觉要素，包括布局、色彩、插画、图标等，应充分汲取自然界规律，从而降低用户认知成本，带来真实流畅的感受。在一些场景下，适时加入听觉、触觉等其它感知通道，能创造更丰富自然的产品体验。

  - 行为自然：在与系统的互动中，设计者应充分理解用户、系统角色、任务目标间的关系，场景化组织系统功能和服务。同时辅以行为分析、人工智能、传感器、元数据等策略，提供主动式服务，帮助用户决策、减少操作，从而节约用户脑力和体力，让人机交互行为更自然。

- 确定性

  - 设计者确定：企业级产品都是分工合作的产物，参与者越多合作熵越高，这是一切设计工作低效、产品系统不易维护的来源。通过探索设计规律、模块化设计思路，来为设计者提供足够精简的设计规则、组件、模式等，赋能设计者、降低合作熵。

    - 保持克制： 能做，但想清楚了不做。设计者应当聚焦在最有价值产品功能打磨，并用尽可能少的设计元素将其表达。正如 Antoine de Saint-Exupéry 所说：完美不在于无以复加，而在于无可删减，万事莫不如此。

    - 面向对象的方法： 探索设计规律，并将其抽象成「对象」，增强界面设计的灵活性和可维护性，同时也减少「设计者」的主观干扰，从而降低系统的不确定性。例如：色值换算、间距排版。

    - 模块化设计： 将复杂或者重复出现的局部封装成模块，提供有限接口与其他模块互动，最终全面减少系统的复杂度，进而增进可靠性以及可维护性。设计者可运用现有的组件/模板或者自行抽象可复用的组件/模板，节约无谓的设计且保持系统一致性，让「设计者」把创造力专注在最需要的地方。

  - 用户确定：用户日常工作是通过诸多企业级产品的协同来完成的，除了考虑单一产品的设计一致性，更应当在跨产品、跨终端、跨系统间保持良好的确定性。一致的外观和交互，保持面向用户的熟悉感，能提升易学性，降低认知和操作成本，提升工作效率。

- 意义感

  - 结果的意义：明确目标，即时反馈。洞悉工作目标，根据使用流程拆解明确的子目标，让每个交互行为都围绕着主目标的达成；为每个行为，辅以恰当、即时的反馈，让用户对操作结果了然于胸。此外，可通过情感化设计，适度安抚用户负面情感，强化用户正面情感。

  - 过程的意义：挑战适中，全情投入。调整不同场景下的工作难度，让功能适时适地触发，以匹配用户能力；如无必要，勿增实体，不分散用户注意力，让用户专注于任务达成，而非界面。让当下的工作既不过于简单，亦不过于复杂，挑战适中，并随着用户能力的成长提出更高的挑战，能让用户持续沉浸在工作的心流中，获得富有成就感的工作体验。

- 生长性

  - 价值连接：产品的增长依赖于用户的群体扩大和深度使用，而用户的成长又依赖于产品功能的完善。设计者应建立系统设计思维，洞悉产品功能的价值，探索用户在不同场景下的需求，在价值和需求间建立连接。让产品价值被发现，帮助用户建立更有效、更高效的工作方式。

  - 人机共生：产品功能和用户需求的更多连接，让人机互动更加紧密，用户和系统共生。在进行产品设计时，不应将用户和系统独立开来，而应将两者作为一个动态发展的共同体来思考，确保其足够的灵活、包容，充满生命力。

> 摘抄自 https://ant-design.antgroup.com/docs/spec/values-cn

## 编码规范

- 当你尝试新增或修改某个功能时，需要考虑以下业务实现的关联影响：

   - 前端：Page -> Component -> API Request 影响点位于哪个页面、哪个组件、哪个API Request
   - 后端：Handler -> Service -> Repository -> Model 影响点位于哪个Handler、哪个Service、哪个Repository、哪个Model

- 开发前端页面时，你应当考虑优先使用 Ant Design Pro 提供的组件和API，避免重复造轮子。

- 开发后端接口时，你应当考虑遵循RESTful风格，同时考虑性能开销，避免出现性能瓶颈或不必要的计算。

- 当发生代码变更时，你应当考虑如何撰写测试用例进行验证，以确保代码的正确性和稳定性，包括但不限于单元测试、集成测试、UAT。

- 你应当考虑使用设计模式，灵活处理不同业务场景带来的挑战。

- 你应当考虑代码的可读性、可维护性，避免出现冗余代码或复杂的逻辑。

- 你应当考虑代码的兼容性，避免出现代码兼容问题。

- 你应当考虑代码的安全性，避免出现安全漏洞或数据泄露。

- 你应当考虑代码的国际化，避免出现语言差异或翻译错误。