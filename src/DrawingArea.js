import ShapeObject from './elements/Shape';
import MouseCursor from './elements/MouseCursor';
export default class DrawingArea {
    constructor(width, height, imageRegistry) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.tilesize = 10;//can be changeable
        this.tile = null;

        this.imageRegistry = imageRegistry;

        //debugmode


        this.canvas.style.borderStyle = 'solid';
        this.canvas.style.borderColor = '#73AD21';
        this.canvas.style.borderWidth = '1px';
        this.imageStack = [];
        this.currentX = -1;
        this.currentY = -1;

        this.eventStatus = {};

        this.mouseCursor = new MouseCursor(this);

        this.imageStack = [];
        this.currentShape = null;

        this.fillBackground();
        this.drawGrid();
        this.initEventListener();
    }
    setCurrentTile(tile) {
        this.tile = tile;
    }
    fillBackground() {
        const ctx = this.getContext();
        ctx.save();
        ctx.fillStyle = '#73AD21';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.restore();
    }
    drawGrid() {
        const ctx = this.getContext();
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < this.canvas.width; i += 10) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, this.canvas.height);
        }
        for (let i = 0; i < this.canvas.width; i += 10) {
            ctx.moveTo(0, i);
            ctx.lineTo(this.canvas.width, i);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

    }

    clearDrawingArea() {
        //quad tree 만들것
        const ctx = this.getContext();
        const canvas = this.getCanvas();
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);//전체를 그리면 리소스 사용이 많다
        ctx.restore();
    }

    redraw() {
        this.clearDrawingArea();
        let len = this.imageStack.length;
        this.drawGrid();
        if (len <= 0) {
            return;
        }
        for (let i = 0; i < len; i++) {
            this.imageStack[i].draw();
        }
    }



    getCanvas() {
        return this.canvas;

    }
    getContext(option) {
        return this.canvas.getContext(option || '2d');
    }


    initEventListener() {
        this.onMouseMoveEvent();
        this.onMouseDownEvent();
        this.onMouseUpEvent();
        this.onKeyDownEvent();
    }

    onMouseUpEvent() {
        this.canvas.addEventListener('mouseup', (e) => {
            if (this.getCurrentShape() != null) {
                this.getCurrentShape().rotateModeOff();
                this.getCurrentShape().moveModeOff();
            }
        })
    }


    onMouseDownEvent() {
        this.canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const pos = this.mouseCursor.getMousePosition(e);
            const entry = this.imageRegistry.currentEntry;//get chosen image from the registry.

            if (entry != null) {
                if (this.getCurrentShape() != null) {//set new shape element
                    this.getCurrentShape().releaseFocus();//blur
                }
                this.imageRegistry.releaseCurrentEntry();//release current entry from registry
                let shapeObj = new ShapeObject(this.getContext(), pos.x, pos.y);//create new shape object for drawing area

                shapeObj.setImage(entry.getImage());
                this.imageStack.push(shapeObj);
                this.setCurrentShape(shapeObj);
                this.getCurrentShape().setFocus();

                this.redraw();

            } else {//
                //if it clicks on shape element, move focus. if it clicks empty space, release everything.
                let targetElement = this.checkClickedArea(pos);//algorithm should be optimized.
                if (targetElement == null) {//when it chose empty space.
                    console.log('empty space');
                    if (this.getCurrentShape() != null) {
                        this.getCurrentShape().releaseFocus();
                    }
                    this.setCurrentShape(null);

                } else {//when it clicked on current shape element or other shape element.
                    if (this.getCurrentShape() == targetElement) {
                        console.log('same element');
                        //rotation or translate
                        if (this.getCurrentShape().isInCornerRect(pos)) {
                            this.getCurrentShape().rotateModeOn();
                        }
                        if (this.getCurrentShape().isInCenterRect(pos)) {
                            this.getCurrentShape().moveModeOn();
                        }
                    } else {
                        targetElement.setFocus();
                        if (this.getCurrentShape() != null) {
                            this.getCurrentShape().releaseFocus();
                        }
                        this.setCurrentShape(targetElement);

                    }

                }
                this.redraw();
            }

        })
    }

    checkClickedArea(mousePosition) {
        const stack = this.imageStack;
        const pos = mousePosition;
        let rect = null;
        let isX = false;
        let isY = false;

        for (let i = 0; i < stack.length; i++) {
            rect = stack[i].getRect();
            if (pos.x >= rect.x && pos.x <= rect.x + rect.width) {
                isX = true;
            }
            if (pos.y >= rect.y && pos.y <= rect.y + rect.height) {
                isY = true;
            }

            if (isX && isY) {
                return stack[i];
            }
            isX = false;
            isY = false;
        }
        return null;
    }

    setCurrentShape(shapeObj) {
        this.currentShape = shapeObj;
    }

    getCurrentShape() {
        return this.currentShape;
    }

    onMouseMoveEvent() {
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouseCursor.updateMousePosition(e);
            let pos = this.mouseCursor.getMousePosition(e);


            if (this.imageRegistry.currentEntry != null) {//기본조건

                this.redraw();
                this.drawMouseCursor()

            } else {
                if (this.getCurrentShape() != null && this.getCurrentShape().isRotateMode()) {
                    this.getCurrentShape().rotateShape(pos);
                }
                if (this.getCurrentShape() != null && this.getCurrentShape().isMoveMode()) {
                    this.getCurrentShape().move(pos);
                }
                this.redraw();
            }




        })

    }
    removeCurrentShape() {
        this.imageStack = this.imageStack.filter((value, index, arr) => {
            return value != this.getCurrentShape()
        });
    }

    onKeyDownEvent() {
        const container = document.getElementsByClassName('container')[0];
        window.addEventListener('keydown', (e) => {
            e.preventDefault();


            console.log(e.keyCode);
            switch (e.keyCode) {
            
                case 8://delete key
                    this.removeCurrentShape();
                    break;

                case 37:case 38:case 39:case 40://arrow keys
                    this.moveShapeObj(e);
                    break;

                default:
                    break;
            }
            this.redraw();
        })
    }
    moveShapeObj(e) {
        const currentShape = this.getCurrentShape();
        if (currentShape == null) {
            return;
        }
        switch (e.keyCode) {
            case 37:
                //left
                currentShape.moveHorizontal(-1);

                break;
            case 38:
                //up
                currentShape.moveVertical(-1);

                break;
            case 39:
                //right
                currentShape.moveHorizontal(1);
                break;
            case 40:
                //down
                currentShape.moveVertical(1);

                break;

            default:
                break;
        }
    }
    drawMouseCursor() {
        this.mouseCursor.draw();
    }
}