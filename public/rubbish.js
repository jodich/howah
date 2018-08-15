// for addOptions in newForm
// worked. but too long winded and functions not working as expected
        // let count = this.state.count
        // let optionsArr = document.querySelectorAll('.opt');
        // let optionLast = optionsArr[optionsArr.length - 1]; // can change optionsArr.length to count later
        // let newOption = optionLast.cloneNode(true);

        // count = count + 1
        // let field = `option_${count}`;
        // this.setState( { [field]: null, count: count } )
        
        // newOption.id = `opt-${count}` 
        // newOption.childNodes[0].innerHTML = '';
        // newOption.childNodes[1].childNodes[1].innerHTML = '';
        
        // // Making new fields
        // var newTextarea = document.createElement('textarea')
        // newTextarea.id = `option_${count}`
        // newTextarea.className = `option_${count} validate materialize-textarea`
        // newTextarea.required = true
        // newTextarea.onkeyup = (event) => {this.changeHandler(event)}
        // newOption.childNodes[0].appendChild(newTextarea)

        // var newLabel = document.createElement('label')
        // newLabel.htmlFor = `option_${count}`
        // newLabel.textContent = `Option ${count}`
        // newOption.childNodes[0].appendChild(newLabel)
        
        // var newFileInput = document.createElement('input');
        // newFileInput.className = `file-path option_${count}`
        // newFileInput.type = "text"
        // newOption.childNodes[1].childNodes[0].childNodes[1].id = `file-option_${count}`
        // newOption.childNodes[1].childNodes[0].onChange = (event) => {this.changeFileHandler(event)}
        // newOption.childNodes[1].childNodes[1].appendChild(newFileInput)

        // optionLast.parentNode.insertBefore(newOption, optionLast.nextSibling);