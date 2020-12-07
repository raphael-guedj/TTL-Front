export default function (pseudo = "", action) {
  if (action.type === "userdata") {
    return action.pseudo;
  } else {
    return pseudo;
  }
}
