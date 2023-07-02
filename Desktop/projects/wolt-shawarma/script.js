const favoriteBtn = document.querySelector('#favorite')

// * body
const body = document.querySelector('body')

// * modal display
const modalDisplay = document.querySelector('#modal-display')
const modalDisplayOrder = document.querySelector('#modal-order-display')

// * order button / content
const orderButton = document.querySelector('#order-history')
const orderContent = document.querySelector('#order-content')

// * objects
const cards = document.querySelectorAll('.submit-card')
const modal = document.querySelector('#modal')
const overlay = document.querySelector('#overlay')
const cancel = document.querySelector('#cancel-icon')

// * textContent
const objectName = document.querySelector('#object-name')

const headlines = document.querySelectorAll('.headline')
const prices = document.querySelectorAll('.price')
const madeArr = document.querySelectorAll('.made')

const headlineModal = document.querySelector('#headline')
const priceModal = document.querySelector('#price')
const madeModal = document.querySelector('#made')

// * count
const countMin = document.querySelector('#count-minus')
const countPlus = document.querySelector('#count-plus')
const countDisplay = document.querySelector('#count-display')

// * total price
const totalPrice = document.querySelector('#total-price')

// * submit
const submit = document.querySelector('#add-order')

// * icon
const icon = document.querySelector('.fa-angle-down')


// * radio / checkbox buttons
const croalRadios = document.querySelectorAll('input[name="croal"]')
const sauceType = document.querySelectorAll('input[name="sauce"]')
const ingredients = document.querySelectorAll('input[name="ingredient"]')

// * ingredients
const ingredientDisplay = document.querySelector('#ingredients')
let ingredientsArr = []

ingredients.forEach((item) => {
  item.addEventListener('click', () => {
    if (item.checked) {
      ingredientsArr.push(item.value)
    } else {
      const index = ingredientsArr.indexOf(item.value)
      if (index > -1) {
        ingredientsArr.splice(index, 1)
      }
    }
  })
})

// ? search
const noResult = document.querySelector('#not-found')

const searchBox = document.querySelector('#search')
const itemCounter = document.querySelector('#item-counter')
itemCounter.textContent = cards.length

searchBox.addEventListener('input', () => {
  const filter = searchBox.value.toLowerCase()
  let filteredItemCount = 0

  for (let i = 0; i < cards.length; i++) {
    const value = headlines[i].textContent.toLocaleLowerCase()
    const value2 = madeArr[i].textContent.toLocaleLowerCase()
    
    if (value.includes(filter) || value2.includes(filter)) {
      cards[i].style.display = ''
      filteredItemCount++
    } else {
      cards[i].style.display = 'none'
      itemCounter.textContent = 0
    }
  }

  if (filteredItemCount === 0) {
    noResult.classList.remove('hidden')
  } else {
    noResult.classList.add('hidden')
  }

  itemCounter.textContent = filteredItemCount
})

// ? add in favorite

favoriteBtn.addEventListener('click', () => {
  const heart = document.querySelector('.fa-heart')
  
  const title = document.querySelector('.title')
  const favoriteToast = document.createElement('p')
  
  function showToast(toast, color) {
    favoriteToast.textContent = toast
    favoriteToast.classList.add('favorite')
    favoriteToast.style.width = '425px'
    favoriteToast.style.color = color
    favoriteToast.style.borderColor = color
    title.appendChild(favoriteToast)
  }
  function hideToast() {
    favoriteToast.remove()
  }
  
  if(favoriteBtn.checked) {
    heart.classList.add('fa-solid')
    heart.classList.remove('fa-regular')

    showToast('Added to the favorite section')
    setTimeout((hideToast), 3000)
  } else {
    heart.classList.add('fa-regular')
    heart.classList.remove('fa-solid')

    showToast('Removed from the favorite section', '#E06469')  
    setTimeout((hideToast), 3000)
  }
})

// ? open modal

cards.forEach((card, index) => {
  card.addEventListener('click', (headLine, price, made) => {
    body.classList.add('overflow-hidden')

    // * active modal and overlay
    modal.classList.toggle('hidden')
    overlay.classList.toggle('hidden')
    
    // * parameter values
    headLine = headlines[index].textContent
    price = prices[index].textContent
    made = madeArr[index].textContent
    
    // * textContent
    headlineModal.textContent = headLine
    priceModal.textContent = price
    madeModal.textContent = made
    
    // * total price
    totalPrice.textContent = price
    
    // ? count
    let countNum = 1
    let totalPriceSum = 0
    countDisplay.textContent = countNum
    
    
    // * count plus
    countPlus.addEventListener('click', () => {
      if(countNum !== 20) {
        countDisplay.textContent = ++countNum
        totalPrice.textContent = price * countNum
        totalPriceSum = totalPrice.textContent
      }
    })
    
    // * count minus
    countMin.addEventListener('click', () => {
      if(countNum !== 1) {
        countDisplay.textContent = --countNum
        totalPrice.textContent = totalPriceSum - price
        totalPriceSum = totalPrice.textContent
      }
    })
    modal.scrollTop = 0
  })
})

// ? drop down

orderButton.addEventListener('click', () => {
  icon.classList.toggle('fa-angle-up')
  orderContent.classList.toggle('hidden')
  orderButton.classList.toggle('radius-for-content')
})

// ? submit / checkboxes

submit.addEventListener('click', () => {
  modalDisplay.classList.add('hidden')
  modalDisplayOrder.classList.remove('hidden')

  const name = document.querySelector('#name')
  name.textContent = objectName.textContent

  const order = document.querySelector('#order')
  order.textContent = headlineModal.textContent

  const composition = document.querySelector('#composition')
  composition.textContent = madeModal.textContent

  const quantity = document.querySelector('#quantity')
  quantity.textContent = countDisplay.textContent

  const total = document.querySelector('#total')
  total.textContent = totalPrice.textContent + ' GEL'

  croalRadios.forEach((radio) => {
    const radioId = radio.id
    const label = document.querySelectorAll(`label[for='${radioId}']`)

    if(radio.checked) {
      const order = document.querySelector('#crocal-sauce')
      order.textContent = label[0].textContent
    }
  })

  sauceType.forEach((sauce) => {
    const sauceId = sauce.id
    const label = document.querySelectorAll(`label[for='${sauceId}']`)

    if(sauce.checked) {
      const order = document.querySelector('#sauce-type')
      order.textContent = label[0].textContent
    }
  })

  if(ingredientsArr.length === 0) {
    ingredientDisplay.textContent = 'empty'
    ingredientDisplay.style.color = '#E06469'
  } else {
    ingredientDisplay.textContent = ingredientsArr.join(', ')
    ingredientDisplay.style.color = 'rgb(65, 67, 69)'
  }
  
})

// ? close modal

cancel.addEventListener('click', () => {
  cancelOverlay()
})

overlay.addEventListener('click', () => {
  cancelOverlay()
})

const cancelOverlay = () => {
  body.classList.remove('overflow-hidden')

  modal.classList.add('hidden')
  overlay.classList.add('hidden')
  
  modalDisplayOrder.classList.add('hidden')
  modalDisplay.classList.remove('hidden')
  
  croalRadios[0].checked = true
  sauceType[0].checked = true
  
  ingredientsArr = []

  for (let i = 0; i < ingredients.length; i++) {
    ingredients[i].checked = false
  }

  orderContent.classList.add('hidden')
  orderButton.classList.remove('radius-for-content')
  icon.classList.remove('fa-angle-up')
  icon.classList.add('fa-angle-down')
}