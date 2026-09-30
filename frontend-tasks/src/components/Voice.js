// Voice input/output helpers (B8).
// - startListening(): wires the mic button to SpeechRecognition, supports en-IN / hi-IN.
// - speak(): reads text aloud with SpeechSynthesis (used by the "Listen" button on Details).

import { getLang } from "../i18n.js";

const SpeechRecognitionImpl = window.SpeechRecognition || window.webkitSpeechRecognition;

export function isVoiceInputSupported() {
  return !!SpeechRecognitionImpl;
}

export function isVoiceOutputSupported() {
  return "speechSynthesis" in window;
}

/**
 * Wires a mic button to speech recognition.
 * @param {HTMLButtonElement} button
 * @param {(transcript: string) => void} onResult - called with recognized text
 */
export function attachMicButton(button, onResult) {
  if (!isVoiceInputSupported()) {
    button.disabled = true;
    button.title = "Voice input is not supported in this browser";
    return;
  }

  let recognition = null;

  button.addEventListener("click", () => {
    if (recognition) {
      recognition.stop();
      return;
    }
    recognition = new SpeechRecognitionImpl();
    recognition.lang = getLang() === "hi" ? "hi-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    button.setAttribute("aria-pressed", "true");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    recognition.onerror = () => {
      button.setAttribute("aria-pressed", "false");
    };
    recognition.onend = () => {
      button.setAttribute("aria-pressed", "false");
      recognition = null;
    };

    try {
      recognition.start();
    } catch (e) {
      button.setAttribute("aria-pressed", "false");
      recognition = null;
    }
  });
}

/**
 * Reads text aloud using SpeechSynthesis, in the currently selected language.
 * @param {string} text
 */
export function speak(text) {
  if (!isVoiceOutputSupported() || !text) return;
  window.speechSynthesis.cancel(); // stop anything already playing
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = getLang() === "hi" ? "hi-IN" : "en-IN";
  window.speechSynthesis.speak(utterance);
}
