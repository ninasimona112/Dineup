import React, { useMemo, useState } from "react";

const deals = [
  {
    id: 1,
    name: "Terrace Kitchen",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    location: "თბილისი, ვაკე",
    maxDiscount: 30,
    peopleRule: "4 ადამიანზე -20%",
    description: "ევროპული და ქართული სამზარეულო",
  },
  {
    id: 2,
    name: "Urban Grill",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    location: "თბილისი, საბურთალო",
    maxDiscount: 25,
    peopleRule: "100₾-ზე მეტი შეკვეთაზე -15%",
    description: "სტეიკები, ბურგერები და გრილი",
  },
  {
    id: 3,
    name: "Pasta Room",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    location: "თბილისი, ვერა",
    maxDiscount: 20,
    peopleRule: "2+ ადამიანზე -10%",
    description: "იტალიური კერძები და ღვინო",
  },
  {
    id: 4,
    name: "Garden Brunch",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    location: "თბილისი, ძველი თბილისი",
    maxDiscount: 35,
    peopleRule: "ლანჩზე -25%",
    description: "ბრანჩი, დესერტები და ყავა",
  },
];

function calculateDiscount(people, amount) {
  let peopleDiscount = 0;
  let amountDiscount = 0;

  if (people >= 2) peopleDiscount = 5;
  if (people >= 4) peopleDiscount = 10;
  if (people >= 6) peopleDiscount = 20;

  if (amount >= 50) amountDiscount = 5;
  if (amount >= 100) amountDiscount = 10;
  if (amount >= 200) amountDiscount = 15;

  return Math.max(peopleDiscount, amountDiscount);
}

