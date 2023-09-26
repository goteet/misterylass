Vue.use(VueRouter);


const uiUserInputPanel = Vue.extend(
{
    template: "#uiUserInputPanel",

    data: function () 
    {
        return {
            OptionHint : "",
            DirectionL : { Text:"←", DirectionText:"左侧", DescText: "从左向右的攻击", Value: Enum.ActionDirection.Left },
            DirectionR : { Text:"→", DirectionText:"右侧", DescText: "从右向左的攻击", Value: Enum.ActionDirection.Right },
            DirectionU : { Text:"↑", DirectionText:"上方", DescText: "头顶的劈斩攻击", Value: Enum.ActionDirection.Up },
            DirectionM : { Text:"·", DirectionText:"前方", DescText: "正前方的戳刺攻击", Value: Enum.ActionDirection.Middle },
        };
    },
    
    computed:
    {
        GameInstance() { return this.$parent.GameInstance; },
        InputState() { return this.GameInstance.UserInputState; },
        ShowDefendDirectionPanel() { return this.InputState == Enum.UserInputState.Defend; },
        ShowAttackDirectionPanel() { return this.InputState == Enum.UserInputState.Attack; }
    },

    methods: 
    {
        onPickDefendDirection(direction)
        {
            this.OptionHint = "";
            this.GameInstance.SetDefendDirection(direction.Value);
        },

        onPickAttackDirection(direction)
        {
            this.GameInstance.SetAttackDirection(direction.Value);
        },

        onHoverDefendHint(direction)
        {
            this.OptionHint = "防御来自" + direction.DescText;
        },

        onHoverAttackHint(direction)
        {
            let enable = this.isAttackDirectionEnable(direction.Value);

            if(!enable)
            {
                if(this.GameInstance.PlayerRighty)
                {
                    this.OptionHint = "你是右撇子，由于你对";
                    if(this.GameInstance.DefendDirection == Enum.ActionDirection.Right)
                    {
                        this.OptionHint+= this.DirectionR.DirectionText;
                    }
                    else if(this.GameInstance.DefendDirection == Enum.ActionDirection.Middle)
                    {
                        this.OptionHint+= this.DirectionR.DirectionText;
                    }
                    else
                    {
                        this.OptionHint += this.DirectionU.DirectionText;
                    }
                }
                else
                {
                    this.OptionHint = "你是左撇子，由于你对";
                    if(this.GameInstance.DefendDirection == Enum.ActionDirection.Left)
                    {
                        this.OptionHint+= this.DirectionR.DirectionText;
                    }
                    else if(this.GameInstance.DefendDirection == Enum.ActionDirection.Middle)
                    {
                        this.OptionHint+= this.DirectionR.DirectionText;
                    }
                    else
                    {
                        this.OptionHint += this.DirectionU.DirectionText;
                    }
                }
                this.OptionHint += "进行了防御，所以你无法发动" + direction.DescText;
            }
            else
            {
                this.OptionHint = "向敌人发动" + direction.DescText;
            }
            
        },

        isAttackDirectionEnable(direction)
        {
            return this.GameInstance.IsAttackDirectionEnable(direction.Value);
        }
    }
});

const RootComponent =
{
    data: function ()
    {
        return { GameInstance: new TextStoryGame() };
    },

    computed: 
    {
        StoryLog() { return this.GameInstance.StoryLog; },
        TutorialHint() { return this.GameInstance.TutorialHint; },
        OptionalHint() { return this.GameInstance.OptionalHint; } 
    },

    components:
    {
        "user-input-panel": uiUserInputPanel
    },

    mounted: function()
    {
        this.GameInstance.MainLoop();
    }
}

const Application = new Vue(RootComponent).$mount('#container');
