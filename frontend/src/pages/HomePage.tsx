import { useEffect } from "react"
import { Link } from "react-router-dom"
import HeroSection from "../components/HeroSection"
import FeaturedProjects from "../components/FeaturedProjects"
import TestimonialSection from "../components/TestimonialSection"

const HomePage = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <HeroSection />
      
      {/* Featured Emergency Appeal */}
      <section className="section has-background-light">
        <div className="container">
          <div className="has-text-centered mb-6">
            <h2 className="title is-2">Emergency Appeal</h2>
            <p className="subtitle is-5">Crisis Relief for Natural Disaster Victims</p>
            <div className="block mt-5">
              <progress className="progress is-danger" value={45} max={100}>45%</progress>
            </div>
            <p className="is-size-5 mb-5">$45,850 raised of $100,000 goal</p>
            <Link to="/donate" className="button is-danger is-medium">
              Donate Now
            </Link>
          </div>
        </div>
      </section>
      
      {/* Our Causes Section */}
      <section className="section">
        <div className="container">
          <div className="has-text-centered mb-6">
            <h2 className="title is-2">Our Causes</h2>
            <p className="subtitle is-5">Featured Campaigns</p>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <FeaturedProjects 
        title="Featured Campaigns" 
        subtitle="Join our efforts to bring positive change to communities in need around the world."
        maxDisplay={3}
      />
      
      {/* Impact Numbers */}
      <section className="section has-background-primary has-text-white">
        <div className="container">
          <div className="columns has-text-centered">
            <div className="column">
              <p className="title is-2 has-text-white">$1.2M+</p>
              <p className="subtitle is-5 has-text-white">Funds Raised</p>
            </div>
            <div className="column">
              <p className="title is-2 has-text-white">120+</p>
              <p className="subtitle is-5 has-text-white">Projects</p>
            </div>
            <div className="column">
              <p className="title is-2 has-text-white">50K+</p>
              <p className="subtitle is-5 has-text-white">Lives Changed</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Impact */}
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-7">
              <h2 className="title is-2">Our Impact</h2>
              <h3 className="subtitle is-4 mb-4">Real Change Through Your Generosity</h3>
              <p className="mb-5">
                We are here to help communities and partners with critical health projects across 
                the world — protecting children from disease, helping women give birth safely, 
                and supplying hospitals with essential medicines.
              </p>
              
              <div className="columns is-multiline">
                <div className="column is-6">
                  <div className="icon-text mb-3">
                    <span className="icon has-text-danger">
                      <i className="fas fa-heart"></i>
                    </span>
                    <span className="title is-5">Better Healthcare</span>
                  </div>
                  <p>Providing essential medical services to underserved areas.</p>
                </div>
                <div className="column is-6">
                  <div className="icon-text mb-3">
                    <span className="icon has-text-danger">
                      <i className="fas fa-users"></i>
                    </span>
                    <span className="title is-5">Community Support</span>
                  </div>
                  <p>Building networks for sustainable community development.</p>
                </div>
                <div className="column is-6">
                  <div className="icon-text mb-3">
                    <span className="icon has-text-danger">
                      <i className="fas fa-home"></i>
                    </span>
                    <span className="title is-5">Emergency Shelter</span>
                  </div>
                  <p>Providing safe housing in crisis situations.</p>
                </div>
              </div>
              
              <div className="mt-5">
                <Link to="/impact" className="button is-outlined is-danger">
                  Explore Our Impact
                </Link>
              </div>
            </div>
            <div className="column is-5">
              <figure className="image">
                <img src="/src/assets/impact-image.jpg" alt="Our Impact" onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400?text=Impact+Image';
                }} />
              </figure>
            </div>
          </div>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="section">
        <div className="container">
          <div className="has-text-centered mb-6">
            <h2 className="title is-2">Upcoming Events</h2>
          </div>
          
          <div className="columns">
            <div className="column is-6">
              <div className="card">
                <div className="card-content">
                  <h3 className="title is-4">Healthcare Innovation Summit</h3>
                  <p className="mb-4">
                    Join healthcare experts to discuss innovative approaches to 
                    global health challenges.
                  </p>
                  <div className="icon-text mb-3">
                    <span className="icon">
                      <i className="fas fa-calendar"></i>
                    </span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="icon-text">
                    <span className="icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </span>
                    <span>Virtual Event</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="column is-6">
              <div className="card">
                <div className="card-content">
                  <h3 className="title is-4">Community Health Workshop</h3>
                  <p className="mb-4">
                    Learn about the impact of our projects and how communities 
                    are benefiting around the world.
                  </p>
                  <div className="icon-text mb-3">
                    <span className="icon">
                      <i className="fas fa-calendar"></i>
                    </span>
                    <span>2:00 PM - 5:00 PM</span>
                  </div>
                  <div className="icon-text">
                    <span className="icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </span>
                    <span>Community Center, New York</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="has-text-centered mt-5">
            <Link to="/events" className="button is-outlined is-primary">
              View All Events
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialSection maxDisplay={3} backgroundColor="light" />
      
      {/* Newsletter Section */}
      <section className="section has-background-dark has-text-white">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-6">
              <h2 className="title is-2 has-text-white mb-4">Subscribe to Our Newsletter</h2>
              <p>Stay updated with our latest projects and fundraising campaigns</p>
            </div>
            <div className="column is-6">
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input className="input is-medium" type="email" placeholder="Your Email Address" />
                </div>
                <div className="control">
                  <button className="button is-danger is-medium">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage 