$(document).ready(function(){
    var randValue,move,positions,posiValues,winFlag,moveCount;
    
    initializer();

    function initializer()
    {
        randValue = Math.floor(Math.random()*2);
        move=(randValue==1)?"X":"O";

        positions = [" "," "," "," "," "," "," "," "," "];
        posiValues = [ [0,1,2],[3,4,5],[6,7,8],[0,4,8],
                            [0,3,6],[1,4,7],[2,5,8],[2,4,6] ];

        $(".col").html("");

        winFlag=false;

        moveCount=0;

        if(move==="X")
        {
            setAt(4);
            updateMove();
            moveCount++;
        }
    }

    $(".reload").click(initializer);
    
    $(".col").click(function()
    {
        var index = $(this).attr("id").slice(-1);
        if(positions[index]!==" " || winFlag)return;
        setAt(index);setTimeout(makeMove,600);
        moveCount++;
        if(moveCount>=9)
            setMsg("Game Tied","blue");
    });

    function updateMove()
    {
        move = move==="X" ? "O" : "X";
    }

    function findWinPos(sym)
    {
        for(var i=0;i<posiValues.length;i++)
        {
            var count=0;
            for(var j=0;j<3;j++)
                if(positions[posiValues[i][j]]===sym)count++;
                else if(positions[posiValues[i][j]]!==" ")count--;
                
            if(count==2)
                for(var j=0;j<3;j++)
                    if(positions[posiValues[i][j]]===" ")
                        return posiValues[i][j];
        }
        return -1;
    }

    function setMsg(msg,color)
    {
        $('.bottom').html(msg).css("color",color);
    }

    function makeMove()
    {
        updateMove();moveCount++;
        if(moveCount>=9)
            setMsg("Game Tied","blue");
        var minPos = findWinPos("X");
        if(minPos!==-1){   
            setAt(minPos);updateMove();
            setMsg("You Lose","red");
            winFlag=true;
            return; 
        }

        minPos = findWinPos("O");
        if(minPos!==-1){   
            setAt(minPos);updateMove();return; 
        }
        makeTwo();updateMove();   
    }

    function makeTwo()
    {
        for(var i=0;i<posiValues.length;i++)
        {
            var spaces=0,Xes=0;
            for(var j=0;j<3;j++)
                if(positions[posiValues[i][j]]==="X")Xes++;
                else if(positions[posiValues[i][j]]===" ")spaces++;
                
            if(spaces===2 && Xes===1)
            {
                for(var j=0;j<3;j++)
                    if(positions[posiValues[i][j]]===" ")
                    {   setAt(posiValues[i][j]);return;    }
                return;
            }
        }
        makeOne();
    }

    function makeOne()
    {
        if(positions[4]===" ")
        {   setAt(4);return; }
        
        for(var i=0;i<9;i++)
            if(positions[i]===" ")
            {   setAt(i);return; }
    }

    function setAt(index)
    {
        positions[index]=move;
        $(".col").eq(index).html(`<div class=${move}>${move}</div>`);
    }
  });
