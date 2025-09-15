        // Form validation for signup
        document.addEventListener('DOMContentLoaded', function() {
            const signupForm = document.getElementById('signup-form');
            const nameInput = document.getElementById('signup-name');
            const emailInput = document.getElementById('signup-email');
            const passwordInput = document.getElementById('signup-password');
            const confirmPasswordInput = document.getElementById('signup-confirm-password');
            const termsCheckbox = document.getElementById('signup-terms');
            const signupButton = document.getElementById('signup-button');
            const passwordToggle = document.getElementById('password-toggle');
            const confirmPasswordToggle = document.getElementById('confirm-password-toggle');
            
            // Get validation elements
            const nameValidation = nameInput.closest('.form-group').querySelector('.validation-message');
            const emailValidation = emailInput.closest('.form-group').querySelector('.validation-message');
            const passwordValidation = passwordInput.closest('.form-group').querySelector('.validation-message');
            const confirmPasswordValidation = confirmPasswordInput.closest('.form-group').querySelector('.validation-message');
            const termsValidation = termsCheckbox.closest('.form-group').querySelector('.validation-message');
            
            // Get icon elements
            const nameSuccessIcon = nameInput.parentElement.querySelector('.success-icon');
            const nameErrorIcon = nameInput.parentElement.querySelector('.error-icon');
            const emailSuccessIcon = emailInput.parentElement.querySelector('.success-icon');
            const emailErrorIcon = emailInput.parentElement.querySelector('.error-icon');
            const passwordSuccessIcon = passwordInput.parentElement.querySelector('.success-icon');
            const passwordErrorIcon = passwordInput.parentElement.querySelector('.error-icon');
            const confirmPasswordSuccessIcon = confirmPasswordInput.parentElement.querySelector('.success-icon');
            const confirmPasswordErrorIcon = confirmPasswordInput.parentElement.querySelector('.error-icon');
            
            // Password strength elements
            const passwordStrengthBar = document.querySelector('.password-strength');
            const passwordStrengthText = document.querySelector('.password-strength-text');
            
            // Track validation status
            let isNameValid = false;
            let isEmailValid = false;
            let isPasswordValid = false;
            let isConfirmPasswordValid = false;
            let isTermsValid = false;

            // Toggle password visibility
            passwordToggle.addEventListener('click', function() {
                togglePasswordVisibility(passwordInput, passwordToggle);
            });
            
            confirmPasswordToggle.addEventListener('click', function() {
                togglePasswordVisibility(confirmPasswordInput, confirmPasswordToggle);
            });
            
            function togglePasswordVisibility(input, toggle) {
                if (input.type === 'password') {
                    input.type = 'text';
                    toggle.classList.remove('fa-eye-slash');
                    toggle.classList.add('fa-eye');
                } else {
                    input.type = 'password';
                    toggle.classList.remove('fa-eye');
                    toggle.classList.add('fa-eye-slash');
                }
            }

            // Real-time validation
            nameInput.addEventListener('input', function() {
                isNameValid = validateName();
                updateSignupButton();
            });
            
            emailInput.addEventListener('input', function() {
                isEmailValid = validateEmail();
                updateSignupButton();
            });
            
            passwordInput.addEventListener('input', function() {
                isPasswordValid = validatePassword();
                validateConfirmPassword(); // Also validate confirm password when password changes
                updatePasswordStrength();
                updateSignupButton();
            });
            
            confirmPasswordInput.addEventListener('input', function() {
                isConfirmPasswordValid = validateConfirmPassword();
                updateSignupButton();
            });
            
            termsCheckbox.addEventListener('change', function() {
                isTermsValid = validateTerms();
                updateSignupButton();
            });
            
            // Form submission
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                isNameValid = validateName();
                isEmailValid = validateEmail();
                isPasswordValid = validatePassword();
                isConfirmPasswordValid = validateConfirmPassword();
                isTermsValid = validateTerms();
                
                if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsValid) {
                    // Form is valid, show success message
                    alert('Form submitted successfully!');
                    signupForm.reset();
                    resetValidationUI();
                    updateSignupButton();
                }
            });
            
            // Validation functions
            function validateName() {
                const name = nameInput.value.trim();
                const nameRegex = /^[a-zA-Z\s]+$/;

                if (name === '') {
                    showError(nameInput, nameValidation, nameErrorIcon, nameSuccessIcon, 'Name is required');
                    return false;
                } else if (name.length < 2) {
                    showError(nameInput, nameValidation, nameErrorIcon, nameSuccessIcon, 'Name must be at least 2 characters');
                    return false;
                } else if (!nameRegex.test(name)) {
                    showError(nameInput, nameValidation, nameErrorIcon, nameSuccessIcon, 'Name should only contain letters and spaces');
                    return false;
                } else {
                    showSuccess(nameInput, nameValidation, nameErrorIcon, nameSuccessIcon);
                    return true;
                }
            }        
            function validateEmail() {
                const email = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (email === '') {
                    showError(emailInput, emailValidation, emailErrorIcon, emailSuccessIcon, 'Email is required');
                    return false;
                } else if (!emailRegex.test(email)) {
                    showError(emailInput, emailValidation, emailErrorIcon, emailSuccessIcon, 'Please enter a valid email address');
                    return false;
                } else {
                    showSuccess(emailInput, emailValidation, emailErrorIcon, emailSuccessIcon);
                    return true;
                }
            }
            
            function validatePassword() {
                const password = passwordInput.value;
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumber = /\d/.test(password);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                const hasMinLength = password.length >= 8;
                
                // Update requirement indicators
                document.getElementById('req-uppercase').className = hasUpperCase ? 'text-green-500' : 'text-red-500';
                document.getElementById('req-lowercase').className = hasLowerCase ? 'text-green-500' : 'text-red-500';
                document.getElementById('req-number').className = hasNumber ? 'text-green-500' : 'text-red-500';
                document.getElementById('req-special').className = hasSpecialChar ? 'text-green-500' : 'text-red-500';
                document.getElementById('req-length').className = hasMinLength ? 'text-green-500' : 'text-red-500';
                
                if (password === '') {
                    showError(passwordInput, passwordValidation, passwordErrorIcon, passwordSuccessIcon, 'Password is required');
                    return false;
                } else if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || !hasMinLength) {
                    showError(passwordInput, passwordValidation, passwordErrorIcon, passwordSuccessIcon, 'Password does not meet requirements');
                    return false;
                } else {
                    showSuccess(passwordInput, passwordValidation, passwordErrorIcon, passwordSuccessIcon);
                    return true;
                }
            }
            
            function validateConfirmPassword() {
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;
                
                if (confirmPassword === '') {
                    showError(confirmPasswordInput, confirmPasswordValidation, confirmPasswordErrorIcon, confirmPasswordSuccessIcon, 'Please confirm your password');
                    return false;
                } else if (confirmPassword !== password) {
                    showError(confirmPasswordInput, confirmPasswordValidation, confirmPasswordErrorIcon, confirmPasswordSuccessIcon, 'Passwords do not match');
                    return false;
                } else {
                    showSuccess(confirmPasswordInput, confirmPasswordValidation, confirmPasswordErrorIcon, confirmPasswordSuccessIcon);
                    return true;
                }
            }
            
            function validateTerms() {
                if (!termsCheckbox.checked) {
                    termsValidation.classList.remove('hidden');
                    return false;
                } else {
                    termsValidation.classList.add('hidden');
                    return true;
                }
            }
            
            function updatePasswordStrength() {
                const password = passwordInput.value;
                let strength = 0;
                let strengthText = '';
                let strengthClass = '';
                
                if (password.length >= 8) strength += 20;
                if (/[A-Z]/.test(password)) strength += 20;
                if (/[a-z]/.test(password)) strength += 20;
                if (/\d/.test(password)) strength += 20;
                if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;
                
                if (strength <= 40) {
                    strengthText = 'Weak';
                    strengthClass = 'weak';
                } else if (strength <= 80) {
                    strengthText = 'Medium';
                    strengthClass = 'medium';
                } else {
                    strengthText = 'Strong';
                    strengthClass = 'strong';
                }
                
                passwordStrengthBar.className = `password-strength h-1 mt-2 rounded-full transition-all duration-500 ${strengthClass}`;
                passwordStrengthText.className = `password-strength-text mt-1 text-xs ${strengthClass}`;
                passwordStrengthText.textContent = strengthText;
            }
            
            function showError(input, validationElement, errorIcon, successIcon, message) {
                input.classList.add('border-red-500');
                input.classList.remove('border-green-500');
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
            
            function updateSignupButton() {
                if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsValid) {
                    signupButton.disabled = false;
                } else {
                    signupButton.disabled = true;
                }
            }
            
            function resetValidationUI() {
                // Reset all validation states
                const inputs = [nameInput, emailInput, passwordInput, confirmPasswordInput];
                inputs.forEach(input => {
                    input.classList.remove('border-red-500', 'border-green-500');
                });
                
                const validationMessages = [nameValidation, emailValidation, passwordValidation, confirmPasswordValidation];
                validationMessages.forEach(validation => {
                    validation.classList.add('hidden');
                });
                
                const errorIcons = [nameErrorIcon, emailErrorIcon, passwordErrorIcon, confirmPasswordErrorIcon];
                errorIcons.forEach(icon => {
                    icon.classList.add('hidden');
                });
                
                const successIcons = [nameSuccessIcon, emailSuccessIcon, passwordSuccessIcon, confirmPasswordSuccessIcon];
                successIcons.forEach(icon => {
                    icon.classList.add('hidden');
                });
                
                // Reset password strength
                passwordStrengthBar.className = 'password-strength h-1 mt-2 rounded-full bg-gray-200 transition-all duration-500';
                passwordStrengthText.className = 'password-strength-text mt-1 text-xs';
                passwordStrengthText.textContent = '';
                
                // Reset password requirements
                const requirements = ['req-uppercase', 'req-lowercase', 'req-number', 'req-special', 'req-length'];
                requirements.forEach(req => {
                    document.getElementById(req).className = 'text-red-500';
                });
                
                // Reset terms validation
                termsValidation.classList.add('hidden');
                
                // Reset toggles
                passwordInput.type = 'password';
                passwordToggle.classList.remove('fa-eye');
                passwordToggle.classList.add('fa-eye-slash');
                
                confirmPasswordInput.type = 'password';
                confirmPasswordToggle.classList.remove('fa-eye');
                confirmPasswordToggle.classList.add('fa-eye-slash');
            }
        });