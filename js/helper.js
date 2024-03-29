function generateHTML(type, data) {
  if (type === "button") {
    return data
      .map(
        filterBtn =>
          `
          <button class="btn btn--filter" data-value="${filterBtn}">
            <span class="btn__text">${filterBtn}</span>
            <span class="btn__remove-icon"
              ><img src="./images/icon-remove.svg" alt=""
            /></span>
          </button>
        `
      )
      .join("");
  }

  if (type === "card") {
    return data
      .map(
        (job, i) => `
          <div
            class="job-card job-card--job ${
              job.featured ? "job-card--featured" : ""
            }"
          >
            <img src="${job.logo}" alt=${job.company} class="job-card__logo" />

            <div class="job-card__header">
              <div class="job-card__info">
                <p class="job-card__name">${job.company}</p>
                ${job.new ? '<p class="pill pill--new">New!</p>' : ""}
                ${
                  job.featured
                    ? '<p class="pill pill--featured">Featured</p>'
                    : ""
                }
              </div>

              <h5 class="job-card__position">${job.position}</h5>

              <div class="job-card__details">
                <p class="job-card__postedAt">${job.postedAt}</p>
                <p class="job-card__contract">${job.contract}</p>
                <p class="job-card__location">${job.location}</p>
              </div>
            </div>

            <div class="job-card__footer">
              <div class="job-card__tags">
                <p
                  data-role="role"
                  class="tag"
                  data-value="${job.role.toLowerCase()}"
                >
                  ${job.role}
                </p>
                <p
                  data-level="level"
                  class="tag"
                  data-value="${job.level.toLowerCase()}"
                >
                  ${job.level}
                </p>
                ${job.languages
                  .map(
                    language =>
                      `<p class="tag" data-value="${language.toLowerCase()}">${language}</p>`
                  )
                  .join("")}
              </div>
            </div>
          </div>
        `
      )
      .join("");
  }
}

function render(element, data, type, callback) {
  element.innerHTML = "";
  element.insertAdjacentHTML("afterbegin", callback(type, data));
}

export { generateHTML, render };
