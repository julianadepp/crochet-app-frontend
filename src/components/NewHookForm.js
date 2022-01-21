import React, { useState } from "react";
const initialHook = {
  hook_image: null,
  size: "",
};

let url = "hooks/";

const metricChoices = [
  { value: 1, label: ".75 mm" },
  { value: 2, label: ".85 mm" },
  { value: 3, label: "1 mm" },
  { value: 4, label: "1.1 mm" },
  { value: 5, label: "1.25 mm" },
  { value: 6, label: "1.3 mm" },
  { value: 7, label: "1.4 mm" },
  { value: 8, label: "1.5 mm" },
  { value: 9, label: "1.65 mm" },
  { value: 10, label: "1.75 mm" },
  { value: 11, label: "1.8 mm" },
  { value: 12, label: "1.9 mm" },
  { value: 13, label: ".75 mm" },
  { value: 14, label: "2.1 mm" },
  { value: 15, label: "2.25 mm" },
  { value: 16, label: "2.5 mm" },
  { value: 17, label: "2.75 mm" },
  { value: 18, label: "3 mm" },
  { value: 19, label: "3.25 mm" },
  { value: 20, label: "3.5 mm" },
  { value: 21, label: "3.75 mm" },
  { value: 22, label: "4 mm" },
  { value: 23, label: "4.25 mm" },
  { value: 24, label: "4.5 mm" },
  { value: 25, label: "5 mm" },
  { value: 26, label: "5.5 mm" },
  { value: 27, label: "6 mm" },
  { value: 28, label: "6.5 mm" },
  { value: 29, label: "7 mm" },
  { value: 30, label: "7.5 mm" },
  { value: 31, label: "8 mm" },
  { value: 32, label: "9 mm" },
  { value: 33, label: "10 mm" },
  { value: 34, label: "12 mm" },
  { value: 35, label: "15 mm" },
  { value: 36, label: "16 mm" },
  { value: 37, label: "19 mm" },
  { value: 38, label: "25 mm" },
];
const usChoices = [
  { value: 15, label: "Size B/1" },
  { value: 17, label: "Size C/2" },
  { value: 19, label: "Size D/3" },
  { value: 20, label: "Size E/4" },
  { value: 21, label: "Size F/5" },
  { value: 22, label: "Size G/6" },
  { value: 24, label: "Size 7" },
  { value: 25, label: "Size H/8" },
  { value: 26, label: "Size I/9" },
  { value: 27, label: "Size J/10" },
  { value: 28, label: "Size K/10.5" },
  { value: 31, label: "Size L/11" },
  { value: 32, label: "Size M/13" },
  { value: 33, label: "Size N/15" },
  { value: 35, label: "Size P" },
  { value: 36, label: "Size Q" },
  { value: 37, label: "Size S" },
  { value: 38, label: "Size U" },
];
const hookChoices = [{ Metric: metricChoices }, { US: usChoices }];

function NewHookForm({ hooks, setHooks }) {
  const options = {
    method: "POST",
  };
  const [errors, setErrors] = useState({});
  const [hookForm, setHookForm] = useState(initialHook);
  const [imageFile, setImageFile] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setHookForm({ ...hookForm, [e.target.name]: e.target.value, /* size_name: e.target.selectedOptions[0].innerText */ });
    console.log(e.target.selectedOptions[0].innerText);
  }
  function handleImage(e) {
    setImageFile({ [e.target.name]: e.target.files[0] });
    console.log(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(imageFile.hook_image)
    console.log(hookForm);
    let formdata = new FormData();
    formdata.append('hook_image', imageFile.hook_image, imageFile.hook_image.name)
    formdata.append('size', hookForm.size)
    /* formdata.append('size_name', hookForm.size_name) */

    fetch(process.env.REACT_APP_API + url, {
      ...options,
      body: formdata,
    })
      .then((res) => {
        const json = res.json();
        if (res.ok) {
          setErrors({});
          return json;
        } else {
          return json.then((err) => {
            const errors = { errors: err, status: res.status };
            setErrors(errors);
            return errors;
          });
        }
      })
      .then((json) => {
        if (!("errors" in json)) {
            setHooks((hooks) => [...hooks, json]) 
            setSubmitted(true)};
      }); 
  }

  return (
    <div>
      <h2>Add a New Hook</h2>
      <form onSubmit={handleSubmit}>
        <label>
          image of hook
          <input
            onChange={handleImage}
            type="file"
            accept="image/png, image/jpeg"
            name="hook_image"
            id="hook_image"
          ></input>
        </label>{" "}
        <br />
        <label>
          hook size
          <select name="size" onChange={handleChange}>
            {metricChoices.map((choice) => (
              <option value={choice.value}>{choice.label}</option>
            ))}
          </select>
        </label>
        <button>sumbit</button>
        {(submitted)?<p>success!</p>:<p>something went wrong...</p>}
      </form>
    </div>
  );
}

export default NewHookForm;
