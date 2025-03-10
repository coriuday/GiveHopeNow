import { Link } from "react-router-dom"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer has-background-dark has-text-white pt-6">
      {/* Newsletter Section */}
      <div className="container mb-5">
        <div className="columns is-vcentered">
          <div className="column is-5">
            <h3 className="title is-4 has-text-white mb-2">Subscribe to Our Newsletter</h3>
            <p className="has-text-grey-light">Stay updated with our latest projects and fundraising campaigns</p>
          </div>
          <div className="column">
            <div className="field is-grouped">
              <div className="control is-expanded">
                <input 
                  className="input is-rounded" 
                  type="email" 
                  placeholder="Your Email Address"
                />
              </div>
              <div className="control">
                <button className="button is-danger is-rounded">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container">
        <div className="columns">
          {/* Column 1: About */}
          <div className="column is-4">
            <Link to="/" className="is-block mb-4">
              <span className="has-text-danger has-text-weight-bold is-size-4">Give</span>
              <span className="has-text-white has-text-weight-bold is-size-4">Hope</span>
              <span className="has-text-danger has-text-weight-bold is-size-4">Now</span>
            </Link>
            <p className="has-text-grey-light mb-4">
              A trusted platform dedicated to connecting donors with worthy causes and making a positive impact in communities worldwide.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="column is-2">
            <h4 className="title is-6 has-text-white mb-4">Links</h4>
            <ul>
              <li className="mb-2"><Link to="/about" className="has-text-grey-light">About Us</Link></li>
              <li className="mb-2"><Link to="/projects" className="has-text-grey-light">Projects</Link></li>
              <li className="mb-2"><Link to="/contact" className="has-text-grey-light">Contact</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div className="column is-4">
            <h4 className="title is-6 has-text-white mb-4">Contact Us</h4>
            <p className="has-text-grey-light mb-2">
              <span className="icon-text">
                <span className="icon"><i className="fas fa-envelope"></i></span>
                <span>info@givehopenow.org</span>
              </span>
            </p>
            <p className="has-text-grey-light">
              <span className="icon-text">
                <span className="icon"><i className="fas fa-map-marker-alt"></i></span>
                <span>123 Charity St, New York, NY 10001</span>
              </span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="has-background-black-ter mt-6 py-4">
        <div className="container has-text-centered">
          <p className="has-text-grey-light">
            © {currentYear} GiveHopeNow. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 