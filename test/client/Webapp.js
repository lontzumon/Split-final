var Webapp = new Vue({
    el: '#Webapp',
    data: {
        scanner: null,
        activeCameraId: null,
        cameras: [],
        scans: []
    },

    mounted: function () {
        var self = this;
        document.getElementById('__Page7__bottomimg3').addEventListener('click', e => {
            self.scanner = new Instascan.Scanner({
                video: document.getElementById('preview'),
                mirror: false,
                refractoryPeriod: 1000,
                scanPeriod: 1
            });
            self.scanner.addListener('scan', function (content, image) {
                self.scans.unshift({ date: (new Date().toLocaleString()), content: content });
            });
            Instascan.Camera.getCameras().then(function (cameras) {
                self.cameras = cameras;
                if (cameras.length == 0) {
                    console.error('沒找到相機元素!!');
                }
                else if (cameras.length > 0) {
                    self.activeCameraId = cameras[cameras.length-1].id;
                    self.scanner.start(cameras[cameras.length-1]);
                } else {
                    console.log("可開啟視訊鏡頭");
                }
            }).catch(function (e) {
                console.error(e);
            });
        });
        document.getElementById('stop_scan').addEventListener('click', e => {
            self.scanner.stop().then(function() {
                console.log('Scanner stopped');
                self.scans = self.scans.splice();
            })
        });
        document.getElementById('camera-submit').addEventListener('click', e => {
            self.scanner.stop().then(function() {
                console.log('Scanner stopped');
                self.scans = self.scans.splice();
            })
        });
    },

    methods: {
        formatName: function (name) {
            return name || '(未知的)';
        },
        selectCamera: function (camera) {
            this.activeCameraId = camera.id;
            this.scanner.start(camera);
        },
        utf8: function (s) {
            // encode to Latin-1 string and decode to utf-8
            return decodeURIComponent(escape(s));
        },
        parsing: function (s) {
            var re = /\*\*[\s]+/;
            if (s.match(re)) {
                alert('若為電子發票，請掃描左方QRCode');
                this.scans.pop();
                return;
            }
            else {
                // alert(s);
                var year = s.substr(10,3);
                var month = s.substr(13,2);
                var day = s.substr(15,2);
                var date = [`${parseInt(year)+1911}`, month, day].join('-');
                var hexcost = s.substr(29,8);
                var totcost = parseInt('0x' + hexcost, 16);
                document.getElementById("current_date").val(date);
                document.getElementById("account_cost").value = totcost;
                
                var more = s.slice(77).split(':', 4);
                var count = parseInt(more[1]);
                var re1 = /\:[\d]+\:[\d]+\:[012]/;
                var tmp = s.slice(77).split(re1);
                var str = tmp[1];
                // alert(str);

                var re2 = /(\:[\u4e00-\u9fa5\S]+\:[\d]+\:[\d]+)/g;
                var list = str.split(re2);
                // alert(list);
                let names = [];
                let costs = [];
                if (count !== list.length) {
                    alert("資訊不夠完整，請手動檢查");   
                }
                for (let i = 0; i < list.length; i++) {
                    let record = list[i].split(':');
                    names.push(record[1]);
                    costs.push(record[3]);
                    if (i > 0) document.getElementById("new-record").click();
                }

                let record_name = document.getElementsByClassName("record_name");
                let record_cost = document.getElementsByClassName("record_cost");
                for (let i = 0; i < list.length; i++) {
                    record_name[i].value = names[i];
                    record_cost[i].value = costs[i];
                }

                // alert(`${date}&${cost}`);
                this.scans.pop();
                return;
            }
        }
    }
});