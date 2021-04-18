const quizData = [
    {
        question:'What is the best thing you like about me',
        a:'caring',
        b:'attitude',
        c:'flirty',
        d:'all of the above',
        correct:'c'
    },{
        question:'The most romantic place you would want to visit',
        a:'Shimla',
        b:'Manali',
        c:'Goa',
        d:'all of the above',
        correct:'d'
    },{
        question:'What is your favorite color',
        a:'red',
        b:'purple',
        c:'violet',
        d:'none of these',
        correct:'a'
    },{
        question:'Which type of movies do you prefer to watch',
        a:'romantic',
        b:'comedy',
        c:'horror',
        d:'sci-fi',
        correct:'a'
    },{
        question:'What is your favourite dish',
        a:'chhole bhature',
        b:'samosa',
        c:'panipuri',
        d:'none of these',
        correct:'c'
    }

]
let results = [];

const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('btn');
const answerEls = document.querySelectorAll('.answer');
const quiz = document.getElementById('quiz');

let curentQuiz = 0;
let score = 0;

const start_cont = document.getElementById('start-cont');
const st_btn = document.getElementById('start-btn');
st_btn.addEventListener('click',()=>{
    console.log('niru');
    start_cont.style.display = 'none';
    quiz.style.display = 'block';
    loadQuiz();
});
quiz.style.display = 'none';

function getselected() {
    let answer = undefined;
    answerEls.forEach((answerEl)=>{
       if (answerEl.checked) {
            answer =  answerEl.id;
            results.push(answer);
       }
    });
    return answer;
}
function loadQuiz() {
    console.log('start')
    deselectAnswer();
    const currentQuizData = quizData[curentQuiz];
    questionEl.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
    
}
function deselectAnswer() {
    answerEls.forEach((answerEl)=>{
       answerEl.checked = false;
     });
}

submitBtn.addEventListener('click',()=>{
  
    const answer = getselected();
    if (answer) {
        if (answer === quizData[curentQuiz].correct) {
         score++;           
        }
        curentQuiz++;
        if (curentQuiz < quizData.length) {
            loadQuiz();  
        }else{
           quiz.innerHTML = `<h2> Your answerd is...</h2>
                            <ul>
                               <li><h2>1.${results[0]}</h2></li>
                               <li><h2>2.${results[1]}</h2></li>
                               <li><h2>3.${results[2]}</h2></li>
                               <li><h2>4.${results[3]}</h2></li>
                               <li><h2>5.${results[4]}</h2></li>
                            </ul>
           <button onclick="location.reload()">Restart</button>`;
        }
    }  
})


const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const ParticleArray = [];

let hue = 0;



window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

let move = {
    x:5,
    y:canvas.height-5,
}

class Particle{
    constructor(){
        this.x = move.x;//Math.random()*canvas.width;//mouse.x;
        this.y = move.y;//Math.random()*canvas.height;//mouse.y;
        this.size = Math.random()*5 +1;
        this.speedX = Math.random()*3-1.5;
        this.speedY = Math.random()*3-1.5;
        this.color = 'hsl('+hue+',100%,50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }

    }
    draw(){
        
        ctx.fillStyle = this.color;
       
        
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
       
        ctx.fill(); 
    }
}

let velX = 1;
let velY = 1;
  
function init() {
    
    if (move.x > canvas.width || move.x < 0) {
        velX *= -1;
         
    }else if(move.y > canvas.height || move.y < 10){
        velY *= -1;   
    }
    move.x += velX*5;
    move.y -= velY*10;
    for (let i = 0; i < 50; i++) {
        ParticleArray.push(new Particle());
        
    }
}



function handleParticle() {
    for (let i = 0; i < ParticleArray.length; i++) {
        ParticleArray[i].update();
        ParticleArray[i].draw();
        if (ParticleArray[i].size<=0.3) {
            ParticleArray.splice(i,1);
           
            i--;
        }        
    }
}


function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //ctx.fillStyle = 'rgba(0,0,0,0.2)';
    //ctx.fillRect(0,0,canvas.width,canvas.height);
    //drawCircle();
    handleParticle();
    requestAnimationFrame(animate);
    hue+=5;
    init();

}
animate();