const helpOptions = [
    {
        value: "volunteer",
        title: "Volunteering",
        description: "Volunteers can help with animal care, adoption events, cleaning, and other activities that support the rescue."
    },
    {
        value: "foster",
        title: "Fostering",
        description: "Foster families provide temporary homes for rescued animals while they wait for permanent homes."
    },
    {
        value: "adoption",
        title: "Adoption Information",
        description: "Learn more about the adoption process and how to give a rescued animal a safe and loving home."
    }
];

function showInterest(optionValue) {
    const result = document.getElementById("interest-result");

    if (!result) {
        return;
    }

    if (optionValue === "") {
        result.innerHTML = "<p>Select an option to learn more.</p>";
        return;
    }

    const selectedOption = helpOptions.find(function (option) {
        return option.value === optionValue;
    });

    if (selectedOption) {
        result.innerHTML =
            "<h3>" +
            selectedOption.title +
            "</h3><p>" +
            selectedOption.description +
            "</p>";
    }
}

function saveInterest(optionValue) {
    if (optionValue === "") {
        localStorage.removeItem("rescueInterest");
        return;
    }

    localStorage.setItem("rescueInterest", optionValue);
}

function loadInterest() {
    const selector = document.getElementById("help-interest");

    if (!selector) {
        return;
    }

    const savedInterest = localStorage.getItem("rescueInterest");

    if (savedInterest) {
        selector.value = savedInterest;
        showInterest(savedInterest);
    }
}

function setupInterestSelector() {
    const selector = document.getElementById("help-interest");

    if (!selector) {
        return;
    }

    selector.addEventListener("change", function () {
        showInterest(selector.value);
        saveInterest(selector.value);
    });

    loadInterest();
}

function setError(id, message) {
    const errorElement = document.getElementById(id);

    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    setError("name-error", "");
    setError("email-error", "");
    setError("message-error", "");

    const successMessage = document.getElementById("form-success");

    if (successMessage) {
        successMessage.textContent = "";
    }
}

function validateForm() {
    clearErrors();

    let valid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
        setError("name-error", "Please enter your name.");
        valid = false;
    } else if (name.length < 2) {
        setError("name-error", "Your name must be at least 2 characters.");
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        setError("email-error", "Please enter your email address.");
        valid = false;
    } else if (!emailPattern.test(email)) {
        setError("email-error", "Please enter a valid email address.");
        valid = false;
    }

    if (message === "") {
        setError("message-error", "Please enter a message.");
        valid = false;
    } else if (message.length < 10) {
        setError("message-error", "Your message must be at least 10 characters.");
        valid = false;
    }

    return valid;
}

function setupFormValidation() {
    const form = document.getElementById("interest-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (validateForm()) {
            const successMessage = document.getElementById("form-success");

            if (successMessage) {
                successMessage.textContent =
                    "Thank you! Your message has been received.";
            }

            form.reset();
        }
    });
}

setupInterestSelector();
setupFormValidation();