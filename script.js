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


const techniqueMeta = {

    "High Hook": {
        code: "H1",
        side: "inside"
    },

    "Hook & Drag": {
        code: "H2",
        side: "inside"
    },

    "Hook & Drive": {
        code: "H3",
        side: "inside"
    },

    "Shoulder Press": {
        code: "P1",
        side: "inside"
    },

    "Flop Press": {
        code: "P2",
        side: "inside"
    },

    "Posting Toproll": {
        code: "T1",
        side: "outside"
    },

    "Sweeping Toproll": {
        code: "T2",
        side: "outside"
    },

    "Low-Hand Toproll": {
        code: "T3",
        side: "outside"
    },

    "Open Toproll": {
        code: "T4",
        side: "outside"
    },

    "King's Move": {
        code: "KM",
        side: "outside"
    }

};


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


/* HISTORY */

const historyList =
    document.getElementById(
        "historyList"
    );

const techniquePerformanceList =
    document.getElementById(
        "techniquePerformanceList"
    );


/* STATS */

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

const recordValueElement =
    document.getElementById(
        "recordValue"
    );

const winRateElement =
    document.getElementById(
        "winRate"
    );


/* PERFORMANCE */

const bestTechniqueElement =
    document.getElementById(
        "bestTechnique"
    );

const bestTechniqueDetailElement =
    document.getElementById(
        "bestTechniqueDetail"
    );

const weakestTechniqueElement =
    document.getElementById(
        "weakestTechnique"
    );

const weakestTechniqueDetailElement =
    document.getElementById(
        "weakestTechniqueDetail"
    );

const insideWinRateElement =
    document.getElementById(
        "insideWinRate"
    );

const insideRecordElement =
    document.getElementById(
        "insideRecord"
    );

const outsideWinRateElement =
    document.getElementById(
        "outsideWinRate"
    );

const outsideRecordElement =
    document.getElementById(
        "outsideRecord"
    );


/* SUMMARY */

const sessionSummary =
    document.getElementById(
        "sessionSummary"
    );

const summarySubtitle =
    document.getElementById(
        "summarySubtitle"
    );

const summaryWinRate =
    document.getElementById(
        "summaryWinRate"
    );

const summaryRecord =
    document.getElementById(
        "summaryRecord"
    );

const summaryInside =
    document.getElementById(
        "summaryInside"
    );

const summaryInsideRecord =
    document.getElementById(
        "summaryInsideRecord"
    );

const summaryOutside =
    document.getElementById(
        "summaryOutside"
    );

const summaryOutsideRecord =
    document.getElementById(
        "summaryOutsideRecord"
    );

const summaryCommitment =
    document.getElementById(
        "summaryCommitment"
    );

const summaryBestTechnique =
    document.getElementById(
        "summaryBestTechnique"
    );

const summaryBestDetail =
    document.getElementById(
        "summaryBestDetail"
    );

const summaryWeakestTechnique =
    document.getElementById(
        "summaryWeakestTechnique"
    );

const summaryWeakestDetail =
    document.getElementById(
        "summaryWeakestDetail"
    );

const summaryMostPulled =
    document.getElementById(
        "summaryMostPulled"
    );

const summaryMostPulledDetail =
    document.getElementById(
        "summaryMostPulledDetail"
    );

const summaryTechniqueList =
    document.getElementById(
        "summaryTechniqueList"
    );

const newSessionButton =
    document.getElementById(
        "newSessionButton"
    );


/* SETTINGS */

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


/* OUTCOME */

const outcomePanel =
    document.getElementById(
        "outcomePanel"
    );

const winButton =
    document.getElementById(
        "winButton"
    );

const lossButton =
    document.getElementById(
        "lossButton"
    );

const skipButton =
    document.getElementById(
        "skipButton"
    );


/* HEATMAP */

const heatmapTitle =
    document.getElementById(
        "heatmapTitle"
    );

const heatmapTabs =
    Array.from(
        document.querySelectorAll(
            ".heatmap-tab"
        )
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
        [...techniqueOrder],

    heatmapMode:
        "performance"

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
                saved.enabledTechniques.filter(
                    technique =>
                        techniqueOrder.includes(
                            technique
                        )
                )
                :
                [...techniqueOrder],

            heatmapMode:
                saved.heatmapMode ===
                "frequency"
                ?
                "frequency"
                :
                "performance"

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

    sessionHistory =
        [];

}


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
                result !== null &&
                result !== "win" &&
                result !== "loss" &&
                result !== "skip" &&
                result !== "unrated"
            ) {

                result =
                    "unrated";

            }


            if (
                result === undefined
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


let pulling =
    false;


let pendingPullIndex =
    null;


for (
    let i =
        sessionHistory.length - 1;

    i >= 0;

    i--
) {

    if (
        sessionHistory[i].result ===
        null
    ) {

        pendingPullIndex =
            i;

        break;

    }

}


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

    if (
        value > 0
    ) {

        return `+${value}`;

    }


    return String(
        value
    );

}


function formatRate(rate) {

    if (
        rate === null
    ) {

        return "—";

    }


    return `${Math.round(rate)}%`;

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
   NODE STATES
========================= */

function clearActiveNodes() {

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

    clearActiveNodes();


    const node =
        nodes.find(
            item =>
                item.dataset.technique ===
                techniqueName
        );


    if (
        node
    ) {

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
                !settings
                .enabledTechniques
                .includes(
                    technique
                )
            ) {

                return false;

            }


            if (
                settings.pool ===
                "inside"
            ) {

                return (
                    side ===
                    "inside"
                );

            }


            if (
                settings.pool ===
                "outside"
            ) {

                return (
                    side ===
                    "outside"
                );

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
        pendingPullIndex !==
        null
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
        &&
        !hasPendingResult()
    );

}


/* =========================
   COMMITMENT
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
   METRICS
========================= */

function getTechniqueMetrics(
    techniqueName
) {

    const pulls =
        sessionHistory.filter(
            pull =>
                pull.technique ===
                techniqueName
        );


    const wins =
        pulls.filter(
            pull =>
                pull.result ===
                "win"
        ).length;


    const losses =
        pulls.filter(
            pull =>
                pull.result ===
                "loss"
        ).length;


    const rated =
        wins +
        losses;


    const rate =
        rated > 0
        ?
        (
            wins /
            rated
        ) * 100
        :
        null;


    return {

        technique:
            techniqueName,

        count:
            pulls.length,

        wins:
            wins,

        losses:
            losses,

        rated:
            rated,

        rate:
            rate,

        code:
            techniqueMeta[
                techniqueName
            ].code,

        side:
            techniqueMeta[
                techniqueName
            ].side

    };

}


function getSideMetrics(side) {

    const pulls =
        sessionHistory.filter(
            pull =>
                pull.side ===
                side
        );


    const wins =
        pulls.filter(
            pull =>
                pull.result ===
                "win"
        ).length;


    const losses =
        pulls.filter(
            pull =>
                pull.result ===
                "loss"
        ).length;


    const rated =
        wins +
        losses;


    const rate =
        rated > 0
        ?
        (
            wins /
            rated
        ) * 100
        :
        null;


    return {

        count:
            pulls.length,

        wins,
        losses,
        rated,
        rate

    };

}


function getOverallMetrics() {

    const total =
        sessionHistory.length;


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


    const rated =
        wins +
        losses;


    const rate =
        rated > 0
        ?
        (
            wins /
            rated
        ) * 100
        :
        null;


    let averageCommitment =
        0;


    if (
        total > 0
    ) {

        averageCommitment =
            sessionHistory.reduce(
                (sum, pull) =>
                    sum +
                    pull.commitment,
                0
            ) /
            total;

    }


    return {

        total,
        wins,
        losses,
        rated,
        rate,
        averageCommitment

    };

}


/* =========================
   BEST / WEAKEST
========================= */

function getPerformanceExtremes() {

    const metrics =
        techniqueOrder
        .map(
            getTechniqueMetrics
        )
        .filter(
            metric =>
                metric.rated > 0
        );


    if (
        metrics.length ===
        0
    ) {

        return {

            best:
                null,

            weakest:
                null

        };

    }


    const best =
        [...metrics]
        .sort(
            (a,b) => {

                if (
                    b.rate !==
                    a.rate
                ) {

                    return (
                        b.rate -
                        a.rate
                    );

                }


                return (
                    b.rated -
                    a.rated
                );

            }
        )[0];


    const weakest =
        [...metrics]
        .sort(
            (a,b) => {

                if (
                    a.rate !==
                    b.rate
                ) {

                    return (
                        a.rate -
                        b.rate
                    );

                }


                return (
                    b.rated -
                    a.rated
                );

            }
        )[0];


    return {

        best,
        weakest

    };

}


/* =========================
   HEATMAP
========================= */

function updateHeatmap() {

    const allMetrics =
        techniqueOrder.map(
            getTechniqueMetrics
        );


    const maxFrequency =
        Math.max(
            0,
            ...allMetrics.map(
                metric =>
                    metric.count
            )
        );


    nodes.forEach(
        node => {

            const metric =
                getTechniqueMetrics(
                    node.dataset.technique
                );


            let intensity =
                0;


            if (
                settings.heatmapMode ===
                "frequency"
            ) {

                if (
                    maxFrequency > 0
                ) {

                    intensity =
                        metric.count /
                        maxFrequency;

                }

            }

            else {

                if (
                    metric.rate !==
                    null
                ) {

                    intensity =
                        metric.rate /
                        100;

                }

            }


            if (
                intensity <= 0
            ) {

                node.classList.remove(
                    "heatmap-active"
                );


                node.style.removeProperty(
                    "--heat-alpha"
                );


                node.style.removeProperty(
                    "--heat-scale"
                );


                return;

            }


            const alpha =
                0.18 +
                intensity *
                0.72;


            const scale =
                1 +
                intensity *
                0.16;


            node.classList.add(
                "heatmap-active"
            );


            node.style.setProperty(
                "--heat-alpha",
                alpha.toFixed(2)
            );


            node.style.setProperty(
                "--heat-scale",
                scale.toFixed(2)
            );

        }
    );


    heatmapTabs.forEach(
        tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.heatmapMode ===
                settings.heatmapMode
            );

        }
    );


    heatmapTitle.textContent =
        settings.heatmapMode ===
        "performance"
        ?
        "PERFORMANCE"
        :
        "FREQUENCY";

}


