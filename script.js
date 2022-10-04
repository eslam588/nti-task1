const addUser = document.querySelector("#addUser") //null
const userWrap=document.querySelector("#userWrap")
const editUser= document.querySelector("#editUser");

//read from localstorage
const readFromStorage = (key="users") => JSON.parse(localStorage.getItem(key))||[]
//write to localstorage
const writeToStorage = (users, key="users") => localStorage.setItem(key, JSON.stringify(users))

//Add Form
if(addUser){
    addUser.addEventListener("submit", function(e){
        e.preventDefault()
        const user = {
            id:Date.now(),
            name:this.elements.name.value,
            age:this.elements.age.value,
            email:this.elements.email.value
        }
        const users = readFromStorage()
        users.push(user)
        writeToStorage(users)
        addUser.reset()
        window.location.href="index.html"
    })
}

if(editUser){
    editUser.addEventListener("submit", function(e){
        e.preventDefault();
        window.location.href="edit.html"

    })
}
const createMyOwnEle = (createdElement, parent, txt=null, classes=null) =>{
    const myElement= document.createElement(createdElement)
    parent.appendChild(myElement)
    myElement.textContent=txt
    myElement.classList=classes
    return myElement
}
const drawAll = (allUsers) =>{
    userWrap.innerHTML=""
    allUsers.forEach((user, index)=>{
        const tr = createMyOwnEle("tr", userWrap)
        createMyOwnEle("td", tr, user.id)
        createMyOwnEle("td", tr, user.name)
        const td = createMyOwnEle("td", tr)
        const delBtn = createMyOwnEle("button", td, "delete", "btn btn-danger")
        delBtn.addEventListener("click", function(e){
            console.log("delete btn ", user.id, " => ", index)
            allUsers.splice(index, 1)
            writeToStorage(allUsers)
            drawAll(allUsers)
        })
    })
}
//show all
if(userWrap){
    const allUsers = readFromStorage()
    drawAll(allUsers)
}
