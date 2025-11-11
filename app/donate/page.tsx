// app/donate/page.tsx
export const metadata = {
  title: "Donate — MDSS",
  description: "Support MDSS — bank details, donation options and 80G information.",
};

export default function Donate() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-red-800 mb-6">Donate</h1>

      <p className="mb-4">Your contributions help us run education, health and relief programs.</p>

      <h2 className="text-2xl font-semibold mt-4">Bank Transfer</h2>
      <p>Bank: INDIAN BANK</p>
      <p>Account Name: MAA DURGA SEWA SANSTHAN TRUST</p>
      <p>Account No: 8123421647</p>
      <p>IFSC: IDIB000P651</p>
      <p>PAN: AAKTM1699R. Donations eligible for 80G relief.</p>

      <h2 className="text-2xl font-semibold mt-6">Online Donations (future)</h2>
      <p>We will add online donation gateway (Razorpay/PayPal) soon. For now please use bank transfer or contact info@mdsst.org</p>
    </div>
  );
}
