document.addEventListener("DOMContentLoaded",function (){

const text=document.getElementById("todo-input")
const btn=document.getElementById("todo-btn")
const item=document.getElementById("todo-item")

let tasks=JSON.parse(localStorage.getItem("tasks")) || []

tasks.forEach((task)=>{
    rendorTask(task)
})


btn.addEventListener("click",function (event){
    event.preventDefault;
    const textData=text.value.trim()
    // to remove extra space from the text
    if(textData==="") return;

    const newTask={
        id:Date.now(),
        textInfo:textData,
        isCompleted:false
    }

    tasks.push(newTask)

    saveTask();
    rendorTask(newTask);// display on the screen
    text.value=""
    // console.log(tasks);
})



function rendorTask(task){
    const li=document.createElement('li')

    li.setAttribute("data-id",task.id)

    if(task.isCompleted==true){
        li.classList.add("completed")
    }

    li.innerHTML=`
    <span>${task.textInfo}</span>
    <button class="btnstyle" id="b" >Delete</button>
    `

    item.appendChild(li);

    li.addEventListener("click",function (event){
        // if(event.target.tagName==="BUTTON"){
        // tasks = tasks.filter((t) => t.id !== task.id);
        // li.remove()   
        // saveTask()
        // }
        task.isCompleted=!task.isCompleted
        li.classList.toggle("completed")
        saveTask()
    })

    

    li.querySelector('button').addEventListener("click",function(e){
        e.stopPropagation() //prevent from toggle firing
        // bubbling
        tasks = tasks.filter((t) => t.id !== task.id);

        li.remove()
        saveTask()

    })

}

function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}


})



