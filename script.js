/*import { jsPDF } from 'jspdf';*/
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
    var goalAmount = parseFloat(document.getElementById("goalAmount").value);
    var timeframe = parseFloat(document.getElementById("timeframe").value);
    var startValue = parseFloat(document.getElementById("startValue").value);
    var predictedMonthlySaving = parseFloat(document.getElementById("monthlySaving").value);
    var monthlyIncome = parseFloat(document.getElementById("income").value);
    var savings = (goalAmount - startValue);
    var idealMonthlySaving = savings/timeframe;
    var updatedTimeframe = savings/timeframe;
    var chart_50 = monthlyIncome *.5;
    var chart_30 = monthlyIncome *.3;
    var chart_20 = monthlyIncome *.2;
    var updatedTimeframe2 = Math.ceil(savings/chart_20);

    //Start creating report
    var reportHTML = "<h2>Your Budget Report:</h2>";
    reportHTML += "<h4>Saving for _____? Here is your report.</h4>";
    reportHTML +="<h3>Scenario A: You meet your goal in the given time constraint: </h3>";
    reportHTML +="<p>Timeframe: "+timeframe+" months</p>";
    reportHTML += "<p>Ideal Monthly Saving: $"+idealMonthlySaving.toFixed(2)+"</p>";
    reportHTML +="<h3>Scenario B: You meet your goal with the amount you expect to contribute:</h3>";
    reportHTML +="<p>In this scenario, we will ignore the timeframe you want to save money by.</p>";
    reportHTML += "<p>Minimum monthly saving: $"+predictedMonthlySaving.toFixed(2)+"</p>";
    reportHTML += "<p>Updated timeframe: "+updatedTimeframe+" months</p>";
    reportHTML +="<h3>Scenario C: You meet your goal using the 50-30-20 rule:</h3>";
    reportHTML +="<p>The 50-30-rule is an economic rule that states you should set aside 50% of your income for needs, 30% for wants, and 20% for savings.</p>";
    reportHTML +="<p>If you follow the 50-30-20 rule, you would need to set aside the following amounts from each month: </p>";
    reportHTML += "<p>Needs: $"+chart_50.toFixed(2)+"</p>";
    reportHTML += "<p>Wants: $"+chart_30.toFixed(2)+"</p>";
    reportHTML += "<p>Savings: $"+chart_20.toFixed(2)+"</p>";
    reportHTML += "<p>If you follow the 50-30-20 plan, your updated timeframe will change.</p>";
    reportHTML += "<p>Updated timeframe: "+updatedTimeframe2+" months</p>";
    reportHTML +='<button onclick="printReport()">Print</button>';
    return reportHTML;
}

function injectReport() {
    var reportHTML=generateReport()
    var reportContainer=document.getElementById("report-container");
    reportContainer.innerHTML = reportHTML;
}


function printReport() {
    window.print()
}

/*function downloadReport(){
    const doc = new jsPDF();
    var reportContainer=document.getElementById("report-container");
    var content = reportContainer.innerHTML;
    doc.text(content, 10, 10);
    doc.save("Budget_Report.pdf");
}*/
