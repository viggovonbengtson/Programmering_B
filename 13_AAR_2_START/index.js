
var client

function setup(){

    //mqtt er et objekt vi får fra mqtt-biblioteket i HTML-siden
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    client.on('connect', msg => {
        var toast = select('#toast')
        //console.log(msg)
        console.log('forbundet til NEXT MQTT server')
        toast.html('forbundet til NEXT MQTT server')
        toast.addClass('toastShow')
        setTimeout(()=>{
            toast.removeClass('toastShow')
        },2000)
    })

    client.subscribe('viggo')
    client.subscribe('viggo/page')

    //her får vi beskeder fra forskellige topics vi abbonerer på
    client.on('message', (topic, msg) => {
        console.log(topic, msg.toString)
        msg = msg.toString()
        if(topic == 'viggo/page'){
            console.log('nu skal der skiftes side')
            //ER DET ET TAL?
            msg = '#page' + msg
            shiftPage(msg)

        }
        select('#msg').elt.textContent = 'Besked på topic ' + topic + ' med teksten ' + msg
    })
    //"publish" sender
    client.publish('viggo', '1')
    
}

var currentPage = "#page1"
var readyToShift = true
function shiftPage(newPage){
    if(readyToShift){
        if(!select(newPage)) return
        select(currentPage).removeClass('show')
        currentPage = newPage
        select(currentPage).addClass('show')
        readyToShift = false
        setTimeout(() => readyToShift = true, 50);
    }
}
