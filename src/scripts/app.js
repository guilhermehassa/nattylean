// src/scripts/app.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('App is running!');

    // Example of a Bootstrap component initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    console.log('teste')

    // Add more application logic here
});