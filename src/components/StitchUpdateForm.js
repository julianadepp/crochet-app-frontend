import React, { useState } from 'react';

function StitchUpdateForm({ thisStitch, setThisStitch, stitches }) {
    const [stitchForm, setStitchForm] = useState(thisStitch);
  const [imageFile, setImageFile] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setStitchForm({
      ...stitchForm,
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
    console.log(stitchForm);
    let formdata = new FormData();
    formdata.append("name", stitchForm.name);
    formdata.append("instructions", stitchForm.instructions);
    formdata.append("description", stitchForm.description);
    formdata.append("pattern_code", stitchForm.pattern_code);
    formdata.append("notes", stitchForm.notes);
    if(stitchForm.related_stitches){
    formdata.append("related_stitches", stitchForm.related_stitches)}
    else{formdata.append("related_stitches", null)};

    if(imageFile.stitch_image){formdata.append(
        "stitch_image",
        imageFile.stitch_image,
    )}
    
    fetch(process.env.REACT_APP_API + "stitches/" + thisStitch.id, {
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
          setThisStitch(json);
          setSubmitted(true);
        }else{console.log(imageFile, e.target.files);
        }
      })
  }

    return (
        <div>
            <h2>Update stitch</h2>
      <form onSubmit={handleSubmit}>
        <label>
          image of stitch
          <input
            onChange={handleImage}
            type="file"
            accept="image/png, image/jpeg"
            name="stitch_image"
            id="stitch_image"
          ></input>
        </label>
        <br />
        <label>
          name:
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            value={stitchForm.name}
          ></input>
        </label>
        <br />
        <label>
          pattern_code:
          <input
            onChange={handleChange}
            type="text"
            name="pattern_code"
            id="pattern_code"
            value={stitchForm.pattern_code}
          ></input>
        </label>
        <br />
        <label>
          instructions:
          <input
            onChange={handleChange}
            type="text"
            name="instructions"
            id="instructions"
            value={stitchForm.instructions}
          ></input>
        </label>
        <br />
        <label>
          description:
          <input
            onChange={handleChange}
            type="text"
            name="description"
            id="description"
            value={stitchForm.description}
          ></input>
        </label>
        <br />
        <label>
          notes:
          <input
            onChange={handleChange}
            type="text"
            name="notes"
            id="notes"
            value={stitchForm.notes}
          ></input>
        </label>
        <br />
        <label>
          related stitches:
          <select
            name="related_stitches"
            multiple={true}
            onChange={handleChange}
          >
            {stitches.map((choice) => (
              <option value={choice.id}>{choice.name}</option>
            ))}
          </select>
        </label>
        <button>Update</button>
        {submitted ? <p>success!</p> : <p>click update!!</p>}
      </form>
        </div>
    );
}

export default StitchUpdateForm;