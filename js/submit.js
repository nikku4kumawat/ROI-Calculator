nextBtn.onclick = (e) => {

    e.preventDefault();

    if (!validateStep()) return;

    // ✅ ONLY LAST STEP
    if (currentStep === totalSteps) {

        let university = document.querySelector("#step1 .uni-card.active")?.innerText || "Not Selected";
        let course = document.querySelector("#step2 .uni-card.active")?.innerText || "Not Selected";
        let salary = document.querySelector(".slider").value;
        let industry = document.querySelector(".dropdown").value;
        let experience = document.querySelector("#step4 .uni-card.active")?.innerText || "Not Selected";

        let name = document.querySelector("#step5 input[type='text']").value;
        let email = document.querySelector("#step5 input[type='email']").value;
        let phone = document.querySelector("#step5 input[type='tel']").value;

        let message = `Hello, I want ROI Details:

University: ${university}
Course: ${course}
Salary: ₹${salary}
Industry: ${industry}
Experience: ${experience}

Name: ${name}
Email: ${email}
Phone: ${phone}`;

        let whatsappNumber = "918769091545";

        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");

        return; // 🚨 VERY IMPORTANT
    }

    // NORMAL STEP CHANGE
    document.getElementById("step" + currentStep).classList.remove("active");

    currentStep++;

    document.getElementById("step" + currentStep).classList.add("active");

    updateUI();
};