const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:3000/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("Login successful!");

            window.location.href = "./mood.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        alert("Unable to connect to the server.");

        console.error(error);

    }

});