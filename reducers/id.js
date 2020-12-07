export default function (id = "", action) {
  if (action.type === "userdata") {
    return action.id;
  } else {
    return id;
  }
}
