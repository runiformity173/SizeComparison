// 5 at any one time, padding, set translations for panels and dynamic scaling for images
// Opacity 0 for text unless focused
// 2 padding empty elements at the smallest and largest
//     preloading function to load the lowest 5
//     currentIndex = 2 
function load(index, element) {
	const [name, size, description, src] = data[data.objects[order[index][1]]];
	element.children[0].innerHTML = name;
	element.children[1].innerHTML = description;
	element.children[2].lastElementChild.src = src;
	element.children[3].innerHTML = size;
}
function nextImage() {
	if (currentIndex >= order.length-1) return;
	currentIndex++;
	const output = document.getElementById("output");
	output.firstElementChild.remove();

	const newPanel = document.createElement("div");
	newPanel.className = "panel";
	newPanel.innerHTML = `<h1 class="name"></h1>
		<h2 class="description"></h2>
		<div><span class="helper"></span><img></div>
		<h2 class="size"></h2>`;
	output.appendChild(newPanel);
	load(currentIndex,output.lastElementChild)
	const [a,b,c,d,e] = document.getElementsByClassName("panel");
	a.id = "off-left-panel";
	b.id = "left-panel";
	c.id = "center-panel";
	d.id = "right-panel";
	e.id = "off-right-panel";
	const [aSize,bSize,cSize,dSize,eSize] = [parseToMeters(order[currentIndex-4][0]),parseToMeters(order[currentIndex-3][0]),parseToMeters(order[currentIndex-2][0]),parseToMeters(order[currentIndex-1][0]),parseToMeters(order[currentIndex][0])];
	a.children[2].lastElementChild.style.transform = `scale(${aSize/bSize})`;
	b.children[2].lastElementChild.style.transform = `scale(${bSize/cSize})`;
	c.children[2].lastElementChild.style.transform = `scale(${1})`;
	d.children[2].lastElementChild.style.transform = `scale(${dSize/cSize})`;
	e.children[2].lastElementChild.style.transform = `scale(${eSize/dSize})`;
}
function lastImage() {
	if (currentIndex-4 <= 0) return;
	currentIndex--;
	const output = document.getElementById("output");
	output.lastElementChild.remove();

	const newPanel = document.createElement("div");
	newPanel.className = "panel";
	newPanel.innerHTML = `<h1 class="name"></h1>
		<h2 class="description"></h2>
		<div><span class="helper"></span><img></div>
		<h2 class="size"></h2>`;
	output.prepend(newPanel);
	load(currentIndex-4,output.firstElementChild);
	const [a,b,c,d,e] = document.getElementsByClassName("panel");
	a.id = "off-left-panel";
	b.id = "left-panel";
	c.id = "center-panel";
	d.id = "right-panel";
	e.id = "off-right-panel";
	const [aSize,bSize,cSize,dSize,eSize] = [parseToMeters(order[currentIndex-4][0]),parseToMeters(order[currentIndex-3][0]),parseToMeters(order[currentIndex-2][0]),parseToMeters(order[currentIndex-1][0]),parseToMeters(order[currentIndex][0])];
	a.children[2].lastElementChild.style.transform = `scale(${aSize/bSize})`;
	b.children[2].lastElementChild.style.transform = `scale(${bSize/cSize})`;
	c.children[2].lastElementChild.style.transform = `scale(${1})`;
	d.children[2].lastElementChild.style.transform = `scale(${dSize/cSize})`;
	e.children[2].lastElementChild.style.transform = `scale(${eSize/dSize})`;
}
function initialLoad() {
	const [a1,a2,a3,a4,a5] = document.getElementsByClassName("panel");
	load(currentIndex-4,a1);
	load(currentIndex-3,a2);
	load(currentIndex-2,a3);
	load(currentIndex-1,a4);
	load(currentIndex,a5);
}
function parseToMeters(e){var m={ym:1e-24,zm:1e-21,am:1e-18,fm:1e-15,pm:1e-12,nm:1e-9,"μm":1e-6,um:1e-6,mm:.001,cm:.01,dm:.1,m:1,dam:10,hm:100,km:1e3,Mm:1e6,Gm:1e9,Tm:1e12,Pm:1e15,Em:1e18,Zm:1e21,Ym:1e24},a=(e=e.replace(/&lt;/g,"").replace(/[()<>]/g,"").replace(/,/g,"").trim()).match(/^([\d.]+)-([\d.]+)([a-zμ]+)/i);if(a){var[,r,a,t]=a;return(parseFloat(r)+parseFloat(a))/2*(m[t]||1)}t=e.match(/^([\d.]+e[+-]?\d+)([a-zμ]*)$/i);if(t){var[,t,p]=t;return parseFloat(t)*(m[p]||1)}p=e.match(/([\d.]+)\s*([a-zμ]+)/i);if(p){var[,e,p]=p;return parseFloat(e)*(m[p]||1)}return NaN}

window.addEventListener("keydown",function(e) {
	if (e.key === "ArrowLeft") lastImage();
	if (e.key === "ArrowRight") nextImage();
})