const form = document.getElementById("reflection-form");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const whyYes = document.querySelector('input[name="why-yes"]:checked').value;
    const whyNo = document.querySelector('input[name="why-no"]:checked').value;

    localStorage.setItem("whyYes", whyYes);
    localStorage.setItem("whyNo", whyNo);

    window.location.href = "./consequences.html";

});