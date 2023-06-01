// Checks if the browser supports WebMIDI
if (navigator.requestMIDIAccess) {
    console.log("MIDI supported");
} else {
    console.log("MIDI not supported");
}

// if the browser is successful in connecting to your MIDI devices, it will return a MIDIAccess object as an argument to the success callback.
navigator.requestMIDIAccess().then(success, failure);

function success(midiAccess) {
    console.log(midiAccess);

    // Sets up a listener for each input
    const inputs = midiAccess.inputs;
    inputs.forEach((input) => {
        input.addEventListener("midimessage", parseInput);
        console.log("MIDI detected");
    });
}

function failure() {
    console.log("ERROR: could not access MIDI device");
}

// Handles the input reveived
function parseInput(input) {

    const message = new MIDIMessage(input.data[0], input.data[1], input.data[2]);
    message.playNote();
}