import axios from 'axios';
import { showAlert } from './alert';
///
///
const stripe = Stripe(
  'pk_test_51OfeOWK37MSqqPM1OUXoVfMfY206hlypyf6FnPpvSq5FyCklCMigLniBWKUP4wBZMR4jk9rYUfio2DIgnsVs99Rx002E16tWGy',
);
export const bookTour = async (tourID) => {
  try {
    //1)Get checkout session from api
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourID}`,
    );
    console.log(session);
    ///2) Create checkout from + charge cc
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
