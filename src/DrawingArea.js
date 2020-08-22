import ShapeObject from './elements/Shape';
import MouseCursor from './elements/MouseCursor';
import './drawingArea.css'
export default class DrawingArea {
    constructor(canvas, imageRegistry, modal) {

        this.container = document.getElementsByClassName('canvas-container')[0];
        this.canvas = canvas;

        this.tilesize = 10;//can be changeable
        this.tile = null;

        this.imageRegistry = imageRegistry;

        this.modal = modal;


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
        const canvas = this.canvas;
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

    getContainer() {
        return this.container;
    }

    getCanvas() {
        return this.canvas;

    }
    getContext(option) {
        return this.canvas.getContext(option || '2d');
    }


    initEventListener() {
        //keyboard & mouse
        this.onMouseMoveEvent();
        this.onMouseDownEvent();
        this.onMouseUpEvent();
        this.onKeyDownEvent();

        //mobile environment
        this.onTouchStart();
        this.onTouchEnd();
        this.onTouchDrag();

    }

    onTouchDrag(e) {
        this.getContainer().addEventListener('touchmove', (e) => {
            this.moveEvent(e);
        })
    }

    onTouchEnd() {
        this.getContainer().addEventListener('touchend', (e) => {
            this.endEvent(e);
        })
    }

    endEvent(e) {
        if (this.getCurrentShape() != null) {
            this.getCurrentShape().rotateModeOff();
            this.getCurrentShape().moveModeOff();
        }
    }

    onMouseUpEvent() {
        this.getContainer().addEventListener('mouseup', (e) => {
            this.endEvent(e);
        })
    }

    dealWithNewShapeObject(e, pos, entry) {
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
    }

    doubleTapEvent(e, pos, entry) {
        const activeTime = 400;

        //double tap
        this.timeStart = this.timeEnd;
        this.timeEnd = Date.now();
        // let timeDiff = this.timeEnd - this.timeStart;

        if (this.timeEnd - this.timeStart < activeTime) {
            //open modal popup for control panel
            console.log(e);
            this.modal.setPosition({
                x: pos.x,
                y: pos.y
            })
            document.querySelector(".modal-popup").classList.remove('hidden');
        }
    }

    touchEvent(e, pos, entry) {
        if ((e instanceof TouchEvent && e.touches.length > 1) || this.getCurrentShape().isInCornerRect(pos)) {
            this.getCurrentShape().rotateModeOn();
        }
    }

    dealWithCurrentShapeObject(e, pos, entry) {

        this.doubleTapEvent(e, pos, entry);
        this.touchEvent(e, pos, entry);
        

        if (this.getCurrentShape().isInCenterRect(pos)) {
            this.getCurrentShape().moveModeOn();
        }
    }

    startEvent(e) {
        const pos = this.mouseCursor.getMousePosition(e);
        const entry = this.imageRegistry.getCurrentEntry();//get chosen image from the registry.

        if (entry != null) {
            //create new Shape Object
            this.dealWithNewShapeObject(e, pos, entry);

        } else {//
            //if it clicks on shape element, move focus. if it clicks empty space, release everything.
            let targetElement = this.checkClickedArea(pos);//algorithm should be optimized.
            if (targetElement == null) {//when it chose empty space.
                // console.log('empty space');
                if (this.getCurrentShape() != null) {
                    this.getCurrentShape().releaseFocus();
                }
                this.setCurrentShape(null);

            } else {//when it clicked on current shape element or other shape element.
                e.preventDefault();


                if (this.getCurrentShape() == targetElement) {
                    this.dealWithCurrentShapeObject(e, pos, entry);


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
    }
    onMouseDownEvent() {
        this.container.addEventListener('mousedown', (e) => {
            this.startEvent(e);
        })
    }

    onTouchStart() {
        this.container.addEventListener('touchstart', (e) => {


            this.startEvent(e)



            //single tap
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

    moveEvent(e) {
        this.mouseCursor.updateMousePosition(e);
        let pos = this.mouseCursor.getMousePosition(e);


        if (this.imageRegistry.currentEntry != null) {//default status

            this.redraw();
            this.drawMouseCursor()

        } else {
            if (this.getCurrentShape() != null && this.getCurrentShape().isRotateMode()) {
                this.getCurrentShape().rotateShape(pos);
            }
            if (this.getCurrentShape() != null && this.getCurrentShape().isMoveMode()) {
                this.getCurrentShape().move(pos);
            }
            if (this.getCurrentShape() == null) {
                // console.log('scroll');
            }
            this.redraw();
        }
    }



    onMouseMoveEvent() {


        this.canvas.addEventListener('mousemove', (e) => {
            this.moveEvent(e);




        })

    }
    removeCurrentShape() {
        const originLeng = this.imageStack.length;
        this.imageStack = this.imageStack.filter((value, index, arr) => {
            return value != this.getCurrentShape()
        });
        return this.imageStack.length != originLeng;
    }

    onKeyDownEvent() {

        this.container.addEventListener('keydown', (e) => {
            e.preventDefault();


            // console.log(e.keyCode);
            switch (e.keyCode) {

                case 8://delete key
                    this.removeCurrentShape();
                    break;

                case 37: case 38: case 39: case 40://arrow keys
                    if (e.altKey) {
                        this.rotateShapeObj(e);

                    } else {
                        this.moveShapeObj(e);
                    }
                    break;

                default:
                    break;
            }
            this.redraw();
        })
    }

    rotateShapeObj(e) {
        const currentShape = this.getCurrentShape();
        if (currentShape == null) {
            return;
        }
        switch (e.keyCode) {
            case 37: case 40://left down
                currentShape.setAngle(-1);
                break;
            case 38: case 39://up right
                currentShape.setAngle(1);
                break;

            default:
                break;
        }
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