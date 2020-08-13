import cancel from './baseline_close_black_18dp.png'
import rotate_left from './baseline_rotate_left_black_18dp.png';
import rotate_right from './baseline_rotate_right_black_18dp.png';
import './controller.css';
export default class Controller{
    constructor(drawingArea){
        this.angle = document.createElement('input');
        this.angle.type = 'number';
        this.antiClock = document.createElement('input');
        this.antiClock.type = 'image';
        this.antiClock.src =  rotate_left;
        this.clockWise = document.createElement('input');
        this.clockWise.type = 'image';
        this.clockWise.src = rotate_right;
        this.delete = document.createElement('input');
        this.delete.type = 'image';
        this.delete.src = cancel;
        
        this.container = document.createElement('div');
        this.container.classList.add('controller-container');
        
        this.container.appendChild(this.angle);
        this.container.appendChild(this.antiClock);
        this.container.appendChild(this.clockWise);
        this.container.appendChild(this.delete);

        this.drawingArea = drawingArea;
    }

    getController(){
        return this.container;
    }
}