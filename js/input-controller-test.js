 document.addEventListener("DOMContentLoaded", ()=>{

    let actions_to_bind =
    {
        left: {
            keys:[37,65],
            enabled:false
        },
        
        right: {
            keys: [39,68],
            enabled:false
        },
        
        up: {
            keys:[38,87],
            enabled:false
        },

        down: {
            keys:[40,83],
            enabled:false
        },

        attack: {
            keys:[32,17],
            enabled:false
        }

    }

    
    function randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }


    let player = document.getElementsByClassName("player")[0];
    
    const target = document;
    let cn = new window.InputController(actions_to_bind, target);

    console.log("cn",cn);

    let player_x = 0;
    let player_y = 0;
    rgb = [0,0,0];



    setInterval(()=>{

        if( cn.isActionActive("left") )
        {
            player_x -= 10;
        }
        else if( cn.isActionActive("right") )
        {
            player_x += 10;
        }
        player.style.left = player_x+'px';
       
        if( cn.isActionActive("up") )
        {
            player_y -= 10;
        }else if( cn.isActionActive("down") )
        {
            player_y += 10;
        }
        player.style.top = player_y+'px';

        if( cn.isActionActive("attack"))
        {
            for(let i=0;i<3;i++)
            {
                let rand = randomInteger(0,255);
                if(rand <= 255 && rand>=0)
                rgb[i] = rand;
            }
        }
        player.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` + "";
        
    }, Math.floor(1000/25));
    
});