## 15. Pandas Excel
## 📘 Introduction
Excel files are ubiquitous in business and data analysis. Pandas provides read_excel() for reading Excel files and ExcelWriter/to_excel() for writing. This module covers reading single and multiple sheets, handling headers and columns, writing DataFrames to Excel with formatting, and using the xlsxwriter engine for professional output.

## 🧠 Key Concepts
- **pd.read_excel()**: Read Excel files into DataFrame. Key params: sheet_name, header, usecols, dtype, parse_dates, skiprows, nrows.
- **sheet_name**: Specify sheet by name (string), index (int), or list for multiple sheets (returns dict).
- **header**: Row to use as column names (default 0). None for no header.
- **usecols**: Columns to read — by letter ('A:C'), by name ('Name,Age'), or by index list.
- **pd.ExcelFile**: Class for parsing Excel files — useful for exploring sheet names and reading multiple sheets efficiently.
- **pd.ExcelWriter**: Class for writing DataFrames to Excel with control over sheets, formatting.
- **to_excel()**: Write DataFrame to Excel file. Params: sheet_name, index, startrow, startcol.
- **xlsxwriter**: Recommended engine for formatting (colors, fonts, column widths, conditional formatting).
- **Multiple sheets**: Write multiple DataFrames to different sheets in one file using ExcelWriter.

## 💻 Syntax

`python
import pandas as pd

# Read Excel
df = pd.read_excel('file.xlsx')
df = pd.read_excel('file.xlsx', sheet_name='Sheet1')
df = pd.read_excel('file.xlsx', sheet_name=0)
df = pd.read_excel('file.xlsx', sheet_name=['Sheet1', 'Sheet2'])  # returns dict

# Read with options
df = pd.read_excel('file.xlsx', sheet_name='Data', header=0,
                   usecols='A:C', dtype={'Age': int}, parse_dates=['Date'])

# ExcelFile for multiple sheets
xls = pd.ExcelFile('file.xlsx')
print(xls.sheet_names)
df1 = pd.read_excel(xls, 'Sheet1')
df2 = pd.read_excel(xls, 'Sheet2')

# Write to Excel
df.to_excel('output.xlsx', sheet_name='Data', index=False)

# Write multiple sheets
with pd.ExcelWriter('output.xlsx', engine='xlsxwriter') as writer:
    df1.to_excel(writer, sheet_name='Sheet1', index=False)
    df2.to_excel(writer, sheet_name='Sheet2', index=False)

# Formatting with xlsxwriter
with pd.ExcelWriter('styled.xlsx', engine='xlsxwriter') as writer:
    df.to_excel(writer, sheet_name='Data', index=False)
    workbook = writer.book
    worksheet = writer.sheets['Data']
    header_format = workbook.add_format({'bold': True, 'bg_color': '#4472C4', 'font_color': 'white'})
    for col_num, col_name in enumerate(df.columns):
        worksheet.write(0, col_num, col_name, header_format)
    worksheet.set_column(0, len(df.columns)-1, 15)
`

## ✅ Example 1 - Basic
**Problem:** Read an Excel file, explore its sheets, and write a DataFrame to Excel.

`python
import pandas as pd
import numpy as np

# Create sample DataFrames to write
df_sales = pd.DataFrame({
    'Product': ['Laptop', 'Mouse', 'Keyboard', 'Monitor'],
    'Q1': [100, 200, 150, 80],
    'Q2': [120, 220, 160, 90],
    'Q3': [110, 210, 155, 85]
})

df_info = pd.DataFrame({
    'Product': ['Laptop', 'Mouse', 'Keyboard', 'Monitor'],
    'Price': [800, 25, 45, 200],
    'Stock': [50, 200, 150, 100]
})

# Write to Excel with multiple sheets
with pd.ExcelWriter('sales_report.xlsx', engine='xlsxwriter') as writer:
    df_sales.to_excel(writer, sheet_name='Quarterly Sales', index=False)
    df_info.to_excel(writer, sheet_name='Product Info', index=False)

print("Written to sales_report.xlsx")
print()

# Read back
print("=== Reading sheets ===")
xls = pd.ExcelFile('sales_report.xlsx')
print("Sheet names:", xls.sheet_names)
print()

# Read specific sheet
sales = pd.read_excel(xls, 'Quarterly Sales')
print("Quarterly Sales:")
print(sales)
print()

info = pd.read_excel(xls, 'Product Info')
print("Product Info:")
print(info)
`

**Output:**
`
Written to sales_report.xlsx

=== Reading sheets ===
Sheet names: ['Quarterly Sales', 'Product Info']

Quarterly Sales:
   Product   Q1   Q2   Q3
0   Laptop  100  120  110
1    Mouse  200  220  210
2 Keyboard  150  160  155
3  Monitor   80   90   85

Product Info:
   Product  Price  Stock
0   Laptop    800     50
1    Mouse     25    200
2 Keyboard     45    150
3  Monitor    200    100
`

**Explanation:**
We used ExcelWriter to write two DataFrames to separate sheets in one Excel file. Then we read the file back using ExcelFile, which efficiently parses the workbook once. sheet_names shows all available sheets. Each sheet is read into a separate DataFrame.

## 🚀 Example 2 - Intermediate
**Problem:** Read a subset of an Excel sheet with options, then write a styled Excel report.

