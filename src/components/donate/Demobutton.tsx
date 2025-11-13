import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment = () => {
  const handlePayment = async () => {
  try {
    const res = await axios.post("http://localhost:3000/process/payment", {
      amount: 500,
    });

    const { key, order } = res.data;

    const options = {
      key,
      amount: order.amount,
      currency: order.currency,
      name: "Daafi Donation",
      description: "Support a cause via Daafi",
      order_id: order.id,
      handler: async function (response: any) {
        const verifyRes = await axios.post("http://localhost:3000/verify-payment", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        if (verifyRes.data.success) {
          alert("✅ Payment successful!");
        } else {
          alert("❌ Payment verification failed.");
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error: any) {
    console.error("Error while initiating payment:", error.response?.data || error.message);
    alert("Error while initiating payment — check console for details");
  }
};


  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-xl mb-4">Donate with Razorpay</h2>
      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Pay ₹5
      </button>
    </div>
  );
};
export default Payment;