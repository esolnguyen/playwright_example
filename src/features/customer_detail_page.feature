Feature: Display Customer Detail Page

  Scenario: Display detailed customer information when data is available
    Given the customer data exists
    When the customer detail page is accessed
    Then the customer's image is displayed based on gender using "assets/images/[gender].png"
    And the customer's name is displayed with first and last names capitalized
    And the customer's address is displayed in the format: "[Address] [City], [State Name]"
    And the map container is displayed showing the customer's location

  Scenario: Display "No customer found" message when data is unavailable
    Given the customer data does not exist
    When the customer detail page is accessed
    Then the "No customer found" message is displayed