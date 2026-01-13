import Image from "next/image";

export default function Home() {
  const name = "madrid";
  const country = {
    europe: "madrid",
    sea: "indonesia",
  };

  const score = {
    math: 10,
  };

  const newScore = score.math.toString();
  const color = "blue";

  if (color === "red") {
    ("Merah");
  } else {
    ("Bukan merah");
  }

  // untuk menampilkan data dalam array kita butuh .map()
  const car = ["honda", "ferrari", "toyota"];

  return (
    // class dalam jsx itu tidak ada
    <div>
      <p className="text-blue-500">JSX {name}</p>
      <h1>country: {country.sea}</h1>
      <h3>Score: {newScore}</h3>
      {/* conditional hanya boleh ternary */}
      <div>{color === "red" ? <h1>Merah</h1> : <h1>Bukan Merah</h1>}</div>
      <h1>tes</h1>
      <h1>
        {car.map((item, id) => (
          <div key={id}>
            <h1>{item}</h1>
          </div>
        ))}
      </h1>
    </div>
  );
}
