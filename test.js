javascript:



function baslangic(){
	document.getElementsByClassName("button-1iktpaT1 size-m-2G7L7Qat intent-primary-1-IOYcbg appearance-default-dMjF_2Hu")[0].disabled=true;
	html = '<div style="margin-left:1%">';
	html += '<span>1. Değer Min&nbsp;</span>';
	html += '<input id = "inp1" style = "background-color:black;height: ' + periyot.offsetHeight + 'px;width: ' + periyot.offsetWidth + 'px"><br>';
	
	html += '<span>1. Değer Max</span>';
	html += '<input id = "inp2" style = "background-color:black;height: ' + periyot.offsetHeight + 'px;width: ' + periyot.offsetWidth + 'px"><br>';
	html += '<span>2. Değer Max</span>';
	html += '<input id = "inp3" style = "background-color:black;height: ' + periyot.offsetHeight + 'px;width: ' + periyot.offsetWidth + 'px"><br>';
	html += '<div id="blg"><textarea id = "bilgi_ekran" rows = "6" style = "background-color:black" ></textarea></div><br>';
	html += '<span id = "bilgi">Başlamadan önce ayarlarınızı kontrol edin!</span><br><br>';
	html += '<button id = "btn" class ="button-1iktpaT1 size-m-2G7L7Qat intent-primary-1-IOYcbg appearance-default-dMjF_2Hu">Başlat!</button>';
	html += '</div>';
	div = document.createElement("div");
	div.innerHTML = html;
	
	node = document.getElementsByClassName("scrollable-2CTvqFKf")[0];
	
	node.parentNode.insertBefore(div,node);
	inp1.value = cek(inp1.id);
	inp2.value = cek(inp2.id);
	inp3.value = cek(inp3.id);
	blg.style.marginLeft = inp1.offsetLeft + periyot.offsetWidth + "px";
	blg.style.top = inp1.parentNode.offsetTop + "px";
	blg.style.position = "absolute";
	
	btn.onclick = function(){ 
		baslat(this);
		return false;
	};
	
	
}
async function baslat(btn){
	
	
	if (btn.innerText == "Başlat!"){
		if(inp1.value != periyot.value){
			alert("Minimum değer doğru girilmedi");
			return;
		}
		durdur = true;
		pmin = inp1.value;
		pmax = inp2.value;
		smax = inp3.value;
		smin = smooth.value;

		kaydet("inp1", pmin);
		kaydet("inp2", pmax);
		kaydet("inp3", smax);

		btn.disabled = true;

		if(tcheck.checked){
			tcheck.click();
		}
		bilgi.innerHTML = "Stoploss-1 için deneniyor..";
		girisler.slos1[0] = true;
		await input_ayarla(stoploss, girisler.slos1[1]);
		await init();
		
	}
	
	return false;
	
}
function kaydet(key, val){
	localStorage.setItem(key, val.toString());
}

function cek(key){
	val = localStorage.getItem(key);
	if(val){
		return parseInt(val);
	}
	return 0;
}

function whl(inp, x){
	evt.deltaY = x;
	inp.dispatchEvent(evt);
}

async function eventFire(el, etype){
	setTimeout(function(){el.focus({preventScroll:false});
	},1);
}

async function clk(el){
	if(el.checked) {return;}
	setTimeout(function(){
		el.click();
	}, 1000);
}


async function sonuc_cek(){
	try{
		sonuc = parseFloat(document.getElementsByClassName("data-item")[0].getElementsByTagName("span")[0].innerText.split("%")[0]);
		
		if (isNaN(sonuc) || typeof(sonuc) == "undefined"){
			return parseFloat(0);
		}
		return sonuc;
	} catch(e){
		console.log(e);
		return 0;
	}
}

