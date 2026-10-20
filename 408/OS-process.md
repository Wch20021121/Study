## 1
```
题目1：基本互斥与同步

系统中有共享变量 X。进程 PA 和 PB 都要对 X 进行修改，要求：

任一时刻只允许一个进程修改 X；
进程 PC 必须在 PA 完成一次修改之后才能执行。
请用 P、V 操作实现 PA、PB、PC 的同步与互斥。
要求：写出信号量定义、初值，以及三个进程的伪代码。
```
```cpp
semaphore mutex = 1;
semaphore ac = 0;

PA(){
    while(1){
        P(mutex); //请求访问看看是否允许访问x
        //对X进行修改
        V(ac); //PA修改过了，PC可以修改了
        V(mutex);
    }
}

PB(){
    while(1){
        P(mutex); //请求访问看看是否允许访问x
        //对X进行修改
        V(mutex);
    }
}

PC(){
    while(1){
        P(ac); //看看是否PA访问过了，先看看是否有同步，如果先互斥会导致死锁
        P(mutex); //请求访问看看是否允许访问x
        //修改X
        V(ac);
        V(mutex);
    }
}
//思考，我在想PC的两个P和V是否可以交换位置，感觉就算交换也不会影响
```

## 2
```
有进程 P1 ~ P5，它们的前驱关系如下：

P1 → P2
P1 → P3
P2 → P4
P3 → P4
P4 → P5
请用 P、V 操作实现这些前驱关系。
要求：写出信号量定义、初值，以及各进程的伪代码。
```
```cpp
semaphore x12 = 0;
semaphore x13 = 0;
semaphore x24 = 0;
semaphore x34 = 0;
semaphore x45 = 0;

P1(){
    while(1){
        //执行操作
        V(x12);
        V(x13);
    }
}

P2(){
    while(1){
        //判断P1是否做了
        P(x12);
        //执行操作
        V(x24);
    }
}

P3(){
    while(1){
        P(x13); 
        //执行操作
        V(x34);
    }
}

P4(){
    while(1){
        P(x24);
        P(x34);
        //执行操作
        V(x45);
    }
}

P5(){
    while(1){
        P(x45);
        //执行操作
    }
}
```

## 3
```
有一个缓冲区，大小为 n。系统中存在多个生产者进程和多个消费者进程。

生产者每次向缓冲区放入一个产品；
消费者每次从缓冲区取出一个产品；
缓冲区满时，生产者必须等待；
缓冲区空时，消费者必须等待；
对缓冲区的访问必须互斥。
请用 P、V 操作实现生产者进程和消费者进程。
要求：写出信号量定义、初值，以及生产者和消费者伪代码。

```
```cpp
semaphore empty = n;
semaphore full = 0;
semaphore mutex = 1;

Producer(){
    while(1){
        P(empty); //如果先进入，那么就没办法中断就没法消费了
        P(mutex);
        //生产资源
        V(mutex);
        V(full);
    }
}

Consumer(){
    while(1){
        P(full);
        P(mutex);
        //写资源
        V(mutex);
        V(empty);
    }
}
```

## 4
```
多个读者和多个写者共享一个文件。

允许多个读者同时读文件；
写者写文件时，不允许其他读者或写者访问；
采用“读者优先”策略：只要已有读者在读，后续读者可以继续进入，写者等待。
请用 P、V 操作实现读者进程和写者进程。
要求：写出信号量定义、初值，共享变量初值，以及读者、写者伪代码。
```

```cpp
semaphore write = 1;      // 写者与读者/写者之间的互斥
semaphore mutex = 1;      // 保护 readersCount 的互斥锁
int readersCount = 0;     // 当前读者数量

Reader() {
    while (1) {
        P(mutex);
        if (readersCount == 0) {
            P(write);     // 第一个读者锁住写者
        }
        readersCount++;
        V(mutex);

        // 读文件

        P(mutex);
        readersCount--;
        if (readersCount == 0) {
            V(write);     // 最后一个读者释放写者
        }
        V(mutex);
    }
}

Writer() {
    while (1) {
        P(write);
        // 写文件
        V(write);
    }
}
```

## 5
```
有 5 个哲学家围坐在圆桌旁，每两个哲学家之间放一把叉子，共 5 把叉子。哲学家只有同时拿到左右两把叉子才能进餐，进餐结束后放下叉子。

请用 P、V 操作实现哲学家进餐过程，并要求给出一种避免死锁的策略。
要求：写出信号量定义、初值，哲学家伪代码，并简要说明为什么不会发生死锁。
```

```cpp
semaphore fork[5] = {1, 1, 1, 1, 1};
semaphore count = 4;   // 最多允许 4 人同时拿叉

Philosopher(int i) {
    while (1) {
        think();
        P(count);                     // 限制同时进餐人数
        P(fork[i]);                   // 拿左叉
        P(fork[(i+1)%5]);             // 拿右叉
        eat();
        V(fork[i]);                   // 放左叉
        V(fork[(i+1)%5]);             // 放右叉
        V(count);
    }
}
```

