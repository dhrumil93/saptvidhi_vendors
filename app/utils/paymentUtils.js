export const PAYMENT_CONFIG = {
  SIMULATION_DELAY: 2000, // Simulate a 2-second delay
};
export const processPayment = async (gateway, amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      if (success) {
        resolve({
          paymentId: `${gateway}_test_${Date.now()}`,
          amount,
        });
      } else {
        reject(new Error(`${gateway} payment failed`));
      }
    }, PAYMENT_CONFIG.SIMULATION_DELAY);
  });
};

export const processRazorpayPayment = async (amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      if (success) {
        resolve({ paymentId: `rzp_test_${Date.now()}`, amount });
      } else {
        reject(new Error("Razorpay payment failed"));
      }
    }, PAYMENT_CONFIG.SIMULATION_DELAY);
  });
};

export const processStripePayment = async (amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.1;
      if (success) {
        resolve({ paymentId: `stripe_test_${Date.now()}`, amount });
      } else {
        reject(new Error("Stripe payment failed"));
      }
    }, PAYMENT_CONFIG.SIMULATION_DELAY);
  });
};

export const processPayPalPayment = async (amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.1;
      if (success) {
        resolve({ paymentId: `pp_test_${Date.now()}`, amount });
      } else {
        reject(new Error("PayPal payment failed"));
      }
    }, PAYMENT_CONFIG.SIMULATION_DELAY);
  });
};

export const processPhonePePayment = async (amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.1;
      if (success) {
        resolve({ paymentId: `phonepe_test_${Date.now()}`, amount });
      } else {
        reject(new Error("PhonePe payment failed"));
      }
    }, PAYMENT_CONFIG.SIMULATION_DELAY);
  });
};
