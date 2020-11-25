const kWeekDayString = [
    "日曜日",
    "月曜日",
    "水曜日",
    "火曜日",
    "木曜日",
    "金曜日",
    "土曜日",
];

const RootComponent = {
    data:{
        today : 0,
        existStoryLines:[],
    },
    mounted:function(){
        this.advanceStoryLine();
    },
    computed: {
        CurrentDay: function() { return kWeekDayString[this.today]; },
        MainDescription: function() {
            return kStoryLines.nodes[this.existStoryLines[0]];
        }
    },
    methods: {
        goNextDay: function() {
            this.today = (this.today + 1) % 7; 
            this.advanceStoryLine();
        },
        advanceStoryLine: function() {
            if(this.existStoryLines.length != 0) {
                if(kStoryLines.links.hasOwnProperty(this.existStoryLines[0])) {
                    let currentStoryLineId = this.existStoryLines[0];
                    this.existStoryLines.length = 0;
                    this.existStoryLines.push(kStoryLines.links[currentStoryLineId]);
                    return;
                } else {
                    this.existStoryLines.length = 0;
                    this.pickNewStoryLine();
                }
            }
            else{
                this.pickNewStoryLine();
            }
        },
        pickNewStoryLine:function(){
            let entranceCount = kStoryLines.entrances.length;
            let pickIndex = Math.floor(Math.random() * entranceCount);
            let nodeId = kStoryLines.entrances[pickIndex];
            this.existStoryLines.length = 0;
            this.existStoryLines.push(nodeId);
        }
    },
}
const Application = new Vue(RootComponent).$mount('#container')