export default function currencyFilter(value, currency = 'PLN') {
    return new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency
    }).format(value)
}