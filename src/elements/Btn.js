export default class Btn {
    constructor(entry){
        const label = document.createElement('label');
        const input = document.createElement('input');
        label.appendChild(input);
        label.appendChild(entry.getImage());

        input.value = entry.getIndex();
        input.type = 'radio';
        input.name = 'tiles';
        input.classList.add('button');
        
        this.entry = entry;
        this.btn = label;
        this.input = input;
    }

    getElement(){
        return this.btn;
    }

    addEventListener(event, fn){
        return this.input.addEventListener(event,(e)=>{
            fn(e, this.entry);
        });
    }
}