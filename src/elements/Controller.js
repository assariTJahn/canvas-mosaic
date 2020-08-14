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
        this.angle.style.height='36px';

        this.antiClock = document.createElement('input');
        this.antiClock.type = 'image';
        this.antiClock.src =  rotate_left;
        this.antiClock.classList.add('button');

        this.clockWise = document.createElement('input');
        this.clockWise.type = 'image';
        this.clockWise.src = rotate_right;
        this.clockWise.classList.add('button');

        this.delete = document.createElement('input');
        this.delete.type = 'image';
        this.delete.src = cancel;
        this.delete.classList.add('button');
        
        this.container = document.createElement('div');
        this.container.classList.add('controller-container');
        
        this.outputContainer.appendChild(this.angle);
        this.outputContainer.appendChild(this.clockWise);
        this.outputContainer.appendChild(this.antiClock);
        this.outputContainer.appendChild(this.delete);
        
        this.container.appendChild(this.outputContainer);
        
        // this.container.appendChild(this.clockWise);
        // this.container.appendChild(this.antiClock);
        // this.container.appendChild(this.delete);

        this.drawingArea = drawingArea;
    }

    getController(){
        return this.container;
    }
}