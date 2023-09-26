
//const 
const eGameStat = { Going: 0, GameOver: 1, Win: 2 };
Enum.Define("GameStats", ["Going", "GameOver", "Win"]);

Enum.Define("UserInputState", ["Defend", "Attack", "Finish"]);
Enum.Define("ActionDirection", ["Left", "Right", "Up", "Middle", "None"])

class TextStoryGame {

    constructor() 
    {
        this.StoryLog = "";
        this.TutorialHint = "";
        this.OptionalHint = "";
        this.MainLoopInterval = -1;
        this.UserInputState = Enum.UserInputState.Finish;
        this.PlayerRighty = 0;
    }
    AddToStoryLog(str)
    {
        this.StoryLog += "<div>" + str + "</div>";
    }

    MainLoop() 
    {
        //start coroutine.
        var self = this;
        var mainloop = coroutine(this.__MainLoop);

        //send this to the coroutine.
        mainloop(this);
        this.MainLoopInterval = setInterval(() => { mainloop(); }, 1000);
    }

    *__MainLoop()
    {
        const self = yield;
        const GameInstance = self;

        let SkeletonHealth = 5;
        let PlayerHealth = 5;

        GameInstance.PlayerRighty = Random.IntRange(0, 1);

        GameInstance.AddToStoryLog("你遇见了一只骷髅，他左手举着小盾，右手拿着一把短剑，准备攻击你。");
        if(GameInstance.PlayerRighty)
        {
            GameInstance.AddToStoryLog("你抬起左手的小盾，右手的短剑暗自紧握准备应敌...");
        }
        else
        {
            GameInstance.AddToStoryLog("你抬起右手的小盾，左手的短剑暗自紧握准备应敌...");
        }

        for(let TurnIndex = 0; SkeletonHealth > 0 && PlayerHealth > 0; TurnIndex++)
        {
            GameInstance.AddToStoryLog("回合 " + (TurnIndex+1) + ":" + "你=" + PlayerHealth + ", 骷髅=" + SkeletonHealth);
            GameInstance.AddToStoryLog("---------------------------------------------");

            GameInstance.WaitForInput()
            while(GameInstance.UserInputState != Enum.UserInputState.Finish)
            {
                yield;
            }

            //Direction is Based on Player.
            let SkeletonDefend = Random.IntRange(0, Enum.ActionDirection.None - 1);
            let SkeletonAttack = Random.IntRange(0, Enum.ActionDirection.None - 1);
            if(SkeletonDefend == Enum.ActionDirection.Left)
            {
                SkeletonAttack = Random.Select(Enum.ActionDirection.Left, Enum.ActionDirection.Middle);
            }
            else if(SkeletonDefend == Enum.ActionDirection.Middle)
            {
                SkeletonAttack = Random.Select(Enum.ActionDirection.Left, Enum.ActionDirection.Up, Enum.ActionDirection.Middle);
            }
            else if(SkeletonDefend == Enum.ActionDirection.Up)
            {
                SkeletonAttack = Random.Select(Enum.ActionDirection.Left, Enum.ActionDirection.Middle);
            }
            
            let PlayerHit = SkeletonDefend != GameInstance.AttackDirection;
            let SkeletonHit = SkeletonAttack != GameInstance.DefendDirection;

            if(PlayerHit && SkeletonHit)
            {
                GameInstance.AddToStoryLog("你们同时击中了对方");
                SkeletonHealth -= 1;
                PlayerHealth -= 1;
            }
            else if(PlayerHit && !SkeletonHit)
            {
                GameInstance.AddToStoryLog("你防御住了骷髅的挥砍，并砍中了骷髅");
                SkeletonHealth -= 1;
            }
            else if(!PlayerHit && SkeletonHit)
            {
                GameInstance.AddToStoryLog("骷髅略过了你的防御，并击中了你。");
                PlayerHealth -= 1;
            }
            else
            {
                GameInstance.AddToStoryLog("你的剑砍在了骷髅的盾上，骷髅也一样。");
            }

            yield;
        }

        if(SkeletonHealth == 0)
        {
            GameInstance.AddToStoryLog("骷髅被你杀死了，你接着向洞穴深处走去，故事仍在继续...");
        }
        else
        {
            GameInstance.AddToStoryLog("awsl");
        }

        clearInterval(GameInstance.MainLoopInterval);
    }

    WaitForInput()
    {   
        this.UserInputState = Enum.UserInputState.Defend;
        this.TutorialHint = "首先你要选择一个防御的方向，用于防住敌人的进攻。"
    }

    SetDefendDirection(direction)
    {
        this.TutorialHint = "接下来你要选择你攻击的方向";
        this.DefendDirection = direction;
        this.UserInputState = Enum.UserInputState.Attack;
    }

    SetAttackDirection(direction)
    {
        this.TutorialHint = "";
        this.AttackDirection = direction;
        this.UserInputState = Enum.UserInputState.Finish;
    }

    IsAttackDirectionEnable(direction)
    {
        if(this.PlayerRighty && this.DefendDirection == Enum.ActionDirection.Right)
        {
            return direction == Enum.ActionDirection.Right;
        }
        else if(!this.PlayerRighty && this.DefendDirection == Enum.ActionDirection.Left)
        {
            return direction == Enum.ActionDirection.Left;
        }
        else if(this.DefendDirection == Enum.ActionDirection.Middle)
        {
            if(this.PlayerRighty)
            {
                return (direction != Enum.ActionDirection.Left);
            }
            else
            {
                return (direction != Enum.ActionDirection.Right);
            }
        }
        else if(this.DefendDirection == Enum.ActionDirection.Up)
        {
            if(this.PlayerRighty)
            {
                return (direction != Enum.ActionDirection.Left) && (direction != Enum.ActionDirection.Up);
            }
            else
            {
                return (direction != Enum.ActionDirection.Right) && (direction != Enum.ActionDirection.Up);
            }
        }
        else
        {
            return true;
        }
    }
}