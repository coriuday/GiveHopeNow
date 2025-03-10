import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <section className="hero is-primary is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-1 mb-6">
            Changing Lives Through Your Support
          </h1>
          <p className="subtitle is-4 mb-6">
            Help Today for Better Tomorrow
          </p>
          <p className="is-size-5 mb-6">
            We bring together funders and high impact health initiatives to create lasting change in communities around the world.
          </p>
          <div className="buttons is-centered">
            <Link to="/donate" className="button is-danger is-rounded is-medium">
              Donate Now
            </Link>
            <Link to="/projects" className="button is-light is-rounded is-medium">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 