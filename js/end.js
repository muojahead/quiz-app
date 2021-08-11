const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScoreEle = document.getElementById("finalScore");
const finalScore = localStorage.getItem("mostRecentScore");
const err = document.getElementById("msg");
const highScore = JSON.parse(localStorage.getItem("highScore"));
finalScoreEle.innerText = finalScore;
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});
saveScore = (e) => {
    e.preventDefault();
    const score = {
        score: finalScore,
        name: username.value,
    };
    const exsitName = highScore.find((name) => score.name == name.name);
    if (exsitName) {
        err.classList.add("active");
        err.innerText = `Unfortunately, the name you entered: (${username.value}) has already been entered, please type another name`;
    } else {
        highScore.push(score);
        highScore.sort((a, b) => a.score - b.score);
        localStorage.setItem("highScore", JSON.stringify(highScore));
        window.location.assign("./high-scores.html");
    }
};
err.onclick = () => err.classList.remove("active");