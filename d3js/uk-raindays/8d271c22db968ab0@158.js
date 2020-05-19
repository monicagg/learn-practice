// https://observablehq.com/@mbostock/form-input@158
export function formInput(runtime, observer) {
  const iform = runtime.module();
  iform.variable(observer()).define(["md"], function(md){return(
md`# Form Input`
)});
  iform.variable(observer("viewof object")).define("viewof object", ["form","html"], function(form,html){return(
form(html`<form>
  <div><label><input name="title" type="text" value="Chart Title"> <i>type the title</i></label></div>
  <div>
    <label><input name="season" type="radio" value="win"> <i>winter</i></label>
    <label><input name="season" type="radio" value="spr" checked> <i>spring</i></label>
    <label><input name="season" type="radio" value="sum"> <i>summer</i></label>
    <label><input name="season" type="radio" value="aut"> <i>autumn</i></label>
    <label><input name="season" type="radio" value="year"> <i>whole year</i></label>
  </div>
</form>`)
)});
  iform.variable(observer("object")).define("object", ["Generators", "viewof object"], (G, _) => G.input(_));
  iform.variable(observer()).define(["object"], function(object){return(
object
)});
  iform.variable(observer()).define(["html","svg","object"], function(html,svg,object){return(
html`<svg
  width="640"
  height="64"
  viewBox="0 0 640 64"
  style="width:100%;max-width:640px;height:auto;display:block;"
>
  ${Object.assign(
    svg`<text
    x="50%"
    y="50%"
    text-anchor="middle" 
    dy="0.35em"
    font-size="larger"
  >`,
    {
      textContent: `${object.title} ${object.season}`
    }
  )}
</svg>`
)});
  iform.variable(observer()).define(["md"], function(md){return(
md`---
## Implementation`
)});
  iform.variable(observer("form")).define("form", ["html","formValue"], function(html,formValue){return(
function form(form) {
  const container = html`<div>${form}`;
  form.addEventListener("submit", event => event.preventDefault());
  form.addEventListener("change", () => container.dispatchEvent(new CustomEvent("input")));
  form.addEventListener("input", () => container.value = formValue(form));
  container.value = formValue(form);
  return container
}
)});
  iform.variable(observer("formValue")).define("formValue", function(){return(
function formValue(form) {
  const object = {};
  for (const input of form.elements) {
    if (input.disabled || !input.hasAttribute("name")) continue;
    let value = input.value;
    switch (input.type) {
      case "range":
      case "number": {
        value = input.valueAsNumber;
        break;
      }
      case "date": {
        value = input.valueAsDate;
        break;
      }
      case "radio": {
        if (!input.checked) continue;
        break;
      }
      case "checkbox": {
        if (input.checked) value = true;
        else if (input.name in object) continue;
        else value = false;
        break;
      }
      case "file": {
        value = input.multiple ? input.files : input.files[0];
        break;
      }
      case "select-multiple": {
        value = Array.from(input.selectedOptions, option => option.value);
        break;
      }
    }
    object[input.name] = value;
  }
  return object;
}
)});
  return iform;
}
