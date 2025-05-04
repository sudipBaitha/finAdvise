document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger")
  const menu = document.querySelector(".menu")

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      })

      // Close mobile menu if open
      if (menu.classList.contains("active")) {
        menu.classList.remove("active")
        hamburger.classList.remove("active")
      }

      // Update active link
      document.querySelectorAll(".menu a").forEach((link) => {
        link.classList.remove("active")
      })
      this.classList.add("active")
    })
  })

  // Scroll Animations
  const animateElements = document.querySelectorAll(".fade-in, .slide-in")

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.classList.add("visible")
      }
    })
  }

  // Initial check on page load
  checkScroll()

  // Check on scroll
  window.addEventListener("scroll", checkScroll)

  // Calculator Tab Switching
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab")

      // Update active tab button
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Show selected tab content
      tabContents.forEach((content) => content.classList.remove("active"))
      document.getElementById(`${tabId}-calculator`).classList.add("active")
    })
  })

  // Loan Calculator
  const calculateLoanBtn = document.getElementById("calculate-loan")

  calculateLoanBtn.addEventListener("click", () => {
    const loanAmount = Number.parseFloat(document.getElementById("loan-amount").value)
    const loanTerm = Number.parseFloat(document.getElementById("loan-term").value)
    const interestRate = Number.parseFloat(document.getElementById("interest-rate").value) / 100 / 12 // Monthly interest rate
    const loanTermMonths = loanTerm * 12

    if (isNaN(loanAmount) || isNaN(loanTerm) || isNaN(interestRate)) {
      alert("Please enter valid numbers for all fields.")
      return
    }

    // Calculate monthly payment using the formula: P = (r * PV) / (1 - (1 + r)^-n)
    // Where P = monthly payment, r = monthly interest rate, PV = loan amount, n = loan term in months
    const monthlyPayment = (interestRate * loanAmount) / (1 - Math.pow(1 + interestRate, -loanTermMonths))
    const totalPayment = monthlyPayment * loanTermMonths
    const totalInterest = totalPayment - loanAmount

    document.getElementById("monthly-payment").textContent = "$" + monthlyPayment.toFixed(2)
    document.getElementById("total-payment").textContent = "$" + totalPayment.toFixed(2)
    document.getElementById("total-interest").textContent = "$" + totalInterest.toFixed(2)
  })

  // Interest Calculator
  const calculateInterestBtn = document.getElementById("calculate-interest")

  calculateInterestBtn.addEventListener("click", () => {
    const principal = Number.parseFloat(document.getElementById("principal").value)
    const interestRate = Number.parseFloat(document.getElementById("interest-rate-savings").value) / 100
    const timePeriod = Number.parseFloat(document.getElementById("time-period").value)
    const compoundFrequency = Number.parseInt(document.getElementById("compound-frequency").value)

    if (isNaN(principal) || isNaN(interestRate) || isNaN(timePeriod) || isNaN(compoundFrequency)) {
      alert("Please enter valid numbers for all fields.")
      return
    }

    // Calculate compound interest using the formula: A = P(1 + r/n)^(nt)
    // Where A = final amount, P = principal, r = interest rate, n = compound frequency, t = time in years
    const futureValue = principal * Math.pow(1 + interestRate / compoundFrequency, compoundFrequency * timePeriod)
    const interestEarned = futureValue - principal

    document.getElementById("future-value").textContent = "$" + futureValue.toFixed(2)
    document.getElementById("interest-earned").textContent = "$" + interestEarned.toFixed(2)
  })

  // Contact Form Submission
  const contactForm = document.getElementById("consultation-form")
  const formMessage = document.getElementById("form-message")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const service = document.getElementById("service").value
    const message = document.getElementById("message").value

    // Simple validation
    if (!name || !email || !phone || !service) {
      formMessage.className = "error-message"
      formMessage.textContent = "Please fill in all required fields."
      return
    }

    // In a real application, you would send this data to a server
    // For this example, we'll just simulate a successful submission

    // Display success message
    formMessage.className = "success-message"
    formMessage.textContent = "Thank you! Your consultation request has been submitted. We will contact you shortly."

    // Reset form
    contactForm.reset()

    // Clear success message after 5 seconds
    setTimeout(() => {
      formMessage.textContent = ""
      formMessage.className = ""
    }, 5000)
  })

  // Update active menu item based on scroll position
  function updateActiveMenuOnScroll() {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".menu a")

    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = sectionId
      }
    })

    if (currentSection !== "") {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active")
        }
      })
    }
  }

  window.addEventListener("scroll", updateActiveMenuOnScroll)

  // Initial call to set active menu item on page load
  updateActiveMenuOnScroll()
})
