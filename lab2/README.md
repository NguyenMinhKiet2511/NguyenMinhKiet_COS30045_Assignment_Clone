# TV Energy Consumption Analysis (Australia)

## Project Overview
This repository contains a data visualisation project analyzing the energy consumption of televisions currently available on the Australian market. The goal is to provide Australian households with clear insights to make energy-efficient purchasing decisions.

## Audience
**Target Audience:** Australian households and general consumers looking to purchase a new television.
**Audience Interests:** Reducing electricity bills, understanding the trade-off between screen size and power usage, and navigating technical jargon (e.g., Star Ratings).

## About the Data
**1. Data Source**
The dataset was obtained from the Australian Government's [Energy Rating](https://www.energyrating.gov.au/) database. It lists the energy efficiency details of television sets registered for sale in Australia and New Zealand.

**2. Data Processing**
The data was processed using KNIME Analytics Platform. Key steps included:
* **Filtering:** Removed products listed as "Superseded" or "Archived" to ensure relevance to current buyers.
* **Cleaning:** Standardised brand names (e.g., merging "Samsung" and "SAMSUNG") and handled missing values by excluding incomplete records.
* **Transformation:** Converted screen sizes from centimeters to inches and calculated precise energy metrics.
* **Feature Engineering:** Created logic to group screen sizes into standard marketing categories (e.g., 55", 65").

**3. Privacy**
The dataset contains public product specifications and manufacturer details. No personal attributes (PII) of individuals are included, ensuring full privacy compliance.

**4. Accuracy and Limitations**
* **Accuracy:** Data is self-submitted by manufacturers for regulatory compliance. While generally accurate, some discrepancies were observed between model numbers and physical screen dimensions.
* **Limitations:** The dataset focuses on power consumption; it does not include price data or picture quality metrics (e.g., contrast ratio), which are also factors in consumer decision-making.

**5. Ethics**
This project aims to promote sustainable consumption. By highlighting energy-efficient models, the analysis encourages choices that reduce environmental impact and household costs.

## AI Declaration
This project utilized AI assistance (Google Gemini) for:
* Guidance on KNIME workflow logic and node configuration.
* Drafting and refining the narrative text for the data story.
* Troubleshooting data cleaning expressions.
* *Note: All data processing and visualisation execution was performed by myself.*
