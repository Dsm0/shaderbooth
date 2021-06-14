var audioCtx = null;
var analyser = null;

function getLocalStream(video) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    try {
        source = audioCtx.createMediaStreamSource(video);
        source.connect(analyser);
    }
    catch (err) {
        console.log("u got an error:" + err)
    };
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const audioUniforms = (section) => {

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    analyser.getByteFrequencyData(dataArray);

    avg = 0;

    for (i = (section * dataArray.length / 4); i < ((section + 1) * dataArray.length / 4); i++) {
        avg += dataArray[i];
    }

    avg = avg / (dataArray.length/4);

    return avg;
}

module.exports = { getLocalStream, audioUniforms }