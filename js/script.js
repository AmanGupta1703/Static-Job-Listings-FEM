import { generateHTML, render } from "./helper.js";

const jobListContainerEl = document.querySelector(".job-list--container");
const filterButtonWrapperEl = document.querySelector(
  ".filter__buttons-wrapper"
);
const filterBoxContainerEl = document.querySelector(".filter--box-container");

const getAllJobs = async () => {
  const response = await fetch("../data.json");
  const data = await response.json();
  return data;
};

const allJobs = await getAllJobs();

render(jobListContainerEl, allJobs, "card", generateHTML);

const filterTags = [];

function filterJobs(jobs, tags) {
  const filteredJobs = jobs.filter(job => {
    const jobTags = [
      job.role.toLowerCase(),
      job.level.toLowerCase(),
      ...job.languages.map(language => language.toLowerCase()),
    ];

    return tags.every(tag => jobTags.includes(tag));
  });
  render(jobListContainerEl, filteredJobs, "card", generateHTML);

  filterBoxContainerEl.classList.add("active");
  filterBoxContainerEl.classList.remove("hidden");

  render(filterButtonWrapperEl, tags, "button", generateHTML);
}

function handleJobCardTagClick(e) {
  if (!e.target.classList.contains("tag")) {
    return;
  }

  const { value } = e.target.dataset;

  if (filterTags.includes(value)) {
    filterTags.splice(filterTags.indexOf(value), 1);
    filterJobs(allJobs, filterTags);
    return;
  }

  filterTags.push(value);

  filterJobs(allJobs, filterTags);

  console.log(filterTags);
}

window.addEventListener("click", handleJobCardTagClick);
