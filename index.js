if (navigator.requestMIDIAccess) {
    console.log("MIDI supported");
} else {
    console.log("MIDI not supported");
}

navigator.requestMIDIAccess().then(success, failure);

/**
 * Sets up an event listener for each MIDI input
 * @param {MIDIAccess} midiAccess - a MIDIAccess object returned by the browser if the browser is 
 *                                  successful in connecting to your MIDI device.
 */
function success(midiAccess) {
    console.log(midiAccess);

    const inputs = midiAccess.inputs;
    inputs.forEach((input) => {
        input.addEventListener("midimessage", parseInput);
        console.log("MIDI detected");
    });
}

/**
 * Outputs an error message if the broswer can't connect to your MIDI device.
 */
function failure() {
    console.log("ERROR: could not access MIDI device");
}

/**
 * Listens for MIDI input comming into the browser.
 * @param {MIDIInputMap} input - an input on your MIDI device.
 */
function parseInput(input) {
    const message = new MIDIMessage(input.data[0], input.data[1], input.data[2]);
    console.log(message.toString());
    
    if (message.checkNoteStatus()) {
        AudioStream.startSound(message);
    } else {
        AudioStream.stopSound(message);
    }
}