```cpp
semaphore fork[5] = {1, 1, 1, 1, 1};

Philosopher(int i) {
    while (1) {
        think();
        if (i % 2 == 0) {             // 偶数号先拿右叉
            P(fork[(i+1)%5]);
            P(fork[i]);
        } else {                       // 奇数号先拿左叉
            P(fork[i]);
            P(fork[(i+1)%5]);
        }
        eat();
        V(fork[i]);
        V(fork[(i+1)%5]);
    }
}
```

## 6
```
有一座独木桥，桥面很窄，每次只允许同一方向的人通过。
桥上一次最多能容纳 k 个人。现有两类行人：

东向行人：从东向西过桥；
西向行人：从西向东过桥。
规则如下：

同一方向的行人可以同时上桥，但桥上总人数不能超过 k；
当桥上有某一方向的人时，另一方向的人必须在桥头等待；
当桥上空无一人时，等待的另一方向的人才能上桥；
每个行人过桥结束后下桥，释放桥面容量。
请用 P、V 操作实现东向行人和西向行人的过桥过程。

要求：

写出信号量定义及初值；
写出共享变量定义及初值；
写出东向行人、西向行人的伪代码；
简要说明为什么不会发生死锁。
```

```cpp
semaphore mutex = 1;      // 保护 epeople 和 wpeople 的互斥锁
semaphore empty = k;      // 桥上空余容量，初值为 k
semaphore bridge = 1;     // 方向锁，初值为 1，表示桥当前允许某个方向使用
int epeople = 0;          // 东向在桥人数，初值 0
int wpeople = 0;          // 西向在桥人数，初值 0

EastToWest() {
    while (1) {
        P(mutex);
        if (epeople == 0) {
            P(bridge);    // 第一个东向行人，锁住桥，阻止西向
        }
        epeople++;
        V(mutex);

        P(empty);         // 申请桥容量，若桥满则等待
        // 上桥，过桥
        V(empty);         // 下桥，释放容量

        P(mutex);
        epeople--;
        if (epeople == 0) {
            V(bridge);    // 最后一个东向行人，释放桥，允许西向
        }
        V(mutex);
    }
}

WestToEast() {
    while (1) {
        P(mutex);
        if (wpeople == 0) {
            P(bridge);    // 第一个西向行人，锁住桥，阻止东向
        }
        wpeople++;
        V(mutex);

        P(empty);         // 申请桥容量
        // 上桥，过桥
        V(empty);         // 下桥，释放容量

        P(mutex);
        wpeople--;
        if (wpeople == 0) {
            V(bridge);    // 最后一个西向行人，释放桥，允许东向
        }
        V(mutex);
    }
}
```

## 7
```
系统中有三个进程 P1、P2、P3，它们构成一条流水线：

P1 不断产生数据，放入缓冲区 B1；
P2 从 B1 取出数据，加工后放入缓冲区 B2；
P3 从 B2 取出数据，并输出结果。
已知：

缓冲区 B1 的容量为 n；
缓冲区 B2 的容量为 m；
B1 满时，P1 必须等待；B1 空时，P2 必须等待；
B2 满时，P2 必须等待；B2 空时，P3 必须等待；
对 B1 和 B2 的访问必须分别互斥。
请用 P、V 操作实现 P1、P2、P3 三个进程。

要求：

写出所有信号量的定义及初值；
写出 P1、P2、P3 的伪代码；
简要说明你的 P、V 顺序为什么不会导致死锁。
```

```analyze
3个角色（3个函数），两个缓冲区（不能同时读写，两个mutex）
缓冲区 B1 的容量为 n； 缓冲区 B2 的容量为 m； （两个表示容量的semaphore）
B1 满时，P1 必须等待；B1 空时，P2 必须等待；B2 满时，P2 必须等待；B2 空时，P3 必须等待；(这个是消费者，必须有semaphore去存储生产好的数据)
```

```cpp
semaphore b1mutex = 1;
semaphore b2mutex = 1;
semaphore b1empty = n;
semaphore b2empty = m;
semaphore b1full = 0;
semaphore b2full = 0;

P1(){
    P(b1empty);
    P(b1mutex);
    //写入
    V(b1full);
    V(b1mutex);
}

P2(){
    P(b1full);
    P(b1mutex);
    //取出数据，加工
    V(b1empty);
    V(b1mutex);
    
    P(b2empty);
    P(b2mutex);
    //写入数据
    V(b2full);
    V(b2mutex);
}

P3(){
    P(b2full);
    P(b2mutex);
    //消费
    V(b2empty);
    V(b2mutex);
}
```