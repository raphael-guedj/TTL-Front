export default function (token = "", action) {
  if (action.type === "userdata") {
    console.log(action.token);
    return action.token;
  } else if (action.type === "getToken") {
    console.log(action);
  } else {
    return token;
  }
}
