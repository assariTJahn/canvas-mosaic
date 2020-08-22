export default class Modal {
    constructor(modalClass, closeBtnId) {
        this.modal = null;
        this.closeBtn = null;

        window.onload = (e)=> {
            this.modal = document.querySelector(modalClass);//"modal-popup"
            this.closeBtn = document.getElementById(closeBtnId);//'close-btn'
            this.initEventHandler();

        }
        
    }
    
    
    initEventHandler(){
        document.querySelector(".trigger").addEventListener("click", (e)=> {
            this.modal.classList.remove("hidden")
        });
    
        this.closeBtn.addEventListener("click", (e)=> {
            this.modal.classList.add("hidden");
        });

    }

    openModal(){
        this.modal.classList.remove('hidden');
    }

    closeModal(){
        this.modal.classList.add('hidden');
    }

    setTop(x){
        this.modal.style.top = x+'px';
    }

    setLeft(y){
        this.modal.style.left = y+'px';
    }

    setPosition(objPosition){
        const x = objPosition.x;
        const y = objPosition.y;
        console.log(x,y)
        this.setTop(y);//left
        this.setLeft(x)
    }
}