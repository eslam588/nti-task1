//html items
const addArticle = document.querySelector("#addArticle") 
const userWrap=document.querySelector("#userWrap")
const singleUserWrap = document.querySelector("#singleUserWrap");

const addComment= document.querySelector("#addComment");

const commentdiv = document.querySelector("#commentdiv");




//user details
const userHeads = ["title","content"]
//read from localstorage
const readFromStorage = (key="users") => JSON.parse(localStorage.getItem(key))||[]
//write to localstorage
const writeToStorage = (users, key="users") => localStorage.setItem(key, JSON.stringify(users))


//create spcial element

const createMyOwnEle = (createdElement, parent, txt=null, classes=null) =>{
    const myElement= document.createElement(createdElement)
    parent.appendChild(myElement)
    myElement.textContent=txt
    myElement.classList=classes
    return myElement
}
//showUserAction
const showUser = (user)=>{
    writeToStorage(user, "single")
    window.location.href = "single.html"
}
//drawAllItems 
const drawAll = (allUsers) =>{
    userWrap.innerHTML=""
    allUsers.forEach((user, index)=>{
        const tr = createMyOwnEle("tr", userWrap)
        createMyOwnEle("td", tr, user.id)
        createMyOwnEle("td", tr, user.title)
        createMyOwnEle("td", tr, user.content)
        const td = createMyOwnEle("td", tr)
        const showBtn = createMyOwnEle("button", td, "Show", "btn btn-primary mx-2")
        showBtn.addEventListener("click", ()=> showUser(user))
    })
}
//Add Form
if(addArticle){
    addArticle.addEventListener("submit", function(e){
        e.preventDefault()
        const user = { id:Date.now() }
        userHeads.forEach(head=> user[head] = this.elements[head].value)
        const users = readFromStorage()
        users.push(user)
        writeToStorage(users)
        addArticle.reset()
        window.location.href="index.html"
    })
}
//show all
if(userWrap){
    const allUsers = readFromStorage()
    drawAll(allUsers)        
}




if(singleUserWrap){
    const userData = readFromStorage("single")
    singleUserWrap.innerHTML= `<div class="row">
    <p class="col-6">title: ${userData.title}</p>
    <p class="col-6">content: ${userData.content}</p>
 </div>
  `
  let allcomments= userData.comments || [];
  allcomments.forEach((comment,index)=>{
    const dediv=createMyOwnEle("div",commentdiv,txt=null, classes="d-flex")
    createMyOwnEle("p",dediv,comment,classes="bg-dark text-white fs-5 w-75  p-2")
    let buttonDelete=createMyOwnEle("button",dediv,"delete",classes="p-2 h-75");
    buttonDelete.addEventListener("click",function(){
        allcomments.splice(index,1); 
        userData.comments= allcomments;
        writeToStorage(userData,key="single") ; 
        location.reload();
    })
  })  
}

 

//add comment
if(addComment){
    addComment.addEventListener("submit",function(e){
        e.preventDefault();
        let userData= readFromStorage("single");
        let users = readFromStorage(key="users");
        let updatedUser = users.find((user)=> user.id==userData.id);
        updatedUser["comments"]= updatedUser.comments || [];
        updatedUser["comments"].push( this.elements["comment"].value);
        writeToStorage(users,key="users");
        writeToStorage(updatedUser,key="single")
        addComment.reset()
        location.reload();
    })
}








