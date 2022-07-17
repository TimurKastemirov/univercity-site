(function () {
    'use strict'

    const model = {
        init() {
            this.username = 'anazarenko';
            this.password = 'anazarenko0106';
        },

        validateUserName(username) {
            return this.username === username;
        },

        validatePassword(password) {
            return this.password === password;
        },

        validate({username, password}) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (this.validateUserName(username) && this.validatePassword(password)) {
                        resolve({ status: 200, message: '' });
                        return;
                    }

                    reject({ status: 400, message: 'Incorrect email or password' });
                }, 1500);
            });
        }
    };

    const controller = {
        init() {
            this.model = model;
            this.view = view;

            this.model.init();
            this.view.init();
        },

        // data => {username, password}
        validate(data) {
            return this.model.validate(data);
        }
    };

    const view = {
        init() {
            this.controller = controller;
            this.initListeners();
        },

        initListeners() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll('.needs-validation');

            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
                .forEach((form) => {
                    form.addEventListener('submit',(event) => {
                        event.preventDefault()
                        event.stopPropagation()

                        const usernameField = document.getElementById('username');
                        const passwordField = document.getElementById('password');
                        const username = usernameField.value;
                        const password = passwordField.value;
                        const errorContainer = document.getElementById('error-container');

                        if (!(username.trim() && password.trim())) {
                            const message = 'Required field is empty';
                            errorContainer.innerText = message;
                            usernameField.setCustomValidity(message);
                            passwordField.setCustomValidity(message);
                            form.classList.add('was-validated');

                            return;
                        }

                        this.controller.validate({ username, password })
                            .then(() => {
                                usernameField.setCustomValidity('');
                                passwordField.setCustomValidity('');
                                document.getElementById('error-container').innerText = '';
                            })
                            .catch((error) => {
                                usernameField.setCustomValidity(error.message);
                                passwordField.setCustomValidity(error.message);
                                document.getElementById('error-container').innerText = error.message;
                            })
                            .finally(() => {
                                form.classList.add('was-validated')
                            });


                    }, false)
                })
        },
    };

    controller.init();
})()