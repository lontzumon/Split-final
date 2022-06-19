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

// function DisplayWallet(number) {
//     // console.log($("#__overview__flexbox__bar").children(number));
//     $("#__overview__flexbox__bar").children(number).style['display'] = inline-flex;
// }

/* Self-Executing Anonymous Function (IIFE) */
(function () {
    var width = 320;
    var height = 0;
    var streaming = false;
    var video = null;
    var canvas = null;
    var photo = null;
    var startbtn = null;

    // function showViewLiveResultButton() {
    //     if (window.self !== window.top) {
    //         // Ensure that if our document is in a frame, we get the user
    //         // to first open it in its own tab or window. Otherwise, it
    //         // won't be able to request permission for camera access.
    //         document.querySelector(".contentarea").remove();
    //         const button = document.createElement("button");
    //         button.textContent = "View live result of the example code above";
    //         document.body.append(button);
    //         button.addEventListener('click', () => window.open(location.href));
    //         return true;
    //     }
    //     return false;
    // }

    function startup() {
        // if (showViewLiveResultButton()) { return; }
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbtn = document.getElementById('startbtn');

        navigator.mediaDevices.getUserMedia(
            {
                video: { facingMode: 'environment' }, audio: false
            }
        )
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
            });

        video.addEventListener('canplay', function (event) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbtn.addEventListener('click', function (event) {
            takepicture();
            event.preventDefault();
        }, false);

        clearphoto();
    }

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        } else {
            clearphoto();
        }
    }

    window.addEventListener('load', startup, false);
})();

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
    $("#current_date").html(formatDate(date));
});