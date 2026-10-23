# -*- coding: utf-8 -*-
"""2021 考研英语一 · Section I 完形填空。"""

CLOZE = {
    "id": "cloze",
    "kicker": "Section I",
    "title": "完形填空",
    "en_title": "Use of English",
    "score": 10,
    "suggest": "15–18 分钟",
    "topic": "流体智力与腹部脂肪",
    "directions": (
        "Read the following text. Choose the best word(s) for each numbered blank "
        "and mark A, B, C or D on the ANSWER SHEET. (10 points)"
    ),
    "intro": (
        "这篇文章的逻辑很“科研”：先提出流体智力会随年龄下降，再介绍一项把肌肉、腹部脂肪"
        "与认知变化联系起来的研究，最后给出可操作的生活方式建议。做完形时，先抓这一条主线，"
        "再逐空判断词义和搭配。"
    ),
    "passage": [
        {
            "en": (
                "Fluid intelligence is the type of intelligence that has to do with short-term memory "
                "and the ability to think quickly, logically, and abstractly in order to solve new problems. "
                "It {{1}} in young adulthood, levels out for a period of time, and then {{2}} starts to "
                "slowly decline as we age. But {{3}} aging is inevitable, scientists are finding out that "
                "certain changes in brain function may not be."
            ),
            "zh": (
                "流体智力是一种与短时记忆以及快速、逻辑、抽象地思考以解决新问题的能力有关的智力。"
                "它在成年早期达到顶峰，随后在一段时间内保持平稳，然后通常随着年龄增长开始缓慢下降。"
                "但是，尽管衰老不可避免，科学家们正发现，大脑功能的某些变化也许并非不可避免。"
            ),
        },
        {
            "en": (
                "One study found that muscle loss and the {{4}} of body fat around the abdomen are "
                "associated with a decline in fluid intelligence. This suggests the {{5}} that lifestyle "
                "factors might help prevent or {{6}} this type of decline."
            ),
            "zh": (
                "一项研究发现，肌肉流失和腹部脂肪的堆积与流体智力下降有关。这表明了一种可能性："
                "生活方式因素也许有助于防止或延缓这类衰退。"
            ),
        },
        {
            "en": (
                "The researchers looked at data that {{7}} measurements of lean muscle and abdominal fat "
                "from more than 4,000 middle-to-older-aged men and women and {{8}} that data to reported "
                "changes in fluid intelligence over a six-year period. They found that middle-aged people "
                "{{9}} higher measures of abdominal fat {{10}} worse on measures of fluid intelligence as "
                "the years {{11}}."
            ),
            "zh": (
                "研究人员查看了包含 4,000 多名中老年男女瘦肌肉和腹部脂肪测量数据的数据集，并将这些数据"
                "与六年期间报告的流体智力变化进行了比较。他们发现，腹部脂肪指标较高的中年人在岁月流逝中，"
                "流体智力测试的表现更差。"
            ),
        },
        {
            "en": (
                "For women, the association may be {{12}} to changes in immunity that resulted from excess "
                "abdominal fat; in men, the immune system did not appear to be {{13}}. It is hoped that future "
                "studies could {{14}} these differences and perhaps lead to different {{15}} for men and women."
            ),
            "zh": (
                "对女性而言，这种关联或许可归因于腹部脂肪过多所导致的免疫变化；对男性而言，免疫系统"
                "似乎并未参与其中。人们希望未来的研究能够解释这些差异，并可能为男性和女性带来不同的治疗方法。"
            ),
        },
        {
            "en": (
                "{{16}} there are steps you can {{17}} to help reduce abdominal fat and maintain lean muscle "
                "mass as you age in order to protect both your physical and mental {{18}}. The two highly "
                "recommended lifestyle approaches are maintaining or increasing your {{19}} of aerobic exercise "
                "and following a Mediterranean-style {{20}} that is high in fiber and eliminates highly processed foods."
            ),
            "zh": (
                "与此同时，你可以采取一些措施，帮助减少腹部脂肪，并在衰老过程中保持瘦肌肉量，从而保护身心"
                "健康。两种备受推崇的生活方式是：保持或增加有氧运动的量，以及遵循富含纤维、排除高度加工食品的"
                "地中海式饮食。"
            ),
        },
    ],
    "questions": [
        {
            "n": 1, "answer": "C",
            "options": ["pauses", "returns", "peaks", "fades"],
            "cn": ["暂停", "返回", "达到顶峰", "衰退"],
            "explain": (
                "主语 It 指 fluid intelligence。后半句说“保持平稳，然后开始下降”，所以空缺处应是下降之前的最高点。"
                "peak 作动词表示“达到顶峰”，与 levels out, decline 构成完整的时间线。"
            ),
            "trap": "fades 也有“衰退”之意，但会与后面的 decline 语义重复，而且顺序不对。",
            "type": "语义线索 · 时间线",
        },
        {
            "n": 2, "answer": "D",
            "options": ["alternatively", "formally", "accidentally", "generally"],
            "cn": ["或者", "正式地", "偶然地", "通常"],
            "explain": (
                "这里修饰 starts to decline，说的是一个普遍规律：流体智力通常随着年龄增长而下降。"
                "generally 表示“通常、大体上”，符合科研结论的概括语气。"
            ),
            "trap": "不要因为句中有 and then 就误选表示“替代”的 alternatively；这里不是二选一。",
            "type": "副词 · 语气",
        },
        {
            "n": 3, "answer": "A",
            "options": ["while", "since", "once", "until"],
            "cn": ["虽然；当……时", "既然；自从", "一旦", "直到"],
            "explain": (
                "前半句“衰老不可避免”与后半句“某些大脑变化也许并非不可避免”构成让步转折。"
                "while 在此相当于 although，引导让步状语从句。"
            ),
            "trap": "since 表原因时逻辑也通，但语义会变成“既然衰老不可避免，所以科学家发现……”，"
                     "与后文“may not be”形成的对比不如 while 精确。",
            "type": "逻辑关系 · 让步",
        },
        {
            "n": 4, "answer": "B",
            "options": ["detection", "accumulation", "consumption", "separation"],
            "cn": ["检测", "积累", "消耗", "分离"],
            "explain": (
                "与 muscle loss 并列的是“腹部周围脂肪的____”。accumulation of body fat 是固定搭配，"
                "表示脂肪的堆积；后文 excess abdominal fat 也在复现这一含义。"
            ),
            "trap": "consumption 是“消耗”，与脂肪堆积导致健康风险的语境相反。",
            "type": "名词搭配 · 同义复现",
        },
        {
            "n": 5, "answer": "A",
            "options": ["possibility", "decision", "goal", "requirement"],
            "cn": ["可能性", "决定", "目标", "要求"],
            "explain": (
                "This suggests the ____ that... 中的 that 从句解释前面内容，表示研究“提示了一种可能性”："
                "生活方式因素也许能预防或延缓衰退。suggest the possibility that 是常见搭配。"
            ),
            "trap": "decision/goal/requirement 都太确定；原文用的是 might，语气是推测。",
            "type": "同位语从句 · 语气",
        },
        {
            "n": 6, "answer": "A",
            "options": ["delay", "ensure", "seek", "utilize"],
            "cn": ["延缓", "确保", "寻求", "利用"],
            "explain": (
                "prevent or ____ this type of decline：与 prevent（防止）并列，delay（延缓）最自然。"
                "整句意思是“防止或延缓这类衰退”。"
            ),
            "trap": "ensure 后不能直接接 decline 表示“确保衰退”；seek 和 utilize 与 decline 搭配不通。",
            "type": "动词搭配 · 并列结构",
        },
        {
            "n": 7, "answer": "C",
            "options": ["modified", "supported", "included", "predicted"],
            "cn": ["修改", "支持", "包含", "预测"],
            "explain": (
                "data that ____ measurements... 是定语从句，说明这份数据“包含”瘦肌肉和腹部脂肪的测量值。"
                "include 表示整体包含部分，符合 data 与 measurements 的关系。"
            ),
            "trap": "supported 需要“数据支持测量”这种不合逻辑的关系；predicted 时态和语义都不对。",
            "type": "定语从句 · 动词辨析",
        },
        {
            "n": 8,"answer": "B",
            "options": ["devoted", "compared", "converted", "applied"],
            "cn": ["致力于", "比较", "转换", "应用"],
            "explain": (
                "compared that data to reported changes 是固定搭配 compare A to B，表示“把 A 与 B 比较”。"
                "研究人员要把脂肪、肌肉数据与认知变化对照起来。"
            ),
            "trap": "apply...to... 是“把……应用于”，不能表示“与……比较”。",
            "type": "动词搭配 · 科研动作",
        },
        {
            "n": 9,"answer": "A",
            "options": ["with", "above", "by", "against"],
            "cn": ["具有", "在……上方", "通过", "反对"],
            "explain": (
                "people ____ higher measures of abdominal fat 是“腹部脂肪指标较高的人”。"
                "with 表示“具有、带有”，修饰 people。"
            ),
            "trap": "above 是方位介词，不能直接说 people above higher measures。",
            "type": "介词 · 后置定语",
        },
        {
            "n": 10,"answer": "C",
            "options": ["lived", "managed", "scored", "played"],
            "cn": ["生活", "管理", "得分", "玩"],
            "explain": (
                "scored worse on measures of fluid intelligence 表示“在流体智力测试中得分更差”。"
                "score 与 on a test/measure 搭配，是测试语境的常用动词。"
            ),
            "trap": "live/manage/play 都不能与 worse on measures 构成“得分更差”的意思。",
            "type": "动词搭配 · 测试语境",
        },
        {
            "n": 11,"answer": "D",
            "options": ["ran out", "set off", "drew in", "went by"],
            "cn": ["用完", "出发", "吸引", "流逝"],
            "explain": (
                "as the years ____ 表示“随着岁月流逝”。go by 是“（时间）过去、流逝”的固定表达。"
            ),
            "trap": "run out 是“用完”，主语通常是物；set off 是“出发”，drew in 是“吸引/驶入”。",
            "type": "短语动词 · 时间",
        },
        {
            "n": 12,"answer": "B",
            "options": ["superior", "attributable", "parallel", "resistant"],
            "cn": ["优于", "可归因于", "平行的", "抵抗的"],
            "explain": (
                "be attributable to 表示“可归因于”。女性身上的关联可能源于腹部脂肪过多造成的免疫变化；"
                "后文用分号对比男性，说明这是在解释原因。"
            ),
            "trap": "superior to 是“优于”，parallel to 是“与……平行”，resistant to 是“抵抗”，"
                     "都不能解释 association 的来源。",
            "type": "形容词搭配 · 因果",
        },
        {
            "n": 13,"answer": "C",
            "options": ["restored", "isolated", "involved", "controlled"],
            "cn": ["恢复", "隔离", "参与；有关", "控制"],
            "explain": (
                "the immune system did not appear to be involved 表示“免疫系统似乎没有参与其中”。"
                "be involved in 是“参与、与……有关”，与上句女性免疫变化形成对照。"
            ),
            "trap": "isolated 是“被隔离”，restored 是“被恢复”，controlled 是“被控制”，都不符合"
                     "“是否参与”的对比。",
            "type": "形容词 · 对比",
        },
        {
            "n": 14,"answer": "D",
            "options": ["alter", "spread", "remove", "explain"],
            "cn": ["改变", "传播", "移除", "解释"],
            "explain": (
                "future studies could ____ these differences：未来研究要“解释”这些性别差异。"
                "explain 与 differences 搭配自然，也符合科研目的。"
            ),
            "trap": "alter/remove differences 是“改变/消除差异”，语义过强；spread differences 搭配不成立。",
            "type": "动词辨析 · 科研目的",
        },
        {
            "n": 15,"answer": "D",
            "options": ["compensations", "symptoms", "demands", "treatments"],
            "cn": ["补偿", "症状", "需求", "治疗方法"],
            "explain": (
                "lead to different ____ for men and women：既然发现了男女机制不同，就可能带来不同的"
                "“治疗方法”。treatment for... 是固定搭配。"
            ),
            "trap": "symptoms 是“症状”，不是研究带来的结果；compensations/demands 与医疗语境不符。",
            "type": "名词搭配 · 医学语境",
        },
        {
            "n": 16,"answer": "B",
            "options": ["Likewise", "Meanwhile", "Therefore", "Instead"],
            "cn": ["同样地", "与此同时", "因此", "相反"],
            "explain": (
                "前面讲研究机制，这里转到“与此同时，你也能采取一些措施”，从科学发现过渡到生活建议。"
                "meanwhile 表示话题的并行推进。"
            ),
            "trap": "therefore 会变成“因此你可以采取措施”，但前后不是严格因果；instead 表示替代，逻辑不符。",
            "type": "逻辑连接 · 话题转换",
        },
        {
            "n": 17,"answer": "D",
            "options": ["change", "watch", "count", "take"],
            "cn": ["改变", "观看", "计数", "采取"],
            "explain": (
                "take steps to do sth 是固定搭配，表示“采取措施做某事”。steps 与 take 构成动宾关系。"
            ),
            "trap": "change steps 是“改变步骤”，watch/count steps 是“看/数步骤”，都不符合“采取措施”的意思。",
            "type": "固定搭配",
        },
        {
            "n": 18,"answer": "A",
            "options": ["well-being", "process", "formation", "coordination"],
            "cn": ["身心健康", "过程", "形成", "协调"],
            "explain": (
                "protect both your physical and mental ____：与 physical and mental 搭配的是 well-being，"
                "表示“身心健康”。"
            ),
            "trap": "physical and mental process 是“身心过程”，formation/coordination 也不能与"
                     "“保护”构成自然搭配。",
            "type": "名词搭配 · 并列",
        },
        {
            "n": 19,"answer": "A",
            "options": ["level", "love", "knowledge", "space"],
            "cn": ["水平；量", "热爱", "知识", "空间"],
            "explain": (
                "your ____ of aerobic exercise：level of exercise 表示“运动量/运动水平”。"
                "后文 maintaining or increasing 也提示这是一个可以“保持或增加”的量。"
            ),
            "trap": "love/knowledge/space 都不能与 increase 搭配表示“增加运动量”。",
            "type": "名词搭配 · 量",
        },
        {
            "n": 20,"answer": "C",
            "options": ["design", "routine", "diet", "prescription"],
            "cn": ["设计", "日常安排", "饮食", "处方"],
            "explain": (
                "Mediterranean-style ____ that is high in fiber and eliminates highly processed foods："
                "“富含纤维、排除高度加工食品”显然是在描述饮食，diet 最准确。"
            ),
            "trap": "routine 可以指“日常习惯”，但 high in fiber 是描述食物的，diet 更具体。",
            "type": "名词 · 语义场",
        },
    ],
}
