const kNodeBuyPotion = 0;
const kNodeSellIngredient = 1;
const kNodePotionFeedBack = 2;
const kNodeEventFeedBack = 3;
const kNodeConversation = 4;

const kStoryLines = {
    nodes:{
        "newbie_swordman_01":{
            type:kNodeBuyPotion,
            text:"<p>\"叮铃铃……\"</p><p>店门铃铛响起吸引了你的注意。随着你抬起头来注视着门口，一名身着银色盔甲的年轻男子推开了门站在入口。</p><p>工作台正对着门口，坐在工作台后的你顺势打量起这名男子来：白皙的脸上干干净净，没有一丝伤痕。红色的的披风下摆攥在手里，披风上的金色的流苏整理的躺在胸甲上。这一眼看起来就是个没有任何经验的新兵蛋子，隐约间还能闻到淡淡的金属上油膜的气味。</p><p>\"小伙子，有什么需要的么？\"你为了缓和气氛，招呼他看看你的商品。小伙子抬起头来环顾了四周。透过窗帘，微弱的阳光映没法照亮整个屋子，少年听闻你的招呼，一步跨向左侧墙边的货架上。少年做成在在寻找着什么的模样，抬头一眼看去，货架陈列着各种各样奇怪的药物素材，静静躺在各式瓶瓶罐罐里。最上层的瓶子里，不知道装着什么奇怪生物的手指。瓶子外渗出的油脂粘着厚厚的一层灰。为了避免各种素材的失效，你的屋子里基本保持着静止的空气，充斥着一股微微腐败的味道，昏暗的光线更显得神秘起来。</p><p>这股气氛差点吓得这位少年说不出话来，踌躇了一会儿，问道：\"先、先生，我明天要参加今年的狩猎活动了，我……我有些担心，想找找有没有合适的药水，能帮助我表现得更，呃，避免，避免死在外头？\"</p><p>\"呵呵，别紧张，你算是来对地方了，一共6枚银币。\"你直接从工作台下方的的橱柜里抽出一个鼓鼓囊囊的墨绿色的包裹。打开包裹里装着一个药水架子，圆形的架孔里整齐码着9瓶药水。你抽出两瓶摆在桌上。</p><p>这几年冶金术的提升，让广大冒险者们都在炫耀自己的装备，当后来的新手们也都趋之若鹜。虽然更耐用的防具确实能降低受伤害的可能性，但是每年留在外头回不来的冒险者也越来越多。但铁与血的教训并没有教会冒险者们对生命的尊重。狂热的追求精致铠甲和光亮的长剑，让冒险者们忽视了指南上教授的知识，认真为生命做准备的药水和道具。感慨与此，你决定多说两句。</p><p>\"遇到狼群的时候，不要乱挥长剑，保持距离。等最先靠近的狼王跳起来扑向你的时候，再狠狠地击杀他。然后把你的长剑甩起来保护你的后方。\"少年如有所思点点头，拿起药水端详起来。瓶子里粘稠的胶体泛着诡异的红光。\"即使被咬到也没关系, 这瓶生命药水能快速止血。战斗后可以快速恢复生命力。这瓶体力药剂是送你的，每次挥剑结束喝一口，让你保持挥剑的效率。\"</p><p>少年摸摸兜，在台面上叠了6枚银币。沉默了许久，你补了一句：\"别把命留在外边了。\"</p>"
        },
        "newbie_swordman_02_full":{
            type:kNodeBuyPotion,
            text:"很好很有景深!"
        },
        "newbie_swordman_02_norm":{
            type:kNodeBuyPotion,
            text:"活着回来了."
        },
        "newbie_swordman_02_half":{
            type:kNodeBuyPotion,
            text:"被怪物撕扯，重伤被抬回来了。"
        },
        "newbie_swordman_02_dead":{
            type:kNodeBuyPotion,
            text:"i am a dead man."
        },
        "newbie_swordman_02":{
            type:kNodeBuyPotion,
            text:"hello again! this is another story."
        },
        "newbie_mage_01":{
            type:kNodeBuyPotion,
            text:"hello there...this is mage story\'s start."
        },
        "newbie_mage_02":{
            type:kNodeBuyPotion,
            text:"hello peeee...this is mage story\'s end."
        }
    },
    links:{
        "newbie_swordman_01":[
            { efficiency:60, next:"newbie_swordman_02_full" },
            { efficiency:40, next:"newbie_swordman_02_norm" },
            { efficiency:25, next:"newbie_swordman_02_half" },
            { next:"newbie_swordman_02_dead" }
        ],
        "newbie_mage_01":[
            { next:"newbie_mage_02" }
        ]
    },
    entrances:[
        "newbie_swordman_01",
        "newbie_mage_01"
    ]
};