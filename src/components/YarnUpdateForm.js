import React, { useState } from "react";

function YarnUpdateForm({ thisYarn, setThisYarn, hooks }) {
  const [yarnForm, setYarnForm] = useState(thisYarn);
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);


  function handleChange(e) {
    setYarnForm({
      ...yarnForm,
      [e.target.name]:
        e.target.value /* size_name: e.target.selectedOptions[0].innerText */,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(yarnForm);
    let formdata = new FormData();
    formdata.append("weight_description", yarnForm.weight_description);
    formdata.append("yarn_image", yarnForm.yarn_image);
    formdata.append("weight", yarnForm.weight);
    formdata.append("nickname", yarnForm.nickname);
    formdata.append("material", yarnForm.material);
    formdata.append("yarn_image", yarnForm.yarn_image);
    formdata.append("hooks", yarnForm.hooks);
    fetch(process.env.REACT_APP_API + "yarns/" + thisYarn.id, {
      method: "PATCH",
      body: formdata,
    })
      .then((res) => {
        const json = res.json();
        if (res.ok) {
          setError({});
          return json;
        } else {
          return json.then((err) => {
            const errors = { errors: err, status: res.status };
            setError(errors);
            console.log(errors);
            return errors;
          });
        }
      })
      .then((json) => {
        if (!("errors" in json)) {
          setThisYarn(json);
          setSubmitted(true);
        } else {
          console.log(error);
        }
      });
  }
  console.log(yarnForm.suggested_hooks, yarnForm.hooks)
  return (
    <div>
      <h2>Update yarn</h2>
      <form onSubmit={handleSubmit}>
        <label>
          image of yarn
          <input
            onChange={handleChange}
            type="text"
            name="yarn_image"
            id="yarn_image"
            value={yarnForm.yarn_image}
          ></input>
        </label>
        <br />
        <label>
          Weight:
          <input
            onChange={handleChange}
            type="text"
            name="weight"
            id="weight"
            value={yarnForm.weight}
          ></input>
        </label>
        <br />
        <label>
          material:
          <input
            onChange={handleChange}
            type="text"
            name="material"
            id="material"
            value={yarnForm.material}
          ></input>
        </label>
        <br />
        <label>
          nickname:
          <input
            onChange={handleChange}
            type="text"
            name="nickname"
            id="nickname"
            value={yarnForm.nickname}
          ></input>
        </label>
        <br />
        <label>
          suggested hooks:
          <select
            name="hooks"
            multiple={true}
            onChange={handleChange}
          >
            {hooks.map((choice) => (
              <option value={choice.id}>{choice.size_name}</option>
            ))}
          </select>
        </label>
        <button>Update</button>
        {submitted ? <p>success!</p> : <p>click update!!</p>}
      </form>
    </div>
  );
}

export default YarnUpdateForm;
