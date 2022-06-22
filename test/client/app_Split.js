function autoWallet(data, tar) {
  for(let i = 0; i < data.length; i++) {
    var wallet = document.createElement("a")
    wallet.id = `${data[i].wid}`
    wallet.className = "flex-item"
    wallet.target = "_top"
    wallet.onclick = function() { change_page(0) }
    var text = document.createTextNode(`${data[i].wname}`)
    wallet.appendChild(text)
    tar[0].appendChild(wallet)
  }
}

function autoNotify(data) {
  $('#__Page7__inform').empty()
  for(let i=0; i<data.length; i++){
    var label = document.createElement("label");
    label.id = "delete_id";
    label.classList.add("__Page7__informphoto");
    
    var div1 = document.createElement('div');
    div1.id = "__Page7__informphoto";
    var img = document.createElement('img');
    img.className = "__Page7__informphotoimg"
    img.src = "./midterm_photo/ppl-07.png"
    img.alt = "大頭照"
    div1.appendChild(img);

    var div2 = document.createElement('div');
    div2.id = "__Page7__informtext";
    var p1 = document.createElement('p');
    p1.className = "__Page7__informtextmoney";
    p1.innerText = data[i].tag;
    var p2 = document.createElement('p');
    p2.className = "__Page7__informtextquote";
    p2.innerText = data[i].message
    div2.appendChild(p1);
    div2.appendChild(p2);

    var div3 = document.createElement('div');
    div3.id = "__Page7__informtime"
    var p3 = document.createElement('p');
    p3.className = "__Page7__informdate";
    p3.innerText = data[i].time.substring(6, 10)
    div3.appendChild(p3);

    label.appendChild(div1);
    label.appendChild(div2);
    label.appendChild(div3);

    $('#__Page7__inform')[0].appendChild(label);
  }
}

function autoMember1(data, tar) {
  tar.empty()
  for(let i = 0; i < data.length; i++) {
    var teammate = document.createElement("label")
    teammate.className = "__Page16__teammatename"
    teammate.id = "delete_id"
    var userimg = document.createElement("img")
    userimg.className = "__Page16__userimg"
    userimg.src = "./midterm_photo/ppl-07.png"
    userimg.alt = "大頭照"
    var text = document.createTextNode(`${data[i].username}`)
    teammate.appendChild(userimg)
    teammate.appendChild(text)
    tar[0].appendChild(teammate)
  }
}

function autoMember2(data, tar) {
  tar.empty();
  for(let i = 0; i < data.length; i++) {
    var teammate = document.createElement("label")
    teammate.className = "__Page38__peoplepay"
    teammate.id = "delete_id"

    var divimg = document.createElement("div")
    divimg.id = "__Page38__informphoto"
    var userimg = document.createElement("img")
    userimg.className = "__Page38__informphotoimg"
    userimg.src = "./midterm_photo/ppl-07.png"
    divimg.appendChild(userimg)

    var divname = document.createElement("div")
    divname.id = "__Page38__peoplename__bar"
    var pname = document.createElement("p")
    pname.id = data[i].wid
    pname.className = "__Page38__peoplename"
    pname.innerHTML = data[i].username
    divname.appendChild(pname)

    var divcal = document.createElement("div")
    divcal.id = "__Page38__calculate__bar"
    var divequal = document.createElement("div")
    divequal.id = `__Page37__equal ${i+1}`
    divequal.className = "__Page38__equal"
    divcal.appendChild(divequal)
    divequal.onclick = function() { change_equalcheckbox_color(this.id); };

    teammate.appendChild(divimg)
    teammate.appendChild(divname)
    teammate.appendChild(divcal)

    var divdeco = document.createElement("div")
    divdeco.id = "__Page38__decorate2__container"

    tar[0].appendChild(teammate)
    tar[0].appendChild(divdeco)
  }
}


function isWallet(event)      { if($(event.target).attr("class") == "flex-item") selectWallet($(event.target).attr("id")) }
function eqaulAmount()        { let i = 1; while(document.getElementById(`__Page37__equal ${i}`)) i++; return (i-1); }
function itemAmount()         { let i = 0; while($(`.record-style input[name="name_${i}"]`).length) i++; return i; }
// function createItem(cnt) { const item = new Array(cnt); for(let i=0; i<cnt; i++) { item[i] = {}; item[i].name = $(`.record-style input[name="name_${i}"]`).val(); 
//                            item[i].money = $(`.record-style input[name="cost_${i}"]`).val().substring(2) } return item; }
function createItem(cnt)      { var item = new Array(); for(let i=0; i<cnt; i++) { var obj = { "name": `${$(`.record-style input[name="name_${i}"]`).val()}`,
                                "money": `${$(`.record-style input[name="cost_${i}"]`).val().substring(2)}` }; item.push(obj); } console.log(item); return item; }
// row: 1~3, col: 0~9
function emptyCard(tar, r, c) { $(`${tar}(${r})`)[c].className = "bg-lock"; $(`${tar}(${r}) #__Page1__lock`)[c].className = "lock"; $(`${tar}(${r}) #__Page1__cardText`)[c].innerHTML = ""; }
function resetCardbook()      { for(let r=1; r<=3; r++) for(let c=0; c<9; c++) emptyCard('#__Page1__card:nth-child', r, c); }
function showThumbnail()      { $('#__Page3__card__bar').empty(); html2canvas(document.querySelector("#__Page2__card__bar"), { onrendered: function(canvas) { 
                                canvas.style.width = "47.8vw"; canvas.style.height = "37.2vh"; $('#__Page3__card__bar')[0].appendChild(canvas); return canvas.toDataURL("image/png"); } }); }
