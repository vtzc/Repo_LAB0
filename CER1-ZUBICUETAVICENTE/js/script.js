document.addEventListener("DOMContentLoaded", () => {
  const countdownElements = document.querySelectorAll(".event-countdown");

  countdownElements.forEach((element) => {
    const eventDateStr = element.dataset.eventDate;
    if (!eventDateStr) return;

    const eventDate = new Date(eventDateStr).getTime();

    const updateCountdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        clearInterval(updateCountdown);
        element.innerHTML = "¡El evento ha comenzado!";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  });

  const commentForm = document.getElementById("formulario_comentarios");
  if (commentForm) {
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const alias = document.getElementById("alias").value;
      const message = document.getElementById("message").value;
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

      const commentList = document.getElementById("lista_comentarios");
      const newComment = document.createElement("div");
      newComment.className = "card mb-3";
      newComment.innerHTML = `
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">${alias} - ${formattedDate}</h6>
                    <p class="card-text">${message}</p>
                </div>
            `;

      commentList.prepend(newComment);
      commentForm.reset();
    });
  }
  
});
