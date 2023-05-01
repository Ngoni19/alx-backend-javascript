import Currency from './3-currency';

export default class Pricing { constructor(amount, currency) { this.amount = amount; this.currency = currency; }

get displayFullPrice() { return ${this.amount} ${this.currency.displayFullCurrency()}; }

static convertPrice(amount, conversionRate) { return amount * conversionRate; } 
}