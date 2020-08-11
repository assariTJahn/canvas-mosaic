import DrawingArea from "../DrawingArea";

export default class EventHandler{
    constructor(drawingArea, action){
        this.drawingArea = drawingArea;
        this.canvas = drawingArea.getCanvas();
        this.action = action;
        this.eventListeners = {};
        this.eventStatus={};
    }
    

    rotateShape(pos) {
        let currentObj = this.imageStack[this.imageStack.length - 1];
        let ctx = this.getContext();
        let deltaX = pos.x - currentObj.x;
        let deltaY = -(pos.y - currentObj.y);
        let angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        currentObj.angle = angle;

        //console.log(angle);
        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0)';
        ctx.fillRect(currentObj.x, currentObj.y, 10, 10);

        // ctx.clip();
        ctx.clearRect(currentObj.x, currentObj.y, 10, 10);
        currentObj.draw();
        ctx.restore();
    }
}