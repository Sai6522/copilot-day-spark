const ideas = [
  {
    title: "DocuDash",
    tagline: "A calm, searchable home for the docs your team actually needs.",
    promise: "Find the right answer in under 30 seconds, without asking “where is that file?”",
    features: ["Paste links or upload docs into one focused library.", "Search titles, tags, and content with instant results.", "Show a “freshness” badge so stale docs stand out."],
    stack: "HTML · CSS · JavaScript · localStorage"
  },
  {
    title: "Tiny Wins",
    tagline: "A gentle team board that makes small progress visible.",
    promise: "Turn invisible momentum into one satisfying, shareable win each day.",
    features: ["Add a win in one sentence with an optional emoji.", "Reveal a daily collage of the team’s progress.", "Keep the mood light with streaks, not pressure."],
    stack: "HTML · CSS · JavaScript · localStorage"
  },
  {
    title: "Neighborly",
    tagline: "A simple way for a neighborhood to share useful things.",
    promise: "Help good stuff find the person who needs it before it goes to waste.",
    features: ["Post an item, skill, or spare seat in under a minute.", "Filter by distance and category without a login.", "Auto-expire old posts so the feed stays trustworthy."],
    stack: "HTML · CSS · JavaScript · localStorage"
  }
];

const problem = document.querySelector("#problem");
const audience = document.querySelector("#audience");
const mood = document.querySelector("#mood");
const counter = document.querySelector("#counter");
const toast = document.querySelector("#toast");
let ideaIndex = 0;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function updateCounter() {
  counter.textContent = `${problem.value.length} / 240`;
}

function generateIdea() {
  const seed = problem.value.trim() || "A problem worth making a little easier";
  const idea = ideas[ideaIndex % ideas.length];
  document.querySelector("#result-title").textContent = idea.title;
  document.querySelector("#result-tagline").textContent = idea.tagline;
  document.querySelector("#result-promise").textContent = idea.promise;
  document.querySelector("#result-features").innerHTML = idea.features.map((feature) => `<li>${feature}</li>`).join("");
  document.querySelector("#result-stack").textContent = idea.stack;
  document.querySelector("#result-prompt").textContent =
    `Build a responsive single-page app called ${idea.title} for ${audience.value}. Help users solve this problem: “${seed}”. Include these first features: ${idea.features.join(" ")} Use a ${mood.value.toLowerCase()} visual style with localStorage and no backend for the first version.`;
  ideaIndex += 1;
}

async function copyText(text, message) {
  await navigator.clipboard.writeText(text);
  showToast(message);
}

problem.addEventListener("input", updateCounter);
document.querySelector("#generate").addEventListener("click", generateIdea);
document.querySelector("#regenerate").addEventListener("click", generateIdea);
document.querySelector("#copy").addEventListener("click", () => copyText(document.querySelector("#result-prompt").textContent, "Copilot prompt copied"));
document.querySelector("#share").addEventListener("click", () => copyText(
  `I turned “${problem.value.trim() || "a problem worth solving"}” into ${document.querySelector("#result-title").textContent} with GitHub Copilot. #githubcopilotdaycontest #sweepstakes`,
  "Share caption copied"
));
problem.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") generateIdea();
});
updateCounter();