export default function HomePage({ user, onLogout }) {
  const [people, setPeople] = useState(2);
  const [amount, setAmount] = useState(80);
  const [showLogout, setShowLogout] = useState(false);

  const discount = useMemo(
    () => calculateDiscount(people, amount),
    [people, amount],
  );
  const savings = useMemo(
    () => Math.round((amount * discount) / 100),
    [amount, discount],
  );
  const finalPrice = useMemo(() => amount - savings, [amount, savings]);

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#1f1f1f]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold tracking-tight text-[#111111]">
            BiteDeal
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#deals"
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              შეთავაზებები
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              როგორ მუშაობს
            </a>
            <a
              href="#featured"
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              პოპულარული
            </a>
          </nav>

          <div className="relative">
            <button
              onClick={() => setShowLogout(!showLogout)}
              className="flex items-center gap-2 rounded-2xl bg-[#FF6B35] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02]"
            >
              <span className="text-base">👤</span>
              <span className="hidden sm:inline">{user?.name}</span>
            </button>

            {showLogout && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-50">
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="text-sm text-gray-600">შენი ანგარიში</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setShowLogout(false);
                  }}
                  className="w-full px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition text-left"
                >
                  გასვლა
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#111111]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
            <div className="relative z-10">
              <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/90">
                ჭამე მეტი • გადაიხადე ნაკლები
              </div>

              <h1 className="max-w-xl text-4xl font-bold leading-tight text-white md:text-6xl">
                ჭკვიანი ფასდაკლებები კვების ობიექტებში
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-white/75 md:text-lg">
                ფასდაკლება იზრდება ადამიანების რაოდენობისა და შეკვეთის თანხის
                მიხედვით. აირჩიე ობიექტი, მიუთითე ბიუჯეტი და ნახე შენი
                შეთავაზება პირდაპირ.
              </p>

              <div className="mt-8 grid gap-4 rounded-[28px] bg-white p-5 shadow-2xl md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    ადამიანების რაოდენობა
                  </label>
                  <select
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#FF6B35]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                      <option key={value} value={value}>
                        {value} ადამიანი
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    ბიუჯეტი (₾)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#FF6B35]"
                    placeholder="მაგ: 120"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="rounded-3xl bg-[#f8f8f8] p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-sm text-gray-500">შენი ფასდაკლება</p>
                        <h3 className="mt-1 text-3xl font-bold text-[#111111]">
                          -{discount}%
                        </h3>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">დაზოგავ</p>
                        <h3 className="mt-1 text-2xl font-semibold text-[#2ECC71]">
                          {savings}₾
                        </h3>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">საბოლოო თანხა</p>
                        <h3 className="mt-1 text-2xl font-semibold text-[#111111]">
                          {finalPrice}₾
                        </h3>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-gray-600">
                      {people < 4
                        ? "თუ 4 ადამიანი იქნებით, შეგიძლია უფრო მაღალი ფასდაკლება მიიღო."
                        : amount < 100
                          ? "თუ ბიუჯეტი 100₾-ს გადააჭარბებს, შეთავაზება შეიძლება კიდევ გაიზარდოს."
                          : "შენ უკვე ერთ-ერთ კარგ შეთავაზებაში ხვდები."}
                    </p>
                  </div>
                </div>

                <button className="md:col-span-2 rounded-2xl bg-[#FF6B35] px-6 py-4 text-base font-semibold text-white transition hover:scale-[1.01] hover:shadow-lg">
                  შეთავაზებების ნახვა
                </button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
                alt="Food"
                className="h-[620px] w-full rounded-[36px] object-cover shadow-2xl"
              />
              <div className="absolute bottom-6 left-6 rounded-3xl bg-white p-5 shadow-xl">
                <p className="text-sm text-gray-500">
                  დღის პოპულარული შეთავაზება
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#111111]">
                  4 ადამიანზე -20%
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Terrace Kitchen • ვაკე
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">
              როგორ მუშაობს
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              მარტივი პროცესი 3 ნაბიჯში
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "აირჩიე ობიექტი",
                text: "ნახე აქტიური შეთავაზებები და შეარჩიე სასურველი კვების ობიექტი.",
                number: "01",
              },
              {
                title: "მიუთითე ხალხი და ბიუჯეტი",
                text: "შეიყვანე ადამიანების რაოდენობა და შეკვეთის სავარაუდო თანხა.",
                number: "02",
              },
              {
                title: "მიიღე ფასდაკლება",
                text: "სისტემა ავტომატურად გაჩვენებს შენთვის ხელმისაწვდომ შეთავაზებას.",
                number: "03",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5"
              >
                <div className="text-sm font-bold text-[#FF6B35]">
                  {item.number}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="featured" className="mx-auto max-w-7xl px-6 pb-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">
                პოპულარული
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                Featured შეთავაზებები
              </h2>
            </div>

            <button className="hidden rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:border-[#FF6B35] hover:text-[#FF6B35] md:block">
              ყველას ნახვა
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {deals.slice(0, 2).map((deal) => (
              <div
                key={deal.id}
                className="group overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-5 top-5 rounded-full bg-[#2ECC71] px-4 py-2 text-sm font-bold text-white">
                    -{deal.maxDiscount}% მდე
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-[#111111]">
                        {deal.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {deal.location}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-600">{deal.description}</p>

                  <div className="mt-5 inline-flex rounded-full bg-[#fff3ee] px-4 py-2 text-sm font-medium text-[#FF6B35]">
                    {deal.peopleRule}
                  </div>

                  <button className="mt-6 w-full rounded-2xl bg-[#111111] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#FF6B35]">
                    დეტალების ნახვა
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="deals" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">
              შეთავაზებები
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              ყველა აქტიური დილი
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="group overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-[#111111] px-3 py-1.5 text-xs font-semibold text-white">
                    -{deal.maxDiscount}% მდე
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#111111]">
                    {deal.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{deal.location}</p>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {deal.description}
                  </p>

                  <div className="mt-4 rounded-2xl bg-[#f8f8f8] px-4 py-3 text-sm font-medium text-[#FF6B35]">
                    {deal.peopleRule}
                  </div>

                  <button className="mt-5 w-full rounded-2xl bg-[#FF6B35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#e85b29]">
                    ნახვა
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="overflow-hidden rounded-[36px] bg-[#111111] px-8 py-12 text-center md:px-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">
              რესტორნებისთვის
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
              გაზარდე სტუმრების რაოდენობა და საშუალო ჩეკი
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/75">
              შეუერთდი პლატფორმას, სადაც ფასდაკლება მუშაობს როგორც ჭკვიანი
              გაყიდვების ინსტრუმენტი — არა უბრალოდ აქცია.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-2xl bg-[#FF6B35] px-6 py-4 text-sm font-semibold text-white transition hover:scale-[1.02]">
                პარტნიორობა
              </button>
              <button className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                გაიგე მეტი
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 BiteDeal. ყველა უფლება დაცულია.</p>
          <div className="flex gap-5">
            <a href="/" className="hover:text-black">
              კონფიდენციალურობა
            </a>
            <a href="/" className="hover:text-black">
              პირობები
            </a>
            <a href="/" className="hover:text-black">
              კონტაქტი
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
