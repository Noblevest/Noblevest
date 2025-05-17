$(function() {
    calc();

    // Event listeners for changes to plan or amount
    $('#calc_plan').on('change', calc);
    $('#inv_amount').on('input', calc); // Simplified event listener
});

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    // Allow only numeric values and prevent non-numeric input
    return (charCode >= 48 && charCode <= 57) || charCode == 46;  // Allows numbers and decimal point.
}

function calc() {
    var plan = $('#calc_plan').val();
    var amount = parseFloat($('#inv_amount').val());
    var percent = 0; // Default percent

    // Ensure amount is a number and valid
    if (isNaN(amount) || amount <= 0) {
        $('#net_profit').val('0.00');
        $('#total_return').val('0.00');
        return; // Exit the function if the input is invalid
    }

    // Calculate percentage based on selected plan
    switch (plan) {
        case '1': // Plan 1
            percent = (amount >= 50 && amount <= 500) ? 20 : 0;
            break;

        case '2': // Plan 2
            percent = (amount < 200) ? 200 : (amount > 35000) ? 120 : (amount <= 50000) ? 115.2 : 0;
            break;

        case '3': // Plan 3
            percent = (amount < 500) ? 500 : (amount > 50000) ? 135 : (amount <= 50000) ? 129.6 : 0;
            break;

        case '4': // Plan 4
            percent = (amount < 1000) ? 1000 : (amount > 1000000000) ? 165 : (amount <= 50000) ? 110 : 0;
            break;

        case '5': // Plan 5
            percent = (amount >= 1000 && amount <= 50000) ? 130 : 0;
            break;

        case '6': // Plan 6
            percent = (amount >= 2000 && amount <= 50000) ? 200 : 0;
            break;

        default:
            percent = 0;
    }

    // Update UI with calculated values
    $('#assign_per').val(percent + '%');
    var total = amount * percent / 100;
    $('#total_return').val('$' + total.toFixed(2));

    if (total <= 0) {
        $('#net_profit').val('0.00');
    } else {
        $('#net_profit').val('$' + (total - amount).toFixed(2));
    }
}
