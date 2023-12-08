function handleGoalSelection() {
    var selectedGoal = document.getElementById("goals").value;
    var otherGoalField = document.getElementById("other");

    // Show or hide the additional text field based on the selected goal
    if (selectedGoal === "other") {
        otherGoalField.style.display = "block";
    } else {
        otherGoalField.style.display = "none";
    }
}

function generateReport() {
    // Get user inputs
    var selectElement = document.getElementById("goals");
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var selectedValue = selectedOption.value;
    var goalAmount = parseFloat(document.getElementById("goalAmount").value);
    var timeframe = parseFloat(document.getElementById("timeframe").value);
    var startValue = parseFloat(document.getElementById("startValue").value);
    var predictedMonthlySaving = parseFloat(document.getElementById("monthlySaving").value);
    var monthlyIncome = parseFloat(document.getElementById("income").value);
    // Validate that the required inputs have been entered
    if (isNaN(goalAmount) || isNaN(timeframe) || isNaN(startValue) || isNaN(predictedMonthlySaving) || isNaN(monthlyIncome)) {
        return "<p>Enter valid inputs to generate report...</p>"
    }
    // Calculate savings for different scenarios
    var savings = (goalAmount - startValue);
    var idealMonthlySaving = savings / timeframe; //Scenario A
    var updatedTimeframe = savings / timeframe; //Scenario B
    var chart_50 = monthlyIncome * .5; //Scenario C
    var chart_30 = monthlyIncome * .3; //Scenario C
    var chart_20 = monthlyIncome * .2; //Scenario C
    var updatedTimeframe2 = Math.ceil(savings / chart_20); //Scenario C

    //Start creating report
    var reportHTML = "<h2>Your Budget Report:</h2>";
    reportHTML += "<h4>Saving for "+selectedValue+"? Here is your report.</h4>";
    reportHTML += "<h3>Scenario A: You meet your goal in the given time constraint: </h3>";
    reportHTML += "<p>Timeframe: " + timeframe + " months</p>";
    reportHTML += "<p>Ideal Monthly Saving: $" + idealMonthlySaving.toFixed(2) + "</p>";
    reportHTML += "<h3>Scenario B: You meet your goal with the amount you expect to contribute:</h3>";
    reportHTML += "<p>In this scenario, we will ignore the timeframe you want to save money by.</p>";
    reportHTML += "<p>Minimum monthly saving: $" + predictedMonthlySaving.toFixed(2) + "</p>";
    reportHTML += "<p>Updated timeframe: " + updatedTimeframe + " months</p>";
    reportHTML += "<h3>Scenario C: You meet your goal using the 50-30-20 rule:</h3>";
    reportHTML += "<p>The 50-30-rule is an economic rule that states you should set aside 50% of your income for needs, 30% for wants, and 20% for savings.</p>";
    reportHTML += "<p>If you follow the 50-30-20 rule, you would need to set aside the following amounts from each month: </p>";
    reportHTML += "<p>Needs: $" + chart_50.toFixed(2) + "</p>";
    reportHTML += "<p>Wants: $" + chart_30.toFixed(2) + "</p>";
    reportHTML += "<p>Savings: $" + chart_20.toFixed(2) + "</p>";
    reportHTML += "<p>If you follow the 50-30-20 plan, your updated timeframe will change.</p>";
    reportHTML += "<p>Updated timeframe: " + updatedTimeframe2 + " months</p>";
    reportHTML += '<button onclick="printReport()">Print</button>';
    return reportHTML; //to be injected into empty container
}

function injectReport() {
    var reportHTML = generateReport()
    var reportContainer = document.getElementById("report-container");
    reportContainer.innerHTML = reportHTML;
}

function createGraph() {

}

function printReport() {
    window.print()
}

