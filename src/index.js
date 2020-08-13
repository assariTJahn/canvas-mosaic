import DrawingArea from './DrawingArea';
import ToolBar from './elements/ToolBar';
import ImageRegistry from './elements/ImageRegistry';
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
    
    
    container.classList.add('container');//container
    
    const imageRegistry = new ImageRegistry();
    const canvas = new DrawingArea(800,400, imageRegistry);
    const toolBar = new ToolBar(imageRegistry);
    const p = document.createElement('p');
    p.innerHTML = 'MOSAIC DEMO';
    header.appendChild(p);
    
    drawingArea. appendChild(canvas.getContainer());
    toolBarArea = toolBar.getToolBarArea();
    
    row.classList.add('row');
    content.classList.add('col-sm-8'); //for responsive layout
    toolBarArea.classList.add('col-sm-4');

    headerSection.appendChild(header);
    mainSection.appendChild(drawingArea);
    
    
    content.appendChild(headerSection);
    content.appendChild(mainSection);
    
    row.appendChild(content);
    row.appendChild(toolBarArea);


    container.appendChild(row);

    return container;
}

document.body.appendChild(component());
