var n = 1;
var $li = $('ul.tab-title li');
var checkbill_close = 0 ; //0 means current_state is close
$(function(){
	$($li. eq(5) .addClass('active').find('a').attr('href')).siblings('.tab-inner').hide();
	/*$li.click(function(){
		$($li. eq(n) .find('a'). attr ('href')).show().siblings ('.tab-inner').hide();
		$li. eq(n) .addClass('active'). siblings ('.active').removeClass('active');
		
		n++;
		if(n>2){
			n=0;
		}
	
	});*/
});
	

function change_page(page_number){
	var container = document.getElementById("__Page__menu__container");
	if(page_number==0 |page_number==1 |page_number==3 |page_number==4 | page_number==8){
		container.style.display = "flex";
	}else{
		container.style.display = "none";
	}
	$($li. eq(page_number) .find('a'). attr ('href')).show().siblings ('.tab-inner').hide();
	$li. eq(page_number) .addClass('active'). siblings ('.active').removeClass('active');
	menu_openorclose(1);
	
}


let cardbook = document.querySelector('#__Page1__cardbook');
let cardbook__bar = document.querySelector('#__Page1__cardbook__bar');

function moveElementLeft() {
	var xi = new WebKitCSSMatrix(window.getComputedStyle(cardbook).transform);
	var vw = xi.m41 * (100 / document.documentElement.clientWidth);
	if(vw == 0)	{
		cardbook.style.transform = "translateX(-100vw)";
		$('#__Page1__dot:nth-child(1)').removeClass("dot_chosen");
		$('#__Page1__dot:nth-child(2)').addClass("dot_chosen");
	}	else if(vw >= -110) {
		cardbook.style.transform = "translateX(-200vw)";
		$('#__Page1__dot:nth-child(2)').removeClass("dot_chosen");
		$('#__Page1__dot:nth-child(3)').addClass("dot_chosen");
	}
}

function moveElementRight() {
	var xi = new WebKitCSSMatrix(window.getComputedStyle(cardbook).transform);
	var vw = xi.m41 * (100 / document.documentElement.clientWidth);
	if(vw <= -200) {
		cardbook.style.transform = "translateX(-100vw)";
		$('#__Page1__dot:nth-child(3)').removeClass("dot_chosen");
		$('#__Page1__dot:nth-child(2)').addClass("dot_chosen");
	}
	else if(vw <= -100) {
		cardbook.style.transform = "translateX(0vw)";
		$('#__Page1__dot:nth-child(2)').removeClass("dot_chosen");
		$('#__Page1__dot:nth-child(1)').addClass("dot_chosen");
	}
}

function handleClick() { console.log('click'); }
function handleLong()  { console.log('long'); }
function handleLeft()  { console.log('left');  moveElementLeft(); }
function handleRight() { console.log('right'); moveElementRight(); }

EventUtil.bindEvent(cardbook__bar, 'click', handleClick);
EventUtil.bindEvent(cardbook__bar, 'longpress', handleLong);
EventUtil.bindEvent(cardbook__bar, 'swipeLeft', handleLeft);
EventUtil.bindEvent(cardbook__bar, 'swipeRight', handleRight);

$("#imgUpload").click(function(){
	$("#__Page2__photoMode__container").toggleClass("dark-page");
});


/*
function add_checkbox(){ 
	var container = document.getElementById("__Page6__bill__container");
	
	var checkboxs = document.createElement("input");
	checkboxs.type = "checkbox";
	checkboxs.id = "__Page6__bill_content";
	checkboxs.onclick = function(){
	}
	var label = document.createElement("label");
	label.id = "delete_id";
	label.classList.add("__Page6__bill_check");
	var br = document.createElement("br");
	container.appendChild(label);
	label.appendChild(checkboxs);
	label.appendChild(document.createTextNode("4/31 COCO"+price));
	label.appendChild(br);
	price++;
}*/

