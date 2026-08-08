/* =========================
   TECHNIQUE DEFINITIONS
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
    document.getElementById(
        "trainButton"
    );


const techniqueText =
    document.getElementById(
        "technique"
    );


const techniqueSide =
    document.getElementById(
        "techniqueSide"
    );


const pullCounter =
    document.getElementById(
        "pullCounter"
    );


const sessionProgress =
    document.getElementById(
        "sessionProgress"
    );


const commitmentIndicator =
    document.getElementById(
        "commitmentIndicator"
    );


const historyList =
    document.getElementById(
        "historyList"
    );


const totalPullsElement =
    document.getElementById(
        "totalPulls"
    );


const insidePullsElement =
    document.getElementById(
        "insidePulls"
    );


const outsidePullsElement =
    document.getElementById(
        "outsidePulls"
    );


const averageCommitmentElement =
    document.getElementById(
        "averageCommitment"
    );


const clearHistoryButton =
    document.getElementById(
        "clearHistoryButton"
    );


const settingsToggle =
    document.getElementById(
        "settingsToggle"
    );


const settingsContent =
    document.getElementById(
        "settingsContent"
    );


const settingsChevron =
    document.getElementById(
        "settingsChevron"
    );


const settingsSummary =
    document.getElementById(
        "settingsSummary"
    );


const settingsWarning =
    document.getElementById(
        "settingsWarning"
    );


const avoidRepeatsToggle =
    document.getElementById(
        "avoidRepeatsToggle"
    );


const enableAllTechniques =
    document.getElementById(
        "enableAllTechniques"
    );


const disableAllTechniques =
    document.getElementById(
        "disableAllTechniques"
    );


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

    pool:
        "all",

    sessionLength:
        10,

    avoidRepeats:
        true,

    enabledTechniques:
        [...techniqueOrder]

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
                enabledTechniques:
                    [...techniqueOrder]
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
                saved.enabledTechniques
                .filter(
                    technique =>
                        techniqueOrder
                        .includes(
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

            enabledTechniques:
                [...techniqueOrder]

        };

    }

}


let settings =
    loadSettings();


function saveSettings() {

    localStorage.setItem(

        "armPyramidSettings",

        JSON.stringify(
            settings
        )

    );

}


/* =========================
   SESSION HISTORY
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

    sessionHistory =
        [];

}


/*
    Normalize previous records.

    This also fixes older pulls
    created before commitments
    became fixed.
*/

sessionHistory =
    sessionHistory.map(
        (pull, index) => {

            const fixedCommitment =
                commitmentByTechnique[
                    pull.technique
                ];


            return {

                ...pull,

                number:
                    index + 1,

                commitment:
                    fixedCommitment ??
                    pull.commitment ??
                    0

            };

        }
    );


let pulling =
    false;


let pullNumber =
    sessionHistory.length + 1;


/* =========================
   UTILITIES
========================= */

function wait(ms) {

    return new Promise(
        resolve => {

            setTimeout(
                resolve,
                ms
            );

        }
    );

}


function formatCommitment(
    value
) {

    if (
        value > 0
    ) {

        return `+${value}`;

    }


    return String(
        value
    );

}


function randomItem(
    array
) {

    return array[
        Math.floor(
            Math.random()
            *
            array.length
        )
    ];

}


/* =========================
   CLEAR PYRAMID
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


/* =========================
   ELIGIBLE TECHNIQUES
========================= */

function getEligibleNodes() {

    return nodes.filter(
        node => {

            const technique =
                node.dataset.technique;


            const side =
                node.dataset.side;


            const enabled =
                settings
                .enabledTechniques
                .includes(
                    technique
                );


            if (!enabled) {

                return false;

            }


            if (
                settings.pool ===
                "inside"
            ) {

                return side ===
                    "inside";

            }


            if (
                settings.pool ===
                "outside"
            ) {

                return side ===
                    "outside";

            }


            return true;

        }
    );

}


/* =========================
   SESSION TARGET
========================= */

function isUnlimited() {

    return (
        settings.sessionLength ===
        "unlimited"
    );

}


function isSessionComplete() {

    if (
        isUnlimited()
    ) {

        return false;

    }


    return (
        sessionHistory.length >=
        Number(
            settings.sessionLength
        )
    );

}


/* =========================
   SHOULDER INDICATOR
========================= */

function setCommitment(
    value
) {

    const positions = {

        3: 0,

        2: 16.67,

        1: 33.33,

        0: 50,

        "-1": 66.67,

        "-2": 83.33,

        "-3": 100

    };


    commitmentIndicator
        .style
        .left =
        positions[value]
        +
        "%";


    commitmentIndicator
        .classList
        .remove(
            "inside",
            "outside",
            "neutral"
        );


    if (
        value > 0
    ) {

        commitmentIndicator
            .classList
            .add(
                "inside"
            );

    }

    else if (
        value < 0
    ) {

        commitmentIndicator
            .classList
            .add(
                "outside"
            );

    }

    else {

        commitmentIndicator
            .classList
            .add(
                "neutral"
            );

    }

}


