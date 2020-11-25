const kNodeBuyPotion = 0;
const kNodeSellIngredient = 1;
const kNodePotionFeedBack = 2;
const kNodeEventFeedBack = 3;
const kNodeConversation = 4;

const kStoryLines = {
    nodes:{
        "newbie_swordman_01":{
            type:kNodeBuyPotion,
            text:"hello world!"
        },
        "newbie_swordman_02_full":{
            type:kNodeBuyPotion,
            text:"good!"
        },
        "newbie_swordman_02_norm":{
            type:kNodeBuyPotion,
            text:"just soso."
        },
        "newbie_swordman_02_half":{
            type:kNodeBuyPotion,
            text:"critical wound"
        },
        "newbie_swordman_02_dead":{
            type:kNodeBuyPotion,
            text:"i am a dead man."
        },
        "newbie_swordman_02":{
            type:kNodeBuyPotion,
            text:"hello again!"
        },
        "newbie_mage_01":{
            type:kNodeBuyPotion,
            text:"hello there..."
        },
        "newbie_mage_02":{
            type:kNodeBuyPotion,
            text:"hello peeee..."
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