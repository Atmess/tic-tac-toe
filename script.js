
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
    const gamestart = document.getElementById('playgame');
   
    startbtn.addEventListener('click',() => {
        event.preventDefault();
        createdgrid(3);
        startbtn.style.display = 'none';
        gamestart.style.display='none';
    });

    function checkwin(player){
        const wincondition = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
        ];

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

    function createdgrid(size){
    playboard.innerHTML='';
        let user1 = createplayer('alice','X');
        let user2 = createplayer('balmond' , 'O');
        let currentPlayer = user1;

        function resetgame(){
        event.preventDefault();
                    user1.player.length =0; 
                    user2.player.length=0;
                    console.log(user1.player , user2.player);
                    playboard.innerText='';
                    startbtn.style.display = 'inline-block';
                    gamestart.style.display = 'inline-block';
                    currentPlayer=user1;
    }

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
                e.target.textContent = currentPlayer.marker;
                const cellIndex = parseInt(e.target.getAttribute('data-index'));
                if (currentPlayer === user1 ){
                user1.player.push(cellIndex);
                }else {
                    user2.player.push(cellIndex);
                }
                console.log(`Cell ${cellIndex} was clicked!`);
                console.log(user1.player);
                console.log(user2.player);
                currentPlayer = currentPlayer === user1 ? user2 : user1;

                if(checkwin(user1.player)){
                    console.log('player1 win');
                    event.preventDefault();
                    resetgame();
                }  else if(checkwin(user2.player)){
                    console.log('player2 win');
                    event.preventDefault();
                    resetgame();
                }
            })
            playboard.appendChild(square);
        }
    }  

    function createplayer(name , marker){
        let player=[];
        return { name , marker ,player 
        };
    }
   

})();