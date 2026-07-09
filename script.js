
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
    const startbtn = document.getElementById('start');
    const gamestart = document.getElementById('playgame');
    
    

   
    startbtn.addEventListener('click',(event) => {
        event.preventDefault();      
        const whowin = document.getElementById('winning'); 
        const player1input= document.getElementById('player1').value.trim();
        const player2input = document.getElementById('player2').value.trim();

    // 3. The Bouncer: Check if either name is strictly blank
    if (player1input === '' || player2input=== '') {
        // Warn the user
        alert("Please enter a name for both Player 1 and Player 2!");
        
        // This 'return' is the magic word. It stops the function immediately.
        // Nothing below this line will run, meaning the game won't start.
        return;
        }
        createdgrid(3 , player1input , player2input );
        startbtn.style.display = 'none';
        whowin.innerText='';
        gamestart.style.display='none';
    });

  function createplayer(name , marker){
        let move=[];
        return { name , marker ,move 
        };
    }


    function checkwin(player){
        const wincondition = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
        ];

        for(let i=0 ; i<wincondition.length ; i++){
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

    function createdgrid(size , player1 , player2 ){

        const playboard = document.getElementById('boardgame');
        const user1 = createplayer(player1 , 'X')
        const user2 = createplayer(player2 , 'O');
        let currentPlayer = user1;
        let gameover = false;

        playboard.innerHTML='';
 

        const totalSquares = size * size; 
        for (let i = 0; i < totalSquares; i++) {
            const square = document.createElement('div');
            square.classList.add('gametile');
            square.style.width='100px';
            square.style.height=`100px`;
            square.dataset.index = i;
            square.addEventListener('click',(e)=>{
                if (gameover) return;
                if(e.target.textContent !== '')
                return;
                e.target.textContent = currentPlayer.marker;
                const cellIndex = parseInt(e.target.getAttribute('data-index'));
                currentPlayer.move.push(cellIndex);
                console.log(user1.move);
                console.log(user2.move);
               

                if(checkwin(currentPlayer.move)){
                    gameover = true;
                    gamestart.style.display='';
                    ShowEndScreen(currentPlayer.name +' win' ,playboard);
                    console.log(currentPlayer.name + ' win');
                    console.log(user1.move) ;
                    console.log(user2.move) ;
                    return;
                }  

                if(user1.move.length + user2.move.length === totalSquares){
                    gameover = true;
                    gamestart.style.display='';
                    console.log('it is tie');
                    ShowEndScreen('no one win',playboard);
                    return;
                }
                 currentPlayer = currentPlayer === user1 ? user2 : user1;
            })
            playboard.appendChild(square);
        }
    }  

  
       function resetgame( playboard ){
                    playboard.innerHTML='';
                    startbtn.style.display = 'inline-block';
                    gamestart.style.display = 'inline-block';       
                      
    }
          function ShowEndScreen(massage ,playboard){
                    const whowin = document.getElementById('winning'); 
                    const winningtext = document.createElement('p');
                    const playbtn = document.createElement('button');
                    const gameform = document.getElementById('game');
                    whowin.innerHTML='';
                    playbtn.textContent='play again';
                    playbtn.addEventListener('click',()=>{
                        whowin.innerHTML='';
                        whowin.style.display='';
                        gameform.style.display='';
                        resetgame(playboard);
                    });
                    winningtext.textContent = massage;
                    whowin.appendChild(winningtext);
                    whowin.appendChild(playbtn);
                    gameform.style.display='none';
                    
                    
        }
})();