var page6_item_number = 6;  /*目前初始項目為5個 故下一品項為6*/
var page6_item_date = "某月水費";
var page6_item_cost = "$8888";
function add_checkbox2(){   /*the page6 : 待分帳項目*/
	var container = document.getElementById("__Page6__bill__container");
	
	var checkboxs = document.createElement("div");
	checkboxs.id = "__Page6__bill_content2 " + page6_item_number;
	checkboxs.classList.add("__Page6__bill_content2");
	// initialize
	var label = document.createElement("label");
	label.id = "delete_id";
	label.classList.add("__Page6__bill_check");
	label.onclick = function() {
		change_checkbox_color(this.firstChild.id);
	};

	var br = document.createElement("br");
	
	container.appendChild(label);
	label.appendChild(checkboxs);
	label.appendChild(document.createTextNode(page6_item_date +" "+page6_item_cost));  	/* this need to edit  (var page6_item_date  page6_item_cost)  */
	label.appendChild(br);
	page6_item_number++;
}

var person_number = 0;  /*目前此項目下的分帳人數*/
var person_name = "人名";
var person_needprice = "666"; /*某人需分帳之花費*/
function add_checkbox_person(){   /*the page18 : 需分帳之人物新增  調控參數:person_name、person_needprice*/
	var container = document.getElementById("__Page18__personcheck__container");
	
	var checkboxs = document.createElement("div");
	checkboxs.id = "__Page18__bill_content2 " + (person_number+1);
	checkboxs.classList.add("__Page18__bill_content2");
	// initialize
	var label = document.createElement("label");
	label.id = "delete_id";
	label.classList.add("__Page18__bill_check");
	label.onclick = function() {
		change_checkbox_color(this.firstChild.id);
	};

	var br = document.createElement("br");
	
	container.appendChild(label);
	label.appendChild(checkboxs);
	label.appendChild(document.createTextNode(person_name +" "+ person_needprice));  	/* this need to edit  (var page6_item_date  page6_item_cost)  */
	label.appendChild(br);
	person_number++;
}

function delete_checkbox_person(){
	var delete_parentnode = document.getElementById("__Page18__personcheck__container");
	console.log("person_number: " +person_number);
	
	for(i=1;i<=person_number;i++){
		console.log("delete_parentnode.lastChild: " +delete_parentnode.lastChild);
		delete_parentnode.removeChild(delete_parentnode.lastChild);
		console.log("MEOW");
	}
	person_number = 0;
}


function change_checkbox_color(this_id){
	if (document.getElementById(this_id).style.backgroundColor == 'rgb(107, 220, 255)') {
        document.getElementById(this_id).style.backgroundColor = '#FFFFFF';
    }else{
		__Page18__worditem = document.getElementById(this_id).parentNode.innerText ; 
		document.getElementById(this_id).style.backgroundColor = '#6BDCFF';
	}
}


function lock_checkbox(){
	for(i=1;i<=person_number;i++){
		if (document.getElementById("__Page18__bill_content2 "+ String(i)).style.backgroundColor == 'rgb(107, 220, 255)') {
			document.getElementById("__Page18__bill_content2 "+ String(i)).style.backgroundColor = '#C4C4C4';
			document.getElementById("__Page18__bill_content2 "+ String(i)).style.border = "4.5px solid #C4C4C4";
			document.getElementById("__Page18__bill_content2 "+ String(i)).parentNode.style.color = '#C4C4C4';
			document.getElementById("__Page18__bill_content2 "+ String(i)).parentNode.onclick = function(){};
		}
	}
}

var pocket_person_number = 3; /*此錢包目前的人數*/
var page16_person_number = 1;
function add_person(){  //page16 新增人員
	var container = document.getElementById("__Page16__teammate__container");
	var label = document.createElement("label");
	label.id = "delete_id";
	label.classList.add("__Page16__teammatename");
　　var img = document.createElement("img");
　　img.classList.add("__Page16__userimg");
　　img.src = "./icon/team2.png";													/*  this need to edit  圖片位置  */
	container.appendChild(label);
	label.appendChild(img);
	label.appendChild(document.createTextNode("BRYAN")); 							/*  this need to edit  人員名稱  */

}	

