function baslangic(){
	document.getElementsByClassName("button-1iktpaT1 size-m-2G7L7Qat intent-primary-1-IOYcbg appearance-default-dMjF_2Hu")[0].disabled=true;
	html = '<div style="margin-left:1%">';
	html += '<span title = "1. Giriş değerini buraya girin!">1. Değer Min&nbsp;</span>';
	html += '<input type = "number" min = "0" id = "inp1" style = "background-color:black;height: ' + periyot.offsetHeight + 'px;width: ' + periyot.offsetWidth + 'px"><br>';
	
	html += '<span title = "1. Giriş değeri kaça kadar arttırılacak? ">1. Değer Max</span>';
	html += '<input type = "number" min = "0" id = "inp2" style = "background-color:black;height: ' + periyot.offsetHeight + 'px;width: ' + periyot.offsetWidth + 'px"><br>';
	html += '<span title = "2. Giriş değeri kaça kadar arttırılacak?">2. Değer Max</span>';
	html += '<input type = "number" min = "0" id = "inp3" style = "background-color:black;height: ' + periyot.offsetHeight + 'px;width: ' + periyot.offsetWidth + 'px"><br><br>';
	html += '<div><span title = "Stop Loss Değerini Girin!">StopLoss-1&nbsp;<span/><input min = "0" step = ".5" style = "width:40px;background-color:black" type="number" id="inp4" value="2">&nbsp;<span title = "Burası sıfırdan farklı olursa, bu Stop Loss değeri için de tarama yapacaktır">StopLoss-2&nbsp;<span/><input min = "0" step = ".5" style = "width:40px;background-color:black" type="number" id="inp5" value="0">&nbsp;<span title = "Bu kutucuğa tik koyarsanız, Stop Loss değerleri için ekstra tarama yapacaktır!">Trailing Stop&nbsp;</span><input type="checkbox" id="inp6"></div>';
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
	inp4.value = cek(inp4.id);
	inp5.value = cek(inp5.id);
	inp6.checked = cek(inp6.id);
	blg.style.marginLeft = inp1.offsetLeft + periyot.offsetWidth + "px";
	blg.style.top = inp1.parentNode.offsetTop + "px";
	blg.style.position = "absolute";
	
	btn.onclick = function(){ 
		baslat(this);
		return false;
	};
	
	
}



