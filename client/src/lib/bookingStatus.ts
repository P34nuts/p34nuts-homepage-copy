export function getBookingErrorMessage(code?: string, serverMessage?: string) {
  if (code === "TOO_MANY_REQUESTS") {
    return "Zu viele Anfragen in kurzer Zeit. Bitte warte einen Moment oder schreibe direkt an P34nuts@mail.de.";
  }
  if (code === "INTERNAL_SERVER_ERROR" && serverMessage) {
    return serverMessage;
  }

  return "Die Anfrage konnte gerade nicht sicher übermittelt werden. Bitte versuche es erneut oder schreibe direkt an P34nuts@mail.de.";
}
