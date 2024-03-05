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
	var photo_container = document.getElementById("__Page__picture__container");
	if(page_number==0 |page_number==1 |page_number==3 |page_number==4 | page_number==8 | page_number==15){
		container.style.display = "flex";
	}else{
		container.style.display = "none";
	}
	if(page_number==0 |page_number==15){
		photo_container.style.display = "flex";
	}else{
		photo_container.style.display = "none";
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
		/*__Page7__bottomimg.style.transform = "rotate(90deg)";*/
		__Page7__bottomimg.style.backgroundColor = '#C4C4C4';
		__Page7__bottomimg2.style.transform = "translate(-8vh ,-8vh)";
		__Page7__bottomimg3.style.transform = "translate(8vh ,-8vh)";
		
		checkbill_close=1;
	}else{
		/*__Page7__bottomimg.style.transform = "rotate(0deg)";*/
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



function firstadds(){
	page38__delete_people();
	for(var i=0;i<4;i++){
			add_equalmode_person(i+1,1);
		}
}
function Page37__checkadds(){
	page37__delete_people();
	for(var i=0;i<4;i++){
			add_equalmode_person(i+1,3);
		}
}

function Page62__adds(page){
	page62__delete_people();
	var next = document.getElementById("__Page62__next");
	page62__notification(2);
	if(page==1){
		next.onclick = function() {
			page62__changenotification(1);
			page62__notification(1);
			
		};
	}
	else{
		next.onclick = function() {
			page62__changenotification(2);
			page62__notification(1);
			
		};
	}
	for(var i=0;i<4;i++){
			add_realcostmode_person(2,i+1);
		}
}
function Page62__checkadds(){
	var next = document.getElementById("__Page62__next");
	next.onclick = function() {
		Page62__adds(2);
	};
	
	page62__delete_people();
	for(var i=0;i<4;i++){
			add_equalmode_person(i+1,2);
		}
}




function choose_type(thistype_id){
	var type1 = document.getElementById("__Page38__addtype__bar");
	var typeimg = document.getElementById("__Page38__typeimg");
	var type2 = document.getElementById("__Page38__percenttype__bar");
	var typeimg2 = document.getElementById("__Page38__typeimg2");
	var type3 = document.getElementById("__Page38__realcosttype__bar");
	var typeimg3 = document.getElementById("__Page38__typeimg3");
	var type4 = document.getElementById("__Page38__additionalcosttype__bar");
	var typeimg4 = document.getElementById("__Page38__typeimg4");
	var text1 = document.getElementById("__Page38__paytypetext");
	var text2 = document.getElementById("__Page38__paytypetext2");
	var text3 = document.getElementById("__Page38__costtotal1");
	var text4 = document.getElementById("__Page38__costtotal2");
	var text5 = document.getElementById("__Page38__costtotal3");
	
	
	type1.style.border = "0px solid #000000";
	type1.style.backgroundColor = "#FFFFFF";
	typeimg.style.filter = "invert(50%)";
	type2.style.border = "0px solid #000000";
	type2.style.backgroundColor = "#FFFFFF";
	typeimg2.style.filter = "invert(50%)";
	type3.style.border = "0px solid #000000";
	type3.style.backgroundColor = "#FFFFFF";
	typeimg3.style.filter = "invert(50%)";
	type4.style.border = "0px solid #000000";
	type4.style.backgroundColor = "#FFFFFF";
	typeimg4.style.filter = "invert(50%)";
	
	console.log("document.getElementById(thistype_id): "+document.getElementById("thistype_id"));
	console.log("this.id: "+thistype_id);
	console.log(thistype_id.includes("percent"));
	document.getElementById(thistype_id).style.border = "3px solid #000000";
	document.getElementById(thistype_id).style.backgroundColor = "#FFF333";
	
	page38__delete_people();
	
	
	if(thistype_id.includes("addtype")){
		text1.innerText = '平分';
		text2.innerText = '選擇一起平分的成員。';
		text3.innerText = '每人平均 $';
		text4.innerText = '0.00';
		text5.innerText = '';
		typeimg.style.filter = "invert(0%)";
		for(var i=0;i<equalpeople;i++){
			add_equalmode_person(i+1,1);
		}
	}
	
	if(thistype_id.includes("percent")){
		text1.innerText = '比例';
		text2.innerText = '依照每位成員占比分配。';
		text3.innerText = '未分配\xa0';
		text4.innerText = '0.0';
		text5.innerText = '\xa0%';
		typeimg2.style.filter = "invert(0%)";
		for(var i=0;i<equalpeople;i++){
			add_percentagemode_person(i+1);
		}
	}
	
	if(thistype_id.includes("real")){
		text1.innerText = '實際花費';
		text2.innerText = '輸入每位成員的實際花費金額';
		text3.innerText = '未分配  $\xa0';
		text4.innerText = '0.00';
		text5.innerText = '';
		typeimg3.style.filter = "invert(0%)";
		for(var i=0;i<equalpeople;i++){
			add_realcostmode_person(1,i+1);
		}
	}
	
	if(thistype_id.includes("additional")){
		text1.innerText = '額外支出';
		text2.innerText = '扣除成員個人額外支出';
		text3.innerText = '';
		text4.innerText = '';
		text5.innerText = '';
		typeimg4.style.filter = "invert(0%)";
		for(var i=0;i<equalpeople;i++){
			add_additionalcostmode_person(i+1);
		}
	}
	/*
	border: 0px solid #000000;
	background-color: #FFFFFF;
	
	border: 3px solid #000000;
	background-color: #FFF333;*/
}







var equalpeople = 4;
function add_equalmode_person(number,page){   /*the page18 : 需分帳之人物新增  調控參數:person_name、person_needprice*/
	if(page==1){
		var pages = "__Page38__";
		var container = document.getElementById("__Page38__people__container");
	}else if(page==2){
		var pages = "__Page62__";
		var container = document.getElementById("__Page62__people__container");
	}else if(page==3){
		var pages = "__Page37__";
		var container = document.getElementById("__Page37__people__container");
	}
	
	var photo = document.createElement("div");
	photo.id = "__Page38__informphoto";
	var img = document.createElement("img");
　　img.classList.add("__Page38__informphotoimg");
　　img.src = "./midterm_photo/ppl-07.png";	
	photo.appendChild(img);
	
	var peoplename = document.createElement("div");
	peoplename.id = "__Page38__peoplename__bar";
	var __Page38__peoplename = document.createElement('P');
	__Page38__peoplename.setAttribute('class', '__Page38__peoplename');
	__Page38__peoplename.textContent = "丁丁";	
	peoplename.appendChild(__Page38__peoplename);
	
	var calculate = document.createElement("div");
　　calculate.id = "__Page38__calculate__bar";
	var equal = document.createElement("div");
　　equal.id = pages+"equal "+number;
	equal.classList.add("__Page38__equal");
/*	
	var equals = document.createElement("div");
　　equals.id = "__Page38__equals";
	var img2 = document.createElement("img");
　　img2.classList.add("__Page38__equal_check");
	img2.id = "__Page38__equal_check";
　　img2.src = "./midterm_icon/yes.png";	
	equal.appendChild(equals);
	equals.appendChild(img2);
*/
	calculate.appendChild(equal);
	equal.onclick = function() {
		change_equalcheckbox_color(this.id);
	};
	
	// initialize
	var label = document.createElement("label");
	label.id = "delete_id";
	label.classList.add("__Page38__peoplepay");
	
	var decorate = document.createElement("div");
　　decorate.id = "__Page38__decorate2__container";
	
	container.appendChild(label);
	container.appendChild(decorate);
	
	label.appendChild(photo);
	label.appendChild(peoplename);  	/* this need to edit  (var page6_item_date  page6_item_cost)  */
	label.appendChild(calculate);
	
	/*
	container.insertBefore(decorate,container.firstChild);
	container.insertBefore(label,container.firstChild);
	*/
}













function change_equalcheckbox_color(this_id){
	console.log("document.getElementById(this_id): " + document.getElementById(this_id));
	console.log("document.getElementById(this_id).style.backgroundColor: " + document.getElementById(this_id).style.backgroundColor);
	console.log("document.getElementById(this_id).Firstchild: " + document.getElementById(this_id).Firstchild);
	if (document.getElementById(this_id).style.backgroundColor == "rgb(73, 73, 73)") {
        document.getElementById(this_id).style.backgroundColor = '#FFFFFF';
		
		document.getElementById(this_id).innerHTML = "";
		/*document.getElementById(this_id).removeChild(document.getElementById(this_id.child));*/
		

    }else{
		
		document.getElementById(this_id).style.backgroundColor = '#494949';
		
		
		var equals = document.createElement("div");
　　	equals.id = "__Page38__equals";
		var img2 = document.createElement("img");
　　	img2.classList.add("__Page38__equal_check");
		img2.id = "__Page38__equal_check";
　　	img2.src = "./midterm_icon/yes.png";	
		equals.appendChild(img2);
		document.getElementById(this_id).appendChild(equals);
		
	}
}

/*
<img class="__Page38__equal_check" id="__Page38__equal_check" src="./midterm_icon/yes.png" alt="check">
*/
/*
<input class="__Page38__percentage" type="text" inputmode="decimal" placeholder="0.00">
*/


function add_percentagemode_person(number){   /*the page18 : 需分帳之人物新增  調控參數:person_name、person_needprice*/
	
	var container = document.getElementById("__Page38__people__container");
	
	var photo = document.createElement("div");
	photo.id = "__Page38__informphoto";
	var img = document.createElement("img");
　　img.classList.add("__Page38__informphotoimg");
　　img.src = "./midterm_photo/ppl-07.png";	
	photo.appendChild(img);
	
	var peoplename = document.createElement("div");
	peoplename.id = "__Page38__peoplename__bar";
	var __Page38__peoplename = document.createElement('P');
	__Page38__peoplename.setAttribute('class', '__Page38__peoplename');
	__Page38__peoplename.textContent = "丁丁";	
	peoplename.appendChild(__Page38__peoplename);
	
	var calculate = document.createElement("div");
　　calculate.id = "__Page38__calculate__bar";
	var percentage = document.createElement("div");
　　percentage.id = "__Page38__calculate_percentage";


	var __Page38__percentage = document.createElement('input');
	__Page38__percentage.setAttribute('class', '__Page38__percentage');
	__Page38__percentage.type = "text";
	__Page38__percentage.inputmode = "decimal";
	__Page38__percentage.placeholder = "0.00";
	__Page38__percentage.id = "__Page38__percentage "+number;

/*
	var __Page38__percentage = document.createElement('P');
	__Page38__percentage.setAttribute('class', '__Page38__percentage');
	__Page38__percentage.textContent = "0.00";
*/	
	
	var __Page38__percentage2 = document.createElement('P');
	__Page38__percentage2.setAttribute('class', '__Page38__percentage2');
	__Page38__percentage2.textContent = "%";
	percentage.appendChild(__Page38__percentage);
	percentage.appendChild(__Page38__percentage2);
	var percentage2 = document.createElement("div");
　　percentage2.id = "__Page38__calculate_percentage";
	var __Page38__percentage3 = document.createElement('P');
	__Page38__percentage3.setAttribute('class', '__Page38__percentage3');
	__Page38__percentage3.textContent = "= $";
	var __Page38__percentage4 = document.createElement('P');
	__Page38__percentage4.setAttribute('class', '__Page38__percentage4');
	__Page38__percentage4.textContent = "0.00";
	percentage2.appendChild(__Page38__percentage3);
	percentage2.appendChild(__Page38__percentage4);
	calculate.appendChild(percentage);
	calculate.appendChild(percentage2);
	

	
	// initialize
	var label = document.createElement("label");
	label.id = "delete_id";
	label.classList.add("__Page38__peoplepay");
	
	var decorate = document.createElement("div");
　　decorate.id = "__Page38__decorate2__container";
	
	container.appendChild(label);
	label.appendChild(photo);
	label.appendChild(peoplename);  	/* this need to edit  (var page6_item_date  page6_item_cost)  */
	label.appendChild(calculate);
	container.appendChild(decorate);
}


function add_realcostmode_person(mode,number){   /*the page18 : 需分帳之人物新增  調控參數:person_name、person_needprice*/
	if(mode==1){
		var container = document.getElementById("__Page38__people__container");
	}else{
		var container = document.getElementById("__Page62__people__container");
	}
	var photo = document.createElement("div");
	photo.id = "__Page38__informphoto";
	var img = document.createElement("img");
　　img.classList.add("__Page38__informphotoimg");
　　img.src = "./midterm_photo/ppl-07.png";	
	photo.appendChild(img);
	
	var peoplename = document.createElement("div");
	peoplename.id = "__Page38__peoplename__bar";
	var __Page38__peoplename = document.createElement('P');
	__Page38__peoplename.setAttribute('class', '__Page38__peoplename');
	__Page38__peoplename.textContent = "丁丁";	
	peoplename.appendChild(__Page38__peoplename);
	
	var calculate = document.createElement("div");
　　calculate.id = "__Page38__calculate__bar";
	var realcost = document.createElement("div");
　　realcost.id = "__Page38__calculate_realcost";
	var __Page38__realcost = document.createElement('P');
	__Page38__realcost.setAttribute('class', '__Page38__realcost');
	__Page38__realcost.textContent = "$\xa0";
	
/*	
	var __Page38__realcost2 = document.createElement('P');
	__Page38__realcost2.setAttribute('class', '__Page38__realcost2');
	__Page38__realcost2.textContent = "0.00";
*/	
	var __Page38__realcost2 = document.createElement('input');
	__Page38__realcost2.setAttribute('class', '__Page38__realcost2');
	__Page38__realcost2.type = "text";
	__Page38__realcost2.inputmode = "decimal";
	__Page38__realcost2.placeholder = "0.00";
	__Page38__realcost2.id = "__Page38__realcost2 "+number;
	
	
	
	realcost.appendChild(__Page38__realcost);
	realcost.appendChild(__Page38__realcost2);
	calculate.appendChild(realcost);

	
	// initialize
	var label = document.createElement("label");
	label.id = "delete_id";
	label.classList.add("__Page38__peoplepay");
	
	var decorate = document.createElement("div");
　　decorate.id = "__Page38__decorate2__container";
	
	container.appendChild(label);
	label.appendChild(photo);
	label.appendChild(peoplename);  	/* this need to edit  (var page6_item_date  page6_item_cost)  */
	label.appendChild(calculate);
	container.appendChild(decorate);
}


function add_additionalcostmode_person(number){   /*the page18 : 需分帳之人物新增  調控參數:person_name、person_needprice*/
	
	var container = document.getElementById("__Page38__people__container");
	
	var photo = document.createElement("div");
	photo.id = "__Page38__informphoto";
	var img = document.createElement("img");
　　img.classList.add("__Page38__informphotoimg");
　　img.src = "./midterm_photo/ppl-07.png";	
	photo.appendChild(img);
	
	var peoplename = document.createElement("div");
	peoplename.id = "__Page38__peoplename__bar";
	var __Page38__peoplename = document.createElement('P');
	__Page38__peoplename.setAttribute('class', '__Page38__peoplename');
	__Page38__peoplename.textContent = "丁丁";	
	peoplename.appendChild(__Page38__peoplename);
	
	var calculate = document.createElement("div");
　　calculate.id = "__Page38__calculate__bar";
	var additionalcost = document.createElement("div");
　　additionalcost.id = "__Page38__calculate_realcost";
	var __Page38__additionalcost = document.createElement('P');
	__Page38__additionalcost.setAttribute('class', '__Page38__additionalcost');
	__Page38__additionalcost.textContent = "$\xa0";
	
	var __Page38__additionalcost2 = document.createElement('input');
	__Page38__additionalcost2.setAttribute('class', '__Page38__additionalcost2');
	__Page38__additionalcost2.type = "text";
	__Page38__additionalcost2.inputmode = "decimal";
	__Page38__additionalcost2.placeholder = "0.00";
	__Page38__additionalcost2.id = "__Page38__additionalcost2 "+number;
/*
	var __Page38__additionalcost2 = document.createElement('P');
	__Page38__additionalcost2.setAttribute('class', '__Page38__additionalcost2');
	__Page38__additionalcost2.textContent = "0.00";
*/
	
	
	additionalcost.appendChild(__Page38__additionalcost);
	additionalcost.appendChild(__Page38__additionalcost2);
	var additionalcost2 = document.createElement("div");
　　additionalcost2.id = "__Page38__calculate_percentage";
	var __Page38__additionalcost3 = document.createElement('P');
	__Page38__additionalcost3.setAttribute('class', '__Page38__additionalcost3');
	__Page38__additionalcost3.textContent = "+ $\xa0";
	var __Page38__additionalcost4 = document.createElement('P');
	__Page38__additionalcost4.setAttribute('class', '__Page38__additionalcost4');
	__Page38__additionalcost4.textContent = "0.00";
	additionalcost2.appendChild(__Page38__additionalcost3);
	additionalcost2.appendChild(__Page38__additionalcost4);
	calculate.appendChild(additionalcost);
	calculate.appendChild(additionalcost2);
	

	
	// initialize
	var label = document.createElement("label");
	label.id = "delete_id";
	label.classList.add("__Page38__peoplepay");
	
	var decorate = document.createElement("div");
　　decorate.id = "__Page38__decorate2__container";
	
	container.appendChild(label);
	label.appendChild(photo);
	label.appendChild(peoplename);  	/* this need to edit  (var page6_item_date  page6_item_cost)  */
	label.appendChild(calculate);
	container.appendChild(decorate);
}

function page37__delete_people(){
	var delete_parentnode = document.getElementById("__Page37__people__container");
	delete_parentnode.innerHTML = "";
}
function page38__delete_people(){
	var delete_parentnode = document.getElementById("__Page38__people__container");
	delete_parentnode.innerHTML = "";
}
function page62__delete_people(){
	var delete_parentnode = document.getElementById("__Page62__people__container");
	delete_parentnode.innerHTML = "";
}

function page62__notification(type){
	var div = document.getElementById("__Page62__inform__container");
	if(type==1){
		div.style.display = "block";
	}else{
		div.style.display = "none";
	}
}

function page62__changenotification(type){
	var text1 = document.getElementById("__Page62__informtext1");
	var text2 = document.getElementById("__Page62__informtext2");
	var text3 = document.getElementById("__Page62__handsetting");
	var text4 = document.getElementById("__Page62__luckysetting");

	
	
	
	if(type==1){
		text1.textContent = "目前有除不盡的款項";
		text2.textContent = "請問您要參加命運大轉盤嗎？";
		text3.textContent = "否，手動指定";
		text4.textContent = "是，試試手氣";
		text3.onclick = function() {
			Page62__checkadds();
			page62__notification(2);
		};
		text4.onclick = function() {
			change_page(14);
			page62__notification(2);
			page66_text_restore();
		};
	}else{
		text1.textContent = "家樂福 款項已結算，";
		text2.textContent = "請問是否發動特殊卡牌給欠款人？";
		text3.textContent = "否，使用預設";
		text4.textContent = "是，立即選擇";
		text3.onclick = function() {
			change_page(15);
		};
		text4.onclick = function() {
			change_page(8);
		};
	}
}




function page44__choose_type(thistype_id){
	var type1 = document.getElementById("__Page44__notpay__bar");
	var typetext1 = document.getElementById("__Page44__selectword1");
	var container1 = document.getElementById("__Page44__item__container");
	var type2 = document.getElementById("__Page44__needpay__bar");
	var typetext2 = document.getElementById("__Page44__selectword2");
	var container2 = document.getElementById("__Page44__needpay__container");
	var type3 = document.getElementById("__Page44__havepayed__bar");
	var typetext3 = document.getElementById("__Page44__selectword3");
	var container3 = document.getElementById("__Page44__havepayed__container");
	
	
	
	
	typetext1.style.color = "#FFFFFF";
	type1.style.backgroundColor = "#383838";
	typetext2.style.color = "#FFFFFF";
	type2.style.backgroundColor = "#383838";
	typetext3.style.color = "#FFFFFF";
	type3.style.backgroundColor = "#383838";
	

	document.getElementById(thistype_id).style.backgroundColor = "#FFFFFF";
	
	
	
	if(thistype_id.includes("notpay")){
		typetext1.style.color = "#383838";
		container1.style.display = "block";
		container2.style.display = "none";
		container3.style.display = "none";
	}
	
	if(thistype_id.includes("needpay")){
		typetext2.style.color = "#383838";
		container1.style.display = "none";
		container2.style.display = "block";
		container3.style.display = "none";
	}
	
	if(thistype_id.includes("havepayed")){
		typetext3.style.color = "#383838";
		container1.style.display = "none";
		container2.style.display = "none";
		container3.style.display = "block";
	}
	
}
























//轉盤部分
let canvas = document.getElementById('__Page61__canvas'),
context = canvas.getContext('2d'),
OUTSIDE_RADIUAS = 130,   // 轉盤的半徑 200
INSIDE_RADIUAS = 0,      // 用於非零環繞原則的內圓半徑
TEXT_RADIUAS = 104,      // 轉盤內文字的半徑 160
CENTER_X = canvas.width / 2,
CENTER_Y = canvas.height / 2,
awards = [               // 轉盤內的獎品個數以及內容
'丁丁', '迪西', '拉拉', '小波'
],
startRadian = 0,                             // 繪製獎項的起始角，改變該值實現旋轉效果
awardRadian = (Math.PI * 2) / awards.length, // 每一個獎項所佔的弧度
duration = 4000,     // 旋轉事件
velocity = 10,       // 旋轉速率
spinningTime = 0,    // 旋轉當前時間
spinTotalTime,       // 旋轉時間總長
spinningChange;      // 旋轉變化值的峰值
/**
* 緩動函數，由快到慢
* @param {Num} t 當前時間
* @param {Num} b 初始值
* @param {Num} c 變化值
* @param {Num} d 持續時間
*/
function easeOut(t, b, c, d) {
if ((t /= d / 2) < 1) return c / 2 * t * t + b;
return -c / 2 * ((--t) * (t - 2) - 1) + b;
};
/**
* 繪製轉盤
*/
function drawRouletteWheel() {
// ----- ① 清空頁面元素，用於逐幀動畫
/*context.clearRect(0, 0, canvas.width, canvas.height);*/
// -----
for (let i = 0; i < awards.length; i ++) {
let _startRadian = startRadian + awardRadian * i,  // 每一個獎項所佔的起始弧度
_endRadian =   _startRadian + awardRadian;     // 每一個獎項的終止弧度
// ----- ② 使用非零環繞原則，繪製圓盤
context.save();
if (i % awards.length === 0) context.fillStyle = '#A9A9A9'
else if (i % awards.length === 1) context.fillStyle = '#C0C0C0';
else if (i % awards.length === 2) context.fillStyle = '#DCDCDC';
else if (i % awards.length === 3) context.fillStyle = '#F0EFEF';
context.beginPath();
context.arc(canvas.width / 2, canvas.height / 2, OUTSIDE_RADIUAS, _startRadian, _endRadian, false);
context.arc(canvas.width / 2, canvas.height / 2, INSIDE_RADIUAS, _endRadian, _startRadian, true);
context.fill();
context.restore();
// -----
// ----- ③ 繪製文字
context.save();
context.font = 'bold 16px Helvetica, Arial';
context.fillStyle = '#000000';
context.translate(
CENTER_X + Math.cos(_startRadian + awardRadian / 2) * TEXT_RADIUAS,
CENTER_Y + Math.sin(_startRadian + awardRadian / 2) * TEXT_RADIUAS
);
context.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
context.fillText(awards[i], -context.measureText(awards[i]).width / 2, 0);
context.restore();
// -----
}
// ----- ④ 繪製指針


/*
context.save();


context.beginPath();
context.moveTo(CENTER_X, CENTER_Y - OUTSIDE_RADIUAS + 8);
context.lineTo(CENTER_X - 10, CENTER_Y - OUTSIDE_RADIUAS);
context.lineTo(CENTER_X - 4, CENTER_Y - OUTSIDE_RADIUAS);
context.lineTo(CENTER_X - 4, CENTER_Y - OUTSIDE_RADIUAS - 10);
context.lineTo(CENTER_X + 4, CENTER_Y - OUTSIDE_RADIUAS - 10);
context.lineTo(CENTER_X + 4, CENTER_Y - OUTSIDE_RADIUAS);
context.lineTo(CENTER_X + 10, CENTER_Y - OUTSIDE_RADIUAS);
context.closePath();
context.fill();
context.restore();
*/

// -----
}
/**
* 開始旋轉
*/
function rotateWheel() {
// 當 當前時間 大於 總時間，停止旋轉，並返回當前值
spinningTime += 20;
if (spinningTime >= spinTotalTime) {
	
setTimeout("page66_text_edit(getValue())", 500 ); return
/*page66_text_edit(getValue()); return*/

/*console.log(getValue()); return*/
}
let _spinningChange = (spinningChange - easeOut(spinningTime, 0, spinningChange, spinTotalTime)) * (Math.PI / 180);
startRadian += _spinningChange
drawRouletteWheel();
window.requestAnimationFrame(rotateWheel);
}
/**
* 旋轉結束，獲取值
*/
function getValue() {
let startAngle = startRadian * 180 / Math.PI,       // 弧度轉換為角度
awardAngle = awardRadian * 180 / Math.PI,
pointerAngle = 90,                              // 指針所指向區域的度數，該值控制選取哪個角度的值
overAngle = (startAngle + pointerAngle) % 360,  // 無論轉盤旋轉了多少圈，產生了多大的任意角，我們只需要求到當前位置起始角在360°範圍內的角度值
restAngle = 360 - overAngle,                    // 360°減去已旋轉的角度值，就是剩下的角度值
index = Math.floor(restAngle / awardAngle);     // 剩下的角度值 除以 每一個獎品的角度值，就能得到這是第幾個獎品
return awards[index];
}
window.onload = function(e) {
drawRouletteWheel();
}
document.getElementById('spin_button').addEventListener('click', () => {
spinningTime = 0;                                // 初始化當前時間
spinTotalTime = Math.random() * 3 + duration;    // 隨機定義一個時間總量
spinningChange = Math.random() * 10 + velocity;  // 隨機頂一個旋轉速率
rotateWheel();
})


function page66_text_restore(){
	var text1 = document.getElementById("__Page61__costtotal1");
	var notification = document.getElementById("__Page61__inform__container");
	notification.style.display = "none";
	text1.innerText = "零頭 $";
}
function page66_text_edit(name){
	var text1 = document.getElementById("__Page61__costtotal1");
	var text2 = document.getElementById("__Page61__informtext1");
	var notification = document.getElementById("__Page61__inform__container");
	
	
	notification.style.display = "block";
	text1.innerText = name +"\xa0+\xa0$";
	text2.innerText = "恭喜\xa0"+ name+ "\xa0成為這次的倒楣鬼，";
}

function page47__rotatecard(){
	
	var front = document.getElementById("__Page47__cardfront__bar");
	var back = document.getElementById("__Page47__cardback__bar");
	var notification = document.getElementById("__Page47__informnotification__container");
	back.style.transform = "rotatey(180deg)";
	front.style.transform = "rotatey(0deg)";
	notification.style.display = "block";

	setTimeout("page47__open()", 2500 );
}
function page47__open(){
	var notification = document.getElementById("__Page47__informnotification__container");
	/*
	var html__fullscreen = document.getElementById("html__fullscreen");
	html__fullscreen.style.filter = "brightness(50%)";
	notification.style.filter = "brightness(100%)";	
	$('#html__fullscreen').not('#__Page47__informnotification__container').css('-webkit-filter', 'brightness(50%)');
	*/
	notification.style.transform = "rotatey(0deg)";
}
function page47__restore(){
	var front = document.getElementById("__Page47__cardfront__bar");
	var back = document.getElementById("__Page47__cardback__bar");
	var notification = document.getElementById("__Page47__informnotification__container");
	/*var html__fullscreen = document.getElementById("html__fullscreen");
	html__fullscreen.style.filter = "brightness(100%)";*/
	back.style.transform = "rotatey(0deg)";
	front.style.transform = "rotatey(-180deg)";
	notification.style.transform = "rotatey(-90deg)";
	notification.style.display = "none";
	
}

function page44__dateupdate(thistype_id){
	var year = document.getElementById("__Page44__dateyear");
	var month = document.getElementById("__Page44__month");
	var decimal_year = parseInt(year.innerText, 10);
	var decimal_month = parseInt(month.innerText, 10);
	if(thistype_id.includes("left")){
		decimal_month--;
	}
	if(thistype_id.includes("right")){
		decimal_month++;
	}
	if(decimal_month>12){
		month.innerText="0"+(decimal_month-12);
		year.innerText=(decimal_year+1);
	}else if(decimal_month>9){
		month.innerText=(decimal_month);
	}else if(decimal_month<1){
		month.innerText=(decimal_month+12);
		year.innerText=(decimal_year-1);
	}else{
		month.innerText="0"+(decimal_month);
	}
}