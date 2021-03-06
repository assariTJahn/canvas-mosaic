import DrawingArea from './DrawingArea';
import ToolBar from './elements/ToolBar';
import ImageRegistry from './elements/ImageRegistry';
import Controller from './elements/Controller'
import BackgroundSetting from './elements/BackgroundSetting';
import Modal from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import './modal.css';
import './elements/menu-24px.svg';




function component() {
    const canvas = document.getElementById('canvas');
    canvas.width = 400;
    canvas.height = 400;

    const modal             = new Modal('.modal-popup', 'close-btn');
    const backgroundSetting = new BackgroundSetting(canvas);
    const imageRegistry     = new ImageRegistry();//load image files
    const drawingArea       = new DrawingArea(canvas, imageRegistry, modal);
    const toolBar           = new ToolBar(imageRegistry);
    const controller        = new Controller(drawingArea);


    
    document.getElementById('toolbar-area').appendChild(toolBar.getToolBarArea());
    document.getElementById('control-area').appendChild(controller.getController());
    

    
}

component();
