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
            })
        });
        document.getElementById('camera-submit').addEventListener('click', e => {
            self.scanner.stop().then(function() {
                console.log('Scanner stopped');
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
        }
    }
});