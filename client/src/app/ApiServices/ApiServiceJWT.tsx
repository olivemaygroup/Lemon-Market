const BASE_URL = "http://localhost:3000";

interface ASJwt {
  login: (user: object) => void;
}

const apiServiceJWT: ASJwt = {
  login: (user: object) => {
    return fetch(`${BASE_URL}/login`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};

export default apiServiceJWT;
