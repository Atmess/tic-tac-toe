
const getdate= (() => {
                const yearstime = document.getElementById('year');
                const monthtime = document.getElementById('month');
                const daytime = document.getElementById('day');
                const datetime = document.getElementById('date-time');

                yearstime.textContent = new Date().getFullYear(); 
                monthtime.textContent = new Date().toLocaleString('default', { month: 'short' }) ;
                daytime.textContent = new Date().toLocaleString('default', { weekday: 'short' }) ;
                datetime.textContent = new Date().getDate();
})();
const sidebar = (() => {
                const toggleBtn = document.getElementById('sidebarbtn');
                const sidebar = document.getElementById('sidebar');

                toggleBtn.addEventListener('click', function() {
                // Toggle the 'open' class on the sidebar
                sidebar.classList.toggle('open');
                // Listen for a click on the button
                });   

})();
const startgame= (()=>{
    const playboard = document.getElementById('boardgame');
    const startbtn = document.getElementById('start');
    let player1=[];
    let player2=[];
    let currentPlayer = 'X' ;
    const wincondition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];
function checkwin(player){
    for(i=0 ; i<wincondition.length ; i++){
        const condition = wincondition[i];

        let index1= condition[0];
        let index2= condition[1];
        let index3= condition[2];

        if (player.includes(index1)&&
        player.includes(index2)&&
        player.includes(index3)){
            return true;
        };

    } return false;
}

startbtn.addEventListener('click',() => {
        createdgrid(3);
        startbtn.style.display = 'none';
    });
    
    function createdgrid(size){
    playboard.innerHTML='';
        const totalSquares = size * size; 
        for (let i = 0; i < totalSquares; i++) {
            const square = document.createElement('div');
            square.classList.add('gametile');
            square.style.width='100px';
            square.style.height=`100px`;
            square.dataset.index = i;
            square.addEventListener('click',(e)=>{
                if(e.target.textContent !== '')
                return;
                e.target.textContent = currentPlayer;
                const cellIndex = parseInt(e.target.getAttribute('data-index'));
                if (currentPlayer === 'X' ){
                player1.push(cellIndex);
                }else{
                player2.push(cellIndex);
                }
                console.log(`Cell ${cellIndex} was clicked!`);
                console.log(player1);
                console.log(player2);
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

                if(checkwin(player1)){
                    console.log('player1 win');
                    event.preventDefault();
                    player1.length =0; player2.length=0;
                    console.log('Arrays reset:',player1 , player2);
                }  else if(checkwin(player2)){
                    console.log('player2 win');
                    event.preventDefault();
                    player1.length =0; player2.length=0;
                    console.log('Arrays reset:',player1 , player2);
                }
            })
            playboard.appendChild(square);
        }
    }  
})();