class Book {
	constructor(title, author, isbn) {
		this.title = title
		this.author = author
		this.isbn = isbn
	}
}

class UI {
	static display() {
		/* const StoredBooks = [
			{
				title: 'Book One',
				author: 'John Doe',
				isbn: '1111111111',
			},
			{
				title: 'Book Two',
				author: 'Jane Doe',
				isbn: '2222222222',
			},
		] */

		const StoredBooks = JSON.parse(localStorage.getItem('books'))

		const books = StoredBooks

		books.forEach(book => UI.addBookToList(book))
	}

	static addBookToList(book) {
		const list = document.querySelector('#book-list')

		const row = document.createElement('tr')

		for (let key in book) {
			const td = document.createElement('td')
			td.textContent = book[key]
			row.appendChild(td)
		}

		row.innerHTML += `<td>
		<a href="#" class="block w-8 h-8 hover:bg-red-400 p-2 rounded-full transition">
			<img src="./images/trash-solid.svg" alt="delete" class="w-full h-full" />
		</a>
		</td>`

		list.appendChild(row)
	}

	static showAlert(message) {
		// Create the alert element
		const alertElement = document.createElement('div')
		alertElement.classList.add('text-center', 'text-red-500') // Add a class for styling (optional)
		alertElement.textContent = message

		// Get the form element
		const formElement = document.getElementById('book-form')

		// Check if the form exists
		if (formElement) {
			// Insert the alert element after the form
			formElement.after(alertElement)
		} else {
			console.error('Form with ID "book-form" not found.')
		}

		// Remove the alert after 3 seconds
		setTimeout(() => alertElement.remove(), 3000)
	}

	static clearFields() {
		document.querySelector('#title').value = ''
		document.querySelector('#author').value = ''
		document.querySelector('#isbn').value = ''
	}
}

class Store {
	static getBooks() {
		let books

		if (localStorage.getItem('books') === null) {
			books = []
		} else {
			books = JSON.parse(localStorage.getItem('books'))
		}

		return books
	}

	static addBook(book) {
		const books = Store.getBooks()
		books.push(book)
		localStorage.setItem('books', JSON.stringify(books))
	}
}

// Event: Display books
document.addEventListener('DOMContentLoaded', UI.display)

// Event: Add a book
document.querySelector('#book-form').addEventListener('submit', e => {
	e.preventDefault()

	const title = document.querySelector('#title').value
	const author = document.querySelector('#author').value
	const isbn = document.querySelector('#isbn').value

	if (title === '' || author === '' || isbn === '') {
		return UI.showAlert('Please fill in all fields', 'danger')
	}

	const book = new Book(title, author, isbn)
	UI.addBookToList(book)

	Store.addBook(book)
	UI.clearFields()
})
