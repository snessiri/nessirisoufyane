document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('ccpNumber').value = '';
    clearResults();
    document.getElementById("error").textContent = "";
});

document.getElementById('ccpNumber').addEventListener('input', function () {
    var ccp = this.value.replace(/\D/g, '').slice(0, 10);
    this.value = ccp;

    document.getElementById("error").textContent = "";

    if (ccp === "" || isNaN(ccp) || parseInt(ccp) < 0 || ccp.length > 10) {
        var errorMsg = getErrorMessage();
        document.getElementById("error").textContent = errorMsg;
        clearResults();
        return;
    }

    var ccpStr = ccp.padStart(10, '0');
    var number = parseInt(ccpStr) * 100;
    var remainder = number % 97;
    var step3Result = remainder + 85;

    if (step3Result >= 97) {
        step3Result -= 97;
    }

    var keyRIP = (97 - step3Result).toString().padStart(2, '0');

    var trailingZerosLength = 10 - ccpStr.length;
    var ripNumber = "00799999" + "0".repeat(trailingZerosLength) + ccpStr + keyRIP;

    var ccpKey = cleCCP(ccpStr);
    ccpKey = ccpKey.toString().padStart(2, '0');

    document.getElementById("ccpKeyResult").value = ccpKey;
    document.getElementById("keyRIPResult").value = keyRIP;
    document.getElementById("formattedRIPNumber").value = ripNumber;
});

function cleCCP(ccpStr) {
    var result = 0;
    var i = 4;
    for (var char of ccpStr.split('').reverse()) {
        result += parseInt(char) * i;
        i += 1;
    }
    result %= 100;
    return result;
}

function clearResults() {
    document.getElementById("ccpKeyResult").value = "";
    document.getElementById("keyRIPResult").value = "";
    document.getElementById("formattedRIPNumber").value = "";
}

function getErrorMessage() {
    var lang = document.getElementById("languageSwitcher").value;
    if (lang === "fr") {
        return "Veuillez entrer un numéro CCP valide (jusqu'à 10 chiffres).";
    } else if (lang === "ar") {
        return "صالح (10 أرقام) CCP الرجاء إدخال رقم)";
    } else {
        return "Please enter a valid CCP number (up to 10 digits).";
    }
}

document.getElementById('languageSwitcher').addEventListener('change', function () {
    var lang = this.value;

    if (lang === "fr") {
        document.getElementById("headerText").textContent = "Clé CCP Algérie";
        document.getElementById("ccpNumber").placeholder = "Entrez le numéro CCP";
        document.getElementById("ccpKeyLabel").textContent = "🔑 Clé CCP";
        document.getElementById("keyRIPLabel").textContent = "🔑 Clé RIP";
        document.getElementById("ripLabel").textContent = "RIP";
    } else if (lang === "ar") {
        document.getElementById("headerText").textContent = "الجزائر CCP مفتاح ";
        document.getElementById("ccpNumber").placeholder = "CCP أدخل رقم";
        document.getElementById("ccpKeyLabel").textContent = "🔑 مفتاح CCP";
        document.getElementById("keyRIPLabel").textContent = "🔑 مفتاح RIP";
        document.getElementById("ripLabel").textContent = "RIP";
    } else {
        document.getElementById("headerText").textContent = "Algerian CCP Key";
        document.getElementById("ccpNumber").placeholder = "Enter CCP number";
        document.getElementById("ccpKeyLabel").textContent = "🔑 CCP Key";
        document.getElementById("keyRIPLabel").textContent = "🔑 RIP Key";
        document.getElementById("ripLabel").textContent = "RIP";
    }
});

window.onload = function() {
    var lang = document.getElementById("languageSwitcher").value;
    if (lang === "fr") {
        document.getElementById("ccpNumber").placeholder = "Entrez le numéro CCP";
    } else if (lang === "ar") {
        document.getElementById("ccpNumber").placeholder = "أدخل رقم CCP";
    } else {
        document.getElementById("ccpNumber").placeholder = "Enter CCP number";
    }
};

function copyToClipboard() {
    const textField = document.getElementById('formattedRIPNumber');
    textField.select();
    document.execCommand('copy');
    alert('RIP copied to clipboard!');
}
