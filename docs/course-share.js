document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy-course-link]");
  if (!button) return;
  const url = new URL(button.dataset.copyCourseLink, window.location.origin).href;
  const status = button.parentElement.querySelector(".copy-status");
  try {
    await navigator.clipboard.writeText(url);
    status.textContent = "Link copied — ready to share.";
  } catch {
    status.textContent = "Copy this link: ";
    const link = document.createElement("a");
    link.href = url;
    link.textContent = url;
    status.append(link);
  }
});
