import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function NewGaugeForm({ hooks, yarns, stitches, setGauges, thisGauge, setThisGauge, setShowGaugeInfo }) {
    console.log(hooks)
    console.log(yarns)
    console.log(stitches)
    const initGauge = {
        id: "",
        title: "",
        yarn: "",
        hook: "",
        stitch: "",
        number_of_stitches: '',
        notes: '',
        gauge_image: "",
      };
      const options = {
        method: "POST",
      };
      const [errors, setErrors] = useState({});
      const [gaugeForm, setGaugeForm] = useState(initGauge);
      const [imageFile, setImageFile] = useState({})
      const [submitted, setSubmitted] = useState(false)
    console.log(submitted, thisGauge.id)
      function handleChange(e) {
        setGaugeForm({ ...gaugeForm, [e.target.name]: e.target.value, /* size_name: e.target.selectedOptions[0].innerText */ });
      }
      function handleImage(e) {
        setImageFile({ [e.target.name]: e.target.files[0] });
        console.log(e.target.files[0]);
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        console.log(imageFile.gauge_image)
        console.log(gaugeForm);
        let formdata = new FormData();
        formdata.append('gauge_image', imageFile.gauge_image, imageFile.gauge_image.name)
        formdata.append('title', gaugeForm.title)
        formdata.append('yarn_id', gaugeForm.yarn_id)
        formdata.append('stitch_id', gaugeForm.stitch_id)
        formdata.append('hook_id', gaugeForm.hook_id)
        formdata.append('number_of_stitches', gaugeForm.number_of_stitches)
        formdata.append('notes', gaugeForm.notes)
        formdata.append('size', gaugeForm.size)

    
        fetch(process.env.REACT_APP_API + 'gauges/', {
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
                console.log(json.id)
                setGauges((gauges) => [...gauges, json])
                setThisGauge(json)
                setShowGaugeInfo(true)
                setSubmitted(true)};
          }); 
      }
    return (
        <div>
            <h2>Add a New gauge</h2>
      <form onSubmit={handleSubmit}>
        <label>
          image of gauge
          <input
            onChange={handleImage}
            type="file"
            accept="image/png, image/jpeg"
            name="gauge_image"
            id="gauge_image"
          ></input>
        </label>{" "}
        <br />
        <label>
          title:
          <input
            onChange={handleChange}
            type="text"
            name="title"
            id="title"
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
          ></input>
        </label>
        <br />
        <label>
          number of stitches:
          <input
            onChange={handleChange}
            type="text"
            name="number_of_stitches"
            id="number_of_stitches"
          ></input>
        </label>
        <br />
        <label>
          hook:
          <select name="hook_id" onChange={handleChange}>
            {hooks.map((choice) => (
              <option value={choice.id}>{choice.size_name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
           yarn:
          <select
            name="yarn_id"
            onChange={handleChange}
          >
            {yarns.map((choice) => (
              <option value={choice.id}>{choice.nickname}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          stitch:
          <select
            name="stitch_id"
            onChange={handleChange}
          >
            {stitches.map((choice) => (
              <option value={choice.id}>{choice.name}</option>
            ))}
          </select>
        </label>
        <button>submit</button>
        {(submitted && thisGauge.id !== '')? <Redirect to={`/gauges/${thisGauge.id}`} />:<p>press submit to see your new gauge!</p>}
      </form>
        </div>
    );
}

export default NewGaugeForm;