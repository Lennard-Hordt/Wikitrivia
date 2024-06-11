const events = []
let currentEvent = null;
let life = 3

window.onload = () => {
    getResponse().then((initialEvent) => {
        events.push(initialEvent);
        getResponse().then((event) => {
            currentEvent = event;
            drawCurrentEvent();
        })
        drawTimeline();
    })
}

async function getResponse(){
    const data = await fetch('/request?nextObj')
    const json = await data.json()
    return json;
}

function calcPosition(){
    for (let i = 0; i < events.length; i++){
        if (currentEvent.date < events[i].date){
            return i;
        }
    }
    return events.length
}

function createButton(id){
    let bt = document.createElement("button");
    bt.innerText = "+";
    bt.onclick = () => {insertEvent(id)};
    return bt;
}

function drawCurrentEvent(){
    if (currentEvent.win){
        confirm("Du hast Gewonnen!!!")
        location.reload()
    }
    let div = document.getElementById("currentObj");
    div.innerHTML = ""
    let img = document.createElement("img");
    img.src = currentEvent.pic;
    img.width = 200;
    img.height = 200;
    let yearHeader = document.createElement("h3");
    yearHeader.innerText = currentEvent.title;
    div.appendChild(img)
    div.appendChild(yearHeader)
}

function createEventDiv(event){
    let div = document.createElement("div");
    div.className = "event-div";
    let img = document.createElement("img");
    img.src = event.pic;
    img.width = 200;
    img.height = 200;
    let yearHeader = document.createElement("h3");
    yearHeader.innerText = event.date;
    let title = document.createElement("h3")
    title.innerText = event.title;
    div.appendChild(title)
    div.appendChild(img)
    div.appendChild(yearHeader)
    return div;
}

function drawTimeline(){
    const timeline = document.getElementById("timeline");

    timeline.innerHTML = "";

    for (let i = 0; i < events.length; i++){
        timeline.appendChild(createButton(i));
        timeline.appendChild(createEventDiv(events[i]));
    }
    
    timeline.appendChild(createButton(events.length));
}

function insertEvent(index){
    if (index == calcPosition()){
        events.splice(index, 0, currentEvent);
        getResponse().then((event) => {
            currentEvent = event;
            drawCurrentEvent();
        })
        drawTimeline();
    }
    else{
        life -= 1
        if (life == 0){
            confirm("Du hast Verloren :(")
            location.reload()
        }
        events.splice(calcPosition, 0, currentEvent);
        getResponse().then((event) => {
            currentEvent = event;
            drawCurrentEvent();
        })
        drawTimeline();
    }
}
