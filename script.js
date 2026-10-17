const questions = [
    {
        number: 1,
        text: "학교나 모임에서 위기나 갈등 상황이 생겼을 때, 나의 대처 방식은?",
        options: [
            { text: "앞장서서 사람들을 격려하고 직접 행동으로 나선다.", type: "Y" },
            { text: "차분하게 상황을 분석하고 체계적인 계획을 세운다.", type: "A" }
        ]
    },
    {
        number: 2,
        text: "친구들과 함께 어떤 활동을 기획할 때 내가 가장 중요하게 생각하는 것은?",
        options: [
            { text: "모두의 마음을 하나로 모으는 소통과 화합", type: "K" },
            { text: "목표를 향해 흔들리지 않고 끝까지 완수하는 책임감", type: "U" }
        ]
    },
    {
        number: 3,
        text: "평소 나의 성격이나 주변 사람들이 말하는 나의 장점은?",
        options: [
            { text: "정의감이 투철하고 불의를 보면 참지 못한다.", type: "H" },
            { text: "위기 속에서도 침착하며 결단력이 강하다.", type: "A" }
        ]
    },
    {
        number: 4,
        text: "내가 생각하는 진정한 리더십이란 어떤 모습일까?",
        options: [
            { text: "현장에서 직접 발로 뛰며 대중과 호흡하는 리더십", type: "Y" },
            { text: "전체적인 판을 짜고 역경 속에서도 조직을 이끄는 리더십", type: "K" }
        ]
    }
];

const activists = {
    "Y": {
        name: "유관순 열사",
        desc: "뜨거운 열정과 불굴의 용기를 가진 당신! 3·1운동 당시 맨 앞에서 만세를 외치며 민족의 독립 의지를 전 세계에 알린 유관순 열사와 닮았습니다. 부당한 일에 맞서는 정의감과 타협하지 않는 강인함을 가지고 있습니다.",
        quote: "“내 손톱이 빠져나가고, 내 귀와 코가 잘리고, 내 손과 발이 부서져도 그 고통은 이길 수 있으나 나라를 잃은 고통은 견딜 수가 없습니다.”"
    },
    "A": {
        name: "안중근 의사",
        desc: "철저한 계획과 투철한 대의명분을 중요시하는 당신! 하얼빈 의거를 통해 동양 평화의 큰 뜻을 품고 실천했던 안중근 의사와 닮았습니다. 냉철한 판단력과 나라를 사랑하는 깊은 책임감을 지니고 있습니다.",
        quote: "“나라를 위해 몸을 바침이 군인의 본분이다.”"
    },
    "K": {
        name: "김구 선생",
        desc: "든든한 포용력과 탁월한 리더십으로 사람들을 이끄는 당신! 임시정부의 주석으로서 끝까지 민족의 구심점 역할을 해낸 백범 김구 선생과 닮았습니다. 화합을 중시하며 끈기 있게 목표를 향해 나아갑니다.",
        quote: "“내 소원은 우리나라 대한의 완전한 독립이오.”"
    },
    "U": {
        name: "윤봉길 의사",
        desc: "결단력이 뛰어나고 행동으로 과감하게 실천하는 의지를 가진 당신! 상하이 홍커우 공원 의거로 조국의 독립 불꽃을 다시 지피운 윤봉길 의사와 닮았습니다. 숭고한 정신과 과감한 실행력을 가지고 있습니다.",
        quote: "“사나이는 뜻을 세우면 집을 나가 살아 돌아오지 않는다.”"
    },
    "H": {
        name: "홍범도 장군",
        desc: "현장에서 직접 부딪치며 뛰어난 전략으로 승리를 이끌어낸 당신! 봉오동 전투를 승리로 이끈 독립군의 영웅 홍범도 장군과 닮았습니다. 용감무쌍하며 굳은 의지로 어려움을 헤쳐나갑니다.",
        quote: "“조국의 독립을 위해서라면 내 목숨 아깝지 않다.”"
    }
};

let currentQuestionIndex = 0;
let scores = { Y: 0, A: 0, K: 0, U: 0, H: 0 };

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progress = document.getElementById("progress");

const resultName = document.getElementById("result-name");
const resultDesc = document.getElementById("result-desc");
const resultQuote = document.getElementById("result-quote");

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", resetQuiz);

function startQuiz() {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    currentQuestionIndex = 0;
    scores = { Y: 0, A: 0, K: 0, U: 0, H: 0 };
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const q = questions[currentQuestionIndex];
    questionNumber.textContent = `Q${q.number}.`;
    questionText.textContent = q.text;

    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progress.style.width = `${progressPercent}%`;

    optionsContainer.innerHTML = "";
    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt.text;
        btn.addEventListener("click", () => handleOptionClick(opt.type));
        optionsContainer.appendChild(btn);
    });
}

function handleOptionClick(type) {
    scores[type]++;
    currentQuestionIndex++;
    showQuestion();
}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    let highestType = Object.keys(scores)[0];
    for (let key in scores) {
        if (scores[key] > scores[highestType]) {
            highestType = key;
        }
    }

    const activist = activists[highestType];
    resultName.textContent = activist.name;
    resultDesc.textContent = activist.desc;
    resultQuote.textContent = activist.quote;
}

function resetQuiz() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}
