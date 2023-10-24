var x=100, y=100, y1=50, z=100
var objects_initialized=false
let preview_objects=[]
let value_objects=[]
let highlight=0

async function showPage(button=null){
  if(button==null){
    button=document.getElementById("calc")
  }        
  await fetch("docs/"+button.id+".html")
  .then(response=> response.text())
  .then(text=> document.querySelector("main").innerHTML = text);
  Array.from(document.getElementsByClassName("footer-button")).forEach((button) => {
    button.querySelector("svg").querySelector("path").style.fill="var(--icons-off-color)"
    button.querySelector("svg").style.transform="scale(1.1)"
    button.style.color="var(--icons-off-color)"
  })
  button.querySelector("svg").querySelector("path").style.fill="var(--accent-color)"
  button.querySelector("svg").style.transform="translate(0,-5px) scale(1.1)"
  button.style.color="var(--accent-color)"

  if(button.id=="calc"){
    console.log("calc")

    document.querySelector("header").innerHTML="Kalkulator"

    document.getElementById("value1").onchange=()=>update()
    document.getElementById("value2").onchange=()=>update()
    document.getElementById("value3").onchange=()=>update()
    document.getElementById("value4").onchange=()=>update()
    
    document.getElementById("preview-container").onclick=()=>{
      // console.log(document.getElementById("preview-container").style.display)
      if(document.getElementById("preview-content").style.display=="none"){
        document.getElementById("preview-content").style.removeProperty("display")
        document.getElementById("preview-arrow").style.transform="rotate(0deg)"
        return
      }
      document.getElementById("preview-content").style.display="none"
      // document.getElementById("preview-content").style.height="0px"
      document.getElementById("preview-arrow").style.transform="rotate(-180deg)"
      
    }
    
    initializeObjects()
    
    // document.getElementById("header-content").style.visibility="visible"
  }
  if(button.id=="hist"){
    // document.getElementById("header-content").style.visibility="hidden"
    console.log("hist")

    document.querySelector("header").innerHTML="Historia"
    // cos.delete()
  }
}

function update(time=300){
  x=Number(document.getElementById("value1").value)
  y=Number(document.getElementById("value2").value)
  y1=Number(document.getElementById("value4").value)
  z=Number(document.getElementById("value3").value)
  preview_objects.forEach((object)=>{
    object.update(time)
  })

  value_objects.forEach((object)=>{
    object.update(time)
  })
}

function initializeObjects(){
  document.getElementById("highlight-select").oninput=()=>{
    highlight=Number(document.getElementById("highlight-select").value)
    console.log(highlight)
    update()
  }

  preview_objects[0]=new houseFront("preview-element-0")
  preview_objects[1]=new houseSide("preview-element-1")
  preview_objects[2]=new houseFloor("preview-element-2")
  preview_objects[3]=new houseFront("preview-element-3")

  // value_objects[0]=new side_plain_obj("value-preview-0")
  update(1)
}

window.onload = async function() {
  Array.from(document.getElementsByClassName("footer-button")).forEach((button) => {
    button.onclick=()=>showPage(button)
  });
  await showPage()
  // initializeObjects()
};
