import { useMemo, useState } from "react";

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
}
