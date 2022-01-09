Webcam.set({
width: 350,
height:300,
image_format: "png",
png_quality: 90
});

prediction_1 = "";
prediction_2 = "";
camera = document.getElementById("camera");

Webcam.attach(camera);

function takeSnapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result_camera").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
})
};

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/JrDj3L6D8/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded")
};

function predictEmotion(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function speak(){
    var synth = window.speechSynthesis; 
    speak_data_1 = "The first prediction is " +prediction_1; 
    speak_data_2 = "The second prediction is " +prediction_2; 
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}


function gotResult(error, result){
if (error){
    console.error(error);
}
else{
    console.log(result);
    document.getElementById("result1_emotion_name").innerHTML = result[0].label;
    document.getElementById("result2_emotion_name").innerHTML = result[1].label;
    prediction_1 = result[0].label;
    prediction_2 = result[1].label;
    speak();

    if(result[0].label  == "Happy"){
    document.getElementById("result1_emoji_name").innerHTML="&#128512;";
    }
    if(result[0].label == "Sad"){
        document.getElementById("result1_emoji_name").innerHTML="&#128546;";
    }
    if(result[0].label == "Mad"){
        document.getElementById("result1_emoji_name").innerHTML="&#128545;";
    }

    if(result[1].label == "Happy"){
        document.getElementById("result2_emoji_name").innerHTML="&#128512;";
    }
    if(result[1].label == "Sad"){
        document.getElementById("result2_emoji_name").innerHTML="&#128546;";
    }
    if(result[1].label == "Mad"){
        document.getElementById("result2_emoji_name").innerHTML="&#128545;";
    }
    }
}
