class AudioController {
    constructor() {
        this.bgMusic = new Audio("../static/asset/audio/BGM.mp3");
        this.GameoverSound = new Audio("../static/asset/audio/Gameover.mp3");
        this.FlipSound = new Audio("../static/asset/audio/Flip.mp3");
        this.MatchSound = new Audio("../static/asset/audio/Match.mp3");
        this.VictorySound = new Audio("../static/asset/audio/Victory.mp3");
    }
    
    playMusic(){
        this.bgMusic.play();
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.5;
    }
    stopMusic(){
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    Flip(){
        this.FlipSound.play();
        this.FlipSound.volume = 0.5;
    }
    Match(){
        this.MatchSound.play();
        this.MatchSound.volume = 0.5;
    }
    Victory(){
        this.stopMusic();
        this.VictorySound.play();
        this.VictorySound.volume = 0.5;
    }
    Gameover(){
        this.stopMusic();
        this.GameoverSound.play();
        this.GameoverSound.volume = 0.5;
    }
}

class CardGameInfo {
    constructor(totalTimes, cards){
        //audio
        this.audioController = new AudioController;
        //timer
        this.timer = totalTimes;
        this.timeRemaining = totalTimes;
        this.htmltimer = document.getElementById('time-remaining');
        this.countDown = false;
        //card
        this.cardsArray = cards;
        this.cardToCheck = null;
        this.busy = true;
        this.matchedCards = [];
        //score
        this.htmlscore = document.getElementById('score');
        this.score = null;
        
    }
    startgame() {
        //time
        this.timeRemaining = this.timer;
        //card
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        //score
        this.score = Number(this.htmlscore.innerText);
        this.score = 0;

        setTimeout(() => {
            //audio
            this.audioController.playMusic();
            //shuffle card
            this.shuffleCard();
            //time
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.htmltimer.innerText = this.timeRemaining;
        this.htmlscore.innerText = this.score;
    }

  hideCards() { 
        this.cardsArray.forEach(card => {
            card.classList.remove("visible");
            card.classList.remove("matched");
        });
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.htmltimer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0){
                this.gameOver();
            }
        }, 1000)
    }

    gameOver() {
        //clear the timer
        clearInterval(this.countDown);
        //play the gameover audio
        this.audioController.Gameover();
        //show the gameover screen
        document.getElementById("game-over-text").classList.add("visible")
    }

    victory() {
        //clear the timer
        clearInterval(this.countDown);
        //play victory audio
        this.audioController.Victory();
        //shoe the victory screen
        document.getElementById("victory-text").classList.add("visible")
    }

    //input the card that user want to flip
    flipCard(card) {
        if(this.canFlipCard(card)){
            //play the flip sound
            this.audioController.Flip();
            //card 
            card.classList.add('visible');
            //if cardToCheck already have one wating for check
            if(this.cardToCheck)
                this.checkForCardMatching(card);
            //otherwise put it into cardToCheck
            else
                this.cardToCheck = card;
        }
    }
    
    canFlipCard(card) {
        //if card is mismatch or the card is already matched or card is waiting for checking
        if(this.busy || this.matchedCards.includes(card) || card === this.cardToCheck)
            return false;
        return true;
    }

    checkForCardMatching(card) { 
        //get the element that user click & check two image
        if(this.getCardType(card) === this.getCardType(this.cardToCheck)){
            this.cardMatch(card, this.cardToCheck);
            //put it in reset
            this.cardToCheck = null;
        }
        else{
            this.cardMisMatch(card, this.cardToCheck);
            //put it in reset
            this.cardToCheck = null;
        }
    }
            

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add("matched");
        card2.classList.add("matched");
        this.audioController.Match();
        //score
        this.score += 10;
        this.htmlscore.innerText = this.score;
        //finish all
        if(this.matchedCards.length=== this.cardsArray.length)
            this.victory();
    }

    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove("visible");
            card2.classList.remove("visible");
            this.busy = false;
        }, 1000)
        console.log("card mismatch")
    }

    getCardType(card) {
        return card.getElementsByClassName("card-value")[0].src;
    }

    shuffleCard() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            //exchange the position
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex;
        }   
    }
}


function ready() {
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("card"));
    let game = new CardGameInfo(100, cards);


    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible')
            game.startgame();
        })
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        })
    })
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
}
else{
    ready();
}

if(finish === true){
    console.log('complete');
}

/*
class gameManager {
    constructor() {
        let overlays = Array.from(document.getElementsByClassName("overlay-text"));
        let cards = Array.from(document.getElementsByClassName("card"));
        this.initial();
    }

    initial() {
        this.overlays.forEach(overlay => {
            overlay.addEventListener('click', () => {
                overlay.classList.remove('visible')
                this.game.startgame();
            })
        });
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                this.game.flipCard(card);
            })
        })
    }
    play() {
        
    }
}
*/

