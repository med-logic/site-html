const contactTriggers = document.querySelectorAll(
  ".header-contact-button, .hero-actions .button, .medicine-intro .button, .websites-hero-copy .button, .cta .button",
);

const modal = document.createElement("div");
modal.className = "modal-backdrop";
modal.hidden = true;
modal.innerHTML = `
  <section
    class="contact-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="contact-title"
  >
    <button class="modal-close" type="button" aria-label="Закрыть">×</button>
    <div class="eyebrow"><span></span> Связаться с нами</div>
    <h2 id="contact-title">Обсудим вашу задачу</h2>
    <p>
      Напишите нам — уточним потребности медицинской организации и предложим
      подходящий формат внедрения или сопровождения.
    </p>
    <div class="contact-options">
      <button
        class="copy-email"
        type="button"
        aria-label="Скопировать адрес info@med-logic.ru"
      >
        <small>Электронная почта</small>
        <b>info@med-logic.ru</b>
        <span aria-hidden="true">▣</span>
      </button>
      <div class="phone-contact">
        <small>Телефон</small>
        <a class="phone-number" href="tel:+79143343434">+7 914 334-34-34</a>
        <div class="messenger-links" aria-label="Мессенджеры">
          <a href="https://wa.me/79143343434" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://t.me/+79143343434" target="_blank" rel="noreferrer">Telegram</a>
          <a
            href="https://max.ru/"
            target="_blank"
            rel="noreferrer"
            title="Найдите нас в MAX по номеру телефона"
          >MAX</a>
        </div>
      </div>
    </div>
    <p class="modal-note">
      Приморский край, г. Владивосток · Работаем также удалённо
    </p>
  </section>
`;
document.body.append(modal);

const closeButton = modal.querySelector(".modal-close");
const copyButton = modal.querySelector(".copy-email");
const emailLabel = copyButton.querySelector("b");
const copyIcon = copyButton.querySelector("span");
let activeTrigger = null;
let copyResetTimer = null;

function openModal(event) {
  activeTrigger = event.currentTarget;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  activeTrigger?.focus();
}

async function copyEmail() {
  const email = "info@med-logic.ru";

  try {
    await navigator.clipboard.writeText(email);
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = email;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }

  emailLabel.textContent = "Скопировано";
  copyIcon.textContent = "✓";
  window.clearTimeout(copyResetTimer);
  copyResetTimer = window.setTimeout(() => {
    emailLabel.textContent = email;
    copyIcon.textContent = "▣";
  }, 1800);
}

contactTriggers.forEach((trigger) =>
  trigger.addEventListener("click", openModal),
);
closeButton.addEventListener("click", closeModal);
copyButton.addEventListener("click", copyEmail);
modal.addEventListener("mousedown", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});