function add_notification(){
	var container = document.getElementById("__Page7__inform__bar");
	var label = document.createElement("label");
	label.id = "delete_id";
	label.classList.add("__Page7__inform");
	var br = document.createElement('br');
	container.appendChild(label);
	label.appendChild(document.createTextNode("5/13 啟賢新增了水費項目"));
	label.appendChild(br);

}	
/*
function delete_checkbox(){
	var delete_item = document.getElementById("delete_id");
	var inputParent = delete_item.parentNode;
    inputParent.removeChild(delete_item);
}	*/

function yes_checkbill(n){ // n=1 means change to 催帳 page,0 means restore the page ,2 means change to 梗圖 page
	var text_content = document.getElementById("__Page18__bill_word");
	var check_bar = document.getElementById("__Page18__result__container");
	var check_bar2 = document.getElementById("__Page18__result2__container");
	var check_bar3 = document.getElementById("__Page18__result3__container");
	var funnypicture = document.getElementById("__Page18__result3-2__container");
	var bill__container = document.getElementById("__Page18__bill__container");
	var personcheck__container = document.getElementById("__Page18__personcheck__container");
	
	if(n==1){
		var check_text = "分帳給付狀況";
		check_bar.style.display = "none";
		check_bar2.style.display = "flex";
		check_bar3.style.display = "none";
		funnypicture.style.display = "none";
	}else if(n==0){
		var check_text = "分帳結果";
		check_bar.style.display = "flex";
		check_bar2.style.display = "none";
		check_bar3.style.display = "none";
		funnypicture.style.display = "none";
		bill__container.style.display = "flex";
		personcheck__container.style.display = "block";
	}else if(n==2){
		var check_text = "催帳";
		check_bar.style.display = "none";
		check_bar2.style.display = "none";
		check_bar3.style.display = "flex";
		funnypicture.style.display = "flex";
		bill__container.style.display = "none";
		personcheck__container.style.display = "none";
	}
	text_content.innerHTML=check_text;
}

function update_checkbill(){
	var check_text = "等待確認<br>請核對你的帳目是否正確<br>(APP會跳通知給所有成員，點選進入APP確認)";
	var text_content = document.getElementById("__Page18__bill_word");
	var check_bar = document.getElementById("__Page18__result__container");
	text_content.innerHTML=check_text;
	check_bar.style.display = "flex";
}

function menu_openorclose(choose){ /*if mouse touchs the home star,the star will light and show it's name*/
	var __Page__menu__bar = document.getElementById('__Page__menu__bar'); 	
	checkbill_close=1;
	checkbill_openorclose();
	if(choose==0){ //0 means open menu 1 means close menu
		__Page__menu__bar.style.transform = "translate(70vw ,0)";
	}else{__Page__menu__bar.style.transform = "translate(0 ,0)";}
}

function checkbill_openorclose(){ /*if mouse touchs the home star,the star will light and show it's name*/
	var __Page7__bottomimg = document.getElementById('__Page7__bottomimg');
	var __Page7__bottomimg2 = document.getElementById('__Page7__bottomimg2');
	var __Page7__bottomimg3 = document.getElementById('__Page7__bottomimg3');  
	if(checkbill_close==0){ //0 means open menu 1 means close menu
		__Page7__bottomimg.style.transform = "rotate(90deg)";
		__Page7__bottomimg.style.backgroundColor = '#C4C4C4';
		__Page7__bottomimg2.style.transform = "translate(-8vh ,-8vh)";
		__Page7__bottomimg3.style.transform = "translate(8vh ,-8vh)";
		
		checkbill_close=1;
	}else{
		__Page7__bottomimg.style.transform = "rotate(0deg)";
		__Page7__bottomimg.style.backgroundColor = '#FFF333';
		__Page7__bottomimg2.style.transform = "translate(0 ,0)";
		__Page7__bottomimg3.style.transform = "translate(0 ,0)";
		checkbill_close=0;
 }
}
/*
function add_notificationimg(){
	var container = document.getElementById("__Page7__inform");
	var label = document.createElement("label");
	label.id = "delete_id";
	label.classList.add("__Page7__informphoto");	
	var img = document.createElement("img");
	img.id = "__Page7__informimg";
	img.src = "./midterm_photo/Frame 190.png";
	container.insertBefore(label,container.firstChild);
	label.appendChild(img);
}*/

