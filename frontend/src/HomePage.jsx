import { useMemo, useState } from "react";
import AuthSection from "./AuthSection";

const deals = [
  {
    id: 1,
    name: "Skyline Terrace",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    location: "თბილისი, ვაკე",
    maxDiscount: 30,
    peopleRule: "4+ ადამიანზე -20%",
    description: "ევროპული სამზარეულო და ქალაქის ხედები",
  },
  {
    id: 2,
    name: "Grill House",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
    location: "თბილისი, საბურთალო",
    maxDiscount: 25,
    peopleRule: "2+ ადამიანზე -15%",
    description: "ბურგერები და გრილი",
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

export default function HomePage({ user, onLogin, onLogout }) {
  const [people, setPeople] = useState(2);
  const [amount, setAmount] = useState(80);
  const [showLogout, setShowLogout] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");

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

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowLogout((prev) => !prev)}
                className="flex items-center gap-2 rounded-2xl bg-[#FF6B35] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02]"
              >
                <span className="text-base">👤</span>
                <span className="hidden sm:inline">{user?.name}</span>
              </button>

              {showLogout && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5">
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
                    className="w-full px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    გასვლა
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuth(true);
                }}
                className="rounded-2xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700"
              >
                შესვლა
              </button>

              <button
                onClick={() => {
                  setAuthMode("register");
                  setShowAuth(true);
                }}
                className="rounded-2xl bg-[#FF6B35] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02]"
              >
                რეგისტრაცია
              </button>
            </div>
          )}
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
                დაჯავშნე მაგიდა და მიიღე ფასდაკლება საუკეთესო რესტორნებში
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/75 md:text-lg">
                BiteDeal გაძლევს შესაძლებლობას მარტივად იპოვო რესტორნები, ნახო
                აქტიური შეთავაზებები და დაზოგო თანხა შენს მეგობრებთან ერთად.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#deals"
                  className="rounded-2xl bg-[#FF6B35] px-6 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02]"
                >
                  შეთავაზებების ნახვა
                </a>

                {!user && (
                  <button
                    onClick={() => {
                      setAuthMode("register");
                      setShowAuth(true);
                    }}
                    className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    დარეგისტრირდი
                  </button>
                )}
              </div>
            </div>

            <div className="relative z-10">
              <div className="rounded-[32px] bg-white p-6 shadow-2xl ring-1 ring-black/5 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">
                  ფასდაკლების კალკულატორი
                </p>

                <h2 className="mt-3 text-3xl font-bold text-[#111111]">
                  გამოთვალე რამდენს დაზოგავ
                </h2>

                <div className="mt-8 space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-600">
                        ადამიანები
                      </label>
                      <span className="text-sm font-bold text-[#111111]">
                        {people}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={people}
                      onChange={(e) => setPeople(Number(e.target.value))}
                      className="w-full accent-[#FF6B35]"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-600">
                        შეკვეთის თანხა
                      </label>
                      <span className="text-sm font-bold text-[#111111]">
                        ₾{amount}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="300"
                      step="10"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full accent-[#FF6B35]"
                    />
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-[#f8f8f8] p-4">
                    <p className="text-xs text-gray-500">ფასდაკლება</p>
                    <p className="mt-2 text-2xl font-bold text-[#111111]">
                      {discount}%
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#f8f8f8] p-4">
                    <p className="text-xs text-gray-500">დაზოგვა</p>
                    <p className="mt-2 text-2xl font-bold text-[#2ECC71]">
                      ₾{savings}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#f8f8f8] p-4">
                    <p className="text-xs text-gray-500">საბოლოო</p>
                    <p className="mt-2 text-2xl font-bold text-[#111111]">
                      ₾{finalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {showAuth && !user && (
          <section className="mx-auto max-w-7xl px-6 py-10">
            <div className="mx-auto max-w-md rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-black/5">
              <div className="mb-4 flex gap-2">
                <button
                  onClick={() => setAuthMode("login")}
                  className={`flex-1 rounded-xl px-4 py-2 ${
                    authMode === "login"
                      ? "bg-[#FF6B35] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  შესვლა
                </button>

                <button
                  onClick={() => setAuthMode("register")}
                  className={`flex-1 rounded-xl px-4 py-2 ${
                    authMode === "register"
                      ? "bg-[#FF6B35] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  რეგისტრაცია
                </button>
              </div>

              <AuthSection
                mode={authMode}
                onLogin={onLogin}
                onClose={() => setShowAuth(false)}
              />
            </div>
          </section>
        )}

        <section id="featured" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">
              პოპულარული
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              გამორჩეული ადგილები
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
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

                  <div className="mt-4 inline-flex rounded-full bg-[#fff3ee] px-3 py-1.5 text-xs font-semibold text-[#FF6B35]">
                    {deal.peopleRule}
                  </div>

                  <button className="mt-5 w-full rounded-2xl bg-[#111111] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#FF6B35]">
                    დეტალების ნახვა
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">
                როგორ მუშაობს
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                სამი მარტივი ნაბიჯი
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-[28px] bg-[#f8f8f8] p-6 ring-1 ring-black/5">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B35] text-lg font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-bold text-[#111111]">
                  აირჩიე რესტორანი
                </h3>
                <p className="mt-3 leading-7 text-gray-600">
                  ნახე აქტიური შეთავაზებები და იპოვე შენთვის სასურველი ადგილი.
                </p>
              </div>

              <div className="rounded-[28px] bg-[#f8f8f8] p-6 ring-1 ring-black/5">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B35] text-lg font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-bold text-[#111111]">
                  დაჯავშნე მარტივად
                </h3>
                <p className="mt-3 leading-7 text-gray-600">
                  მიუთითე სტუმრების რაოდენობა და მიიღე შესაბამისი ფასდაკლება.
                </p>
              </div>

              <div className="rounded-[28px] bg-[#f8f8f8] p-6 ring-1 ring-black/5">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B35] text-lg font-bold text-white">
                  3
                </div>
                <h3 className="text-xl font-bold text-[#111111]">
                  დაზოგე თანხა
                </h3>
                <p className="mt-3 leading-7 text-gray-600">
                  მიდი რესტორანში და ისარგებლე შეთავაზებით ზედმეტი სირთულის
                  გარეშე.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
