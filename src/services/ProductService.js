export async function getAvailableProductsAPI(auth) {
  try {
    const response = await fetch(
      "http://localhost:8080/apis/v1/available-products",
      {
        method: "GET",
        headers: {
          Authorization: auth,
        },
      }
    );
    return response.json();
  } catch (error) {
    return 503;
  }
}

export async function getOwnedProductsAPI(auth) {
  try {
    const response = await fetch(
      "http://localhost:8080/apis/v1/owned-products",
      {
        method: "GET",
        headers: {
          Authorization: auth,
        },
      }
    );
    return response.json();
  } catch (error) {
    return 503;
  }
}

export async function addProductAPI(auth, body) {
  try {
    const response = await fetch("http://localhost:8080/apis/v1/add-product/", {
      method: "PUT",
      headers: {
        Authorization: auth,
        "Content-type": "application/json",
      },
      body,
    });
    return response.status;
  } catch (error) {
    return 503;
  }
}

export async function updateProductAPI(auth, id, body) {
  try {
    const response = await fetch(
      "http://localhost:8080/apis/v1/update-product/" + id,
      {
        method: "POST",
        headers: {
          Authorization: auth,
          "Content-type": "application/json",
        },
        body,
      }
    );
    return response.status;
  } catch (error) {
    return 503;
  }
}

export async function deleteProductAPI(auth, id) {
  try {
    const response = await fetch(
      "http://localhost:8080/apis/v1/delete-product/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: auth,
        },
      }
    );
    return response.status;
  } catch (error) {
    return 503;
  }
}
