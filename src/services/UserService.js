export async function loginAPI(auth) {
  try {
    const response = await fetch("http://localhost:8080/apis/v1/login", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
    });
    if (response.status === 200) return response.json();
    return response.status;
  } catch (error) {
    return 503;
  }
}

export async function registerAPI(body) {
  try {
    const response = await fetch("http://localhost:8080/apis/v1/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body,
    });
    return response.status;
  } catch (error) {
    return 503;
  }
}

export async function buyAPI(auth, body) {
  try {
    const response = await fetch("http://localhost:8080/apis/v1/buy", {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-type": "application/json",
      },
      body,
    });
    return response.json();
  } catch (error) {
    return 503;
  }
}

export async function addDepositAPI(auth, body) {
  try {
    const response = await fetch("http://localhost:8080/apis/v1/deposit", {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-type": "application/json",
      },
      body,
    });
    if (response.status === 200) return response.json();
    return response.status;
  } catch (error) {
    return 503;
  }
}

export async function resetDepositAPI(auth) {
  try {
    const response = await fetch("http://localhost:8080/apis/v1/reset", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
    });
    if (response.status === 200) return response.json();
    return response.status;
  } catch (error) {
    return 503;
  }
}
