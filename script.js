//========================================================================================//
/*!
\file   script.js
\author April
\brief  This file defines 
\log    13/10/2026 - Created file
*/
//========================================================================================//


//Array of objects
const projects = [
  {
    title: "Diabetes Management App",
    description: "A mobile app concept for tracking glucose levels and notify users if they should consult a doctor.",
    image: "images/travel-app.png",
    categories: ["Design"],
    tools: ["Figma", "Axure RP"],
    link: ""
  },
  {
    title: "Travel Companion App",
    description: "A mobile app concept for planning trips and creating shared itineraries.",
    image: "images/dashboard.png",
    categories: ["Design", "Development"],
    tools: ["Figma"],
    link: ""
  },
  {
    title: "Orders Up",
    description: "A singleplayer card game.",
    image: "images/portfolio.png",
    categories: ["Design"],
    tools: ["Game Design", "Adobe Illustrator"],
    link: ""
  },
  {
    title: "Murphy's Dive",
    description: "A game.",
    image: "images/portfolio.png",
    categories: ["Development"],
    tools: ["Game Development","C++", "lua"],
    link: ""
  },
  {
    title: "Dungeon Meshi-based Board Game",
    description: "A singleplayer board game based on the anime ‘Dungeon Meshi’, combining original gameplay with sourced illustrations.",
    image: "images/portfolio.png",
    categories: ["Design"],
    tools: ["Game Design","Adobe Illustrator"],
    link: ""
  },
  {
    title: "Solar Fling",
    description: "A simple click, drag, and shoot game.",
    image: "images/portfolio.png",
    categories: ["Design", "Development"],
    tools: ["C", "Adobe Illustrator"],
    link: ""
  }
];

// Current filters
let activeCategory = "All";
let activeTool = "All";

const projectGrid = document.getElementById("project-grid");
const toolFilter = document.getElementById("tool-filter");
const emptyState = document.getElementById("empty-state");

// Helper functions
function createElement(tag, className, text)
{
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

/*!***********************************************************************
  \brief
  This function takes in a project to create a project card.

  \param[in] project

  \return -
*************************************************************************/
function createProjectCard(project)
{
  const card = createElement("article", "project-card");

  const image = document.createElement("img");
  image.className = "project-image";
  image.src = project.image;
  image.alt = `${project.title} project preview`;
  image.loading = "lazy";
  card.appendChild(image);

  const content = createElement("div", "project-content");
  content.appendChild(createElement("h3", "", project.title));
  content.appendChild(
    createElement("p", "project-description", project.description)
  );

  const tags = createElement("div", "tags");

  project.categories.forEach(category => {
    const tag = createElement(
      "span",
      `tag ${category.toLowerCase()}`,
      category
    );
    tags.appendChild(tag);
  });

  project.tools.forEach(tool => {
    tags.appendChild(createElement("span", "tag", tool));
  });

  content.appendChild(tags);

  if (project.link) {
    const link = createElement("a", "project-link", "View Project ↗");
    link.href = project.link;
    content.appendChild(link);
  }

  card.appendChild(content);
  return card;
}

/*!***********************************************************************
  \brief
  This function displays projects matching selected filters

  \param[in] -

  \return -
*************************************************************************/
function renderProjects()
{
  const filtered = projects.filter(project => {
    const categoryMatch =
      activeCategory === "All" ||
      project.categories.includes(activeCategory);

    const toolMatch =
      activeTool === "All" ||
      project.tools.includes(activeTool);

    return categoryMatch && toolMatch;
  });

  projectGrid.replaceChildren(
    ...filtered.map(createProjectCard)
  );

  emptyState.hidden = filtered.length !== 0;
}



/*!***********************************************************************
                        Initialization Code
*************************************************************************/

// Populate tool dropdown automatically
const allTools = [...new Set(
  projects.flatMap(project => project.tools)
)].sort();

allTools.forEach(tool => {
  const option = document.createElement("option");
  option.value = tool;
  option.textContent = tool;
  toolFilter.appendChild(option);
});

// Category button interactions
document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter;

    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn === button);
    });

    renderProjects();
  });
});

// Tool dropdown interaction
toolFilter.addEventListener("change", event => {
  activeTool = event.target.value;
  renderProjects();
});

// Initial display
renderProjects();