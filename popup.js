var changeColor = document.getElementById("changeColor");

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  chrome.storage.sync.get('text', function(data) {
    callPolly(data.text);
  });
};

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if (message.text == "loaded") {
      console.log ("Popup says it was opened.");
      chrome.storage.sync.get('text', function(data) {
        callPolly(data.text);
      });
      // Run your script from here
  }
});

const callPolly = (textToSpeak) => {
  AWS.config.region = 'us-east-1'; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:19d349e4-c433-42d3-a965-6ddf5b3ffecc',
  });
  // Function invoked by button click
    // Create the JSON parameters for getSynthesizeSpeechUrl

    var speechParams = {
        OutputFormat: "mp3",
        SampleRate: "16000",
        Text: "Nope",
        TextType: "text",
        VoiceId: "Brian",
        Engine: "neural"
    };

    speechParams.Text = textToSpeak;

    var polly = new AWS.Polly({apiVersion: '2016-06-10'});
    var signer = new AWS.Polly.Presigner(speechParams, polly)

    // Create presigned URL of synthesized speech file
    signer.getSynthesizeSpeechUrl(speechParams, function(error, url) {
    if (error) {
        document.getElementById('result').innerHTML = error;
    } else {
        document.getElementById('audioSource').src = url;
        document.getElementById("audioPlayback").playbackRate = 2;
        document.getElementById('audioPlayback').load();
    }
  });
}