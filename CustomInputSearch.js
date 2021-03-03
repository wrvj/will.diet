class CustomInputSerch {

    constructor(input_element, sugestions_container, search_function) {
        this.input_element = input_element;
        this.sugestions_container = sugestions_container;
        this.search_function = search_function;

        this.sugestions = this.sugestions_container.querySelectorAll('.sugestion-finnerlist-item');
        this.done_typing_interval = 500;

        this.addEventListenersToWindow();
        this.addEventListenersToInput();

        console.log("New Custom Input Created!" + this.input_element.value);
    }
    updateSugestionsListItems(newElements) {
        this.sugestions_container.innerHTML = '';
        for (let newElement of newElements) {
            this.sugestions_container.appendChild(newElement);
        }
        this.sugestions = this.sugestions_container.querySelectorAll('.sugestion-list-item');
        this.sugestions[0].classList.add('focused');
        this.addEventListenersToSugestionItems();
    }
    removeClassFromAll(elements, className) {
        for (let e of elements) {
            e.classList.remove(className);
        }
    }
    addClassToAll(elements, className) {
        for (let e of elements) {
            e.classList.add(className);
        }
    }
    addEventListenersToSugestionItems() {

        for (let sugestion_item of this.sugestions) {
            sugestion_item.addEventListener('click', event => {
                this.input_element.value = sugestion_item.querySelectorAll(".item-name")[0].innerText;
            });
            sugestion_item.addEventListener('mouseover', event => {
                this.removeClassFromAll(this.sugestions, "focused");
                sugestion_item.classList.add("focused");
            });
        }
    }
    addEventListenersToWindow() {
        window.addEventListener('click', event => {
            if (event.target != this.input_element) {
                this.sugestions_container.classList.remove("show");
            }
        });
    }
    addEventListenersToInput() {
        this.input_element.addEventListener('click', event => {
            //Show the suggestions on mouseclick
            this.sugestions_container.classList.add("show");
        });
        this.input_element.addEventListener('focusin', event => {
            //Show the suggestions on input focus
            this.sugestions_container.classList.add("show");
        });
        this.input_element.addEventListener('focusout', event => {
            //On exit focus, set the input value to the focused item, and hide the list
            for (let sugestionItem of this.sugestions) {
                if (sugestionItem.classList.contains("focused")) {
                    this.input_element.value = sugestionItem.querySelectorAll(".item-name")[0].innerText;
                }
            }
            this.sugestions_container.classList.remove("show");
        });
        this.input_element.addEventListener('keyup', event => {
            clearTimeout(this.typing_timer);
            const input_value = this.input_element.value;
            const this_custom_input = this;
            const search_function = this.search_function;
            this.typing_timer = setTimeout(function() {
                if (input_value != '' && event.keyCode != 40 && event.keyCode != 39 && event.keyCode != 38 && event.keyCode != 13) {
                    // searchFood(input.value, 15);
                    search_function(input_value, this_custom_input);
                }
            }, this.done_typing_interval);
        });

        this.input_element.addEventListener('keydown', event => {

            const sugestions_qtd = this.sugestions.length;

            clearTimeout(this.typing_timer);


            if (this.sugestions_container.classList.contains("show")) {
                //Arrow UP
                if (event.keyCode === 38) {
                    event.preventDefault();
                    console.log(sugestions_qtd);
                    for (var i = 0; i < sugestions_qtd; i++) {
                        if (this.sugestions[i].classList.contains("focused")) {

                            this.sugestions[i].classList.remove("focused");
                            this.sugestions[((i - 1) + sugestions_qtd) % sugestions_qtd].classList.add("focused");
                            this.sugestions[((i - 1) + sugestions_qtd) % sugestions_qtd].scrollIntoView();
                            const inputValue = this.input_element.value;
                            this.input_element.value = '';
                            this.input_element.value = inputValue;
                            break;
                        }
                    }
                }
                //Arrow DOWN
                if (event.keyCode === 40) {
                    event.preventDefault();
                    for (var i = 0; i < sugestions_qtd; i++) {
                        if (this.sugestions[i].classList.contains("focused")) {

                            this.sugestions[i].classList.remove("focused");
                            this.sugestions[(i + 1) % sugestions_qtd].classList.add("focused");
                            this.sugestions[(i + 1) % sugestions_qtd].scrollIntoView();
                            break;
                        }
                    }
                }
            }

            //Show the suggestions on any key pressed
            this.sugestions_container.classList.add("show");

            //ENTER or RIGHT ARROW pressed
            if (event.keyCode === 13 || event.keyCode === 39) {
                this.sugestions_container.classList.remove("show");
                for (var i = 0; i < sugestions_qtd; i++) {
                    if (this.sugestions[i].classList.contains("focused")) {
                        this.input_element.value = this.sugestions[i].querySelectorAll('.item-name')[0].innerText;
                    }
                }
            }


        });

    }
}