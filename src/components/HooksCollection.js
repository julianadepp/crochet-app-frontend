import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import HookInfo from "./HookInfo";
import NewHookForm from "./NewHookForm";

function HooksCollection({ hooks, setHooks, showInfo, setShowInfo }) {
  const initHook = {
    id: "",
    size: "",
    size_name: "",
    hook_image: "",
    yarns: [],
  };

  const [thisHook, setThisHook] = useState(initHook);
  const url = process.env.REACT_APP_API;
  useEffect(() => {
    fetch(url + "hooks/")
      .then((res) => res.json())
      .then((json) => {
        setHooks(json);
      })
      .catch((err) =>
        console.log("You probably made a mistake somewhere! ", err)
      );
  }, [thisHook.id]);
  console.log(hooks);

  function getId(e) {
    setThisHook({ ...thisHook, id: e.currentTarget.id });
    setShowInfo(true);
    console.log(e.currentTarget.id, "clickedhook:", thisHook);
  }

  return (
    <div>
      <h2>Hooks </h2>
      {hooks.map((hook) => {
        return (
          <div id={hook.id} onClick={getId}>
            <Link to={`/hooks/${hook.id}`}>
              <h3>{hook.size_name}</h3>
              <img width="100px" src={hook.hook_image} alt="hook"></img>
            </Link>
          </div>
        );
      })}
      <div>
        {showInfo ? (
          <Route
            path="/hooks/:id"
            render={() => (
              <HookInfo thisHook={thisHook} setThisHook={setThisHook} />
            )}
          />
        ) : null}
        <Route
          path="/hooks/new"
          render={() => (
            <NewHookForm
              thisHook={thisHook}
              setThisHook={setThisHook}
              hooks={hooks}
              setHooks={setHooks}
              setShowInfo={setShowInfo}
            />
          )}
        />
      </div>
    </div>
  );
}

export default HooksCollection;