function hatalar(){

	if(typeof(periyot) == "undefined"){
		alert("Girdiler Penceresini Açmadınız!\nPencereyi açın ve minimum periyot/smooth değerlerini girin.\nProgramı sonra çalıştırın. ");	
		durdur = false;
		return;
	}
	baslangic();

}
function evt(){
	var event = document.createEvent('MouseEvents');

	event.initMouseEvent('wheel', true, true);
	return event;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function input_ayarla(inp, val){
	await eventFire(inp, "focus");
	wheel = 100;
	if (parseFloat(inp.value) < val){
		wheel = -100;	
	}
	while(parseFloat(inp.value) != parseFloat(val)){
		setTimeout(function(){whl(inp, wheel);},10);
		await delay(100);
	}
}

async function hmm_ok(){

	if(girisler.slos1[0] == false){
		bilgi.innerHTML = "Stoploss-1 için deneniyor..";
		girisler.slos1[0] = true;
		await input_ayarla(stoploss, girisler.slos1[1]);
	}
	else if (girisler.slos2[0] == false){
		bilgi.innerHTML = "Stoploss-2 için deneniyor..";
		girisler.slos2[0] = true;
		await input_ayarla(stoploss, girisler.slos2[1]);

	}	
	else if (girisler.tckslos1[0] == false){
		bilgi.innerHTML = "Tralling Stoploss-1 için deneniyor..";
		if(!tcheck.checked){
			await clk(tcheck);
		}
		girisler.tckslos1[0] = true;
		await input_ayarla(stoploss, girisler.tckslos1[1]);

	}
	else if (girisler.tckslos2[0] == false){
		bilgi.innerHTML = "Tralling Stoploss-2 için deneniyor..";
		if(!tcheck.checked){
			await clk(tcheck);
		}
		girisler.tckslos2[0] = true;
		await input_ayarla(stoploss, girisler.tckslos2[1]);

	}
	else{
		return "bitti";
	}
	return "devam";
}
async function init(){
	
	kazanc_max = await sonuc_cek();
	bilgi_ekran.value = "Periyot: " + parseInt(periyot.value) +"\nSmooth: " + parseInt(smooth.value) + "\nKazanç: % " + kazanc_max + "\n";
	while (durdur == true){

		if (typeof(smooth_deger) != "undefined" && smooth_deger >= smax){
			await input_ayarla(periyot, pmin);
			await input_ayarla(smooth, smin);
			sonuc_text += bilgi.innerText.split(" için")[0] + " :\n\n" + bilgi_ekran.value + "\n";
			if (await hmm_ok() == "bitti"){
				
				bilgi.innerHTML = "En yüksek değerler bulundu";
				alert("En yüksek değerler bulundu");
				bilgi_ekran.value = sonuc_text;
				return;
			}
			
		}
		periyot_deger = parseInt(periyot.value);
		smooth_deger = parseInt(smooth.value);
		
		if (periyot_deger < pmax && periyot_deger > pmin){
			basla = true;
			if(periyot != document.activeElement){
				await eventFire(periyot, "focus");
			}
			setTimeout(function(){whl(periyot, kontrol_up_down)},100);
			
			
		}
		
		
		
		else {
			if(smooth != document.activeElement){
				await eventFire(smooth, "focus");
					
			}
			if(basla == true){
				setTimeout(function(){whl(smooth, -100)},100);
			}

			if(periyot_deger == pmax){
				kontrol_up_down = 100;
			}
			else{
				kontrol_up_down = -100;
			}
			if(periyot != document.activeElement){
				await eventFire(periyot, "focus");
			}
			setTimeout(function(){whl(periyot, kontrol_up_down)},100);
			
			
			
		}
		await delay(900);
		kazanc = await sonuc_cek();
		
		son_sonuc = kazanc;
		if (kazanc > kazanc_max){
			bilgi_ekran.value = "Periyot: " + parseInt(periyot.value) +"\nSmooth: " + parseInt(smooth.value) + "\nKazanç: % " + kazanc + "\n";
			kazanc_max = kazanc;
		}	
		
		
	
	}
}
kontrol_up_down = -100;
basla = false;
sonuc_text = "";

girisler = {
	"slos1": [false, 2],
	"slos2" : [false, 15],
	"tckslos1" : [false, 2],
	"tckslos2" : [false, 15]
};

kazanc_max = 0;

evt = evt();
periyot = document.getElementsByClassName("input-3bEGcMc9 with-end-slot-S5RrC8PC")[0];
smooth = document.getElementsByClassName("input-3bEGcMc9 with-end-slot-S5RrC8PC")[1];
stoploss = document.getElementsByClassName("input-3bEGcMc9 with-end-slot-S5RrC8PC")[2];
tcheck = document.getElementsByClassName("input-24iGIobO")[0];


if (typeof(durdur) == "undefined" || durdur == false){
	durdur = true;
	hatalar();
}

else {
	durdur = false;
	alert("Program Durduruldu!");
	location.reload();
}


void(0);
