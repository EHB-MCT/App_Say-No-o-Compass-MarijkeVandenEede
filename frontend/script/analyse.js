const form = document.getElementById("analyse-form");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const mood = localStorage.getItem("mood");
    const moodDescription = localStorage.getItem("moodDescription");

    const situationDescription = localStorage.getItem("situationDescription");
    const whoIsAsking = localStorage.getItem("whoIsAsking");
    const requestImportance = localStorage.getItem("requestImportance");

    const whyYes = localStorage.getItem("whyYes");
    const whyNo = localStorage.getItem("whyNo");

    const consequenceYes = localStorage.getItem("consequenceYes");
    const consequenceNo = localStorage.getItem("consequenceNo");

    const confidence = localStorage.getItem("confidence");
    const confidenceDescription = localStorage.getItem("confidenceDescription");
    /*tijdelijk
    console.log({
        mood,
        moodDescription,
        situationDescription,
        whoIsAsking,
        requestImportance,
        whyYes,
        whyNo,
        consequenceYes,
        consequenceNo,
        confidence,
        confidenceDescription
    });*/

    const data = {
    mood,
    moodDescription,
    situationDescription,
    whoIsAsking,
    requestImportance,
    whyYes,
    whyNo,
    consequenceYes,
    consequenceNo,
    confidence,
    confidenceDescription
};

const response = await fetch("http://localhost:3000/analyse", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});

if (!response.ok) {
    alert("Something went wrong.");
    return;
}

const result = await response.json();

localStorage.setItem("reflection", result.advice);
window.location.href = "./mirror.html";

});