import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

const button = document.querySelector(".login-btn");

// Already logged in?
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "dashboard.html";
    }
});

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    button.disabled = true;
    button.innerText = "Signing In...";

    try {

        await signInWithEmailAndPassword(
            auth,
            email.value.trim(),
            password.value
        );

        window.location.href = "dashboard.html";

    } catch (error) {

        let message = "Login Failed";

        switch(error.code){

            case "auth/invalid-email":
                message = "Invalid Email";
                break;

            case "auth/user-not-found":
                message = "User Not Found";
                break;

            case "auth/wrong-password":
                message = "Wrong Password";
                break;

            case "auth/invalid-credential":
                message = "Incorrect Email or Password";
                break;

            default:
                message = error.message;

        }

        alert(message);

    }

    button.disabled = false;
    button.innerText = "Login";

});
