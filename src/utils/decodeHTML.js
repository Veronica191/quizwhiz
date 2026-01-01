// Decode HTML entities (VERY IMPORTANT for OpenTDB)
export default function decodeHTML(html = "") {
  if (typeof document === "undefined") return String(html)
  const txt = document.createElement("textarea")
  txt.innerHTML = html
  return txt.value
}
