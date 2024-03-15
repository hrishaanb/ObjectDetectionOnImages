status = "";
objects = [];
function preload () {
    img = loadImage("20230827_185959.jpg")
}
function setup () {
    canvas = createCanvas(640, 420);
    canvas.position(430, 230);
    objectDetected = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded () {
    console.log("Model Loaded!");
    status = "True";
    objectDetected.detect(img, gotResult);
}
function gotResult (error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
function draw () {
    image(img, 0, 0, 640, 420);
        if (status != undefined) {
            for(i=0;i<objects.length;i++) {
                document.getElementById("status").innerHTML = "Status: Objects Detected";
                console.log("Objects - " + objects[i].label);
                console.log("X - " + objects[i].x);
                console.log("Y - " + objects[i].y);
                console.log("Confidence - " + objects[i].confidence);
                console.log("Height - " + objects[i].height);
                console.log("Width - " + objects[i].width);
                fill("red");
                //circle(objects[i].x, objects[i].y, 200);
                percent = floor(objects[i].confidence*100);
                text(objects[i].label + ", " + percent + "%", objects[i].x+10, objects[i].y+20);
                noFill();
                stroke("red");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
}
