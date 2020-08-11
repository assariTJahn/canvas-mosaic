import Btn from './Btn';
import './toolbar.css';
export default class ToolBar {
    constructor(imageRegistry){
        
        this.elmToolBar=document.createElement('div');;
        this.currentOption=null;
        this.imageRegistry = imageRegistry;
        this.toolBarArea = document.createElement('canvas');
        // this.elmToolBar.style.borderWidth = '1px';
        // this.elmToolBar.style.borderStyle = 'solid';
        // this.elmToolBar.style.borderColor = 'blue';
        imageRegistry.subscribe((imgRegistry)=>{
            this.drawToolBarOptions(imgRegistry);//사실은 이미지로딩이 끝날 때, 콜백으로 호출해야 함
        });
        imageRegistry.setToolbarCallbackFn(()=>{
            
            if (this.currentOption!=null) {
                this.currentOption.checked = false;
            }
        });
    }

    getToolBarArea(){
        // return this.toolBarArea;
        return this.elmToolBar;
    }

    getContext(){
        return this.toolBarArea.getContext('2d');
    }
    drawToolBarOptions(imgRgstry){
        const elmToolBar = this. elmToolBar;
        const imgAssets = imgRgstry.assets;
        // ctx.save();

        for(let i = 0; i<imgAssets.length; i++){
            
            let entry = imgAssets[i];

            // elmToolBar.appendChild(entry.getImage());
            let btn = new Btn(entry);
            elmToolBar.appendChild(btn.getElement());
            btn.addEventListener('click',(e, entry)=>{
                this.currentOption = e.target;
                imgRgstry.setCurrentEntry(e, entry);
            });
        }
        // elmToolBar.addEventListener('click',(e)=>{
        //     const elms = document.getElementsByName('tiles');
        //     this.currentOption = this.findCurrentTile(elms);
        //     this.imageRegistry.setCurrentTile(this.currentOption);
        // });
        // ctx.restore();
    }
    findCurrentTile(tiles){
        for(let i = 0; i<tiles.length; i++){
            // console.log(tiles[i].checked)
            if(tiles[i].checked==true){
                return tiles[i];
            }
        }
    }
    
    getCurrentOption(){
        
        return this.currentOption;
    }
}

