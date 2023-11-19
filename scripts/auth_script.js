document.addEventListener("DOMContentLoaded", function() {

    const showModalButton = document.getElementById("authButton");
    const captchaModal = document.getElementById("captchaModal");
    const closeModalButton = document.getElementById("closeModal");

    showModalButton.addEventListener("click", function() {
        captchaModal.style.display = "block";
    });

    closeModalButton.addEventListener("click", function() {
        captchaModal.style.display = "none";
    });


    const textCaptcha = document.getElementById("textCaptcha");
    const captchaInput = document.getElementById("captchaInput");
    const submitButton = document.getElementById("submitButton");

    let captchaType = "text";

    function generateTextCaptcha() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const captchaText = Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
        textCaptcha.innerText = captchaText;
    }

    function generateMathCaptcha() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        textCaptcha.innerText = `${num1} + ${num2}`;
    }

    function switchCaptchaType() {
        captchaType = (captchaType === "text") ? "math" : "text";
    }

    function isEmpty(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    function updateSubmitButton() {
        const captchaValue = captchaInput.value.trim();
        if (!isEmpty(captchaValue)) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    generateTextCaptcha();
    updateSubmitButton();

    captchaInput.addEventListener("input", function() {
        updateSubmitButton();
    });

    submitButton.addEventListener("click", function() {
        const captchaValue = captchaInput.value.trim();
        if (isNaN(captchaValue)) {
            if (captchaValue === textCaptcha.innerText) {
                captchaModal.style.display = "none";
                alert("Капча пройдена успешно!");
            } else {
                alert("Ошибка! Пожалуйста, повторите капчу.");
                switchCaptchaType();
                if (captchaType === "text") {
                    generateTextCaptcha();
                } else {
                    generateMathCaptcha();
                }
            }
        } else {
            const [num1, num2] = textCaptcha.innerText.split('+').map(value => parseInt(value));
            if (num1 + num2 === parseInt(captchaValue)) {
                captchaModal.style.display = "none";
                alert("Капча пройдена успешно!");
            } else {
                alert("Ошибка! Пожалуйста, повторите капчу.");
                switchCaptchaType();
                if (captchaType === "text") {
                    generateTextCaptcha();
                } else {
                    generateMathCaptcha();
                }
            }
        }

        captchaInput.value = "";
        updateSubmitButton();
    });
});
