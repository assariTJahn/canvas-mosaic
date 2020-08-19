import DrawingArea from './DrawingArea';
import ToolBar from './elements/ToolBar';
import ImageRegistry from './elements/ImageRegistry';
import Controller from './elements/Controller'
import BackgroundSetting from './elements/BackgroundSetting'
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import './elements/menu-24px.svg';




function component() {
    
    
    
    const backgroundSetting = new BackgroundSetting();
    const imageRegistry = new ImageRegistry();
    const canvas        = new DrawingArea(320, 240, imageRegistry);
    const toolBar       = new ToolBar(imageRegistry);
    const controller    = new Controller(canvas);


    document.getElementById('drawing-area').appendChild(canvas.getContainer());


    
    document.getElementById('toolbar-area').appendChild(toolBar.getToolBarArea());
    document.getElementById('control-area').appendChild(controller.getController());
    

    
    
}

component();
