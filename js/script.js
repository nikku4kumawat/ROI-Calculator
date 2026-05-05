let currentStep = 1;
const totalSteps = 5;

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

const progress = document.getElementById("progressFill");
const stepText = document.getElementById("stepText");

// STEP 3
const slider = document.querySelector(".slider");
const dropdown = document.querySelector(".dropdown");

// STEP 5
const step5Inputs = document.querySelectorAll("#step5 input");

// OPEN MODAL
document.querySelector(".btn").onclick = () => {
    document.getElementById("roiModal").style.display = "block";
    updateUI();
};

// CLOSE MODAL
document.getElementById("closeModal").onclick = closeModal;
document.getElementById("overlay").onclick = closeModal;

function closeModal() {
    document.getElementById("roiModal").style.display = "none";
}

// CARD SELECT (STEP 1,2,4)
document.querySelectorAll(".select-card .uni-card").forEach(card => {
    card.addEventListener("click", () => {

        card.parentElement.querySelectorAll(".uni-card")
            .forEach(c => c.classList.remove("active"));

        card.classList.add("active");

        nextBtn.disabled = false;
    });
});

// STEP 3 - SLIDER
const salaryValue = document.getElementById("salaryValue");

if (slider) {
    slider.addEventListener("input", () => {

        let value = slider.value;

        // NEXT BUTTON ENABLE
        if (currentStep === 3) nextBtn.disabled = false;

        // TEXT CHANGE
        if (value == 0) {
            salaryValue.innerText = "Fresher";
        } else {
            salaryValue.innerText = "₹" + Number(value).toLocaleString() + " / month";
        }

        // BLUE PROGRESS FILL
        let percent = (value / slider.max) * 100;

        slider.style.background = `linear-gradient(to right, #2f6fed ${percent}%, #e0e0e0 ${percent}%)`;
    });

    // 👉 PAGE LOAD PAR DEFAULT SET KARNE KE LIYE
    slider.dispatchEvent(new Event("input"));
}



// STEP 3 - DROPDOWN
if (dropdown) {
    dropdown.addEventListener("change", () => {
        if (currentStep === 3 && dropdown.value !== "Select your industry") {
            nextBtn.disabled = false;
        }
    });
}

// STEP 5 - INPUT VALIDATION
step5Inputs.forEach(input => {
    input.addEventListener("input", () => {

        if (currentStep === 5) {
            let allFilled = true;

            step5Inputs.forEach(i => {
                if (i.value.trim() === "") allFilled = false;
            });

            nextBtn.disabled = !allFilled;
        }
    });
});

// NEXT BUTTON
nextBtn.onclick = () => {

    if (!validateStep()) return;

    // ✅ ONLY STEP 5 → WHATSAPP
    if (currentStep === totalSteps) {

        const name = document.querySelector("#step5 input[placeholder='Full Name']").value;
        const email = document.querySelector("#step5 input[placeholder='Email Address']").value;
        const phone = document.querySelector("#step5 input[placeholder='+91 phone number']").value;

        const message = `Hello, I want ROI Report:

Name: ${name}
Email: ${email}
Phone: ${phone}`;

        const whatsappURL = `https://wa.me/918769091545?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");

        return; // 🚨 STOP HERE
    }

    // NORMAL NEXT STEP
    document.getElementById("step" + currentStep).classList.remove("active");

    currentStep++;

    document.getElementById("step" + currentStep).classList.add("active");

    updateUI();
};

// BACK BUTTON
backBtn.onclick = () => {
    if (currentStep > 1) {
        document.getElementById("step" + currentStep).classList.remove("active");

        currentStep--;

        document.getElementById("step" + currentStep).classList.add("active");

        updateUI();
    }
};

// VALIDATION
function validateStep() {

    // STEP 1,2,4
    if (currentStep === 1 || currentStep === 2 || currentStep === 4) {
        const activeCard = document.querySelector("#step" + currentStep + " .uni-card.active");
        return activeCard !== null;
    }

    // STEP 3
    if (currentStep === 3) {
        return (slider.value > 0 || dropdown.value !== "Select your industry");
    }

    // STEP 5
    if (currentStep === 5) {
        let allFilled = true;
        step5Inputs.forEach(i => {
            if (i.value.trim() === "") allFilled = false;
        });
        return allFilled;
    }

    return true;
}

// UPDATE UI
function updateUI() {
    stepText.innerText = `Step ${currentStep} of ${totalSteps}`;
    progress.style.width = (currentStep / totalSteps) * 100 + "%";

    nextBtn.disabled = true;

    // STEP 1,2,4
    if (currentStep === 1 || currentStep === 2 || currentStep === 4) {
        const activeCard = document.querySelector("#step" + currentStep + " .uni-card.active");
        if (activeCard) nextBtn.disabled = false;
    }

    // STEP 3
    if (currentStep === 3) {
        if (slider.value > 0 || dropdown.value !== "Select your industry") {
            nextBtn.disabled = false;
        }
    }

    // STEP 5
    if (currentStep === 5) {
        let allFilled = true;
        step5Inputs.forEach(i => {
            if (i.value.trim() === "") allFilled = false;
        });
        nextBtn.disabled = !allFilled;
    }

    // BUTTON TEXT
    nextBtn.innerText = (currentStep === totalSteps) ? "Get My ROI Report" : "Next →";
}