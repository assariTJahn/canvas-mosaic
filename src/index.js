import DrawingArea from './DrawingArea';
import ToolBar from './elements/ToolBar';
import ImageRegistry from './elements/ImageRegistry';
import './main.css';

function component(){
    const container = document.createElement('div');
    container.classList.add('container');
    const nav = document.createElement('nav');
    const mainSection = document.createElement('section');
    const headerSection = document.createElement('section');
    
    const drawingArea = document.createElement('div');
    const toolBarArea = document.createElement('div');
    const header = document.createElement('div');


    const imageRegistry = new ImageRegistry();
    const canvas = new DrawingArea(400,400, imageRegistry);
    const toolBar = new ToolBar(imageRegistry);
    const p = document.createElement('p');
    p.innerHTML = 'DEMO MOSAIC';
    header.appendChild(p);

    drawingArea. appendChild(canvas.getCanvas());
    toolBarArea.appendChild(toolBar.getToolBarArea());
    nav.appendChild(toolBarArea);

    headerSection.appendChild(header);
    mainSection.appendChild(drawingArea);
    container.appendChild(nav);
    container.appendChild(headerSection);
    container.appendChild(mainSection);

    return container;
}

document.body.appendChild(component());
