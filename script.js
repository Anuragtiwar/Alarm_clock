//all Varaiables...
const selectMenu = document.querySelectorAll('select');
let hours=document.getElementById('hours');
let minutes=document.getElementById('minutes');
let seconds=document.getElementById('seconds');
let AmOrPM=document.getElementById('Am/PM');
let alarmSound=new Audio('./sound.mp3')
//feeding data into the hourse,minutes,seconds....
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${ i }`: i;
    let option=`<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML('afterend',option);
    selectMenu[1].firstElementChild.insertAdjacentHTML('afterend',option);
}

for (let i = 59; i >= 0 ; i--) {
    i = i < 10 ? `0${ i }`: i;
    let option=`<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML('afterend',option);
    selectMenu[2].firstElementChild.insertAdjacentHTML('afterend',option);
}



//clock function...
function currentTime() {
    let date = new Date(); 
     hh = date.getHours();
     mm = date.getMinutes();
     ss = date.getSeconds();
     session = "AM";
  
    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
        
    document.getElementById("box1").innerText = hh; 
    document.getElementById("box2").innerText = mm; 
    document.getElementById("box3").innerText = ss; 
    document.getElementById("box4").innerText = session; 


}
setInterval(currentTime, 1000);


function checkForValidtime() {
    if (hours.value=="00") {
        alert("Enter a valid time");
    }else{
        setAlarm();
    }
}



function setAlarm() {
    
     // Get the selected values
     let selectedHour = parseInt(hours.value, 10);
     let selectedMinute = parseInt(minutes.value, 10);
     let selectedSecond = parseInt(seconds.value, 10);
     let selectedAmPm = AmOrPM.value;

     // Convert selectedHour to 24-hour format if PM is selected
     if (selectedAmPm === "PM" && selectedHour !== 12) {
         selectedHour += 12;
     }

     document.getElementById("InfoBox1").innerText = selectedHour; 
     document.getElementById("InfoBox2").innerText = selectedMinute; 
     document.getElementById("InfoBox3").innerText = selectedSecond; 
     document.getElementById("InfoBox4").innerText = selectedAmPm; 
    // Set up a setInterval to check the time periodically
    intervalId =setInterval(function () {
        // Get the current time
        let date = new Date();
        let currentHour = date.getHours();
        let currentMinute = date.getMinutes();
        let currentSecond = date.getSeconds();
        let currentAmPm = (currentHour >= 12) ? "PM" : "AM";
     

        // Check if the current time matches the selected alarm time
        if (
            selectedHour === currentHour &&
            selectedMinute === currentMinute &&
            selectedSecond === currentSecond &&
            selectedAmPm === currentAmPm
        ) {
            alarmSound.play();
        }
    }, 1000); // Check every second
}

function snooze() {
    // Clear the interval when the "Clear Alarm" button is clicked
    document.getElementById("InfoBox1").innerText = ""; 
    document.getElementById("InfoBox2").innerText = "";  
    document.getElementById("InfoBox3").innerText = ""; 
    document.getElementById("InfoBox4").innerText = ""; 
    clearInterval(intervalId);
    alarmSound.pause();

}