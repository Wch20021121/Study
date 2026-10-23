# -*- coding: utf-8 -*-
"""2021 考研英语一 · Section III 写作。"""

WRITING = {
    "id": "writing",
    "kicker": "Section III",
    "title": "写作",
    "en_title": "An email of advice & a picture essay",
    "cn_title": "建议信 + 图画作文",
    "score": 30,
    "suggest": "50–55 分钟",
    "topic": "给外国朋友的中国求职建议；传统戏曲与自信",
    "intro": (
        "小作文考“信息完整 + 语气得体”，大作文考“描述准确 + 寓意清楚 + 评论有层次”。"
        "不要一上来背万能模板；先把题目要求拆成 3 个动作，再为每个动作准备 2—3 个可替换表达。"
    ),
    "partA": {
        "title": "Part A · 建议信",
        "score": 10,
        "words": "约 100 词",
        "prompt": (
            "A foreign friend of yours has recently graduated from college and intends to find a job in China. "
            "Write him/her an email to make some suggestions. You should write about 100 words on the ANSWER SHEET. "
            "Do not sign your own name at the end. Use \"Li Ming\" instead. Do not write the address."
        ),
        "prompt_zh": (
            "你的一位外国朋友最近大学毕业，打算在中国找工作。给他/她写一封邮件，提出一些建议。"
            "约 100 词；结尾不要签自己的名字，用“Li Ming”；不要写地址。"
        ),
        "sample": (
            "Dear Alex,\n\n"
            "I'm delighted to hear that you've graduated and want to start your career in China. Here are a few "
            "suggestions that may help.\n\n"
            "First, choose a city where your field is growing, since local demand varies greatly. Second, adapt "
            "your CV to Chinese employers: keep it concise, include a recent photo if required, and highlight "
            "measurable results. Third, learn some basic workplace Chinese, which will make daily communication "
            "much easier. Finally, use reputable job platforms and check whether a company is legally registered "
            "before you apply.\n\n"
            "I'd be happy to introduce you to friends in your industry. Please let me know if you need any help.\n\n"
            "Best wishes,\n"
            "Li Ming"
        ),
        "sample_zh": (
            "亲爱的 Alex：\n\n"
            "很高兴听说你毕业了，并且想在中国开始职业生涯。以下几条建议或许有帮助。\n\n"
            "第一，选择你所在领域正在发展的城市，因为各地的用人需求差别很大。第二，按中国雇主的习惯调整简历："
            "保持简洁，必要时附上近期照片，并突出可量化的成果。第三，学一些基本的职场中文，这会让日常沟通容易"
            "很多。最后，使用信誉良好的求职平台，并在申请前核实公司是否合法注册。\n\n"
            "我很乐意把你介绍给行业内的朋友。如果需要帮助，请告诉我。\n\n"
            "祝好，\n"
            "李明"
        ),
        "structure": [
            ("称呼", "Dear Alex, / Dear Mr. Smith,"),
            ("开篇目的", "I'm delighted to hear that... Here are a few suggestions that may help."),
            ("主体建议", "First... Second... Third... Finally...；每条建议后补一句理由或结果。"),
            ("结尾期待", "I'd be happy to... Please let me know if you need any help."),
            ("落款", "Best wishes, / Yours sincerely, + Li Ming"),
        ],
        "expressions": [
            "I'm writing to offer you some practical advice on...",
            "It would be advisable for you to...",
            "You may find it helpful to...",
            "Another point worth considering is...",
            "I hope these suggestions will be of some help.",
        ],
        "traps": [
            "题目要求“不要写地址”，因此不要加地址和日期。",
            "结尾固定用 Li Ming，不能写自己的真实姓名。",
            "三条建议要具体，不要只写“learn Chinese”而不解释为什么/怎么做。",
        ],
    },
    "partB": {
        "title": "Part B · 图画作文",
        "score": 20,
        "words": "160–200 词",
        "prompt": (
            "Write an essay of 160–200 words based on the following picture. In your essay, you should 1) describe "
            "the picture briefly, 2) interpret its intended meaning, and 3) give your comments. You should write "
            "neatly on the ANSWER SHEET."
        ),
        "prompt_zh": (
            "根据所给图画写一篇 160—200 词的短文。要求：1）简要描述图画；2）解释其寓意；3）给出你的评论。"
        ),
        "picture": {
            "child": "爸爸，好多同学觉得学唱戏不好玩",
            "father": "你自己不是喜欢吗？那就够了",
            "caption": "2021 · 英语（一）Part B",
            "note": (
                "图中一位父亲与穿着戏曲服装、拿着道具的孩子对话。孩子担心同学觉得唱戏不好玩，父亲告诉他："
                "只要你自己喜欢就够了。寓意可以落在“自信”“尊重孩子的兴趣”“传统文化的传承”三个方向，"
                "写作时选一个主线，不要三个都浅尝辄止。"
            ),
        },
        "sample": (
            "The cartoon presents a conversation between a father and his son. Dressed in a traditional opera "
            "costume and holding a stage prop, the boy says unhappily, \"Dad, many of my classmates think learning "
            "Chinese opera is boring.\" The father replies gently, \"But you like it, don't you? That's enough.\"\n\n"
            "The drawing conveys a simple yet powerful message: one's genuine interest should not be silenced by "
            "others' opinions. In a world where popularity is often mistaken for value, young people may abandon "
            "what they truly love simply because it seems unfashionable. The father's response reminds us that "
            "confidence begins with self-acceptance. It also matters for traditional culture: if young people are "
            "encouraged to explore opera, calligraphy or folk music, these art forms will remain alive rather than "
            "becoming museum exhibits.\n\n"
            "In my view, parents and schools should give children more room to choose their hobbies and respect "
            "the interests that make them unique. When a child is allowed to follow his heart, he is more likely "
            "to grow into a confident and culturally grounded adult."
        ),
        "sample_zh": (
            "这幅漫画呈现了一位父亲和儿子之间的对话。男孩穿着传统戏服，拿着舞台道具，不高兴地说：“爸爸，"
            "好多同学觉得学唱戏不好玩。”父亲温和地回答：“你自己不是喜欢吗？那就够了。”\n\n"
            "这幅画传达了一个简单而有力的信息：一个人真正的兴趣不应被别人的看法所压制。在一个常常把“流行”"
            "误当作“价值”的世界里，年轻人可能仅仅因为某件事显得不时髦，就放弃自己真正热爱的东西。父亲的回答"
            "提醒我们：自信始于自我接纳。这对传统文化也很重要：如果年轻人被鼓励去接触戏曲、书法或民乐，这些"
            "艺术形式就会保持生命力，而不是变成博物馆里的展品。\n\n"
            "在我看来，家长和学校应该给孩子更多选择兴趣的空间，尊重那些让他们独特的爱好。当一个孩子被允许"
            "追随自己的内心时，他更可能成长为一个自信且有文化根基的人。"
        ),
        "structure": [
            ("第一段 · 描述", "The cartoon presents... Dressed in..., the boy says... The father replies..."),
            ("第二段 · 寓意", "The drawing conveys... one's genuine interest should not be silenced... It also matters for..."),
            ("第三段 · 评论", "In my view, parents and schools should... When..., he is more likely to..."),
        ],
        "expressions": [
            "The cartoon vividly depicts...",
            "What strikes me most is that...",
            "The drawing conveys a simple yet powerful message: ...",
            "This phenomenon can be attributed to...",
            "It is high time that we attached greater importance to...",
            "Only by doing so can we...",
        ],
        "traps": [
            "不要花太多笔墨描写人物衣着；描述控制在 2—3 句。",
            "寓意要明确，不要只写“传统文化很重要”而不解释“为什么/怎么办”。",
            "评论段要给自己的判断，不要重复第二段。",
        ],
    },
}
