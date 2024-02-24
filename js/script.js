import { generateHTML, render } from "./helper.js";

const jobListContainerEl = document.querySelector(".job-list--container");
const filterButtonWrapperEl = document.querySelector(
  ".filter__buttons-wrapper"
);
const filterBoxContainerEl = document.querySelector(".filter--box-container");
const btnClearEl = document.querySelector(".btn--clear");

const filterTags = [];
let allJobs;

async function getAllJobs() {
  const response = await fetch("../data.json");
  const data = await response.json();
  return data;
}

function renderFilteredJobs() {
  render(
    jobListContainerEl,
    filterJobs(allJobs, filterTags),
    "card",
    generateHTML
  );

  filterBoxContainerEl.classList.add("active");
  filterBoxContainerEl.classList.remove("hidden");

  render(filterButtonWrapperEl, filterTags, "button", generateHTML);
}

function filterJobs(jobs, tags) {
  return jobs.filter(job => {
    const jobTags = [
      job.role.toLowerCase(),
      job.level.toLowerCase(),
      ...job.languages.map(language => language.toLowerCase()),
    ];

    return tags.every(tag => jobTags.includes(tag));
  });
}

function handleJobCardTagClick(e) {
  if (!e.target.classList.contains("tag")) {
    return;
  }

  const { value } = e.target.dataset;

  if (filterTags.includes(value)) {
    filterTags.splice(filterTags.indexOf(value), 1);
  } else {
    filterTags.push(value);
  }

  renderFilteredJobs();
}

function handleFilterButtonRemoveClick(e) {
  if (!e.target.closest(".btn--filter")) {
    return;
  }

  const { value } = e.target.closest(".btn--filter").dataset;

  filterTags.splice(filterTags.indexOf(value), 1);
  renderFilteredJobs();
}

function handleClearFilterClick() {
  filterTags.length = 0;
  renderFilteredJobs();
}

function init() {
  getAllJobs().then(data => {
    allJobs = data;
    render(jobListContainerEl, allJobs, "card", generateHTML);
  });

  window.addEventListener("click", handleJobCardTagClick);
  filterButtonWrapperEl.addEventListener(
    "click",
    handleFilterButtonRemoveClick
  );
  btnClearEl.addEventListener("click", handleClearFilterClick);
}

init();
