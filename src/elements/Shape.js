export default class Shape {
    constructor(ctx, x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0;

        this.ctx = ctx;

        this.styles = {};
        this.imageSrc;//for tile images
        this.img;
        // this.img = new Image();
        // this.img.src = imageFile;//test image
        // this.img.onload = (e) => {
        //     fn(e);
        // }
        this.isFocused = false;
        this.moveMode = false;
        this.rotateMode = false;
        this.smallRectSize = 5;

    }

    isInCenterWidth(pos){
        const rect = this.getRect();
        const quarter = rect.width /4 ;
        return (pos.x >= rect.x + quarter) && (pos.x <= rect.x + rect.width - quarter);
    }

    isInCenterHeight(pos){
        const rect = this.getRect();
        const quarter = rect.height /4 ;
        return (pos.y >= rect.y + quarter) && (pos.y <= rect.y + rect.height - quarter);
    }

    isInCenterRect(pos){
        return this.isInCenterWidth(pos) && this.isInCenterHeight(pos);
    }

    isMoveMode(){
        return this.moveMode;
    }

    moveModeOff(){
        this.moveMode=false;
        console.log('move mode off');

    }

    moveModeOn(){
        this.moveMode = true;
    }

    move(pos){
        const halfWidth = this.img.width /2;
        const halfHeight = this.img.height /2;
        this.x = pos.x - halfWidth;
        this.y = pos.y - halfHeight;
    }

    isRotateMode(){
        return this.rotateMode;
    }

    rotateModeOff(){
        this.rotateMode = false;
        console.log('rotate mode off');
    }

    rotateModeOn(){
        this.rotateMode = true;
    }

    getRect() {
        return {
            x: this.x,
            y: this.y,
            width: this.img.width,
            height: this.img.height
        }
    }


    setImage(img) {
        this.img = img;
    }

    getImage() {
        return this.img;
    }
    increaseAngle() {
        this.angle += 5;
        if (this.angle > 360) {
            this.angle = 0;
        }
    }
    decreaseAngle() {
        this.angle -= 5;
        if (this.angle < 0) {
            this.angle = 360;
        }
    }

    getCornerRect() {
        const smallRectSize = this.smallRectSize;
        const width = this.img.width;
        const height = this.img.height;
        return {
            nw: {
                x: this.x,
                y: this.y,
                width: smallRectSize,
                height: smallRectSize
            },
            ne: {
                x: this.x + width - smallRectSize,
                y: this.y,
                width: smallRectSize,
                height: smallRectSize
            },
            sw: {
                x: this.x,
                y: this.y + height - smallRectSize,
                width: smallRectSize,
                height: smallRectSize
            },
            se: {
                x: this.x + width - smallRectSize,
                y: this.y + height - smallRectSize,
                width: smallRectSize,
                height: smallRectSize
            },


        }
    }

    checkXinCorner(pos){
        return this.checkXEast(pos) || this.checkXWest(pos);
    }
    checkXEast(pos){
        const width = this.img.width;
        return (pos.x >= this.x + width - this.smallRectSize && pos.x <= this.x + width);
    }
    checkXWest(pos){
        return (pos.x >= this.x && pos.x < this.x + this.smallRectSize);
    }

    checkYinCorner(pos){
        return this.checkYNorth(pos) || this.checkYSouth(pos);
    }
    checkYSouth(pos){
        const height = this.img.height;
        return (pos.y >= this.y + height - this.smallRectSize && pos.y <= this.y + height);
    }
    checkYNorth(pos){
        
        if(pos.y >= this.y && pos.y <= this.y + this.smallRectSize){
            return true;
        }
        return false;
    }
    isInCornerRect(pos) {
        
        return this.checkXinCorner(pos) && this.checkYinCorner(pos);
    }

    drawBox() {
        const smallRectSize = this.smallRectSize;
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeRect(this.x, this.y, this.img.width, this.img.height);
        //draw 4 children white rect
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.strokeRect(this.x, this.y, smallRectSize, smallRectSize);
        this.ctx.strokeRect(this.x, this.y + this.img.height - smallRectSize, smallRectSize, smallRectSize);
        this.ctx.strokeRect(this.x + this.img.width - smallRectSize, this.y + this.img.height - smallRectSize, smallRectSize, smallRectSize);
        this.ctx.strokeRect(this.x + this.img.width - smallRectSize, this.y, smallRectSize, smallRectSize);
        this.ctx.restore();
    }
    draw() {
        const halfWidth = this.img.width / 2;
        const halfHeight = this.img.height / 2;
        const offset = halfWidth / 2;
        //console.log(this.x,this.y);
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.x + halfWidth, this.y + halfHeight);
        this.ctx.rotate(-(Math.PI / 180 * this.angle));
        this.ctx.translate(-(this.x + halfWidth), -(this.y + halfHeight));
        if (this.isFocused) {
            this.drawBox();
        }
        this.ctx.drawImage(this.img, this.x, this.y);
        //this.ctx.arc(this.x+radius,this.y+radius,radius,0,Math.PI, true);
        //this.ctx.rotate(-(Math.PI/180*this.angle));
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.restore();
    }

    setFocus() {
        this.isFocused = true;
    }

    releaseFocus() {
        this.isFocused = false;
    }
    rotateShape(pos) {
        let ctx = this.ctx;
        let deltaX = pos.x - this.x;
        let deltaY = -(pos.y - this.y);
        let angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        
        
        this.angle = angle + 45;

        ctx.save();
        // ctx.fillStyle = 'rgba(255,255,255,0)';
        // ctx.fillRect(this.x, this.y, 10, 10);

        // ctx.clip();
        // ctx.clearRect(this.x,this.y, 50, 50);
        // this.draw();
        ctx.restore();
    }
}