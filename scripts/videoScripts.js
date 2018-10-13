/* Adds a listener to the document (whole page), waits for the page's content to be loaded,
then runs the handleWindowLoad function. Without this, the elements will have not loaded yet meaning any code
in handleWindowLoad function will not work correctly */

document.addEventListener("DOMContentLoaded", handleWindowLoad);

function handleWindowLoad()
{

    //OTHER TASKS - Not assessed
    var myVideo = document.querySelector("video"); //refers to video
    var playButton = document.getElementById("playPause"); //refers to play/pause button

    var scrubSlider = document.getElementById("seekBar"); //refers to position seek slider

    /*Before each function - Adds a listener to each button used to control the video, so that the functions associated with the listener run where necessary such as when a user clicks on a button, or when the user scrubs the slider.*/

    myVideo.addEventListener("durationchange", displayDuration);
    function displayDuration ()
    {
        var durationDisplay = document.getElementById("durationField"); //selects the duration box
        //Math.floor will round the value down, this is important because if a value obtained was rounded up the video's length would be inaccurate

        //Minutes: This gets the whole number of the division - using the normal division operator,  of the video duration by 60. This represents the minutes of the video.
        var minutes = Math.floor(myVideo.duration/60); //Produces 'minutes' of video as a whole number (integer)

        //Seconds: This gets the value after the decimal point, using the modulus operator, which doing so produces the seconds of the video.
        var seconds = Math.floor(myVideo.duration%60); //Produces 'seconds' of video as a whole number (integer)

        //Concatenation used to add leading zero, make representation of values less than 10 better
        if (minutes < 10) minutes = "0" + minutes; //Adds a leading 0 if the minutes is less than 10
        if (seconds < 10) seconds = "0" + seconds; //Adds a leading 0 if the seconds is less than 10

        durationDisplay.value = minutes + ":" + seconds ; //Sets the value in the duration box by concatenating the minutes, together with seconds, and the character ":".
    }

    playButton.addEventListener("click", playPauseVideo);
    function playPauseVideo() //Runs when the play/pause button is clicked
    {
        if (myVideo.paused === true) //Runs if the video is already paused
            {
                myVideo.play(); //Runs the play function associated with the video causing it to play once button is clicked
                playButton.innerHTML = "Pause";
            }
        else //Runs if the video is currently playing
            {
                myVideo.pause(); //Runs the pause function associated with the video causing it to pause once button is clicked
                playButton.innerHTML = "Play";
            }
    }

    var muteButton = document.getElementById("muteButton"); //refers to mute button
    muteButton.addEventListener("click", muteVideo);



    function muteVideo() //Runs when the mute button is clicked
    {


        if (myVideo.muted === true) //click button, video is unmuted, text changes back to Mute
            {

                myVideo.muted = false; //Sets the property, muted, to false if it is already muted (so the video unmutes)
                muteButton.innerHTML = "Mute";

                volumeSlider.value = volumePosition;
            }

        else //click button, video Muted, text changes back to Unmute
        {
            myVideo.muted = true; //Sets the property, muted, to true if it is already unmuted (so the video mutes)
            muteButton.innerHTML = "Unmute";

            volumeSlider.value = 0; //Moves my volume slider to start (to mute position)
        }
    }


    scrubSlider.addEventListener("input", scrubVideo);
    function scrubVideo()
    {
        var scrubTime = myVideo.duration * (scrubSlider.value/100); //Calculates a percentage of the video that user wants to skip to
        myVideo.currentTime = scrubTime; //Sets the video's time to the value that the user has scrubbed to
    }


    /* timeupdate event runs whenever currentTime of the video is updated so whenever the time of the video changes. the position of the slider will also change */
    myVideo.addEventListener("timeupdate", movePlaySlider);
    function movePlaySlider() //Handles event to update the position of the seek slider
    {

        if (myVideo.currentTime > 0)
            {
                /* This sets the scrub slider's position to the % of the video, timeupdate is constantly fired
                meaning this will update as the video plays. Scrub slider is 0 to 100,
                this converts it to a % so it matches accordingly */
                scrubSlider.value = (myVideo.currentTime/myVideo.duration) * 100;
            }
        else
            {
               scrubSlider.value = 0;
            }

    }

    /* mousedown event listens for when the user holds onto the scrub slider allowing for the video to pause. Only during this time will it pause because of mousedown */
    scrubSlider.addEventListener("mousedown",pauseSlider);
    function pauseSlider()
    {
        myVideo.pause();
    }

    /* mouseup event listens for when the user releases the scrub slider button and at that moment the video will continue to play - shows that the user has finished forwarding/reversing the video */
    scrubSlider.addEventListener("mouseup", resumeSlider);
    function resumeSlider()
    {
        myVideo.play();
    }






    //ASSESSED TASKS

    //Assessed Task 1: Stop Button

    var stopButton = document.getElementById("stopButton");

    /* Adds an event to the stop button, listens for when the stop button is pressed and released, then runs the stopVideo function */
    stopButton.addEventListener("click", stopVideo);

    function stopVideo() //Runs when the stop button is clicked
    {
        myVideo.pause(); //pauses the video at current time, using the pause function of HMTLMediaElement

        myVideo.currentTime = 0; //changes currentTime property to 0 (resets video to beginning)

        playButton.innerHTML = "Play"; //changes play/pause button text
    }

    //Assessed Task 2: creating and handling a volume slider

    var volumeSlider = document.getElementById("volumeSlider");
    var volumePosition = volumeSlider.value;

    /* Adds an event to the volume slider, listens for when the volume slider is moved,
    then runs the changeVolume function */
    volumeSlider.addEventListener("input", changeVolume);
    /* Input: This will detect when the user moves the volume slider at all*/

    function changeVolume()
    {
        /* Video volume expects a value between 0 and 1. The range of the volume bar is between 0 and 1 'min' and 'max', so it is parallel with this range expected. So the volume of the video is therefore set to the 'value' property of the volumeSlider i.e. the position of the slider.*/
        myVideo.volume = volumeSlider.value;
    }

    //Assessed Task 3: implement a current playback time field

    var currentTimeField = document.getElementById("currentTimeField");

    /* timeupdate event is fired, listening to myVideo, runs displayCurrentTime function. timeupdate runs whenever the currentTime property of the video changes allowing for the current time to be accurately updated as this happens. */
    myVideo.addEventListener("timeupdate", displayCurrentTime);

    function displayCurrentTime()
    {
        var minutes = Math.floor(myVideo.currentTime/60); //Gets the minutes part of the time using regular division
        /* Operator used is DIVIDE: the whole number part of the division is taken, using Math.floor() (nearest integer - rounds DOWN)*/

        var seconds = Math.floor(myVideo.currentTime%60); //Gets the seconds part of the time using modulus
        /* Operator used is MODULUS: the fractional part of the divison is taken, Math.floor() rounds to the nearest integer - rounds DOWN*/

        if (minutes < 10) minutes = "0" + minutes; //Adds a leading 0 if the minutes is less than 10
        if (seconds < 10) seconds = "0" + seconds; //Adds a leading 0 if the seconds is less than 10

        currentTimeField.value = minutes + ":" + seconds;
        //Alters the current time box, to show the current time using concatenation

        //Concatenation used to add leading zero, make representation of values less than 10 clearer

    }

    //Assessed Task 4: implement a playback speed changer

    //Assigns the select element to the variable name "speedControls"
    var speedControls = document.getElementById("speedControls");

    /*Listens for the 'change' event which is fired when the value of 'select' (the drop down menu) is changed by the user.*/

    /*Unlike the 'input' event, the 'change' event will only fire on certain occasions such as when the user changes the option in the dropdown menu (whereas input is constantly firing - unnecessary)*/

    speedControls.addEventListener("change", changeSpeed);

    /*For each speed option, it has its 'value' property assigned (e.g. x2 faster is 2).
    When the user changes an option in the dropdown menu, the playbackRate property of the video is set to whichever option the user clicked.
    //This uses the fact that the 'value' of each option corresponds to the label (so x2 is 2, and so on).*/
    function changeSpeed()
    {
        myVideo.playbackRate = speedControls.value;
    }


    //Assessed Task 5: implementing a variable fast-forward button

    var fastForwardButton = document.getElementById("fastForward"); //Saves the fast forward button in a variable, referring to its ID

    fastForwardButton.addEventListener("mousedown", changeToTripleSpeed); //Changes the video speed to triple speed. The mousedown event is listened for so every time the user holds down on the button, the speed of the video becomes 3 times as fast.

    function changeToTripleSpeed()
    {
        myVideo.playbackRate = 3; //Alters the playbackRate property when the user holds down on the button, by changing the video speed to 3 changing the playbackRate property.
        fastForwardButton.innerHTML = "x3"; //Lets the user know that the speed has now changed to x3. (innerHTML allows for the contents of a HTML element to be modified)
    }

    fastForwardButton.addEventListener("mouseup", changeToDoubleSpeed) //Listens for the mouseup event so once the user releases the fast forward button, the speed goes from triple to double the speed.

    function changeToDoubleSpeed()
    {
        myVideo.playbackRate = 2; //Alters the playbackRate property when the user releases the button, by changing the video speed to 2
        fastForwardButton.innerHTML = "x2"; //Shows the user that the speed is now x2
    }

    fastForwardButton.addEventListener("dblclick", revertToNormalSpeed); //Listens for when the user double clicks on the fast forward button using the dblclick event. This will allow for the speed of the video to be reverted back to normal

    function revertToNormalSpeed()
    {
        myVideo.playbackRate = 1; //Alters the playbackRate property when the user double clicks the button, by changing the video speed to 1 (the original speed)
        fastForwardButton.innerHTML = ">>";
    }
}
