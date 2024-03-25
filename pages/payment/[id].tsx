import axios from "axios";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PaymentData {
  currency: string;
  amount: number;
  id: string;
}

declare global {
  interface Window {
    Razorpay: any; // Define Razorpay object type
  }
}

interface PrefillData {
  name: string;
  email: string;
  contact: number;
}

const Payment: React.FC = () => {
  const router = useRouter();
  
  const makePayment = async () => {
    const val = {
      id: router.query?.id as string | undefined,
    };

    try {
      const { data } = await axios.post<PaymentData>("/api/razorpay", val);

      const options = {
        key: process.env.RAZORPAY_KEY as string,
        name: "Mihir",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thank You !",
        handler: function (response: any) {}, // Adjust the type of response as needed
        prefill: {
          name: "Mihir",
          email: "mihir@gmail.com",
          contact: 987654321,
        } as PrefillData,
      };

      const paymentObj = window.Razorpay(options);
      paymentObj.open();
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  useEffect(() => {
    makePayment();
  }, []);

  return (
    <>
      <Script src="http://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
};

export default Payment;