function showMessage(t1, t2)  { document.getElementById("__Page2__imgUpload").style.opacity = "0.5"; t1.classList.remove("invisible"); t2.classList.remove("invisible"); }
function hideMessage(t1, t2)  { document.getElementById("__Page2__imgUpload").style.opacity = "1.0"; t1.classList.add("invisible"); t2.classList.add("invisible"); }


function showAllWallet(tar)   { $.get('./showAllWallet', {}, (data) => { tar.empty(); autoWallet(data, tar); }) }
function showUname(tar)       { $.get('./showUsername', {}, (data) => { tar.text(data); }) }
function login(data)          { $.get('./loginUser', { mail: data.mail, username: data.mail, password: data.pswd }, (data) => { showUname($('#username')); }) }
function register(mail, pswd) { $.get('./signupLogin', { mail: mail, name: mail, password: pswd }, (data) => { login(data); }) }
function joinWallet(id)       { $.get('./joinWallet', { idcode: id }, (data) => { showAllWallet($('#__overview__flexbox__bar')); }) }
function newWallet(wname)     { $.get('./insertWallet', { wallet: wname }, (data) => { showAllWallet($('#__overview__flexbox__bar')); }) }
function showWname(tar)       { $.get('./showWalletName', {}, (data) => { tar.text(data); })}
function showWcode(tar)       { $.get('./showWalletCode', {}, (data) => { tar.text(data); })}
function getNotification()    { $.get('./getNotification', {}, (data) => { autoNotify(data); }) }
function addNotification(data){ $.get('./addNotification', { time: data.time, item: data.tag }, (data) => { console.log(data); }) }
function selectWallet(wid)    { $.get('./switchWallet', { wallet: wid }, (data) => { getNotification(); }) }
function showMember1(tar)     { $.get('./getMember', {}, (data) => { autoMember1(data, tar); } ) }
function showMember2(tar)     { $.get('./getMember', {}, (data) => { autoMember2(data, tar); } ) }
function getCardInfo()        { $.get('./getUnlocked', {}, (data) => { var cnt = 0; for(let r=0; r<3; r++) { for(let c=0; c<9; c++) { if(!data.normal[r*9+c].unlocked) { 
                                                                       cnt++; emptyCard('#__Page1__card:nth-child', r+1, c); } } } $('#__Page1__unlockAmount').text(`${27-cnt}`); }) }
function sendMessage(msg)     { $.get('./addNotification', { tag: msg }, (data) => { console.log(data) }) }
function setCardInfo(cid, img, talk) { $.get('./setCard', { cardid: cid, special: 0, unlocked: 1, star: 0, picture: img, description: "", talk: talk }, (data) => { console.log("Success!"); }) }
function newHistory(date, name, items, remark) { $.post('./insertHistory', { date: date, name: name, items: items, remark: remark }, (data) => { addNotification(data); }) }


$(document).ready(function() {
  // 註冊帳戶
  $('#form-normal button[type="button"]').click((event) => { register($('#form-normal input[name=email]').val(), $('#form-normal input[name=pwd]').val()); wsConnection(); })
  // 加入錢包
  $('#join-wallet button[type="button"]').click((event) => { joinWallet($('#join-wallet input[name="IDcode"]').val()); })
  // 新增錢包
  $('#new-wallet button[type="button"]').click((event) => { newWallet($('#new-wallet input[name=Wallet]').val()); })
  // 選擇錢包
  $(document).click((event) => { isWallet(event); })
  // 打開側欄
  $('#__Page__menu').click((event) => { showWname($('#__Page__menu__head_word')); })
  // 編輯錢包
  $('#__Page__menualter').click((event) => { showWname($('.__Page16__pocketname')); showWcode($('#__Page16__inviteid')); showMember1($('#__Page16__teammate__container')); })
  $('#__Page__menu__head_word').click((event) => { showWname($('.__Page16__pocketname')); showWcode($('#__Page16__inviteid')); showMember1($('#__Page16__teammate__container')); })
  // 錢包總覽
  $('#__Page__menu__page5').click((event) => { showAllWallet($('#__overview__flexbox__bar')); })
  // 回到首頁
  $('#__Page__menu__page1').click((event) => { getNotification(); })
  // 新增帳單
  $('#manual-submit').click((event) => { let amt = itemAmount(); const item = createItem(amt); newHistory($('#current_date').text(), $('#basis_infos input[name=account_name]').val(), 
                                                                                                            item, $('#comment-block input[name=comment]').val() ); })
  // 選擇付款人 (click 觸發要改)
  $('#__Page7__moneyimg__container .__Page7__moneyimg').click((event) => { showMember2($('#__Page37__people__container')); })
  // 分攤方式   (click 觸發要改)
  $('#__Page37__paytypetop3').click((event) => { showMember2($('#__Page38__people__container')); })
  // 打開卡牌冊
  $('#__Page__menu__page3').click((event) => { /*resetCardbook();*/ getCardInfo(); })
  // 上傳圖片
  $('#__Page2__imgUpload').click((event) => { if(document.getElementById("__Page2__cameraImg").className == "invisible") { showMessage(document.getElementById("__Page2__cameraImg"), document.getElementById("__Page2__uploadText")); }
                                              else hideMessage(document.getElementById("__Page2__cameraImg"), document.getElementById("__Page2__uploadText")); })
  // 儲存卡牌
  $('#__Page2__next').click((event) => { /*setCardInfo('', '#__Page2__messageInput');*/  })
  // 卡牌縮圖
  $('#__Page2__header__container').click((event) => { var img = showThumbnail(); console.log(img); })
  // 發送卡牌對象
  $('#__Page2__next').click((event) => { showMember2($('#__Page3__memberbox')); })
  // 發送卡牌
  $('#__Page3__confirm').click((event) => { var cnt = eqaulAmount(); sendMessage($('#__Page2__cardNameText').text()); })
})