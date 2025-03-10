import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User } from 'lucide-react'
import '../styles/charity-theme.scss'

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted')
    // Add form validation and submission logic here
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070')",
                filter: "brightness(0.4)"
              }}
            />
            <div className="absolute inset-0 bg-primary/20"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl md:text-2xl mb-8">
                Have questions or suggestions? We're here to help. Get in touch with our team.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Contact Card 1 */}
                <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow border-t-4 border-primary">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Email Us</h3>
                  <p className="text-gray-600 mb-4">
                    Our team will respond to your inquiry as soon as possible.
                  </p>
                  <a href="mailto:info@givehopenow.org" className="text-primary font-medium hover:underline">
                    info@givehopenow.org
                  </a>
                </div>
                
                {/* Contact Card 2 */}
                <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow border-t-4 border-primary">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Call Us</h3>
                  <p className="text-gray-600 mb-4">
                    Have an urgent matter? Reach out to us directly.
                  </p>
                  <a href="tel:+18001234567" className="text-primary font-medium hover:underline">
                    +1 (800) 123-4567
                  </a>
                </div>
                
                {/* Contact Card 3 */}
                <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow border-t-4 border-primary">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Visit Us</h3>
                  <p className="text-gray-600 mb-4">
                    Our office is open for scheduled appointments.
                  </p>
                  <address className="text-primary font-medium not-italic">
                    123 Charity Lane<br />
                    Healthcare City, CA 90210<br />
                    United States
                  </address>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Contact Form */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="focus:ring-primary focus:border-primary block w-full pl-10 py-3 border-gray-300 rounded-md"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="focus:ring-primary focus:border-primary block w-full pl-10 py-3 border-gray-300 rounded-md"
                            placeholder="john.doe@example.com"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          className="focus:ring-primary focus:border-primary block w-full pl-10 py-3 border-gray-300 rounded-md"
                          placeholder="How can we help you?"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="focus:ring-primary focus:border-primary block w-full py-3 px-4 border-gray-300 rounded-md"
                        placeholder="Enter your message here..."
                        required
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        type="submit"
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full flex items-center"
                      >
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </div>
                
                {/* Map and Hours */}
                <div>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    <div className="w-full h-72">
                      {/* Replace with actual map iframe */}
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423283.4355571082!2d-118.69193093520708!3d34.02073049793636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sca!4v1616626575458!5m2!1sen!2sca" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy"
                        title="Office location"
                      ></iframe>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      Office Hours
                    </h3>
                    
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="font-medium">Monday - Friday</span>
                        <span className="text-gray-600">9:00 AM - 5:00 PM</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="font-medium">Saturday</span>
                        <span className="text-gray-600">10:00 AM - 2:00 PM</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="font-medium">Sunday</span>
                        <span className="text-gray-600">Closed</span>
                      </li>
                    </ul>
                    
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-gray-600 text-sm">
                        <strong>Note:</strong> Our office is closed on national holidays. For urgent matters during non-office hours, please email us.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Find answers to the most common questions about our organization and donation process.
                </p>
              </div>
              
              <div className="space-y-6">
                {/* FAQ Item 1 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-3">How can I donate to a specific cause?</h3>
                  <p className="text-gray-600">
                    When making a donation, you'll have the option to select which project or initiative you'd like to support. You can also contact us directly if you have a specific allocation request.
                  </p>
                </div>
                
                {/* FAQ Item 2 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-3">Is my donation tax-deductible?</h3>
                  <p className="text-gray-600">
                    Yes, GiveHopeNow is a registered 501(c)(3) non-profit organization, and all donations are tax-deductible to the extent allowed by law. You will receive a receipt for your donation that can be used for tax purposes.
                  </p>
                </div>
                
                {/* FAQ Item 3 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-3">How can I get involved as a volunteer?</h3>
                  <p className="text-gray-600">
                    We're always looking for dedicated volunteers to help with our initiatives. You can sign up through our volunteer program page or contact us directly to discuss opportunities that match your skills and interests.
                  </p>
                </div>
                
                {/* FAQ Item 4 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-3">How are my donations used?</h3>
                  <p className="text-gray-600">
                    We're committed to transparency in how we use funds. Generally, at least 85% of donations go directly to program services, with the remainder allocated to administrative costs and fundraising efforts. You can view our annual reports for detailed breakdowns.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-10">
                <p className="text-gray-600 mb-4">
                  Can't find the answer you're looking for?
                </p>
                <Button 
                  asChild 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-full"
                >
                  <a href="#contact-form">Ask Us Directly</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl mb-10 opacity-90">
                Your support can help us create lasting change in communities around the world. Join our global community today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  asChild 
                  variant="outline"
                  className="bg-white text-primary border-white hover:bg-white/90 px-8 py-4 rounded-full font-medium"
                >
                  <Link to="/donate">Donate Now</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium"
                >
                  <Link to="/projects">Explore Projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ContactPage 