export interface Word {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  exampleTranslation: string;
  story: {
    title: string;
    content: string;
    translation: string;
  };
  difficulty: number;
  tags: string[];
}

export const words: Word[] = [
  {
    id: "w001",
    word: "control",
    phonetic: "/kənˈtroʊl/",
    partOfSpeech: "n./v.",
    definition: "控制",
    example: "He exerted control over every aspect of the situation.",
    exampleTranslation: "他掌控着局势的每个方面。",
    story: {
      title: "赞助危机",
      content:
        "Ronaldo's control slipped when he couldn't open the water bottle. The pressure mounted as everyone watched, creating an awkwardness that was almost unbearable. In that transient moment of vulnerability, he finally let go of the mask.",
      translation:
        "罗纳尔多在拧不开水瓶时失去了控制。所有人的注视让压力不断攀升，营造出一种几乎难以忍受的难堪。在那短暂的脆弱时刻，他终于摘下了面具。",
    },
    difficulty: 1,
    tags: ["搞笑", "动词"],
  },
  {
    id: "w002",
    word: "pressure",
    phonetic: "/ˈpreʃər/",
    partOfSpeech: "n.",
    definition: "压力",
    example: "The pressure of the match was overwhelming.",
    exampleTranslation: "比赛的压力让人喘不过气。",
    story: {
      title: "系统归零之后",
      content:
        "After the final whistle, there was no pressure anymore. No applause, no expectations, just the gentle rhythm of his breathing and the soft grass beneath him. For the first time in years, he felt truly free from pressure.",
      translation:
        "终场哨声过后，压力消失了。没有掌声，没有期待，只有呼吸的温柔节律和身下柔软的草地。多年来，他第一次真正感受到无压的自由。",
    },
    difficulty: 1,
    tags: ["治愈", "名词"],
  },
  {
    id: "w003",
    word: "awkwardness",
    phonetic: "/ˈɔːkwərdnəs/",
    partOfSpeech: "n.",
    definition: "难堪",
    example: "There was an awkwardness in the room after his mistake.",
    exampleTranslation: "他犯错后，房间里弥漫着一种难堪的气氛。",
    story: {
      title: "赞助危机",
      content:
        "The awkwardness was palpable as the water bottle slipped from his fingers for the third time. Everyone tried to pretend nothing was wrong, but the awkwardness hung in the air like a thick fog, impossible to ignore.",
      translation:
        "水瓶第三次从他手中滑落时，难堪的气氛显而易见。每个人都试图假装无事发生，但难堪像浓雾一样悬在空气中，无法忽视。",
    },
    difficulty: 3,
    tags: ["搞笑", "名词"],
  },
  {
    id: "w004",
    word: "transient",
    phonetic: "/ˈtrænʃənt/",
    partOfSpeech: "adj.",
    definition: "短暂的",
    example: "Fame is transient in the entertainment industry.",
    exampleTranslation: "在娱乐圈，名气是短暂的。",
    story: {
      title: "赞助危机",
      content:
        "The embarrassment was transient, but the lesson was lasting. That transient moment of humility taught him more about himself than years of success ever had. Transient though it was, it left an indelible mark.",
      translation:
        "尴尬是短暂的，但教训是持久的。那短暂的谦卑时刻比多年的成功更让他了解自己。虽然短暂，却留下了不可磨灭的印记。",
    },
    difficulty: 4,
    tags: ["搞笑", "形容词"],
  },
  {
    id: "w005",
    word: "desolation",
    phonetic: "/ˌdesəˈleɪʃən/",
    partOfSpeech: "n.",
    definition: "空旷",
    example: "The desolation of the abandoned city was haunting.",
    exampleTranslation: "废弃城市的空旷令人毛骨悚然。",
    story: {
      title: "午夜球场异常",
      content:
        "The stadium was swallowed by desolation as Ronaldo walked alone across the pitch. The desolation wasn't just empty seats — it was a void that seemed to pulse with something ancient and hungry. Every step echoed in the desolation, as if the emptiness itself was listening.",
      translation:
        "罗纳尔多独自走过球场时，体育场被空旷吞噬。这空旷不只是空座位——而是一个似乎跳动着古老饥饿感的虚空。每一步都在空旷中回荡，仿佛空虚本身在聆听。",
    },
    difficulty: 5,
    tags: ["恐怖", "名词"],
  },
  {
    id: "w006",
    word: "saturation",
    phonetic: "/ˌsætʃəˈreɪʃən/",
    partOfSpeech: "n.",
    definition: "饱和感",
    example: "The market has reached saturation point for smartphones.",
    exampleTranslation: "智能手机市场已达到饱和点。",
    story: {
      title: "午夜球场异常",
      content:
        "There was a saturation in the air — not of sound, but of presence. The stadium felt saturated with something that shouldn't be there, a saturation that made the hairs on his neck stand on end. He could almost taste the saturation, thick and metallic.",
      translation:
        "空气中有一种饱和感——不是声音的饱和，而是存在的饱和。体育场仿佛被某种不该存在的东西填满，这种饱和感让他脖子上的汗毛倒竖。他几乎能尝到那种饱和感，浓稠而带着金属味。",
    },
    difficulty: 5,
    tags: ["恐怖", "名词"],
  },
  {
    id: "w007",
    word: "instability",
    phonetic: "/ˌɪnstəˈbɪləti/",
    partOfSpeech: "n.",
    definition: "不稳定",
    example: "Political instability has affected the economy.",
    exampleTranslation: "政治不稳定影响了经济。",
    story: {
      title: "午夜球场异常",
      content:
        "The instability began subtly — a slight tremor in the stands, a light flickering out of sync. Then the instability grew, warping the very air around him. He realized with horror that the instability wasn't in the stadium — it was in reality itself.",
      translation:
        "不稳定开始得很微妙——看台上轻微的震颤，灯光不同步地闪烁。然后不稳定加剧，扭曲着他周围的空气。他惊恐地意识到，不稳定不在体育场里——而是在现实本身之中。",
    },
    difficulty: 5,
    tags: ["恐怖", "名词"],
  },
  {
    id: "w008",
    word: "applause",
    phonetic: "/əˈplɔːz/",
    partOfSpeech: "n.",
    definition: "掌声",
    example: "The applause lasted for several minutes.",
    exampleTranslation: "掌声持续了好几分钟。",
    story: {
      title: "系统归零之后",
      content:
        "He lay there, listening to the silence where applause should be. No applause, no cheers — just wind and the distant hum of the city. For a moment, he missed the applause, the adoration, the roar of the crowd. Then he closed his eyes and smiled, finally at peace without applause.",
      translation:
        "他躺在那里，聆听着本应有掌声的寂静。没有掌声，没有欢呼——只有风声和远处城市的嗡嗡声。有一瞬间，他想念掌声、崇拜和人群的呐喊。然后他闭上眼睛微笑，终于在没有掌声的情况下获得了平静。",
    },
    difficulty: 2,
    tags: ["治愈", "名词"],
  },
  {
    id: "w009",
    word: "imperceptible",
    phonetic: "/ˌɪmpərˈseptəbl/",
    partOfSpeech: "adj.",
    definition: "不可感知",
    example: "The change was almost imperceptible at first.",
    exampleTranslation: "起初，变化几乎不可感知。",
    story: {
      title: "午夜球场异常",
      content:
        "The audience was imperceptible — you couldn't see them, couldn't touch them, but you could feel them. Their presence was imperceptible to the senses, yet it weighed on him like a physical force. He was not alone, even if the others were imperceptible.",
      translation:
        "观众是不可感知的——你看不到他们，摸不到他们，但你能感觉到他们。他们的存在对感官来说是不可感知的，却像物理力量一样压在他身上。即使其他人是不可感知的，他也并不孤单。",
    },
    difficulty: 5,
    tags: ["恐怖", "形容词"],
  },
  {
    id: "w010",
    word: "footsteps",
    phonetic: "/ˈfʊtsteps/",
    partOfSpeech: "n.",
    definition: "脚步声",
    example: "Footsteps echoed down the empty corridor.",
    exampleTranslation: "脚步声在空旷的走廊里回荡。",
    story: {
      title: "午夜球场异常",
      content:
        "His footsteps didn't match the sound. Each step he took was followed by a delay, as if something was copying his footsteps from afar. The footsteps came from behind, from the sides, from everywhere and nowhere. He ran, but the footsteps kept pace, always just out of sight.",
      translation:
        "他的脚步声与声音不匹配。他迈出的每一步都伴随着延迟，仿佛有什么东西在远处复制他的脚步声。脚步声来自身后、来自侧面、来自任何地方又无处可寻。他奔跑，但脚步声始终紧随其后，永远就在视线之外。",
    },
    difficulty: 2,
    tags: ["恐怖", "名词"],
  },
  {
    id: "w011",
    word: "spatial distortion",
    phonetic: "/ˈspeɪʃəl dɪˈstɔːrʃən/",
    partOfSpeech: "n.",
    definition: "空间扭曲",
    example: "The mirror caused a spatial distortion.",
    exampleTranslation: "镜子造成了空间扭曲。",
    story: {
      title: "午夜球场异常",
      content:
        "Spatial distortion warped the exit. What was straight became curved, what was near became distant. The spatial distortion wasn't optical — it was real, a physical bending of reality itself. He reached out, and his hand seemed to stretch into infinity, swallowed by the spatial distortion.",
      translation:
        "空间扭曲使出口变形。直线变成曲线，近处变成远处。这空间扭曲不是光学现象——它是真实的，是现实本身的物理弯曲。他伸出手，手似乎延伸到无穷远处，被空间扭曲吞噬。",
    },
    difficulty: 5,
    tags: ["恐怖", "名词"],
  },
  {
    id: "w012",
    word: "systemic loop",
    phonetic: "/sɪˈstemɪk luːp/",
    partOfSpeech: "n.",
    definition: "系统性循环",
    example: "The problem was trapped in a systemic loop.",
    exampleTranslation: "问题陷入了系统性循环。",
    story: {
      title: "午夜球场异常",
      content:
        "He realized the match was a systemic loop, repeating endlessly. Every kick, every cheer, every moment — all part of a systemic loop that had no beginning and no end. He was a character in someone else's story, trapped in a systemic loop from which there was no escape.",
      translation:
        "他意识到比赛是一个系统性循环，无休止地重复着。每一次踢球、每一次欢呼、每一个瞬间——都是一个没有开始也没有结束的系统性循环的一部分。他是别人故事中的角色，被困在一个无法逃脱的系统性循环中。",
    },
    difficulty: 5,
    tags: ["恐怖", "名词"],
  },
  {
    id: "w013",
    word: "anomalous entity",
    phonetic: "/əˈnɑːmələs ˈentəti/",
    partOfSpeech: "n.",
    definition: "异常实体",
    example: "The scientists discovered an anomalous entity in the data.",
    exampleTranslation: "科学家们在数据中发现了一个异常实体。",
    story: {
      title: "现实扰动者",
      content:
        "In the Kingdom of Veloria, Ronaldo was known as an anomalous entity — a being who defied the laws of physics with every step. The court called him an anomalous entity, a threat to the natural order. But to those who saw him play, he was something else entirely: a wonder.",
      translation:
        "在维洛里亚王国，罗纳尔多被称为异常实体——一个每一步都违反物理定律的存在。宫廷称他为异常实体，对自然秩序的威胁。但对那些看过他踢球的人来说，他完全是另一回事：一个奇迹。",
    },
    difficulty: 5,
    tags: ["奇幻", "名词"],
  },
  {
    id: "w014",
    word: "spatial structure",
    phonetic: "/ˈspeɪʃəl ˈstrʌktʃər/",
    partOfSpeech: "n.",
    definition: "空间结构",
    example: "The architect studied the spatial structure of the building.",
    exampleTranslation: "建筑师研究了建筑的空间结构。",
    story: {
      title: "现实扰动者",
      content:
        "His movement warped the spatial structure of the arena. The spatial structure bent to accommodate him, creating shortcuts through dimensions that shouldn't exist. To his teammates, the spatial structure seemed to dissolve whenever he was near, revealing possibilities beyond their wildest dreams.",
      translation:
        "他的动作扭曲了竞技场的空间结构。空间结构为了容纳他而弯曲，创造了本不应存在的维度捷径。对他的队友来说，每当他靠近时，空间结构似乎就会溶解，揭示出超出他们最疯狂想象的可能性。",
    },
    difficulty: 5,
    tags: ["奇幻", "名词"],
  },
  {
    id: "w015",
    word: "attentional focus",
    phonetic: "/əˈtenʃənl ˈfoʊkəs/",
    partOfSpeech: "n.",
    definition: "全神贯注",
    example: "Her attentional focus allowed her to solve the puzzle.",
    exampleTranslation: "她的全神贯注让她解开了谜题。",
    story: {
      title: "现实扰动者",
      content:
        "When he entered the zone, his attentional focus became a physical force. Time slowed, the world narrowed to a single point. His attentional focus wasn't just mental — it was a power that reshaped reality itself, bending the rules to his will.",
      translation:
        "当他进入状态时，他的全神贯注变成了一种物理力量。时间变慢，世界缩小到一个点。他的全神贯注不只是精神上的——它是一种重塑现实本身的力量，将规则屈从于他的意志。",
    },
    difficulty: 5,
    tags: ["奇幻", "名词"],
  },
  {
    id: "w016",
    word: "temporal flow",
    phonetic: "/ˈtempərəl floʊ/",
    partOfSpeech: "n.",
    definition: "时间流速",
    example: "The experiment altered the temporal flow in the chamber.",
    exampleTranslation: "实验改变了室内的时间流速。",
    story: {
      title: "现实扰动者",
      content:
        "His presence disrupted the temporal flow of the realm. Seconds stretched into minutes, minutes collapsed into heartbeats. The temporal flow became a river he could navigate, swimming upstream against the current of time itself. To him, the temporal flow was not a constraint — it was a playground.",
      translation:
        "他的存在扰乱了王国的时间流速。秒变成分钟，分钟坍缩成心跳。时间流速变成了他可以驾驭的河流，逆流而上。对他来说，时间流速不是限制——而是游乐场。",
    },
    difficulty: 5,
    tags: ["奇幻", "名词"],
  },
  {
    id: "w017",
    word: "cognitive dissonance",
    phonetic: "/ˈkɑːɡnətɪv ˈdɪsənəns/",
    partOfSpeech: "n.",
    definition: "认知失调",
    example: "She experienced cognitive dissonance when faced with conflicting evidence.",
    exampleTranslation: "面对相互矛盾的证据时，她经历了认知失调。",
    story: {
      title: "现实扰动者",
      content:
        "Watching Ronaldo play caused cognitive dissonance in everyone who saw him. What their eyes witnessed defied everything their minds knew about physics and possibility. The cognitive dissonance was overwhelming — a beautiful, terrifying contradiction that left spectators breathless.",
      translation:
        "观看罗纳尔多踢球让所有看到他的人都经历了认知失调。他们眼睛所见证的违背了他们大脑对物理和可能性的所有认知。认知失调是压倒性的——一种美丽、可怕的矛盾，让观众屏住呼吸。",
    },
    difficulty: 5,
    tags: ["奇幻", "名词"],
  },
  {
    id: "w018",
    word: "recalibration",
    phonetic: "/ˌriːˌkælɪˈbreɪʃən/",
    partOfSpeech: "n.",
    definition: "再校准",
    example: "The instrument required recalibration after the move.",
    exampleTranslation: "仪器在移动后需要再校准。",
    story: {
      title: "现实扰动者",
      content:
        "When asked about his abilities, Ronaldo simply said he was performing a recalibration of his being. But everyone knew the truth — his recalibration was rewriting the rules of reality itself. Each recalibration brought him closer to something beyond human understanding.",
      translation:
        "当被问及他的能力时，罗纳尔多简单地说他正在对自己的存在进行再校准。但每个人都知道真相——他的再校准正在重写现实本身的规则。每一次再校准都让他更接近超越人类理解的东西。",
    },
    difficulty: 5,
    tags: ["奇幻", "名词"],
  },
  {
    id: "w019",
    word: "adaptive reconstruction",
    phonetic: "/əˈdæptɪv ˌriːkənˈstrʌkʃən/",
    partOfSpeech: "n.",
    definition: "自适应重构",
    example: "The system underwent adaptive reconstruction after the attack.",
    exampleTranslation: "系统在攻击后进行了自适应重构。",
    story: {
      title: "现实扰动者",
      content:
        "The world itself began adaptive reconstruction in his presence. Air made way, grass folded, reality reshaped to accommodate his will. This adaptive reconstruction wasn't conscious — it was the universe's instinctive response to an anomaly it couldn't ignore.",
      translation:
        "世界本身在他在场时开始自适应重构。空气让路，草地折叠，现实重塑以容纳他的意志。这种自适应重构不是有意识的——这是宇宙对一个无法忽视的异常的本能反应。",
    },
    difficulty: 5,
    tags: ["奇幻", "名词"],
  },
  {
    id: "w020",
    word: "structural anomaly",
    phonetic: "/ˈstrʌktʃərəl əˈnɑːməli/",
    partOfSpeech: "n.",
    definition: "结构性异常",
    example: "The scan revealed a structural anomaly in the building.",
    exampleTranslation: "扫描显示建筑存在结构性异常。",
    story: {
      title: "现实扰动者",
      content:
        "The council labeled him a structural anomaly, a flaw in the fabric of reality. But Ronaldo embraced the title of structural anomaly. It meant he was unique, irreplaceable, something the world had never seen before. A structural anomaly? He was just getting started.",
      translation:
        "议会将他标记为结构性异常，现实结构中的一个缺陷。但罗纳尔多欣然接受了结构性异常这个称号。这意味着他是独一无二的，不可替代的，世界从未见过的东西。结构性异常？他才刚刚开始。",
    },
    difficulty: 5,
    tags: ["奇幻", "名词"],
  },
  {
    id: "w021",
    word: "time",
    phonetic: "/taɪm/",
    partOfSpeech: "n.",
    definition: "时间",
    example: "Time waits for no one.",
    exampleTranslation: "时间不等人。",
    story: {
      title: "现实扰动者",
      content:
        "On the field, time itself held its breath. Time bent to his rhythm, slowed for his brilliance, stopped for his magic. He didn't just play football — he danced with time, a partner who could never keep up but always tried. To Ronaldo, time was not a master but a servant.",
      translation:
        "在球场上，时间本身屏住了呼吸。时间屈从于他的节奏，为他的才华减速，为他的魔力停止。他不只是踢足球——他与时间共舞，一个永远跟不上却总是努力的舞伴。对罗纳尔多来说，时间不是主人而是仆人。",
    },
    difficulty: 1,
    tags: ["奇幻", "名词"],
  },
  {
    id: "w022",
    word: "tension",
    phonetic: "/ˈtenʃən/",
    partOfSpeech: "n.",
    definition: "张力",
    example: "The tension between them was palpable.",
    exampleTranslation: "他们之间的张力显而易见。",
    story: {
      title: "更衣室",
      content:
        "The tension in the locker room was thick enough to cut. It hung between them, a live wire waiting to spark. He could feel the tension vibrating through the air, hot and electric, promising something both dangerous and irresistible. The tension wasn't just physical — it was a hunger.",
      translation:
        "更衣室里的张力浓得可以切开。它悬在他们之间，一根等待火花的带电电线。他能感觉到张力在空气中振动，滚烫而带电，预示着某种既危险又不可抗拒的东西。张力不只是物理上的——它是一种饥饿。",
    },
    difficulty: 3,
    tags: ["暧昧", "名词"],
  },
  {
    id: "w023",
    word: "concentration",
    phonetic: "/ˌkɑːnsənˈtreɪʃən/",
    partOfSpeech: "n.",
    definition: "集中",
    example: "Her concentration was unbreakable.",
    exampleTranslation: "她的专注力坚不可摧。",
    story: {
      title: "更衣室",
      content:
        "His concentration wavered when their eyes met. Every thought, every intention — all his concentration shattered like glass. He tried to rebuild it, but the concentration kept slipping away, drawn to the heat of the man in front of him. Concentration was impossible when desire burned this bright.",
      translation:
        "当他们目光相遇时，他的注意力动摇了。每一个想法，每一个意图——他所有的集中都像玻璃一样破碎。他试图重建，但注意力不断溜走，被眼前男人的热度吸引。当欲望燃烧得如此明亮时，集中是不可能的。",
    },
    difficulty: 3,
    tags: ["暧昧", "名词"],
  },
  {
    id: "w024",
    word: "emotional density",
    phonetic: "/ɪˈmoʊʃənl ˈdensəti/",
    partOfSpeech: "n.",
    definition: "情绪密度",
    example: "The emotional density of the scene was overwhelming.",
    exampleTranslation: "场景的情绪密度令人难以承受。",
    story: {
      title: "更衣室",
      content:
        "The emotional density spiked, thick and suffocating. It wasn't just desire — it was years of suppressed longing, of stolen glances, of near-misses. The emotional density became a physical weight, pressing down on both of them, demanding release. Something had to give.",
      translation:
        "情绪密度飙升，浓稠而令人窒息。这不只是欲望——这是多年压抑的渴望、偷来的目光、擦肩而过的遗憾。情绪密度变成了一种物理重量，压在他们两人身上，要求释放。必须有什么东西让步。",
    },
    difficulty: 5,
    tags: ["暧昧", "名词"],
  },
  {
    id: "w025",
    word: "hyper-focused",
    phonetic: "/ˌhaɪpər ˈfoʊkəst/",
    partOfSpeech: "adj.",
    definition: "高度聚焦",
    example: "She was hyper-focused on the task.",
    exampleTranslation: "她高度聚焦于任务。",
    story: {
      title: "更衣室",
      content:
        "His gaze was hyper-focused, cutting through the haze of desire. Every microexpression, every muscle twitch — he noticed it all. The hyper-focus wasn't analytical; it was predatory, a hunter sizing up his prey. He could see the exact moment the other man's resolve cracked, and he moved.",
      translation:
        "他的目光高度聚焦，穿透欲望的迷雾。每一个微表情，每一次肌肉抽搐——他都注意到了。这种高度聚焦不是分析性的；而是掠夺性的，一个猎人在估量他的猎物。他能看到另一个人决心破裂的确切时刻，然后他行动了。",
    },
    difficulty: 4,
    tags: ["暧昧", "形容词"],
  },
  {
    id: "w026",
    word: "distance",
    phonetic: "/ˈdɪstəns/",
    partOfSpeech: "n.",
    definition: "距离",
    example: "The distance between them was closing.",
    exampleTranslation: "他们之间的距离正在缩短。",
    story: {
      title: "更衣室",
      content:
        "He closed the distance in three strides. No hesitation, no doubt — just raw, unfiltered need. The distance that had separated them for so long vanished in an instant, replaced by the heat of skin on skin, the rush of breath. Distance was a luxury they could no longer afford.",
      translation:
        "他三步就缩短了距离。没有犹豫，没有怀疑——只有原始、未过滤的需求。分隔他们这么久的距离瞬间消失，取而代之的是皮肤相触的热度，呼吸的急促。距离是他们再也负担不起的奢侈品。",
    },
    difficulty: 2,
    tags: ["暧昧", "名词"],
  },
  {
    id: "w027",
    word: "variable",
    phonetic: "/ˈveriəbl/",
    partOfSpeech: "n.",
    definition: "变量",
    example: "Time is the key variable in this equation.",
    exampleTranslation: "时间是这个方程式中的关键变量。",
    story: {
      title: "更衣室",
      content:
        "He eliminated the last variable between them — space. There was no room left for pretense, no variable to hide behind. The only variable that mattered now was the rhythm of their bodies, the timing of their desire. Everything else had been stripped away.",
      translation:
        "他消除了他们之间最后一个变量——空间。再也没有伪装的余地，没有可隐藏的变量。现在唯一重要的变量是他们身体的节奏，他们欲望的时机。其他一切都被剥离了。",
    },
    difficulty: 3,
    tags: ["暧昧", "名词"],
  },
  {
    id: "w028",
    word: "task",
    phonetic: "/tæsk/",
    partOfSpeech: "n.",
    definition: "任务",
    example: "The task was completed ahead of schedule.",
    exampleTranslation: "任务提前完成了。",
    story: {
      title: "更衣室",
      content:
        "What began as a challenge became a task, then something more. The task wasn't just about physical release — it was about claiming, about marking, about proving something neither of them would admit aloud. The task became a ritual, a dance of dominance and surrender.",
      translation:
        "从挑战开始的事情变成了任务，然后变成了更多。任务不只是关于身体的释放——它是关于索取，关于标记，关于证明他们都不愿大声承认的东西。任务变成了仪式，一场支配与臣服的舞蹈。",
    },
    difficulty: 2,
    tags: ["暧昧", "名词"],
  },
  {
    id: "w029",
    word: "tremor",
    phonetic: "/ˈtremər/",
    partOfSpeech: "n.",
    definition: "颤栗",
    example: "A tremor ran through his body.",
    exampleTranslation: "一阵颤栗穿过他的身体。",
    story: {
      title: "更衣室",
      content:
        "The tremor started in his legs, spreading upward until his whole body shook. It wasn't fear — it was something far more primal, a tremor born of need so intense it bordered on pain. He bit his lip to stifle the sound, but the tremor betrayed him, a silent confession of how much he wanted this.",
      translation:
        "颤栗从他的双腿开始，向上蔓延直到全身发抖。这不是恐惧——这是某种远比原始的东西，一种由强烈到近乎痛苦的需求所产生的颤栗。他咬着嘴唇压抑声音，但颤栗出卖了他，无声地承认他有多么想要这个。",
    },
    difficulty: 4,
    tags: ["暧昧", "名词"],
  },
  {
    id: "w030",
    word: "climax",
    phonetic: "/ˈklaɪmæks/",
    partOfSpeech: "n.",
    definition: "高潮",
    example: "The story reached its climax.",
    exampleTranslation: "故事达到了高潮。",
    story: {
      title: "更衣室",
      content:
        "The climax hit like a wave, sweeping him under. All the tension, all the desire, all the years of waiting — it all crashed together in that single, blinding moment of climax. He cried out, a raw, broken sound, as the world dissolved into pure sensation.",
      translation:
        "高潮像波浪一样袭来，将他席卷。所有的张力、所有的欲望、所有等待的岁月——都在那单一、耀眼的高潮时刻一起崩溃。他尖叫出声，一种原始、破碎的声音，世界在纯粹的感觉中溶解。",
    },
    difficulty: 3,
    tags: ["暧昧", "名词"],
  },
  {
    id: "w031",
    word: "lacrimal gland",
    phonetic: "/ˈlækrɪml ɡlænd/",
    partOfSpeech: "n.",
    definition: "泪腺",
    example: "Her lacrimal gland produced tears of joy.",
    exampleTranslation: "她的泪腺流下了喜悦的泪水。",
    story: {
      title: "更衣室",
      content:
        "His lacrimal gland betrayed him, spilling tears he couldn't control. They weren't tears of pain — they were something else, something deeper. The lacrimal gland released what the heart had been holding back for so long, a flood of emotion he didn't know he had. He let them fall, unashamed.",
      translation:
        "他的泪腺背叛了他，流下了无法控制的泪水。这不是痛苦的眼泪——而是别的什么，更深的东西。泪腺释放了心脏压抑太久的东西，一股他不知道自己拥有的情感洪流。他让它们落下，毫无羞耻。",
    },
    difficulty: 5,
    tags: ["暧昧", "名词"],
  },
  {
    id: "w032",
    word: "friction",
    phonetic: "/ˈfrɪkʃən/",
    partOfSpeech: "n.",
    definition: "摩擦",
    example: "The friction caused the match to ignite.",
    exampleTranslation: "摩擦使火柴点燃。",
    story: {
      title: "更衣室",
      content:
        "The friction was exquisite, a slow burn that built and built. Every movement, every breath created friction — physical, emotional, inevitable. The friction wasn't just between skin and skin; it was between who they were and who they wanted to be. And in that friction, they found something beautiful.",
      translation:
        "摩擦是精致的，一种缓慢燃烧不断加剧。每一个动作，每一次呼吸都产生摩擦——物理的、情感的、不可避免的。摩擦不只是皮肤与皮肤之间；它是他们是谁与他们想成为谁之间的摩擦。在那种摩擦中，他们发现了某种美丽的东西。",
    },
    difficulty: 3,
    tags: ["暧昧", "名词"],
  },
  {
    id: "w033",
    word: "occupancy",
    phonetic: "/ˈɑːkjəpənsi/",
    partOfSpeech: "n.",
    definition: "占有",
    example: "The hotel had a high occupancy rate.",
    exampleTranslation: "酒店入住率很高。",
    story: {
      title: "更衣室",
      content:
        "His occupancy was complete, absolute, unchallenged. He didn't just take — he claimed, marking every inch of skin as his own. The occupancy wasn't physical alone; it was mental, emotional, a complete takeover that left no room for doubt. This was his, and no one would ever take it away.",
      translation:
        "他的占有是完全的、绝对的、无可挑战的。他不只是夺取——他宣称，将每一寸皮肤标记为自己的。占有不只是身体上的；它是精神上的、情感上的，一次不留任何怀疑空间的完全接管。这是他的，没有人能夺走。",
    },
    difficulty: 5,
    tags: ["暧昧", "名词"],
  },
  {
    id: "w034",
    word: "mark",
    phonetic: "/mɑːrk/",
    partOfSpeech: "n./v.",
    definition: "标记",
    example: "She left a mark on his arm.",
    exampleTranslation: "她在他手臂上留下了一个标记。",
    story: {
      title: "更衣室",
      content:
        "He pressed a mark into the soft skin of his neck, a bruise that would linger for days. The mark wasn't just physical — it was a declaration, a claim, a reminder of what had passed between them. Every time he looked in the mirror, he would see the mark and remember. And that was exactly what he wanted.",
      translation:
        "他在他脖子柔软的皮肤上按了一个标记，一个会持续几天的瘀伤。标记不只是身体上的——它是宣言、是主张、是对他们之间所发生事情的提醒。每次他照镜子，他都会看到标记并记住。这正是他想要的。",
    },
    difficulty: 2,
    tags: ["暧昧", "名词"],
  },
  {
    id: "w035",
    word: "low-noise state",
    phonetic: "/loʊ nɔɪz steɪt/",
    partOfSpeech: "n.",
    definition: "低噪状态",
    example: "The system entered a low-noise state.",
    exampleTranslation: "系统进入了低噪状态。",
    story: {
      title: "系统归零之后",
      content:
        "After the chaos of the match, he finally entered a low-noise state. No screaming fans, no coaches yelling, no cameras clicking — just silence and the gentle rustle of grass. This low-noise state was his sanctuary, a place where he could breathe, think, simply exist without performing.",
      translation:
        "在比赛的混乱之后，他终于进入了低噪状态。没有尖叫的球迷，没有大喊的教练，没有咔嚓的相机——只有寂静和草地的轻柔沙沙声。这种低噪状态是他的避难所，一个他可以呼吸、思考、无需表演就能简单存在的地方。",
    },
    difficulty: 4,
    tags: ["治愈", "名词"],
  },
  {
    id: "w036",
    word: "respiratory rhythm",
    phonetic: "/ˈrespərətɔːri ˈrɪðəm/",
    partOfSpeech: "n.",
    definition: "呼吸节律",
    example: "Her respiratory rhythm slowed as she relaxed.",
    exampleTranslation: "她放松时呼吸节律变慢了。",
    story: {
      title: "系统归零之后",
      content:
        "He focused on his respiratory rhythm, letting it guide him back to himself. Inhale, hold, exhale — the respiratory rhythm became a metronome for his soul, steady and sure. As his respiratory rhythm settled, so did everything else: the tension in his shoulders, the racing of his heart, the noise in his mind.",
      translation:
        "他专注于呼吸节律，让它引导他回到自己。吸气、屏住、呼气——呼吸节律变成了他灵魂的节拍器，稳定而可靠。当他的呼吸节律稳定下来时，其他一切也随之稳定：肩膀的紧张、心跳的加速、脑海中的噪音。",
    },
    difficulty: 4,
    tags: ["治愈", "名词"],
  },
  {
    id: "w037",
    word: "stable structure",
    phonetic: "/ˈsteɪbl ˈstrʌktʃər/",
    partOfSpeech: "n.",
    definition: "稳定结构",
    example: "The building has a stable structure.",
    exampleTranslation: "这座建筑有稳定的结构。",
    story: {
      title: "系统归零之后",
      content:
        "Their silence formed a stable structure between them, solid and unshakable. No words were needed — the stable structure of their friendship was built on years of shared moments, of understanding that went beyond language. This stable structure was his anchor, a reminder that some things never change.",
      translation:
        "他们的沉默在他们之间形成了一个稳定结构，坚实而不可动摇。不需要言语——他们友谊的稳定结构建立在多年共享的时刻之上，建立在超越语言的理解之上。这个稳定结构是他的锚，提醒他有些东西永远不会改变。",
    },
    difficulty: 4,
    tags: ["治愈", "名词"],
  },
  {
    id: "w038",
    word: "dynamic equilibrium",
    phonetic: "/daɪˈnæmɪk ˌiːkwɪˈlɪbriəm/",
    partOfSpeech: "n.",
    definition: "动态平衡",
    example: "The ecosystem maintains a dynamic equilibrium.",
    exampleTranslation: "生态系统维持着动态平衡。",
    story: {
      title: "系统归零之后",
      content:
        "The world around them found a dynamic equilibrium — wind and grass, silence and sound, presence and absence. This dynamic equilibrium wasn't static; it was alive, breathing, changing yet constant. In that dynamic equilibrium, he found peace, a balance between the chaos of life and the stillness within.",
      translation:
        "他们周围的世界找到了动态平衡——风与草、寂静与声音、存在与缺席。这种动态平衡不是静止的；它是活的、呼吸的、变化的却又恒定的。在那种动态平衡中，他找到了平静，一种生命的混乱与内心的宁静之间的平衡。",
    },
    difficulty: 5,
    tags: ["治愈", "名词"],
  },
  {
    id: "w039",
    word: "integrity",
    phonetic: "/ɪnˈteɡrəti/",
    partOfSpeech: "n.",
    definition: "完整性",
    example: "He acted with integrity.",
    exampleTranslation: "他行事正直。",
    story: {
      title: "系统归零之后",
      content:
        "In that quiet moment, he felt the integrity of his being. Not the version he showed to the world, not the carefully constructed persona — the real him, raw and unfiltered. That integrity was his truth, a reminder that beneath all the masks and expectations, he was still just a man, complete and whole in his integrity.",
      translation:
        "在那个安静的时刻，他感受到了自己存在的完整性。不是他展示给世界的版本，不是精心构建的角色——真实的他，原始而未过滤。那种完整性是他的真相，提醒他在所有面具和期望之下，他仍然只是一个人，在他的完整性中完整而完美。",
    },
    difficulty: 4,
    tags: ["治愈", "名词"],
  },
];
