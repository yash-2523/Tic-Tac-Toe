const cellElements=document.querySelectorAll('[data-cell]');
let circleTurn=false;
const x_Class='x';
const circle_Class='circle';
let restart=document.getElementById('restart');
let winner=document.getElementById('winner');
let boardClass=document.getElementById('board');
const winning_array=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cellElements.forEach(cell =>{
    cell.addEventListener('click',handleclick,{once : true})
})
restart.addEventListener('click',endgame);





boardClass.classList.add(x_Class);
function handleclick(e){
    const cell=e.target;
    let currentclass = x_Class;
    if(circleTurn){
        currentclass=circle_Class;
    }
    placemark(cell,currentclass);
    console.log(checkwin(currentclass));
    if(checkwin(currentclass)==true)
    {
        let msg=document.getElementById('msg');
        msg.innerText=currentclass.toUpperCase()+" Wins !";
        winner.classList.add("show");
    }
    else{
        let notdraw=false;
        for(let k=0;k<9;k++){
            if(cellElements[k].classList.contains(x_Class) || cellElements[k].classList.contains(circle_Class)){
                notdraw=false;
            }
            else{
                notdraw=true;
                break;
            }
        }
        if(!notdraw){
            let msg=document.getElementById('msg');
            msg.innerText="Draw !";
            winner.classList.add("show");
        }
    }
    swapTurn();
}

function placemark(cell,currentclass) {
    cell.classList.add(currentclass);
}

function swapTurn() {
    circleTurn=!circleTurn;
    if(circleTurn){
        boardClass.classList.remove(x_Class);
        boardClass.classList.add(circle_Class);
    }
    else{
        boardClass.classList.remove(circle_Class);
        boardClass.classList.add(x_Class);
    }
}

function checkwin(currentclass) {
    let wins=false;
    for(let i=0;i<8;i++){
        let ok=true;
        for(let j=0;j<3;j++){
            
            let num=winning_array[i][j];
            if(cellElements[num].classList.contains(currentclass)){
                ok=true;
            }
            else{
                ok=false;
                break;
            }
        }
        if(ok){
            wins=true;
            return wins;
        }
    }
    return wins;
}

function endgame() {
    winner.classList.remove("show");
    cellElements.forEach(cell =>{
        cell.classList.remove(x_Class);
        cell.classList.remove(circle_Class);
        cell.addEventListener('click',handleclick,{once : true})
    })
    circleTurn=false;
    boardClass.classList.remove(x_Class);
    boardClass.classList.remove(circle_Class);
    boardClass.classList.add(x_Class);
}