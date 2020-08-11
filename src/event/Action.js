module.exports = class Action{
    constructor(drawingArea){
        this.drawingArea = drawingArea;
        this.canvas = drawingArea.getCanvas();
    }
    drawTrace(){
        const canvas = this.canvas;
        const ctx = this.drawingArea.getContext();
        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.beginPath();
        console.log(this.currentX,this.currentY);
        ctx.strokeRect(this.currentX,this.currentY,this.tilesize,this.tilesize);
        //ctx.fillRect(this.currentX*this.tilesize, this.currentY*this.tilesize,this.tilesize,this.tilesize);
        ctx.closePath();
    }

}