/* =========================
   PROGRESS
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


    sessionProgress.classList.toggle(
        "complete",
        isSessionComplete()
    );

}


/* =========================
   OUTCOME
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
   BUTTON STATE
========================= */

function updatePullButton() {

    const eligible =
        getEligibleNodes();


    button.classList.remove(
        "session-complete",
        "awaiting-result"
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
        pulling
    ) {

        button.disabled =
            true;


        button.textContent =
            "PULLING...";


        return;

    }


    if (
        hasPendingResult()
    ) {

        button.disabled =
            true;


        button.classList.add(
            "awaiting-result"
        );


        button.textContent =
            "RATE THIS PULL ↓";


        return;

    }


    if (
        isSessionComplete()
    ) {

        button.disabled =
            true;


        button.classList.add(
            "session-complete"
        );


        button.textContent =
            "✓ SESSION COMPLETE";


        return;

    }


    button.disabled =
        false;


    button.textContent =
        sessionHistory.length ===
        0
        ?
        "⚡ START PULL"
        :
        "↻ PULL AGAIN";

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

            lengthButton.classList.toggle(
                "active",
                lengthButton.dataset.length ===
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
                settings.enabledTechniques.includes(
                    technique
                )
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


    settingsWarning.classList.toggle(
        "hidden",
        eligibleNodes.length !==
        0
    );


    updateSessionProgress();

    updatePullButton();

}


/* =========================
   STATS
========================= */

function updateStats() {

    const overall =
        getOverallMetrics();


    const inside =
        getSideMetrics(
            "inside"
        );


    const outside =
        getSideMetrics(
            "outside"
        );


    totalPullsElement.textContent =
        overall.total;


    insidePullsElement.textContent =
        inside.count;


    outsidePullsElement.textContent =
        outside.count;


    recordValueElement.textContent =
        `${overall.wins}W–${overall.losses}L`;


    winRateElement.textContent =
        formatRate(
            overall.rate
        );


    averageCommitmentElement.textContent =
        overall.averageCommitment > 0
        ?
        `+${overall.averageCommitment.toFixed(1)}`
        :
        overall.averageCommitment.toFixed(1);

}


/* =========================
   HIGHLIGHTS
========================= */

function updatePerformanceHighlights() {

    const {
        best,
        weakest
    } =
        getPerformanceExtremes();


    if (
        best
    ) {

        bestTechniqueElement.textContent =
            `${best.code} · ${best.technique}`;


        bestTechniqueDetailElement.textContent =
            `${best.wins}W–${best.losses}L · ${Math.round(best.rate)}%`;

    }

    else {

        bestTechniqueElement.textContent =
            "—";


        bestTechniqueDetailElement.textContent =
            "NO RATED PULLS";

    }


    if (
        weakest
    ) {

        weakestTechniqueElement.textContent =
            `${weakest.code} · ${weakest.technique}`;


        weakestTechniqueDetailElement.textContent =
            `${weakest.wins}W–${weakest.losses}L · ${Math.round(weakest.rate)}%`;

    }

    else {

        weakestTechniqueElement.textContent =
            "—";


        weakestTechniqueDetailElement.textContent =
            "NO RATED PULLS";

    }


    const inside =
        getSideMetrics(
            "inside"
        );


    const outside =
        getSideMetrics(
            "outside"
        );


    insideWinRateElement.textContent =
        formatRate(
            inside.rate
        );


    insideRecordElement.textContent =
        `${inside.wins}W–${inside.losses}L`;


    outsideWinRateElement.textContent =
        formatRate(
            outside.rate
        );


    outsideRecordElement.textContent =
        `${outside.wins}W–${outside.losses}L`;

}


/* =========================
   TECHNIQUE BREAKDOWN
========================= */

function renderTechniquePerformance() {

    techniquePerformanceList.innerHTML =
        techniqueOrder
        .map(
            techniqueName => {

                const metric =
                    getTechniqueMetrics(
                        techniqueName
                    );


                const width =
                    metric.rate ===
                    null
                    ?
                    0
                    :
                    metric.rate;


                return `

                    <div class="technique-performance-row">

                        <div
                            class="
                                performance-code
                                ${metric.side}
                            "
                        >
                            ${metric.code}
                        </div>


                        <div class="performance-name">

                            <strong>
                                ${metric.technique}
                            </strong>

                            <span>
                                ${metric.count} PULL${metric.count === 1 ? "" : "S"}
                                ·
                                ${metric.wins}W–${metric.losses}L
                            </span>

                        </div>


                        <div class="performance-bar-area">

                            <div class="performance-bar">

                                <div
                                    class="
                                        performance-bar-fill
                                        ${metric.side}
                                    "
                                    style="
                                        width:${width}%;
                                    "
                                ></div>

                            </div>

                            <div class="performance-bar-label">

                                ${
                                    metric.rated > 0
                                    ?
                                    `${metric.rated} RATED`
                                    :
                                    "NO RATED PULLS"
                                }

                            </div>

                        </div>


                        <div
                            class="
                                performance-rate
                                ${metric.rate === null ? "no-data" : ""}
                            "
                        >
                            ${formatRate(metric.rate)}
                        </div>

                    </div>

                `;

            }
        )
        .join("");

}


/* =========================
   SESSION SUMMARY
========================= */

function renderSessionSummary() {

    if (
        !isSessionComplete()
    ) {

        sessionSummary.classList.add(
            "hidden"
        );


        return;

    }


    const overall =
        getOverallMetrics();


    const inside =
        getSideMetrics(
            "inside"
        );


    const outside =
        getSideMetrics(
            "outside"
        );


    const {
        best,
        weakest
    } =
        getPerformanceExtremes();


    const techniqueMetrics =
        techniqueOrder.map(
            getTechniqueMetrics
        );


    const mostPulled =
        [...techniqueMetrics]
        .sort(
            (a,b) =>
                b.count -
                a.count
        )[0];


    summarySubtitle.textContent =
        `${overall.total} pulls completed`;


    summaryWinRate.textContent =
        formatRate(
            overall.rate
        );


    summaryRecord.textContent =
        `${overall.wins}W–${overall.losses}L`;


    summaryInside.textContent =
        formatRate(
            inside.rate
        );


    summaryInsideRecord.textContent =
        `${inside.wins}W–${inside.losses}L`;


    summaryOutside.textContent =
        formatRate(
            outside.rate
        );


    summaryOutsideRecord.textContent =
        `${outside.wins}W–${outside.losses}L`;


    summaryCommitment.textContent =
        overall.averageCommitment > 0
        ?
        `+${overall.averageCommitment.toFixed(1)}`
        :
        overall.averageCommitment.toFixed(1);


    if (
        best
    ) {

        summaryBestTechnique.textContent =
            `${best.code} · ${best.technique}`;


        summaryBestDetail.textContent =
            `${best.wins}W–${best.losses}L · ${Math.round(best.rate)}% WIN RATE`;

    }

    else {

        summaryBestTechnique.textContent =
            "—";


        summaryBestDetail.textContent =
            "NO RATED PULLS";

    }


    if (
        weakest
    ) {

        summaryWeakestTechnique.textContent =
            `${weakest.code} · ${weakest.technique}`;


        summaryWeakestDetail.textContent =
            `${weakest.wins}W–${weakest.losses}L · ${Math.round(weakest.rate)}% WIN RATE`;

    }

    else {

        summaryWeakestTechnique.textContent =
            "—";


        summaryWeakestDetail.textContent =
            "NO RATED PULLS";

    }


    if (
        mostPulled &&
        mostPulled.count > 0
    ) {

        const percentage =
            (
                mostPulled.count /
                overall.total
            ) *
            100;


        summaryMostPulled.textContent =
            `${mostPulled.code} · ${mostPulled.technique}`;


        summaryMostPulledDetail.textContent =
            `${mostPulled.count} PULL${mostPulled.count === 1 ? "" : "S"} · ${Math.round(percentage)}% OF SESSION`;

    }

    else {

        summaryMostPulled.textContent =
            "—";


        summaryMostPulledDetail.textContent =
            "NO DATA";

    }


    const maxCount =
        Math.max(
            1,
            ...techniqueMetrics.map(
                metric =>
                    metric.count
            )
        );


    summaryTechniqueList.innerHTML =
        techniqueMetrics
        .map(
            metric => {

                const percent =
                    overall.total > 0
                    ?
                    (
                        metric.count /
                        overall.total
                    ) *
                    100
                    :
                    0;


                const barWidth =
                    (
                        metric.count /
                        maxCount
                    ) *
                    100;


                return `

                    <div class="summary-technique-row">

                        <div
                            class="
                                summary-technique-code
                                ${metric.side}
                            "
                        >
                            ${metric.code}
                        </div>


                        <div class="summary-technique-name">
                            ${metric.technique}
                        </div>


                        <div class="summary-frequency-track">

                            <div
                                class="
                                    summary-frequency-fill
                                    ${metric.side}
                                "
                                style="
                                    width:${barWidth}%;
                                "
                            ></div>

                        </div>


                        <div class="summary-technique-percent">
                            ${Math.round(percent)}%
                        </div>

                    </div>

                `;

            }
        )
        .join("");


    sessionSummary.classList.remove(
        "hidden"
    );

}


/* =========================
   HISTORY
========================= */

function getResultLabel(
    result
) {

    if (
        result ===
        "win"
    ) {

        return "✓ WIN";

    }


    if (
        result ===
        "loss"
    ) {

        return "✕ LOSS";

    }


    if (
        result ===
        "skip"
    ) {

        return "SKIP";

    }


    if (
        result ===
        null
    ) {

        return "RATE";

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

    }

    else {

        const recentPulls =
            [...sessionHistory]
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


                    const resultClass =
                        pull.result ===
                        null
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

    }


    updateStats();

    updatePerformanceHighlights();

    renderTechniquePerformance();

    updateHeatmap();

    updateSessionProgress();

    updatePullButton();

    renderSessionSummary();

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
        sessionHistory.length -
        1;


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
        pendingPullIndex ===
        null
    ) {

        return;

    }


    const pull =
        sessionHistory[
            pendingPullIndex
        ];


    if (
        !pull
    ) {

        return;

    }


    pull.result =
        result;


    pendingPullIndex =
        null;


    saveSession();

    hideOutcomePanel();

    renderHistory();


    if (
        isSessionComplete()
    ) {

        setTimeout(
            () => {

                sessionSummary.scrollIntoView({
                    behavior:
                        "smooth",

                    block:
                        "start"
                });

            },
            250
        );

    }

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
                node.dataset.technique !==
                lastPull.technique
        );


    return (
        candidates.length > 0
        ?
        randomItem(
            candidates
        )
        :
        randomItem(
            eligibleNodes
        )
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
        eligibleNodes.length ===
        0
    ) {

        updateSettingsUI();

        return;

    }


    pulling =
        true;


    hideOutcomePanel();

    updatePullButton();


    techniqueText.textContent =
        "PULLING...";


    techniqueSide.textContent =
        "READING THE TABLE";


    clearActiveNodes();

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


        clearActiveNodes();


        currentNode.classList.add(
            "active"
        );


        previousNode =
            currentNode;


        await wait(
            speed
        );

    }


    clearActiveNodes();


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


    pulling =
        false;


    updatePullButton();

}


