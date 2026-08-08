/* =========================
   TECHNIQUES
========================= */

const techniqueOrder = [
    "High Hook",
    "Hook & Drag",
    "Hook & Drive",
    "Shoulder Press",
    "Flop Press",
    "Posting Toproll",
    "Sweeping Toproll",
    "Low-Hand Toproll",
    "Open Toproll",
    "King's Move"
];


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
   DOM
========================= */

const button =
    document.getElementById("trainButton");

const techniqueText =
    document.getElementById("technique");

const techniqueSide =
    document.getElementById("techniqueSide");

const pullCounter =
    document.getElementById("pullCounter");

const sessionProgress =
    document.getElementById("sessionProgress");

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

const recordValueElement =
    document.getElementById("recordValue");

const winRateElement =
    document.getElementById("winRate");

const clearHistoryButton =
    document.getElementById("clearHistoryButton");

const settingsToggle =
    document.getElementById("settingsToggle");

const settingsContent =
    document.getElementById("settingsContent");

const settingsChevron =
    document.getElementById("settingsChevron");

const settingsSummary =
    document.getElementById("settingsSummary");

const settingsWarning =
    document.getElementById("settingsWarning");

const avoidRepeatsToggle =
    document.getElementById("avoidRepeatsToggle");

const enableAllTechniques =
    document.getElementById("enableAllTechniques");

const disableAllTechniques =
    document.getElementById("disableAllTechniques");


/* OUTCOME */

const outcomePanel =
    document.getElementById("outcomePanel");

const winButton =
    document.getElementById("winButton");

const lossButton =
    document.getElementById("lossButton");

const skipButton =
    document.getElementById("skipButton");


const nodes =
    Array.from(
        document.querySelectorAll(
            ".technique-node"
        )
    );

const poolButtons =
    Array.from(
        document.querySelectorAll(
            ".pool-option"
        )
    );

const lengthButtons =
    Array.from(
        document.querySelectorAll(
            ".length-option"
        )
    );

const techniqueChips =
    Array.from(
        document.querySelectorAll(
            ".technique-chip"
        )
    );


/* =========================
   SETTINGS
========================= */

const defaultSettings = {
    pool: "all",
    sessionLength: 10,
    avoidRepeats: true,
    enabledTechniques: [...techniqueOrder]
};


function loadSettings() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    "armPyramidSettings"
                )
            );


        if (!saved) {

            return {
                ...defaultSettings,
                enabledTechniques: [
                    ...techniqueOrder
                ]
            };

        }


        return {
            pool:
                saved.pool ||
                "all",

            sessionLength:
                saved.sessionLength ??
                10,

            avoidRepeats:
                saved.avoidRepeats ??
                true,

            enabledTechniques:
                Array.isArray(
                    saved.enabledTechniques
                )
                ?
                saved.enabledTechniques.filter(
                    technique =>
                        techniqueOrder.includes(
                            technique
                        )
                )
                :
                [...techniqueOrder]
        };

    }

    catch {

        return {
            ...defaultSettings,
            enabledTechniques: [
                ...techniqueOrder
            ]
        };

    }

}


let settings =
    loadSettings();


function saveSettings() {

    localStorage.setItem(
        "armPyramidSettings",
        JSON.stringify(settings)
    );

}


/* =========================
   HISTORY
========================= */

let sessionHistory = [];


try {

    sessionHistory =
        JSON.parse(
            localStorage.getItem(
                "armPyramidSession"
            )
        ) || [];

}

catch {

    sessionHistory = [];

}


/*
    OLD PULLS:
    If they don't have a win/loss result,
    they become "unrated".

    NEW PULL:
    Starts with result = null until
    WIN / LOSS / SKIP is selected.
*/

sessionHistory =
    sessionHistory.map(
        (pull, index) => {

            const fixedCommitment =
                commitmentByTechnique[
                    pull.technique
                ];


            let result =
                pull.result;


            if (
                result !== "win" &&
                result !== "loss" &&
                result !== "skip"
            ) {

                result =
                    "unrated";

            }


            return {
                ...pull,

                number:
                    index + 1,

                commitment:
                    fixedCommitment ??
                    pull.commitment ??
                    0,

                result:
                    result
            };

        }
    );


