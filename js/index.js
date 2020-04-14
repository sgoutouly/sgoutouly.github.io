// --------------------
// La directive v-link
// --------------------
Vue.component('v-link', {
	props : ['href'],
	template : '<a v-bind:href="href" v-on:click="go"><slot></slot></a>',
	methods: {
 		go (event) {
    		event.preventDefault()
    		this.$root.currentRoute = this.href
    		window.history.pushState(null, routes[this.href], this.href)
  		}
	}
})

Vue.component('nav-bar', {
	template : '<p><v-link href="/">Home</v-link>&nbsp;|&nbsp;<v-link href="/about">About</v-link></p>'
})

// ---------------------------
// L'application & le routeur
// ---------------------------
const NotFound = { template: '<div><nav-bar/><p>Page not found</p></div>'}
const Home = { template: '<div><nav-bar/><p>Home page</p></div>' }
const About = { template: '<div><nav-bar/><p>About page</p></div>' }

const routes = {
		'/': Home,
		'/about': About
}

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) {return h(this.ViewComponent) }
})

// Ecoute les changements de route
window.addEventListener('popstate', () => { app.currentRoute = window.location.pathname })