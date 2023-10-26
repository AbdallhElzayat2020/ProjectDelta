const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const texts = document.querySelectorAll(".subscribe-long") 
if(window.innerWidth < 770) {
    texts.forEach((text) => {
        text.innerHTML = "سنه /"
    })
    texts[2].innerHTML = "شهر /"
}
window.addEventListener("resize", () => {
    if(window.innerWidth < 770) {
        texts.forEach((text) => {
            text.innerHTML = "سنه /"
        })
        texts[2].innerHTML = "شهر /"
    }
    else {
        texts.forEach((text) => {
            text.innerHTML = "لمدة سنه"
        })
        texts[2].innerHTML = "لمدة شهر"
    }
})
checkboxes.forEach(checkbox => {
 checkbox.addEventListener('click', () => {
   // Active current checkbox
   checkbox.checked = true;

   // Loop all checkboxes and disable all except current
   checkboxes.forEach(otherCheckbox => {
     if (otherCheckbox !== checkbox) {
       otherCheckbox.checked = false;
     }
   });
 });
});