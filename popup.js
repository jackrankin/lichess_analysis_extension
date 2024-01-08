
async function exportGame() {
    
    const date = new Date();
    console.log(date.getFullYear(), date.getMonth());
    let currentYear = String(date.getFullYear());
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    const base_url = "https://api.chess.com/pub/player/jackrankin/games/" + `${currentYear}/${currentMonth}`

    const res = await fetch(base_url); 
    let records = await res.json();

    // we have to do some logic to get rid of the extra pgn information that chess.com adds (this is why we hate you chess.com)
    let s = records.games[records.games.length-1].pgn.replace(/\{.*?\}/g, '');
    s = s.replace(/\[.*?\]/g, '');
    s = s.replace(/\s/g, '');
    
    const pgn_url = "https://lichess.org/analysis/pgn/" + s

    open(pgn_url, target="_blank")
}


document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('link');
    link.addEventListener('click', function() {
        exportGame();
    });
});
