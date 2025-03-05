# Finance Dashboard

A modern, interactive finance dashboard for analyzing employee salary data and visualizing department-wise financial metrics.

## Features

- Upload and analyze employee data from CSV files
- Interactive charts showing department salary distribution
- Salary range distribution visualization
- Key metrics including total payroll, average salary, and bonus statistics
- Top 5 highest-paid employees table
- Sample data generation for testing

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Chart.js for data visualization
- Papa Parse for CSV parsing

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/DanaB93/Finance-dashboard.git
```

2. Navigate to the project directory:
```bash
cd Finance-dashboard
```

3. Start a local server (using Python's built-in server or any other method):
```bash
python3 -m http.server 3000
```

4. Open your browser and visit:
```
http://localhost:3000/index.html
```

## Usage

1. Click the "Download Sample Data" button to get example employee data
2. Use the "Upload Employee Data (CSV)" button to upload your CSV file
3. The dashboard will automatically update with:
   - Department salary distribution
   - Salary range distribution
   - Key financial metrics
   - Top 5 highest-paid employees

## CSV Format

Your CSV file should include the following columns:
- Name
- Department
- Salary
- Bonus
- Start Date

## License

MIT License 