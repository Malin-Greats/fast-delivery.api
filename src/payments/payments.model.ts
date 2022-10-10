import { Paynow } from "../shared/@types/paynow/paynow"
const paynow = new Paynow("ID", "INTERGRATION_KEY")
const payment =paynow.createPayment("ref", "sam@gmail.com")
payment.add("title", 89).add("sam", 67)
console.log(payment.total())