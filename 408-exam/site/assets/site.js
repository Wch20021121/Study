/* 408 大题工位 — shared interactions (no dependencies) */
(function () {
  "use strict";

  var storeKey = "bq408-mastery-v1";

  function readStore() {
    try {
      var raw = localStorage.getItem(storeKey);
      if (!raw) return {};
      var data = JSON.parse(raw);
      return data && typeof data === "object" ? data : {};
    } catch (err) {
      return {};
    }
  }

  function writeStore(data) {
    try {
      localStorage.setItem(storeKey, JSON.stringify(data));
    } catch (err) {
      /* private mode / quota: keep the page usable */
    }
  }

  var state = readStore();

  function toast(message) {
    var el = document.querySelector(".toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-visible");
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(function () {
      el.classList.remove("is-visible");
    }, 1600);
  }

  /* ---------- responsive nav ---------- */

  var menuButton = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.focus();
      }
    });
  }

  /* ---------- English sibling site (different port) ---------- */

  var englishPort =
    (window.STUDY_SITES && Number(window.STUDY_SITES.englishPort)) || 5001;
  var englishUrl =
    (window.STUDY_SITES && window.STUDY_SITES.englishUrl) || "";

  document.querySelectorAll("[data-english-link]").forEach(function (link) {
    if (englishUrl) {
      link.href = englishUrl;
      return;
    }
    if (location.protocol === "file:") {
      link.href = "http://127.0.0.1:" + englishPort + "/";
      return;
    }
    var host = location.hostname || "127.0.0.1";
    var suffix = englishPort === 80 || englishPort === 443 ? "" : ":" + englishPort;
    link.href = location.protocol + "//" + host + suffix + "/";
  });

  /* ---------- solution toggles ---------- */

  var solutionButtons = Array.prototype.slice.call(
    document.querySelectorAll(".solution-toggle")
  );

  function setSolution(button, open, options) {
    var target = document.getElementById(button.getAttribute("aria-controls"));
    if (!target) return;
    var quiet = options && options.quiet;
    target.hidden = !open;
    button.setAttribute("aria-expanded", open ? "true" : "false");
    var collapsed = button.getAttribute("data-label-closed") || "展开参考答案";
    var opened = button.getAttribute("data-label-open") || "收起参考答案";
    button.textContent = open ? opened : collapsed;
    if (!quiet) {
      button.focus({ preventScroll: true });
    }
  }

  solutionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var isOpen = button.getAttribute("aria-expanded") === "true";
      setSolution(button, !isOpen);
    });
  });

  var expandAll = document.querySelector("[data-expand-all]");
  var collapseAll = document.querySelector("[data-collapse-all]");

  if (expandAll) {
    expandAll.addEventListener("click", function () {
      solutionButtons.forEach(function (button) {
        if (button.getAttribute("aria-expanded") !== "true") {
          setSolution(button, true, { quiet: true });
        }
      });
      toast("已展开本页全部解析");
    });
  }

  if (collapseAll) {
    collapseAll.addEventListener("click", function () {
      solutionButtons.forEach(function (button) {
        if (button.getAttribute("aria-expanded") === "true") {
          setSolution(button, false, { quiet: true });
        }
      });
      toast("已收起全部解析");
    });
  }

  /* ---------- mastery / progress ---------- */

  var masteryInputs = Array.prototype.slice.call(
    document.querySelectorAll("[data-mastery]")
  );

  function isDone(id) {
    return Boolean(state[id]);
  }

  function paintProgress() {
    document.querySelectorAll("[data-progress-subject]").forEach(function (box) {
      var subject = box.getAttribute("data-progress-subject");
      var inputs = document.querySelectorAll(
        '[data-mastery^="' + subject + '-"]'
      );
      var done = 0;
      inputs.forEach(function (input) {
        if (isDone(input.getAttribute("data-mastery"))) done += 1;
      });
      var total = inputs.length;
      var text = box.querySelector("[data-progress-text]");
      var fill = box.querySelector(".progress-fill");
      if (text) text.textContent = done + " / " + total;
      if (fill) fill.style.width = total ? (done / total) * 100 + "%" : "0%";
    });

    document.querySelectorAll("[data-subject-progress]").forEach(function (el) {
      var subject = el.getAttribute("data-subject-progress");
      var inputs = document.querySelectorAll(
        '[data-mastery^="' + subject + '-"]'
      );
      var total = Number(el.getAttribute("data-total")) || inputs.length;
      var done = 0;
      if (inputs.length) {
        inputs.forEach(function (input) {
          if (isDone(input.getAttribute("data-mastery"))) done += 1;
        });
      } else {
        Object.keys(state).forEach(function (key) {
          if (key.indexOf(subject + "-") === 0) done += 1;
        });
      }
      if (total) {
        el.textContent = "已掌握 " + done + " / " + total;
      }
    });

    document.querySelectorAll(".q-nav a").forEach(function (link) {
      var hash = link.getAttribute("href") || "";
      var id = hash.split("#")[1];
      if (!id) return;
      var input = document.querySelector('[data-mastery="' + id + '"]');
      link.classList.toggle("is-done", Boolean(input && isDone(id)));
    });
  }

  masteryInputs.forEach(function (input) {
    var id = input.getAttribute("data-mastery");
    input.checked = isDone(id);
    input.addEventListener("change", function () {
      if (input.checked) {
        state[id] = true;
        toast("已标记为掌握");
      } else {
        delete state[id];
        toast("已取消掌握标记");
      }
      writeStore(state);
      paintProgress();
    });
  });

  paintProgress();

  /* ---------- print: include all solutions ---------- */

  var printState = [];

  window.addEventListener("beforeprint", function () {
    printState = solutionButtons.map(function (button) {
      return button.getAttribute("aria-expanded") === "true";
    });
    solutionButtons.forEach(function (button) {
      setSolution(button, true, { quiet: true });
    });
  });

  window.addEventListener("afterprint", function () {
    solutionButtons.forEach(function (button, index) {
      setSolution(button, Boolean(printState[index]), { quiet: true });
    });
  });

  /* ---------- knowledge map ---------- */

  var concepts = {
    "coa-data": {
      subject: "组成原理",
      title: "数据表示与运算",
      kicker: "COA · 01",
      summary:
        "补码、移码、IEEE 754 是后面所有地址计算和浮点运算的地基。408 常在选择题考边界，在大题里作为参数出现。",
      formula:
        "补码范围：-2^(n-1) ~ 2^(n-1)-1\nIEEE 754 单精度：1 位符号 + 8 位阶码 + 23 位尾数\n真值 = (-1)^S × 1.M × 2^(E-127)",
      traps: [
        "移码只改变表示顺序，不改变数值大小；比较浮点数时不能直接按整数字段比较（负数除外）。",
        "补码加法溢出判断看符号位进位与最高位进位是否一致，不看结果是否为负。"
      ],
      links: [{ href: "coa.html#c2", label: "C2 指令字段与立即数" }]
    },
    "coa-cache": {
      subject: "组成原理",
      title: "存储层次与 Cache",
      kicker: "COA · 02",
      summary:
        "大题最常见的入口：给容量、块大小、相联度，先拆地址，再追访问序列，最后算 AMAT 或访存流量。",
      formula:
        "组数 = Cache 数据容量 ÷ (块大小 × 路数)\noffset = log₂(块大小)\nindex = log₂(组数)\ntag = 地址位数 - index - offset\nAMAT = 命中时间 + 缺失率 × 缺失代价",
      traps: [
        "Cache 容量通常指数据容量，不含 tag、valid、dirty；题目问“总容量”时才加。",
        "写回法只在脏块被替换时写主存；写直达每次写都访问主存，常有写缓冲。",
        "组相联的冲突缺失发生在同一组内路数不够，不是整个 Cache 满了。"
      ],
      links: [
        { href: "coa.html#c1", label: "C1 Cache 映射与写回" },
        { href: "os.html#o1", label: "O1 虚拟内存与 TLB" }
      ]
    },
    "coa-isa": {
      subject: "组成原理",
      title: "指令系统与寻址",
      kicker: "COA · 03",
      summary:
        "拿到机器码先按格式切字段；看到“有效地址”先判断是基址、变址、相对还是间接寻址。数据通路题也从这个入口开始。",
      formula:
        "有效地址 EA = 基址 + 变址 × 比例 + 位移量\n相对寻址：EA = PC + 位移量（注意 PC 已自增）\n指令字长固定时，扩展操作码要满足前缀不冲突",
      traps: [
        "立即数在指令里，不是地址；寄存器间接寻址的 EA 在寄存器里。",
        "分支指令的位移量通常相对“下一条指令”的 PC，不是当前指令地址。",
        "符号扩展与零扩展取决于指令语义，不能看到立即数就默认补 0。"
      ],
      links: [{ href: "coa.html#c2", label: "C2 指令译码与控制信号" }]
    },
    "coa-cpu": {
      subject: "组成原理",
      title: "CPU 与流水线",
      kicker: "COA · 04",
      summary:
        "大题通常给指令序列和冒险条件，让你数停顿、算 CPI、判断转发是否够用。先画时空图，再套公式。",
      formula:
        "实际 CPI = 理想 CPI + 各类停顿/指令数\nCPU 时间 = 指令数 × CPI × 时钟周期\nMIPS = 主频(MHz) ÷ CPI\n流水线理想加速比 ≈ 流水段数（指令足够多时）",
      traps: [
        "load-use 冒险即使有转发也通常要停 1 拍；ALU-ALU 依赖一般可靠转发解决。",
        "分支预测错误代价取决于“在哪一段解析分支”，不是固定的。",
        "CPI 是平均值，不能把不同指令的 CPI 直接相加。"
      ],
      links: [{ href: "coa.html#c3", label: "C3 流水线冒险与 CPI" }]
    },
    "coa-io": {
      subject: "组成原理",
      title: "总线、I/O 与 DMA",
      kicker: "COA · 05",
      summary:
        "把“设备有多快”和“CPU 要花多少时间”分开算。DMA 的关键不是搬运速度，而是 CPU 只在初始化和结束时介入。",
      formula:
        "总线带宽 = 总线宽度 × 总线频率\nDMA 传送时间 = 数据量 ÷ 每次总线传送字节数 × 总线周期\nCPU 开销 = 初始化周期 + 中断处理周期（不含 DMA 搬运）",
      traps: [
        "DMA 传送期间 CPU 仍可执行程序，但会与 CPU 争用内存总线（周期挪用）。",
        "中断响应时间包括保护现场，不等于中断服务程序执行时间。",
        "磁盘的平均存取时间 = 平均寻道 + 平均旋转延迟 + 传输时间。"
      ],
      links: [
        { href: "coa.html#c4", label: "C4 磁盘与 DMA" },
        { href: "os.html#o4", label: "O4 文件系统与磁盘调度" }
      ]
    },
    "coa-disk": {
      subject: "组成原理",
      title: "磁盘与 RAID",
      kicker: "COA · 06",
      summary:
        "磁盘题的三个时间要分开；RAID 题先看“校验放在哪、允许坏几块”，再算容量和可靠性与写惩罚。",
      formula:
        "平均存取时间 = 平均寻道时间 + 平均旋转延迟 + 传输时间\n平均旋转延迟 = 60 ÷ 转速 ÷ 2\nRAID 0：条带化，无冗余；RAID 1：镜像；RAID 5：单校验；RAID 6：双校验",
      traps: [
        "转速单位 r/min 要先换成 r/s，再取一圈时间的 1/2。",
        "RAID 5 的可用容量是 (N-1) 块盘；RAID 6 是 (N-2) 块盘。",
        "RAID 不是备份；它解决磁盘故障，不解决误删、病毒、机房事故。"
      ],
      links: [{ href: "coa.html#c4", label: "C4 磁盘参数计算" }]
    },
    "net-arch": {
      subject: "计算机网络",
      title: "体系结构与性能",
      kicker: "NET · 01",
      summary:
        "时延、带宽、吞吐量是网络大题的通用货币。先画路径，再拆成“传播 + 传输 + 排队 + 处理”。",
      formula:
        "传播时延 = 距离 ÷ 传播速率\n传输时延 = 数据量 ÷ 链路带宽\n时延带宽积 = 带宽 × 传播时延\n吞吐量受瓶颈链路限制",
      traps: [
        "带宽提高不会缩短传播时延；光纤里的传播速度也不是光速。",
        "存储转发的每一跳都要完整收下再转发（除非 cut-through）。",
        "单位：1 KB = 1024 B，链路带宽常用 10^6/10^9 十进制。"
      ],
      links: [{ href: "network.html#n3", label: "N3 DNS/HTTP 时延" }]
    },
    "net-link": {
      subject: "计算机网络",
      title: "数据链路层",
      kicker: "NET · 02",
      summary:
        "以太网帧、CSMA/CD、交换机 MAC 表、VLAN 是四条主线。记住：交换机隔离冲突域，不隔离广播域。",
      formula:
        "最小帧长 = 2τ × 数据率\n其中 τ = 单程传播时延，2τ 是争用期\n100 Mb/s、64 B 最小帧对应争用期 5.12 μs",
      traps: [
        "MAC 地址在每一跳重写，IP 地址端到端不变（NAT 例外）。",
        "交换机收到未知单播会泛洪，收到广播一定泛洪（同一 VLAN 内）。",
        "划分 VLAN 后，不同 VLAN 之间必须经过三层设备才能通信。"
      ],
      links: [{ href: "network.html#n4", label: "N4 CSMA/CD 与交换机" }]
    },
    "net-ip": {
      subject: "计算机网络",
      title: "网络层与路由",
      kicker: "NET · 03",
      summary:
        "子网划分、CIDR、最长前缀匹配、ARP、NAT 是网络层大题的五个高频动作。先算地址块，再查路由表。",
      formula:
        "可用主机数 = 2^(32-前缀长度) - 2\n网络地址 = IP AND 子网掩码\n最长前缀匹配：前缀越长越优先；默认路由 0.0.0.0/0 最后匹配",
      traps: [
        "/31 点对点链路可用 2 个地址（RFC 3021），别再减 2。",
        "路由表查表只比较目的 IP 的前缀，不比较源 IP。",
        "ARP 请求是广播，ARP 应答是单播；ARP 只在同一广播域内解析。"
      ],
      links: [{ href: "network.html#n1", label: "N1 VLSM、路由与 ARP" }]
    },
    "net-tcp": {
      subject: "计算机网络",
      title: "传输层与拥塞控制",
      kicker: "NET · 04",
      summary:
        "cwnd 演化题先画轮次表：慢开始翻倍，拥塞避免加一，超时门限减半，三重重复 ACK 快重传/快恢复。",
      formula:
        "发送窗口 = min(cwnd, rwnd)\n超时：ssthresh = max(⌊cwnd/2⌋, 2)，cwnd = 1\n三重重复 ACK：ssthresh = ⌊cwnd/2⌋，进入快恢复\n吞吐量 ≈ 窗口大小 × 8 ÷ RTT",
      traps: [
        "慢开始不是“窗口增长慢”，而是每 RTT 翻倍，初始很小。",
        "拥塞避免阶段每 RTT 加 1 个 MSS，不是加一倍。",
        "接收窗口 rwnd 与拥塞窗口 cwnd 取小者，题目给了 rwnd 就不能只看 cwnd。"
      ],
      links: [{ href: "network.html#n2", label: "N2 TCP 拥塞窗口" }]
    },
    "net-app": {
      subject: "计算机网络",
      title: "应用层：DNS 与 HTTP",
      kicker: "NET · 05",
      summary:
        "DNS 递归/迭代、HTTP 持久/非持久、TCP 握手次数，是时延题的三块积木。先写“每个 RTT 发生了什么”。",
      formula:
        "非持久 HTTP：每个对象 1 RTT 建连 + 1 RTT 请求/响应\n持久 HTTP：复用连接，省掉后续对象建连 RTT\nDNS 递归查询：客户端 1 个 RTT 交给本地 DNS，本地 DNS 再迭代",
      traps: [
        "DNS 的递归/迭代是看“谁替谁跑腿”，不是看查询报文的方向。",
        "HTTP/1.1 默认持久连接，但非流水线时请求仍逐个往返。",
        "TLS 握手是额外 RTT，题目只写 HTTP 时不要自行加。"
      ],
      links: [{ href: "network.html#n3", label: "N3 DNS 与 HTTP 时延" }]
    },
    "net-switch": {
      subject: "计算机网络",
      title: "交换机与 VLAN",
      kicker: "NET · 06",
      summary:
        "交换机的自学习表、泛洪、过滤、VLAN 标签是链路层大题的常见组合。先标出冲突域和广播域。",
      formula:
        "冲突域：每个交换机端口一个（全双工下不冲突）\n广播域：一个 VLAN 一个\nTrunk 链路承载多个 VLAN，需要 802.1Q 标签",
      traps: [
        "交换机不改变帧的源/目的 MAC，只做转发/过滤/泛洪。",
        "路由器每个接口隔离广播域；交换机默认所有端口在同一广播域。",
        "VLAN 间通信需要路由器或三层交换机。"
      ],
      links: [{ href: "network.html#n4", label: "N4 交换机转发与 VLAN" }]
    },
    "os-process": {
      subject: "操作系统",
      title: "进程与线程",
      kicker: "OS · 01",
      summary:
        "PCB、上下文切换、进程状态、线程共享资源，是调度和同步题的背景。先明确“谁拥有什么”。",
      formula:
        "进程 = 代码段 + 数据段 + 堆 + 栈 + PCB\n线程共享：地址空间、打开文件、全局变量\n线程私有：寄存器、栈、程序计数器",
      traps: [
        "线程切换不一定切换地址空间；进程切换通常要换页表。",
        "就绪态不是运行态；缺页阻塞是“阻塞态”，不是就绪态。",
        "僵尸进程是已终止但 PCB 未回收，不是还在运行。"
      ],
      links: [{ href: "os.html#o2", label: "O2 调度与上下文切换" }]
    },
    "os-schedule": {
      subject: "操作系统",
      title: "调度与上下文切换",
      kicker: "OS · 02",
      summary:
        "先画甘特图，再算周转时间、等待时间、响应时间。抢占式调度一定要在每个到达时刻检查是否切换。",
      formula:
        "周转时间 = 完成时间 - 到达时间\n等待时间 = 周转时间 - 服务时间\n带权周转时间 = 周转时间 ÷ 服务时间\nCPU 利用率 = 忙碌时间 ÷ 总时间",
      traps: [
        "FCFS 对短作业不利；SJF 平均等待时间最优，但可能饿死长作业。",
        "RR 的时间片过大退化为 FCFS，过小则上下文切换开销上升。",
        "优先级数字大小要先看题目定义：有的题“越小越高”，有的相反。"
      ],
      links: [{ href: "os.html#o2", label: "O2 四种调度算法" }]
    },
    "os-sync": {
      subject: "操作系统",
      title: "同步与死锁",
      kicker: "OS · 03",
      summary:
        "PV 题先写信号量含义和初值，再写代码，最后检查互斥、同步、死锁、饥饿四件事。",
      formula:
        "互斥信号量初值通常为 1\n同步信号量初值看“初始可用资源数”\n死锁四个必要条件：互斥、占有并等待、不可剥夺、循环等待",
      traps: [
        "P 操作顺序不当会死锁；V 操作顺序通常不影响正确性，但影响唤醒语义。",
        "互斥锁保护的是临界区，不是整个进程。",
        "信号量可以为负，绝对值表示等待进程数。"
      ],
      links: [{ href: "os.html#o3", label: "O3 生产者-消费者 PV" }]
    },
    "os-vm": {
      subject: "操作系统",
      title: "虚拟内存",
      kicker: "OS · 04",
      summary:
        "先拆虚拟地址，再查 TLB/页表，最后算 EAT。多级页表题的关键是“用了哪些页表页”，不是地址空间有多大。",
      formula:
        "虚拟地址 = 页目录索引 + 页表索引 + 页内偏移\n页表项数 = 2^虚拟页号位数\n多级页表大小 = 用到的页表页数 × 每页大小\nEAT = 命中率 × 命中时间 + 缺失率 × 缺失代价",
      traps: [
        "页表项大小由物理页号和标志位决定，不等于页大小。",
        "TLB 命中不访问页表，但仍要访问数据所在的主存（除非 Cache 命中）。",
        "缺页率是“访问中发生缺页的比例”，不是“页面被换出的比例”。"
      ],
      links: [
        { href: "os.html#o1", label: "O1 页表、TLB 与 EAT" },
        { href: "coa.html#c1", label: "C1 Cache 与存储层次" }
      ]
    },
    "os-file": {
      subject: "操作系统",
      title: "文件系统",
      kicker: "OS · 05",
      summary:
        "inode 混合索引、FAT、目录、空闲空间管理。先算“数据块 + 索引块”，再算一次读文件要几次磁盘访问。",
      formula:
        "直接块：n × 块大小\n一级间接：指针数 × 块大小\n二级间接：指针数² × 块大小\n最大文件 = 直接 + 一级 + 二级 + 三级",
      traps: [
        "索引块本身也占磁盘块，计算“文件占多少块”时不要漏掉。",
        "读一个数据块可能要读 inode、一级索引、二级索引、数据块，题问“磁盘访问次数”要逐层数。",
        "FAT 的每个表项对应一个簇，FAT 表大小 = 簇数 × 表项大小。"
      ],
      links: [{ href: "os.html#o4", label: "O4 inode 与磁盘调度" }]
    },
    "os-io": {
      subject: "操作系统",
      title: "I/O 管理与磁盘调度",
      kicker: "OS · 06",
      summary:
        "I/O 软件层次、缓冲区、SPOOLing、磁盘调度。SCAN 像电梯，SSTF 选最近但可能饿死远端请求。",
      formula:
        "磁盘访问时间 = 寻道 + 旋转 + 传输\nFCFS / SSTF / SCAN / C-SCAN / LOOK\n缓冲区：单缓冲、双缓冲、循环缓冲",
      traps: [
        "SSTF 平均寻道时间短，但不保证公平，可能 starvation。",
        "SCAN 到端点才反向；LOOK 到最远请求就反向，题目要看清。",
        "设备独立性由逻辑 I/O 层提供，不是设备驱动层。"
      ],
      links: [
        { href: "os.html#o4", label: "O4 磁盘调度" },
        { href: "coa.html#c4", label: "C4 DMA 与磁盘" }
      ]
    }
  };

  var drawer = document.getElementById("concept-drawer");
  var backdrop = document.querySelector("[data-drawer-backdrop]");
  var drawerBody = drawer ? drawer.querySelector("[data-drawer-body]") : null;
  var drawerKicker = drawer ? drawer.querySelector("[data-drawer-kicker]") : null;
  var drawerTitle = drawer ? drawer.querySelector("[data-drawer-title]") : null;
  var lastFocus = null;

  function conceptMarkup(node) {
    var links = node.links
      .map(function (item) {
        return (
          '<a href="' +
          item.href +
          '"><span>' +
          item.label +
          "</span><span>打开题目 →</span></a>"
        );
      })
      .join("");
    var traps = node.traps
      .map(function (trap) {
        return "<li>" + trap + "</li>";
      })
      .join("");
    return (
      '<h3>一句话定义</h3><p>' +
      node.summary +
      "</p>" +
      '<h3>必会公式 / 口径</h3><p class="drawer-formula">' +
      node.formula.replace(/\n/g, "<br>") +
      "</p>" +
      "<h3>易混点</h3><ul>" +
      traps +
      "</ul>" +
      '<h3>去做对应的大题</h3><div class="drawer-links">' +
      links +
      "</div>"
    );
  }

  function openConcept(id) {
    var node = concepts[id];
    if (!node || !drawer) return;
    lastFocus = document.activeElement;
    if (drawerKicker) drawerKicker.textContent = node.kicker + " · " + node.subject;
    if (drawerTitle) drawerTitle.textContent = node.title;
    if (drawerBody) drawerBody.innerHTML = conceptMarkup(node);
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    if (backdrop) backdrop.classList.add("is-open");
    document.body.classList.add("drawer-open");
    var close = drawer.querySelector(".drawer-close");
    if (close) close.focus({ preventScroll: true });

    document.querySelectorAll(".map-node").forEach(function (button) {
      button.classList.toggle(
        "is-active",
        button.getAttribute("data-open-node") === id
      );
    });

    try {
      history.replaceState(null, "", "#" + id);
    } catch (err) {
      /* file:// may restrict history */
    }
  }

  function closeConcept() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    if (backdrop) backdrop.classList.remove("is-open");
    document.body.classList.remove("drawer-open");
    document.querySelectorAll(".map-node").forEach(function (button) {
      button.classList.remove("is-active");
    });
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch (err) {
      /* ignore */
    }
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus({ preventScroll: true });
    }
  }

  document.querySelectorAll("[data-open-node]").forEach(function (button) {
    button.addEventListener("click", function () {
      openConcept(button.getAttribute("data-open-node"));
    });
  });

  if (drawer) {
    drawer.querySelectorAll(".drawer-close").forEach(function (button) {
      button.addEventListener("click", closeConcept);
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeConcept);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && drawer && drawer.classList.contains("is-open")) {
      closeConcept();
    }
  });

  if (drawer && location.hash) {
    var initial = location.hash.slice(1);
    if (concepts[initial]) {
      window.setTimeout(function () {
        openConcept(initial);
      }, 60);
    }
  }

  /* map filters: show one subject, or jump to bridges */
  document.querySelectorAll("[data-map-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-map-filter");
      document.querySelectorAll("[data-map-filter]").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      document.querySelectorAll(".map-column").forEach(function (column) {
        var subject = column.getAttribute("data-subject");
        column.hidden = filter !== "all" && filter !== "bridge" && filter !== subject;
      });
      if (filter === "bridge") {
        var bridge = document.getElementById("bridges");
        if (bridge) bridge.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
