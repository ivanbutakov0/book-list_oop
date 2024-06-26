class Book {
	constructor(title, author, isbn) {
		this.title = title
		this.author = author
		this.isbn = isbn
	}
}

class UI {
	static display() {
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
			<img src="./images/trash-solid.svg" alt="delete" class="w-full h-full delete" />
		</a>
		</td>`

		list.appendChild(row)
	}

	static showAlert(message, color) {
		// Create the alert element
		const alertElement = document.createElement('div')
		alertElement.classList.add('text-center', `text-${color}-500`) // Add a class for styling (optional)
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

	static deleteBook(el) {
		el.parentElement.parentElement.parentElement.remove()
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

	static removeBook(isbn) {
		const books = Store.getBooks()

		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1)
			}
		})

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
		return UI.showAlert('Please fill in all fields', 'red')
	}

	const book = new Book(title, author, isbn)
	UI.addBookToList(book)

	Store.addBook(book)
	UI.clearFields()
	UI.showAlert('Book added', 'green')
})

// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', e => {
	if (e.target.classList.contains('delete')) {
		UI.deleteBook(e.target)
		Store.removeBook(
			e.target.parentElement.parentElement.previousElementSibling.textContent
		)
		UI.showAlert('Book removed', 'green')
	}
})
