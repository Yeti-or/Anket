'use strict';

function ProgressBar (){
    this.sectors = [];
    this.offColour = null;
    this.onColour = null;

    this.turnOffSector = function(index){
        this.sectors[index].attr({"fill":this.offColour,"stroke":this.offColour});
    };
    this.turnOnSector = function(index){
        this.sectors[index].attr({"fill":this.onColour,"stroke":this.onColour});
    };
}

Raphael.fn.createProgressBar = function(x,y,rIn,rOut,itemsCount,colour,colourProgress){

    var rad = Math.PI / 180;
    var paper = this;
    var sectorAngle = 360 / itemsCount;

    var drawSector = function(cx, cy, r, startAngle, endAngle, params) {
        //school math http://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D1%82
        var x1 = cx + r*Math.sin((startAngle)*rad);
        var y1 = cy - r*Math.cos((startAngle)*rad);

        var x2 = cx + r*Math.sin((endAngle)*rad);
        var y2 = cy - r*Math.cos((endAngle)*rad);

        //developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
        return paper.path(
            [
                "M",cx,cy,
                "L",x1,y1,
                "A",
                    r,r,
                    0,((endAngle - startAngle) > 180)?1:0,1,
                    x2,y2,
                "Z"
            ]
        ).attr(params);
    };

    paper.circle(x, y, rOut).attr({
        "fill": colour,
        "stroke-width": "0"
    });

    var progressBar = new ProgressBar();
    progressBar.onColour = colourProgress;
    progressBar.offColour = colour;

    for(var angle=0;angle<360;angle+=sectorAngle){
        progressBar.sectors.push(
            drawSector(x,y,rOut,angle,angle+sectorAngle,{
                "stroke":colour
        }));
    }

    paper.circle(x, y, rIn).attr({
        "fill":"#ffffff",
        "stroke-width":"0"
    });

    progressBar.paper = paper;
    return progressBar;
};