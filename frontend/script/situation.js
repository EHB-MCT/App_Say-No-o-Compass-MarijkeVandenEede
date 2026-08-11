const form = document.getElementById("situation-form");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const description = document.getElementById("situation-description").value;
    const whoIsAsking = document.querySelector('input[name="who-is-asking"]:checked').value;
    const requestImportance = document.querySelector('input[name="request-importance"]:checked').value;

});