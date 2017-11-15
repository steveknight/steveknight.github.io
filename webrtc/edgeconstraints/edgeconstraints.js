(function () {

    var videoElement = document.getElementById('video');
    var codeElement = document.getElementById('code');
    var audioOnlyButton = document.getElementById('audio-only');
    var audioVideoButton = document.getElementById('audio-video');
    var myStream;
    var constraints = {
        audio: true,
        video: true
    };

    console.log("hi");

    function gotStream(stream) {
        myStream = stream;
        videoElement.srcObject = stream;
    }

    function handleError(err) {
        console.log(err);
        codeElement.innerHTML=JSON.stringify(err);
    }

    function stopStream(stream) {
        stream.getTracks().forEach(function(track) {track.stop();});
    }

    function getStream(constraints) {
        if(myStream) {
            stopStream(myStream);
            myStream = null;
        }
        codeElement.innerHTML = JSON.stringify(constraints);
        navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
    }

    audioOnlyButton.onclick = function() {
        getStream({audio: false, video: true});
    };

    audioVideoButton.onclick = function() {
        getStream({audio: true, video: true});
    };

})();