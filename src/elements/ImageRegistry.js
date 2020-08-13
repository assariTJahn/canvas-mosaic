import heartRed from '../images/heart_red.png';
import heartBlue from '../images/heart_skyblue.png';
import heartYellow from '../images/heart_orange.png';
import heartPurple from '../images/heart_green.png';
export default class ImageRegistry {
    constructor() {
        this.imageList = [
            heartRed,
            heartBlue,
            heartYellow,
            heartPurple
        ];
        this.assets = [];
        this.subscriber = [];
        this.loadImages();
        this.currentEntry=null;//chosen tile image
        this.releaseToolBarSelectionFn;
    }
    setToolbarCallbackFn(fn){
        this.releaseToolBarSelectionFn = fn;
    }

    releaseCurrentEntry(){
        this.currentEntry=null;
        if(this.releaseToolBarSelectionFn!=null){
            this.releaseToolBarSelectionFn();
        }
    }

    getCurrentEntry(){
        return this.currentEntry;
    }

    setCurrentEntry(event, entry) {
        this.currentEntry = entry;
        
    }
    loadImages() {
        let len = this.imageList.length;

        this.imageList.forEach((item, index) => {

            let entry = new Entry(item, index, () => {
                len--;
                this.assets.push(entry);
                this.isLoadFinished(len);
            });


        });


    }
    subscribe(fn) {
        this.subscriber.push(fn);
    }

    runCallbackFn() {
        const subscriber = this.subscriber;
        for (let i = 0; i < subscriber.length; i++) {
            subscriber[i](this);
        }
    }

    isLoadFinished(len) {
        if (len <= 0) {
            console.log('Load finished');
            this.runCallbackFn();
        } else {
            console.log('Now loading images...(' + this.assets.length + '/' + this.imageList.length + ')');
        }
    }

}

class Entry {
    constructor(img, index, fn) {
        this.img = new Image();
        this.img.onload = fn;
        this.img.src = img;
        this.index = index;
    }
    getImage() {
        return this.img==null?null:this.img;
    }
    getIndex() {
        return this.index;
    }
    getRect() {
        return {
            width: this.img.width,
            height: this.img.height
        }
    }
}