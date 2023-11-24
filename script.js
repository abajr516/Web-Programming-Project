import { jsPDF } from "jspdf";
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
    var monthlySaving = parseFloat(document.getElementById("monthlySaving").value);
    var savings = (goalAmount - startValue);
    var chart_50 = savings *.5;
    var chart_30 = savings *.3;
    var chart_20 = savings *.2;
    //Start creating report
    var reportHTML = "<h2>Your Budget Report:</h2>"
    reportHTML += "<h4>Saving for _____? Here is your report.</h4>";
    reportHTML +="<h3>Scenario A: You meet your goal in the given time constraint: </h3>";
    reportHTML +="<h3>Scenario B: You meet your goal with the amount you expect to contribute:</h3>";
    reportHTML +="<h3>Scenario C: You meet your goal using the 50-30-20 rule:</h3>";
    reportHTML +='<button onclick="printReport()">Print Report</button>';
    reportHTML +='<button onclick="">Download as PDF</button>';
    return reportHTML
}

function injectReport() {
    var reportContainer=document.getElementById("report-container");
    reportContainer.innerHTML = generateReport();
}

function printReport() {
    window.print()
}

function downloadReport(){
    const doc = new jsPDF();
    var content = document.getElementById("report_container");
    doc.text(content, 10, 10);
    doc.save("Budget_Report.pdf");
}
