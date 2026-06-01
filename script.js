document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".main-nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  const copyButtons = document.querySelectorAll("[data-copy-pix]");
  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const pixKey = button.dataset.copyPix;
      try {
        await navigator.clipboard.writeText(pixKey);
        button.textContent = "Copiado!";
        setTimeout(() => {
          button.textContent = "Copiar chave";
        }, 2000);
      } catch (error) {
        button.textContent = "Erro ao copiar";
      }
    });
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cpfPattern = /^\d{11}$/;
  const phonePattern = /^\d{10,11}$/;

  const setError = (input, message) => {
    const field = input.closest(".form-group");
    const error = field && field.querySelector(".error-message");
    if (input) input.classList.add("error");
    if (error) error.textContent = message;
  };

  const clearError = (input) => {
    const field = input.closest(".form-group");
    const error = field && field.querySelector(".error-message");
    if (input) input.classList.remove("error");
    if (error) error.textContent = "";
  };

  // Donation form validation (if present)
  const donationForm = document.getElementById("donation-form");
  if (donationForm) {
    donationForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("donor-name");
      const emailInput = document.getElementById("donor-email");
      const cpfInput = document.getElementById("donor-cpf");
      const amountInput = document.getElementById("donation-amount");
      const phoneInput = document.getElementById("donor-phone");
      const successMessage = donationForm.querySelector(".form-success");

      let isValid = true;
      if (successMessage) successMessage.classList.add("hidden");

      [nameInput, emailInput, cpfInput, amountInput, phoneInput].forEach((i) => i && clearError(i));

      if (!nameInput || !nameInput.value.trim()) {
        setError(nameInput, "Por favor, digite seu nome completo.");
        isValid = false;
      }

      if (!emailInput || !emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        setError(emailInput, "Digite um e-mail válido.");
        isValid = false;
      }

      if (!cpfInput || !cpfPattern.test(cpfInput.value.trim())) {
        setError(cpfInput, "CPF inválido. Use apenas 11 números.");
        isValid = false;
      }

      if (!amountInput || !amountInput.value || Number(amountInput.value) <= 0) {
        setError(amountInput, "Informe um valor de doação maior que zero.");
        isValid = false;
      }

      if (phoneInput && phoneInput.value.trim() && !phonePattern.test(phoneInput.value.replace(/\D/g, ""))) {
        setError(phoneInput, "Digite um telefone válido com 10 ou 11 dígitos.");
        isValid = false;
      }

      if (isValid) {
        if (successMessage) successMessage.classList.remove("hidden");
        donationForm.reset();
      }
    });
  }

  // Contact form validation (if present)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("contact-name");
      const emailInput = document.getElementById("contact-email");
      const phoneInput = document.getElementById("contact-phone");
      const messageInput = document.getElementById("contact-message");
      const fileInput = document.getElementById("contact-attachment");
      const successMessage = contactForm.querySelector(".form-success");

      let isValid = true;
      if (successMessage) successMessage.classList.add("hidden");

      [nameInput, emailInput, phoneInput, messageInput, fileInput].forEach((i) => i && clearError(i));

      if (!nameInput || !nameInput.value.trim()) {
        setError(nameInput, "Por favor, digite seu nome completo.");
        isValid = false;
      }

      if (!emailInput || !emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        setError(emailInput, "Digite um e-mail válido.");
        isValid = false;
      }

      if (phoneInput && phoneInput.value.trim() && !phonePattern.test(phoneInput.value.replace(/\D/g, ""))) {
        setError(phoneInput, "Digite um telefone válido com 10 ou 11 dígitos.");
        isValid = false;
      }

      if (!messageInput || !messageInput.value.trim() || messageInput.value.trim().length < 5) {
        setError(messageInput, "Escreva uma mensagem com pelo menos 5 caracteres.");
        isValid = false;
      }

      // file validation (optional)
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowed = [
          "image/png",
          "image/jpeg",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (file.size > maxSize) {
          setError(fileInput, "Arquivo muito grande. Máx 5MB.");
          isValid = false;
        } else if (!allowed.includes(file.type)) {
          setError(fileInput, "Tipo de arquivo não suportado. Use jpg, png, pdf ou docx.");
          isValid = false;
        }
      }

      if (isValid) {
        if (successMessage) successMessage.classList.remove("hidden");
        contactForm.reset();
      }
    });
  }
});