const API_URL =  "http://localhost:3000/tasks";
;
window.onload = fetchTasks();
let currentEditId = null;
const input = document.getElementById("taskInput");
input.addEventListener("keydown",
    function(e){
        if(e.key === "Enter"){
            addTask();
        }
    }
)
function fetchTasks() {
    fetch(API_URL)
        .then(res => res.json())
        .then(tasks => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";

            tasks.forEach(task => {
                const li = document.createElement("li");

                li.innerHTML = `
                    <span class="${task.completed ? 'completed' : ''}">
                        ${task.title}
                    </span>
               
                <div>
                     <button class="btn-complete" onclick="toggleTask(${task.id})">✔️</button>
                     <button class="btn-edit" onclick="editTask(${task.id},'${task.title}')">✏️</button>
                     <button class="btn-delete" onclick=" deleteTask(${task.id})">❌</button>
                </div>
                 `;
               
                list.appendChild(li);
            });
        });
}


function addTask(){
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

   
    console.log(title);

    if(!title){
        showMessage("Task cannot be empty");
        return
    }
   
    fetch(API_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({title})
    }).then(()=>{
        input.value = "";
        fetchTasks();
    });
}

function deleteTask(id){
    fetch(`${API_URL}/${id}`,
           {method:"DELETE"})
           .then(fetchTasks);
}

function toggleTask(id){
    fetch(`${API_URL}/${id}`,
        {method:"PATCH"})
        .then(fetchTasks);
}

function editTask(id,oldTitle){
    currentEditId = id;

    document.getElementById("editInput").value = oldTitle;
    document.getElementById("editModal").classList.remove("hidden");

}

function closeModal(){
    document.getElementById("editModal").classList.add("hidden");
    currentEditId = null;
}

function saveEdit(){
    const newTitle = document.getElementById("editInput").value.trim();
    
    if(newTitle === ""){
        showMessage("Task cannot be empty");
        return
    }
   fetch(`${API_URL}/${currentEditId}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"},
            body:JSON.stringify({title:newTitle})
        }).then(res =>{
             if(res.ok){
                fetchTasks();
                closeModal();
             }
        });
       
}

function showMessage(msg){
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.remove("hidden");

    setTimeout(()=>{
        toast.classList.add("hidden");
    },2000);
}