/* =========================
   RESET SESSION
========================= */

function resetSession() {

    sessionHistory =
        [];


    pendingPullIndex =
        null;


    pullNumber =
        1;


    localStorage.removeItem(
        "armPyramidSession"
    );


    clearActiveNodes();

    hideOutcomePanel();

    sessionSummary.classList.add(
        "hidden"
    );


    setCommitment(
        0
    );


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


    resetSession();

}


/* =========================
   NEW SESSION
========================= */

function startNewSession() {

    resetSession();


    window.scrollTo({
        top:
            0,

        behavior:
            "smooth"
    });

}


/* =========================
   SETTINGS EVENTS
========================= */

settingsToggle.addEventListener(
    "click",
    () => {

        const collapsed =
            settingsContent
            .classList
            .toggle(
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

                renderSessionSummary();

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
                    chip.dataset.filterTechnique;


                if (
                    settings.enabledTechniques.includes(
                        technique
                    )
                ) {

                    settings.enabledTechniques =
                        settings.enabledTechniques.filter(
                            item =>
                                item !==
                                technique
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
   HEATMAP EVENTS
========================= */

heatmapTabs.forEach(
    tab => {

        tab.addEventListener(
            "click",
            () => {

                settings.heatmapMode =
                    tab.dataset.heatmapMode;


                saveSettings();

                updateHeatmap();

            }
        );

    }
);


/* =========================
   OUTCOME EVENTS
========================= */

winButton.addEventListener(
    "click",
    () =>
        rateCurrentPull(
            "win"
        )
);


lossButton.addEventListener(
    "click",
    () =>
        rateCurrentPull(
            "loss"
        )
);


skipButton.addEventListener(
    "click",
    () =>
        rateCurrentPull(
            "skip"
        )
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


newSessionButton.addEventListener(
    "click",
    startNewSession
);


/* =========================
   INITIALIZE
========================= */

saveSession();

renderHistory();

updateSettingsUI();

updateHeatmap();


pullCounter.textContent =
    `PULL #${String(
        pullNumber
    ).padStart(
        2,
        "0"
    )}`;


/* RESTORE PENDING PULL */

if (
    pendingPullIndex !==
    null
) {

    const pendingPull =
        sessionHistory[
            pendingPullIndex
        ];


    techniqueText.textContent =
        pendingPull.technique.toUpperCase();


    techniqueSide.textContent =
        `${
            pendingPull.side ===
            "inside"
            ?
            "INSIDE GAME"
            :
            "OUTSIDE GAME"
        } • SHOULDER ${formatCommitment(
            pendingPull.commitment
        )}`;


    pullCounter.textContent =
        `PULL #${String(
            pendingPull.number
        ).padStart(
            2,
            "0"
        )}`;


    setCommitment(
        pendingPull.commitment
    );


    highlightTechnique(
        pendingPull.technique
    );


    showOutcomePanel();

}

else {

    hideOutcomePanel();

}


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