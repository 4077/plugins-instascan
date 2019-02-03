(function (__nodeNs__, __nodeId__) {
    $.widget(__nodeNs__ + "." + __nodeId__, $.ewma.node, {
        options: {},

        __create: function () {
            var w = this;
            var o = w.options;
            var $w = w.element;

            w.bind();
        },

        bind: function () {
            var w = this;
            var o = w.options;
            var $w = w.element;

            var $closeButton = $(".close_button", $w);

            $closeButton.click(function () {
                w.r('close');
            });

            //

            var scanner = new Instascan.Scanner({
                video:  $("video", $w).get(0),
                mirror: false
            });

            scanner.addListener('scan', function (content) {
                $w.addClass("scanned");
                document.location.href = content;
            });

            var $camera = $(".camera", $w);
            var cameras = [];

            Instascan.Camera.getCameras().then(function (_cameras) {
                cameras = _cameras;

                if (cameras.length > 0) {
                    if (cameras.length > 1) {
                        $camera.find(".camera_icon").show();

                        for (var i in cameras) {
                            i = parseInt(i);

                            var $cameraButton = $("<div></div>");

                            $cameraButton.addClass("camera_button").html(i + 1).attr("index", i).appendTo($camera);

                            if (i == o.camera) {
                                $cameraButton.addClass("current");
                            }

                            $cameraButton.click(function () {
                                setCamera($(this).attr("index"));
                            });
                        }
                    }

                    o.camera = constrains(o.camera, 0, cameras.length - 1);

                    scanner.start(cameras[o.camera]);
                } else {
                    $(".error", $w).show();
                }
            }).catch(function (e) {
                console.error(e);
            });

            var setCamera = function (index) {
                o.camera = index;

                $(".camera_button", $w).removeClass("current");
                $(".camera_button[index='" + index + "']", $w).addClass("current");

                scanner.stop();
                scanner.start(cameras[o.camera]);

                w.r('setCamera', {
                    index: o.camera
                });
            }
        }
    });
})(__nodeNs__, __nodeId__);
