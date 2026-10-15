document.addEventListener('DOMContentLoaded', () => {
  const copyButton = document.querySelector('.server-box');

  if (!copyButton) return;

  const originalText = copyButton.textContent.trim();

  const setFeedback = (message, disabled = false) => {
    const previousText = copyButton.textContent;
    copyButton.textContent = message;
    copyButton.disabled = disabled;

    setTimeout(() => {
      copyButton.textContent = previousText;
      copyButton.disabled = false;
    }, 1200);
  };

  const copyText = async (value) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  };

  copyButton.addEventListener('click', async () => {
    const value = copyButton.dataset.copy || originalText;

    try {
      const successful = await copyText(value);
      if (successful) {
        setFeedback('Nusxalandi', true);
      } else {
        setFeedback('Nusxalab bo\'lmadi', false);
      }
    } catch {
      setFeedback('Nusxalab bo\'lmadi', false);
    }
  });
});
