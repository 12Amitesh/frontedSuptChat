export const getLastMessagePreview = (messages = []) => {
  if (!messages.length) return "No messages yet";

  const last = messages[messages.length - 1];

  if (last.text?.trim()) {
    return last.text.length > 30
      ? last.text.slice(0, 30) + "…"
      : last.text;
  }

  return "New message";
};
