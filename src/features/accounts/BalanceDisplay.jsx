import { connect } from "react-redux";

function formatCurrency(currency) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD"
    }).format(currency)
}

// Old way to connect redux with react (connect API)
function BalanceDisplay({ balance }) {
    return <div className="balance">{formatCurrency(balance)}</div>
}

function mapStateToProps(state) {
    console.log(state)
    return {
        balance: state.account.balance
    };
}

export default connect(mapStateToProps)(BalanceDisplay);