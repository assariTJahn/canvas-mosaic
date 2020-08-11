

export default class MouseCursor {
    constructor(drawingArea){
        this.drawingArea = drawingArea;
        this.canvas = drawingArea.getCanvas();
        this.context = drawingArea.getContext();
        this.positionObj = {
            x: 0,
            y: 0
        };
    }

    updateMousePosition(event){
        
        this.positionObj = this.getMousePosition(event);
    }

    getMousePosition(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    draw(){
        const imageRegistry = this.drawingArea.imageRegistry;
        const entry = imageRegistry.currentEntry;
        const ctx = this.context;
        if(entry==null||entry==undefined)return;
        const img = entry.getImage();
        ctx.save();
        ctx.drawImage(img, this.positionObj.x, this.positionObj.y, img.width, img.height);
        ctx.restore();
    }
}