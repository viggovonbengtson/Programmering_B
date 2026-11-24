var currentPage = '#page1'


function setup(){
    
    
    friction = 0.99
    canvas = createCanvas(canvasWidth(), windowHeight)
    ball = new Ball(120, 280, 80, null, '#ff6347', 4, 0)
    
    select('#btnLeft').mousePressed(()=>{
        console.log('guhh')
    })
    btnLeft = select("#btnLeft")
    btnLeft.mousePressed (()=>{
        console.log('left')
    })
}




function draw(){

    // MovingBall
    if(currentPage == '#page1'){
        background('palegreen')
        clearDrive(move)
        steer(move)
        move.update()
        move.constrain()
        countHit(move, other)
        move.bounce(other)
        move.show()
        showOther()
    }
}

function PlotGaze(GazeData) {
    /*
	GazeData.state // 0: valid gaze data; -1 : face tracking lost, 1 : gaze uncalibrated
	GazeData.docX // gaze x in document coordinates
	GazeData.docY // gaze y in document cordinates
	GazeData.time // timestamp
    */
   document.getElementById("GazeData").innerHTML = "GazeX: " + GazeData.GazeX + " GazeY: " + GazeData.GazeY;
   document.getElementById("HeadPhoseData").innerHTML = " HeadX: " + GazeData.HeadX + " HeadY: " + GazeData.HeadY + " HeadZ: " + GazeData.HeadZ;
   document.getElementById("HeadRotData").innerHTML = " Yaw: " + GazeData.HeadYaw + " Pitch: " + GazeData.HeadPitch + " Roll: " + GazeData.HeadRoll;
   
   var x = GazeData.docX;
   var y = GazeData.docY;
   
   var gaze = document.getElementById("gaze");
   x -= gaze .clientWidth/2;
   y -= gaze .clientHeight/2;
   
   gaze.style.left = x + "px";
   gaze.style.top = y + "px";
   
   
   if(GazeData.state != 0)
    {
        if( gaze.style.display  == 'block')
            gaze  .style.display = 'none';
    }
    else{
        {
            if( gaze.style.display  == 'none')
                gaze  .style.display = 'block';
        }
    }

    //////set callbacks/////////
    window.addEventListener("load", function() {
        
        GazeCloudAPI.OnCalibrationComplete = function(){ console.log('gaze Calibration Complete')  }
        GazeCloudAPI.OnCamDenied =  function(){ console.log('camera  access denied')  }
        GazeCloudAPI.OnError =  function(msg){ console.log('err: ' + msg)  }
        GazeCloudAPI.UseClickRecalibration = true;
        GazeCloudAPI.OnResult = PlotGaze; 
    });

    function shiftPage(newPage){
        select(currentPage).removeClass('show')
        select(newPage).addClass('show')
        currentPage = newPage
    }

}