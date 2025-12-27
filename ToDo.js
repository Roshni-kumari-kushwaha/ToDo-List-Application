const API_URL =  "http://localhost:3000/tasks";
;
window.onload = fetchTasks();

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
                     <button class="btn-complete">✔️</button>
                     <button class="btn-edit">✏️</button>
                     <button class="btn-delete">❌</button>
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
        alert("Task cannot be empty");
        return;
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
    fetch(${API_URL}/${id},
           {method:"DELETE"})
           .then(fetchTasks);
}

function toggleTask(id){
    fetch(${API_URL}/${id},
        {method:"DELETE"})
        .then(fetchTasks);
}

function editTask(id,oldTitle){
    const newTitle = prompt("Edit task:",oldTitle);

    if(!newTitle || newTitle.trim() === ""){
        alert("Task cannot be empty");
        return;
    }

    fetch(${API_URL}/${id},
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"},
            body:JSON.stringify({title:newTitle})
        }).then(fetchTasks);
}

