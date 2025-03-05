// Sample data
const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    revenue: [65000, 75000, 89000, 95000, 110000, 124500],
    categories: {
        'Product Sales': 45,
        'Services': 30,
        'Subscriptions': 15,
        'Other': 10
    }
};

// Sample CSV data
const sampleData = `Name,Department,Salary,Bonus,Start Date
John Smith,Engineering,125000,15000,2022-01-15
Emily Johnson,Marketing,85000,8500,2021-06-01
Michael Chen,Engineering,135000,20000,2020-03-10
Sarah Williams,Sales,95000,25000,2021-08-22
David Brown,Engineering,115000,12000,2022-04-15
Lisa Anderson,Marketing,92000,9000,2021-11-30
James Wilson,Sales,88000,22000,2022-02-28
Maria Garcia,Engineering,128000,16000,2020-09-15
Robert Taylor,Sales,105000,28000,2021-03-20
Jennifer Lee,Marketing,78000,7500,2022-07-01
Thomas Martinez,Engineering,142000,18000,2020-05-12
Amanda White,Sales,98000,24000,2021-10-08
Kevin Park,Engineering,118000,14000,2022-03-15
Rachel Adams,Marketing,82000,8000,2021-12-05
Daniel Kim,Sales,91000,23000,2022-01-20`;

let employeeData = [];
let departmentChart = null;
let salaryRangeChart = null;

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeFileUpload();
    initializeDownloadButton();
    // Initialize empty charts with placeholder data
    updateDepartmentChart();
    updateSalaryRangeChart();
});

function initializeFileUpload() {
    const fileInput = document.getElementById('csvFile');
    fileInput.addEventListener('change', handleFileUpload);
}

function initializeDownloadButton() {
    const downloadBtn = document.getElementById('downloadSample');
    downloadBtn.addEventListener('click', () => {
        const sampleData = `Name,Department,Salary,Bonus,Start Date
John Smith,Engineering,125000,15000,2022-01-15
Emily Johnson,Marketing,85000,8500,2021-06-01
Michael Chen,Engineering,135000,20000,2020-03-10
Sarah Williams,Sales,95000,25000,2021-08-22
David Brown,Engineering,115000,12000,2022-04-15
Lisa Anderson,Marketing,92000,9000,2021-11-30
James Wilson,Sales,88000,22000,2022-02-28
Maria Garcia,Engineering,128000,16000,2020-09-15
Robert Taylor,Sales,105000,28000,2021-03-20
Jennifer Lee,Marketing,78000,7500,2022-07-01
Thomas Martinez,Engineering,142000,18000,2020-05-12
Amanda White,Sales,98000,24000,2021-10-08
Kevin Park,Engineering,118000,14000,2022-03-15
Rachel Adams,Marketing,82000,8000,2021-12-05
Daniel Kim,Sales,91000,23000,2022-01-20`;
        
        const blob = new Blob([sampleData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sample_employee_data.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    });
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            complete: function(results) {
                employeeData = results.data.filter(row => row.Salary && row.Name);
                analyzeData();
                updateCharts();
                updateTable();
            }
        });
    }
}

function analyzeData() {
    // Calculate total payroll and average salary
    const totalPayroll = employeeData.reduce((sum, emp) => sum + parseFloat(emp.Salary), 0);
    const avgSalary = totalPayroll / employeeData.length;
    const totalBonus = employeeData.reduce((sum, emp) => sum + (parseFloat(emp.Bonus) || 0), 0);
    const avgBonus = totalBonus / employeeData.length;

    // Update metrics
    document.getElementById('totalPayroll').textContent = formatCurrency(totalPayroll);
    document.getElementById('avgSalary').textContent = formatCurrency(avgSalary);
    document.getElementById('totalEmployees').textContent = employeeData.length;
    document.getElementById('avgBonus').textContent = formatCurrency(avgBonus);
}

function updateCharts() {
    updateDepartmentChart();
    updateSalaryRangeChart();
}

function updateDepartmentChart() {
    const deptData = {};
    
    if (employeeData.length > 0) {
        employeeData.forEach(emp => {
            if (!deptData[emp.Department]) {
                deptData[emp.Department] = 0;
            }
            deptData[emp.Department] += parseFloat(emp.Salary);
        });
    } else {
        // Placeholder data
        deptData['Upload Data'] = 0;
    }

    const ctx = document.getElementById('departmentChart').getContext('2d');
    if (departmentChart) {
        departmentChart.destroy();
    }

    departmentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(deptData),
            datasets: [{
                data: Object.values(deptData),
                backgroundColor: [
                    '#4834d4',
                    '#00b894',
                    '#fdcb6e',
                    '#e17055',
                    '#6c5ce7'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => formatCurrency(value)
                    }
                }
            }
        }
    });
}

function updateSalaryRangeChart() {
    const ranges = {
        '0-50k': 0,
        '50k-75k': 0,
        '75k-100k': 0,
        '100k-150k': 0,
        '150k+': 0
    };

    if (employeeData.length > 0) {
        employeeData.forEach(emp => {
            const salary = parseFloat(emp.Salary);
            if (salary < 50000) ranges['0-50k']++;
            else if (salary < 75000) ranges['50k-75k']++;
            else if (salary < 100000) ranges['75k-100k']++;
            else if (salary < 150000) ranges['100k-150k']++;
            else ranges['150k+']++;
        });
    }

    const ctx = document.getElementById('salaryRangeChart').getContext('2d');
    if (salaryRangeChart) {
        salaryRangeChart.destroy();
    }

    salaryRangeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(ranges),
            datasets: [{
                data: Object.values(ranges),
                backgroundColor: [
                    '#4834d4',
                    '#00b894',
                    '#fdcb6e',
                    '#e17055',
                    '#6c5ce7'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function updateTable() {
    const tbody = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    if (employeeData.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 5;
        cell.textContent = 'No data available';
        cell.style.textAlign = 'center';
        return;
    }

    // Sort employees by total compensation (salary + bonus)
    const sortedEmployees = [...employeeData]
        .sort((a, b) => {
            const totalA = parseFloat(a.Salary) + (parseFloat(a.Bonus) || 0);
            const totalB = parseFloat(b.Salary) + (parseFloat(b.Bonus) || 0);
            return totalB - totalA;
        })
        .slice(0, 5);

    sortedEmployees.forEach(emp => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = emp.Name;
        row.insertCell(1).textContent = emp.Department;
        row.insertCell(2).textContent = formatCurrency(parseFloat(emp.Salary));
        row.insertCell(3).textContent = formatCurrency(parseFloat(emp.Bonus) || 0);
        row.insertCell(4).textContent = formatCurrency(parseFloat(emp.Salary) + (parseFloat(emp.Bonus) || 0));
    });
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
} 