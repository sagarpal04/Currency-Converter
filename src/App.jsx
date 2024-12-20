import { useEffect, useState } from "react";

const App = () => {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("USD");
  const [output, setOutput] = useState(null);

  useEffect(() => {
    async function converter() {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const data = await res.json();
        setOutput(data.rates[to]);
      } catch (error) {
        console.error("Error fetching conversion rates:", error);
      }
    }

    if (from === to || !amount) {
      setOutput(amount);
      return;
    }
    converter();
  }, [from, to, amount]);

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value) || "")}
          type="text"
          placeholder="Amount"
          className="border-2 border-black rounded-md"
        />
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border-2 border-black rounded-md"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border-2 border-black rounded-md"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      {amount && (
        <h2 className="ml-2">
          Output: {output !== null ? `${output} ${to}` : ""}
        </h2>
      )}
    </div>
  );
};

export default App;
