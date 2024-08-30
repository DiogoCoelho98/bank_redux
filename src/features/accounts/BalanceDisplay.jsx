function formatCurrency(currency) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD"
    }).format(currency)
}

export default function BalanceDisplay() {
    return <div className="balance">{formatCurrency(123456)}</div>
}