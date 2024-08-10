Feature: User Login
    Scenario: Successful login with valid credentials
        Given the user is on the login page
        When the user enters a valid email "user@example.com"
        And the user enters a valid password "password123"
        And the user clicks on the login button
        Then the user should be redirected to the dashboard page

    Scenario: Display error for invalid email format
        Given the user is on the login page
        When the user enters an invalid email "invalid-email-format"
        Then the login button should be disabled
        And the user should see email validaiton error

    Scenario: Display error when email field is empty
        Given the user is on the login page
        When the user leaves the email field empty
        Then the login button should be disabled
        And the user should see email validaiton error

    Scenario: Display error when password field is empty
        Given the user is on the login page
        When the user enters a valid email "user@example.com"
        And the user leaves the password field empty
        Then the login button should be disabled
        And the user should see password validaiton error

    Scenario: Check password field masking
        Given the user is on the login page
        When the user enters a valid password "password123"
        Then the password field should be masked

    Scenario: Ensure form accessibility for all users
        Given the user is on the login page
        Then the form should be accessible to all users including those using accessibility tools