`python
import pandas as pd
import numpy as np

# Create sample data
np.random.seed(42)
df = pd.DataFrame({
    'Product': ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Tablet'],
    'Sales': np.random.randint(50, 500, 5),
    'Profit': np.random.randint(5, 100, 5),
    'Rating': np.random.uniform(1, 5, 5).round(1)
})

# Write with formatting
with pd.ExcelWriter('styled_report.xlsx', engine='xlsxwriter') as writer:
    df.to_excel(writer, sheet_name='Products', index=False)

    workbook = writer.book
    worksheet = writer.sheets['Products']

    # Header formatting
    header_fmt = workbook.add_format({
        'bold': True, 'bg_color': '#2F5496', 'font_color': 'white',
        'border': 1, 'text_wrap': True, 'valign': 'vcenter', 'align': 'center'
    })

    # Number format
    num_fmt = workbook.add_format({'num_format': '#,##0', 'border': 1})
    profit_fmt = workbook.add_format({'num_format': '$#,##0', 'border': 1})
    pct_fmt = workbook.add_format({'num_format': '0.0', 'border': 1})

    # Conditional format for Rating (color scale)
    rating_fmt = workbook.add_format({'bg_color': '#C6EFCE', 'num_format': '0.0'})
    low_rating_fmt = workbook.add_format({'bg_color': '#FFC7CE', 'num_format': '0.0'})

    # Write headers with formatting
    for col_num, col_name in enumerate(df.columns):
        worksheet.write(0, col_num, col_name, header_fmt)

    # Write data with formatting
    for row_num in range(len(df)):
        worksheet.write(row_num + 1, 0, df.iloc[row_num, 0])  # Product name
        worksheet.write(row_num + 1, 1, df.iloc[row_num, 1], num_fmt)  # Sales
        worksheet.write(row_num + 1, 2, df.iloc[row_num, 2], profit_fmt)  # Profit
        rating = df.iloc[row_num, 3]
        fmt = rating_fmt if rating >= 4 else low_rating_fmt
        worksheet.write(row_num + 1, 3, rating, fmt)  # Rating with conditional color

    # Set column widths
    worksheet.set_column('A:A', 15)
    worksheet.set_column('B:C', 12)
    worksheet.set_column('D:D', 10)

print("Styled report written to styled_report.xlsx")
print()

# Read just the Rating column using usecols
print("=== Reading specific columns (A, D) ===")
df_partial = pd.read_excel('styled_report.xlsx', sheet_name='Products', usecols='A,D')
print(df_partial)
`

**Output:**
`
Styled report written to styled_report.xlsx

=== Reading specific columns (A, D) ===
   Product  Rating
0   Laptop     3.5
1    Mouse     4.0
2 Keyboard     4.6
3  Monitor     2.1
4   Tablet     4.7
`

**Explanation:**
xlsxwriter provides rich formatting: header styles with colors, number formats ($ and comma separators), and conditional formatting (green for high ratings, red for low). set_column() adjusts column widths for readability. When reading back, usecols='A,D' loads only specific columns using Excel column letters.

## 🏢 Real World Use Case
**Monthly Financial Report:** A finance team receives weekly Excel exports from the ERP system. They use pd.read_excel() with usecols and dtype to load only relevant columns with correct types. They process and aggregate data in pandas, then use ExcelWriter with xlsxwriter to generate a formatted monthly report: header styling, conditional formatting for profit margins (red if below threshold), auto-fit column widths, and multiple sheets (Summary, Details, Charts).

## 🎯 Interview Questions

**Q1: How do you read a specific sheet from an Excel file?**
A: Use sheet_name parameter: pd.read_excel('file.xlsx', sheet_name='Sheet1') or sheet_name=0 for first sheet.

**Q2: How do you read multiple sheets at once?**
A: Pass a list to sheet_name: pd.read_excel('file.xlsx', sheet_name=['Sheet1', 'Sheet2']) — returns a dict of DataFrames.

**Q3: How do you write multiple DataFrames to different sheets in one Excel file?**
A: Use pd.ExcelWriter with a with statement, calling to_excel() for each DataFrame with different sheet_name.

**Q4: What is the advantage of using pd.ExcelFile?**
A: It parses the Excel file once and allows reading multiple sheets without re-parsing — more efficient for reading several sheets from the same file.

**Q5: How can you format Excel output (colors, fonts, column widths)?**
A: Use the xlsxwriter engine with pd.ExcelWriter. Access workbook and worksheet objects, create format objects with add_format(), and apply them via worksheet.write() or worksheet.set_column().

## ⚠ Common Errors / Mistakes
- **Not specifying engine='xlsxwriter' when formatting**: The default engine (openpyxl) has different formatting APIs.
- **Using index=True by default**: Writes the DataFrame index as an extra column. Use index=False for clean output.
- **Assuming sheet_name=0 reads the sheet named '0'**: It reads the first sheet by position.
- **Large file memory issues**: Excel files can be memory-intensive. Use usecols and dtype to reduce memory.
- **Not closing ExcelWriter**: Always use with statement to ensure proper file closing and resource cleanup.

## 📝 Practice Exercises

**Beginner:**
1. Read an Excel file with pd.read_excel() and display its shape and columns.
2. Write a DataFrame to Excel with index=False and verify the output.
3. Read only the first 10 rows from an Excel sheet using nrows=10.

**Intermediate:**
4. Create two DataFrames and write them to different sheets in one Excel file using ExcelWriter.
5. Read an Excel file with usecols='A, C, E' to load only specific columns.
6. Use pd.ExcelFile to list all sheet names and read the first two sheets into separate DataFrames.

**Advanced:**
7. Build a report generator function that takes a DataFrame and writes a formatted Excel file with: styled headers, alternating row colors, conditional formatting (color scale on numeric columns), auto-fitted column widths, and a second sheet with summary statistics.
8. Read a large Excel file (10K+ rows) using chunked reading (hint: use nrows in a loop with skiprows), aggregate each chunk, and write results to a new sheet — never loading the entire dataset into memory.
