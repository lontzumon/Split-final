function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
};

function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('/');
};

function DisplayWallet(number) {
    console.log($("#__overview__flexbox__bar").children(number));
    $("#__overview__flexbox__bar").children(number).style['display'] = inline-flex;
}

$(document).ready(); {
    $("#fab-add").click(function() {
        $(this).toggleClass('gray');
        // $(this).text(function(i, text) {
        //     return text === "+" ? "x" : "+";
        // })
        setTimeout(null, 1000);
        window.location.href = "#__Mainpage__manualTrack__container";
    })

    date = new Date();
    $("#current_date").html(formatDate(date));
}