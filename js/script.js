const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
});

document.getElementById("submit-btn").addEventListener("click", async (event) => {
    event.preventDefault();

    const name = document.querySelector(".contact_form_input_name").value.trim();
    const email = document.querySelector(".contact_form_input_email").value.trim();
    const message = document.querySelector(".contact_form_textarea").value.trim();

    if (!name || !email || !message) {
        alert("Заповніть всі поля!");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
            mode: "cors"  // Додаємо CORS
        });

        const result = await response.json();
        alert(result.success || result.error);
    } catch (error) {
        console.error("Помилка відправки:", error);
        alert("Помилка! Перевірте консоль.");
    }
});
