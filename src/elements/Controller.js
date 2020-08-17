import cancel from './baseline_close_black_18dp.png'
import rotate_left from './baseline_rotate_left_black_18dp.png';
import rotate_right from './baseline_rotate_right_black_18dp.png';

export default class Controller{
    constructor(drawingArea){
        this.outputContainer = document.createElement('div');
        this.outputContainer.classList.add('output-container');

        this.angle = document.createElement('input');
        this.angle.type = 'number';
        this.angle.classList.add('output');
        this.angle.style.height='38px';
        this.angle.style.width='45px';

        this.enter = document.createElement('input');
        this.enter.value = '入力';
        this.enter.type = 'button';
        this.enter.id = 'btn-enter';
        this.enter.style.height='38px';
        this.enter.style.width='100px';
        // this.antiClock.style.background =  rotate_left;
        this.enter.classList.add('button');

        this.antiClock = document.createElement('input');
        this.antiClock.type = 'button';
        this.antiClock.id = 'btn-anticlock';
        this.antiClock.style.background =  rotate_left;
        this.antiClock.classList.add('button');

        this.clockWise = document.createElement('input');
        this.clockWise.type = 'button';
        this.clockWise.id = 'btn-clockwise';
        this.clockWise.src = rotate_right;
        this.clockWise.classList.add('button');

        this.delete = document.createElement('input');
        this.delete.type = 'button';
        this.delete.id = 'btn-delete';
        this.delete.src = cancel;
        this.delete.classList.add('button');
        
        this.container = document.createElement('div');
        this.container.classList.add('controller-container');
        

        this.arrElements = [
            this.angle,
            this.enter,
            this.clockWise,
            this.antiClock,
            this.delete
        ]


        Array.prototype.forEach.call(this.arrElements, (item)=>{
            this.outputContainer.appendChild(item)
        })

        // this.outputContainer.appendChild(this.angle);
        // this.outputContainer.appendChild(this.enter);
        // this.outputContainer.appendChild(this.clockWise);
        // this.outputContainer.appendChild(this.antiClock);
        // this.outputContainer.appendChild(this.delete);
        
        this.container.appendChild(this.outputContainer);
        
        

        this.drawingArea = drawingArea;
        this.initEventHandler();
    }



    getController(){
        return this.container;
    }

    initEventHandler(){
        this.clockwiseEvent();
        this.antiClockWiseEvent();
        this.deleteEvent();
    }

    clockwiseEvent(){
        this.clockWise.addEventListener('click',(e)=>{
            const shape = this.drawingArea.getCurrentShape();
            shape.setAngle(-5);
        })
    }

    antiClockWiseEvent(){
        this.antiClock.addEventListener('click',(e)=>{
            const shape = this.drawingArea.getCurrentShape();
            shape.setAngle(-5)
        })
    }
    deleteEvent(){
        this.delete.addEventListener('click',(e)=>{

        })
    }

}