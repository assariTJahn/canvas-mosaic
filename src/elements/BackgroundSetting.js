export default class BackgroundSetting {
    constructor(){
        this.width;
        this.height;
        
        this.backgroundColor;
        this.isGrid;
        this.settingElements = [
            document.getElementById('canvas-width'),
            document.getElementById('canvas-height'),
            document.getElementById('canvas-create-btn')
        ];

        // this.initEventListener();
    }

    initEventListener(){
        this.addEventHandlerToCreateButton();
    }

    addEventHandlerToCreateButton(){
        const btn = this.settingElements[2];
        const width = this.settingElements[0];
        const height = this.settingElements[1];

        btn.addEventListener('click',(e)=>{

            this.width  = width.value;
            this.height = height.value;
            btn.value   = 'RESET';
        })
    }

    getWidth(){
        return this.width;

    }
    getHeight(){
        return this.height;
    }
    
    setHeight(height){
        this.height = height;
    }
    setWidth(width){
        this.width = width;
    }
}