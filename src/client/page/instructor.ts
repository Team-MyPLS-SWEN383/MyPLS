let lectureData;
const getLectureData = async () => {
  return lectureData || await (await fetch("/lectures", {
    method: "GET"
  })).json();
}

let quizData;
const getQuizData = async () => {
  return quizData || await (await fetch("/quizzes", {
    method: "GET"
  })).json();
}

const appendLectures = async () => {
  const lectures = await getLectureData();
  const contentArea = document.getElementById("content-cards");

  for (const lecture of lectures) {
    const myLecture = document.createElement("div");
    let src;
    let roleName;
    

    myLecture.className = `filterDiv lecture`;
    myLecture.innerHTML = `
    <div class="card">
      <img src="media/lecture.png" alt="Available Lectures" style="width:100%">
      <div class="container">
        <h4><b>${lecture.title}</b></h4>
      </div>
    </div>`;

    contentArea.appendChild(myLecture);
  }
}

const appendQuizzes = async () => {
  const quizzes = await getQuizData();

  const contentArea = document.getElementById("content-cards");

  for (const quiz of quizzes) {
    const myQuiz = document.createElement("div");
    myQuiz.className = `filterDiv quiz`;
    myQuiz.innerHTML = `
    <div class="card">
      <img src="media/quiz.png" alt="Available Courses" style="width:100%">
      <div class="container">
        <h4><b>${quiz.Title}</b></h4>
      </div>
    </div>`;

    contentArea.appendChild(myQuiz);
  }
}

// TODO: separate these into their own files
declare function filterSelection(filter: string);
export const getInstructorContent = async () => {
  await appendLectures();
  await appendQuizzes();

  filterSelection("all");
}