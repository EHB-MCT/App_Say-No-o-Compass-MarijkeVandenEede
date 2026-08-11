const reflection = localStorage.getItem("reflection");

if (reflection) {
    document.getElementById("reflection-output").textContent = reflection;
}

const newReflectionButton = document.getElementById("new-reflection-btn");

newReflectionButton.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "./mood.html";

});