/* =========================
   SAVE SESSION
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
   SESSION PROGRESS
========================= */

function updateSessionProgress() {

    const current =
        sessionHistory.length;


    if (
        isUnlimited()
    ) {

        sessionProgress.textContent =
            `${current} / ∞`;

    }

    else {

        sessionProgress.textContent =
            `${current} / ${settings.sessionLength}`;

    }


    sessionProgress
        .classList
        .toggle(
            "complete",
            isSessionComplete()
        );

}


/* =========================
   BUTTON STATE
========================= */

function updatePullButton() {

    const eligible =
        getEligibleNodes();


    button
        .classList
        .remove(
            "session-complete"
        );


    if (
        eligible.length ===
        0
    ) {

        button.disabled =
            true;


        button.textContent =
            "⚠ SELECT A TECHNIQUE";


        return;

    }


    if (
        isSessionComplete()
    ) {

        button.disabled =
            true;


        button
            .classList
            .add(
                "session-complete"
            );


        button.textContent =
            "✓ SESSION COMPLETE";


        return;

    }


    if (
        pulling
    ) {

        button.disabled =
            true;


        button.textContent =
            "PULLING...";


        return;

    }


    button.disabled =
        false;


    if (
        sessionHistory.length ===
        0
    ) {

        button.innerHTML =
            "⚡ START PULL";

    }

    else {

        button.innerHTML =
            "↻ PULL AGAIN";

    }

}


/* =========================
   SETTINGS UI
========================= */

