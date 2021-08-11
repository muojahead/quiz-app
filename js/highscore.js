const highScoresData = JSON.parse(localStorage.getItem("highScore"));
const userData = document.getElementById("userData");
highScoresData.forEach((user) => {
    userData.innerHTML += `
    <tr>
    <td>${user.name}</td>
    <td>${user.score}</td>
    </tr>
    `;
});