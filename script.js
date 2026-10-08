const concepts = [
  ["Components", "Reusable UI building blocks."],
  ["State", "Values that change during interaction."],
  ["Props", "Information passed between parts of an application."],
  ["Events", "User actions such as clicks and input."],
  ["Conditional Rendering", "Showing UI based on current data."],
  ["Array Methods", "map and filter for collections."]
];

let tasks = [
  {
    id: 1,
    title: "Revise JavaScript fundamentals",
    done: true
  },
  {
    id: 2,
    title: "Practice state and events",
    done: false
  },
  {
    id: 3,
    title: "Build a small practical project",
    done: false
  }
];

let pendingOnly = false;

const root = document.querySelector("#root");

function App() {
  root.innerHTML = `
    <main class="app">
      <section class="panel">
        <span class="badge">YuvaIntern • Task 2</span>
        <h1>Core Concepts and Skills</h1>
        <p>Practical project by Sonu Kumar Badal</p>
      </section>

      <section class="panel">
        <h2>Concepts Practiced</h2>

        <div class="concepts">
          ${concepts.map(
            (concept) => `
              <article class="concept">
                <h3>${concept[0]}</h3>
                <p>${concept[1]}</p>
              </article>
            `
          ).join("")}
        </div>
      </section>

      <section class="panel">
        <h2>Learning Task Tracker</h2>

        <div class="controls">
          <input id="input" placeholder="Add learning task" />
          <button id="add">Add Task</button>
          <button id="filter">Show Pending Only</button>
        </div>

        <b id="count"></b>

        <div id="tasks"></div>
      </section>
    </main>
  `;

  render();

  document.querySelector("#add").onclick = addTask;

  document.querySelector("#filter").onclick = () => {
    render(!pendingOnly);
  };
}

function render(filter = pendingOnly) {
  pendingOnly = filter;

  const list = tasks.filter(
    (task) => !filter || !task.done
  );

  const tasksContainer = document.querySelector("#tasks");

  if (list.length) {
    tasksContainer.innerHTML = list.map(
      (task) => `
        <div class="task ${task.done ? "done" : ""}">
          <strong>${task.title}</strong>
          <button onclick="toggleTask(${task.id})">
            ${task.done ? "Completed" : "Mark Complete"}
          </button>
        </div>
      `
    ).join("");
  } else {
    tasksContainer.innerHTML = "<p>No pending tasks.</p>";
  }

  const pendingCount = tasks.filter(
    (task) => !task.done
  ).length;

  document.querySelector("#count").textContent =
    `Total: ${tasks.length} | Pending: ${pendingCount}`;

  document.querySelector("#filter").textContent =
    filter ? "Show All" : "Show Pending Only";
}

function addTask() {
  const input = document.querySelector("#input");
  const value = input.value.trim();

  if (!value) {
    alert("Please enter a task.");
    return;
  }

  tasks.push({
    id: Date.now(),
    title: value,
    done: false
  });

  input.value = "";
  render();
}

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        done: !task.done
      };
    }

    return task;
  });

  render();
}

App();