function findLargest(a, b, c) {
    if (a >= b && a >= c) {
        return a;
    } else if (b >= a && b >= c) {
        return b;
    } else {
        return c;
    }
}
/*function downloadReport(){
    const doc = new jsPDF();
    var reportContainer=document.getElementById("report-container");
    var content = reportContainer.innerHTML;
    doc.text(content, 10, 10);
    doc.save("Budget_Report.pdf");
}*/
var tips =
    ["Differentiate between needs and wants when making purchasing decisions.",
        "Define short-term and long-term financial goals.",
        "Regularly review your financial situation and adjust your plan as needed.",
        "Set up automatic transfers to your savings account to ensure consistent saving.",
        "Diversify income sources to reduce financial vulnerability.",
        "As your income increases, resist the temptation to inflate your lifestyle."];
index = 0;
function tipCarousel() {
    document.getElementById("tipCycle").textContent = tips[index];
    index = (index + 1) % tips.length;
}

function addCashIn() {
    //Create label
    var labelElement = document.createElement("label");
    labelElement.htmlFor = "inputs";
    labelElement.textContent = "Additional Income: $";
    //Create input box
    var inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.class = "inputs";
    inputElement.placeholder = "Enter additional income";
    inputElement.required;
    var containerDiv = document.createElement("div");
    //Append to cash in div
    containerDiv.className = "input-container";
    containerDiv.appendChild(labelElement);
    containerDiv.appendChild(inputElement);
    document.getElementById("cashFlowIn").appendChild(containerDiv);
}

function addCashOut() {
    //Create label
    var labelElement = document.createElement("label");
    labelElement.htmlFor = "outputs";
    labelElement.textContent = "Additional Expense: $";
    //Create input box
    var inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.class = "outputs";
    inputElement.placeholder = "Enter additional expense";
    inputElement.required;
    var containerDiv = document.createElement("div");
    //Append to cash in div
    containerDiv.className = "input-container";
    containerDiv.appendChild(labelElement);
    containerDiv.appendChild(inputElement);
    document.getElementById("cashFlowOut").appendChild(containerDiv);
}

var initialInputElements=document.getElementsByClassName("inputs");
var initialOutputElements = document.getElementsByClassName("outputs");

function createGraph() {
    // Calculate input sum
    var inputElements = document.getElementsByClassName("inputs");
    var inputSum = 0;
    for (var i = 0; i < inputElements.length; i++) {
        var inputValue = parseFloat(inputElements[i].value);
        if (!isNaN(inputValue)) {
            inputSum+=inputValue;
        }
    }
    for (var i = 0; i < initialInputElements.length; i++) {
        var inputValue = parseFloat(initialInputElements[i].value);
        if (!isNaN(inputValue)) {
            inputSum+=inputValue;
        }
    }
    // Calculate output sum
    var outputElements = document.getElementsByClassName("outputs");
    var outputSum = 0;
    for (var i = 0; i < outputElements.length; i++) {
        var outputValue = parseFloat(outputElements[i].value);
        if (!isNaN(outputValue)) {
            outputSum+=outputValue;
        }
    }
    for (var i = 0; i < initialOutputElements.length; i++) {
        var outputValue = parseFloat(initialOutputElements[i].value);
        if (!isNaN(outputValue)) {
            outputSum+=outputValue;
        }
    }
    console.log(inputSum)
    console.log(outputSum)
    // Sample data
    var labels = ['Cashflow'];
    var data = [inputSum, (-outputSum), (inputSum-outputSum)];

    // Get the canvas element
    var ctx = document.getElementById('myBarChart').getContext('2d');

    // Create a bar chart
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cash In',
                data: [data[0]],
                backgroundColor: 'rgba(55, 124, 34, 0.2)', // Green background color
                borderColor: 'rgba(55, 124, 34, 1)', // Green border color
                borderWidth: 1 // Border width
            },
            {
                label: 'Cash Out',
                data: [data[1]],
                backgroundColor: 'rgba(124, 34, 34, 0.2)', // Red background color
                borderColor: 'rgba(124, 34, 34, 1)',
                borderWidth: 1 // Border width
            },
            {
                label: 'Net Flow',
                data: [data[2]],
                backgroundColor: 'rgba(34, 81, 124, 0.2)', // Blue background color
                borderColor: 'rgba(34, 81, 124, 1)', // Blue border color
                borderWidth: 1 // Border width
            },]
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        }
                    }
                ]
            }
        }
    });
}

function send() {
    alert("Request Sent!");
}