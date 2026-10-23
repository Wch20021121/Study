# -*- coding: utf-8 -*-
"""2021 考研英语一 · Section II Part B 新题型（7 选 5）。"""

PARTB = {
    "id": "partb",
    "kicker": "Section II · Part B",
    "title": "新题型 · 7 选 5",
    "en_title": "AI at work: seven sentences, five gaps",
    "cn_title": "人工智能如何帮助公司而不取代员工",
    "score": 10,
    "suggest": "15–18 分钟",
    "topic": "人工智能在招聘、营销、保险、审计和基础设施维护中的应用",
    "directions": (
        "In the following text, some sentences have been removed. For Questions 41–45, choose the most suitable "
        "one from the list A–G to fit into each of the numbered blanks. There are two extra choices, which do not "
        "fit in any of the blanks. Mark your answers on the ANSWER SHEET. (10 points)"
    ),
    "intro": (
        "7 选 5 不是“把句子读顺”那么简单，而是做“衔接证据”匹配。每个空看三件事："
        "空前一句的关键词、空后一句的指代/转折、以及该段小标题的功能。两个多余选项通常在主题或逻辑上"
        "与某个空相近，必须用代词、复现词或段内功能排除。"
    ),
    "blocks": [
        {
            "type": "para",
            "en": (
                "In the movies and on television, artificial intelligence is typically depicted as something sinister "
                "that will upend our way of life. When it comes to AI in business, we often hear about it in relation "
                "to automation and the impending loss of jobs, but in what ways is AI changing companies and the "
                "larger economy that don't involve doom-and-gloom mass unemployment predictions?"
            ),
            "zh": (
                "在电影和电视中，人工智能通常被描绘成某种邪恶的东西，将颠覆我们的生活方式。谈到商业中的人工智能，"
                "我们经常听到它与自动化和即将到来的失业有关，但人工智能正在以哪些不涉及悲观的大规模失业预测的方式"
                "改变公司和更大的经济呢？"
            ),
        },
        {
            "type": "para",
            "en": (
                "A recent survey of manufacturing and service industries from Tata Consultancy Services found that "
                "companies currently use AI more often in computer-to-computer activities than in automating human "
                "activities. Here are a few ways AI is aiding companies without replacing employees:"
            ),
            "zh": (
                "塔塔咨询服务公司最近对制造业和服务业进行的一项调查发现，目前公司在计算机对计算机的活动中使用"
                "人工智能的频率高于在自动化人类活动中的使用。以下是人工智能在不替代员工的情况下帮助公司的几种方式："
            ),
        },
        {"type": "heading", "en": "Better hiring practices", "zh": "更好的招聘方式"},
        {
            "type": "para",
            "en": (
                "Companies are using artificial intelligence to remove some of the unconscious bias from hiring "
                "decisions. \"There are experiments that show that, naturally, the results of interviews are much more "
                "biased than what AI does,\" says Pedro Domingos, author of The Master Algorithm: How the Quest for "
                "the Ultimate Learning Machine Will Remake Our World and a computer science professor at the "
                "University of Washington. \"{{41}}\" One company that's doing this is called Blendoor. It uses "
                "analytics to help identify where there may be bias in the hiring process."
            ),
            "zh": (
                "公司正在使用人工智能来消除招聘决策中的一些无意识偏见。佩德罗·多明戈斯说：“有实验表明，自然情况下，"
                "面试结果比人工智能的结果偏见大得多。”他是《主算法：终极学习机器的探索将如何重塑我们的世界》一书的"
                "作者，也是华盛顿大学计算机科学教授。“{{41}}”一家这样做的公司叫 Blendoor。它使用分析技术帮助识别"
                "招聘过程中可能存在偏见的地方。"
            ),
        },
        {"type": "heading", "en": "More effective marketing", "zh": "更有效的营销"},
        {
            "type": "para",
            "en": (
                "Some AI software can analyze and optimize marketing email subject lines to increase open rates. One "
                "company in the UK, Phrasee, claims their software can outperform humans by up to 10 percent when it "
                "comes to email open rates. This can mean millions more in revenue. {{42}} These are \"tools that help "
                "people use data, not a replacement for people,\" says Patrick H. Winston, a professor of artificial "
                "intelligence and computer science at MIT."
            ),
            "zh": (
                "一些人工智能软件可以分析和优化营销电子邮件的主题行，以提高打开率。英国一家公司 Phrasee 声称，在"
                "电子邮件打开率方面，其软件比人类高出 10%。这可能意味着数百万美元的收入。{{42}}这些是“帮助人们"
                "使用数据、而不是取代人的工具”，麻省理工学院人工智能和计算机科学教授帕特里克·H·温斯顿说。"
            ),
        },
        {"type": "heading", "en": "Saving customers money", "zh": "帮客户省钱"},
        {
            "type": "para",
            "en": (
                "Energy companies can use AI to help customers reduce their electricity bills, saving them money while "
                "helping the environment. Companies can also optimize their own energy use and cut down on the cost of "
                "electricity. Insurance companies, meanwhile, can base their premiums on AI models that more accurately "
                "assess risk. Domingos says, \"Before, they might not insure the ones who felt like a high risk or "
                "charge them too much,\" {{43}}"
            ),
            "zh": (
                "能源公司可以使用人工智能帮助客户减少电费，既省钱又环保。公司还可以优化自身能源使用，降低电力成本。"
                "与此同时，保险公司可以根据人工智能模型更准确地评估风险来确定保费。多明戈斯说：“以前，他们可能不给"
                "那些看起来风险高的人投保，或者收费过高，”{{43}}"
            ),
        },
        {"type": "heading", "en": "Improved accuracy", "zh": "提高准确性"},
        {
            "type": "para",
            "en": (
                "\"Machine learning often provides a more reliable form of statistics, which makes data more valuable,\" "
                "says Winston. It \"helps people make smarter decisions.\" {{44}}"
            ),
            "zh": (
                "温斯顿说：“机器学习通常提供更可靠的统计数据形式，使数据更有价值。”它“帮助人们做出更明智的决定”。"
                "{{44}}"
            ),
        },
        {"type": "heading", "en": "Protecting and maintaining infrastructure", "zh": "保护和维护基础设施"},
        {
            "type": "para",
            "en": (
                "A number of companies, particularly in energy and transportation, use AI image processing technology "
                "to inspect infrastructure and prevent equipment failure or leaks before they happen. \"If they fail "
                "first and then you fix them, it's very expensive,\" says Domingos. \"{{45}}\""
            ),
            "zh": (
                "许多公司，尤其是能源和运输领域的公司，使用人工智能图像处理技术检查基础设施，在设备故障或泄漏发生前"
                "加以预防。多明戈斯说：“如果它们先坏了，你再去修，那非常昂贵。”{{45}}"
            ),
        },
    ],
    "options": {
        "A": {
            "en": (
                "AI replaces the boring parts of your job. If you're doing research, you can have AI go out and look "
                "for relevant sources and information that otherwise you just wouldn't have time for."
            ),
            "zh": "人工智能替代你工作中枯燥的部分。如果你在做研究，可以让人工智能去寻找相关来源和信息，否则你根本没有时间。",
        },
        "B": {
            "en": (
                "One accounting firm, EY, uses an AI system that helps review contracts during an audit. This process, "
                "along with employees reviewing the contracts, is faster and more accurate."
            ),
            "zh": "一家会计师事务所安永使用人工智能系统，在审计期间帮助审查合同。这个过程与员工审查合同相结合，更快、更准确。",
        },
        "C": {
            "en": (
                "There are also companies like Acquisio, which analyzes advertising performance across multiple "
                "channels like Adwords, Bing and social media and makes adjustments or suggestions about where "
                "advertising funds will yield best results."
            ),
            "zh": (
                "还有像 Acquisio 这样的公司，它分析 Adwords、Bing 和社交媒体等多个渠道的广告表现，并就广告资金"
                "在哪里产生最佳效果做出调整或建议。"
            ),
        },
        "D": {
            "en": (
                "You want to predict if something needs attention now and point to where it's useful for employees "
                "to go to."
            ),
            "zh": "你想预测某件事现在是否需要关注，并指出员工去哪里处理会有用。",
        },
        "E": {
            "en": (
                "Before, they might not insure the ones who felt like a high risk or charge them too much, or they "
                "would charge them too little and then it would cost the company money."
            ),
            "zh": (
                "以前，他们可能不给那些看起来风险高的人投保，或者收费过高，或者收费过低，然后让公司赔钱。"
            ),
        },
        "F": {
            "en": (
                "We're also giving our customers better channels versus picking up the phone to accomplish something "
                "beyond human scale."
            ),
            "zh": "我们也在给客户提供更好的渠道，而不是打电话来完成超出人力规模的事情。",
        },
        "G": {
            "en": (
                "AI looks at résumés in greater numbers than humans would be able to, and selects the more promising "
                "candidates."
            ),
            "zh": "人工智能查看简历的数量比人类能看的多得多，并筛选出更有前途的候选人。",
        },
    },
    "answers": [
        {
            "n": 41, "answer": "G",
            "explain": (
                "本段主题是“更好的招聘”。空前说人工智能能减少面试偏见，空后立刻介绍 Blendoor 用分析技术识别"
                "招聘偏见。G 讲 AI 看简历、筛选候选人，正好补上“AI 在招聘中具体做什么”，并与下句的 this 形成衔接。"
            ),
            "clue": "hiring decisions → résumés → candidates → Blendoor",
        },
        {
            "n": 42, "answer": "C",
            "explain": (
                "本段主题是“更有效的营销”。空前讲邮件主题行和打开率，空后说“这些是帮助人们使用数据的工具”。"
                "C 中的 Acquisio 分析多个广告渠道并给出投放建议，正是营销场景的另一个例子；these 指代 C 中的"
                "分析工具。"
            ),
            "clue": "marketing / advertising → channels → yield best results → These are tools",
        },
        {
            "n": 43, "answer": "E",
            "explain": (
                "空前是保险语境：AI 模型更准确地评估风险；多明戈斯引用“以前他们可能不给高风险者投保，或收费过高”，"
                "E 用 or 接着说“或者收费过低，然后让公司赔钱”，共同构成 before 的完整对比。"
            ),
            "clue": "insurance → premiums → assess risk → Before... charge too much / too little",
        },
        {
            "n": 44, "answer": "B",
            "explain": (
                "本段主题是“提高准确性”。空前说机器学习让数据更有价值、帮助人们做更明智的决定；B 举安永用 AI "
                "审查合同的例子，并明确说“faster and more accurate”，与段旨形成例证关系。"
            ),
            "clue": "accuracy → more reliable statistics → smarter decisions → faster and more accurate",
        },
        {
            "n": 45, "answer": "D",
            "explain": (
                "本段讲用 AI 图像处理检查基础设施，在故障发生前预防。空前说“坏了再修很贵”，D 说“你想预测某件事"
                "现在是否需要关注，并指出员工去哪里处理”，正好是预测性维护的操作逻辑。"
            ),
            "clue": "prevent failure or leaks before they happen → predict → needs attention now",
        },
    ],
    "extra_note": (
        "多余选项 A 和 F 的排除：A 说“AI 替代你工作中枯燥的部分”，与全文反复强调的“without replacing employees”"
        "方向相反；F 说“给客户更好的渠道，而不是打电话”，没有出现在任何一个空的上下文语义链中，且 beyond human "
        "scale 太泛，无法与具体段落主题咬合。"
    ),
}
