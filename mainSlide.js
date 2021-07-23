let i,j,s="",tot="";
//Add 16 Boxes
s="<div><p></p></div>";
for(i=0;i<16;i++)tot+=s;
document.querySelector(".container-all").innerHTML=tot;
let arr=document.querySelectorAll(".container-all div");
for(i=0;i<16;i++)arr[i].classList.add("boxes");
//Generate 1-16 random Number
const aSet=new Set();
while(aSet.size!=16){
    aSet.add(Math.floor(Math.random()*16)+1);
}
//Assigning Number to each Box
arr=document.querySelectorAll(".container-all div");
i=1;
for(let item of aSet){
    arr[i-1].querySelector("p").textContent=item;
    if(item===16){
        arr[i-1].classList.add("voidSpace");
    }
    i++;
}
//Swap selected block with white block
function swap(block,voidBlock){
    voidBlock.innerHTML=block.innerHTML;
    voidBlock.classList.remove("voidSpace");
    block.classList.add("voidSpace"); 
    block.querySelector("p").innerHTML="";
}
//Function to check adjacency
function sameRow(i,j){
    return (Math.floor(i/4)==Math.floor(j/4));
}

function sameCol(i,j){
    return (Math.abs(i-j)%4==0);
}

function isAdj(block){
    let temp=document.querySelectorAll(".container-all .boxes");
    let a,b;//a->block and b->voidIndex
    for(i=0;i<16;i++){
        if(temp[i].querySelector("p").innerHTML==block.querySelector("p").innerHTML)a=i;
        if(temp[i].classList.contains("voidSpace"))b=i;
    }
    if(sameRow(a,b)||sameCol(a,b)){
        let nxt=(sameRow(a,b)?(b>a?-1:1):b>a?-4:4);
        while(b!=a){
            swap(temp[b+nxt],temp[b]);
            b+=nxt;
        }
    }
    return (sameRow(a,b)||sameCol(a,b));
}

//Final Event Listener
arr=document.querySelectorAll(".container-all .boxes");
for(i=0;i<16;i++){
    arr[i].addEventListener("click",function(){
        let temp=document.querySelector(".voidSpace");
        if(!isAdj(this)){
            document.querySelector("h1").classList.remove("beforeWin");
            setTimeout(function(){
                document.querySelector("h1").classList.add("beforeWin");
            },100);
        }

        //Check Win
        checkWin();
    });
} 
//Check Win Game Position
function checkWin(){
    arr=document.querySelectorAll(".container-all .boxes");
    if(arr[15].classList.contains("voidSpace")){
        for(i=0;i<15;i++){
            if(arr[i].querySelector("p").innerHTML!=i+1)return ;
        }
        document.querySelector(".container-all").classList.add("win-state");
        document.querySelector("h2").classList.remove("beforeWin");
    }
}
//Restart
document.querySelector("button.Refresh").addEventListener("click",function(){
    window.location.reload();//Remember
});