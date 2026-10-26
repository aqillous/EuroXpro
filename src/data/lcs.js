const countries = {
  Türkiye: ["Ankara", "Istanbul", "Izmir", "Antalya", "Bursa"],
  Germany: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt"],
  France: ["Paris", "Lyon", "Toulouse", "Lille"],
  Italy: ["Rome", "Milan", "Bologna", "Turin"],
  Spain: ["Madrid", "Barcelona", "Valencia", "Seville"],
  Poland: ["Warsaw", "Krakow", "Wroclaw", "Gdansk"],
  Romania: ["Bucharest", "Cluj-Napoca", "Timisoara"],
  Netherlands: ["Amsterdam", "Rotterdam", "Utrecht"],
  "United Kingdom": ["London", "Manchester", "Bristol"],
  Greece: ["Athens", "Thessaloniki"],
  Portugal: ["Lisbon", "Porto"],
  Czechia: ["Prague", "Brno"],
  Hungary: ["Budapest", "Szeged"],
  Austria: ["Vienna", "Graz"],
  Belgium: ["Brussels", "Leuven"],
};
const additionalCities = {
  Türkiye: ["Adana", "Eskisehir"],
  Germany: ["Stuttgart", "Dusseldorf"],
  France: ["Marseille"],
  Italy: ["Florence"],
  Spain: ["Malaga"],
  Poland: ["Lodz"],
  Romania: ["Iasi"],
  Netherlands: ["Eindhoven"],
  "United Kingdom": ["Birmingham", "Edinburgh"],
  Greece: ["Patras"],
  Portugal: ["Coimbra"],
  Czechia: ["Ostrava"],
  Hungary: ["Debrecen"],
  Austria: ["Linz"],
  Belgium: ["Antwerp"],
};
let extraLcId = 100;
export const lcs = Object.entries(countries).flatMap(([mc, names], i) =>
  [
    ...names.map((city, j) => ({ city, id: i * 5 + j + 1 })),
    ...(additionalCities[mc] || []).map((city) => ({ city, id: ++extraLcId })),
  ].map(({ city, id: n }) => {
    let goal = 75 + ((n * 17) % 145),
      approved = Math.round(goal * (0.48 + ((n * 13) % 55) / 100));
    return {
      id: "lc-" + n,
      name: "AIESEC in " + city,
      city,
      mc,
      goal,
      approved,
      weeklyChange: ((n * 7) % 19) - 6,
      trend: Array.from({ length: 12 }, (_, w) =>
        Math.round(
          approved * ((w + 1) / 12) * (0.85 + ((n + w * 7) % 20) / 100),
        ),
      ),
      funnel: {
        Applied: approved + 110,
        Accepted: approved + 70,
        Approved: approved,
        Realized: Math.round(approved * 0.68),
        Finished: Math.round(approved * 0.51),
        Completed: Math.round(approved * 0.43),
      },
      programmes: {
        GV: Math.round(approved * 0.62),
        GT: Math.round(approved * 0.25),
        GTe: Math.round(approved * 0.13),
      },
    };
  }),
);
