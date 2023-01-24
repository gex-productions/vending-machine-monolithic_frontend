export async function getEventsAPI(auth) {
  try {
    const response = await fetch("http://localhost:8080/apis/v1/events", {
      method: "GET",
      headers: {
        Authorization: auth,
      },
    });
    return response.json();
  } catch (error) {
    return 503;
  }
}
