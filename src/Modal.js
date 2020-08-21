export default function(){
    var modal = document.querySelector(".modal-popup");
    var container = modal.querySelector(".container");
    var closeBtn = document.getElementById('close-btn');
    document.querySelector(".trigger").addEventListener("click", function (e) {
      this.container = container;
        modal.classList.remove("hidden")
      console.log('show modal');
    });
    
    closeBtn.addEventListener("click", function (e) {
    //   if ( e.target ){
          modal.classList.add("hidden");
          console.log('hidden')
    //   }     
    });
}