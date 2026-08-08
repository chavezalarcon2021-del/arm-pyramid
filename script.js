const button =
    document.getElementById("trainButton");

const techniqueText =
    document.getElementById("technique");

const techniqueSide =
    document.getElementById("techniqueSide");

const pullCounter =
    document.getElementById("pullCounter");

const commitmentIndicator =
    document.getElementById("commitmentIndicator");

const historyList =
    document.getElementById("historyList");

const totalPullsElement =
    document.getElementById("totalPulls");

const insidePullsElement =
    document.getElementById("insidePulls");

const outsidePullsElement =
    document.getElementById("outsidePulls");

const averageCommitmentElement =
    document.getElementById("averageCommitment");

const clearHistoryButton =
    document.getElementById("clearHistoryButton");

const nodes =
    Array.from(
        document.querySelectorAll(".technique-node")
    );


/* =========================
   SESSION
========================= */

let pulling = false;

let sessionHistory =
    JSON.parse(
        localStorage.getItem("armPyramidSession")
    ) || [];

let pullNumber =
    sessionHistory.length + 1;


/* =========================
   FIXED SHOULDER COMMITMENT

   +3 = Maximum shoulder commitment
    0 = Neutral
   -3 = Maximum toproll commitment
========================= */

const commitmentByTechnique = {

    "Flop Press": 3,

    "Shoulder Press": 3,

    "Hook & Drive": 2,

    "Hook & Drag": 1,

    "High Hook": 0,

    "Posting Toproll": -1,

    "Sweeping Toproll": -2,

    "Low-Hand Toproll": -2,

    "Open Toproll": -3,

    "King's Move": -3

};


/* =========================
   CLEAR PYRAMID
========================= */

function clearNodes() {

    nodes.forEach(node => {

        node.classList.remove(
            "active",
            "winner"
        );

    });

}


/* =========================
   RANDOM TECHNIQUE
========================= */

function getRandomNode() {

    const randomIndex =
        Math.floor(
            Math.random() * nodes.length
        );

    return nodes[randomIndex];

}


/* =========================
   WAIT
========================= */

function wait(ms) {

    return new Promise(resolve => {

        setTimeout(
            resolve,
            ms
        );

    });

}


/* =========================
   FORMAT COMMITMENT
========================= */

function formatCommitment(value) {

    if (value > 0) {

        return `+${value}`;

    }

    return String(value);

}


/* =========================
   SHOULDER INDICATOR
========================= */

function setCommitment(value) {

    const positions = {

        3: 0,

        2: 16.67,

        1: 33.33,

        0: 50,

        "-1": 66.67,

        "-2": 83.33,

        "-3": 100

    };


    commitmentIndicator.style.left =
        positions[value] + "%";


    commitmentIndicator.classList.remove(
        "inside",
        "outside",
        "neutral"
    );


    if (value > 0) {

        commitmentIndicator
            .classList
            .add("inside");

    }

    else if (value < 0) {

        commitmentIndicator
            .classList
            .add("outside");

    }

    else {

        commitmentIndicator
            .classList
            .add("neutral");

    }

}


/* =========================
   SAVE SESSION
========================= */

function saveSession() {

    localStorage.setItem(
        "armPyramidSession",
        JSON.stringify(sessionHistory)
    );

}


/* =========================
   UPDATE STATISTICS
========================= */

function updateStats() {

    const total =
        sessionHistory.length;


    const inside =
        sessionHistory.filter(
            pull =>
                pull.side === "inside"
        ).length;


    const outside =
        sessionHistory.filter(
            pull =>
                pull.side === "outside"
        ).length;


    let average = 0;


    if (total > 0) {

        const sum =
            sessionHistory.reduce(
                (
                    currentTotal,
                    pull
                ) =>
                    currentTotal +
                    pull.commitment,
                0
            );


        average =
            sum / total;

    }


    totalPullsElement.textContent =
        total;


    insidePullsElement.textContent =
        inside;


    outsidePullsElement.textContent =
        outside;


    if (average > 0) {

        averageCommitmentElement.textContent =
            "+" +
            average.toFixed(1);

    }

    else {

        averageCommitmentElement.textContent =
            average.toFixed(1);

    }

}


/* =========================
   RENDER HISTORY
========================= */