let pulling = false;

let pendingPullIndex = null;

let pullNumber =
    sessionHistory.length + 1;


/* =========================
   UTILITIES
========================= */

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}


function randomItem(array) {

    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];

}


function formatCommitment(value) {

    if (value > 0) {

        return `+${value}`;

    }

    return String(value);

}


/* =========================
   SAVE
========================= */

function saveSession() {

    localStorage.setItem(
        "armPyramidSession",
        JSON.stringify(
            sessionHistory
        )
    );

}


/* =========================
   NODES
========================= */

function clearNodes() {

    nodes.forEach(
        node => {

            node.classList.remove(
                "active",
                "winner"
            );

        }
    );

}


function highlightTechnique(
    techniqueName
) {

    clearNodes();


    const node =
        nodes.find(
            item =>
                item.dataset.technique ===
                techniqueName
        );


    if (node) {

        node.classList.add(
            "active",
            "winner"
        );

    }

}


/* =========================
   ELIGIBLE NODES
========================= */

function getEligibleNodes() {

    return nodes.filter(
        node => {

            const technique =
                node.dataset.technique;

            const side =
                node.dataset.side;


            if (
                !settings.enabledTechniques
                    .includes(technique)
            ) {

                return false;

            }


            if (
                settings.pool ===
                "inside"
            ) {

                return side === "inside";

            }


            if (
                settings.pool ===
                "outside"
            ) {

                return side === "outside";

            }


            return true;

        }
    );

}


/* =========================
   SESSION STATE
========================= */

function isUnlimited() {

    return (
        settings.sessionLength ===
        "unlimited"
    );

}


function hasPendingResult() {

    return (
        pendingPullIndex !== null
    );

}


function isSessionComplete() {

    if (isUnlimited()) {

        return false;

    }


    return (
        sessionHistory.length >=
        Number(settings.sessionLength)
        &&
        !hasPendingResult()
    );

}


/* =========================
   COMMITMENT
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

        commitmentIndicator.classList.add(
            "inside"
        );

    }

    else if (value < 0) {

        commitmentIndicator.classList.add(
            "outside"
        );

    }

    else {

        commitmentIndicator.classList.add(
            "neutral"
        );

    }

}


/* =========================
   SESSION PROGRESS
========================= */

function updateSessionProgress() {

    const current =
        sessionHistory.length;


    if (isUnlimited()) {

        sessionProgress.textContent =
            `${current} / ∞`;

    }

    else {

        sessionProgress.textContent =
            `${current} / ${settings.sessionLength}`;

    }


    sessionProgress.classList.toggle(
        "complete",
        isSessionComplete()
    );

}


/* =========================
   OUTCOME UI
========================= */

function showOutcomePanel() {

    outcomePanel.classList.remove(
        "hidden"
    );

}


function hideOutcomePanel() {

    outcomePanel.classList.add(
        "hidden"
    );

}


/* =========================
   START BUTTON STATE
========================= */

function updatePullButton() {

    const eligible =
        getEligibleNodes();


    button.classList.remove(
        "session-complete",
        "awaiting-result"
    );


    if (
        eligible.length === 0
    ) {

        button.disabled = true;

        button.textContent =
            "⚠ SELECT A TECHNIQUE";

        return;

    }


    if (pulling) {

        button.disabled = true;

        button.textContent =
            "PULLING...";

        return;

    }


    if (hasPendingResult()) {

        button.disabled = true;

        button.classList.add(
            "awaiting-result"
        );

        button.textContent =
            "RATE THIS PULL ↓";

        return;

    }


    if (isSessionComplete()) {

        button.disabled = true;

        button.classList.add(
            "session-complete"
        );

        button.textContent =
            "✓ SESSION COMPLETE";

        return;

    }


    button.disabled = false;


    if (
        sessionHistory.length === 0
    ) {

        button.textContent =
            "⚡ START PULL";

    }

    else {

        button.textContent =
            "↻ PULL AGAIN";

    }

}


/* =========================
   SETTINGS UI
========================= */

