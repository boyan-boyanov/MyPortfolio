import { BrowserRouter } from "react-router-dom"
// Works (Personal Projects) and Feedbacks (Testimonials) are hidden for now; to show them again,
// import them here and uncomment them below
import { About, Contact, Experience, Hero, Navbar, Tech, StarsCanvas } from './components'

const App = () => {

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        {/* <Works /> */}
        {/* <Feedbacks /> */}
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
