const form = document.getElementById("consequences-form");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const yesConsequence = document.querySelector('input[name="yes-consequence"]:checked').value;
    const noConsequence = document.querySelector('input[name="no-consequence"]:checked').value;

    localStorage.setItem("yesConsequence", yesConsequence);
    localStorage.setItem("noConsequence", noConsequence);

    window.location.href = "./confidence.html";
});