var moneyy = 3260;
function add_notification(){
	var container = document.getElementById("__Page7__inform");
	var label = document.createElement("label");
	label.id = "delete_id";
	label.classList.add("__Page7__informphoto");
	
	var __Page7__informphoto = document.createElement("div");
	__Page7__informphoto.id = "__Page7__informphoto";
	
	var img = document.createElement("img");
	img.setAttribute('class', '__Page7__informphotoimg');
	img.src = "./midterm_photo/ppl-07.png";                           				/*  this need to edit  the photo position*/
	
	var __Page7__informtext = document.createElement("div");
	__Page7__informtext.id = "__Page7__informtext";
	var __Page7__informtextmoney = document.createElement('P');
	__Page7__informtextmoney.setAttribute('class', '__Page7__informtextmoney');
	__Page7__informtextmoney.textContent = "$" + moneyy;							/*  this need to edit   the cost*/
	var __Page7__informtextquote = document.createElement('P');
	__Page7__informtextquote.setAttribute('class', '__Page7__informtextquote');
	__Page7__informtextquote.textContent = '丁丁新增了一筆水電項目';				/*  this need to edit  the item add*/
	
	var __Page7__informtime = document.createElement("div");
	__Page7__informtime.id = "__Page7__informtime";
	var __Page7__informdate = document.createElement('P');
	__Page7__informdate.setAttribute('class', '__Page7__informdate');
	__Page7__informdate.textContent = '5/26';										/*  this need to edit  the current date*/
	
	
	
	container.insertBefore(label,container.firstChild);
	label.appendChild(__Page7__informphoto);
	__Page7__informphoto.appendChild(img);
	label.appendChild(__Page7__informtext);
	__Page7__informtext.appendChild(__Page7__informtextmoney);
	__Page7__informtext.appendChild(__Page7__informtextquote);
	label.appendChild(__Page7__informtime);
	__Page7__informtime.appendChild(__Page7__informdate);
	

	moneyy++;
}	

/*add*/
function delete_notification(){
	var delete_parentnode = document.getElementById("__Page7__inform");
	delete_parentnode.removeChild(delete_parentnode.lastChild);
}


var __Page18__worditem = "4月電費　$3260";
function edit__Page18__bill_word(){
	var container = document.getElementById("__Page18__bill_word2");
	container.innerHTML= __Page18__worditem;								/*  暫時不需要修改 目前前端以實現勾選單個項目更改功能（var __Page18__worditem）  */
	/*page6to18_personadd();*/
	page6to18_personadd();
}


function page6to18_personadd(){   /*主要增加人的function*/ 
	delete_checkbox_person();
	for(i=1;i<=3;i++){ 														/*  this need to edit 目前預設是直接新增3人，之後會看項目要分帳之人數調整*/
		add_checkbox_person();
	}
}

function copy_inviteid(){   /*主要增加人的function*/ 
	console.log("yes");
	var text_id = document.getElementById("__Page16__inviteid").innerText;
	var container = document.getElementById("__Page16__inviteid2");
	container.value = text_id;
	console.log("text_id: "+text_id);
	container.select();
	document.execCommand("copy");
}