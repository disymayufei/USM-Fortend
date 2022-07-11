# DSM - 一个致力于完善MCSM的轻量级管理面板
### —— 开启轻量化，易用的小型面板新时代！
<br />
&ensp;&ensp;&ensp;&ensp;MCSManager（下文简称MCSM）作为一个已经开发多年，且目前已经趋于完备，在Minecraft 和其他游戏社区内中已有一定的流行程度的面板，其在目前成为多数面板服腐竹们的首选。
<br />
<br />
&ensp;&ensp;&ensp;&ensp;但随着MCSM 8.X版本正式停止维护，9.X版本的正式到来，MCSM在成功申请到知识产权保护的同时，也改用AGPL这一极为严格，且具有传染性的开源协议；这意味着任何基于MCSM二次开发的项目，在分发时均需要进行开源化，并且同样使用AGPL协议作为自己项目的开源协议，这对希望进行面板二次开发进行商业化的用户们是十分不利的。
<br />
<br />
&ensp;&ensp;&ensp;&ensp;MCSM 8.X版本虽采用较为宽松的MIT开源协议，进行二次开发的约束相对较小；但由于目前停止维护的缘故，其中许多bug（如缺少服务器实例的分类与搜索机制，对上传文件完整性缺乏校验，用户权限分级不完善等）无法在后续更新的8.X版本中得到修复。这也是我们开发DSM的初衷。
<br />
<br />
&ensp;&ensp;&ensp;&ensp;由于MCSM有相关知识产权的保护，因此我们决定，完全弃用任一版本的MCSM代码，转而对MCSM进行黑盒实现，故早期版本一定是十分不完善的。相关bug可以直接在issue处反馈，我们也欢迎其他开发者为我们的项目作出贡献！
<br />
<br />

#### &ensp;&ensp;&ensp;&ensp;DSM，全称StarLight Minecraft Server Manager，由于首字母简写为两个SM，因此简写为DSM（Double SM），此处存放的是DSM的前端代码！

---------

# —— 开发者文档部分
## Part 1 与后端的通讯协议

- ## 1.1 基本通讯标准
  
    - ### 1.1.1 通讯方式
      - 为方便通讯过程中的统一，除基本前端页面内容的渲染采用http请求直接拉取资源的方式外，下文中所有出现的通讯交互包，均通过***WebSocket***的方式与后端进行交互。
      
      <br />
      
      - 交互包中可能出现用户的敏感信息（如AccessKey），是前后端之间校验合法性的重要凭据，因此虽然本标准不做强制要求，但仍希望您通过Nginx反代等手段，为WebSocket通讯过程使用TLS加密，并建议密钥强度 ≥2048bit（RSA）或 ≥256bit（ECC），以充分保证您数据的安全。
      
      <br />
    
      - 由于WebSocket的特性，使得服务端和客户端均可成为主动发包的一方。故下文中所有通讯包都会标明来源（其中C代表客户端，S代表服务端），**请在二次开发前，确认好某一通讯包的来源**，避免发送错误的包！

