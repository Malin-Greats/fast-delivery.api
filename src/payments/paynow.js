// const { Paynow } = require('paynow');
// const shortid = require('shortid');

// let _id = shortid.generate();

// let paynow = new Paynow(process.env.ID, process.env.token);

// const paynowController = {
//   initiatePayment: async (req, res) => {
//     let { allProduct, user, amount, email, clientToken } = req.body.orderData;
//     let transactionId = shortid.generate();
//     console.log('Backend Req', req.body);
//     paynow.resultUrl = 'http://localhost:3000/user/orders';
//     paynow.returnUrl = 'http://localhost:3000/';

//     let payment = paynow.createPayment(`Transaction : ${transactionId}`);
//     console.log('added items : ', allProduct);
//     payment.add(`Products : ${allProduct}`, amount);

//     paynow.send(payment).then((response) => {
//       if (response.success) {
//         console.log('Response', response);
//         res.json({
//           pollUrl: response.pollUrl,
//           redirectUrl: response.redirectUrl,
//           clientToken,
//           success: true,
//         });
//       } else {
//         console.log(response.error);
//         res.json({
//           error: response.error,
//           message: 'Payment Failed',
//           success: false,
//         });
//         return response.error;
//       }
//     });
//   },

//   pollPayment: async (req, res) => {
//     let { pollUrl } = req.body;
//     console.log('Poll Trans', pollUrl);
//     if (!pollUrl) {
//       return res.json({ message: 'Err Poll Url not found' });
//     }
//     if (pollUrl) {
//       paynow.pollTransaction(pollUrl).then((transaction) => {
//         if (transaction.status === 'paid' || transaction.status === 'Paid') {
//           console.log('status', transaction.status);
//           res.json({
//             message: 'Payment Done',
//             success: true,
//           });
//         } else {
//           console.log('Payment Failed Kuita Poll _ Backend');
//           res.json({
//             message: 'Payment Failed',
//             success: false,
//           });
//         }
//       });
//     }
//   },
// };
