const kWeekDayString = [
    "日曜日",
    "月曜日",
    "水曜日",
    "火曜日",
    "木曜日",
    "金曜日",
    "土曜日",
];

const RandomMax = function(max){
    return Math.floor(Math.random() * (max));
}

const RandomRange = function(min,max){
    return min + Math.floor(Math.random() * (max-min+1));
}

/*
const RootComponent = {
    data:{
        today:0,
        potionEfficiency:100,
        existStoryLines:[],
    },
    mounted:function(){
        this.pickNewStoryLine();
    },
    computed: {
        CurrentDay: function() { return kWeekDayString[this.today]; },
        MainDescription: function() {
            if(this.existStoryLines[0] == undefined)
                return "";
            let node = kStoryLines.nodes[this.existStoryLines[0]];
            return node.text;
        }
    },
    methods: {
        goNextDayRandom:function(){
            let potionEfficiency = RandomRange(1, 100);
            this.goNextDayWith(potionEfficiency);
        },
        goNextDayWith: function(efficiency) {
            this.today = (this.today + 1) % 7; 
            this.potionEfficiency = efficiency;
            this.advanceStoryLine();
        },
        advanceStoryLine: function() {
            if(this.existStoryLines.length == 0) {
                this.pickNewStoryLine();
                return;
            }
            
            let currentStoryLineId = this.existStoryLines[0];
            if(!kStoryLines.links.hasOwnProperty(currentStoryLineId)) {
                this.existStoryLines.length = 0;
                this.pickNewStoryLine();
                return;
            }

            let links = kStoryLines.links[currentStoryLineId];
            this.existStoryLines.length = 0;
            for(let i = 0; i < links.length; ++i){
                if(!links[i].hasOwnProperty("efficiency")) {
                    this.existStoryLines.push(links[i].next);
                    return;
                }
                else if(links[i].efficiency <= this.potionEfficiency){
                    this.existStoryLines.push(links[i].next);
                    return;
                }
            }
            this.pickNewStoryLine();
        },

        pickNewStoryLine:function(){
            let entranceCount = kStoryLines.entrances.length;
            let pickIndex = RandomMax(entranceCount);
            let nodeId = kStoryLines.entrances[pickIndex];
            this.existStoryLines.length = 0;
            this.existStoryLines.push(nodeId);
        }
    },
}
*/

const RootComponent = {
    data:{
        today:0,
        currentStoryId: 0
    },

    mounted:function(){
        
    },


    computed: {
        currentWeekDayName: function() { return kWeekDayString[this.today]; },
        currentStoryNode: function(){ return StoryLibrary[this.currentStoryId]; },
        currrentStoryTitle : function(){ return this.currentStoryNode.title;},
        currrentStoryContent : function() { return this.currentStoryNode.content; }
    },

    methods: {
        
        goNextDayRandom:function(){
            let potionEfficiency = RandomRange(1, 100);
            this.goNextDayWith(potionEfficiency);
        },
        goNextDayWith: function(efficiency) {
            this.today = (this.today + 1) % 7; 
            this.potionEfficiency = efficiency;
            this.advanceStoryLine();
        },
        advanceStoryLine: function() {
            if(this.existStoryLines.length == 0) {
                this.pickNewStoryLine();
                return;
            }
            
            let currentStoryLineId = this.existStoryLines[0];
            if(!kStoryLines.links.hasOwnProperty(currentStoryLineId)) {
                this.existStoryLines.length = 0;
                this.pickNewStoryLine();
                return;
            }

            let links = kStoryLines.links[currentStoryLineId];
            this.existStoryLines.length = 0;
            for(let i = 0; i < links.length; ++i){
                if(!links[i].hasOwnProperty("efficiency")) {
                    this.existStoryLines.push(links[i].next);
                    return;
                }
                else if(links[i].efficiency <= this.potionEfficiency){
                    this.existStoryLines.push(links[i].next);
                    return;
                }
            }
            this.pickNewStoryLine();
        },
    },
}

const Application = new Vue(RootComponent).$mount('#container')