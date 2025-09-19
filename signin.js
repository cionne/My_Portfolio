        // Form validation for signin
        document.addEventListener('DOMContentLoaded', function() {
            const signinForm = document.getElementById('signin-form');
            const emailInput = document.getElementById('signin-email');
            const passwordInput = document.getElementById('signin-password');
            
            // Get validation elements
            const emailValidation = emailInput.closest('.form-group').querySelector('.validation-message');
            const passwordValidation = passwordInput.closest('.form-group').querySelector('.validation-message');
            
            // Get icon elements
            const emailSuccessIcon = emailInput.parentElement.querySelector('.success-icon');
            const emailErrorIcon = emailInput.parentElement.querySelector('.error-icon');
            const passwordSuccessIcon = passwordInput.parentElement.querySelector('.success-icon');
            const passwordErrorIcon = passwordInput.parentElement.querySelector('.error-icon');

            // Real-time validation
            emailInput.addEventListener('input', function() {
                validateEmail();
            });
            
            passwordInput.addEventListener('input', function() {
                validatePassword();
            });
            
            // Form submission
            signinForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const isEmailValid = validateEmail();
                const isPasswordValid = validatePassword();
                
                if (isEmailValid && isPasswordValid) {
                    // Form is valid, show success message
                    alert('Signed in successfully! Redirecting to home page...');
                    window.location.href = 'index.html';
                }
            });
            
            // Validation functions
            function validateEmail() {
                const emailValue = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailValue === '') {
                    showError(emailInput, emailValidation, emailErrorIcon, emailSuccessIcon, 'Please enter your email address');
                    return false;
                } else if (!emailRegex.test(emailValue)) {
                    showError(emailInput, emailValidation, emailErrorIcon, emailSuccessIcon, 'Please enter a valid email address');
                    return false;
                } else {
                    showSuccess(emailInput, emailValidation, emailErrorIcon, emailSuccessIcon);
                    return true;
                }
            }
            
            function validatePassword() {
                const passwordValue = passwordInput.value;
                
                if (passwordValue === '') {
                    showError(passwordInput, passwordValidation, passwordErrorIcon, passwordSuccessIcon, 'Password is required');
                    return false;
                } else {
                    showSuccess(passwordInput, passwordValidation, passwordErrorIcon, passwordSuccessIcon);
                    return true;
                }
            }
            
            function showError(input, validationElement, errorIcon, successIcon, message) {
                input.classList.remove('border-green-500');
                input.classList.add('border-red-500');
                validationElement.textContent = message;
                validationElement.classList.remove('hidden', 'text-green-500');
                validationElement.classList.add('text-red-500');
                errorIcon.classList.remove('hidden');
                successIcon.classList.add('hidden');
            }
            
            function showSuccess(input, validationElement, errorIcon, successIcon) {
                input.classList.remove('border-red-500');
                input.classList.add('border-green-500');
                validationElement.classList.add('hidden');
                errorIcon.classList.add('hidden');
                successIcon.classList.remove('hidden');
            }
        });
