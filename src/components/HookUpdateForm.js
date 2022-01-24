import React, { useEffect, useState } from "react";

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

function HookUpdateForm({ thisHook, setThisHook, setCurrentId }) {
  const [hookForm, setHookForm] = useState(thisHook);
  const [imageFile, setImageFile] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setHookForm({
      ...hookForm,
      [e.target.name]:
        e.target.value /* size_name: e.target.selectedOptions[0].innerText */,
    });
  }
  function handleImage(e) {
    setImageFile({ [e.target.name]: e.target.files[0] });
    console.log(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(imageFile);
    console.log(hookForm);
    let formdata = new FormData();
    formdata.append("size", hookForm.size);
    if(imageFile.hook_image){formdata.append(
        "hook_image",
        imageFile.hook_image,
    )}
    
    fetch(process.env.REACT_APP_API + "hooks/" + thisHook.id, {
      method: "PATCH",
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
            console.log(errors)
            return errors;
          });
        }
      })
      .then((json) => {
        if (!("errors" in json)) {
            console.log(imageFile)
          setThisHook(json);
          setSubmitted(true);
        }else{console.log(imageFile, e.target.files);
        }
      })
  }

  return (
    <div>
      <h2>Update Hook</h2>
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
        </label>
        <br />
        <label>
          hook size
          <select name="size" value={hookForm.size} onChange={handleChange}>
            {metricChoices.map((choice) => (
              <option value={choice.value}>{choice.label}</option>
            ))}
          </select>
        </label>
        <button>Update</button>
        {submitted ? <p>success!</p> : <p>click update!!</p>}
      </form>
    </div>
  );
}

export default HookUpdateForm;