- ## 1.2 未压缩版（通讯包以JSON字符串为主）
    
    - ### 1.2.1 通用包格式
  
        - 适用于：C / S
        
        - 任何包都具有以下通用的部分：
      
        &ensp;&ensp;&ensp;&ensp;```{"header": packet-header, "args": packet-args}```
  
        <br />

        - 其中 **header** 为包头，为String类型，表明这个包的作用（如：登录握手，进程输出消息传递等）， **args** 为包内容，类型可变，记录了这个包的更多相关信息。任何未压缩的通讯包，最外层一定会遵循该格式。
          
        <br />

        - 以下所有包的描述将不再显示该格式，而只会给出 **header** 和 **args** 的内容，以方便阅读，但请确保任何通讯包都遵循该格式，以防后端发生解析失败的情况。
    
    - ### 1.2.2 错误包
        
        - 来源：S
        - 作用：当发生任何错误的时候，后端均会返回该包，以提示错误的类型。
        - **header：error**
        - args：
          - 类型：map
          - 基本格式：{ "code": error-code, "reason": error-reason }
          - 基本格式释义：
            - code：错误码，为int类型，可为以下值：
              - 100：上传的文件SHA-1值校验失败
              - 101：操作过于频繁
              - 200：通讯包被服务器主动拒收（可能正在调试）
              - 401：不存在的access-key
              - 403：权限不足，访问被禁止
              - 404：操作的文件或目录不存在
              - 500：包格式错误
              - 501：服务器自身发生意外的错误
              - 502：服务器正在关闭
            - reason：错误原因，为String类型（不会为null），详细描述错误的具体内容
            
    - ### 1.2.3 登录握手包
      - #### 作用：在**登录**时，进行握手与相关合法性校验工作
      - #### header: login
      - ### 1.2.3.1 登录请求包
        - 来源：C
        - 作用：客户端请求登录
        - args：
          - 类型：map
          - 基本格式：{ "user": user-account, "pwd": plain-password }
          - 基本格式释义：
            - user：用户名，为String类型，记录用户名的明文信息
            - pwd：用户密码，为String类型，记录用户的***明文***密码
          - 备注：由于此包包含明文密码，故TLS加密是必要的！
      - ### 1.2.3.2 登录响应包
        - 来源：S
        - 作用：服务器校验登录请求后，返回相应请求的相关信息
        - args:
          - 类型：map
          - 基本格式：{ "status": login-status, "reason": login-reason, "accessKey": access-key }
          - 基本格式释义：
            - status：登录状态，为String类型，可为以下值：
              - "success"：表明登录成功，无错误发生
              - "failed"：表明因某些原因登录失败
            - reason：登录状态发生的原因，为String类型（不会为null），详细描述登录成功或失败的具体原因。
            - accessKey：登录许可密钥，为String类型（登录失败时为null），用于后续所有操作的合法性校验，建议用cookie缓存。
    
    - ### 1.2.4 注册握手包
      - 作用：在**注册**时，进行握手与相关合法性校验工作
      - header：register
      - ### 1.2.4.1 注册请求包
        - 来源：C
        - 作用：客户端请求注册
        - args：
          - 类型：map
          - 基本格式：{ "user": user-account, "pwd": plain-password, "code": invitation-code }
          - 基本格式释义：
              - user：用户名，为String类型，记录用户名的明文信息
              - pwd：用户密码，为String类型，记录用户的***明文***密码
              - code：邀请码，为String类型，记录用户的邀请码值
      - ### 1.2.4.2 注册响应包
        - 来源：S
        - 作用：服务器校验注册请求后，返回相应请求的相关信息
        - args：
          - 类型：map
          - 基本格式：{ "status": register-status, "reason": register-reason, "accessKey": access-key }
          - 基本格式释义：
              - status：注册状态，为String类型，可为以下值：
                  - "success"：表明注册成功，无错误发生
                  - "failed"：表明因某些原因注册失败
              - reason：注册状态发生的原因，为String类型（不会为null），详细描述登录成功或失败的具体原因。
              - accessKey：登录许可密钥，为String类型（注册失败时为null），用于后续所有操作的合法性校验，建议用cookie缓存。
          - 备注：注册成功时，后端会同时帮该用户登录，表现为返回accessKey，因此该accessKey作用等同于登录包中的accessKey
  
    - ### 1.2.5 子服务器展示包
      
      - 作用：用于查询该用户下的子服务器，以使前端正确渲染
      - ### 1.2.5.1 请求展示包
        - 来源：C
        - 作用：请求子服务器信息
        - args：
          - 类型：map
          - 基本格式：{ "type": request-type, class: "server-class", "accessKey": access-key }
          - 基本格式释义：
            - type：请求类型，为String类型，表明请求查询的类型，可为以下值：
              - "all"：查询该用户下全部服务器
              - "class"：查询该用户下所有的分类信息
              - "server"：查询该用户某一类别下的分类信息
            - class：请求查询的类别，为String类型，表明请求查询的服务器所属类别，只在 **type** 为 **"server"** 时可用，返回仅属于该类别的服务器，其他 **type** 值请保持为null
            - accessKey：用户的access-key,用于校验用户身份
      - ### 1.2.5.2 总览信息包
        - 来源：S
        - 作用：展示服务器的分类信息和描述，用于渲染总览界面
        - args：
          - 类型：map
          - 基本格式：{ "class": server-class, "title": server-title, "description": server-description }
          - 基本格式释义：
            - class：类别，为String类型，表明该子服务器所属的类
            - title：主标题，为String类型，表明该子服务器的标题
            - description：描述，为String类型，表明该子服务器的描述内容