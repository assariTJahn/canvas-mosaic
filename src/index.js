import DrawingArea from './DrawingArea';
import ToolBar from './elements/ToolBar';
import ImageRegistry from './elements/ImageRegistry';
import Controller from './elements/Controller'
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import './elements/menu-24px.svg';

function component() {
    /**
     * Layout setting
     */
    const container     = document.createElement('div');
    const row           = document.createElement('div');
    const content       = document.createElement('div');

    const mainSection   = document.createElement('section');
    const drawingArea   = document.createElement('div');
    const controlArea   = document.createElement('div');//navigation, toggle mode
    
    
    
    controlArea.id = 'footer';
    controlArea.classList.add('sidenav');
    // controlArea.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
    
    const openBtn = document.createElement('a');
    openBtn.innerText = 'button';
    openBtn.id = 'toggle-btn';
    openBtn.classList.add('closebtn');
    openBtn.href = 'javascript:void(0)';

    const closeBtn = document.createElement('a');
    closeBtn.innerText = 'X';
    // closeBtn.id = 'toggle-btn';
    closeBtn.classList.add('closebtn');
    closeBtn.href = 'javascript:void(0)';
    
    const openNavigation = (e)=>{
        //open
        controlArea.style.height = '50%';
    };

    const closeNavigation = (e)=> {
        controlArea.style.height = '0';
    }

    openBtn.onclick = openNavigation;
    closeBtn.onclick = closeNavigation;

    controlArea.appendChild(closeBtn);
    

    container.classList.add('container');//container

    const imageRegistry = new ImageRegistry();
    const canvas        = new DrawingArea(800, 400, imageRegistry);
    const toolBar       = new ToolBar(imageRegistry);
    const controller    = new Controller(drawingArea);



    drawingArea.appendChild(canvas.getContainer());

    controlArea.appendChild(controller.getController());
    controlArea.appendChild(toolBar.getToolBarArea());
    
    row.classList.add('row');

    content.classList.add('col-sm-12'); //for responsive layout
    // controlArea.classList.add('col-sm-4');


    mainSection.appendChild(drawingArea);


    // content.appendChild(headerSection);
    content.appendChild(mainSection);

    row.appendChild(content);
    // row.appendChild(controlArea);
    // row.appendChild(toolBarArea);


    container.appendChild(row);
    
    document.body.appendChild(container);
    document.body.appendChild(openBtn);
    document.body.appendChild(controlArea);
    
}

component();
