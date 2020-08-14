import DrawingArea from './DrawingArea';
import ToolBar from './elements/ToolBar';
import ImageRegistry from './elements/ImageRegistry';
import Controller from './elements/Controller'
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

function component(){
    const container = document.createElement('div');
    const row = document.createElement('div');
    const content = document.createElement('div');
    
    const mainSection = document.createElement('section');
    const headerSection = document.createElement('section');
    const header = document.createElement('div');
    
    const drawingArea = document.createElement('div');
    let toolBarArea = null;
    const controlArea = document.createElement('div');
    
    
    container.classList.add('container');//container
    
    const imageRegistry = new ImageRegistry();
    const canvas = new DrawingArea(800,400, imageRegistry);
    const toolBar = new ToolBar(imageRegistry);
    const controller = new Controller(drawingArea);
    
    const p = document.createElement('p');
    p.innerHTML = 'MOSAIC DEMO';
    header.appendChild(p);
    
    drawingArea. appendChild(canvas.getContainer());
    toolBarArea = toolBar.getToolBarArea();
    controlArea.appendChild(controller.getController());

    row.classList.add('row');
    content.classList.add('col-sm-8'); //for responsive layout
    toolBarArea.classList.add('col-sm-4');
    controlArea.classList.add('col-sm-4');
    
    
    headerSection.appendChild(header);
    mainSection.appendChild(drawingArea);
    
    
    content.appendChild(headerSection);
    content.appendChild(mainSection);
    
    row.appendChild(content);
    row.appendChild(controlArea);
    row.appendChild(toolBarArea);


    container.appendChild(row);

    return container;
}

document.body.appendChild(component());
