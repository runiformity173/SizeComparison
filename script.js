let currentIndex = -1;

// 5 at any one time, padding, set translations for panels and dynamic scaling for images
// Opacity 0 for text unless focused
// 2 padding empty elements at the smallest and largest
//     preloading function to load the lowest 5
//     currentIndex = 2 

function nextImage() {
	currentIndex++;
	const output = document.getElementById("output");
	output.firstElementChild.remove();

	const [name, size, description, src] = data[data.objects[order[currentIndex][1]]];
	output.lastElementChild.children[0].innerHTML = name;
	output.lastElementChild.children[1].innerHTML = description;
	output.lastElementChild.children[2].src = src;
	output.lastElementChild.children[3].innerHTML = size;
	const newPanel = document.createElement("div");
	newPanel.className = "panel";
	newPanel.innerHTML = `<h1 class="name"></h1>
		<h2 class="description"></h2>
		<img>
		<h2 class="size"></h2>`;
	output.appendChild(newPanel);
	try {

	} catch {

	}
}
function lastImage() {
	currentIndex--;
	const [name, size, description, src] = data[data.objects[order[currentIndex][1]]];
	document.getElementById("output3").children[0].innerHTML = name;
	document.getElementById("output3").children[1].innerHTML = description;
	document.getElementById("output3").children[2].src = src;
	document.getElementById("output3").children[3].innerHTML = size;
}

function parseToMeters(e){var m={ym:1e-24,zm:1e-21,am:1e-18,fm:1e-15,pm:1e-12,nm:1e-9,"μm":1e-6,um:1e-6,mm:.001,cm:.01,dm:.1,m:1,dam:10,hm:100,km:1e3,Mm:1e6,Gm:1e9,Tm:1e12,Pm:1e15,Em:1e18,Zm:1e21,Ym:1e24},a=(e=e.replace(/&lt;/g,"").replace(/[()<>]/g,"").replace(/,/g,"").trim()).match(/^([\d.]+)-([\d.]+)([a-zμ]+)/i);if(a){var[,r,a,t]=a;return(parseFloat(r)+parseFloat(a))/2*(m[t]||1)}t=e.match(/^([\d.]+e[+-]?\d+)([a-zμ]*)$/i);if(t){var[,t,p]=t;return parseFloat(t)*(m[p]||1)}p=e.match(/([\d.]+)\s*([a-zμ]+)/i);if(p){var[,e,p]=p;return parseFloat(e)*(m[p]||1)}return NaN}

window.addEventListener("keydown",function(e) {
	if (e.key === "ArrowLeft") lastImage();
	if (e.key === "ArrowRight") nextImage();
})