 let current = 0;
const track = document.getElementById("track");
const dots = document.querySelectorAll(".dot");

function move(i){
  current = i;
  track.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((d, idx)=> d.classList.toggle('active', idx===i));
}

// Auto-slide every 5 seconds
setInterval(()=>{
  current = (current + 1) % 4;
  move(current);
}, 5000);