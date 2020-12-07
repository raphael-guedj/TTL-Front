export default function (token = "", action) {
  if (action.type === "userdata") {
    return action.token;
  } else {
    return token;
  }
}
