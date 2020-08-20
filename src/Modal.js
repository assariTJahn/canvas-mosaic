export default function(){
    var modal = document.querySelector(".modal-popup");
    var container = modal.querySelector(".container");
    
    document.querySelector(".trigger").addEventListener("click", function (e) {
      modal.classList.remove("hidden")
    });
    
    document.querySelector(".modal-popup").addEventListener("click", function (e) {
      if (e.target !== modal && e.target !== container) return;     
      modal.classList.add("hidden");
    });
}