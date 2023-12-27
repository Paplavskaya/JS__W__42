class Users {
    constructor() {
        
        this.createHtmlTable();
        this.getUsers().then((data) => {this.usersMapper(data)});
    }

    async getUsers() {
        
        try {
            const response = await fetch('https://dummyjson.com/users');

            if(response.status >= 400 && response.status <= 420 || response.status >= 500 && response.status <= 520){
                throw new Error('error')
            }
            
            const data = await response.json();
            const arrUsers = data.users;
            this.usersMapper(data.users);
            console.log(arrUsers)

        } catch(error) {
            console.error(error)
        }  
    }

    usersMapper(data) {
        const usersNew = data.map((user) => {
            const {image, firstName, lastName, age, email} = user;
            return {image, firstName, lastName, age, email}
        })
        console.log(usersNew)
        this.render(usersNew)
    }

    render(users){  
        const usersElement = document.createElement('div');
        usersElement.classList.add('users__list');

        let usersList = '';
        users.forEach((user) => { 
            const {image, firstName, lastName, age, email} = user;
            usersList += `<ul class="user__list">
                                <li class="user__list__img user__list__item"><img src="${image}"></li>
                                <li class="user__list__firstName user__list__item">${firstName}</li>
                                <li class="user__list__lastName user__list__item">${lastName}</li>
                                <li class="user__list__age user__list__item">${age}</li>
                                <li class="user__list__email user__list__item">${email}</li>
                            </ul>`
        }) 
        
        usersElement.innerHTML = usersList;
        const usersBodyElement = document.querySelector('.users__body');
        usersBodyElement.appendChild(usersElement)
    }

    createHtmlTable(){
        const usersWrapper = document.createElement('div');
        usersWrapper.classList.add('users__wrapper');
        usersWrapper.innerHTML = `<div class="users">
                                    <h2 class="users__title">Сотрудники</h2>
                                    <div class="users__info">
                                        <ul class="user__items">
                                            <li class="user__img user__item">Фото</li>
                                            <li class="user__firstName user__item">Имя</li>
                                            <li class="user__lastName user__item">Фамилия</li>
                                            <li class="user__age user__item">Возраст</li>
                                            <li class="user__email user__item">E-mail</li>
                                        </ul>
                                        <div class="users__body"></div>
                                    </div>
                                </div>`
        
        const appElement = document.querySelector('.app');
        appElement.appendChild(usersWrapper)
    }
}

const users = new Users()
