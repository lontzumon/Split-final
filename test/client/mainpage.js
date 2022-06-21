function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
};

function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
};

var record_tot = 1;
function add_record() {
    var flexbox = document.getElementById("record-flexbox");
    var new_record = document.createElement("div");
    new_record.classList.add("record-style");
    new_record.style.marginTop = "1.5vh";

    var record_name = document.createElement("input");
    record_name.classList.add("record-name");
    record_name.type = "text";
    record_name.name = `name_${record_tot}`;
    record_name.placeholder = "品項";
    var record_cost = document.createElement("input");
    record_cost.classList.add("record-cost");
    record_cost.type = "text";
    record_cost.name = `cost_${record_tot}`;
    record_cost.inputMode = "decimal";
    record_cost.placeholder = "$ 0";
    record_tot++;
    
    new_record.appendChild(record_name);
    new_record.appendChild(record_cost);
    flexbox.appendChild(new_record);
}

/* Self-Executing Anonymous Function (IIFE) */
// (function () {
// })();

$(document).ready(function() {
    $("#fab-add").click(function () {
        $(this).toggleClass('gray');
        // $(this).text(function(i, text) {
        //     return text === "+" ? "x" : "+";
        // })
        setTimeout(null, 1000);
        window.location.href = "#__Mainpage__manualTrack__container";
    })

    date = new Date();
    $(".current_date").html(formatDate(date));


    $('#account_cost').inputmask({
        alias: 'currency',
        digits: 0,
        rightAlign: 0,
        placeholder: '0',
        clearMaskOnLostFocus: true
    })

    $('.record-cost').inputmask({
        alias: 'currency',
        digits: 0,
        rightAlign: 0,
        placeholder: '0',
        clearMaskOnLostFocus: true
    })

    $('#new-record').click(() => {
        $('.record-cost').inputmask({
            alias: 'currency',
            digits: 0,
            rightAlign: 0,
            placeholder: '0',
            clearMaskOnLostFocus: true
        })
    })
});