var APRIL_ARTICLES = {
  "4-11": {
    "date": "4/11",
    "month": 4,
    "day": 11,
    "title": "Article from 4/11",
    "text": "The rise of large language models (LLMs) has been nothing short of revolutionary. From drafting emails to composing poetry, these AI systems now permeate daily digital life, their outputs often indistinguishable from human creation. Yet beneath this veneer of fluency lies a critical, underappreciated flaw: these models are fundamentally confabulation engines. They do not \"know\" facts or \"understand\" context in the human sense; instead, they predict the statistically most probable next word, generating coherent-sounding text that is often entirely fabricated.\n\nThis phenomenon, commonly called \"hallucination,\" is not a bug but a feature of how LLMs are trained. Trained on petabytes of human text, they learn patterns, correlations, and linguistic structures, but not truth or causality. When prompted with a question outside their training data or one requiring precise factual recall, they do not admit ignorance. Instead, they synthesize plausible-sounding but false information, seamlessly weaving invented data, quotes, and even entire events into their responses. For instance, an LLM might confidently cite a non-existent study to support a claim, or invent historical details to fill gaps in its knowledge.\n\nThe consequences of AI hallucination extend far beyond minor inconveniences. In high-stakes domains such as healthcare, law, and journalism, these fabrications can have severe real-world impacts. A doctor relying on an AI-generated diagnosis citing fictitious medical research could endanger a patient's life. A lawyer using AI to draft legal briefs might unknowingly reference non-existent case law, undermining their client's position. Journalists, too, risk spreading misinformation by inadvertently publishing AI-created false stories as fact.\n\nEfforts to mitigate hallucinations are underway but remain deeply challenging. Techniques like retrieval-augmented generation (RAG) attempt to ground models in verified external data sources, reducing their tendency to invent facts. However, this adds complexity and latency. Other approaches focus on fine-tuning models to express uncertainty or say \"I don't know,\" but training AI to be reliably humble is an uphill battle. The core issue persists: as long as LLMs optimize for linguistic coherence over factual accuracy, hallucinations will be an inherent risk.\n\nSome experts argue that the obsession with eliminating hallucinations entirely is misplaced. Instead, they advocate for a paradigm shift: designing systems that transparently communicate their confidence levels and sources. Users must be educated to treat AI outputs as tentative suggestions, not definitive truths. The ultimate solution may not be perfect AI, but a more discerning human-AI partnership, one where we leverage the machine's creativity while maintaining constant vigilance over its veracity.",
    "questions": [
      {
        "num": 1,
        "type": "综合题",
        "stem": "1. intentional deception",
        "options": [
          "intentional deception",
          "creative storytelling",
          "spontaneous fabrication",
          "logical deduction"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。intentional deception 指故意欺骗，但文中 confabulation 是 AI 无意识生成的虚假内容，非故意行为。",
          "B": "错误。creative storytelling 偏向创作性叙事，与文中描述的无根据编造不符。",
          "C": "正确。confabulation 在心理学中指无意识的虚构/编造。文中说 AI 是 fundamentally confabulation engines，预测最可能的下一个词，生成听起来合理但完全虚构的内容，即 spontaneous fabrication。",
          "D": "错误。logical deduction 是逻辑推理，与 confabulation 含义完全相反。"
        }
      },
      {
        "num": 2,
        "type": "综合题",
        "stem": "2. According to Paragraph 2, hallucinations occur because LLMs ________.",
        "options": [
          "lack access to sufficient training data",
          "prioritize plausibility over factual correctness",
          "are programmed to avoid admitting errors",
          "fail to recognize complex linguistic patterns"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文中说 AI 是在大量数据上训练的，并非缺乏训练数据。",
          "B": "正确。第二段明确指出 AI 学习 patterns, correlations, and linguistic structures, but not truth or causality，当被问到训练数据之外的问题时，它们不会承认无知，而是 synthesize plausible-sounding but false information，即优先考虑合理性而非事实准确性。",
          "C": "错误。文中说 AI do not admit ignorance 是因为训练方式导致的，而非被编程避免承认错误。",
          "D": "错误。文中说 AI 能识别 linguistic structures，问题不在于无法识别复杂语言模式。"
        }
      },
      {
        "num": 3,
        "type": "综合题",
        "stem": "3. The examples in Paragraph 3 are cited to illustrate that ________.",
        "options": [
          "AI technology is not yet ready for professional use",
          "misinformation spreads rapidly in the digital age",
          "the public is overly trusting of AI-generated content",
          "AI hallucinations can lead to serious detrimental effects"
        ],
        "answer": "D",
        "explanation": {
          "A": "错误。文章并未说 AI 技术尚未准备好用于专业领域。",
          "B": "错误。misinformation 传播速度不是该段重点。",
          "C": "错误。公众过度信任不是该段核心论点。",
          "D": "正确。第三段列举了医生、律师、记者三个例子，说明 AI hallucination 在 healthcare, law, journalism 等高利益领域可以 have severe real-world impacts，即导致严重的负面影响。"
        }
      },
      {
        "num": 4,
        "type": "综合题",
        "stem": "4. To solve the problem of hallucinations, some experts suggest that we should ________.",
        "options": [
          "focus on making AI systems more factually accurate",
          "develop AI that can clearly indicate its reliability",
          "restrict the use of LLMs to low-stakes applications",
          "improve human literacy in digital technology"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文章指出消除幻觉的执着是 misplaced 的，不认为应专注于提高事实准确性。",
          "B": "正确。最后一段说 experts advocate for a paradigm shift: designing systems that transparently communicate their confidence levels and sources，即开发能清楚表明其可靠性的 AI。",
          "C": "错误。限制使用不是专家建议的解决方案。",
          "D": "错误。提高数字素养是用户教育的一部分，但不是核心解决方案。"
        }
      },
      {
        "num": 5,
        "type": "综合题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "AI Hallucinations: A Bug We Must Eliminate",
          "Large Language Models: The Future of Creativity",
          "The Hidden Risk of AI: When Machines Make Up Facts",
          "Human-AI Partnership: Overcoming Digital Illiteracy"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。文章说 obsession with eliminating hallucinations entirely is misplaced。",
          "B": "错误。文章重点不在 AI 的创造力。",
          "C": "正确。全文围绕 AI 幻觉问题展开，指出这是 fundamental flaw，讨论其危害、缓解努力和最终建议，最佳标题应反映 AI 编造事实的隐藏风险。",
          "D": "错误。人机合作是最后一段提到的建议，但不是全文主旨。"
        }
      }
    ],
    "words": [
      {
        "word": "confabulation",
        "def": "虚构杜撰"
      },
      {
        "word": "permeate",
        "def": "渗透"
      },
      {
        "word": "veneer",
        "def": "表象"
      },
      {
        "word": "indistinguishable",
        "def": "难以区分的"
      },
      {
        "word": "fabricated",
        "def": "编造的"
      },
      {
        "word": "hallucination",
        "def": "幻觉"
      },
      {
        "word": "petabytes",
        "def": "拍字节"
      },
      {
        "word": "causality",
        "def": "因果关系"
      },
      {
        "word": "synthesize",
        "def": "综合"
      },
      {
        "word": "plausible",
        "def": "貌似合理的"
      },
      {
        "word": "fictitious",
        "def": "虚构的"
      },
      {
        "word": "undermining",
        "def": "削弱"
      },
      {
        "word": "misinformation",
        "def": "错误信息"
      },
      {
        "word": "inadvertently",
        "def": "无意地"
      },
      {
        "word": "mitigate",
        "def": "减轻"
      },
      {
        "word": "latency",
        "def": "延迟"
      },
      {
        "word": "paradigm",
        "def": "范式"
      },
      {
        "word": "discerning",
        "def": "识别"
      },
      {
        "word": "veracity",
        "def": "真实性"
      },
      {
        "word": "vigilance",
        "def": "警惕"
      }
    ]
  },
  "4-12": {
    "date": "4/12",
    "month": 4,
    "day": 12,
    "title": "Article from 4/12",
    "text": "The ubiquity of digital devices has transformed how we work, communicate, and consume information. Smartphones, tablets, and laptops promise unprecedented connectivity and efficiency, yet an increasing body of research suggests they may be exacting a hidden toll: digital fatigue. This phenomenon, characterized by exhaustion, diminished focus, and a sense of being perpetually overwhelmed, is emerging as a significant occupational hazard in the modern workplace.\n\nAt the heart of digital fatigue lies the constant bombardment of notifications, emails, and messages. Studies indicate that the average office worker checks their email 74 times daily, while glancing at their smartphone every six minutes. This relentless connectivity fragments attention spans, making deep, sustained concentration increasingly elusive. Neuroscientists have found that each interruption—however brief—imposes a cognitive switching cost, depleting mental energy reserves and impairing subsequent task performance. Over time, this chronic fragmentation of attention manifests as mental exhaustion.\n\nThe blurring of work-life boundaries has exacerbated the problem. Remote work, while offering flexibility, has inadvertently created an expectation of perpetual availability. Employees report feeling pressured to respond to work communications during evenings and weekends, unable to fully disengage from professional obligations. This erosion of personal time prevents the psychological restoration necessary for maintaining cognitive well-being. Research demonstrates that individuals who maintain clear boundaries between work and leisure report significantly higher levels of life satisfaction and lower burnout rates.\n\nSocial media platforms, designed to maximize engagement, compound this exhaustion. Their algorithms prioritize content that triggers emotional responses, creating information streams of variable reward that keep users compulsively scrolling. This design exploits fundamental psychological vulnerabilities, creating cycles of engagement that leave users feeling drained rather than fulfilled. Paradoxically, the platforms promising connection often leave users feeling isolated and depleted.\n\nAddressing digital fatigue requires intentional strategies at both individual and organizational levels. Some companies have implemented \"communication-free windows\" to protect employees' focus time and personal boundaries. Individuals are increasingly adopting digital minimalism—curating their online presence, disabling non-essential notifications, and scheduling regular digital detoxes. However, these measures remain reactive responses to systemic design choices that prioritize engagement metrics over human well-being. A fundamental reimagining of our digital infrastructure may be necessary—one that serves human cognitive limits rather than exploiting them.",
    "questions": [
      {
        "num": 1,
        "type": "综合题",
        "stem": "1. providing unexpected benefits",
        "options": [
          "providing unexpected benefits",
          "causing concealed damage",
          "demanding financial costs",
          "requiring strict discipline"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。unexpected benefits 与 hidden toll 含义相反。",
          "B": "正确。exacting a hidden toll 意为造成隐蔽的损害/代价。文中说设备承诺了前所未有的连接性和效率，但研究表明它们可能造成隐藏的代价——数字疲劳，即 causing concealed damage。",
          "C": "错误。financial costs 是字面理解，文中 toll 是比喻用法。",
          "D": "错误。strict discipline 与文意无关。"
        }
      },
      {
        "num": 2,
        "type": "综合题",
        "stem": "2. According to Paragraph 2, digital fatigue is primarily caused by ________.",
        "options": [
          "excessive multitasking requirements",
          "the interruption of continuous attention flow",
          "insufficient training in digital literacy",
          "outdated workplace communication systems"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。multitasking 不是主要原因。",
          "B": "正确。第二段指出 constant bombardment of notifications fragments attention spans, making deep sustained concentration increasingly elusive，每次 interruption 都 impose cognitive switching cost，即连续注意力流的中断是主要原因。",
          "C": "错误。数字素养培训不足不是原因。",
          "D": "错误。过时的工作沟通系统不是原因。"
        }
      },
      {
        "num": 3,
        "type": "综合题",
        "stem": "3. The author mentions \"cognitive switching cost\" (Paragraph 2) to illustrate that ________.",
        "options": [
          "multitasking improves overall work efficiency",
          "brief interruptions have minimal impact on productivity",
          "mental energy is consumed by frequent task transitions",
          "employees should avoid all forms of digital communication"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。多任务处理降低效率而非提高。",
          "B": "错误。brief interruptions 有显著影响而非 minimal impact。",
          "C": "正确。cognitive switching cost 指每次中断（即使短暂）都消耗心理能量储备（depleting mental energy reserves），频繁任务转换消耗心理能量。",
          "D": "错误。避免所有数字通信不现实也不是作者意图。"
        }
      },
      {
        "num": 4,
        "type": "综合题",
        "stem": "4. Which of the following statements is true according to Paragraph 4?",
        "options": [
          "Social media algorithms intentionally prioritize neutral content.",
          "Users of social media typically feel more connected and energized.",
          "Social media design exploits psychological weaknesses to maintain engagement.",
          "Information streams on social media provide consistent, predictable rewards."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。算法优先触发情感反应的内容，而非中性内容。",
          "B": "错误。用户感到 drained 和 depleted，而非 energized。",
          "C": "正确。第四段明确指出 This design exploits fundamental psychological vulnerabilities, creating cycles of engagement that leave users feeling drained，即社交媒体设计利用心理弱点来维持用户参与度。",
          "D": "错误。信息流提供 variable reward（可变奖励），而非 consistent predictable rewards。"
        }
      },
      {
        "num": 5,
        "type": "综合题",
        "stem": "5. The best title for this text would be ________.",
        "options": [
          "Digital Devices: Revolutionizing Workplace Efficiency",
          "Remote Work: The End of Work-Life Balance",
          "Social Media: A Threat to Human Cognition",
          "Digital Fatigue: The Hidden Cost of Constant Connectivity"
        ],
        "answer": "D",
        "explanation": {
          "A": "错误。文章重点不在效率提升。",
          "B": "错误。远程工作只是其中一个方面。",
          "C": "错误。社交媒体只是问题的一部分。",
          "D": "正确。全文讨论数字设备带来的疲劳问题，从现象、原因、影响和对策四个层面展开，最佳标题应反映持续连接的隐藏代价。"
        }
      }
    ],
    "words": [
      {
        "word": "ubiquity",
        "def": "无处不在"
      },
      {
        "word": "unprecedented",
        "def": "史无前例的"
      },
      {
        "word": "exacting",
        "def": "费力的"
      },
      {
        "word": "perpetually",
        "def": "永恒地"
      },
      {
        "word": "bombardment",
        "def": "连续攻击"
      },
      {
        "word": "relentless",
        "def": "无情的"
      },
      {
        "word": "elusive",
        "def": "难以捉摸的"
      },
      {
        "word": "cognitive",
        "def": "认知的"
      },
      {
        "word": "impairing",
        "def": "损害"
      },
      {
        "word": "exacerbated",
        "def": "加剧"
      },
      {
        "word": "inadvertently",
        "def": "无意地"
      },
      {
        "word": "disengage",
        "def": "脱离"
      },
      {
        "word": "compulsively",
        "def": "强迫地"
      },
      {
        "word": "vulnerabilities",
        "def": "脆弱性"
      },
      {
        "word": "paradoxically",
        "def": "矛盾地"
      },
      {
        "word": "minimalism",
        "def": "极简主义"
      },
      {
        "word": "reimagining",
        "def": "重新构想"
      },
      {
        "word": "systemic",
        "def": "系统性的"
      },
      {
        "word": "detoxes",
        "def": "排毒"
      },
      {
        "word": "fragmentation",
        "def": "碎片化"
      }
    ]
  },
  "4-13": {
    "date": "4/13",
    "month": 4,
    "day": 13,
    "title": "Article from 4/13",
    "text": "For decades, the prevailing narrative of globalization promised universal prosperity through free trade and economic integration. Yet as manufacturing jobs vanished from developed economies and wages stagnated for middle-class workers, a troubling reality emerged: the benefits of global economic integration have been distributed profoundly unequally. This disconnect between promise and outcome has fueled political polarization and calls for protectionist policies across Western democracies.\n\nThe manufacturing sector's decline in advanced economies illustrates this disparity most vividly. Between 2000 and 2010, the United States lost approximately 5.6 million manufacturing jobs, with scholars attributing a significant portion of these losses to import competition from China. While consumers benefited from cheaper goods, the costs fell disproportionately on specific communities—factory towns that experienced not just economic decline but social deterioration. Researchers have documented elevated rates of substance abuse, family dissolution, and mortality in regions hardest hit by trade-related job losses. These communities, once the backbone of industrial prosperity, found themselves stranded in an economy that no longer valued their labor.\n\nTheoretically, the \"winners\" from globalization were supposed to compensate the \"losers\" through redistribution mechanisms. In practice, such compensation rarely materialized adequately. Workers displaced by trade often lacked the skills or geographic mobility to transition into expanding sectors like technology or healthcare. Retraining programs, while well-intentioned, frequently failed to deliver meaningful employment opportunities. Meanwhile, corporate profits from globalization accrued primarily to shareholders and executives, exacerbating income inequality.\n\nThe backlash against globalization has manifested in political movements that transcend traditional left-right divisions. Voters in regions devastated by trade competition have increasingly supported candidates promising to restrict imports, renegotiate trade agreements, and bring manufacturing jobs back—a phenomenon observed across both the United States and Europe. Yet economists caution that reversing globalization carries its own significant risks: higher consumer prices, supply chain disruptions, and reduced economic efficiency could ultimately harm the very populations such policies aim to protect.\n\nThe challenge lies in crafting policies that harness globalization's benefits while cushioning its adverse effects. Some economists advocate for stronger social safety nets, wage insurance programs, and place-based development strategies that invest in struggling communities. Others emphasize the need for education reform to prepare future generations for an inevitably interconnected global economy. What remains clear is that the status quo—unequal gains combined with inadequate support for displaced workers—is unsustainable. Without meaningful policy intervention, the political ramifications of globalization's uneven distribution will continue to destabilize democratic societies.",
    "questions": [
      {
        "num": 1,
        "type": "综合题",
        "stem": "1. the widespread criticism of free trade policies",
        "options": [
          "the widespread criticism of free trade policies",
          "the dominant belief about globalization's benefits",
          "the economic predictions of developing nations",
          "the political opposition to economic integration"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。prevailing narrative 是主流叙事/信念，而非批评。",
          "B": "正确。prevailing narrative of globalization promised universal prosperity through free trade，即关于全球化好处的 dominant belief（主流信念）。",
          "C": "错误。发展中国家的经济预测不是 prevailing narrative。",
          "D": "错误。政治反对不是 prevailing narrative 的含义。"
        }
      },
      {
        "num": 2,
        "type": "综合题",
        "stem": "2. According to Paragraph 2, the negative effects of manufacturing job losses include ________.",
        "options": [
          "increased competition among domestic producers",
          "social problems in affected communities",
          "reduced consumer purchasing power",
          "declining profits for multinational corporations"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。国内生产者竞争增加不是主要负面影响。",
          "B": "正确。第二段明确指出工厂城镇经历了 not just economic decline but social deterioration，包括 substance abuse, family dissolution, mortality 等社会问题。",
          "C": "错误。消费者购买力下降与文意相反——消费者受益于更便宜的商品。",
          "D": "错误。跨国公司利润下降不是文中讨论的内容。"
        }
      },
      {
        "num": 3,
        "type": "综合题",
        "stem": "3. The author mentions redistribution mechanisms (Paragraph 3) to indicate that ________.",
        "options": [
          "they have successfully protected displaced workers",
          "corporate executives opposed such compensation schemes",
          "theoretical solutions often fail in practical implementation",
          "workers were unwilling to accept retraining opportunities"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。再分配机制未能成功保护被取代的工人。",
          "B": "错误。高管反对补偿方案不是作者提及再分配机制的目的。",
          "C": "正确。第三段说 Theoretically winners were supposed to compensate losers through redistribution mechanisms. In practice, such compensation rarely materialized adequately，即理论解决方案在实践中往往失败。",
          "D": "错误。工人不愿接受再培训不是重点。"
        }
      },
      {
        "num": 4,
        "type": "综合题",
        "stem": "4. Which of the following is true about the political response to globalization?",
        "options": [
          "It has united voters across traditional party lines.",
          "It has primarily benefited conservative political movements.",
          "It reflects a growing demand for economic protectionism.",
          "It has successfully reversed trade-related job losses."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。政治反应并未团结选民，而是 transcended traditional divisions。",
          "B": "错误。未提及主要受益于保守运动。",
          "C": "正确。第四段说 voters increasingly supported candidates promising to restrict imports, renegotiate trade agreements, and bring manufacturing jobs back，反映了对经济保护主义日益增长的需求。",
          "D": "错误。贸易相关就业损失未被成功逆转。"
        }
      },
      {
        "num": 5,
        "type": "综合题",
        "stem": "5. The best title for this text would be ________.",
        "options": [
          "The Decline of Manufacturing: A Global Perspective",
          "Globalization's Unequal Gains: A Democratic Dilemma",
          "Free Trade and Protectionism: An Economic Analysis",
          "The Future of Economic Integration in Developed Nations"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。制造业 decline 只是文章的一部分内容。",
          "B": "正确。全文讨论全球化收益不均及其对民主社会的政治影响，从现象、原因、政治反应到政策建议，最佳标题应反映全球化不平等收益的民主困境。",
          "C": "错误。自由贸易与保护主义的分析不够聚焦文章核心。",
          "D": "错误。经济整合的未来不是文章主旨。"
        }
      }
    ],
    "words": [
      {
        "word": "prevailing",
        "def": "流行的"
      },
      {
        "word": "prosperity",
        "def": "繁荣"
      },
      {
        "word": "stagnated",
        "def": "停滞"
      },
      {
        "word": "polarization",
        "def": "两极分化"
      },
      {
        "word": "protectionist",
        "def": "保护主义的"
      },
      {
        "word": "disparity",
        "def": "差距"
      },
      {
        "word": "disproportionately",
        "def": "不成比例地"
      },
      {
        "word": "deterioration",
        "def": "恶化"
      },
      {
        "word": "dissolution",
        "def": "解体"
      },
      {
        "word": "redistribution",
        "def": "再分配"
      },
      {
        "word": "materialized",
        "def": "实现"
      },
      {
        "word": "well-intentioned",
        "def": "善意的"
      },
      {
        "word": "accrued",
        "def": "累积"
      },
      {
        "word": "exacerbating",
        "def": "加剧"
      },
      {
        "word": "backlash",
        "def": "强烈反应"
      },
      {
        "word": "transcend",
        "def": "超越"
      },
      {
        "word": "devastated",
        "def": "摧毁"
      },
      {
        "word": "cushioning",
        "def": "缓冲"
      },
      {
        "word": "ramifications",
        "def": "后果"
      },
      {
        "word": "destabilize",
        "def": "使不稳定"
      }
    ]
  },
  "4-14": {
    "date": "4/14",
    "month": 4,
    "day": 14,
    "title": "Article from 4/14",
    "text": "The assumption that humans are rational decision-makers, carefully weighing costs and benefits before acting, has long underpinned economic theory and public policy. Yet decades of research in behavioral economics have exposed a more troubling reality: our decisions are systematically distorted by cognitive biases—mental shortcuts that lead us astray even when we possess ample information. These biases, deeply ingrained in human psychology, shape everything from our financial investments to our health choices, often with costly consequences.\n\nOne particularly pervasive bias is present bias, the tendency to overvalue immediate rewards while discounting future benefits. This explains why individuals struggle to save for retirement despite understanding its importance, or why patients fail to adhere to medication regimens that would prevent future illness. The immediate gratification of spending money or skipping a pill outweighs the abstract, distant promise of financial security or improved health. Researchers have found that when people are presented with choices involving delayed outcomes, their decisions become markedly inconsistent, as if two different selves were making choices—one impatient and present-focused, another more deliberative but easily overridden.\n\nConfirmation bias similarly distorts our judgment by leading us to seek information that validates our existing beliefs while dismissing contradictory evidence. In an era of information abundance, this tendency has grown particularly pernicious. Individuals curate their news sources to align with their ideological predispositions, creating echo chambers that reinforce erroneous views. Studies demonstrate that people presented with balanced evidence on contentious issues often become more polarized, not less, as they selectively absorb confirming details and rationalize away disconfirming ones. This phenomenon extends beyond politics: investors may cling to losing stocks, convinced that negative reports are exaggerated, while dismissing objective analyses suggesting otherwise.\n\nThe implications for climate policy illustrate how cognitive biases can undermine collective action. Despite overwhelming scientific consensus on anthropogenic climate change, many individuals remain skeptical, swayed by optimism bias—the belief that negative outcomes are less likely to affect them personally. This bias, combined with the abstract nature of long-term environmental threats, makes mobilizing public support for costly mitigation measures exceedingly difficult. Even those who accept climate science often resist lifestyle changes, perceiving the sacrifices as immediate and concrete while the benefits remain diffuse and temporally distant.\n\nAddressing these biases requires more than simply providing better information. Behavioral scientists advocate for \"choice architecture\"—designing decision environments that nudge people toward better outcomes without restricting their freedom. Automatic enrollment in retirement savings plans, default settings that encourage energy conservation, and simplified disclosure formats have all proven effective. Yet critics argue that such interventions, however well-intentioned, risk paternalism. The debate underscores a fundamental tension: if human irrationality is systematic rather than occasional, can we trust individuals to make optimal choices, or must institutions gently steer them toward better outcomes? Resolving this question will shape how societies address challenges from financial literacy to public health in the decades ahead.",
    "questions": [
      {
        "num": 1,
        "type": "综合题",
        "stem": "1. guide us toward success",
        "options": [
          "guide us toward success",
          "cause us to make wrong decisions",
          "help us find new opportunities",
          "improve our decision-making efficiency"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。lead us astray 意为引导我们走向错误方向，而非成功。",
          "B": "正确。lead us astray 指认知偏差使我们在拥有充足信息的情况下仍做出错误决定，即 cause us to make wrong decisions。",
          "C": "错误。找到新机会与文意相反。",
          "D": "错误。提高决策效率与文意相反。"
        }
      },
      {
        "num": 2,
        "type": "综合题",
        "stem": "2. According to Paragraph 2, present bias refers to the tendency that ________.",
        "options": [
          "people prefer immediate rewards over future benefits",
          "individuals make consistent decisions over time",
          "patients strictly follow their medication schedules",
          "investors focus on long-term financial planning"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。present bias 被定义为 the tendency to overvalue immediate rewards while discounting future benefits，即人们偏好即时回报而非未来收益。",
          "B": "错误。人们做的是 inconsistent decisions 而非 consistent。",
          "C": "错误。患者不严格遵守用药计划，而非严格遵循。",
          "D": "错误。投资者关注短期而非长期规划。"
        }
      },
      {
        "num": 3,
        "type": "综合题",
        "stem": "3. The author mentions \"echo chambers\" (Paragraph 3) to illustrate that ________.",
        "options": [
          "information abundance benefits rational decision-making",
          "confirmation bias reinforces preexisting erroneous views",
          "balanced evidence reduces polarization on contentious issues",
          "ideological predispositions help people absorb diverse opinions"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。信息 abundance 并未 benefit 理性决策。",
          "B": "正确。echo chambers 指人们 curate news sources to align with ideological predispositions，creating chambers that reinforce erroneous views，即确认偏误强化了先前存在的错误观点。",
          "C": "错误。balanced evidence 并未减少 polarisation，反而使人们 more polarized。",
          "D": "错误。ideological predispositions 帮助人们吸收 confirming details 而非 diverse opinions。"
        }
      },
      {
        "num": 4,
        "type": "综合题",
        "stem": "4. Which of the following is true about optimism bias according to Paragraph 4?",
        "options": [
          "It enhances public support for climate mitigation measures.",
          "It leads people to believe negative outcomes are personally unlikely.",
          "It encourages individuals to accept scientific consensus on climate.",
          "It motivates lifestyle changes for environmental protection."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。optimism bias 削弱而非增强公众对气候缓解措施的支持。",
          "B": "正确。optimism bias 被定义为 the belief that negative outcomes are less likely to affect them personally，即人们相信负面结果不太可能影响自己。",
          "C": "错误。人们 remain skeptical 而非 accept scientific consensus。",
          "D": "错误。人们 resist lifestyle changes 而非 motivated to change。"
        }
      },
      {
        "num": 5,
        "type": "综合题",
        "stem": "5. The best title for this text would be ________.",
        "options": [
          "Economic Theory: The Foundation of Rational Decision-Making",
          "Cognitive Biases: How Mental Shortcuts Distort Our Choices",
          "Climate Policy: Overcoming Public Resistance to Change",
          "Choice Architecture: A New Approach to Behavioral Science"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。经济理论只是引入背景。",
          "B": "正确。全文讨论认知偏差如何系统性地扭曲决策，从 present bias 到 confirmation bias 到 optimism bias，最后讨论应对策略，最佳标题应反映认知偏差如何扭曲选择。",
          "C": "错误。气候政策只是一个例子。",
          "D": "错误。choice architecture 是最后一段提到的应对策略之一，不是主旨。"
        }
      }
    ],
    "words": [
      {
        "word": "underpinned",
        "def": "支撑"
      },
      {
        "word": "systematically",
        "def": "系统地"
      },
      {
        "word": "distorted",
        "def": "扭曲"
      },
      {
        "word": "ingrained",
        "def": "根深蒂固的"
      },
      {
        "word": "pervasive",
        "def": "普遍的"
      },
      {
        "word": "overvalue",
        "def": "高估"
      },
      {
        "word": "discounting",
        "def": "低估"
      },
      {
        "word": "adhere",
        "def": "遵守"
      },
      {
        "word": "regimens",
        "def": "方案"
      },
      {
        "word": "gratification",
        "def": "满足感"
      },
      {
        "word": "outweighs",
        "def": "超过"
      },
      {
        "word": "deliberative",
        "def": "深思熟虑的"
      },
      {
        "word": "pernicious",
        "def": "有害的"
      },
      {
        "word": "curate",
        "def": "筛选"
      },
      {
        "word": "ideological",
        "def": "意识形态的"
      },
      {
        "word": "predispositions",
        "def": "倾向"
      },
      {
        "word": "erroneous",
        "def": "错误的"
      },
      {
        "word": "contentious",
        "def": "有争议的"
      },
      {
        "word": "rationalize",
        "def": "合理化"
      },
      {
        "word": "anthropogenic",
        "def": "人为的"
      },
      {
        "word": "mitigation",
        "def": "缓解"
      },
      {
        "word": "exceedingly",
        "def": "极其"
      },
      {
        "word": "paternalism",
        "def": "家长式统治"
      },
      {
        "word": "underscores",
        "def": "强调"
      }
    ]
  },
  "4-15": {
    "date": "4/15",
    "month": 4,
    "day": 15,
    "title": "Article from 4/15",
    "text": "The rapid expansion of urban populations has transformed cities into epicenters of economic opportunity, cultural dynamism, and technological innovation. Yet this urbanization has also precipitated a housing affordability crisis that threatens to undermine the very promise of city life. In metropolitan areas across the globe, housing costs have soared far beyond wage growth, leaving millions of residents—particularly young professionals and essential workers—struggling to secure stable accommodation. The consequences extend beyond individual hardship: when housing becomes inaccessible, cities risk losing the diverse workforce essential to their economic vitality.\n\nAt the root of this crisis lies a fundamental imbalance between supply and demand. Regulatory constraints, including zoning restrictions and lengthy approval processes, have severely limited new construction in many desirable urban neighborhoods. Existing residents often oppose development projects, fearing that new housing will alter community character or strain local infrastructure—a phenomenon economists term \"NIMBYism\" (Not In My Backyard). These political barriers have effectively frozen housing supply in many cities, even as demand from incoming residents continues to surge. Research indicates that in the most restrictive metropolitan areas, housing prices have diverged dramatically from construction costs, suggesting that scarcity alone drives inflated valuations.\n\nThe financialization of housing has further exacerbated affordability pressures. Institutional investors, pension funds, and private equity firms have increasingly acquired residential properties, treating them as speculative assets rather than homes for occupancy. This trend has intensified in the aftermath of the 2008 financial crisis, as investors sought stable returns in an uncertain economic landscape. The result has been a proliferation of luxury developments catering to wealthy buyers, while affordable options dwindle. In some cities, vacant investment properties occupy significant portions of the housing stock, as owners prioritize capital appreciation over rental income or resident occupancy.\n\nThe displacement of lower-income residents from urban centers carries profound social implications. Essential workers—teachers, nurses, transit operators—find themselves pushed to distant suburbs, facing lengthy commutes that erode work-life balance and increase transportation costs. This geographic sorting concentrates poverty in peripheral neighborhoods while wealth clusters in city cores, reinforcing socioeconomic segregation. Studies have documented diminished educational outcomes for children in displaced families, as school quality often correlates with neighborhood affluence. The erosion of socioeconomic diversity within cities undermines the social cohesion that urban planners have long championed as a defining virtue of city life.\n\nAddressing the affordability crisis demands multifaceted policy interventions. Some jurisdictions have implemented inclusionary zoning, requiring developers to incorporate affordable units within new projects. Others have experimented with rent stabilization measures or expanded public housing programs. Yet these approaches face persistent challenges: rent controls can discourage maintenance and new construction, while public housing often suffers from funding constraints and bureaucratic inefficiencies. More radical proposals include taxing vacant properties to discourage speculative holding, or reforming zoning codes to permit denser development in underutilized areas. What remains evident is that the status quo—escalating costs combined with inadequate supply—will continue to exclude growing segments of the population from the benefits of urban life, with repercussions that extend far beyond housing markets.",
    "questions": [
      {
        "num": 1,
        "type": "综合题",
        "stem": "1. prevented a housing shortage",
        "options": [
          "prevented a housing shortage",
          "caused a crisis in housing costs",
          "delayed the expansion of urban areas",
          "resolved housing market problems"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。precipitated 意为促成/加速，而非 prevented。",
          "B": "正确。precipitated a housing affordability crisis 意为促成了住房负担能力危机，即 caused a crisis in housing costs。",
          "C": "错误。delayed 与 precipitated 含义相反。",
          "D": "错误。resolved 与文意完全相反。"
        }
      },
      {
        "num": 2,
        "type": "综合题",
        "stem": "2. According to Paragraph 2, the imbalance between housing supply and demand is primarily caused by ________.",
        "options": [
          "declining demand from incoming residents",
          "excessive construction in urban neighborhoods",
          "regulatory constraints and political opposition",
          "reduced construction costs in metropolitan areas"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。需求在增加而非 declining。",
          "B": "错误。过度建设不是问题——问题是建设不足。",
          "C": "正确。第二段指出 Regulatory constraints including zoning restrictions and lengthy approval processes severely limited new construction，加上 residents oppose development projects，即 regulatory constraints and political opposition 是主要原因。",
          "D": "错误。建设成本降低不是原因。"
        }
      },
      {
        "num": 3,
        "type": "综合题",
        "stem": "3. The author mentions \"NIMBYism\" (Paragraph 2) to illustrate that ________.",
        "options": [
          "existing residents support new housing projects",
          "political barriers limit housing supply expansion",
          "urban neighborhoods welcome infrastructure development",
          "zoning restrictions have been eliminated in most cities"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。居民反对而非支持新住房项目。",
          "B": "正确。NIMBYism 指居民反对开发项目，fearing new housing will alter community character or strain local infrastructure，这些 political barriers effectively frozen housing supply，即政治障碍限制了住房供应扩张。",
          "C": "错误。社区不欢迎基础设施发展。",
          "D": "错误。区域限制未被消除，反而 severely limited 新建设。"
        }
      },
      {
        "num": 4,
        "type": "综合题",
        "stem": "4. Which of the following is true about the financialization of housing according to Paragraph 3?",
        "options": [
          "It has increased the availability of affordable housing options.",
          "It treats residential properties as speculative investment assets.",
          "It has reduced the involvement of institutional investors.",
          "It prioritizes rental income over capital appreciation."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。经济化减少了而非增加了可负担住房。",
          "B": "正确。第三段说 Institutional investors treating residential properties as speculative assets rather than homes for occupancy，即将住宅物业视为投机投资资产。",
          "C": "错误。机构投资者参与度增加而非减少。",
          "D": "错误。业主 prioritise capital appreciation over rental income，而非反过来。"
        }
      },
      {
        "num": 5,
        "type": "综合题",
        "stem": "5. The best title for this text would be ________.",
        "options": [
          "Urbanization: The Rise of Metropolitan Economic Centers",
          "Housing Affordability: The Crisis Excluding City Residents",
          "Rent Control: A Solution to Urban Housing Problems",
          "Zoning Reform: The Path to Housing Market Recovery"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。城市化只是引入背景。",
          "B": "正确。全文讨论住房负担能力危机及其对社会的影响，从原因（供需失衡、金融化、displacement）到对策，最佳标题应反映排除城市居民的住房危机。",
          "C": "错误。租金控制只是对策之一。",
          "D": "错误。区域改革只是对策之一。"
        }
      }
    ],
    "words": [
      {
        "word": "epicenters",
        "def": "中心"
      },
      {
        "word": "dynamism",
        "def": "活力"
      },
      {
        "word": "precipitated",
        "def": "引发"
      },
      {
        "word": "metropolitan",
        "def": "大城市的"
      },
      {
        "word": "inaccessible",
        "def": "难以获得的"
      },
      {
        "word": "vitality",
        "def": "活力"
      },
      {
        "word": "constraints",
        "def": "约束"
      },
      {
        "word": "NIMBYism",
        "def": "邻避效应"
      },
      {
        "word": "diverged",
        "def": "偏离"
      },
      {
        "word": "scarcity",
        "def": "稀缺"
      },
      {
        "word": "inflated",
        "def": "膨胀的"
      },
      {
        "word": "financialization",
        "def": "金融化"
      },
      {
        "word": "speculative",
        "def": "投机的"
      },
      {
        "word": "proliferation",
        "def": "激增"
      },
      {
        "word": "catering",
        "def": "迎合"
      },
      {
        "word": "dwindle",
        "def": "减少"
      },
      {
        "word": "displacement",
        "def": "流离失所"
      },
      {
        "word": "segregation",
        "def": "隔离"
      },
      {
        "word": "affluence",
        "def": "富裕"
      },
      {
        "word": "cohesion",
        "def": "凝聚力"
      },
      {
        "word": "multifaceted",
        "def": "多层面的"
      },
      {
        "word": "inclusionary",
        "def": "包容性的"
      },
      {
        "word": "bureaucratic",
        "def": "官僚的"
      },
      {
        "word": "repercussions",
        "def": "反响"
      }
    ]
  },
  "4-16": {
    "date": "4/16",
    "month": 4,
    "day": 16,
    "title": "Article from 4/16",
    "text": "For generations, higher education has been heralded as the surest pathway to upward social mobility, the mechanism by which talented individuals from modest backgrounds could transcend economic circumstances and achieve professional success. Universities, particularly elite institutions, have traditionally served as gateways to lucrative careers and influential networks, promising that academic merit rather than inherited privilege would determine one's trajectory. Yet recent research has revealed a troubling paradox: while university attendance has expanded dramatically, the capacity of higher education to facilitate genuine social advancement has diminished considerably.\n\nThe expansion of higher education, often celebrated as democratization, has not produced proportional gains in mobility. Studies tracking graduates from different socioeconomic origins demonstrate that students from affluent families continue to secure substantially higher earnings and prestigious positions compared to their working-class peers, even when attending identical institutions and earning comparable credentials. This persistence of advantage stems from factors beyond academic achievement: wealthier students possess social networks that facilitate internships and job placements, receive guidance on navigating institutional cultures, and can afford unpaid experiential opportunities that enhance employability. Meanwhile, students from disadvantaged backgrounds often lack access to these informal resources, graduating with similar degrees but inferior prospects.\n\nThe financial burden of university attendance has further eroded education's mobility function. Tuition costs have escalated precipitously over recent decades, forcing many students to incur substantial debt that constrains their post-graduation choices. Graduates burdened by loans often prioritize immediate income over long-term career development, accepting positions outside their fields of study or foregoing advanced degree programmes. This creates a stratification whereby those who can afford to accumulate further qualifications continue to advance while others become trapped in cycles of relative deprivation.\n\nElite university admissions processes, though nominally meritocratic, inadvertently reproduce existing social hierarchies. Admissions committees frequently rely on indicators that correlate with socioeconomic status—extracurricular achievements, personal statements, and recommendation letters that reflect privileged upbringings rather than genuine academic potential. Consequently, students from underrepresented backgrounds face cumulative disadvantages that compound across generations. The resulting inequity undermines the foundational promise of education as a democratizing force for social renewal.",
    "questions": [
      {
        "num": 1,
        "type": "词义推断题",
        "stem": "1. The word \"heralded\" (Paragraph 1) most probably means ________.",
        "options": [
          "praised or acclaimed publicly",
          "criticized or condemned",
          "ignored or overlooked",
          "questioned or doubted"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。heralded 意为\"被誉为/被宣称为\"，指公开地赞扬或吹捧。文中说 higher education has been heralded as the surest pathway to upward social mobility，即高等教育被誉为社会流动的最佳途径。",
          "B": "错误。criticized 与 heralded 含义相反。",
          "C": "错误。ignored 与 heralded 含义相反。",
          "D": "错误。questioned 与 heralded 含义相反。"
        }
      },
      {
        "num": 2,
        "type": "细节理解题",
        "stem": "2. According to Paragraph 2, students from affluent families achieve better outcomes because of ________.",
        "options": [
          "superior academic credentials only",
          "government-supported employment programs",
          "social networks and informal resources beyond academics",
          "greater natural intelligence and talent"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。不仅仅是学术资质，还有其他因素。",
          "B": "错误。政府支持的就业计划不是原因。",
          "C": "正确。第二段指出 wealthier students possess social networks that facilitate internships and job placements，即社会网络和学术以外的非正式资源是关键因素。",
          "D": "错误。自然智力不是文中讨论的因素。"
        }
      },
      {
        "num": 3,
        "type": "例证题",
        "stem": "3. The author mentions \"unpaid internships\" (Paragraph 3) to indicate that ________.",
        "options": [
          "all students can equally access professional experience opportunities",
          "financial constraints limit career development for disadvantaged students",
          "universities provide sufficient support for job searches",
          "employers prefer graduates from lower-income backgrounds"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。不是所有学生都能平等获得实习机会。",
          "B": "正确。第三段说弱势背景学生无法负担无薪实习，而这是建立专业经验的机会，表明经济限制阻碍了职业发展。",
          "C": "错误。大学提供的支持不足。",
          "D": "错误。雇主不偏好低收入背景的毕业生。"
        }
      },
      {
        "num": 4,
        "type": "推理判断题",
        "stem": "4. What can be inferred from Paragraph 4 about elite university admissions?",
        "options": [
          "They have successfully equalized opportunity for all applicants.",
          "They primarily benefit students from disadvantaged communities.",
          "They have eliminated all barriers for underrepresented students.",
          "They inadvertently favor applicants from privileged backgrounds."
        ],
        "answer": "D",
        "explanation": {
          "A": "错误。精英大学招生未能实现机会均等。",
          "B": "错误。主要惠及富裕背景申请者。",
          "C": "错误。障碍未被消除。",
          "D": "正确。第四段说 Admissions processes though nominally meritocratic inadvertently favor applicants from privileged environments，即招生过程虽名义上择优，但无意中偏向特权背景的申请者。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "Higher Education: The Broken Promise of Social Mobility",
          "University Expansion: A Success Story of Democratization",
          "Financial Aid: The Key to Educational Equality",
          "Elite Institutions: Gateways to Professional Success"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。全文讨论高等教育未能兑现社会流动承诺的悖论，最佳标题应反映高等教育社会流动承诺的破灭。",
          "B": "错误。大学扩张的成功故事与文章观点相反。",
          "C": "错误。经济援助只是对策之一。",
          "D": "错误。精英机构作为专业成功的门户只是引入背景。"
        }
      }
    ],
    "words": [
      {
        "word": "heralded",
        "def": "被誉为"
      },
      {
        "word": "transcend",
        "def": "超越"
      },
      {
        "word": "lucrative",
        "def": "盈利丰厚的"
      },
      {
        "word": "trajectory",
        "def": "轨迹"
      },
      {
        "word": "paradox",
        "def": "悖论"
      },
      {
        "word": "facilitate",
        "def": "促进"
      },
      {
        "word": "democratization",
        "def": "民主化"
      },
      {
        "word": "proportional",
        "def": "成比例的"
      },
      {
        "word": "socioeconomic",
        "def": "社会经济的"
      },
      {
        "word": "affluent",
        "def": "富裕的"
      },
      {
        "word": "prestigious",
        "def": "有声望的"
      },
      {
        "word": "credentials",
        "def": "资历"
      },
      {
        "word": "experiential",
        "def": "经验的"
      },
      {
        "word": "employability",
        "def": "就业能力"
      },
      {
        "word": "disadvantaged",
        "def": "弱势的"
      },
      {
        "word": "precipitously",
        "def": "急剧地"
      },
      {
        "word": "constrains",
        "def": "限制"
      },
      {
        "word": "stratified",
        "def": "分层的"
      },
      {
        "word": "meritocratic",
        "def": "精英管理的"
      },
      {
        "word": "cornerstone",
        "def": "基石"
      },
      {
        "word": "underrepresented",
        "def": "代表不足的"
      },
      {
        "word": "cumulative",
        "def": "累积的"
      },
      {
        "word": "compound",
        "def": "加剧"
      },
      {
        "word": "undermine",
        "def": "破坏"
      },
      {
        "word": "renewal",
        "def": "更新"
      }
    ]
  },
  "4-17": {
    "date": "4/17",
    "month": 4,
    "day": 17,
    "title": "Article from 4/17",
    "text": "The preservation of biodiversity has emerged as one of the most pressing environmental challenges of the twenty-first century. Scientists warn that human activities are driving species toward extinction at rates unprecedented in geological history, threatening ecosystems that sustain life on Earth. Yet despite growing scientific consensus and mounting public concern, conservation efforts remain chronically underfunded and politically marginalized. The paradox is striking: while governments and corporations routinely commit to sustainability goals, the mechanisms for protecting natural habitats remain woefully inadequate.\n\nAt the heart of this disconnect lies a fundamental tension between economic development and ecological preservation. Conservation biologists have long argued that intact ecosystems provide irreplaceable services—water filtration, carbon sequestration, pollination, and disease regulation—that underpin human well-being and economic productivity. Economists have attempted to quantify these benefits, estimating that global ecosystem services represent trillions of dollars in annual value. Nevertheless, such calculations have proven insufficient to alter policy priorities. Decision-makers confronted with immediate development pressures routinely discount future ecological benefits, prioritizing visible short-term gains over abstract long-term costs. The result has been a steady erosion of natural habitats, particularly in regions where economic imperatives appear most urgent.\n\nThe fragmentation of responsibility further complicates conservation governance. Biodiversity loss is inherently transboundary—migratory species traverse multiple jurisdictions, and ecosystem degradation in one region cascades across interconnected natural systems. Yet regulatory frameworks remain predominantly national, creating coordination failures that undermine collective action. International agreements, such as the Convention on Biological Diversity, have established aspirational targets but lack enforcement mechanisms. Meanwhile, funding disparities between wealthy and developing nations generate tensions: biodiversity-rich countries, often economically constrained, bear disproportionate responsibility for protecting global natural heritage while lacking resources to implement effective measures.\n\nCorporate commitments to environmental sustainability have similarly fallen short of transformative impact. Many corporations have adopted biodiversity pledges, integrating conservation language into sustainability reports and marketing materials. Yet implementation frequently remains superficial. Supply chains continue to drive deforestation through agricultural expansion, while extraction industries operate in ecologically sensitive regions with minimal mitigation measures. Critics argue that voluntary corporate initiatives, absent robust regulatory oversight, permit companies to claim environmental responsibility while pursuing practices that degrade habitats. The proliferation of greenwashing—marketing that exaggerates environmental credentials—has eroded public trust in corporate sustainability claims.\n\nAddressing biodiversity loss requires systemic changes that transcend incremental reforms. Some experts advocate for establishing binding international frameworks with meaningful enforcement provisions, alongside substantially increased financing for conservation in developing regions. Others propose restructuring economic incentives through mechanisms like biodiversity credits or ecotourism revenue-sharing that align local economic interests with preservation goals. More fundamentally, scholars emphasize the need to reconceptualize humanity's relationship with nature—moving from an extractive paradigm that treats ecosystems as exploitable resources toward a stewardship ethic that recognizes our dependence on ecological integrity. What remains evident is that preserving biodiversity demands not merely technical solutions but a profound transformation in how societies value and govern the natural world upon which all human prosperity ultimately depends.",
    "questions": [
      {
        "num": 1,
        "type": "综合题",
        "stem": "1. surprisingly effective",
        "options": [
          "surprisingly effective",
          "intentionally limited",
          "regrettably insufficient",
          "temporarily delayed"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。surprisingly effective 与 woefully inadequate 含义相反。",
          "B": "错误。intentionally limited 不是 woefully inadequate 的含义。",
          "C": "正确。woefully inadequate 意为可悲地/令人遗憾地不足，即 regrettably insufficient。文中说 mechanisms for protecting natural habitats remain woefully inadequate。",
          "D": "错误。temporarily delayed 不是 woefully inadequate 的含义。"
        }
      },
      {
        "num": 2,
        "type": "综合题",
        "stem": "2. According to Paragraph 2, decision-makers prioritize short-term gains because ________.",
        "options": [
          "ecosystem services have no economic value",
          "conservation biologists oppose all economic development",
          "international regulations forbid habitat protection",
          "future ecological benefits are abstract and distant"
        ],
        "answer": "D",
        "explanation": {
          "A": "错误。生态系统服务有巨大经济价值（trillions of dollars）。",
          "B": "错误。保护生物学家并不反对所有经济发展。",
          "C": "错误。国际法规不禁止栖息地保护。",
          "D": "正确。第二段说 Decision-makers confronted with immediate development pressures routinely discount future ecological benefits, prioritizing visible short-term gains over abstract long-term costs，即未来生态效益是抽象和遥远的，决策者优先考虑短期可见收益。"
        }
      },
      {
        "num": 3,
        "type": "综合题",
        "stem": "3. The author mentions the Convention on Biological Diversity (Paragraph 3) to illustrate that ________.",
        "options": [
          "global coordination on biodiversity remains weak",
          "international agreements have strong enforcement mechanisms",
          "transboundary species are easily protected",
          "wealthy nations bear most conservation responsibility"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。第三段说 the Convention on Biological Diversity has established aspirational targets but lack enforcement mechanisms，且 regulatory frameworks remain predominantly national, creating coordination failures，即全球生物多样性协调仍然薄弱。",
          "B": "错误。国际协议缺乏 enforcement mechanisms。",
          "C": "错误。跨界物种不容易被保护。",
          "D": "错误。富裕国家不承担大部分保护责任——反而是 biodiversity-rich countries 承担 disproportionate responsibility。"
        }
      },
      {
        "num": 4,
        "type": "综合题",
        "stem": "4. Which of the following is true about corporate sustainability commitments according to Paragraph 4?",
        "options": [
          "They have fundamentally transformed supply chain practices.",
          "They often remain superficial without regulatory oversight.",
          "They have eliminated deforestation from agricultural expansion.",
          "They are universally trusted by the public."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。企业承诺未根本改变供应链实践。",
          "B": "正确。第四段说 implementation frequently remains superficial, supply chains continue to drive deforestation, voluntary corporate initiatives absent robust regulatory oversight permit companies to claim environmental responsibility while pursuing practices that degrade habitats，即缺乏监管监督时企业承诺往往流于表面。",
          "C": "错误。毁林未被消除。",
          "D": "错误。企业不被 universally trusted——greenwashing eroded public trust。"
        }
      },
      {
        "num": 5,
        "type": "综合题",
        "stem": "5. The best title for this text would be ________.",
        "options": [
          "Economic Development: The Priority for Policy Decisions",
          "International Frameworks: The Solution to Global Coordination",
          "Biodiversity Loss: The Challenge of Effective Conservation",
          "Corporate Sustainability: A Success Story of Environmental Action"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。经济发展不是文章主旨。",
          "B": "错误。国际框架只是对策之一。",
          "C": "正确。全文讨论生物多样性保护的挑战，从资金不足、治理碎片化、企业承诺空洞到需要的系统性变革，最佳标题应反映有效保护的挑战。",
          "D": "错误。企业可持续性不是成功案例。"
        }
      }
    ],
    "words": [
      {
        "word": "biodiversity",
        "def": "生物多样性"
      },
      {
        "word": "chronically",
        "def": "长期地"
      },
      {
        "word": "marginalized",
        "def": "边缘化的"
      },
      {
        "word": "woefully",
        "def": "极其"
      },
      {
        "word": "ecological",
        "def": "生态的"
      },
      {
        "word": "intact",
        "def": "完好无损的"
      },
      {
        "word": "filtration",
        "def": "过滤"
      },
      {
        "word": "sequestration",
        "def": "封存"
      },
      {
        "word": "pollination",
        "def": "授粉"
      },
      {
        "word": "underpin",
        "def": "支撑"
      },
      {
        "word": "quantify",
        "def": "量化"
      },
      {
        "word": "imperatives",
        "def": "紧迫之事"
      },
      {
        "word": "fragmentation",
        "def": "碎片化"
      },
      {
        "word": "transboundary",
        "def": "跨界的"
      },
      {
        "word": "traverse",
        "def": "穿越"
      },
      {
        "word": "cascades",
        "def": "级联"
      },
      {
        "word": "aspirational",
        "def": "理想的"
      },
      {
        "word": "disparities",
        "def": "差异"
      },
      {
        "word": "transformative",
        "def": "变革性的"
      },
      {
        "word": "superficial",
        "def": "表面的"
      },
      {
        "word": "deforestation",
        "def": "森林砍伐"
      },
      {
        "word": "greenwashing",
        "def": "漂绿"
      },
      {
        "word": "incremental",
        "def": "渐进的"
      },
      {
        "word": "restructuring",
        "def": "重组"
      },
      {
        "word": "ecotourism",
        "def": "生态旅游"
      },
      {
        "word": "reconceptualize",
        "def": "重新构想"
      },
      {
        "word": "extractive",
        "def": "开采的"
      },
      {
        "word": "stewardship",
        "def": "管理"
      },
      {
        "word": "integrity",
        "def": "完整性"
      }
    ]
  },
  "4-18": {
    "date": "4/18",
    "month": 4,
    "day": 18,
    "title": "Article from 4/18",
    "text": "The digital age has fundamentally transformed the concept of privacy, rendering traditional notions of personal boundaries increasingly obsolete. Where once individuals could reasonably expect their communications, movements, and transactions to remain confidential, contemporary data ecosystems now capture, aggregate, and monetize intimate details of daily life with startling precision. From smartphone location tracking to social media profiling, from e-commerce purchase histories to biometric identification systems, personal information has become a lucrative commodity—a resource extracted, processed, and traded largely without meaningful consent or oversight.\n\nThe architecture of modern data collection operates largely invisibly to ordinary users. Technology companies embed tracking mechanisms into applications and websites, harvesting behavioral data that reveals preferences, relationships, and vulnerabilities. Algorithms analyze this information to construct detailed profiles, enabling targeted advertising, personalized recommendations, and increasingly, predictive analytics that anticipate future actions. While corporations frame these practices as enhancing user experience, critics contend that the underlying business model—profiting from personal data—fundamentally conflicts with privacy interests. Users, often unaware of the extent of surveillance, face an asymmetrical relationship: they possess limited knowledge about data practices, yet corporations wield comprehensive visibility into their lives.\n\nRegulatory responses have struggled to keep pace with technological evolution. In Europe, the General Data Protection Regulation (GDPR) established groundbreaking standards for data protection, requiring explicit consent for data collection, mandating transparency about processing purposes, and granting individuals rights to access and delete their information. Yet enforcement remains challenging: multinational corporations operate across jurisdictions with varying standards, and the volume of potential violations overwhelms regulatory capacity. Moreover, the complexity of data ecosystems obscures accountability—when information passes through multiple intermediaries, determining responsibility for breaches or misuse becomes exceedingly difficult. Even where regulations exist, corporate compliance often prioritizes procedural adherence over substantive protection.\n\nThe implications extend beyond commercial exploitation. Government surveillance programs have expanded dramatically, leveraging private-sector data collection to monitor populations with unprecedented scope. Law enforcement agencies access location records, communication logs, and financial transactions without traditional warrant requirements, eroding constitutional protections that historically constrained state intrusion. National security rationales justify such measures, yet the absence of robust oversight mechanisms permits abuses that target marginalized communities disproportionately. Civil liberties advocates warn that the convergence of corporate data harvesting and state surveillance creates an architecture of control that threatens democratic freedoms.\n\nAddressing these challenges demands comprehensive reform. Some scholars advocate for data governance frameworks that treat personal information as a fundamental right rather than a commercial asset, establishing strict limits on collection and use. Others propose technical solutions: encryption by default, decentralized storage systems, and privacy-enhancing technologies that minimize data exposure. More radically, critics question whether the current data economy can be reconciled with privacy at all, suggesting that structural changes—breaking up data monopolies, imposing meaningful limitations on surveillance capitalism—may be necessary. What remains clear is that the erosion of privacy represents not merely a technical problem but a profound societal question about the boundaries between individual autonomy and collective power in an age of ubiquitous data.",
    "questions": [
      {
        "num": 1,
        "type": "综合题",
        "stem": "1. a valuable service provided freely to users",
        "options": [
          "a valuable service provided freely to users",
          "a legal requirement for data protection",
          "a technical advancement in privacy protection",
          "a profitable resource traded from personal data"
        ],
        "answer": "D",
        "explanation": {
          "A": "错误。lucrative commodity 不是免费服务。",
          "B": "错误。不是法律要求。",
          "C": "错误。不是技术进步。",
          "D": "正确。lucrative commodity 意为有利可图的商品，文中指个人信息 become a lucrative commodity—a resource extracted, processed, and traded largely without meaningful consent，即从个人数据中交易获利的盈利资源。"
        }
      },
      {
        "num": 2,
        "type": "综合题",
        "stem": "2. According to Paragraph 2, the relationship between users and corporations is described as ________.",
        "options": [
          "asymmetrical because users lack knowledge about data practices",
          "balanced because corporations provide transparency",
          "cooperative because users voluntarily share all information",
          "equal because both parties understand data collection"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。第二段说 Users face an asymmetrical relationship: they possess limited knowledge about data practices, yet corporations wield comprehensive visibility into their lives，即用户缺乏对数据实践的了解而公司拥有全面可见性。",
          "B": "错误。公司不提供 transparency。",
          "C": "错误。用户不是自愿分享所有信息。",
          "D": "错误。双方理解不对等。"
        }
      },
      {
        "num": 3,
        "type": "综合题",
        "stem": "3. The author mentions GDPR in Paragraph 3 to illustrate that ________.",
        "options": [
          "European regulations have completely solved privacy issues",
          "multinational corporations easily comply with all standards",
          "regulatory enforcement faces significant challenges",
          "data protection laws are unnecessary in the digital age"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。欧洲法规未完全解决隐私问题。",
          "B": "错误。跨国公司不易遵守所有标准。",
          "C": "正确。第三段说 enforcement remains challenging: multinational corporations operate across jurisdictions with varying standards, and the volume of potential violations overwhelms regulatory capacity，即监管执法面临重大挑战。",
          "D": "错误。数据保护法在数字时代是必要的。"
        }
      },
      {
        "num": 4,
        "type": "综合题",
        "stem": "4. Which of the following is true about government surveillance according to Paragraph 4?",
        "options": [
          "It operates with robust oversight mechanisms.",
          "It disproportionately targets marginalized communities.",
          "It respects all traditional constitutional protections.",
          "It has declined dramatically in recent years."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。缺乏 robust oversight mechanisms。",
          "B": "正确。第四段说 the absence of robust oversight mechanisms permits abuses that target marginalized communities disproportionately，即政府监控不成比例地针对边缘化社区。",
          "C": "错误。传统宪法保护被 eroded。",
          "D": "错误。监控 expanded dramatically 而非 declined。"
        }
      },
      {
        "num": 5,
        "type": "综合题",
        "stem": "5. The best title for this text would be ________.",
        "options": [
          "Privacy in the Digital Age: The Erosion of Personal Boundaries",
          "Data Protection Regulations: A Complete Solution",
          "Corporate Data Collection: Enhancing User Experience",
          "Technology Companies: Balancing Profit and Privacy"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。全文讨论数字时代隐私的侵蚀，从数据收集、监管挑战到政府监控和可能的改革，最佳标题应反映个人边界的侵蚀。",
          "B": "错误。数据保护法规不是完整解决方案。",
          "C": "错误。企业数据收集不是 enhancing user experience。",
          "D": "错误。平衡利润和隐私不是文章主旨。"
        }
      }
    ],
    "words": [
      {
        "word": "obsolete",
        "def": "过时的"
      },
      {
        "word": "confidential",
        "def": "机密的"
      },
      {
        "word": "aggregate",
        "def": "聚合"
      },
      {
        "word": "monetize",
        "def": "货币化"
      },
      {
        "word": "profiling",
        "def": "画像"
      },
      {
        "word": "biometric",
        "def": "生物识别"
      },
      {
        "word": "commodity",
        "def": "商品"
      },
      {
        "word": "oversight",
        "def": "监督"
      },
      {
        "word": "harvesting",
        "def": "收集"
      },
      {
        "word": "vulnerabilities",
        "def": "脆弱性"
      },
      {
        "word": "algorithms",
        "def": "算法"
      },
      {
        "word": "predictive",
        "def": "预测的"
      },
      {
        "word": "analytics",
        "def": "分析"
      },
      {
        "word": "asymmetrical",
        "def": "不对称的"
      },
      {
        "word": "comprehensive",
        "def": "全面的"
      },
      {
        "word": "groundbreaking",
        "def": "开创性的"
      },
      {
        "word": "mandating",
        "def": "强制"
      },
      {
        "word": "transparency",
        "def": "透明度"
      },
      {
        "word": "multinational",
        "def": "跨国的"
      },
      {
        "word": "obscures",
        "def": "掩盖"
      },
      {
        "word": "accountability",
        "def": "问责制"
      },
      {
        "word": "intermediaries",
        "def": "中介"
      },
      {
        "word": "surveillance",
        "def": "监控"
      },
      {
        "word": "leveraging",
        "def": "利用"
      },
      {
        "word": "constitutional",
        "def": "宪法的"
      },
      {
        "word": "intrusion",
        "def": "侵犯"
      },
      {
        "word": "convergence",
        "def": "融合"
      },
      {
        "word": "decentralized",
        "def": "去中心化的"
      },
      {
        "word": "encryption",
        "def": "加密"
      },
      {
        "word": "ubiquitous",
        "def": "无处不在的"
      },
      {
        "word": "autonomy",
        "def": "自主权"
      }
    ]
  },
  "4-20": {
    "date": "4/20",
    "month": 4,
    "day": 20,
    "title": "Article from 4/20",
    "text": "The automation revolution has arrived with promises of unprecedented productivity and efficiency, transforming industries from manufacturing to healthcare with breathtaking speed. Yet beneath the optimistic projections lies a more unsettling reality: the displacement of human workers at a scale and pace that existing social structures may prove inadequate to address. While technological advancement has historically created new employment opportunities alongside those it eliminated, economists increasingly question whether this iteration of automation—driven by artificial intelligence and machine learning—will follow the same pattern or fundamentally disrupt the relationship between technology and labor.\n\nThe distinctive characteristic of contemporary automation lies in its cognitive rather than merely physical capabilities. Previous waves of technological change primarily automated manual tasks, leaving knowledge work relatively untouched. Today's systems, however, perform increasingly sophisticated intellectual labor: they analyze medical images, draft legal documents, translate languages, and even generate creative content. This expansion into domains once considered uniquely human threatens occupations across the skill spectrum, from routine administrative functions to specialized professional expertise. The implications extend beyond individual job security: entire occupational categories face potential obsolescence, raising questions about how societies will organize work and distribute income in an era when human contribution to economic production may diminish substantially.\n\nThe asymmetry of automation's benefits and costs further complicates its societal impact. Productivity gains from technology historically translated into broad wage improvements and employment expansion, but recent decades have witnessed a divergence from this pattern. Corporate profits from automation accrue predominantly to shareholders and technology providers, while displaced workers bear the immediate consequences of unemployment, skill obsolescence, and downward mobility. This concentration of gains reflects not merely technological inevitability but policy choices: weakened labor protections, diminished union influence, and tax structures that favor capital over labor have enabled automation's rewards to flow upward while its burdens cascade downward. The result has been accelerating income inequality and geographic disparities, as regions dependent on automatable industries experience economic devastation while technology hubs flourish.\n\nEducational systems designed for an industrial economy face mounting pressure to adapt. Traditional curricula emphasizing routine knowledge acquisition and standardized procedures prepare students for precisely the tasks that automation renders redundant. Meanwhile, capabilities that machines struggle to replicate—creative problem-solving, emotional intelligence, ethical reasoning, collaborative adaptability—receive inadequate attention in educational frameworks optimized for measurable outcomes and vocational efficiency. The mismatch between educational outputs and labor market demands creates a skills gap that exacerbates automation's displacement effects, leaving graduates unprepared for an economy where distinctively human competencies may constitute the only sustainable competitive advantage.\n\nAddressing automation's challenges demands policy innovation beyond conventional labor market interventions. Some economists advocate for redistributive mechanisms such as universal basic income or negative income taxes that decouple survival from employment. Others emphasize proactive workforce development, investing in continuous education and reskilling programs that enable workers to transition alongside technological change. More fundamentally, scholars argue for reconceptualizing work's role in human flourishing—recognizing that meaningful activity need not coincide with paid employment and that social arrangements distributing automation's gains broadly could liberate individuals from compulsory labor. What remains evident is that passive reliance on market adjustment will prove insufficient: without deliberate intervention, automation risks deepening existing inequalities and undermining the social contract that has historically linked economic participation to livelihood security.",
    "questions": [
      {
        "num": 1,
        "type": "综合题",
        "stem": "1. slow and gradual progress",
        "options": [
          "slow and gradual progress",
          "carefully planned development",
          "astonishingly rapid pace",
          "methodical implementation"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。slow and gradual 与 breathtaking 相反。",
          "B": "错误。carefully planned 与 breathtaking 含义不符。",
          "C": "正确。breathtaking speed 意为惊人的速度，即 astonishingly rapid pace。",
          "D": "错误。methodical implementation 与 breathtaking 含义不符。"
        }
      },
      {
        "num": 2,
        "type": "综合题",
        "stem": "2. According to Paragraph 2, contemporary automation differs from previous technological changes because it ________.",
        "options": [
          "primarily targets manual and physical tasks",
          "focuses exclusively on manufacturing industries",
          "leaves knowledge work completely untouched",
          "performs increasingly sophisticated intellectual labor"
        ],
        "answer": "D",
        "explanation": {
          "A": "错误。当代自动化 targeting cognitive capabilities 而非 primarily manual tasks。",
          "B": "错误。不 exclusively 针对制造业。",
          "C": "错误。knowledge work 被 targeting 而非 untouched。",
          "D": "正确。第二段说 Today's systems perform increasingly sophisticated intellectual labor: they analyze medical images, draft legal documents, translate languages, and even generate creative content，即执行越来越复杂的智力劳动。"
        }
      },
      {
        "num": 3,
        "type": "综合题",
        "stem": "3. The author mentions \"weakened labor protections\" (Paragraph 3) to illustrate that ________.",
        "options": [
          "policy choices have enabled automation's benefits to concentrate upward",
          "workers have gained stronger bargaining positions",
          "unions have expanded their influence significantly",
          "tax structures now favor labor over capital"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。第三段说 weakened labor protections, diminished union influence, and tax structures that favor capital over labor have enabled automation's rewards to flow upward while its burdens cascade downward，即政策选择使自动化的好处向上集中。",
          "B": "错误。工人谈判地位减弱而非增强。",
          "C": "错误。工会影响力 diminished 而非 expanded。",
          "D": "错误。税收结构 favor capital over labor 而非反过来。"
        }
      },
      {
        "num": 4,
        "type": "综合题",
        "stem": "4. Which of the following is true about educational systems according to Paragraph 4?",
        "options": [
          "They adequately prepare students for creative problem-solving.",
          "Traditional curricula prepare students for tasks that automation renders redundant.",
          "Emotional intelligence receives sufficient attention in educational frameworks.",
          "They have successfully adapted to post-industrial demands."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。教育系统 inadequately prepare students for creative problem-solving。",
          "B": "正确。第四段说 Traditional curricula emphasizing routine knowledge acquisition and standardized procedures prepare students for precisely the tasks that automation renders redundant，即传统课程准备学生从事的正是自动化使之多余的任务。",
          "C": "错误。情感智力 receive inadequate attention。",
          "D": "错误。教育系统尚未成功适应后工业需求。"
        }
      },
      {
        "num": 5,
        "type": "综合题",
        "stem": "5. The best title for this text would be ________.",
        "options": [
          "Technological Advancement: Creating New Employment Opportunities",
          "Educational Reform: The Solution to Labor Market Challenges",
          "Automation Revolution: The Disruption of Technology and Labor Relations",
          "Corporate Profits: The Benefits of Productivity Gains"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。技术创造新就业机会只是引入背景。",
          "B": "错误。教育改革只是对策之一。",
          "C": "正确。全文讨论自动化革命对技术-劳工关系的颠覆性影响，从认知自动化、利益不对称到教育系统不适应和政策创新需求，最佳标题应反映自动化革命对技术和劳工关系的颠覆。",
          "D": "错误。企业利润只是其中一个方面。"
        }
      }
    ],
    "words": [
      {
        "word": "breathtaking",
        "def": "惊人的"
      },
      {
        "word": "unsettling",
        "def": "令人不安的"
      },
      {
        "word": "displacement",
        "def": "取代"
      },
      {
        "word": "iteration",
        "def": "迭代"
      },
      {
        "word": "distinctive",
        "def": "独特的"
      },
      {
        "word": "cognitive",
        "def": "认知的"
      },
      {
        "word": "sophisticated",
        "def": "复杂的"
      },
      {
        "word": "obsolescence",
        "def": "淘汰"
      },
      {
        "word": "asymmetry",
        "def": "不对称"
      },
      {
        "word": "divergence",
        "def": "分歧"
      },
      {
        "word": "accrue",
        "def": "积累"
      },
      {
        "word": "predominantly",
        "def": "主要地"
      },
      {
        "word": "cascading",
        "def": "级联的"
      },
      {
        "word": "devastation",
        "def": "毁灭"
      },
      {
        "word": "curricula",
        "def": "课程"
      },
      {
        "word": "redundant",
        "def": "多余的"
      },
      {
        "word": "adaptability",
        "def": "适应性"
      },
      {
        "word": "competencies",
        "def": "能力"
      },
      {
        "word": "redistributive",
        "def": "再分配的"
      },
      {
        "word": "decouple",
        "def": "脱钩"
      },
      {
        "word": "reskilling",
        "def": "再培训"
      },
      {
        "word": "reconceptualizing",
        "def": "重新构想"
      },
      {
        "word": "compulsory",
        "def": "强制的"
      }
    ]
  },
  "4-21": {
    "date": "4/21",
    "month": 4,
    "day": 21,
    "title": "Article from 4/21",
    "text": "The digital transformation of recruitment processes has brought unprecedented convenience to job seekers and employers alike. Yet this technological evolution has also spawned a troubling phenomenon: recruitment scams facilitated by artificial intelligence. In an era of economic uncertainty and competitive job markets, fraudsters are increasingly exploiting AI tools to deceive vulnerable individuals seeking employment, orchestrating sophisticated schemes that extract money, personal information, or both from unsuspecting victims.\n\nThe proliferation of AI-powered scams stems largely from the technology's capacity to generate convincingly personalized content with minimal effort. Historically, fraudulent job offers were often identifiable through glaring grammatical errors, vague descriptions, or obvious mismatches between advertised positions and applicants' qualifications. Today, however, AI enables scammers to craft meticulously tailored communications that reference specific career histories, skill sets, and professional aspirations, rendering traditional detection methods increasingly ineffective. Criminals can impersonate legitimate recruiters by cloning LinkedIn profiles, fabricating corporate email signatures, and producing job descriptions that mirror authentic postings with alarming precision.\n\nRecruitment scams manifest in diverse forms, each exploiting distinct vulnerabilities. \"Task scams\" typically target younger demographics, promising compensation for simple online activities such as liking social media posts or reviewing products. Initially, victims may receive modest payments, cultivating false confidence before being coerced into paying fees ostensibly required to access earned funds or upgrade their accounts. More elaborate schemes prey upon experienced professionals, impersonating headhunters who lure applicants with positions that appear meticulously customized to their credentials. These fraudsters subsequently demand payments for purported services—CV refinement, training programs, equipment procurement, or background checks—before vanishing entirely. Even when monetary losses are avoided, victims frequently surrender sensitive data, including bank details and identification documents, enabling subsequent identity theft.\n\nThe psychological toll on victims extends beyond financial damage. Research indicates that individuals deceived by recruitment scams experience profound emotional distress, often characterized by intense self-blame and diminished confidence. Victims report feeling humiliated for falling prey to deception, despite evidence suggesting that such fraud exploits universal cognitive vulnerabilities rather than individual naivety. In particularly devastating cases, victims who transferred substantial sums face not only economic hardship but also the psychological trauma of shattered trust and prolonged anxiety about future employment searches.\n\nAddressing this challenge requires coordinated action across multiple stakeholders. Experts advocate for strengthened verification protocols on online recruitment platforms, ensuring that posted positions undergo systematic legitimacy assessments before reaching applicants. Regulatory bodies must develop more robust frameworks for pursuing cross-border fraud operations, given that perpetrators frequently operate from jurisdictions beyond local enforcement reach. For individuals, heightened vigilance remains essential: skepticism toward unsolicited approaches, scrutiny of sender credentials, and direct verification with purported employers can mitigate risks. Ultimately, combating AI-enabled recruitment fraud demands not merely technological solutions but a fundamental recognition that sophisticated deception now permeates digital spaces where job seekers once reasonably expected authenticity.",
    "questions": [
      {
        "num": 1,
        "type": "综合题",
        "stem": "1. eliminated a positive trend",
        "options": [
          "eliminated a positive trend",
          "created a disturbing problem",
          "resolved a complex challenge",
          "accelerated a beneficial process"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。eliminated a positive trend 与 spawned a troubling phenomenon 含义相反。",
          "B": "正确。spawned a troubling phenomenon 意为催生了一个令人不安的现象，即 created a disturbing problem。",
          "C": "错误。resolved a complex challenge 与文意相反。",
          "D": "错误。accelerated a beneficial process 与 troubling 含义相反。"
        }
      },
      {
        "num": 2,
        "type": "综合题",
        "stem": "2. According to Paragraph 2, AI-powered recruitment scams are difficult to detect because ________.",
        "options": [
          "they employ sophisticated encryption technology",
          "fraudsters operate exclusively from remote locations",
          "job seekers lack adequate digital literacy skills",
          "AI produces highly personalized and convincing content"
        ],
        "answer": "D",
        "explanation": {
          "A": "错误。诈骗不使用 sophisticated encryption technology。",
          "B": "错误。远程位置不是难检测的原因。",
          "C": "错误。数字素养不足不是主要原因。",
          "D": "正确。第二段说 AI enables scammers to craft meticulously tailored communications that reference specific career histories, skill sets, and professional aspirations, rendering traditional detection methods increasingly ineffective，即 AI 产生高度个性化和令人信服的内容。"
        }
      },
      {
        "num": 3,
        "type": "综合题",
        "stem": "3. The author mentions \"task scams\" in Paragraph 3 to illustrate that ________.",
        "options": [
          "different scam types target distinct demographic groups",
          "young people are immune to sophisticated fraud schemes",
          "all recruitment scams primarily seek financial extraction",
          "initial payments guarantee subsequent legitimate earnings"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。第三段说 Task scams typically target younger demographics... More elaborate schemes prey upon experienced professionals，即不同类型的诈骗针对不同的人口群体。",
          "B": "错误。年轻人不是 immune 的——他们是 task scams 的目标。",
          "C": "错误。不是所有诈骗都 primarily 寻求经济榨取——有些也获取个人数据。",
          "D": "错误。初始付款不保证后续合法收入——它们用于 cultivate false confidence。"
        }
      },
      {
        "num": 4,
        "type": "综合题",
        "stem": "4. Which of the following best describes the author's attitude toward victims of recruitment scams?",
        "options": [
          "Critical and dismissive of their judgment",
          "Neutral and indifferent to their plight",
          "Sympathetic and understanding of their vulnerability",
          "Suspicious of their claims regarding financial losses"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。作者不批判受害者的判断力。",
          "B": "错误。作者不是中立或漠不关心的。",
          "C": "正确。第四段说 victims report feeling humiliated for falling prey to deception, despite evidence suggesting that such fraud exploits universal cognitive vulnerabilities rather than individual naivety，即作者同情受害者并理解他们的脆弱性，认为诈骗利用的是普遍认知弱点而非个人天真。",
          "D": "错误。作者不怀疑受害者的索赔。"
        }
      },
      {
        "num": 5,
        "type": "综合题",
        "stem": "5. The best title for this text would be ________.",
        "options": [
          "AI-Enabled Recruitment Scams: A Growing Digital Threat",
          "The Evolution of Online Job Markets: Benefits and Risks",
          "Cybersecurity Measures: Protecting Personal Information",
          "Psychological Effects: The Hidden Costs of Job Searching"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。全文讨论 AI 赋能的招聘诈骗这一新兴数字威胁，从诈骗 proliferation、多样化形式到心理影响和应对策略，最佳标题应反映 AI 招聘诈骗作为增长的数字威胁。",
          "B": "错误。在线就业市场的演变不是文章主旨。",
          "C": "错误。网络安全措施只是对策之一。",
          "D": "错误。心理影响只是其中一个方面。"
        }
      }
    ],
    "words": [
      {
        "word": "spawned",
        "def": "引发"
      },
      {
        "word": "fraudsters",
        "def": "诈骗犯"
      },
      {
        "word": "orchestrating",
        "def": "策划"
      },
      {
        "word": "proliferation",
        "def": "激增"
      },
      {
        "word": "convincingly",
        "def": "令人信服地"
      },
      {
        "word": "fraudulent",
        "def": "欺诈的"
      },
      {
        "word": "meticulously",
        "def": "细致地"
      },
      {
        "word": "impersonate",
        "def": "冒充"
      },
      {
        "word": "legitimate",
        "def": "合法的"
      },
      {
        "word": "fabricating",
        "def": "伪造"
      },
      {
        "word": "authentic",
        "def": "真实的"
      },
      {
        "word": "demographics",
        "def": "人口统计"
      },
      {
        "word": "cultivating",
        "def": "培养"
      },
      {
        "word": "coerced",
        "def": "强迫"
      },
      {
        "word": "ostensibly",
        "def": "表面上"
      },
      {
        "word": "elaborate",
        "def": "精心策划的"
      },
      {
        "word": "purported",
        "def": "声称的"
      },
      {
        "word": "procurement",
        "def": "采购"
      },
      {
        "word": "humiliated",
        "def": "感到屈辱的"
      },
      {
        "word": "trauma",
        "def": "创伤"
      },
      {
        "word": "perpetrators",
        "def": "肇事者"
      },
      {
        "word": "cross-border",
        "def": "跨境的"
      },
      {
        "word": "protocols",
        "def": "协议"
      }
    ]
  },
  "4-23": {
    "date": "4/23",
    "month": 4,
    "day": 23,
    "title": "Article from 4/23",
    "text": "The ubiquity of plastic in contemporary society is often underestimated. From packaging materials to automotive components, from medical devices to children's toys, synthetic polymers have permeated virtually every domain of modern commerce. Yet this pervasive reliance on plastic, predominantly derived from petroleum and natural gas, exposes global supply chains to vulnerabilities that geopolitical disruptions can swiftly amplify. Recent events in the Middle East have illuminated this fragility with striking clarity, triggering cascading consequences that may ultimately reach consumers worldwide through elevated prices and product shortages.\n\nThe Strait of Hormuz, a critical maritime passage connecting petroleum-producing regions to global markets, has historically served as an indispensable conduit for transporting not merely crude oil but also the chemical derivatives essential to plastic manufacturing. Petrochemical facilities across Asia, the world's preeminent producer of plastic goods, depend substantially on feedstocks traversing this passage. When regional tensions precipitated restrictions on this vital corridor, shortages of key ingredients—including naphtha, a crude-oil derivative fundamental to polymer production—emerged almost immediately. Manufacturers across China, Taiwan, and Southeast Asia invoked emergency contractual provisions, acknowledging potential delivery failures as inventories dwindled.\n\nThe ramifications extend throughout interconnected supply networks. Asia's role as the predominant manufacturing hub for exported goods means its production disruptions inevitably propagate globally. Malaysia, which produces nearly half of the world's synthetic rubber gloves, witnessed manufacturers scaling back operations or substantially raising prices as raw material costs escalated. Similar pressures afflict tire production, clothing manufacturing, and countless other industries dependent on plastic-derived inputs. In China, prices for polyethylene, polypropylene, and other common polymers surged dramatically, compelling manufacturers to absorb costs or transmit them downstream to retailers and ultimately consumers.\n\nThe pricing dynamics have proven particularly volatile. Major petrochemical corporations in North America announced successive price increases for polyethylene—initial adjustments followed by subsequent escalations that collectively represented unprecedented market behavior. Industry analysts characterized these developments as aberrant, noting that manufacturers possessing available inventory essentially determined pricing irrespective of conventional market constraints. Such conditions particularly disadvantage smaller enterprises lacking the negotiating leverage of larger competitors, forcing them to either absorb losses or risk competitive disadvantage.\n\nThe geographic concentration of petrochemical infrastructure shapes vulnerability patterns. American producers, sourcing feedstocks domestically through hydraulic fracturing rather than Middle Eastern imports, initially benefited from supply disruptions elsewhere. Nevertheless, this advantage proves incomplete: plastics manufactured from domestic inputs predominantly serve disposable applications, whereas durable materials required for automotive components and sophisticated medical equipment typically originate from oil derivatives produced abroad. Consequently, even nations with robust domestic production capacity remain susceptible to shortages affecting critical industrial applications.\n\nThe episode underscores a fundamental lesson regarding global interdependence. Consumers have gradually recognized that gasoline prices respond to distant geopolitical developments; analogous awareness must now extend to plastic dependence. The synthetic materials underpinning contemporary life connect daily existence to supply networks spanning continents, rendering the mundane objects filling households vulnerable to disruptions occurring thousands of miles away. This realization may ultimately foster reconsideration of plastic's role in modern economies—or at minimum, heightened appreciation for the complex systems delivering these ubiquitous materials.",
    "questions": [
      {
        "num": 1,
        "type": "综合题",
        "stem": "1. a series of interconnected and spreading impacts",
        "options": [
          "a series of interconnected and spreading impacts",
          "isolated and independent effects",
          "temporary and reversible changes",
          "beneficial outcomes for global markets"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。cascading consequences 意为一系列连锁反应/级联后果，即 a series of interconnected and spreading impacts。",
          "B": "错误。不是 isolated and independent effects。",
          "C": "错误。不是 temporary and reversible changes。",
          "D": "错误。不是 beneficial outcomes。"
        }
      },
      {
        "num": 2,
        "type": "综合题",
        "stem": "2. According to Paragraph 2, Asian petrochemical facilities face production difficulties because ________.",
        "options": [
          "domestic petroleum reserves have been exhausted",
          "key chemical feedstocks from the Middle East are disrupted",
          "regional competitors have monopolized market share",
          "manufacturing technologies have become obsolete"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。不是因为国内石油储备耗尽。",
          "B": "正确。第二段说 Petrochemical facilities across Asia depend substantially on feedstocks traversing this passage [Strait of Hormuz]. When regional tensions precipitated restrictions on this vital corridor, shortages of key ingredients emerged，即来自中东的关键化学原料供应被中断。",
          "C": "错误。区域竞争者垄断市场份额不是原因。",
          "D": "错误。制造技术未变得 obsolete。"
        }
      },
      {
        "num": 3,
        "type": "综合题",
        "stem": "3. The author mentions Malaysia's rubber glove industry in Paragraph 3 to illustrate that ________.",
        "options": [
          "some Asian industries remain unaffected by global disruptions",
          "Malaysian manufacturers benefit from rising polymer prices",
          "production disruptions in Asia spread to global supply networks",
          "Malaysian manufacturers dominate global polymer production"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。亚洲行业并非 unaffected。",
          "B": "错误。马来西亚制造商受损而非受益。",
          "C": "正确。第三段说 Asia's role as the predominant manufacturing hub for exported goods means its production disruptions inevitably propagate globally，马来西亚橡胶手套行业的例子说明亚洲的生产中断会 spread to global supply networks。",
          "D": "错误。马来西亚制造商不 dominate global polymer production。"
        }
      },
      {
        "num": 4,
        "type": "综合题",
        "stem": "4. It can be inferred from Paragraph 5 that American petrochemical producers ________.",
        "options": [
          "are completely immune to global supply disruptions",
          "exclusively manufacture durable plastics for industrial use",
          "depend entirely on Middle Eastern imports for feedstocks",
          "benefit from disruptions but remain partially vulnerable"
        ],
        "answer": "D",
        "explanation": {
          "A": "错误。美国生产者并非 completely immune。",
          "B": "错误。不 exclusively 制造 durable plastics。",
          "C": "错误。不 depend entirely on Middle Eastern imports。",
          "D": "正确。第五段说 American producers sourcing feedstocks domestically... initially benefited from supply disruptions elsewhere. Nevertheless, this advantage proves incomplete... plastics manufactured from domestic inputs predominantly serve disposable applications, whereas durable materials... typically originate from oil derivatives produced abroad，即美国生产者从供应中断中受益但仍部分脆弱。"
        }
      },
      {
        "num": 5,
        "type": "综合题",
        "stem": "5. The best title for this text would be ________.",
        "options": [
          "Plastic Dependence: Global Vulnerabilities in Modern Supply Chains",
          "Asian Manufacturing: The Backbone of Global Petrochemical Production",
          "Strait of Hormuz: A Critical Passage for International Trade",
          "Petroleum Prices: The Primary Driver of Consumer Cost Increases"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。全文讨论塑料依赖性导致的全球供应链脆弱性，从塑料无处不在、中东事件触发级联后果到全球 interdependence 的启示，最佳标题应反映塑料依赖性和现代供应链的全球脆弱性。",
          "B": "错误。亚洲制造业只是其中一个方面。",
          "C": "错误。霍尔木兹海峡只是一个关键节点。",
          "D": "错误。石油价格只是其中一个因素。"
        }
      }
    ],
    "words": [
      {
        "word": "ubiquity",
        "def": "无处不在"
      },
      {
        "word": "permeated",
        "def": "渗透"
      },
      {
        "word": "pervasive",
        "def": "普遍的"
      },
      {
        "word": "petroleum",
        "def": "石油"
      },
      {
        "word": "geopolitical",
        "def": "地缘政治的"
      },
      {
        "word": "amplify",
        "def": "放大"
      },
      {
        "word": "indispensable",
        "def": "不可或缺的"
      },
      {
        "word": "conduit",
        "def": "管道"
      },
      {
        "word": "derivatives",
        "def": "衍生物"
      },
      {
        "word": "preeminent",
        "def": "卓越的"
      },
      {
        "word": "feedstocks",
        "def": "原料"
      },
      {
        "word": "traversing",
        "def": "穿越"
      },
      {
        "word": "naphtha",
        "def": "石脑油"
      },
      {
        "word": "provisions",
        "def": "条款"
      },
      {
        "word": "dwindled",
        "def": "减少"
      },
      {
        "word": "ramifications",
        "def": "后果"
      },
      {
        "word": "propagate",
        "def": "传播"
      },
      {
        "word": "afflict",
        "def": "折磨"
      },
      {
        "word": "volatile",
        "def": "不稳定的"
      },
      {
        "word": "aberrant",
        "def": "异常的"
      },
      {
        "word": "susceptible",
        "def": "易受影响的"
      },
      {
        "word": "fracturing",
        "def": "压裂"
      },
      {
        "word": "analogous",
        "def": "类似的"
      },
      {
        "word": "underpinning",
        "def": "支撑"
      }
    ]
  },
  "4-25": {
    "date": "4/25",
    "month": 4,
    "day": 25,
    "title": "Article from 4/25",
    "text": "Across the developed world, local journalism is experiencing a systematic collapse. Newspapers that once anchored communities—covering city councils, school boards, and regional courts—have shuttered at an alarming pace, leaving vast swaths of territory effectively devoid of original reporting. Research indicates that over two hundred counties in the United States now lack any dedicated news source, a figure that continues to climb as advertising revenue migrates irreversibly to digital platforms. The consequences of this erosion extend far beyond cultural nostalgia: communities without local journalism exhibit diminished civic engagement, reduced electoral participation, and heightened vulnerability to misinformation.\n\nThe economic foundations of local news have undergone radical transformation. Historically, newspapers thrived on a dual-revenue model combining subscription fees with classified and display advertising, which benefited from limited competition within geographic markets. The advent of digital platforms fractured this arrangement: tech giants captured the lion's share of advertising expenditure through sophisticated targeting capabilities, while print circulation plummeted. Attempts to transition toward digital subscriptions have yielded mixed results. Many readers, accustomed to free content online, resist paying for local coverage, particularly when national outlets offer abundant alternatives at no cost. Consequently, surviving newspapers often operate with skeletal staffs—newsrooms that once employed dozens of reporters now rely on a handful of journalists covering expansive territories.\n\nThe civic implications of this decline are profound and empirically documented. Academic studies have demonstrated a strong correlation between the disappearance of local newspapers and the deterioration of municipal governance. When journalists cease attending council meetings and investigating public expenditures, government accountability deteriorates measurably. Research examining communities that lost their primary news source found subsequent increases in municipal borrowing costs, as creditors priced in the heightened risk of unchecked financial mismanagement. Furthermore, electoral participation declines in news-desert communities, particularly in local elections where name recognition substitutes for informed deliberation. Incumbents benefit disproportionately from reduced coverage, facing fewer challengers and less scrutiny during campaigns.\n\nMisinformation flourishes in the void left by professional journalism. When authoritative local reporting vanishes, residents turn to alternative information sources—social media feeds, partisan blogs, and community rumor networks—that prioritize engagement over accuracy. These channels frequently amplify sensationalist narratives and unverified claims, distorting public understanding of local issues. Studies have documented instances where communities without newspapers experienced proliferation of conspiracy theories regarding municipal decisions, from zoning disputes to public health measures. The absence of fact-based reporting not only deprives citizens of reliable information but also erodes the shared factual foundation necessary for productive democratic discourse.\n\nAddressing this crisis demands innovative approaches that transcend conventional business models. Some jurisdictions have experimented with tax incentives supporting nonprofit news organizations, while philanthropic foundations increasingly subsidize investigative journalism initiatives. Legislative proposals including local journalism tax credits and public funding mechanisms have garnered bipartisan support in several regions. Additionally, some communities have embraced cooperative ownership structures, transforming failing newspapers into reader-supported enterprises. Yet skeptics question whether these interventions can achieve sufficient scale to reverse systemic decline. What remains evident is that preserving local journalism requires treating it not merely as a commercial enterprise but as essential civic infrastructure—comparable to libraries and public schools—whose value transcends market metrics and warrants collective investment for democratic preservation.",
    "questions": [
      {
        "num": 1,
        "type": "综合题",
        "stem": "1. areas where news is distributed exclusively online",
        "options": [
          "areas where news is distributed exclusively online",
          "regions with abundant local newspaper circulation",
          "communities lacking access to original local reporting",
          "neighborhoods that heavily rely on social media for information"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。不是 exclusively online。",
          "B": "错误。不是 abundant circulation。",
          "C": "正确。news-desert communities 指 communities without local journalism / communities that lost their primary news source，即缺乏原创本地新闻报道的社区。",
          "D": "错误。不是 heavily rely on social media。"
        }
      },
      {
        "num": 2,
        "type": "综合题",
        "stem": "2. According to Paragraph 2, the economic decline of local newspapers is primarily attributable to ________.",
        "options": [
          "digital platforms capturing advertising revenue and declining circulation",
          "rising production costs for print newspapers",
          "government regulations restricting press freedom",
          "readers' preference for television news over print media"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。第二段说 tech giants captured the lion's share of advertising expenditure... while print circulation plummeted，即数字平台攫取广告收入和发行量暴跌是主要原因。",
          "B": "错误。生产成本上升不是主要原因。",
          "C": "错误。政府限制新闻自由不是原因。",
          "D": "错误。读者偏好电视新闻不是原因。"
        }
      },
      {
        "num": 3,
        "type": "综合题",
        "stem": "3. The author cites research on municipal borrowing costs (Paragraph 3) to demonstrate that ________.",
        "options": [
          "local newspapers actively participate in financial management",
          "creditors discriminate against communities without news sources",
          "government accountability improves with reduced media scrutiny",
          "absence of journalism correlates with weakened financial oversight"
        ],
        "answer": "D",
        "explanation": {
          "A": "错误。报纸不积极参与财务管理。",
          "B": "错误。债权人不对社区歧视。",
          "C": "错误。政府问责制随媒体审查减少而恶化而非改善。",
          "D": "正确。第三段说 Research examining communities that lost their primary news source found subsequent increases in municipal borrowing costs, as creditors priced in the heightened risk of unchecked financial mismanagement，即缺乏新闻与 weakened financial oversight 相关。"
        }
      },
      {
        "num": 4,
        "type": "综合题",
        "stem": "4. Which of the following best describes the author's attitude toward proposed solutions for the journalism crisis?",
        "options": [
          "Entirely optimistic that market forces will resolve the issue",
          "Cautiously acknowledging efforts while recognizing their limitations",
          "Strongly skeptical that any intervention could be effective",
          "Indifferent to policy debates surrounding journalism funding"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。作者不 entirely optimistic。",
          "B": "正确。最后一段提到 tax incentives, philanthropic foundations, legislative proposals, cooperative ownership 等创新方法，但同时说 skeptics question whether these interventions can achieve sufficient scale to reverse systemic decline，即作者谨慎地认可努力同时认识到其局限性。",
          "C": "错误。作者不 strongly skeptical 所有干预。",
          "D": "错误。作者关心政策辩论而非漠不关心。"
        }
      },
      {
        "num": 5,
        "type": "综合题",
        "stem": "5. The best title for this text would be ________.",
        "options": [
          "Digital Platforms: The Winners of the News Industry",
          "Municipal Governance: The Cost of Media Concentration",
          "Local Journalism's Collapse: A Threat to Democratic Accountability",
          "Nonprofit News: The Future of Community Reporting"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。数字平台不是文章主旨。",
          "B": "错误。市政治理只是其中一个方面。",
          "C": "正确。全文讨论地方新闻业的系统性崩溃及其对民主问责制的威胁，从经济转型、公民影响到虚假信息泛滥和可能的解决方案，最佳标题应反映地方新闻崩溃对民主问责的威胁。",
          "D": "错误。非营利新闻只是对策之一。"
        }
      }
    ],
    "words": [
      {
        "word": "systematic",
        "def": "系统的"
      },
      {
        "word": "collapse",
        "def": "崩溃"
      },
      {
        "word": "anchored",
        "def": "扎根"
      },
      {
        "word": "shuttered",
        "def": "关闭"
      },
      {
        "word": "devoid",
        "def": "缺乏"
      },
      {
        "word": "irreversibly",
        "def": "不可逆转地"
      },
      {
        "word": "nostalgia",
        "def": "怀旧"
      },
      {
        "word": "civic",
        "def": "公民的"
      },
      {
        "word": "electoral",
        "def": "选举的"
      },
      {
        "word": "dual-revenue",
        "def": "双收入"
      },
      {
        "word": "advent",
        "def": "到来"
      },
      {
        "word": "fractured",
        "def": "分裂"
      },
      {
        "word": "plummeted",
        "def": "暴跌"
      },
      {
        "word": "skeletal",
        "def": "精简的"
      },
      {
        "word": "empirically",
        "def": "经验上"
      },
      {
        "word": "correlation",
        "def": "相关性"
      },
      {
        "word": "deterioration",
        "def": "恶化"
      },
      {
        "word": "municipal",
        "def": "市政的"
      },
      {
        "word": "accountability",
        "def": "问责制"
      },
      {
        "word": "mismanagement",
        "def": "管理不善"
      },
      {
        "word": "incumbents",
        "def": "现任者"
      },
      {
        "word": "sensationalist",
        "def": "耸人听闻的"
      },
      {
        "word": "unverified",
        "def": "未经证实的"
      },
      {
        "word": "conspiracy",
        "def": "阴谋"
      },
      {
        "word": "philanthropic",
        "def": "慈善的"
      },
      {
        "word": "cooperative",
        "def": "合作的"
      },
      {
        "word": "skepticism",
        "def": "怀疑"
      }
    ]
  },
  "4-26": {
    "date": "4/26",
    "month": 4,
    "day": 26,
    "title": "Article from 4/26",
    "text": "Screen time has been linked to a bewildering array of health issues, from depression and anxiety to obesity, poor sleep, and even suicide. Headlines routinely warn parents that smartphones are rotting children's brains, while policymakers scramble to introduce bans on social media use by minors. Yet beneath this avalanche of alarming statistics lies a fundamental methodological problem that most studies fail to address: the crucial distinction between correlation and causation.\n\nThe vast majority of screen time research relies on correlational designs, which can identify associations but cannot determine directionality. Do screens cause depression, or do depressed individuals spend more time on screens? Or could a third variable—such as social isolation or academic stress—influence both? Researchers have begun conducting meta-analyses that aggregate hundreds of high-quality studies using sophisticated statistical techniques. When this is done, the purported harm often diminishes substantially. A landmark 2019 study by Amy Orben and Andrew Przybylski at the University of Oxford examined over 20,000 factors affecting adolescent well-being and found that screen use accounted for merely 0.4 per cent of the variance—a negative effect comparable in magnitude to eating potatoes. By contrast, being bullied was associated with more than four times this effect, while adequate sleep and regular breakfast consumption showed far larger positive associations.\n\nA further complication arises from the imprecise definition of \"screen time\" itself. Watching educational television, doomscrolling through social media, video-calling family members, and reading an e-book all involve staring at a screen, yet intuitively we would expect their psychological impacts to differ considerably. Most studies employ crude self-reported measures of total screen hours, which are notoriously unreliable—people systematically underestimate their usage. Even narrowing the focus to social media reveals enormous heterogeneity: engaging in heated political arguments on a public platform at 3am is qualitatively distinct from exchanging supportive messages with close friends via a private messaging application.\n\nRecent research has attempted to parse these nuances. A 2024 meta-analysis published in SSM—Mental Health found small positive correlations between well-being and using social media for meaningful communication or maintaining social connections. Conversely, it identified small negative correlations with upward social comparison and what researchers term \"problematic use\"—behavioural patterns resembling addiction. These findings, while hardly revolutionary, underscore that the relationship between technology and well-being is not monolithic but contingent upon how, why, and in what context digital tools are employed.\n\nGiven the potential for harm, some argue for adopting the precautionary principle, particularly regarding children. The UK and Australian governments have introduced or proposed restrictions on minors' access to social media platforms. Critics counter that such measures may deprive young people of the genuine benefits of digital connectivity—information access, social support, and creative expression. What the evidence suggests is that, at the population level, both the positive and negative effects of screens are modest. However, this average masks significant individual variation: a subset of users experiences disproportionately severe harms, and identifying the characteristics that render certain individuals vulnerable remains an urgent research priority.",
    "questions": [
      {
        "num": 1,
        "type": "词义推断题",
        "stem": "1. The word \"monolithic\" (Paragraph 4) most probably means ________.",
        "options": [
          "uniform and unchanging",
          "complex and multifaceted",
          "harmful and destructive",
          "beneficial and progressive"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。monolithic 意为\"单一的、不变的\"，文中说科技与幸福感的关系并非单一的（not monolithic），而是取决于使用方式和语境，强调其多样性。",
          "B": "错误。complex and multifaceted（复杂多面的）恰好与 monolithic 意思相反，是文中描述的实际情况，而非该词本身的含义。",
          "C": "错误。harmful and destructive（有害的破坏性的）与该词无关，文中并未在此处讨论危害性。",
          "D": "错误。beneficial and progressive（有益的进步的）同样与该词无关，属于过度引申。"
        }
      },
      {
        "num": 2,
        "type": "细节理解题",
        "stem": "2. According to Paragraph 2, the Oxford study found that ________.",
        "options": [
          "screen use has a negligible impact on adolescent well-being",
          "being bullied has little effect on teenagers' mental health",
          "eating potatoes is more harmful than using screens",
          "adequate sleep has minimal positive effects on well-being"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。Oxford 研究发现屏幕使用仅占青少年幸福感变异的 0.4%，影响微乎其微（negligible），与吃土豆的负面影响相当。",
          "B": "错误。研究发现被欺凌的负面影响是屏幕使用的四倍以上，影响显著而非微小。",
          "C": "错误。研究说屏幕使用的负面影响与吃土豆相当（comparable），而非吃土豆更有害，选项曲解了比较关系。",
          "D": "错误。研究发现充足睡眠对幸福感有 far larger positive associations（大得多的正面关联），而非 minimal（微小的）。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. The author mentions the 2024 meta-analysis (Paragraph 4) to illustrate that ________.",
        "options": [
          "social media use is inherently harmful regardless of context",
          "the impact of technology depends on how it is used",
          "problematic social media use affects all users equally",
          "researchers have reached a consensus on screen time effects"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。研究发现社交媒体用于有意义交流时甚至有小的正面关联，并非 inherently harmful（固有地有害）。",
          "B": "正确。该研究表明社交媒体用于沟通和维持社交连接有正面关联，而向上比较和问题性使用有负面关联，说明影响取决于使用方式。",
          "C": "错误。研究发现影响因人而异（individual variation），并非所有用户同等受影响。",
          "D": "错误。文中提到研究仍在进行中（still-evolving research），远未达成共识。"
        }
      },
      {
        "num": 4,
        "type": "细节理解题",
        "stem": "4. What does the author say about self-reported screen time data (Paragraph 3)?",
        "options": [
          "It is the most reliable method for measuring screen usage.",
          "It tends to overestimate actual screen time.",
          "It systematically underestimates actual usage.",
          "It accurately captures qualitative differences in screen activities."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。文中明确指出自我报告数据 notoriously unreliable（ notoriously 不可靠），绝非最可靠的方法。",
          "B": "错误。文中说 people systematically underestimate their usage（人们系统性低估使用时间），而非高估。",
          "C": "正确。第三段明确指出自我报告的屏幕时间数据 notoriously unreliable，人们系统性地低估自己的使用量。",
          "D": "错误。自我报告数据只计算总时长，无法捕捉不同屏幕活动的质的差异（qualitative differences）。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "The Hidden Dangers of Screen Time: What Parents Must Know",
          "Screen Time and Health: Separating Correlation from Causation",
          "Why Social Media Bans Are the Only Solution for Teen Mental Health",
          "The Unstoppable Rise of Digital Technology in Modern Life"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。该标题偏向警示性，而文章核心观点是屏幕时间的影响被夸大了，并非强调\"隐藏的危险\"。",
          "B": "正确。全文围绕屏幕时间与健康的关系展开，反复强调区分相关性和因果性的重要性，该标题准确概括了文章主旨。",
          "C": "错误。文章讨论了社交媒体禁令的争议性，认为可能剥夺数字连接的益处，并非主张禁令是\"唯一解决方案\"。",
          "D": "错误。该标题过于宽泛，与文章聚焦的屏幕时间健康影响这一具体议题不符。"
        }
      }
    ],
    "words": [
      {
        "word": "correlation",
        "def": "相关性"
      },
      {
        "word": "causation",
        "def": "因果关系"
      },
      {
        "word": "directionality",
        "def": "方向性"
      },
      {
        "word": "meta-analyses",
        "def": "元分析"
      },
      {
        "word": "aggregating",
        "def": "聚合"
      },
      {
        "word": "sophisticated",
        "def": "复杂的"
      },
      {
        "word": "diminishes",
        "def": "减少，降低"
      },
      {
        "word": "landmark",
        "def": "里程碑"
      },
      {
        "word": "variance",
        "def": "方差"
      },
      {
        "word": "negligible",
        "def": "可忽略的"
      },
      {
        "word": "magnitude",
        "def": "幅度"
      },
      {
        "word": "imprecise",
        "def": "不精确的"
      },
      {
        "word": "heterogeneity",
        "def": "异质性"
      },
      {
        "word": "notoriously",
        "def": "著名地"
      },
      {
        "word": "underestimate",
        "def": "低估"
      },
      {
        "word": "qualitatively",
        "def": "定性地"
      },
      {
        "word": "contingent",
        "def": "取决于"
      },
      {
        "word": "upward social comparison",
        "def": "向上社会比较"
      },
      {
        "word": "problematic use",
        "def": "问题性使用"
      },
      {
        "word": "precautionary principle",
        "def": "预防原则"
      },
      {
        "word": "deprive",
        "def": "剥夺"
      },
      {
        "word": "monolithic",
        "def": "单一的"
      },
      {
        "word": "disproportionately",
        "def": "不成比例地"
      },
      {
        "word": "vulnerable",
        "def": "脆弱的"
      }
    ]
  },
  "6-17": {
    "date": "6/17",
    "month": 6,
    "day": 17,
    "title": "Article from 6/17",
    "text": "The accelerating proliferation of antimicrobial resistance represents one of the most consequential yet inadequately addressed threats to global public health. According to a comprehensive assessment published by the Lancet in 2024, drug-resistant infections were directly responsible for approximately 1.27 million deaths worldwide in 2022, surpassing the annual mortality attributed to HIV/AIDS and malaria combined. The World Health Organisation has repeatedly warned that without coordinated international action, humanity is approaching a post-antibiotic era in which routine surgical procedures, cancer chemotherapy, and organ transplantation would carry mortality risks comparable to those of the pre-antibiotic era. Yet despite the gravity of these projections, investment in novel antimicrobial agents has stagnated, with only twelve new antibiotics reaching the market between 2017 and 2023.\n\nThe drivers of resistance are multifaceted and deeply embedded in contemporary agricultural and medical practices. Approximately 73 per cent of all antibiotics sold globally are administered to livestock rather than humans, primarily as growth promoters rather than therapeutic interventions. This prophylactic application creates ideal conditions for the evolution and dissemination of resistant bacterial strains, which subsequently transfer to human populations through environmental contamination and food chain transmission. In clinical settings, the overprescription of broad-spectrum antibiotics for viral infections—where they confer no therapeutic benefit—further accelerates selective pressure favouring resistant organisms. Researchers estimate that unnecessary antibiotic prescriptions constitute between 28 and 45 per cent of all outpatient dispensations in industrialised nations.\n\nThe economic disincentives surrounding antibiotic development constitute a particularly vexing structural barrier. Unlike medications for chronic conditions, which generate sustained revenue through prolonged use, novel antibiotics are prescribed sparingly to preserve their efficacy—a responsible stewardship practice that nonetheless undermines pharmaceutical companies' financial incentive to invest in research and development. The average cost of bringing a new antibiotic to market exceeds one billion US dollars, yet expected revenues rarely justify this investment. Consequently, several major pharmaceutical corporations have abandoned antimicrobial research entirely, leaving a pipeline that experts describe as insufficient to address the escalating resistance crisis.\n\nAddressing the antimicrobial resistance challenge demands coordinated interventions across multiple sectors. Infections surveillance systems require strengthening to detect resistant outbreaks in real time, agricultural practices must transition away from routine antibiotic use, and innovative financing mechanisms—such as subscription-based reimbursement models that decouple pharmaceutical revenue from prescription volume—must be implemented to revitalise the antibiotic development pipeline. Researchers emphasise that delayed action will exact an exponentially increasing toll, with projections suggesting that drug-resistant infections could account for 10 million deaths annually by 2050 if current trajectories persist. Whether the international community possesses the political resolve to implement these necessary reforms before the window of opportunity closes remains an open question of profound significance.",
    "questions": [
      {
        "num": 1,
        "type": "细节理解题",
        "stem": "1. According to Paragraph 1, what did the 2024 Lancet assessment reveal?",
        "options": [
          "Drug-resistant infections caused fewer deaths than HIV/AIDS and malaria combined.",
          "Drug-resistant infections caused more deaths than HIV/AIDS and malaria combined.",
          "Only twelve new antibiotics were developed between 2017 and 2023.",
          "The post-antibiotic era has already arrived in most countries."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。原文指出耐药感染死亡人数 surpassed（超过）HIV/AIDS和malaria的总和，而非 fewer than。",
          "B": "正确。原文明确指出 drug-resistant infections were directly responsible for approximately 1.27 million deaths... surpassing the annual mortality attributed to HIV/AIDS and malaria combined。",
          "C": "错误。twelve antibiotics 是第二句提到的市场投放数字，不是 Lancet 评估的核心发现。",
          "D": "错误。原文说 approaching a post-antibiotic era，是正在接近而非已经到来。"
        }
      },
      {
        "num": 2,
        "type": "词义推断题",
        "stem": "2. The word 'prophylactic' (Paragraph 2) most probably means ________.",
        "options": [
          "therapeutic and curative in nature",
          "preventive or protective against disease",
          "experimental and untested",
          "administered only after infection occurs"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。prophylactic 与 therapeutic（治疗性的）不同，侧重预防而非治疗。",
          "B": "正确。prophylactic 意为预防性的，文中指抗生素被用作生长促进剂而非治疗，属预防性应用。",
          "C": "错误。prophylactic 不涉及实验性或未测试的含义。",
          "D": "错误。prophylactic 是在感染前使用，而非 infection occurs 之后。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. What can be inferred about the economic model for antibiotic development from Paragraph 3?",
        "options": [
          "Pharmaceutical companies earn more from antibiotics than from chronic disease medications.",
          "Responsible stewardship practices reduce the financial incentive to develop new antibiotics.",
          "The cost of developing new antibiotics is negligible for major pharmaceutical companies.",
          "All major pharmaceutical companies continue to invest heavily in antimicrobial research."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。原文说慢性病药物产生 sustained revenue，而抗生素因 sparingly prescribed 而收入有限，并非 antibiotics 赚得更多。",
          "B": "正确。文中指出 novel antibiotics are prescribed sparingly to preserve their efficacy—a responsible stewardship practice that nonetheless undermines pharmaceutical companies' financial incentive，即负责任的使用反而削弱了经济激励。",
          "C": "错误。原文说 average cost exceeds one billion US dollars，成本极高而非 negligible。",
          "D": "错误。原文说 several major pharmaceutical corporations have abandoned antimicrobial research entirely，并非全部继续投资。"
        }
      },
      {
        "num": 4,
        "type": "例证题",
        "stem": "4. The author mentions that 73 per cent of antibiotics are administered to livestock (Paragraph 2) in order to ________.",
        "options": [
          "demonstrate that veterinary medicine is more advanced than human medicine",
          "illustrate how agricultural practices contribute to the resistance crisis",
          "prove that livestock are more susceptible to infections than humans",
          "argue that all antibiotic use in agriculture should be banned immediately"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。原文未比较兽医和人类医学的先进程度。",
          "B": "正确。引用73%的数据是为了说明农业实践如何加剧耐药性危机——抗生素作为生长促进剂而非治疗用途，创造了耐药菌株进化的理想条件。",
          "C": "错误。原文讨论的是抗生素使用量，而非牲畜易感性。",
          "D": "错误。原文虽批评农业抗生素使用，但未提出 immediately ban 的极端主张，属过度推断。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "The Success of Pharmaceutical Innovation in Combating Infections",
          "Antimicrobial Resistance: A Looming Crisis Demanding Urgent Action",
          "Why Agricultural Antibiotic Use Should Be Completely Prohibited",
          "The Economic Benefits of Subscription-Based Drug Reimbursement"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文章指出抗生素研发投资停滞，多家药企退出，并非成功故事。",
          "B": "正确。全文围绕抗生素耐药性这一迫在眉睫的危机展开，从死亡率、驱动因素、经济障碍到解决方案系统论述，标题准确概括了紧迫性和严重性。",
          "C": "错误。农业抗生素只是文章讨论的驱动因素之一，非主旨。",
          "D": "错误。订阅式报销模式只是文中提及的解决方案之一，非主旨。"
        }
      }
    ],
    "words": [
      {
        "word": "proliferation",
        "def": "激增，扩散"
      },
      {
        "word": "antimicrobial",
        "def": "抗微生物的"
      },
      {
        "word": "consequential",
        "def": "重要的，产生重大后果的"
      },
      {
        "word": "inadequately",
        "def": "不充分地"
      },
      {
        "word": "mortality",
        "def": "死亡率"
      },
      {
        "word": "surpassing",
        "def": "超过，超越"
      },
      {
        "word": "projections",
        "def": "预测，推测"
      },
      {
        "word": "stagnated",
        "def": "停滞的"
      },
      {
        "word": "multifaceted",
        "def": "多层面的"
      },
      {
        "word": "therapeutic",
        "def": "治疗的，疗效的"
      },
      {
        "word": "prophylactic",
        "def": "预防性的"
      },
      {
        "word": "dissemination",
        "def": "传播，散布"
      },
      {
        "word": "contamination",
        "def": "污染"
      },
      {
        "word": "overprescription",
        "def": "过度处方"
      },
      {
        "word": "broad-spectrum",
        "def": "广谱的"
      },
      {
        "word": "selective pressure",
        "def": "选择性压力"
      },
      {
        "word": "dispensations",
        "def": "配发，发放"
      },
      {
        "word": "disincentives",
        "def": "抑制因素，负激励"
      },
      {
        "word": "stewardship",
        "def": "管理，负责任的使用"
      },
      {
        "word": "reimbursement",
        "def": "报销，补偿"
      },
      {
        "word": "decouple",
        "def": "使脱钩，使分离"
      },
      {
        "word": "surveillance",
        "def": "监测，监控"
      },
      {
        "word": "trajectories",
        "def": "轨迹，发展趋势"
      },
      {
        "word": "exponentially",
        "def": "指数级地"
      },
      {
        "word": "resolve",
        "def": "决心，决断力"
      }
    ]
  },
  "6-18": {
    "date": "6/18",
    "month": 6,
    "day": 18,
    "title": "Article from 6/18",
    "text": "The proliferation of direct-to-consumer genetic testing services has democratised access to genomic information while simultaneously generating profound ethical dilemmas regarding the governance of this uniquely sensitive category of personal data. By the close of 2024, more than 30 million individuals worldwide had submitted DNA samples to commercial testing platforms, often providing irrevocable consent through user agreements whose implications extend far beyond the immediate consumer transaction. Genetic data, unlike most categories of personal information, simultaneously identifies the individual from whom it derives and reveals probabilistic information about biological relatives who never provided consent—a structural feature that confounds conventional frameworks of individual privacy rights.\n\nLaw enforcement applications of consumer genetic databases have generated particular controversy. Investigators have increasingly leveraged genealogical databases to identify suspects in cold-case investigations through partial DNA matches with distant relatives, a technique that resolved several high-profile homicide cases between 2018 and 2023. Yet civil liberties advocates contend that such practices effectively conscript millions of unwitting individuals into a forensic database without explicit authorisation. A 2023 analysis published in Science estimated that approximately 60 per cent of Americans of European descent could be identified through third-cousin matches in existing commercial databases, even if they had never personally submitted genetic material—a finding that fundamentally challenges traditional conceptions of informed consent.\n\nThe insurance and employment dimensions of genetic data governance raise equally consequential concerns. While the Genetic Information Nondiscrimination Act of 2008 prohibits health insurers and employers in the United States from discriminating based on genetic information, this legislation contains significant gaps—life insurance, disability insurance, and long-term care insurance remain entirely unregulated, creating economic incentives for insurers to incorporate genetic risk profiles into underwriting decisions. Researchers suggest that as predictive genetic technologies advance, individuals identified as harbouring elevated risks for late-onset conditions such as Alzheimer's disease or Huntington's disease may face systematic exclusion from financial protection mechanisms, potentially creating what some scholars term genetic underclasses.\n\nInternational harmonisation of genetic privacy frameworks remains elusive despite repeated calls for coordinated action. Jurisdictions differ substantially in their treatment of genetic information: the European Union's General Data Protection Regulation classifies genetic data as a special category requiring heightened protections, whereas regulatory approaches in many Asian and Latin American jurisdictions remain underdeveloped. This regulatory fragmentation creates opportunities for regulatory arbitrage, whereby commercial operators relocate data processing activities to jurisdictions offering minimal oversight. Experts emphasise that the irreversibility of genetic disclosure—once exposed, an individual's genetic profile cannot be recalled or reset like a compromised password—demands particularly robust safeguards. Whether the international community can establish effective governance before genetic surveillance becomes embedded in routine commercial and governmental practices remains an open question of considerable urgency.",
    "questions": [
      {
        "num": 1,
        "type": "词义推断题",
        "stem": "1. The word 'irrevocable' (Paragraph 1) most probably means ________.",
        "options": [
          "easily withdrawn or cancelled",
          "incapable of being undone or recalled",
          "automatically renewed each year",
          "limited to specific medical conditions"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。irrevocable 与 easily withdrawn 含义相反，前者强调不可撤销。",
          "B": "正确。irrevocable 意为不可撤销的、不可挽回的，文中指消费者通过用户协议给出的同意一旦提供便无法收回。",
          "C": "错误。automatically renewed 与 irrevocable 的含义无关。",
          "D": "错误。irrevocable 描述同意的性质，与医疗条件无关。"
        }
      },
      {
        "num": 2,
        "type": "细节理解题",
        "stem": "2. According to Paragraph 2, what did the 2023 Science analysis estimate?",
        "options": [
          "Only 6 per cent of Americans could be identified through commercial databases.",
          "Approximately 60 per cent of European-descended Americans could be identified through third-cousin matches.",
          "All Americans had personally submitted DNA to commercial databases.",
          "Genealogical databases failed to resolve any cold-case homicides."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。原文数字是 60% 而非 6%，且对象是 European-descended Americans。",
          "B": "正确。原文明确指出 approximately 60 per cent of Americans of European descent could be identified through third-cousin matches in existing commercial databases。",
          "C": "错误。原文说他们 even if they had never personally submitted genetic material 仍可被识别，并非全部都提交过。",
          "D": "错误。原文指出此技术 resolved several high-profile homicide cases，并非未解决任何案件。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. What can be inferred about the Genetic Information Nondiscrimination Act of 2008?",
        "options": [
          "It comprehensively protects against all forms of genetic discrimination.",
          "It applies to all types of insurance including life and disability insurance.",
          "It contains gaps that leave certain insurance categories unregulated.",
          "It has been replaced by more recent legislation in the United States."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。原文明确指出 this legislation contains significant gaps，并非全面保护。",
          "B": "错误。原文说 life insurance, disability insurance, and long-term care insurance remain entirely unregulated，与该选项相反。",
          "C": "正确。文中指出该法案包含显著漏洞，特别是 life insurance、disability insurance 和 long-term care insurance 不在监管范围内。",
          "D": "错误。文中未提及该法案被新立法取代。"
        }
      },
      {
        "num": 4,
        "type": "例证题",
        "stem": "4. The author mentions Alzheimer's disease and Huntington's disease (Paragraph 3) in order to ________.",
        "options": [
          "argue that all genetic testing should be banned immediately",
          "illustrate potential late-onset conditions that may lead to insurance exclusion",
          "prove that these diseases have no genetic component",
          "show that current insurance practices are entirely fair"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。原文未主张全面禁止基因检测，仅讨论监管缺陷。",
          "B": "正确。引用这两种疾病作为晚发性疾病的例子，说明遗传风险信息可能导致保险系统性排斥，形成所谓 genetic underclasses。",
          "C": "错误。这两种疾病恰恰是有明确遗传成分的疾病，原文以此为例。",
          "D": "错误。原文批评现有保险实践存在系统性问题，而非肯定其公平性。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "Genetic Privacy: Governance Challenges in the Age of Consumer DNA Testing",
          "Why Direct-to-Consumer Genetic Testing Should Be Universally Banned",
          "The Complete Success of International Genetic Data Regulation",
          "How Law Enforcement Has Eliminated All Cold-Case Homicides"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。全文围绕消费者基因检测时代的隐私治理挑战展开，从不可逆同意、执法应用、保险歧视到国际监管碎片化系统论述。",
          "B": "错误。文章未主张全面禁止基因检测，而是讨论治理框架。",
          "C": "错误。原文明确指出 international harmonisation remains elusive，监管远未成功。",
          "D": "错误。原文只提到 several high-profile cases 被破，并非消除所有冷案。"
        }
      }
    ],
    "words": [
      {
        "word": "proliferation",
        "def": "激增，扩散"
      },
      {
        "word": "direct-to-consumer",
        "def": "直接面向消费者的"
      },
      {
        "word": "democratised",
        "def": "民主化的，普及化的"
      },
      {
        "word": "genomic",
        "def": "基因组的"
      },
      {
        "word": "dilemmas",
        "def": "困境，两难"
      },
      {
        "word": "irrevocable",
        "def": "不可撤销的"
      },
      {
        "word": "probabilistic",
        "def": "概率的，可能性的"
      },
      {
        "word": "confounds",
        "def": "使困惑，使混乱"
      },
      {
        "word": "genealogical",
        "def": "家谱的，宗谱的"
      },
      {
        "word": "leveraged",
        "def": "利用，杠杆运用"
      },
      {
        "word": "cold-case",
        "def": "悬而未决的案件"
      },
      {
        "word": "homicide",
        "def": "杀人案"
      },
      {
        "word": "civil liberties",
        "def": "公民自由权"
      },
      {
        "word": "advocates",
        "def": "倡导者，支持者"
      },
      {
        "word": "conscript",
        "def": "强征，强迫纳入"
      },
      {
        "word": "unwitting",
        "def": "不知情的"
      },
      {
        "word": "forensic",
        "def": "法医的，司法的"
      },
      {
        "word": "consequential",
        "def": "重要的，重大影响的"
      },
      {
        "word": "underwriting",
        "def": "承保，核保"
      },
      {
        "word": "harbouring",
        "def": "怀有，藏有"
      },
      {
        "word": "late-onset",
        "def": "晚发型的"
      },
      {
        "word": "Alzheimer's disease",
        "def": "阿尔茨海默病"
      },
      {
        "word": "Huntington's disease",
        "def": "亨廷顿舞蹈病"
      },
      {
        "word": "harmonisation",
        "def": "协调，统一"
      },
      {
        "word": "elusive",
        "def": "难以捉摸的，难以实现的"
      },
      {
        "word": "fragmentation",
        "def": "碎片化"
      },
      {
        "word": "arbitrage",
        "def": "套利"
      },
      {
        "word": "irreversibility",
        "def": "不可逆转性"
      },
      {
        "word": "compromised",
        "def": "受损的，被攻破的"
      },
      {
        "word": "safeguards",
        "def": "保障措施"
      }
    ]
  },
  "6-4": {
    "date": "6/4",
    "month": 6,
    "day": 4,
    "title": "Article from 6/4",
    "text": "Social isolation and loneliness have emerged as significant yet underappreciated determinants of public health, with consequences that researchers now compare to those of smoking or obesity. A comprehensive meta-analysis published in the Proceedings of the National Academy of Sciences synthesised data from over 90 longitudinal studies encompassing more than two million participants, finding that individuals reporting persistent loneliness faced a 26 per cent higher mortality risk than their socially integrated counterparts, even after controlling for socioeconomic status and pre-existing health conditions. The magnitude of this association suggests that addressing social disconnection may yield substantial public health dividends, yet policy responses have lagged far behind the accumulation of empirical evidence.\n\nThe biological mechanisms linking loneliness to adverse health outcomes operate through multiple interconnected pathways. Chronic social isolation appears to amplify stress hormone production, particularly cortisol, while simultaneously suppressing immune function. A 2023 study at the University of California demonstrated that lonely individuals exhibited markedly elevated inflammatory markers, with C-reactive protein levels averaging 17 per cent higher than those of socially connected peers. Researchers suggest that sustained inflammatory activation contributes to the development of cardiovascular disease, type 2 diabetes, and certain neurodegenerative conditions. Furthermore, neuroimaging investigations have revealed that social rejection activates the same brain regions as physical pain, providing a neurobiological basis for the emotional anguish that accompanies prolonged isolation.\n\nThe contemporary prevalence of loneliness constitutes a paradox in an era of unprecedented digital connectivity. Approximately 36 per cent of adults in industrialised nations report frequent feelings of loneliness, with rates rising most steeply among adolescents and young adults—a demographic group for whom virtual social interactions have largely supplanted face-to-face engagement. Experts caution that digital communication platforms, while offering superficial connectivity, frequently fail to satisfy the deeper psychological needs for intimacy and authentic recognition that characterise meaningful human bonds. Quantitative analyses indicate that each additional hour of daily social media use correlates with measurable increases in perceived isolation, though causality remains contested.\n\nEfforts to ameliorate the loneliness epidemic have yielded mixed results. Large-scale interventions predicated on expanding social opportunities—communal dining programmes, hobby clubs, befriending services—have demonstrated modest efficacy in clinical trials but face substantial challenges in scalability and sustained engagement. Researchers argue that more promising approaches target the structural determinants of disconnection, including urban design features that foster spontaneous social encounters, workplace cultures that prioritise relational depth over transactional efficiency, and healthcare systems that systematically screen for and address social isolation as a vital sign. Whether societies possess the political will to implement such fundamental reforms remains uncertain, yet the cumulative evidence leaves little doubt that the silent epidemic of loneliness demands urgent and sustained attention.",
    "questions": [
      {
        "num": 1,
        "type": "细节理解题",
        "stem": "1. According to Paragraph 1, what did the comprehensive meta-analysis in PNAS find?",
        "options": [
          "Lonely individuals face a 26 per cent higher mortality risk than socially integrated people.",
          "Social isolation has no measurable impact on mortality rates.",
          "Socioeconomic status is the primary determinant of mortality risk.",
          "Loneliness affects fewer than 90 longitudinal studies worldwide."
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。原文明确指出 individuals reporting persistent loneliness faced a 26 per cent higher mortality risk。",
          "B": "错误。原文指出存在显著的死亡风险关联，而非 no measurable impact。",
          "C": "错误。研究在控制社会经济地位后仍发现孤独感的独立影响，非 socioeconomic status 的主要决定作用。",
          "D": "错误。原文指 90 项纵向研究为样本量，非受影响范围。"
        }
      },
      {
        "num": 2,
        "type": "词义推断题",
        "stem": "2. The word 'synthesised' (Paragraph 1) most probably means ________.",
        "options": [
          "randomly selected without clear criteria",
          "combined and analysed together from multiple sources",
          "translated into different languages for broader access",
          "criticised for methodological limitations"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。synthesised 强调系统性的综合分析，非随机选取。",
          "B": "正确。synthesised 意为综合分析、汇总，文中指 meta-analysis 从 90 多项纵向研究中汇集数据并系统分析。",
          "C": "错误。翻译与 synthesised 无关。",
          "D": "错误。批评方法论局限与 synthesised 的含义无关。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. What can be inferred about digital communication from Paragraph 3?",
        "options": [
          "It fully satisfies the psychological need for intimacy.",
          "It has completely eliminated loneliness in industrialised nations.",
          "It may offer connectivity but often fails to meet deeper psychological needs.",
          "More social media use directly causes less perceived isolation."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。原文指出数字交流 frequently fail to satisfy the deeper psychological needs for intimacy。",
          "B": "错误。孤独感在工业化国家呈上升趋势，并未消除。",
          "C": "正确。文中明确指出数字平台提供的是 superficial connectivity，无法满足 intimacy and authentic recognition 等深层次需求。",
          "D": "错误。原文说 each additional hour correlates with increases in perceived isolation，方向相反；且 causality remains contested。"
        }
      },
      {
        "num": 4,
        "type": "例证题",
        "stem": "4. The author mentions the UC study (Paragraph 2) in order to ________.",
        "options": [
          "prove that lonely people always have pre-existing illnesses.",
          "illustrate the biological mechanism linking loneliness to inflammation.",
          "argue that C-reactive protein is the cause of all diseases.",
          "show that cortisol levels decrease in lonely individuals."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。研究未涉及既往疾病是孤独感原因的论点。",
          "B": "正确。引用 UC 研究是为了说明孤独感与炎症标志物的关联，展示生物机制（biological mechanism linking loneliness to inflammation）。",
          "C": "错误。研究只显示相关性，non-causal。",
          "D": "错误。原文说孤独感 amplify stress hormone production，而非 cortisol levels decrease。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "Digital Media: The Complete Solution to Modern Loneliness",
          "The Loneliness Epidemic: A Hidden but Serious Public Health Crisis",
          "Why Individual Therapy Always Solves Social Isolation",
          "The Decline of Cardiovascular Disease in Connected Societies"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。原文批评数字媒体浅层连接，未能解决孤独问题。",
          "B": "正确。全文围绕孤独感作为隐匿而严重的公共健康危机展开，从流行率、生物机制、政策应对三方面系统论述。",
          "C": "错误。原文强调结构性改革，非个人心理治疗。",
          "D": "错误。原文讨论孤独感与心血管疾病等慢性病的关联，未讨论心血管疾病下降。"
        }
      }
    ],
    "words": [
      {
        "word": "underappreciated",
        "def": "未被充分重视的"
      },
      {
        "word": "determinants",
        "def": "决定因素"
      },
      {
        "word": "comprehensive",
        "def": "全面的，综合的"
      },
      {
        "word": "meta-analysis",
        "def": "元分析（对多项研究的综合分析）"
      },
      {
        "word": "synthesised",
        "def": "综合分析的"
      },
      {
        "word": "longitudinal",
        "def": "纵向的"
      },
      {
        "word": "encompassing",
        "def": "包含，涵盖"
      },
      {
        "word": "persistent",
        "def": "持续的，顽固的"
      },
      {
        "word": "mortality",
        "def": "死亡率"
      },
      {
        "word": "counterparts",
        "def": "对应的人或物"
      },
      {
        "word": "socioeconomic",
        "def": "社会经济的"
      },
      {
        "word": "dividends",
        "def": "回报，收益"
      },
      {
        "word": "pathways",
        "def": "路径，途径"
      },
      {
        "word": "interconnected",
        "def": "相互关联的"
      },
      {
        "word": "cortisol",
        "def": "皮质醇（压力激素）"
      },
      {
        "word": "suppressing",
        "def": "抑制，压制"
      },
      {
        "word": "inflammatory",
        "def": "炎症性的"
      },
      {
        "word": "markers",
        "def": "标志物，指标"
      },
      {
        "word": "neurodegenerative",
        "def": "神经退行性的"
      },
      {
        "word": "neuroimaging",
        "def": "神经影像学"
      },
      {
        "word": "neurobiological",
        "def": "神经生物学的"
      },
      {
        "word": "angst",
        "def": "焦虑，痛苦"
      },
      {
        "word": "paradox",
        "def": "悖论，矛盾"
      },
      {
        "word": "intimacy",
        "def": "亲密，亲近"
      },
      {
        "word": "authenticity",
        "def": "真实性"
      },
      {
        "word": "ameliorate",
        "def": "改善，减轻"
      },
      {
        "word": "predicated",
        "def": "以...为基础，源自"
      },
      {
        "word": "transactional",
        "def": "交易性的"
      },
      {
        "word": "systematically",
        "def": "系统地"
      }
    ]
  },
  "5-1": {
    "date": "5/1",
    "month": 5,
    "day": 1,
    "title": "Article from 5/1",
    "text": "The world's largest meat and dairy corporations have flooded the public sphere with ambitious pledges to combat climate change, yet a comprehensive new analysis reveals that the overwhelming majority of these commitments amount to little more than greenwashing. Animal agriculture accounts for at least 16.5 per cent of global greenhouse gas emissions, prompting intense scrutiny from environmental groups and policymakers. In response, the industry has issued a proliferation of sustainability promises, but researchers now question whether these declarations reflect genuine transformation or merely sophisticated public relations manoeuvres.\n\nTo evaluate the substance of these corporate claims, Jennifer Jacquet at the University of Miami and her colleagues systematically examined the sustainability reports and consumer-facing websites of 33 of the world's largest meat and dairy companies between 2021 and 2024. The team identified 1,233 distinct environmental assertions. Strikingly, 98 per cent of these could be classified as greenwashing—claims that are deceptive or deliberately misleading, such as offering vague promises of future climate action without presenting concrete implementation strategies. More than two-thirds of the statements lacked any supporting evidence whatsoever, and merely three were substantiated by peer-reviewed scientific literature.\n\nCurrently, 17 of the 33 evaluated companies have established net-zero emissions targets. However, much like the fossil fuel sector, these aspirations typically project decades into the future and rely predominantly on carbon offsetting rather than genuine emissions reduction at source. The few concrete measures promoted by firms pale in comparison to their grandiose future-facing claims. One widely publicised regenerative agriculture pilot programme encompassed merely 24 farms, representing a microscopic 0.0019 per cent of the company's total global operations. Another firm highlighted a negligible packaging modification: reducing the width of adhesive tape on sausage packs by a mere three millimetres.\n\nThe implications extend beyond corporate accountability. Experts warn that this pervasive pattern of misleading environmental communication undermines public trust in sustainability initiatives more broadly. Marco Springmann at the University of Oxford observes that the authors convincingly demonstrate how many industry claims constitute little beyond superficial window dressing. Tim Benton at the University of Leeds adds that the structural constraints within current market frameworks incentivise companies to overstate their environmental progress while simultaneously lobbying to preserve the regulatory status quo.\n\nAddressing this systemic problem requires robust regulatory intervention rather than voluntary self-assessment. Several researchers have advocated for mandatory disclosure standards that would compel companies to substantiate their environmental claims with independently verified data. Without such measures, consumers and investors remain unable to distinguish between authentic sustainability efforts and carefully crafted marketing narratives—a distinction that becomes increasingly consequential as the urgency of climate action intensifies.",
    "questions": [
      {
        "num": 1,
        "type": "词义推断题",
        "stem": "1. The word \"greenwashing\" (Paragraph 1) most probably refers to ________.",
        "options": [
          "misleading claims about environmental responsibility",
          "government regulations on corporate emissions",
          "scientific research on agricultural sustainability",
          "genuine efforts to protect the environment"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。greenwashing 意为\"绿色洗牌\"，指企业做出误导性或欺骗性的环保声明以改善公众形象，文中明确定义为 deceptive or deliberately misleading claims。",
          "B": "错误。该词与企业自我宣传有关，而非 government regulations（政府法规）。",
          "C": "错误。greenwashing 不是科学研究，而是企业的公关行为。",
          "D": "错误。greenwashing 指的是虚假的环保承诺，而非 genuine efforts（真正的努力）。"
        }
      },
      {
        "num": 2,
        "type": "细节理解题",
        "stem": "2. According to Paragraph 2, the study found that ________.",
        "options": [
          "peer-reviewed literature confirmed the majority of corporate claims",
          "the 33 companies had made significant progress in sustainability",
          "nearly all identified claims could be classified as greenwashing",
          "most environmental claims were supported by scientific evidence"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。仅有 3 项声明有同行评议科学文献支持，远非 majority（大多数）。",
          "B": "错误。研究表明这些公司并未取得实质性进展，大多数承诺是空洞的。",
          "C": "正确。第二段明确指出 98% 的声明可被归类为 greenwashing。",
          "D": "错误。研究发现超过 2/3 的声明缺乏任何支持证据，与选项相反。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. The author mentions the regenerative agriculture pilot programme (Paragraph 3) to illustrate that ________.",
        "options": [
          "the agricultural sector leads in environmental innovation",
          "small-scale pilot programmes are the most effective approach",
          "companies are making substantial investments in sustainable farming",
          "concrete measures are often negligible compared to grand claims"
        ],
        "answer": "D",
        "explanation": {
          "A": "错误。文章批评农业企业在环保方面的虚假承诺，而非赞扬其创新。",
          "B": "错误。文中并未表达小规模试点最有效，反而暗示其规模微乎其微。",
          "C": "错误。该试点项目仅涉及 24 个农场，占公司全球运营的 0.0019%，远非 substantial investment（大量投资）。",
          "D": "正确。作者用此例说明公司宣传的具体措施与其宏大的未来承诺相比微不足道（pale in comparison）。"
        }
      },
      {
        "num": 4,
        "type": "细节理解题",
        "stem": "4. According to Paragraph 4, what do experts say about the industry's behaviour?",
        "options": [
          "Market incentives encourage firms to exaggerate their environmental progress.",
          "The regulatory status quo effectively prevents greenwashing.",
          "Public trust in sustainability initiatives has significantly increased.",
          "Companies are genuinely constrained by technological limitations."
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。第四段 Tim Benton 指出，当前市场框架中的结构性约束激励公司夸大其环保进展（incentivise companies to overstate their environmental progress）。",
          "B": "错误。专家恰恰认为监管现状需要改变，而非有效防止绿色洗牌。",
          "C": "错误。文中说 pervasive pattern of misleading communication undermines public trust（误导信息的普遍模式破坏公众信任）。",
          "D": "错误。专家指出约束来自市场框架（market frameworks），而非技术限制。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "The Meat Industry's Genuine Commitment to Sustainability",
          "Corporate Greenwashing: Empty Promises in the Food Sector",
          "How Carbon Offsetting Solves the Climate Crisis",
          "Regenerative Agriculture: A Model for Environmental Progress"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文章核心观点是企业承诺大多为虚假的绿色洗牌，而非 genuine commitment（真正的承诺）。",
          "B": "正确。全文围绕肉类和乳业企业的环境承诺大多是绿色洗牌这一主题展开，该标题准确概括了文章主旨。",
          "C": "错误。文章批评碳抵消是逃避实际减排的手段，而非解决方案。",
          "D": "错误。再生农业试点仅作为反面例子提及（规模微不足道），并非文章主旨。"
        }
      }
    ],
    "words": [
      {
        "word": "greenwashing",
        "def": "漂绿（虚假环保宣传）"
      },
      {
        "word": "proliferation",
        "def": "激增"
      },
      {
        "word": "manoeuvres",
        "def": "策略"
      },
      {
        "word": "substantiate",
        "def": "证实"
      },
      {
        "word": "peer-reviewed",
        "def": "同行评审的"
      },
      {
        "word": "aspirations",
        "def": "抱负"
      },
      {
        "word": "offsetting",
        "def": "抵消"
      },
      {
        "word": "grandiose",
        "def": "宏大的"
      },
      {
        "word": "regenerative",
        "def": "再生的"
      },
      {
        "word": "microscopic",
        "def": "微小的"
      },
      {
        "word": "negligible",
        "def": "可忽略的"
      },
      {
        "word": "adhesive",
        "def": "粘合剂"
      },
      {
        "word": "accountability",
        "def": "问责制"
      },
      {
        "word": "pervasive",
        "def": "普遍的"
      },
      {
        "word": "superficial",
        "def": "表面的"
      },
      {
        "word": "incentivise",
        "def": "激励"
      },
      {
        "word": "status quo",
        "def": "现状"
      },
      {
        "word": "mandatory disclosure",
        "def": "强制披露"
      },
      {
        "word": "compel",
        "def": "强迫"
      },
      {
        "word": "substantiate",
        "def": "证实"
      },
      {
        "word": "narratives",
        "def": "叙事"
      },
      {
        "word": "consequential",
        "def": "重要的"
      },
      {
        "word": "scrutiny",
        "def": "审查"
      },
      {
        "word": "window dressing",
        "def": "门面装饰"
      }
    ]
  },
  "5-10": {
    "date": "5/10",
    "month": 5,
    "day": 10,
    "title": "Article from 5/10",
    "text": "The global decline in insect populations has emerged as one of the most alarming environmental trends of the past three decades, with cascading consequences for ecosystems, agriculture, and public health. A landmark meta-analysis published in Science examined more than 1,600 studies conducted across decades and continents, revealing that insect abundance has decreased by approximately 25 per cent globally, with certain taxonomic groups—such as butterflies, bees, and beetles—experiencing declines exceeding 50 per cent in some regions. While habitat destruction and pesticide use have long been implicated as primary drivers, researchers now recognise that the interplay between multiple stressors is considerably more complex than previously understood, involving synergistic effects that amplify individual impacts.\n\nCentral to this understanding is the phenomenon of combined stressor vulnerability: when insects are exposed to multiple environmental pressures simultaneously, the resulting harm frequently exceeds the sum of individual effects. For instance, sublethal doses of neonicotinoid pesticides—which do not kill insects outright but impair their functioning—may render them significantly more susceptible to heat stress. As temperatures rise with climate change, this interaction becomes increasingly consequential. Research conducted at the University of Queensland demonstrated that bees exposed to realistic field concentrations of imidacloprid exhibited a 50 per cent reduction in heat tolerance, rendering them unable to regulate body temperature during extreme weather events. Similar synergistic dynamics have been documented between drought stress and pathogen prevalence, as well as between light pollution and predator detection.\n\nThe implications for pollination services are particularly grave. Insects provide the vast majority of pollination for both wild plants and agricultural crops, with an estimated economic value exceeding 200 billion US dollars annually. Yet pollinator declines threaten not merely the production of fruits and vegetables but the reproductive success of wild plant populations, with knock-on effects throughout food webs. Experts suggest that the stabilisation of insect populations will require a fundamental transformation in agricultural practices, moving away from prophylactic pesticide applications toward integrated pest management approaches that prioritise natural predator populations. Field studies conducted across northern Europe indicate that flower strips—marginal areas planted with native flowering plants—can increase local pollinator abundance by up to 300 per cent while simultaneously reducing pest pressure on adjacent crops.\n\nThe complexity of combined stressor effects presents significant challenges for environmental regulation, which has historically evaluated pesticides and other stressors in isolation. Current regulatory frameworks typically require extensive testing of individual compounds but rarely assess interactions between multiple agronomic stressors or between pesticides and environmental variables such as temperature and humidity. Researchers argue that this approach fails to capture ecologically realistic conditions, where insects are rarely exposed to single stressors in isolation. The development of improved assessment protocols that incorporate combined stressor dynamics represents a critical priority for safeguarding insect biodiversity and the ecosystem services it underpins.",
    "questions": [
      {
        "num": 1,
        "type": "词义推断题",
        "stem": "1. The word \"cascading\" (Paragraph 1) most probably means ________.",
        "options": [
          "gradually increasing in a linear fashion",
          "progressively worsening and spreading to other areas",
          "temporarily suspended or paused",
          "suddenly reversing direction"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。cascading 不是线性增长，而是连锁性的扩散和恶化。",
          "B": "正确。cascading 意为\"连锁性的\"，指一个事件引发一系列连锁反应。在文中表示昆虫数量下降会对生态系统、农业和公共卫生产生连锁性的负面影响。",
          "C": "错误。与 suspended 或 paused 相反，cascading 强调持续扩散。",
          "D": "错误。cascading 不是逆转，而是递进式的连锁反应。"
        }
      },
      {
        "num": 2,
        "type": "细节理解题",
        "stem": "2. According to the passage, what did the University of Queensland study find about bees exposed to imidacloprid?",
        "options": [
          "Their reproduction rates declined by approximately 50 per cent.",
          "They became significantly more vulnerable to heat stress.",
          "They were unable to locate flowering plants for foraging.",
          "Their lifespan was reduced by half under normal conditions."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。研究发现是热耐受性降低50%，而非繁殖率下降。",
          "B": "正确。文中明确指出 bees exposed to realistic field concentrations of imidacloprid exhibited a 50 per cent reduction in heat tolerance，即暴露于imidacloprid的蜜蜂热耐受性降低50%。",
          "C": "错误。文中未提及蜜蜂寻找蜜源植物的能力受损。",
          "D": "错误。研究是在热应激条件下观察的，不是正常条件下的寿命。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. What can be inferred about current regulatory frameworks from Paragraph 4?",
        "options": [
          "They adequately address the combined effects of multiple stressors.",
          "They evaluate pesticides and environmental variables together.",
          "They fail to reflect real-world conditions where insects face multiple pressures.",
          "They have successfully stabilised global insect populations."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。正好相反，文中指出 current regulatory frameworks 历来是单独评估，而非评估组合效应。",
          "B": "错误。文中明确指出 current regulatory frameworks typically require extensive testing of individual compounds but rarely assess interactions，即很少评估化合物之间的相互作用。",
          "C": "正确。末段指出现有框架评估单一化合物，而昆虫在现实中面临 multiple stressors，这使得监管未能反映 ecologically realistic conditions。",
          "D": "错误。昆虫数量持续下降，说明现有监管框架未能成功稳定昆虫种群。"
        }
      },
      {
        "num": 4,
        "type": "例证题",
        "stem": "4. The author mentions flower strips (Paragraph 3) in order to ________.",
        "options": [
          "demonstrate that agricultural productivity can be maintained without pollinators",
          "illustrate an effective strategy for increasing pollinator abundance",
          "prove that pesticide bans lead to immediate ecological recovery",
          "compare different methods of crop pollination"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。flower strips 的例子恰恰说明昆虫授粉服务的重要性，而非证明可以不需要授粉者。",
          "B": "正确。flower strips 作为有效策略的例子，表明通过种植本地开花植物可以显著增加本地授粉者数量（up to 300 per cent），同时减少病虫害。",
          "C": "错误。文中未讨论禁用农药的效果，而是讨论农业管理实践的改变。",
          "D": "错误。这个例子不是比较不同的作物授粉方法，而是说明生态恢复策略。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "Why Pesticides Alone Are Not Responsible for Insect Decline",
          "The Hidden Threat: How Combined Stressors Accelerate Insect Loss",
          "How Climate Change Transforms Agricultural Practices",
          "The Economic Value of Insect Pollination Services"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文章并非为农药开脱，而是强调多种压力源的协同作用。",
          "B": "正确。全文围绕 combined stressor vulnerability（组合压力易感性）这一核心概念展开，强调多种压力源协同作用对昆虫的致命影响。",
          "C": "错误。气候变化只是因素之一，不是文章主旨。",
          "D": "错误。经济价值只是授粉服务重要性的一个论据，非主旨。"
        }
      }
    ],
    "words": [
      {
        "word": "insect",
        "def": "昆虫"
      },
      {
        "word": "cascading",
        "def": "级联的"
      },
      {
        "word": "ecosystems",
        "def": "生态系统"
      },
      {
        "word": "meta-analysis",
        "def": "元分析"
      },
      {
        "word": "abundance",
        "def": "丰富，充足"
      },
      {
        "word": "taxonomic",
        "def": "分类学的"
      },
      {
        "word": "habitat destruction",
        "def": "栖息地破坏"
      },
      {
        "word": "pesticide",
        "def": "杀虫剂"
      },
      {
        "word": "synergistic",
        "def": "协同的，增效的"
      },
      {
        "word": "sublethal",
        "def": "亚致死的"
      },
      {
        "word": "neonicotinoid",
        "def": "新烟碱类（杀虫剂）"
      },
      {
        "word": "impair",
        "def": "损害，削弱"
      },
      {
        "word": "heat stress",
        "def": "热应激"
      },
      {
        "word": "heat tolerance",
        "def": "热耐受性"
      },
      {
        "word": "pollination",
        "def": "授粉"
      },
      {
        "word": "pollinator",
        "def": "授粉者"
      },
      {
        "word": "knock-on effects",
        "def": "连锁效应"
      },
      {
        "word": "food webs",
        "def": "食物网"
      },
      {
        "word": "prophylactic",
        "def": "预防性的"
      },
      {
        "word": "integrated pest management",
        "def": "综合害虫管理"
      },
      {
        "word": "natural predator",
        "def": "天敌，自然捕食者"
      },
      {
        "word": "flower strips",
        "def": "花带"
      },
      {
        "word": "assessment protocols",
        "def": "评估方案"
      },
      {
        "word": "biodiversity",
        "def": "生物多样性"
      },
      {
        "word": "underpins",
        "def": "支撑"
      }
    ]
  },
  "5-11": {
    "date": "5/11",
    "month": 5,
    "day": 11,
    "title": "Article from 5/11",
    "text": "The proliferation of misinformation across digital platforms has emerged as a defining challenge of the information age, with profound implications for public discourse, democratic processes, and individual decision-making. Unlike traditional forms of propaganda, which typically emanated from identifiable institutional sources, contemporary disinformation operations exploit the architecture of social media to achieve unprecedented scale and speed of dissemination while maintaining plausible deniability. Research conducted at the Oxford Internet Institute found that false headlines were 70 per cent more likely to be shared on Twitter than accurate ones, and that this differential was amplified during periods of heightened public anxiety, such as disease outbreaks or political crises.\n\nThe cognitive mechanisms underlying susceptibility to misinformation constitute a subject of intense scholarly inquiry. Behavioral psychologists have identified several recurring patterns: firstly, the fluency effect—information that is easier to process mentally is often mistakenly perceived as more credible, regardless of its actual accuracy. Secondly, the confirmation bias leads individuals to accept claims that align with pre-existing beliefs while scrutinising contradictory evidence more rigorously. Thirdly, the authority heuristic causes people to credit assertions attributed to credible sources, even when those attributions are fabricated. The combination of these biases creates what researchers term an\"epistemic vulnerability,\" whereby rational evaluation of information quality becomes systematically impaired under conditions of emotional arousal or cognitive load.\n\nA particularly consequential manifestation of this phenomenon concerns public health communication. During the COVID-19 pandemic, the World Health Organisation documented what it termed an\"infodemic\"—a parallel epidemic of false or misleading health information that undermined trust in evidence-based interventions and vaccination campaigns. Studies examining vaccine hesitancy revealed that exposure to misinformation reduced willingness to vaccinate by approximately 15 percentage points among certain demographic groups, even after controlling for political ideology and prior vaccination history. Experts suggest that simply providing accurate corrections is often insufficient, as false information can exert a\"memory residue\" effect, whereby the correction paradoxically reinforces the original falsehood by increasing its accessibility in memory.\n\nCollective responses to misinformation have centred on a combination of technological and educational interventions. Platform-based approaches include algorithmic demotion of low-credibility content, transparency labels indicating verification status, and partnerships with independent fact-checking organisations. However, efficacy remains contested, as users frequently circumvent warnings by sharing content prior to reading annotations. Educational interventions emphasise the cultivation of what information literacy scholars term sourcing metacognition—the capacity to evaluate not merely whether a claim is accurate but whether attributed sources are authentic and relevant. Longitudinal studies conducted across multiple nations indicate that media literacy programmes can reduce susceptibility to misinformation by twenty to thirty per cent, though effects vary substantially depending on programme design and implementation quality.",
    "questions": [
      {
        "num": 1,
        "type": "词义推断题",
        "stem": "1. The word \"emanated\" (Paragraph 1) most probably means ________.",
        "options": [
          "originated from a particular source",
          "was suppressed by authorities",
          "gradually increased in intensity",
          "was translated into multiple languages"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。emanated 意为\"源自、发出\"，指信息从特定来源产生并传播开来。",
          "B": "错误。emanated 与 suppression（压制）意思相反。",
          "C": "错误。emanated 描述来源，而非强度变化。",
          "D": "错误。emanated 与翻译无关。"
        }
      },
      {
        "num": 2,
        "type": "细节理解题",
        "stem": "2. According to the passage, what finding did the Oxford Internet Institute research demonstrate?",
        "options": [
          "Accurate headlines were more likely to be shared than false ones.",
          "False headlines were significantly more likely to be shared than accurate ones.",
          "Social media users preferred longer news articles over shorter ones.",
          "Most people verified information before sharing it."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。研究发现恰恰相反——false headlines 比 accurate ones 更易被分享。",
          "B": "正确。文中明确指出 false headlines were 70 per cent more likely to be shared on Twitter than accurate ones。",
          "C": "错误。文中未讨论文章长度与分享率的关系。",
          "D": "错误。研究表明人们在分享前不会验证信息，而非主动核实。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. What can be inferred about the\"memory residue\"effect from Paragraph 3?",
        "options": [
          "Corrections always strengthen the original true information in memory.",
          "Providing factual corrections may unintentionally reinforce false information.",
          "People with higher education are immune to memory residue effects.",
          "Memory residue only occurs in health-related misinformation."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。memory residue 指纠正反而强化了错误信息，而非加强正确信息。",
          "B": "正确。文中说明 false information can exert a\"memory residue\" effect，即纠正反而通过增加原文在记忆中的可及性而强化了错误信息。",
          "C": "错误。文中未提及教育水平与 memory residue 的关系。",
          "D": "错误。memory residue 是一种认知现象，文中以健康信息为例，但未说只发生在此领域。"
        }
      },
      {
        "num": 4,
        "type": "细节理解题",
        "stem": "4. According to the passage, which of the following is NOT mentioned as a factor contributing to misinformation susceptibility?",
        "options": [
          "The fluency effect.",
          "The authority heuristic.",
          "Political affiliation alone.",
          "Confirmation bias."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。fluency effect 是明确提到的因素之一。",
          "B": "错误。authority heuristic 是文中提到的三个认知机制之一。",
          "C": "正确。political affiliation alone 未被列为导致 misinformation susceptibility 的因素；政治意识形态只是控制变量，不是直接原因。",
          "D": "错误。confirmation bias 是文中明确提到的三个认知机制之一。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "How Social Media Algorithms Amplify False Information",
          "Understanding and Combating the Spread of Misinformation",
          "The History of Propaganda in the Digital Age",
          "Why Fact-Checking Alone Cannot Stop Misinformation"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。社交媒体算法只是虚假信息传播的一个方面，不是文章主旨。",
          "B": "正确。全文从认知机制、健康传播影响、应对策略三个层面系统讨论虚假信息问题，该标题最全面地概括了文章内容。",
          "C": "错误。文章重点是当代虚假信息的认知机制和应对，而非历史回顾。",
          "D": "错误。文章讨论了技术和教育干预，但事实核查只是其中一部分，不能概括全文。"
        }
      }
    ],
    "words": [
      {
        "word": "proliferation",
        "def": "激增，扩散"
      },
      {
        "word": "misinformation",
        "def": "错误信息，虚假信息"
      },
      {
        "word": "discourse",
        "def": "话语，论述"
      },
      {
        "word": "dissemination",
        "def": "传播，散布"
      },
      {
        "word": "plausible deniability",
        "def": "似有根据的推诿"
      },
      {
        "word": "fluency effect",
        "def": "流畅性效应"
      },
      {
        "word": "credible",
        "def": "可信的"
      },
      {
        "word": "confirmation bias",
        "def": "确认偏误"
      },
      {
        "word": "authority heuristic",
        "def": "权威启发式"
      },
      {
        "word": "epistemic vulnerability",
        "def": "认知脆弱性"
      },
      {
        "word": "cognitive load",
        "def": "认知负荷"
      },
      {
        "word": "infodemic",
        "def": "信息疫情"
      },
      {
        "word": "interventions",
        "def": "干预措施"
      },
      {
        "word": "vaccine hesitancy",
        "def": "疫苗犹豫"
      },
      {
        "word": "demographic",
        "def": "人口统计的"
      },
      {
        "word": "memory residue",
        "def": "记忆残留效应"
      },
      {
        "word": "paradoxically",
        "def": "矛盾地，自相矛盾地"
      },
      {
        "word": "algorithmic demotion",
        "def": "算法降权"
      },
      {
        "word": "transparency labels",
        "def": "透明度标签"
      },
      {
        "word": "circumvent",
        "def": "绕过"
      },
      {
        "word": "sourcing metacognition",
        "def": "来源元认知"
      },
      {
        "word": "longitudinal",
        "def": "纵向的"
      },
      {
        "word": "media literacy",
        "def": "媒体素养"
      },
      {
        "word": "implementation",
        "def": "实施，执行"
      }
    ]
  },
  "5-12": {
    "date": "5/12",
    "month": 5,
    "day": 12,
    "title": "Article from 5/12",
    "text": "The integration of artificial intelligence into healthcare systems has generated both enthusiasm and apprehension among medical professionals, policymakers, and patients alike. While AI diagnostic tools have demonstrated remarkable accuracy in identifying pathologies from medical imaging—sometimes exceeding the performance of experienced radiologists—concerns persist regarding the opacity of these systems, the vulnerability of patient data to breaches, and the potential for algorithmic bias to exacerbate existing health inequities. A comprehensive review published in The Lancet Digital Health in 2025 examined over 200 AI-based clinical decision support systems deployed across 60 countries, revealing that although these tools substantially improved diagnostic accuracy in controlled settings, their performance degraded significantly when deployed in real-world environments characterised by demographic diversity and variable data quality.\n\nThe phenomenon of algorithmic bias in healthcare AI has drawn particular scrutiny. Machine learning models trained predominantly on datasets derived from affluent populations may exhibit reduced sensitivity when processing medical information from underrepresented groups. For instance, a 2024 investigation by researchers at Stanford University found that a widely deployed commercial algorithm used to identify patients requiring intensive care management systematically underestimated disease severity among Black patients, primarily because the algorithm used healthcare costs as a proxy for health needs—a metric that correlates with structural access inequities rather than genuine physiological differences. The consequence was that Black patients were less likely to be flagged for care management programmes, perpetuating a cycle of deferred treatment and worsened outcomes.\n\nData privacy constitutes another critical dimension of the debate. AI systems require vast quantities of patient data for training and continuous refinement, raising questions about consent, data ownership, and the potential for misuse. The principle of data minimisation—collecting only the information strictly necessary for a specified purpose—often conflicts with the data-hungry nature of contemporary machine learning approaches. Experts suggest that federated learning paradigms, whereby algorithms are trained across decentralised data repositories without centralising sensitive information, may offer a partial resolution to this tension, though significant technical and governance challenges remain. Furthermore, the increasing sophistication of AI-generated synthetic patient records raises novel regulatory questions, as such data may circumvent existing consent frameworks while nonetheless encoding patterns that could be re-identified and linked to real individuals.\n\nThe regulatory landscape for medical AI remains fragmented and inadequate. Current approval pathways were designed for pharmaceutical interventions and medical devices rather than adaptive algorithmic systems that evolve continuously through exposure to new data. Consequently, AI tools may receive market authorisation based on performance at a specific point in time, yet undergo silent modifications through online updates that alter their behavioural characteristics without triggering reassessment. Researchers argue that adaptive regulatory frameworks capable of continuous post-market surveillance are essential to ensure that AI in healthcare fulfils its promise of enhancing diagnostic accuracy and reducing health disparities rather than entrenching them.",
    "questions": [
      {
        "num": 1,
        "type": "细节理解题",
        "stem": "1. According to Paragraph 1, what finding did the 2025 Lancet review reveal about AI clinical decision support systems?",
        "options": [
          "They performed better in real-world settings than in controlled environments.",
          "They significantly improved diagnostic accuracy but only in wealthy countries.",
          "Their performance declined when deployed in diverse real-world environments.",
          "They completely replaced the need for human radiologists in most hospitals."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。原文指出 performance degraded in real-world environments，而非提升。",
          "B": "错误。文中未提及只改善富裕国家的诊断准确性。",
          "C": "正确。原文明确指出 their performance degraded significantly when deployed in real-world environments characterised by demographic diversity and variable data quality。",
          "D": "错误。原文说AI工具'sometimes exceeding'放射科医生表现，而非完全取代。"
        }
      },
      {
        "num": 2,
        "type": "推理判断题",
        "stem": "2. What can be inferred about the Stanford algorithm mentioned in Paragraph 2?",
        "options": [
          "It was designed to discriminate against Black patients intentionally.",
          "It used healthcare costs as a proxy for health needs, which led to biased outcomes.",
          "Black patients were overrepresented in its training data.",
          "It was the only AI tool with documented racial bias in healthcare."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。算法偏见不是有意的，而是训练数据和代理指标设计不当导致的。",
          "B": "正确。文中指出算法使用 healthcare costs as a proxy for health needs，这一指标与结构性医疗获取不平等相关联，导致了对 Black 患者的系统性低估。",
          "C": "错误。如果Black患者在训练数据中占多数，算法不太可能低估其疾病严重程度。",
          "D": "错误。文中只是举一个例子说明算法偏见问题，并非唯一有此类问题的工具。"
        }
      },
      {
        "num": 3,
        "type": "词义推断题",
        "stem": "3. The phrase \"data minimisation\" (Paragraph 3) most probably refers to ________.",
        "options": [
          "collecting only the data that is absolutely necessary for a specific purpose",
          "minimising the storage space required for patient records",
          "reducing the number of patients whose data is collected",
          "compressing data before it is transmitted to cloud servers"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。data minimisation 是隐私保护的核心原则，指只收集特定目的所必需的数据。",
          "B": "错误。这是对'minimisation'的字面理解，不是技术术语含义。",
          "C": "错误。不是减少患者数量，而是限制数据收集范围。",
          "D": "错误。与数据传输压缩无关。"
        }
      },
      {
        "num": 4,
        "type": "细节理解题",
        "stem": "4. According to the passage, which of the following is mentioned as a potential solution to data privacy concerns?",
        "options": [
          "Requiring patients to share all medical records with AI companies.",
          "Storing all patient data in a centralised global database.",
          "Federated learning approaches that train algorithms across decentralised data repositories.",
          "Banning all AI systems from processing sensitive medical information."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。要求患者分享所有医疗记录恰恰会侵犯隐私，与数据保护原则相悖。",
          "B": "错误。集中化数据库会增加数据泄露风险，而非解决方案。",
          "C": "正确。文中明确提到 federated learning paradigms 作为解决方案，允许算法在去中心化数据仓库上训练而不集中敏感信息。",
          "D": "错误。完全禁止AI处理医疗信息不现实，且会阻碍技术进步。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "AI in Healthcare: A Revolution in Diagnostic Accuracy",
          "The Promise and Perils of AI in Healthcare: Navigating Bias, Privacy, and Regulation",
          "How AI Will Replace Doctors in the Next Decade",
          "The History of Medical Decision-Making: From Human Experts to Machines"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文章重点不仅在于诊断准确性提升，还讨论了偏见、隐私和监管问题。",
          "B": "正确。全文围绕AI在医疗领域的双重性展开：诊断准确性等承诺，以及算法偏见、数据隐私和监管不足等风险。",
          "C": "错误。文章未预测AI将在十年内取代医生。",
          "D": "错误。文章主题不是医疗决策的历史演变，而是当代AI在医疗中应用的问题。"
        }
      }
    ],
    "words": [
      {
        "word": "integration",
        "def": "整合，集成"
      },
      {
        "word": "enthusiasm",
        "def": "热情，热忱"
      },
      {
        "word": "apprehension",
        "def": "忧虑，担忧"
      },
      {
        "word": "radiologists",
        "def": "放射科医生"
      },
      {
        "word": "opacity",
        "def": "不透明，模糊"
      },
      {
        "word": "vulnerability",
        "def": "脆弱性，易受攻击性"
      },
      {
        "word": "breaches",
        "def": "漏洞，泄露"
      },
      {
        "word": "exacerbate",
        "def": "加剧，使恶化"
      },
      {
        "word": "inequities",
        "def": "不平等，不公正"
      },
      {
        "word": "diagnostic",
        "def": "诊断的"
      },
      {
        "word": "degraded",
        "def": "退化，性能下降"
      },
      {
        "word": "demographic",
        "def": "人口统计的"
      },
      {
        "word": "scrutiny",
        "def": "仔细审查"
      },
      {
        "word": "underrepresented",
        "def": "代表不足的"
      },
      {
        "word": "severity",
        "def": "严重程度"
      },
      {
        "word": "proxy",
        "def": "代理指标"
      },
      {
        "word": "structural",
        "def": "结构性的"
      },
      {
        "word": "physiological",
        "def": "生理的"
      },
      {
        "word": "perpetuating",
        "def": "使持续，使永久化"
      },
      {
        "word": "minimisation",
        "def": "最小化原则"
      },
      {
        "word": "sensitive",
        "def": "敏感的"
      },
      {
        "word": "refinement",
        "def": "完善，改进"
      },
      {
        "word": "federated learning",
        "def": "联邦学习"
      },
      {
        "word": "decentralised",
        "def": "去中心化的"
      },
      {
        "word": "repositories",
        "def": "存储库，仓库"
      },
      {
        "word": "synthetic",
        "def": "合成的，人工的"
      },
      {
        "word": "circumvent",
        "def": "绕过，规避"
      },
      {
        "word": "encode",
        "def": "编码，将...编入"
      },
      {
        "word": "re-identified",
        "def": "重新识别"
      },
      {
        "word": "fragmented",
        "def": "碎片化的"
      },
      {
        "word": "adaptive",
        "def": "适应性的"
      },
      {
        "word": "surveillance",
        "def": "监测，监控"
      },
      {
        "word": "entrenching",
        "def": "使...根深蒂固"
      }
    ]
  },
  "5-16": {
    "date": "5/16",
    "month": 5,
    "day": 16,
    "title": "Article from 5/16",
    "text": "The accelerating pace of digital data collection has rendered privacy a increasingly contested concept in the twenty-first century. Every online transaction, social media interaction, and geographic movement generates data traces that can be aggregated, analysed, and monetised by corporations and governments with unprecedented efficiency. While proponents argue that data-driven technologies enhance convenience, security, and economic productivity, critics contend that the cumulative erosion of informational self-determination poses fundamental threats to individual autonomy and democratic governance. The challenge lies in reconciling the legitimate societal benefits of data utilisation with the imperative to protect citizens from surveillance capitalism's more pernicious manifestations.\n\nContemporary data aggregation techniques have achieved a level of sophistication that far exceeds what most individuals comprehend or consent to. Metadata analysis—which examines patterns of communication rather than content—can reveal sensitive information about medical conditions, political affiliations, and personal relationships even when the communications themselves remain encrypted. Research conducted at Princeton University demonstrated that behavioural patterns extracted from smartphone sensor data could predict an individual's medical conditions with remarkable accuracy, raising profound questions about the efficacy of anonymisation as a privacy safeguard. Once data is centralised in corporate repositories, it becomes vulnerable to breaches, subpoenas, and repurposing that bear no relationship to the original purposes for which it was collected.\n\nRegulatory frameworks worldwide have struggled to keep pace with these technological developments. The European Union's General Data Protection Regulation represents the most comprehensive attempt to establish binding privacy rights, yet its enforcement remains inconsistent across member states, and its extraterritorial provisions are frequently circumvented through strategic data localisation. Experts suggest that meaningful privacy protection requires not merely data minimisation and consent mechanisms, but a fundamental reconceptualisation of data ownership rights that recognises individuals as rightful proprietors of their personal information rather than mere subjects of data processing.\n\nThe geopolitical dimensions of data governance have further complicated the regulatory landscape. Conflicting jurisdictional claims over digital data—exemplified by ongoing disputes between the United States and the European Union regarding the transfer of European citizens' data to American servers—reflect deeper tensions between competing conceptions of state authority and individual rights. The emergence of quantum computing capabilities promises to render current encryption standards obsolete, potentially exposing vast repositories of previously secure data to unprecedented vulnerabilities. Researchers and policymakers concur that adaptive, multilateral approaches to data governance are urgently required to navigate the complex interplay between technological innovation, commercial interests, and the preservation of fundamental human rights.",
    "questions": [
      {
        "num": 1,
        "type": "词义推断题",
        "stem": "1. The word \"contested\" (Paragraph 1) most probably means ________.",
        "options": [
          "universally accepted without dispute",
          "vigorously debated or disputed",
          "systematically ignored by authorities",
          "gradually becoming irrelevant"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。contested 的含义是争论的、争议的，而非 universally accepted。",
          "B": "正确。contested 意为\"被争夺的、有争议的\"，指 privacy 作为概念引发广泛争议，各方对其定义和边界存在分歧。",
          "C": "错误。ignored 与 contested 的含义无关。",
          "D": "错误。becoming irrelevant 与文意相反，隐私问题正变得越来越重要。"
        }
      },
      {
        "num": 2,
        "type": "细节理解题",
        "stem": "2. According to Paragraph 2, what did the Princeton University research demonstrate?",
        "options": [
          "Encrypted communications are completely secure from surveillance.",
          "Metadata analysis can reveal sensitive personal information despite encryption.",
          "Smartphone sensors cannot be used for privacy violations.",
          "Anonymisation effectively protects all users' privacy."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。恰恰相反，研究表明即使是加密通信，通过元数据分析也能揭示敏感信息。",
          "B": "正确。文中指出 metadata analysis can reveal sensitive information about medical conditions, political affiliations, and personal relationships even when communications themselves remain encrypted。",
          "C": "错误。研究证明智能手机传感器数据可被用于隐私侵犯。",
          "D": "错误。anonymisation 作为隐私保护措施的有效性受到质疑。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. What can be inferred about GDPR from Paragraph 3?",
        "options": [
          "It has been fully successful in protecting privacy across all EU states.",
          "Its provisions are sometimes evaded through data localisation strategies.",
          "It explicitly defines individuals as owners of their personal data.",
          "It has been adopted by all countries worldwide."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文中明确说 enforcement remains inconsistent across member states。",
          "B": "正确。文中提到 its extraterritorial provisions are frequently circumvented through strategic data localisation。",
          "C": "错误。专家建议需要 fundamental reconceptualisation，说明 GDPR 尚未明确界定个人为数据所有者。",
          "D": "错误。GDPR 是欧盟法规，不是全球性法规。"
        }
      },
      {
        "num": 4,
        "type": "例证题",
        "stem": "4. The author mentions the US-EU data transfer dispute (Paragraph 4) in order to ________.",
        "options": [
          "illustrate how trade agreements resolve privacy conflicts",
          "demonstrate the geopolitical dimensions of data governance",
          "prove that privacy protection is impossible in democratic societies",
          "show that encryption standards are universally respected"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。争议的存在恰恰说明贸易协定未能解决隐私冲突。",
          "B": "正确。引用 US-EU 数据传输争议是为了说明数据治理的地缘政治复杂性——各国对数据主权和个人权利的不同理解导致监管分歧。",
          "C": "错误。原文并未声称民主社会中隐私保护是不可能的。",
          "D": "错误。争议涉及的是数据传输管辖权，而非加密标准本身。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "The Complete Security of Modern Encryption Technologies",
          "Privacy in the Digital Age: Competing Interests and Unresolved Challenges",
          "How Social Media Companies Collect Your Personal Data",
          "The History of Data Protection Legislation in Europe"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文章指出当前加密技术面临量子计算的颠覆威胁，并非讨论加密的安全性。",
          "B": "正确。全文围绕数字时代的隐私权展开，讨论了数据聚合技术、监管困境和地缘政治挑战，标题准确概括了这些竞争性利益和未解决的问题。",
          "C": "错误。社交媒体数据收集只是文章涉及的众多方面之一，非主旨。",
          "D": "错误。GDPR 只是文章讨论监管框架的一部分，不是主旨。"
        }
      }
    ],
    "words": [
      {
        "word": "accelerating",
        "def": "加速的"
      },
      {
        "word": "contested",
        "def": "争议的，争夺的"
      },
      {
        "word": "aggregated",
        "def": "聚合的，汇总的"
      },
      {
        "word": "monetised",
        "def": "货币化的"
      },
      {
        "word": "proponents",
        "def": "支持者，倡导者"
      },
      {
        "word": "erosion",
        "def": "侵蚀，削弱"
      },
      {
        "word": "informational self-determination",
        "def": "信息自决"
      },
      {
        "word": "autonomy",
        "def": "自主权"
      },
      {
        "word": "pernicious",
        "def": "有害的，恶性的"
      },
      {
        "word": "reconciling",
        "def": "调和，使一致"
      },
      {
        "word": "metadata",
        "def": "元数据"
      },
      {
        "word": "aggregation",
        "def": "聚合，汇总"
      },
      {
        "word": "anonymisation",
        "def": "匿名化"
      },
      {
        "word": "safeguard",
        "def": "保障措施"
      },
      {
        "word": "centralised",
        "def": "集中化的"
      },
      {
        "word": "repositories",
        "def": "存储库，数据仓库"
      },
      {
        "word": "subpoenas",
        "def": "传票，要求提交证据"
      },
      {
        "word": "jurisdictional",
        "def": "管辖权的"
      },
      {
        "word": "extraterritorial",
        "def": "治外法权的"
      },
      {
        "word": "circumvented",
        "def": "被规避的"
      },
      {
        "word": "localisation",
        "def": "本地化"
      },
      {
        "word": "multilateral",
        "def": "多边的，多国参与的"
      },
      {
        "word": "encryption",
        "def": "加密"
      },
      {
        "word": "obsolete",
        "def": "过时的，淘汰的"
      },
      {
        "word": "quantum computing",
        "def": "量子计算"
      }
    ]
  },
  "5-19": {
    "date": "5/19",
    "month": 5,
    "day": 19,
    "title": "Article from 5/19",
    "text": "Climate finance has emerged as a critical flashpoint in international negotiations, with developing nations demanding that wealthy emitters assume greater responsibility for the costs of climate adaptation. The principle of Common but Differentiated Responsibilities—embedded in the foundational framework of the 1992 Rio Earth Summit—recognises that countries that contributed minimally to historical emissions should not bear the same adaptation burdens as industrially advanced nations that industrialised through carbon-intensive processes. Yet as climate impacts intensify and financing gaps widen, the political viability of this framework is increasingly questioned by donor governments facing domestic fiscal constraints and voter resistance to foreign aid allocations.\n\nThe scale of estimated adaptation costs presents a formidable challenge to multilateral cooperation. According to assessments by the United Nations Environment Programme, developing nations will require between 215 and 387 billion US dollars annually by 2050 to adapt to the physical risks of a two-degree warmer world—approximately ten times the current level of international adaptation finance flows. This financing gap reflects not merely insufficient pledges, but structural barriers in the existing development finance architecture. Multilateral development banks operate under risk-averse mandates that prioritise loans over grants, and their conditionality requirements often impose macroeconomic reforms that critics argue exacerbate rather than alleviate recipient country vulnerabilities.\n\nLoss and damage—a concept denoting the irreversible harms that arise from climate impacts exceeding adaptation limits—has become the most contentious dimension of climate negotiations. For low-lying island nations facing existential threats from sea-level rise, compensation for territorial losses represents not a political bargaining chip but a matter of national survival. Conversely, major emitters resist binding financial commitments on liability grounds, contending that establishing legal liability for climate harms would create unmanageable fiscal exposures and potentially destabilise the international trade system. This impasse has blocked substantive progress at successive Conference of the Parties meetings, with delegates acknowledging that existing mechanisms are structurally incapable of addressing the magnitude of losses already incurred by the most vulnerable nations.\n\nInnovative financing mechanisms have been proposed as partial remedies, including climate damage taxes on shipping fuels, special drawing rights allocations by the International Monetary Fund, and debt relief initiatives tied to climate resilience investments. While these proposals have garnered scholarly support and civil society advocacy, their implementation faces formidable political economy obstacles. The structural power asymmetries embedded in global governance institutions continue to advantage wealthy nations in shaping the terms of climate finance, ensuring that debates over responsibility and liability remain unresolved even as climate impacts accelerate beyond the adaptive capacity of the most exposed populations.",
    "questions": [
      {
        "num": 1,
        "type": "细节理解题",
        "stem": "1. According to Paragraph 1, what does the principle of Common but Differentiated Responsibilities recognise?",
        "options": [
          "All nations should share climate adaptation costs equally.",
          "Countries that contributed minimally to historical emissions should not bear the same burdens as industrially advanced nations.",
          "Developing nations should industrialise through carbon-intensive processes to catch up.",
          "Wealthy nations are solely responsible for all climate damages."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。该原则恰恰是要求差异化分担，而非平均分配。",
          "B": "正确。原文明确指出 recognise that countries that contributed minimally to historical emissions should not bear the same adaptation burdens，即历史排放少的国家不应承担与工业化国家相同的负担。",
          "C": "错误。该原则反对碳密集型发展路径，不是鼓励发展中国家重走这条路。",
          "D": "错误。solely responsible 过于绝对，原则体现的是共同但有差异的责任。"
        }
      },
      {
        "num": 2,
        "type": "词义推断题",
        "stem": "2. The word formidable (Paragraph 2) most probably means ________.",
        "options": [
          "easily accomplished with minimal effort",
          "extremely serious and difficult to overcome",
          "politically convenient for all parties",
          "temporarily delaying but ultimately solvable"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。formidable 的含义是艰难的、难以应付的，与 easily accomplished 相反。",
          "B": "正确。formidable 意为艰巨的、难以战胜的，描述适应成本规模对多边合作构成严峻挑战。",
          "C": "错误。politically convenient 与文意无关，formidable 描述的是难度而非政治便利性。",
          "D": "错误。temporarily delaying 暗示只是暂时性问题，与 formidable 表达的严峻持久挑战不符。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. What can be inferred about multilateral development banks from Paragraph 2?",
        "options": [
          "They provide primarily grants rather than loans for adaptation.",
          "Their risk-averse policies and conditionality may worsen recipient vulnerabilities.",
          "They have successfully closed the adaptation financing gap.",
          "They operate independently without any conditionality requirements."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。原文明确指出它们优先提供贷款（loans over grants），而非赠款。",
          "B": "正确。文中指出它们在 risk-averse mandates 下优先提供贷款，且 conditionality requirements 往往 imposed macroeconomic reforms that critics argue exacerbate rather than alleviate recipient country vulnerabilities。",
          "C": "错误。原文指出存在巨大融资缺口（2150-3870亿美元 vs 当前十分之一），说明gap不但未缩小反而扩大。",
          "D": "错误。原文明确提到 conditionality requirements，说明存在附带条件要求。"
        }
      },
      {
        "num": 4,
        "type": "细节理解题",
        "stem": "4. According to the passage, why do major emitters resist binding financial commitments on loss and damage?",
        "options": [
          "They dispute the science of climate change entirely.",
          "They believe island nations are not actually threatened.",
          "They fear establishing legal liability would create unmanageable fiscal exposures.",
          "They have already provided sufficient climate aid to developing nations."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。他们抵抗的是 liability，不是科学事实本身。",
          "B": "错误。文中未质疑海平面上升的科学事实，而是就责任和赔偿问题产生分歧。",
          "C": "正确。原文明确指出 major emitters resist binding financial commitments on liability grounds，理由是 creating unmanageable fiscal exposures and potentially destabilise the international trade system。",
          "D": "错误。如果已提供足够援助，就不会有数百亿美元的融资缺口。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "The Complete Success of Climate Adaptation Finance Since Rio 1992",
          "Climate Finance: The Widening Gap Between Pledges and Reality",
          "Why Multilateral Development Banks Should Prioritise Grants Over Loans",
          "How Innovative Mechanisms Will Solve the Climate Financing Crisis"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文章指出适应融资缺口持续扩大，并非成功。",
          "B": "正确。全文围绕气候融资展开，核心矛盾是 pledges 与 reality 之间的巨大差距，以及由此产生的责任归属争议。",
          "C": "错误。文章虽提及银行贷款优先的问题，但只是结构性障碍之一，非主旨。",
          "D": "错误。文章指出创新融资机制面临 formidable political economy obstacles，并非能解决问题。"
        }
      }
    ],
    "words": [
      {
        "word": "flashpoint",
        "def": "引爆点，争议焦点"
      },
      {
        "word": "emitters",
        "def": "排放者，排放国"
      },
      {
        "word": "adaptation",
        "def": "适应（气候适应）"
      },
      {
        "word": "industrialised",
        "def": "工业化的"
      },
      {
        "word": "carbon-intensive",
        "def": "碳密集型的"
      },
      {
        "word": "fiscal",
        "def": "财政的"
      },
      {
        "word": "voter resistance",
        "def": "选民阻力"
      },
      {
        "word": "formidable",
        "def": "艰难的，艰巨的"
      },
      {
        "word": "multilateral",
        "def": "多边的，多国参与的"
      },
      {
        "word": "architecture",
        "def": "架构，体系"
      },
      {
        "word": "risk-averse",
        "def": "规避风险的"
      },
      {
        "word": "conditionality",
        "def": "条件限制，附带条件"
      },
      {
        "word": "alleviate",
        "def": "减轻，舒缓"
      },
      {
        "word": "irreversible",
        "def": "不可逆转的"
      },
      {
        "word": "existential",
        "def": "存在性的，生存的"
      },
      {
        "word": "territorial",
        "def": "领土的"
      },
      {
        "word": "impasse",
        "def": "僵局，死胡同"
      },
      {
        "word": "compensation",
        "def": "赔偿，补偿"
      },
      {
        "word": "bargaining chip",
        "def": "谈判筹码"
      },
      {
        "word": "substantive",
        "def": "实质性的"
      },
      {
        "word": "innovative",
        "def": "创新的"
      },
      {
        "word": "drawing rights",
        "def": "特别提款权"
      },
      {
        "word": "resilience",
        "def": "韧性，恢复力"
      },
      {
        "word": "garnered",
        "def": "获得（支持），赢得"
      },
      {
        "word": "asymmetries",
        "def": "不对称，不平衡"
      }
    ]
  },
  "5-3": {
    "date": "5/3",
    "month": 5,
    "day": 3,
    "title": "Article from 5/3",
    "text": "The global fertility decline has been nothing short of astonishing. At its peak in 1963, the worldwide birth rate stood at 5.3 children per woman; six decades later, it has plummeted to approximately 2.2. In numerous nations—including Japan, South Korea, and much of Europe—the figure has fallen well below the so-called replacement rate of roughly 2.1, the threshold required to maintain current population sizes. Alarmist headlines and political rhetoric have proliferated, yet demographers caution that simplistic narratives obscure the complex reality underlying this demographic shift.\n\nConventional explanations for declining fertility tend to emphasise economic factors: soaring childcare costs, unaffordable housing, and inadequate parental leave policies. While these considerations undoubtedly matter, Paula Sheppard, a cognitive and evolutionary anthropologist at the University of Oxford, argues that population-level analyses miss crucial nuances. By examining individual decision-making through qualitative focus groups and discrete choice experiments—a methodology rarely applied in fertility research—Sheppard has identified patterns that aggregate national statistics fail to capture.\n\nHer research reveals that the perceived cost of living, though significant, is less decisive than the availability of social support networks. Across all demographic groups surveyed, the presence of a committed co-parent and extended family assistance emerged as paramount. Higher-educated women placed particular emphasis on paternal involvement, expressing reluctance to have children unless they were confident their partners would share domestic responsibilities equitably. University-educated men, correspondingly, cited job flexibility and the ability to work from home as primary concerns—factors directly related to hands-on parenting.\n\nThe erosion of traditional community structures further compounds the challenge. Human beings are distinguished among primates by their capacity for cooperative breeding: the ability to raise multiple dependent offspring simultaneously, relying on a network of fathers, grandparents, and community members. Urbanisation has systematically dismantled this 'village,' leaving prospective parents in social isolation. The absence of nearby relatives, neighbourhood playgroups, and intergenerational solidarity renders parenting markedly more arduous than it was for previous generations.\n\nCritically, Sheppard's findings indicate that most people still desire two or three children—yet structural barriers prevent them from realising this aspiration. In the UK, for every three babies that are wanted, only two are born. The gap between desired and actual fertility is driven largely by postponement: women delay childbearing until they have achieved career stability, but biological constraints limit the window for subsequent births. Policies that merely offer financial incentives, such as tax rebates or subsidised childcare, produce only transient effects. A more fundamental recalibration is required—one that renders parenthood and employment genuinely compatible, rather than perpetuating the artificial dichotomy between the modern workplace and family life.",
    "questions": [
      {
        "num": 1,
        "type": "词义推断题",
        "stem": "1. The phrase \"cooperative breeding\" (Paragraph 4) most probably refers to ________.",
        "options": [
          "a system where multiple caregivers jointly raise offspring",
          "government-funded childcare programmes",
          "artificial reproductive technologies",
          "competitive parenting practices in urban areas"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。cooperative breeding 意为\"合作繁育\"，文中指人类依赖父亲、祖父母和社区成员的网络共同抚养多个后代的能力。",
          "B": "错误。该词指自然的社会支持网络，而非政府资助的托儿项目。",
          "C": "错误。cooperative breeding 是进化人类学概念，与人工生殖技术无关。",
          "D": "错误。文中描述的是合作而非竞争，与 urban competitive parenting 无关。"
        }
      },
      {
        "num": 2,
        "type": "细节理解题",
        "stem": "2. According to Paragraph 3, higher-educated women differ from others in that they ________.",
        "options": [
          "are more concerned about neighbourhood quality",
          "prefer to rely solely on extended family for childcare",
          "emphasise the importance of equitable paternal involvement",
          "are willing to have children without a committed partner"
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。关注社区质量是研究中未受过大学教育的男性提到的，而非高学历女性。",
          "B": "错误。高学历女性特别强调伴侣参与，而非仅依赖大家庭。",
          "C": "正确。第三段指出，高学历女性特别强调父亲参与（paternal involvement），除非确信伴侣会平等分担家务，否则不愿生育。",
          "D": "错误。文中说高学历女性在没有确信的伴侣参与时不愿生育，与选项相反。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. What can be inferred from Paragraph 5 about the gap between desired and actual fertility?",
        "options": [
          "It is primarily caused by people choosing to remain childless.",
          "It results largely from delayed childbearing and biological constraints.",
          "It could be easily closed through increased financial incentives.",
          "It has no significant impact on future population trends."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文中说大多数人仍想要两三个孩子，gap 不是因为选择不生育。",
          "B": "正确。第五段明确指出 gap 主要由推迟生育（postponement）驱动，而生物限制（biological constraints）限制了后续生育的窗口期。",
          "C": "错误。文中说财务激励（financial incentives）只产生短暂效果（transient effects），无法轻易弥合差距。",
          "D": "错误。文章讨论的正是这一 gap 对未来人口的影响，显然认为其有显著影响。"
        }
      },
      {
        "num": 4,
        "type": "细节理解题",
        "stem": "4. According to Sheppard's research, what factor is less decisive than social support in fertility decisions?",
        "options": [
          "The presence of a committed co-parent.",
          "Extended family assistance.",
          "The perceived cost of living.",
          "Paternal involvement in childcare."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。committed co-parent 是研究中最重要的因素之一，不是 less decisive。",
          "B": "错误。extended family assistance 同样是 paramount（至关重要的）。",
          "C": "正确。第四段明确指出，生活成本（cost of living）虽然重要，但不如社会支持网络的决定性强（less decisive than the availability of social support networks）。",
          "D": "错误。paternal involvement 是高学历女性特别强调的因素，同样重要。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "The Economic Burden of Modern Parenthood",
          "Fertility Decline: Beyond Simplistic Narratives",
          "Why Government Policies Fail to Boost Birth Rates",
          "The Role of Education in Family Planning Decisions"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。经济负担只是众多因素之一，文章核心观点是传统解释忽略了社会支持等更深层因素。",
          "B": "正确。全文围绕生育率下降这一现象展开，反复强调简化叙事（simplistic narratives）忽视了个体决策的复杂性，该标题准确概括了文章主旨。",
          "C": "错误。政策失败只是文章最后一部分提及的内容，并非主旨。",
          "D": "错误。教育差异是研究发现之一，但不足以概括全文。"
        }
      }
    ],
    "words": [
      {
        "word": "fertility",
        "def": "生育率"
      },
      {
        "word": "replacement rate",
        "def": "替代率"
      },
      {
        "word": "plummeted",
        "def": "暴跌"
      },
      {
        "word": "demographic",
        "def": "人口统计的"
      },
      {
        "word": "conventional",
        "def": "传统的，常规的"
      },
      {
        "word": "inadequate",
        "def": "不充分的"
      },
      {
        "word": "aggregate",
        "def": "聚合"
      },
      {
        "word": "discrete choice experiments",
        "def": "离散选择实验"
      },
      {
        "word": "methodology",
        "def": "方法论"
      },
      {
        "word": "paramount",
        "def": "至关重要的"
      },
      {
        "word": "equitably",
        "def": "公平地"
      },
      {
        "word": "correspondingly",
        "def": "相应地"
      },
      {
        "word": "cooperative breeding",
        "def": "合作繁育"
      },
      {
        "word": "urbanisation",
        "def": "城市化"
      },
      {
        "word": "dismantled",
        "def": "瓦解"
      },
      {
        "word": "intergenerational",
        "def": "代际的"
      },
      {
        "word": "solidarity",
        "def": "团结"
      },
      {
        "word": "renders",
        "def": "使成为"
      },
      {
        "word": "arduous",
        "def": "艰巨的"
      },
      {
        "word": "aspiration",
        "def": "愿望"
      },
      {
        "word": "postponement",
        "def": "推迟"
      },
      {
        "word": "biological constraints",
        "def": "生物限制"
      },
      {
        "word": "transient",
        "def": "短暂的"
      },
      {
        "word": "recalibration",
        "def": "重新校准"
      },
      {
        "word": "dichotomy",
        "def": "二分法"
      }
    ]
  },
  "5-4": {
    "date": "5/4",
    "month": 5,
    "day": 4,
    "title": "Article from 5/4",
    "text": "An alarming trend has emerged across numerous countries: cancer rates among adults under fifty have been steadily increasing since the 1990s. In the United States, Australia, Canada, and several European nations, the incidence of bowel cancer alone has risen by approximately fifty per cent over the past three decades. This phenomenon has prompted extensive epidemiological investigations, yet researchers have thus far struggled to identify the precise factors driving this demographic shift. A comprehensive new study from the Institute of Cancer Research in London has now concluded that while obesity may account for a portion of the increase, the majority of the trend remains unexplained.\n\nTo unravel this mystery, Montserrat Garcia-Closas and her colleagues meticulously analysed cancer trends in England, correlating them with population-level data on established risk factors. Their findings revealed that eleven types of cancer are increasing among individuals aged twenty to forty-nine, with breast and bowel cancers being the most prevalent. Liver, kidney, and pancreatic cancers also showed upward trajectories, with annual increases ranging from one to six per cent. Strikingly, nine of these eleven cancers were rising at similar rates among those aged fifty and over, suggesting that common underlying causes may be affecting all age groups.\n\nThe researchers subsequently examined behavioural risk factors previously identified by the International Agency for Research on Cancer: alcohol consumption, smoking, physical inactivity, body mass index, dietary fibre intake, and the consumption of processed or red meat. Surprisingly, they found that most of these factors had remained stable or even improved over the study period. The sole exception was body mass index, which has consistently deteriorated. However, obesity alone proved insufficient as an explanation: only approximately twenty per cent of the increase in bowel cancers among young women could be attributed to rising BMI during the relevant timeframe.\n\nCurrent investigations are exploring a range of alternative hypotheses. These include the proliferating consumption of ultra-processed foods, exposure to per- and polyfluoroalkyl substances (PFAS)—persistent environmental chemicals that accumulate in the human body—and the widespread use of antibiotics that may be disrupting gut microbiomes. The researchers emphasise that the rising cancer incidence is probably attributable to a confluence of multiple interacting factors rather than a single causative agent. They also acknowledge that enhanced diagnostic capabilities and more frequent screening may have contributed to the observed increases.\n\nDespite the concerning trends, experts caution against undue alarm. In England, only approximately three thousand bowel cancer cases are diagnosed annually among those aged twenty to forty-nine, meaning that even a three per cent annual increase translates to roughly one hundred additional cases. Recent data up to 2023 indicate that the previously accelerating trends have begun to stabilise. Furthermore, the growing adoption of GLP-1 weight-loss medications may eventually help reverse obesity-related cancer trends, though researchers stress that comprehensive lifestyle interventions and continued surveillance remain essential.",
    "questions": [
      {
        "num": 1,
        "type": "细节理解题",
        "stem": "1. According to Paragraph 2, what did the researchers discover about cancer trends across age groups?",
        "options": [
          "Cancer rates were rising exclusively among young adults.",
          "Most cancers were increasing at similar rates in both young and older populations.",
          "Breast cancer was the only type showing an upward trajectory.",
          "The increase was more pronounced in older age groups than in younger ones."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。研究发现大多数癌症在50岁以上人群中也以相似速度上升，并非仅年轻人增加。",
          "B": "正确。第二段明确指出 nine of these eleven cancers were rising at similar rates among those aged fifty and over, suggesting that common underlying causes may be affecting all age groups。",
          "C": "错误。乳腺癌是最普遍的之一，但不是唯一上升的类型。",
          "D": "错误。上升速度在两个年龄段相似，而非老年人更明显。"
        }
      },
      {
        "num": 2,
        "type": "词义推断题",
        "stem": "2. The word \"confluence\" (Paragraph 4) most probably means ________.",
        "options": [
          "a single dominant cause",
          "a coming together of multiple factors",
          "a gradual decline over time",
          "a sudden unexpected change"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。confluence 指多种因素汇合，与 single dominant cause 含义相反。",
          "B": "正确。confluence 原意为河流交汇，引申为多种因素汇聚/结合。文中说 rising cancer incidence is probably attributable to a confluence of multiple interacting factors rather than a single causative agent，即多种相互作用因素的共同作用。",
          "C": "错误。与 gradual decline 无关。",
          "D": "错误。与 sudden unexpected change 无关。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. What can be inferred from Paragraph 3 about behavioural risk factors?",
        "options": [
          "They have collectively worsened over the study period.",
          "They fully explain the rising cancer rates among young people.",
          "Most have remained stable or improved, with BMI being the exception.",
          "Their impact on cancer has been overestimated by previous research."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。大多数行为风险因素保持稳定或改善，而非 collectively worsened。",
          "B": "错误。研究发现肥胖只能解释约20%的增加，远非 fully explain。",
          "C": "正确。第三段说 most of these factors had remained stable or even improved over the study period. The sole exception was body mass index, which has consistently deteriorated。",
          "D": "错误。文章未提及先前研究高估了这些因素的影响。"
        }
      },
      {
        "num": 4,
        "type": "细节理解题",
        "stem": "4. According to the passage, which of the following is NOT mentioned as a possible factor for rising cancer rates?",
        "options": [
          "Consumption of ultra-processed foods.",
          "Exposure to persistent environmental chemicals.",
          "Antibiotic use disrupting gut microbiomes.",
          "Increased air pollution in urban areas."
        ],
        "answer": "D",
        "explanation": {
          "A": "错误。第四段提到 proliferating consumption of ultra-processed foods 是可能因素之一。",
          "B": "错误。第四段提到 exposure to PFAS（persistent environmental chemicals）是可能因素。",
          "C": "错误。第四段提到 widespread use of antibiotics that may be disrupting gut microbiomes 是可能因素。",
          "D": "正确。文章未提及城市空气污染增加作为癌症上升的可能因素。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "The Definitive Link Between Obesity and Youth Cancer",
          "Why Young People Are Developing Cancer: An Unsolved Mystery",
          "How GLP-1 Drugs Will Eliminate Obesity-Related Cancers",
          "The Success of Cancer Screening Programs in England"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文章指出肥胖只能解释部分增加，并非 definitive link。",
          "B": "正确。全文讨论年轻人癌症增加的现象，分析已研究的风险因素但发现大部分原因仍不明朗，最后提到趋势开始稳定，最佳标题应反映这一未解之谜。",
          "C": "错误。GLP-1药物可能帮助逆转趋势，但不会 eliminate 癌症，且只是最后一段提及的展望。",
          "D": "错误。癌症筛查项目只是提及可能影响诊断率的因素之一，不是主旨。"
        }
      }
    ],
    "words": [
      {
        "word": "alarming",
        "def": "令人担忧的"
      },
      {
        "word": "incidence",
        "def": "发生率"
      },
      {
        "word": "epidemiological",
        "def": "流行病学的"
      },
      {
        "word": "demographic",
        "def": "人口统计的"
      },
      {
        "word": "unravel",
        "def": "解开"
      },
      {
        "word": "meticulously",
        "def": "细致地"
      },
      {
        "word": "correlating",
        "def": "关联"
      },
      {
        "word": "prevalent",
        "def": "普遍的"
      },
      {
        "word": "trajectories",
        "def": "轨迹"
      },
      {
        "word": "underlying",
        "def": "潜在的"
      },
      {
        "word": "subsequently",
        "def": "随后"
      },
      {
        "word": "behavioural",
        "def": "行为的"
      },
      {
        "word": "deteriorated",
        "def": "恶化"
      },
      {
        "word": "attributed",
        "def": "归因于"
      },
      {
        "word": "proliferating",
        "def": "激增"
      },
      {
        "word": "ultra-processed",
        "def": "超加工的"
      },
      {
        "word": "persistent",
        "def": "持续的"
      },
      {
        "word": "microbiomes",
        "def": "微生物组"
      },
      {
        "word": "confluence",
        "def": "汇合"
      },
      {
        "word": "causative",
        "def": "原因的"
      },
      {
        "word": "diagnostic",
        "def": "诊断的"
      },
      {
        "word": "undue",
        "def": "过度的，不正当的"
      },
      {
        "word": "stabilise",
        "def": "稳定"
      },
      {
        "word": "adoption",
        "def": "采用"
      },
      {
        "word": "surveillance",
        "def": "监测"
      }
    ]
  },
  "5-5": {
    "date": "5/5",
    "month": 5,
    "day": 5,
    "title": "Article from 5/5",
    "text": "Changing one's opinion has long been regarded as a sign of intellectual weakness, yet emerging psychological research suggests that mental flexibility is actually a hallmark of cognitive sophistication. A comprehensive review by Stephanie Dolbier at the University of California, Los Angeles, and her colleagues has synthesised decades of studies on open-minded thinking, revealing that the capacity to revise one's beliefs in light of new evidence correlates strongly with improved decision-making, enhanced predictive accuracy, and greater resistance to irrational beliefs such as conspiracy theories. Despite these demonstrated benefits, most individuals exhibit remarkable resistance to opinion change, a tendency that has been implicated in the increasing political polarisation observed over the past two decades.\n\nThe psychological barriers to changing one's mind are multifaceted and deeply rooted in human cognition. At a fundamental level, individuals often experience considerable embarrassment at admitting past errors in judgment, prompting them to cling to outdated beliefs to preserve their social standing. More profoundly, beliefs are frequently interwoven with core elements of personal identity, including religious convictions and political affiliations. When confronted with contradictory evidence, people perceive not merely a challenge to a specific viewpoint but a threat to their entire sense of self, which can provoke intense emotional discomfort.\n\nTo mitigate this discomfort, the brain engages in what psychologists term \"motivated reasoning\": a cognitive process whereby individuals selectively search for information that corroborates their existing assumptions while dismissing or rationalising away disconfirming evidence. This mechanism frequently relies on logical fallacies and can cause individuals to respond defensively or even aggressively toward those who question their beliefs. The phenomenon is particularly pronounced on social media platforms, where algorithmic curation creates echo chambers that continuously reinforce users' pre-existing views.\n\nRecent research, however, has identified several evidence-based strategies for cultivating intellectual flexibility. One approach involves developing greater emotional awareness: studies on \"wise reasoning\" have demonstrated that individuals who articulate nuanced descriptions of their emotions are significantly better equipped to consider alternative perspectives than those who merely categorise their feelings as positive or negative. Mindfulness practices have similarly been shown to help individuals recognise and suppress knee-jerk reactions to opposing viewpoints, thereby facilitating more balanced deliberation.\n\nAdditional interventions include cognitive reframing techniques, such as adopting an analytical persona when encountering disagreeable information—a method that produced measurable increases in open-mindedness regarding polarising topics, with effects persisting for at least five months. Another strategy involves self-affirmation: briefly reflecting on one's positive qualities unrelated to the point of contention can reduce the perceived threat of disagreement. Ultimately, researchers emphasise that the discomfort associated with changing one's mind should be reinterpreted not as a sign of intellectual failure but as an indicator of cognitive growth and learning.",
    "questions": [
      {
        "num": 1,
        "type": "词义推断题",
        "stem": "1. The phrase \"knee-jerk reactions\" (Paragraph 4) most probably refers to ________.",
        "options": [
          "carefully considered responses",
          "automatic and unthinking responses",
          "physically painful reactions",
          "delayed but accurate judgments"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。carefully considered responses（深思熟虑的反应）与 knee-jerk 含义相反。",
          "B": "正确。knee-jerk reactions 原指膝跳反射，引申为自动的、不加思考的反应。文中说 mindfulness helps individuals recognise and suppress knee-jerk reactions to opposing viewpoints，即正念帮助人们识别和抑制对反对观点的自动反应。",
          "C": "错误。physically painful reactions（身体疼痛反应）与文意无关。",
          "D": "错误。delayed but accurate judgments（延迟但准确的判断）不是 knee-jerk 的含义。"
        }
      },
      {
        "num": 2,
        "type": "细节理解题",
        "stem": "2. According to Paragraph 2, what is the deeper reason people resist changing their beliefs?",
        "options": [
          "They lack access to contradictory evidence.",
          "They perceive belief changes as threats to their core identity.",
          "They are incapable of processing complex information.",
          "They prefer to maintain social harmony at all costs."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文章未提及人们缺乏获取反面证据的途径。",
          "B": "正确。第二段指出 beliefs are frequently interwoven with core elements of personal identity... people perceive not merely a challenge to a specific viewpoint but a threat to their entire sense of self，即人们将信念改变视为对核心身份的威胁。",
          "C": "错误。文章未说人们无法处理复杂信息。",
          "D": "错误。维持社会和谐不是文中讨论的原因。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. What can be inferred about \"motivated reasoning\" from Paragraph 3?",
        "options": [
          "It is a rational process that leads to accurate conclusions.",
          "It helps individuals evaluate evidence objectively.",
          "It serves as a psychological defence mechanism to protect existing beliefs.",
          "It is primarily caused by social media algorithms."
        ],
        "answer": "C",
        "explanation": {
          "A": "错误。motivated reasoning 依赖逻辑谬误，并非理性过程。",
          "B": "错误。它使人们 dismiss disconfirming evidence，而非客观评估证据。",
          "C": "正确。第三段描述 motivated reasoning 为 selectively search for information that corroborates existing assumptions while dismissing disconfirming evidence，即一种保护既有信念的心理防御机制。",
          "D": "错误。社交媒体算法加剧了这一现象，但 motivated reasoning 本身不是主要由算法引起的。"
        }
      },
      {
        "num": 4,
        "type": "细节理解题",
        "stem": "4. According to the passage, which strategy has effects that lasted for at least five months?",
        "options": [
          "Developing emotional awareness through journaling.",
          "Adopting an analytical persona when encountering disagreeable information.",
          "Practising mindfulness meditation daily.",
          "Reflecting on positive personal qualities before disagreements."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。情绪觉察的研究未提及五个月的持续效果。",
          "B": "正确。第五段说 adopting an analytical persona when encountering disagreeable information—a method that produced measurable increases in open-mindedness... with effects persisting for at least five months。",
          "C": "错误。正念冥想的效果持续时间未在文中具体说明。",
          "D": "错误。自我肯定策略未提及五个月的持续效果。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "The Dangers of Political Polarisation in the Digital Age",
          "Why Changing Your Mind Is Hard—And How to Get Better at It",
          "The Scientific Evidence Against Conspiracy Theories",
          "How Social Media Algorithms Shape Our Beliefs"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。政治极化只是文中提及的一个现象，不是主旨。",
          "B": "正确。全文讨论改变主意为何困难（心理障碍、motivated reasoning）以及如何改善（情绪觉察、正念、认知重构等策略），最佳标题应反映这一主题。",
          "C": "错误。阴谋理论只是作为开放思维益处的一个例子提及。",
          "D": "错误。社交媒体算法只是加剧信念固化的一个因素，不是主旨。"
        }
      }
    ],
    "words": [
      {
        "word": "sophistication",
        "def": "复杂性"
      },
      {
        "word": "synthesised",
        "def": "综合的"
      },
      {
        "word": "correlates",
        "def": "相关"
      },
      {
        "word": "implicated",
        "def": "涉及"
      },
      {
        "word": "polarisation",
        "def": "极化"
      },
      {
        "word": "multifaceted",
        "def": "多层面的"
      },
      {
        "word": "corroborates",
        "def": "证实"
      },
      {
        "word": "rationalising",
        "def": "合理化"
      },
      {
        "word": "disconfirming",
        "def": "反证的"
      },
      {
        "word": "aggressively",
        "def": "攻击性地"
      },
      {
        "word": "algorithmic",
        "def": "算法的"
      },
      {
        "word": "curation",
        "def": "筛选， curation"
      },
      {
        "word": "echo chambers",
        "def": "回音室效应"
      },
      {
        "word": "cultivating",
        "def": "培养"
      },
      {
        "word": "nuanced",
        "def": "细致的"
      },
      {
        "word": "articulate",
        "def": "清晰表达"
      },
      {
        "word": "perspectives",
        "def": "观点"
      },
      {
        "word": "deliberation",
        "def": "深思熟虑"
      },
      {
        "word": "interventions",
        "def": "干预措施"
      },
      {
        "word": "analytical",
        "def": "分析的"
      },
      {
        "word": "measurable",
        "def": "可衡量的"
      },
      {
        "word": "self-affirmation",
        "def": "自我肯定"
      },
      {
        "word": "contention",
        "def": "争论"
      },
      {
        "word": "reinterpret",
        "def": "重新解释"
      },
      {
        "word": "cognitive growth",
        "def": "认知成长"
      }
    ]
  },
  "5-6": {
    "date": "5/6",
    "month": 5,
    "day": 6,
    "title": "Article from 5/6",
    "text": "Most health and medical data have historically been drawn from research on male bodies, leaving women's health a largely uncharted scientific territory. Until the 1990s, women were rarely included in clinical studies for fear of harming unborn children, and female animals were excluded from studies using model organisms because of a prevailing belief that hormonal fluctuations rendered their biology too complicated. This systematic exclusion has contributed to delays in diagnosis, drugs that are less effective or dangerous for women, and a scarcity of evidence-based guidelines to address women's health needs. In 2016, the US National Institutes of Health instituted a policy mandating that NIH-funded research include sex as a biological variable — a move that sent a strong signal to the broader research community and catalyzed a transformation in scientists' understanding of women's health.\n\nA cornerstone of this renewed approach is a method known as disaggregation: separating data by sex to reveal important differences that researchers can then dig into more deeply to understand the underlying mechanisms. Rabin's team applied this approach to long-standing databases and found striking variations between the sexes in disease patterns. However, disaggregating data alone cannot explain why women's health differs from men's; it is merely the beginning of the story. According to Tannenbaum at the University of Montreal, such analyses should be followed by rigorous investigation of the underlying biological and social mechanisms producing those differences.\n\nA landmark 2024 study by Patwardhan and colleagues at the University of Washington examined Global Burden of Disease data spanning 1990 to 2021 and found striking global patterns. Men were more likely to die sooner from 13 of the top 20 causes of disease, yet women experienced a greater toll from ailments that reduce health and well-being, including depression, back pain, and musculoskeletal disorders. This female-specific burden emerged between the ages of 10 and 24 and persisted across the entire lifespan. A similar disparity was documented in cancer treatment: analyses of 202 trials involving more than 23,000 patients revealed that women endured more severe and more frequent side effects from chemotherapy and targeted therapies, partly because male and female hormones affect drug metabolism differently.\n\nDespite these findings, national health databases frequently fail to incorporate sex-disaggregated data. When COVID-19 struck, Hawkes and her colleagues at Monash University discovered that only 140 of 206 countries reported disaggregated mortality data, and more than 90 percent of countries did not incorporate a sex or gender lens into their clinical guidelines. Yet disaggregating data can save lives: a Cleveland Clinic protocol based on disaggregated analysis reduced women's in-hospital mortality from certain heart attacks by more than half. This life-saving change demonstrates that without systematic disaggregation, health inequities remain invisible and unaddressed.\n\nYet serious obstacles remain. Databases rarely distinguish between sex and gender, leaving intersex people and transgender individuals often uncaptured in analyses. According to Hawkes, gender norms also shape health through behavioural pathways — for example, unhealthy notions of masculinity may increase men's risk of high blood pressure, while social norms restricting women's mobility can prevent access to health care. Researchers emphasize that disaggregating data is a necessary precondition for equitable health outcomes. As one epidemiologist noted, \"If you don't disaggregate your data, you're assuming all human bodies are the same — you'll never be able to figure out who's benefiting and who is being left behind.\"",
    "questions": [
      {
        "num": 1,
        "type": "词义推断题",
        "stem": "1. The word \"disaggregating\" (Paragraph 2) most probably means ________.",
        "options": [
          "sorting data by a particular category",
          "discarding unreliable data points",
          "combining data from multiple sources",
          "translating data into different languages"
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。disaggregating 源自 disaggregate（拆分），指将数据按性别（或其他类别）拆分分别统计。文章下文说 separating data by sex to reveal important differences，即按性别分类数据，与选项A含义一致。",
          "B": "错误。disaggregating 不是丢弃数据，而是分类统计。",
          "C": "错误。disaggregating 与 combine（合并）相反，是拆分而非组合。",
          "D": "错误。disaggregating 与翻译无关。"
        }
      },
      {
        "num": 2,
        "type": "细节理解题",
        "stem": "2. What did the 2024 study by Patwardhan and colleagues find regarding global disease patterns?",
        "options": [
          "Women lived longer but experienced poorer health overall.",
          "Men suffered more from depression and back pain than women.",
          "The disease burden was equal between men and women across all ages.",
          "Women were more likely to die from 13 of the top 20 causes of disease."
        ],
        "answer": "A",
        "explanation": {
          "A": "正确。研究明确指出 Men were more likely to die sooner from 13 of the top 20 causes of disease, yet women experienced a greater toll from ailments that reduce health and well-being，即男性更可能因疾病早逝，而女性虽然寿命更长但健康状况更差。",
          "B": "错误。研究发现女性更易受抑郁、背痛和肌肉骨骼疾病困扰，而非男性。",
          "C": "错误。研究明确指出疾病负担在男女之间分布不均，并非各年龄段平等分担。",
          "D": "错误。是男性更可能早逝（die sooner），而非女性。"
        }
      },
      {
        "num": 3,
        "type": "推理判断题",
        "stem": "3. What can be inferred from the Cleveland Clinic example in Paragraph 4?",
        "options": [
          "Women are generally more susceptible to heart attacks than men.",
          "Standard protocols were previously designed without considering sex differences.",
          "Heart attack mortality rates are higher in the United States than elsewhere.",
          "Clinical guidelines already incorporate sex disaggregation in most countries."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。文中未比较男女心脏病发作的总体易感性，重点是诊断和治疗差异。",
          "B": "正确。克利夫兰诊所的例子说明：此前没有按性别分析数据，女性心脏病患者得到的治疗不足；实施基于数据拆分的新方案后女性死亡率大幅下降，表明之前的标准方案未考虑性别差异。",
          "C": "错误。文中未讨论美国与其他国家心脏病死亡率的比较。",
          "D": "错误。文中明确指出超过90%的国家未将性别视角纳入临床指南，与该选项内容相反。"
        }
      },
      {
        "num": 4,
        "type": "细节理解题",
        "stem": "4. According to the passage, which of the following contributes to the delay in women's heart attack diagnosis?",
        "options": [
          "Women's variety of symptoms is greater than men's.",
          "Heart disease has long been viewed as predominantly a male disease.",
          "Female researchers are excluded from cardiovascular studies.",
          "National databases consistently record sex-disaggregated data."
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。女性心脏病发作症状确实比男性多样，但这是诊断延迟的结果表现，而非原因。",
          "B": "正确。心血管疾病长期被视为男性疾病，导致女性心脏病发作常被误诊，文中明确提到 heart disease has long been viewed as a male disease，以及 Women are more likely to be misdiagnosed。",
          "C": "错误。文中未提及女性研究人员被排除在心血管研究之外。",
          "D": "错误。该选项与事实相反——文中指出各国数据库经常未能纳入性别分类数据（frequently fail to incorporate sex-disaggregated data）。"
        }
      },
      {
        "num": 5,
        "type": "主旨大意题",
        "stem": "5. Which of the following would be the best title for the text?",
        "options": [
          "The Rise of Telemedicine in Women's Health",
          "Sex-Disaggregated Data: A Gateway to Health Equity",
          "Why Men Live Shorter Lives Than Women",
          "The History of Clinical Trials in the United States"
        ],
        "answer": "B",
        "explanation": {
          "A": "错误。远程医疗（telemedicine）不是文章讨论的主题，文章聚焦于医学研究中的性别数据问题。",
          "B": "正确。本文围绕医学研究中对女性的系统性排斥问题展开论述，详细介绍了数据拆分（disaggregation）方法如何揭示男女健康差异，并强调这一方法对实现健康公平的重要性。",
          "C": "错误。男性寿命更短只是文中提及的表面现象，不是文章主旨。",
          "D": "错误。美国临床试验历史不是文章重点，文章重点在于数据拆分方法对理解女性健康差异的作用。"
        }
      }
    ],
    "words": [
      {
        "word": "disaggregation",
        "def": "数据拆分（按性别分类统计）"
      },
      {
        "word": "uncharted",
        "def": "未探索的"
      },
      {
        "word": "scarcity",
        "def": "稀缺"
      },
      {
        "word": "systematic exclusion",
        "def": "系统性排斥"
      },
      {
        "word": "preclinical",
        "def": "临床前的"
      },
      {
        "word": "catalyze",
        "def": "催化，推动"
      },
      {
        "word": "underlying mechanisms",
        "def": "潜在机制"
      },
      {
        "word": "cardiovascular",
        "def": "心血管的"
      },
      {
        "word": "musculoskeletal",
        "def": "肌肉骨骼的"
      },
      {
        "word": "epidemiologist",
        "def": "流行病学家"
      },
      {
        "word": "inequities",
        "def": "不平等"
      },
      {
        "word": "precondition",
        "def": "先决条件"
      },
      {
        "word": "disparities",
        "def": "差异"
      },
      {
        "word": "pharmacology",
        "def": "药理学"
      },
      {
        "word": "metabolism",
        "def": "新陈代谢"
      },
      {
        "word": "normative",
        "def": "规范的"
      },
      {
        "word": "intersex",
        "def": "双性的（跨性别群体的医学描述）"
      },
      {
        "word": "transgender",
        "def": "跨性别者"
      },
      {
        "word": "mortality",
        "def": "死亡率"
      },
      {
        "word": "alarming",
        "def": "令人担忧的"
      },
      {
        "word": "prevalent",
        "def": "普遍的"
      },
      {
        "word": "manifest",
        "def": "显现"
      },
      {
        "word": "aggregating",
        "def": "聚合"
      },
      {
        "word": "demographic",
        "def": "人口统计的"
      }
    ]
  }
};