function updateSettingsUI() {

    poolButtons.forEach(
        poolButton => {

            poolButton.classList.toggle(
                "active",
                poolButton.dataset.pool ===
                settings.pool
            );

        }
    );


    lengthButtons.forEach(
        lengthButton => {

            const value =
                lengthButton.dataset.length;


            lengthButton.classList.toggle(
                "active",
                value ===
                String(
                    settings.sessionLength
                )
            );

        }
    );


    avoidRepeatsToggle.checked =
        settings.avoidRepeats;


    const eligibleNodes =
        getEligibleNodes();


    techniqueChips.forEach(
        chip => {

            const technique =
                chip.dataset.filterTechnique;

            const side =
                chip.dataset.filterSide;


            chip.classList.toggle(
                "selected",
                settings.enabledTechniques
                    .includes(technique)
            );


            let outsidePool = false;


            if (
                settings.pool === "inside"
            ) {

                outsidePool =
                    side !== "inside";

            }


            if (
                settings.pool === "outside"
            ) {

                outsidePool =
                    side !== "outside";

            }


            chip.classList.toggle(
                "pool-muted",
                outsidePool
            );

        }
    );


    nodes.forEach(
        node => {

            node.classList.toggle(
                "filtered-out",
                !eligibleNodes.includes(
                    node
                )
            );

        }
    );


    const poolName = {
        all: "ALL",
        inside: "INSIDE",
        outside: "OUTSIDE"
    }[
        settings.pool
    ];


    const sessionName =
        isUnlimited()
        ?
        "UNLIMITED"
        :
        `${settings.sessionLength} PULLS`;


    settingsSummary.textContent =
        `${poolName} • ${sessionName}`;


    settingsWarning.classList.toggle(
        "hidden",
        eligibleNodes.length !== 0
    );


    updateSessionProgress();

    updatePullButton();

}


/* =========================
   STATS
========================= */

function updateStats() {

    const total =
        sessionHistory.length;


    const inside =
        sessionHistory.filter(
            pull =>
                pull.side ===
                "inside"
        ).length;


    const outside =
        sessionHistory.filter(
            pull =>
                pull.side ===
                "outside"
        ).length;


    const wins =
        sessionHistory.filter(
            pull =>
                pull.result ===
                "win"
        ).length;


    const losses =
        sessionHistory.filter(
            pull =>
                pull.result ===
                "loss"
        ).length;


    const ratedPulls =
        wins + losses;


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


    let winRateText = "—";


    if (ratedPulls > 0) {

        const winRate =
            (
                wins /
                ratedPulls
            ) *
            100;


        winRateText =
            `${Math.round(winRate)}%`;

    }


    totalPullsElement.textContent =
        total;


    insidePullsElement.textContent =
        inside;


    outsidePullsElement.textContent =
        outside;


    recordValueElement.textContent =
        `${wins}W–${losses}L`;


    winRateElement.textContent =
        winRateText;


    averageCommitmentElement.textContent =
        average > 0
        ?
        `+${average.toFixed(1)}`
        :
        average.toFixed(1);

}


/* =========================
   HISTORY
========================= */

function getResultLabel(result) {

    if (result === "win") {

        return "✓ WIN";

    }


    if (result === "loss") {

        return "✕ LOSS";

    }


    if (result === "skip") {

        return "SKIP";

    }


    return "UNRATED";

}


