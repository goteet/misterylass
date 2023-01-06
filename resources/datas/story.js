const StoryLibrary = [];

class StoryNode
{
    constructor(title = "", content = "")
    {
        this.UUID = StoryLibrary.length;
        this.title = title;
        this.content = content;
        StoryLibrary.push(this);
        console.log(StoryLibrary);
    }
};


let startup = new StoryNode("到东方去", "到东方去!...到东方去....!");