function renderHistory() {

    if (sessionHistory.length === 0) {

        historyList.innerHTML = `

            <div class="history-empty">

                No pulls yet.<br><br>

                Your practice pulls
                will appear here.

            </div>

        `;


        updateStats();

        return;

    }


    const recentPulls =
        [...sessionHistory]
        .reverse()
        .slice(0, 10);


    historyList.innerHTML =
        recentPulls
        .map(pull => {

            let commitmentClass =
                "neutral";


            if (pull.commitment > 0) {

                commitmentClass =
                    "positive";

            }


            if (pull.commitment < 0) {

                commitmentClass =
                    "negative";

            }


            return `

                <div class="history-item">

                    <div class="history-number">

                        #${String(
                            pull.number
                        ).padStart(
                            2,
                            "0"
                        )}

                    </div>


                    <div class="history-technique">

                        <strong>
                            ${pull.technique}
                        </strong>

                        <span>

                            ${
                                pull.side === "inside"
                                ? "INSIDE GAME"
                                : "OUTSIDE GAME"
                            }

                        </span>

                    </div>


                    <div
                        class="
                            history-code
                            ${pull.side}
                        "
                    >

                        ${pull.code}

                    </div>


                    <div
                        class="
                            history-commitment
                            ${commitmentClass}
                        "
                    >

                        SHOULDER
                        ${formatCommitment(
                            pull.commitment
                        )}

                    </div>

                </div>

            `;

        })
        .join("");


    updateStats();

}


/* =========================
   ADD PULL TO HISTORY
========================= */

function addPullToHistory(
    technique,
    code,
    side,
    commitment
) {

    const pull = {

        number:
            pullNumber,

        technique:
            technique,

        code:
            code,

        side:
            side,

        commitment:
            commitment,

        date:
            new Date().toISOString()

    };


    sessionHistory.push(
        pull
    );


    saveSession();


    renderHistory();

}


/* =========================
   PRACTICE PULL
========================= */

async function startPull() {

    if (pulling) {

        return;

    }


    pulling = true;


    button.disabled =
        true;


    button.textContent =
        "PULLING...";


    techniqueText.textContent =
        "PULLING...";


    techniqueSide.textContent =
        "READING THE TABLE";


    clearNodes();


    /*
        Reset shoulder indicator
        before roulette
    */

    setCommitment(0);


    /* =========================
       ROULETTE ANIMATION
    ========================= */

    const rouletteSpeeds = [

        55,
        60,
        65,
        70,
        80,
        90,
        105,
        120,
        140,
        165,
        190,
        225,
        270,
        330

    ];


    let previousNode =
        null;


    for (
        const speed
        of rouletteSpeeds
    ) {

        let currentNode =
            getRandomNode();


        /*
            Prevent same node from
            flashing twice in a row
        */

        while (
            currentNode ===
            previousNode
        ) {

            currentNode =
                getRandomNode();

        }


        clearNodes();


        currentNode
            .classList
            .add("active");


        previousNode =
            currentNode;


        await wait(
            speed
        );

    }


    /* =========================
       FINAL WINNER
    ========================= */

    clearNodes();


    const winner =
        getRandomNode();


    winner
        .classList
        .add(
            "active",
            "winner"
        );


    const techniqueName =
        winner.dataset.technique;


    const techniqueCode =
        winner.dataset.code;


    const side =
        winner.dataset.side;


    /* =========================
       FIXED COMMITMENT

       IMPORTANT:
       There is NO randomness here.
    ========================= */

    const commitment =
        commitmentByTechnique[
            techniqueName
        ];


    /* =========================
       DISPLAY RESULT
    ========================= */

    techniqueText.textContent =
        techniqueName
        .toUpperCase();


    techniqueSide.textContent =
        `${
            side === "inside"
            ? "INSIDE GAME"
            : "OUTSIDE GAME"
        } • SHOULDER ${formatCommitment(commitment)}`;


    /* =========================
       MOVE SHOULDER INDICATOR
    ========================= */

    await wait(
        250
    );


    setCommitment(
        commitment
    );


    /* =========================
       PULL NUMBER
    ========================= */

    pullCounter.textContent =
        `PULL #${String(
            pullNumber
        ).padStart(
            2,
            "0"
        )}`;


    /* =========================
       SAVE RESULT
    ========================= */

    addPullToHistory(
        techniqueName,
        techniqueCode,
        side,
        commitment
    );


    pullNumber++;


    /* =========================
       RESET BUTTON
    ========================= */

    button.innerHTML =
        "↻ PULL AGAIN";


    button.disabled =
        false;


    pulling =
        false;

}


/* =========================
   CLEAR SESSION
========================= */

function clearSession() {

    const confirmed =
        confirm(
            "Clear this practice session?"
        );


    if (!confirmed) {

        return;

    }


    sessionHistory =
        [];


    pullNumber =
        1;


    localStorage.removeItem(
        "armPyramidSession"
    );


    clearNodes();


    setCommitment(
        0
    );


    techniqueText.textContent =
        "READY?";


    techniqueSide.textContent =
        "PRESS START TO BEGIN";


    pullCounter.textContent =
        "PULL #01";


    button.innerHTML =
        "⚡ START PULL";


    renderHistory();

}


/* =========================
   BUTTON EVENTS
========================= */

button.addEventListener(
    "click",
    startPull
);


clearHistoryButton.addEventListener(
    "click",
    clearSession
);


/* =========================
   INITIAL LOAD
========================= */

renderHistory();


pullCounter.textContent =
    `PULL #${String(
        pullNumber
    ).padStart(
        2,
        "0"
    )}`;