function renderHistory() {

    if (
        sessionHistory.length ===
        0
    ) {

        historyList.innerHTML = `

            <div class="history-empty">

                No pulls yet.<br><br>

                Your practice pulls
                will appear here.

            </div>

        `;


        updateStats();

        updateSessionProgress();

        updatePullButton();

        return;

    }


    const recentPulls =
        [...sessionHistory]
        .reverse()
        .slice(0,10);


    historyList.innerHTML =
        recentPulls
        .map(
            pull => {

                let commitmentClass =
                    "neutral";


                if (
                    pull.commitment > 0
                ) {

                    commitmentClass =
                        "positive";

                }


                if (
                    pull.commitment < 0
                ) {

                    commitmentClass =
                        "negative";

                }


                const resultClass =
                    pull.result === null
                    ?
                    "unrated"
                    :
                    pull.result;


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
                                    pull.side ===
                                    "inside"
                                    ?
                                    "INSIDE GAME"
                                    :
                                    "OUTSIDE GAME"
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
                            ${formatCommitment(
                                pull.commitment
                            )}
                        </div>


                        <div
                            class="
                                history-result
                                ${resultClass}
                            "
                        >
                            ${getResultLabel(
                                pull.result
                            )}
                        </div>

                    </div>

                `;

            }
        )
        .join("");


    updateStats();

    updateSessionProgress();

    updatePullButton();

}


/* =========================
   ADD PULL
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

        result:
            null,

        date:
            new Date()
            .toISOString()

    };


    sessionHistory.push(
        pull
    );


    pendingPullIndex =
        sessionHistory.length - 1;


    saveSession();

    renderHistory();

    showOutcomePanel();

}


/* =========================
   RATE PULL
========================= */

function rateCurrentPull(
    result
) {

    if (
        pendingPullIndex === null
    ) {

        return;

    }


    const pull =
        sessionHistory[
            pendingPullIndex
        ];


    if (!pull) {

        return;

    }


    pull.result =
        result;


    pendingPullIndex =
        null;


    saveSession();

    hideOutcomePanel();

    renderHistory();

    updatePullButton();

}


/* =========================
   WINNER
========================= */

function getFinalWinner(
    eligibleNodes
) {

    if (
        !settings.avoidRepeats
    ) {

        return randomItem(
            eligibleNodes
        );

    }


    if (
        eligibleNodes.length <= 1
    ) {

        return eligibleNodes[0];

    }


    const lastPull =
        sessionHistory[
            sessionHistory.length - 1
        ];


    if (!lastPull) {

        return randomItem(
            eligibleNodes
        );

    }


    const candidates =
        eligibleNodes.filter(
            node =>
                node.dataset.technique !==
                lastPull.technique
        );


    if (
        candidates.length === 0
    ) {

        return randomItem(
            eligibleNodes
        );

    }


    return randomItem(
        candidates
    );

}


/* =========================
   START PULL
========================= */

async function startPull() {

    if (
        pulling ||
        hasPendingResult() ||
        isSessionComplete()
    ) {

        return;

    }


    const eligibleNodes =
        getEligibleNodes();


    if (
        eligibleNodes.length === 0
    ) {

        updateSettingsUI();

        return;

    }


    pulling = true;

    hideOutcomePanel();

    updatePullButton();


    techniqueText.textContent =
        "PULLING...";


    techniqueSide.textContent =
        "READING THE TABLE";


    clearNodes();

    setCommitment(0);


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


    let previousNode = null;


    for (
        const speed
        of rouletteSpeeds
    ) {

        let availableFlashNodes =
            eligibleNodes;


        if (
            eligibleNodes.length > 1 &&
            previousNode
        ) {

            availableFlashNodes =
                eligibleNodes.filter(
                    node =>
                        node !==
                        previousNode
                );

        }


        const currentNode =
            randomItem(
                availableFlashNodes
            );


        clearNodes();


        currentNode.classList.add(
            "active"
        );


        previousNode =
            currentNode;


        await wait(speed);

    }


    clearNodes();


    const winner =
        getFinalWinner(
            eligibleNodes
        );


    winner.classList.add(
        "active",
        "winner"
    );


    const techniqueName =
        winner.dataset.technique;


    const techniqueCode =
        winner.dataset.code;


    const side =
        winner.dataset.side;


    const commitment =
        commitmentByTechnique[
            techniqueName
        ];


    techniqueText.textContent =
        techniqueName.toUpperCase();


    techniqueSide.textContent =
        `${
            side === "inside"
            ?
            "INSIDE GAME"
            :
            "OUTSIDE GAME"
        } • SHOULDER ${formatCommitment(commitment)}`;


    await wait(250);


    setCommitment(
        commitment
    );


    pullCounter.textContent =
        `PULL #${String(
            pullNumber
        ).padStart(
            2,
            "0"
        )}`;


    addPullToHistory(
        techniqueName,
        techniqueCode,
        side,
        commitment
    );


    pullNumber++;

    pulling = false;

    updatePullButton();

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


    sessionHistory = [];

    pendingPullIndex = null;

    pullNumber = 1;


    localStorage.removeItem(
        "armPyramidSession"
    );


    clearNodes();

    hideOutcomePanel();

    setCommitment(0);


    techniqueText.textContent =
        "READY?";


    techniqueSide.textContent =
        "PRESS START TO BEGIN";


    pullCounter.textContent =
        "PULL #01";


    renderHistory();

    updateSettingsUI();

}


/* =========================
   SETTINGS EVENTS
========================= */

settingsToggle.addEventListener(
    "click",
    () => {

        const collapsed =
            settingsContent.classList.toggle(
                "collapsed"
            );


        settingsChevron.textContent =
            collapsed
            ?
            "+"
            :
            "−";

    }
);


poolButtons.forEach(
    poolButton => {

        poolButton.addEventListener(
            "click",
            () => {

                if (
                    pulling ||
                    hasPendingResult()
                ) {

                    return;

                }


                settings.pool =
                    poolButton.dataset.pool;


                saveSettings();

                updateSettingsUI();

            }
        );

    }
);


lengthButtons.forEach(
    lengthButton => {

        lengthButton.addEventListener(
            "click",
            () => {

                if (
                    pulling ||
                    hasPendingResult()
                ) {

                    return;

                }


                const value =
                    lengthButton.dataset.length;


                settings.sessionLength =
                    value === "unlimited"
                    ?
                    "unlimited"
                    :
                    Number(value);


                saveSettings();

                updateSettingsUI();

            }
        );

    }
);


avoidRepeatsToggle.addEventListener(
    "change",
    () => {

        settings.avoidRepeats =
            avoidRepeatsToggle.checked;


        saveSettings();

        updateSettingsUI();

    }
);


techniqueChips.forEach(
    chip => {

        chip.addEventListener(
            "click",
            () => {

                if (
                    pulling ||
                    hasPendingResult()
                ) {

                    return;

                }


                const technique =
                    chip.dataset
                        .filterTechnique;


                const enabled =
                    settings
                    .enabledTechniques
                    .includes(
                        technique
                    );


                if (enabled) {

                    settings.enabledTechniques =
                        settings.enabledTechniques
                        .filter(
                            item =>
                                item !== technique
                        );

                }

                else {

                    settings.enabledTechniques.push(
                        technique
                    );

                }


                saveSettings();

                updateSettingsUI();

            }
        );

    }
);


enableAllTechniques.addEventListener(
    "click",
    () => {

        if (
            pulling ||
            hasPendingResult()
        ) {

            return;

        }


        settings.enabledTechniques =
            [...techniqueOrder];


        saveSettings();

        updateSettingsUI();

    }
);


disableAllTechniques.addEventListener(
    "click",
    () => {

        if (
            pulling ||
            hasPendingResult()
        ) {

            return;

        }


        settings.enabledTechniques =
            [];


        saveSettings();

        updateSettingsUI();

    }
);


/* =========================
   RESULT EVENTS
========================= */

winButton.addEventListener(
    "click",
    () => {

        rateCurrentPull(
            "win"
        );

    }
);


lossButton.addEventListener(
    "click",
    () => {

        rateCurrentPull(
            "loss"
        );

    }
);


skipButton.addEventListener(
    "click",
    () => {

        rateCurrentPull(
            "skip"
        );

    }
);


/* =========================
   MAIN EVENTS
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
   INITIALIZE
========================= */

saveSession();

renderHistory();

updateSettingsUI();


pullCounter.textContent =
    `PULL #${String(
        pullNumber
    ).padStart(
        2,
        "0"
    )}`;


hideOutcomePanel();


/* =========================
   SERVICE WORKER
========================= */

if (
    "serviceWorker"
    in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "./service-worker.js"
                )
                .then(
                    registration => {

                        console.log(
                            "Arm Pyramid PWA ready",
                            registration
                        );

                    }
                )
                .catch(
                    error => {

                        console.error(
                            "Service Worker error:",
                            error
                        );

                    }
                );

        }
    );

}