import { JsonParser } from "jackson-js";

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

export function eventParser(ev) {
  var info = "";

  switch (ev.event_type) {
    case "BUY":
      const product = new JsonParser().parse(ev.data).product_name;
      const amount = new JsonParser().parse(ev.data).product_amount;
      const price = (
        new JsonParser().parse(ev.data).total_spent /
        new JsonParser().parse(ev.data).product_amount /
        100
      ).toFixed(2);
      const change_5 =
        new JsonParser().parse(ev.data).change["5"].toFixed(0) + "x 5¢";
      const change_10 =
        new JsonParser().parse(ev.data).change["10"].toFixed(0) + "x 10¢";
      const change_20 =
        new JsonParser().parse(ev.data).change["20"].toFixed(0) + "x 20¢";
      const change_50 =
        new JsonParser().parse(ev.data).change["50"].toFixed(0) + "x 50¢";
      const change_100 =
        new JsonParser().parse(ev.data).change["100"].toFixed(0) + "x $1";
      const change =
        change_5 +
        ", " +
        change_10 +
        ", " +
        change_20 +
        ", " +
        change_50 +
        ", " +
        change_100;
      info = (
        <p>
          <u>Product:</u> {product} <br />
          <u>Amount:</u> {amount} <br />
          <u>Price:</u> {price} <br />
          <u>Change:</u> {change}
        </p>
      );
      break;
    case "DEPOSIT":
      const fives = new JsonParser()
        .parse(ev.data)
        .denominations_added["5 cents"].toFixed(0);
      const tens = new JsonParser()
        .parse(ev.data)
        .denominations_added["10 cents"].toFixed(0);
      const twenties = new JsonParser()
        .parse(ev.data)
        .denominations_added["20 cents"].toFixed(0);
      const fifties = new JsonParser()
        .parse(ev.data)
        .denominations_added["50 cents"].toFixed(0);
      const hundreds = new JsonParser()
        .parse(ev.data)
        .denominations_added["100 cents"].toFixed(0);
      info = (
        <p>
          Denominations added: <br />
          <u>5¢:</u> {fives}
          <br />
          <u>10¢:</u> {tens}
          <br />
          <u>20¢:</u> {twenties}
          <br />
          <u>50¢:</u> {fifties}
          <br />
          <u>$100:</u> {hundreds}
        </p>
      );
      break;
    case "ADD_PRODUCT":
      const name = new JsonParser().parse(ev.data).product.name;
      const amount_available = new JsonParser().parse(ev.data).product
        .amount_available;
      const cost = (new JsonParser().parse(ev.data).product.cost / 100).toFixed(
        2
      );
      info = (
        <p>
          Product Added: <br />
          <u>Name:</u> {name} <br />
          <u>Amount:</u> {amount_available} <br />
          <u>Cost:</u> ${cost} <br />
        </p>
      );
      break;
    case "EDIT_PRODUCT":
      const new_amount_available = new JsonParser().parse(
        ev.data
      ).amount_available;
      const new_cost = (new JsonParser().parse(ev.data).cost / 100).toFixed(2);
      info = (
        <p>
          Product Updated: <br />
          <u>Amount:</u> {new_amount_available} <br />
          <u>Cost:</u> ${new_cost} <br />
        </p>
      );
      break;
    case "DELETE_PRODUCT":
      info = (
        <p>
          <u>Product Deleted:</u> {ev.data}
        </p>
      );
      break;
    default:
  }
  return info;
}
