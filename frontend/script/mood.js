const form = document.getElementById("mood-form");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const mood = document.querySelector('input[name="mood"]:checked').value;
    const description = document.getElementById("mood-description").value;
});