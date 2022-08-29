function feedbackFormInit(formSelector, url) {
  const formEl = document.querySelector(formSelector);

  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    for (const [name, value] of formData) {
      console.log(name, value)
    }
    // todo validation

    fetch(url, {method: "POST", body: formData})
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  })
}

export default feedbackFormInit;