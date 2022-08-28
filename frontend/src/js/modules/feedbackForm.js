function feedbackFormInit(formSelector, url) {
  const formEl = document.querySelector(formSelector);

  formEl.addEventListener("click", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    // todo validation

    fetch(url, {method: "POST", body: formData})
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  })
}

export default feedbackFormInit;