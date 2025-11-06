# **App Name**: Fadex Financial Manager

## Core Features:

- User Authentication: Secure login system using Firebase Authentication with CPF and password.
- Financial Dashboard: Interactive dashboard displaying real-time debt tracking graphs for project coordinators, total outstanding balances, and overall key performance indicators. The LLM acts as a tool that analyzes historical debt trends to generate future balance forecasts based on existing data and extrapolate that with market forecasts.
- Coordinator Management: Manage a list of project coordinators with details like name, project, outstanding balance, available balance, and contact information. Functionality includes adding new coordinators and viewing detailed profiles.
- Project Management: Display a list of all projects with the ability to search by name, code, or coordinator. Show project details including code, name, coordinator, budget item, status and outstanding supplies.
- Due Date Notifications: Alerts for upcoming debts, filterable by time period, with the option to send manual or automatic notifications via email or WhatsApp.
- Decision Matrix: A decision matrix section that includes a search function by project code, and display information like project name, coordinator, outstanding supplies, and financial status (pending and available balance).
- Data Storage: Storing user data, coordinator data, project data, and debt information using Firestore.

## Style Guidelines:

- Primary color: Soft blue (#90CAF9), reflecting trust and stability, aligning with financial management. 
- Background color: Very light blue (#E3F2FD), creating a calm and professional environment. 
- Accent color: Light grayish-blue (#79899b), to give subtle contrast and highlights in the interface.
- Body and headline font: 'Inter', a sans-serif font, for a modern and clean user interface.
- Use consistent and clear icons from a library like Material Design Icons to represent different sections and actions.
- Implement a clean, professional layout with a sidebar navigation. Utilize cards for the dashboard to present information clearly.
- Incorporate subtle animations and transitions to enhance user experience and provide visual feedback for interactions.