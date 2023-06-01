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

let oscMap = new Map();

// Handles the input reveived
function parseInput(input) {
    // Set up the audio context
    const audioContext = new AudioContext();

    // Get the MIDI messagge from the keyboard
    const message = new MIDIMessage(input.data[0], input.data[1], input.data[2]);
    console.log(message);

    // Play or stop the note
    if (message.checkNoteStatus()) {
        oscMap.set(message.note, new OscillatorNode(audioContext, {
            type: "sine",
            frequency: noteFrequency[message.note],
        }));
        oscMap.get(message.note).connect(audioContext.destination);
        oscMap.get(message.note).start();
    } else {
        if (oscMap.has(message.note)) {
            const tempOsc = oscMap.get(message.note);
            oscMap.delete(message.note);
            tempOsc.stop();
            
        }
    }

    console.log(oscMap);
}