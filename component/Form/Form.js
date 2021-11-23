import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import { Valid } from "../../utils/Valid";
import MapData from "./MapData";
import "mapbox-gl/dist/mapbox-gl.css";

const FormControl = ({ user }) => {
  // User Data Store
  const [mapInfo, setMapInfo] = useState(null);
  const initialState = { userId: "", title: "", body: "" };
  const [formInfo, setFormInfo] = useState(initialState);

  // Handling Event OnChange
  const handleChange = (e) => {
    setMessage(null);
    const { name, value } = e.target;
    setFormInfo({ ...formInfo, [name]: value });
  };

  const handleMapData = (u) => {
    setFormInfo({ ...formInfo, userId: u.id });
    setMessage(null)
    setMapInfo(u.address.geo);
  };

  const [message, setMessage] = useState(null);

  // Submitting Post
  const handleSubmit = (e) => {
    e.preventDefault();

    // Error Handling
    const check = Valid(formInfo);
    if (check.errLength > 0) {
      setMessage(check.errMsg);
    } else {
      setMessage(["...Loading..."]);
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formInfo),
      })
        .then((res) => res.json())
        .then((data) => setMessage(["Post Submitted"]))
        .catch((err) => {
          setError([err]);
        });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.usersList}>
          {user.map((u) => (
            <button
              className={`${styles.userButton} ${
                formInfo.userId == u.id && styles.selected
              }`}
              key={u.id}
              onClick={() => handleMapData(u)}
            >
              {u.name}
            </button>
          ))}
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formData}>
            {/* Showing Error */}
            {message?.length > 0 &&
              message.map((error) => <p className={styles.error}>{error}</p>)}

            <label className={styles.label}>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className={styles.formField}
              onChange={handleChange}
            />
            <label className={styles.label}>Body</label>
            <input
              type="text"
              name="body"
              placeholder="Body"
              className={styles.formField}
              onChange={handleChange}
            />
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </div>
          {mapInfo && <MapData mapInfo={mapInfo} />}
        </form>
      </div>
    </>
  );
};

export default FormControl;