function updateSettingsUI() {

    poolButtons.forEach(
        poolButton => {

            poolButton
                .classList
                .toggle(
                    "active",
                    poolButton
                    .dataset
                    .pool ===
                    settings.pool
                );

        }
    );


    lengthButtons.forEach(
        lengthButton => {

            const value =
                lengthButton
                .dataset
                .length;


            const matches =
                value ===
                String(
                    settings
                    .sessionLength
                );


            lengthButton
                .classList
                .toggle(
                    "active",
                    matches
                );

        }
    );


    avoidRepeatsToggle.checked =
        settings.avoidRepeats;


    techniqueChips.forEach(
        chip => {

            const technique =
                chip
                .dataset
                .filterTechnique;


            const side =
                chip
                .dataset
                .filterSide;


            const selected =
                settings
                .enabledTechniques
                .includes(
                    technique
                );


            chip
                .classList
                .toggle(
                    "selected",
                    selected
                );


            let outsidePool =
                false;


            if (
                settings.pool ===
                "inside"
            ) {

                outsidePool =
                    side !==
                    "inside";

            }


            if (
                settings.pool ===
                "outside"
            ) {

                outsidePool =
                    side !==
                    "outside";

            }


            chip
                .classList
                .toggle(
                    "pool-muted",
                    outsidePool
                );

        }
    );


    nodes.forEach(
        node => {

            const technique =
                node.dataset.technique;


            const eligible =
                getEligibleNodes()
                .includes(
                    node
                );


            node
                .classList
                .toggle(
                    "filtered-out",
                    !eligible
                );

        }
    );


    const poolName = {

        all:
            "ALL",

        inside:
            "INSIDE",

        outside:
            "OUTSIDE"

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


    const noEligible =
        getEligibleNodes()
        .length ===
        0;


    settingsWarning
        .classList
        .toggle(
            "hidden",
            !noEligible
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


    let average =
        0;


    if (
        total > 0
    ) {

        const sum =
            sessionHistory.reduce(
                (
                    currentTotal,
                    pull
                ) =>
                    currentTotal
                    +
                    pull.commitment,
                0
            );


        average =
            sum /
            total;

    }


    totalPullsElement
        .textContent =
        total;


    insidePullsElement
        .textContent =
        inside;


    outsidePullsElement
        .textContent =
        outside;


    averageCommitmentElement
        .textContent =
        average > 0
        ?
        `+${average.toFixed(1)}`
        :
        average.toFixed(1);

}


/* =========================
   HISTORY
========================= */

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
        [
            ...sessionHistory
        ]
        .reverse()
        .slice(
            0,
            10
        );


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

                            SHOULDER
                            ${formatCommitment(
                                pull.commitment
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

        date:
            new Date()
            .toISOString()

    };


    sessionHistory.push(
        pull
    );


    saveSession();


    renderHistory();

}


/* =========================
   FINAL WINNER
========================= */

function getFinalWinner(
    eligibleNodes
) {

    if (
        !settings
        .avoidRepeats
    ) {

        return randomItem(
            eligibleNodes
        );

    }


    if (
        eligibleNodes.length <=
        1
    ) {

        return eligibleNodes[
            0
        ];

    }


    const lastPull =
        sessionHistory[
            sessionHistory.length -
            1
        ];


    if (
        !lastPull
    ) {

        return randomItem(
            eligibleNodes
        );

    }


    const candidates =
        eligibleNodes.filter(
            node =>
                node.dataset
                .technique !==
                lastPull.technique
        );


    if (
        candidates.length ===
        0
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
        isSessionComplete()
    ) {

        return;

    }


    const eligibleNodes =
        getEligibleNodes();


    if (
        eligibleNodes.length ===
        0
    ) {

        updateSettingsUI();

        return;

    }


    pulling =
        true;


    updatePullButton();


    techniqueText
        .textContent =
        "PULLING...";


    techniqueSide
        .textContent =
        "READING THE TABLE";


    clearNodes();


    setCommitment(
        0
    );


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

        let availableFlashNodes =
            eligibleNodes;


        if (
            eligibleNodes.length >
            1 &&
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


        currentNode
            .classList
            .add(
                "active"
            );


        previousNode =
            currentNode;


        await wait(
            speed
        );

    }


    clearNodes();


    const winner =
        getFinalWinner(
            eligibleNodes
        );


    winner
        .classList
        .add(
            "active",
            "winner"
        );


    const techniqueName =
        winner
            .dataset
            .technique;


    const techniqueCode =
        winner
            .dataset
            .code;


    const side =
        winner
            .dataset
            .side;


    const commitment =
        commitmentByTechnique[
            techniqueName
        ];


    techniqueText
        .textContent =
        techniqueName
        .toUpperCase();


    techniqueSide
        .textContent =
        `${
            side ===
            "inside"
            ?
            "INSIDE GAME"
            :
            "OUTSIDE GAME"
        } • SHOULDER ${formatCommitment(commitment)}`;


    await wait(
        250
    );


    setCommitment(
        commitment
    );


    pullCounter
        .textContent =
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


    pulling =
        false;


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


    if (
        !confirmed
    ) {

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


    techniqueText
        .textContent =
        "READY?";


    techniqueSide
        .textContent =
        "PRESS START TO BEGIN";


    pullCounter
        .textContent =
        "PULL #01";


    renderHistory();


    updateSettingsUI();

}


/* =========================
   SETTINGS EVENTS
========================= */

settingsToggle
    .addEventListener(
        "click",
        () => {

            const collapsed =
                settingsContent
                .classList
                .toggle(
                    "collapsed"
                );


            settingsChevron
                .textContent =
                collapsed
                ?
                "+"
                :
                "−";

        }
    );


poolButtons.forEach(
    poolButton => {

        poolButton
            .addEventListener(
                "click",
                () => {

                    if (
                        pulling
                    ) {

                        return;

                    }


                    settings.pool =
                        poolButton
                        .dataset
                        .pool;


                    saveSettings();


                    updateSettingsUI();

                }
            );

    }
);


lengthButtons.forEach(
    lengthButton => {

        lengthButton
            .addEventListener(
                "click",
                () => {

                    if (
                        pulling
                    ) {

                        return;

                    }


                    const value =
                        lengthButton
                        .dataset
                        .length;


                    settings
                        .sessionLength =
                        value ===
                        "unlimited"
                        ?
                        "unlimited"
                        :
                        Number(
                            value
                        );


                    saveSettings();


                    updateSettingsUI();

                }
            );

    }
);


avoidRepeatsToggle
    .addEventListener(
        "change",
        () => {

            settings
                .avoidRepeats =
                avoidRepeatsToggle
                .checked;


            saveSettings();


            updateSettingsUI();

        }
    );


techniqueChips.forEach(
    chip => {

        chip
            .addEventListener(
                "click",
                () => {

                    if (
                        pulling
                    ) {

                        return;

                    }


                    const technique =
                        chip
                        .dataset
                        .filterTechnique;


                    const enabled =
                        settings
                        .enabledTechniques
                        .includes(
                            technique
                        );


                    if (
                        enabled
                    ) {

                        settings
                            .enabledTechniques =
                            settings
                            .enabledTechniques
                            .filter(
                                item =>
                                    item !==
                                    technique
                            );

                    }

                    else {

                        settings
                            .enabledTechniques
                            .push(
                                technique
                            );

                    }


                    saveSettings();


                    updateSettingsUI();

                }
            );

    }
);


enableAllTechniques
    .addEventListener(
        "click",
        () => {

            if (
                pulling
            ) {

                return;

            }


            settings
                .enabledTechniques =
                [
                    ...techniqueOrder
                ];


            saveSettings();


            updateSettingsUI();

        }
    );


disableAllTechniques
    .addEventListener(
        "click",
        () => {

            if (
                pulling
            ) {

                return;

            }


            settings
                .enabledTechniques =
                [];


            saveSettings();


            updateSettingsUI();

        }
    );


/* =========================
   MAIN EVENTS
========================= */

button
    .addEventListener(
        "click",
        startPull
    );


clearHistoryButton
    .addEventListener(
        "click",
        clearSession
    );


/* =========================
   INITIALIZE
========================= */

saveSession();


renderHistory();


updateSettingsUI();


pullCounter
    .textContent =
    `PULL #${String(
        pullNumber
    ).padStart(
        2,
        "0"
    )}`;


/* =========================
   SERVICE WORKER
========================= */

if (
    "serviceWorker"
    in navigator
) {

    window
        .addEventListener(
            "load",
            () => {

                navigator
                    .serviceWorker
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